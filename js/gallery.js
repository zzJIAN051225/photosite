/* 作品集逻辑：网格渲染 + 分类筛选 + Lightbox */

(function () {
  const data = window.SITE;
  if (!data) return;

  const filterBar = document.getElementById("filterBar");
  const grid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  if (!filterBar || !grid || !lightbox) return;

  let currentCategory = "全部";
  let currentIndex = 0;
  let visiblePhotos = [];

  /* ---------- 分类筛选 ---------- */
  filterBar.innerHTML = data.categories.map(function (c) {
    return '<button class="filter-btn' + (c === "全部" ? " active" : "") + '" data-cat="' + c + '">' + c + "</button>";
  }).join("");

  filterBar.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    currentCategory = btn.dataset.cat;
    filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
      b.classList.toggle("active", b === btn);
    });
    renderGrid();
  });

  /* ---------- 网格渲染 ---------- */
  function renderGrid() {
    visiblePhotos = data.photos.filter(function (p) {
      return currentCategory === "全部" || p.category === currentCategory;
    });

    if (!visiblePhotos.length) {
      grid.innerHTML = '<div class="empty-tip">暂无作品</div>';
      return;
    }

    grid.innerHTML = visiblePhotos.map(function (p, i) {
      return (
        '<div class="grid-item" data-index="' + i + '">' +
          '<img src="' + p.thumbnail + '" alt="' + p.title + '" loading="lazy">' +
          '<div class="caption"><h3>' + p.title + '</h3><span>' + p.location + '</span></div>' +
        '</div>'
      );
    }).join("");

    grid.querySelectorAll(".grid-item").forEach(function (item) {
      item.addEventListener("click", function () {
        openLightbox(parseInt(item.dataset.index, 10));
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lbImage = document.getElementById("lbImage");
  const lbTitle = document.getElementById("lbTitle");
  const lbMeta = document.getElementById("lbMeta");
  const lbStory = document.getElementById("lbStory");
  const lbCounter = document.getElementById("lbCounter");

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderLightbox() {
    const p = visiblePhotos[currentIndex];
    lbImage.src = p.image;
    lbImage.alt = p.title;
    lbTitle.textContent = p.title;
    lbMeta.textContent = [p.location, p.date, p.camera].filter(Boolean).join("  ·  ");
    lbStory.textContent = p.story || "";
    lbCounter.textContent = (currentIndex + 1) + " / " + visiblePhotos.length;
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + visiblePhotos.length) % visiblePhotos.length;
    renderLightbox();
  }

  /* 控件 */
  document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { step(1); });
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* 键盘：Esc 关闭 / ← → 切换 */
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* 移动端触摸滑动切换 */
  let touchX = null;
  lightbox.addEventListener("touchstart", function (e) {
    touchX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* ---------- 初始渲染 + URL 参数直达 ---------- */
  renderGrid();

  const params = new URLSearchParams(window.location.search);
  const target = params.get("photo");
  if (target) {
    const idx = visiblePhotos.findIndex(function (p) { return p.id === target; });
    if (idx > -1) openLightbox(idx);
  }
})();
