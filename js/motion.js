/* ============================================
   MOTION 页逻辑（原生 scroll-snap 方案 v6）
   滚动交给浏览器原生处理（滚动边界由浏览器保证，
   永远不会"看不到最后一张"，触控/滚轮最流畅）。
   JS 只负责：渲染 / 计数 / 按钮 / 键盘 / 筛选
   ============================================ */

(function () {
  "use strict";

  var PROJECTS = window.MOTION_PROJECTS || [];

  var stage = document.getElementById("stage");
  var track = document.getElementById("track");
  var counter = document.getElementById("counter");
  if (!stage || !track || !counter) return;

  /* ---------- 渲染卡片 ---------- */
  track.innerHTML = PROJECTS.map(function (p) {
    var imgSrc = p.thumb || p.img || ("images/motion/" + p.id + ".svg");
    var isPortrait = p.orientation === "portrait";
    return (
      '<article class="m-card' + (isPortrait ? " portrait" : "") + '" data-index="' + p.id + '" data-ori="' + (isPortrait ? "portrait" : "landscape") + '">' +
        '<span class="m-no">' + p.id + '</span>' +
        '<a class="cover" href="video.html?p=' + p.id + '">' +
          // loading="lazy"：首屏只加载可见的照片，滚动到才加载（大幅提速）
          '<img src="' + imgSrc + '" alt="' + p.name + '" loading="lazy" draggable="false">' +
        '</a>' +
        '<div class="m-info">' +
          '<span class="name">' + p.name + '</span>' +
          '<span>' + p.kind + ' · ' + p.year + '</span>' +
        '</div>' +
      '</article>'
    );
  }).join("");

  var cards = Array.prototype.slice.call(track.children);
  if (!cards.length) return;
  var visibleCards = cards;

  /* ---------- 当前居中卡片（用于计数） ---------- */
  function currentIndex() {
    var center = stage.scrollLeft + stage.clientWidth / 2;
    var best = 0, bestDist = Infinity;
    visibleCards.forEach(function (c, i) {
      var cx = c.offsetLeft + c.offsetWidth / 2;
      var d = Math.abs(cx - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }

  function projectOf(i) {
    var card = visibleCards[i];
    if (!card) return null;
    var realIdx = PROJECTS.findIndex(function (x) { return x.id === card.dataset.index; });
    return realIdx > -1 ? PROJECTS[realIdx] : null;
  }

  function updateCounter() {
    var i = currentIndex();
    var p = projectOf(i);
    counter.textContent =
      ("0" + (i + 1)).slice(-2) + " / " + visibleCards.length + " · " + (p ? p.name : "");

    if (prevBtn) prevBtn.disabled = (i === 0);
    if (nextBtn) nextBtn.disabled = (i === visibleCards.length - 1);
  }

  /* 滚动到第 i 张（visibleCards 索引）——原生平滑滚动 + 自动吸附 */
  function scrollToIndex(i) {
    i = Math.max(0, Math.min(visibleCards.length - 1, i));
    var c = visibleCards[i];
    if (!c) return;
    var target = c.offsetLeft + c.offsetWidth / 2 - stage.clientWidth / 2;
    stage.scrollTo({ left: target, behavior: "smooth" });
  }

  /* ---------- 监听原生滚动 → 更新计数 ---------- */
  var scrollRaf = null;
  stage.addEventListener("scroll", function () {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = null;
      updateCounter();
    });
  }, { passive: true });

  /* ---------- 鼠标拖拽（原生滚动 + 防误点） ---------- */
  var isDown = false, startX = 0, startScroll = 0, moved = 0;

  stage.addEventListener("mousedown", function (e) {
    if (e.target.closest("a.cover")) return; // 让点击链接正常跳转
    isDown = true;
    moved = 0;
    startX = e.clientX;
    startScroll = stage.scrollLeft;
    stage.classList.add("dragging");
  });

  window.addEventListener("mousemove", function (e) {
    if (!isDown) return;
    var dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    stage.scrollLeft = startScroll - dx; // 原生滚动，边界浏览器保证
  });

  window.addEventListener("mouseup", function () {
    if (!isDown) return;
    isDown = false;
    stage.classList.remove("dragging");
    if (moved > 8) updateCounter();
  });

  /* ---------- 滚轮 → 横向滚动（原生 + 临时禁用吸附） ----------
     强制吸附会让滚轮"滚了又弹回"（滚动量小于半张卡片时），
     所以滚动过程中临时禁用 snap，停止后恢复吸附 */
  var wheelTimer = null;

  stage.addEventListener("wheel", function (e) {
    e.preventDefault();
    stage.classList.add("no-snap");          // 临时禁用吸附
    stage.scrollLeft += (e.deltaY || e.deltaX) * 2.0; // 2.0 倍滚轮力度（更灵敏）
    if (wheelTimer) clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () {
      stage.classList.remove("no-snap");     // 恢复吸附，自动对齐最近卡片
      updateCounter();
    }, 140);
  }, { passive: false });

  /* ---------- 键盘 ←/→ ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") scrollToIndex(currentIndex() + 1);
    if (e.key === "ArrowLeft") scrollToIndex(currentIndex() - 1);
  });

  /* ---------- 左右按钮 ---------- */
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");

  if (prevBtn) prevBtn.addEventListener("click", function () { scrollToIndex(currentIndex() - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { scrollToIndex(currentIndex() + 1); });

  /* ---------- 横竖筛选（ALL / LANDSCAPE / PORTRAIT） ---------- */
  var filterBar = document.getElementById("filterBar");

  function applyFilter(filter) {
    cards.forEach(function (c) {
      var ori = c.dataset.ori || "landscape";
      c.style.display = (filter === "all" || ori === filter) ? "" : "none";
    });
    visibleCards = cards.filter(function (c) { return c.style.display !== "none"; });
    if (!visibleCards.length) visibleCards = cards;
    // 重置到开头（原生滚动，无需手动计算边界）
    stage.scrollTo({ left: 0 });
    updateCounter();
  }

  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".m-filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".m-filter-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      applyFilter(btn.dataset.filter);
    });
  }

  /* ---------- 汉堡菜单 ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var overlay = document.getElementById("menuOverlay");
  var topBar = document.querySelector(".m-top");

  if (menuBtn && overlay) {
    menuBtn.addEventListener("click", function () {
      var open = overlay.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      if (topBar) topBar.classList.toggle("menu-open", open);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        overlay.classList.remove("open");
        menuBtn.classList.remove("open");
        if (topBar) topBar.classList.remove("menu-open");
      }
    });
  }

  /* ---------- 初始化 ---------- */
  updateCounter();
})();
