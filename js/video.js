/* ============================================
   video.html 逻辑：按 URL 参数 ?p=01 显示项目详情
   杂志式双栏：左图右文（时间/地点/器材/故事）
   支持上一项/下一项切换
   ============================================ */

(function () {
  "use strict";

  var PROJECTS = window.MOTION_PROJECTS || [];
  if (!PROJECTS.length) return;

  /* 解析 ?p=xx */
  var params = new URLSearchParams(window.location.search);
  var pid = params.get("p") || PROJECTS[0].id;
  var idx = PROJECTS.findIndex(function (p) { return p.id === pid; });
  if (idx < 0) idx = 0;

  var title = document.getElementById("videoTitle");
  var kicker = document.getElementById("videoKicker");
  var index = document.getElementById("videoIndex");
  var frame = document.getElementById("videoFrame");
  var factShot = document.getElementById("factShot");
  var factLoc = document.getElementById("factLoc");
  var factCam = document.getElementById("factCam");
  var story = document.getElementById("videoStory");
  var desc = document.getElementById("videoDesc");
  var prevLink = document.getElementById("prevLink");
  var nextLink = document.getElementById("nextLink");

  function render(i) {
    var p = PROJECTS[i];
    document.title = "MOTION · " + p.name;

    index.textContent =
      ("0" + (i + 1)).slice(-2) + " / " + ("0" + PROJECTS.length).slice(-2);
    title.textContent = p.name;
    kicker.textContent = p.kind + " · " + p.year;
    factShot.textContent = p.shot || p.year || "—";
    factLoc.textContent = p.location || "—";
    factCam.textContent = p.camera || "—";
    story.textContent = p.story || p.desc || "";
    desc.textContent = p.desc || "";

    /* 大图：先显示缩略图占位，再异步加载大图（点开更快） */
    var fullSrc = p.img || ("images/motion/" + p.id + ".svg");
    var thumbSrc = p.thumb || fullSrc;
    frame.innerHTML =
      '<img src="' + thumbSrc + '" alt="' + p.name + '" data-full="' + fullSrc + '" class="lazy-full">';

    // 用新 Image 预加载大图，完成后替换缩略图（避免阻塞首屏）
    var fullImg = new Image();
    fullImg.onload = function () {
      var cur = frame.querySelector("img.lazy-full");
      if (cur && cur.dataset.full === fullSrc) {
        cur.src = fullSrc;
        cur.classList.add("loaded");
      }
    };
    fullImg.src = fullSrc;

    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(i + 1) % PROJECTS.length];
    prevLink.href = "video.html?p=" + prev.id;
    nextLink.href = "video.html?p=" + next.id;
    prevLink.textContent = "← " + prev.name;
    nextLink.textContent = next.name + " →";

    /* 切换时轻微淡入 */
    frame.classList.remove("fade-in");
    void frame.offsetWidth;
    frame.classList.add("fade-in");
  }

  render(idx);

  /* 汉堡菜单（与 motion 页一致） */
  var menuBtn = document.getElementById("menuBtn");
  var overlay = document.getElementById("menuOverlay");
  menuBtn.addEventListener("click", function () {
    var open = overlay.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
  });
  overlay.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      overlay.classList.remove("open");
      menuBtn.classList.remove("open");
    }
  });
})();
