/* 首页逻辑：两阶段 Hero
   阶段一：纯黑 + 居中名字（呼吸明暗闪动），点击可跳过等待
   阶段二：全屏背景图 + 名字缩小移至左上角（不遮挡图片） */

(function () {
  const data = window.SITE;
  if (!data) return;

  const hero = document.getElementById("hero");
  const heroBg = document.getElementById("heroBg");
  const heroText = document.getElementById("heroText");
  const heroMini = document.getElementById("heroMini");
  const heroHint = document.getElementById("heroHint");

  // 填充文字
  const enEl = document.getElementById("heroEn");
  if (enEl) enEl.textContent = data.site.nameEn;
  const nameEl = document.getElementById("heroName");
  if (nameEl) nameEl.textContent = data.site.name;
  const tagEl = document.getElementById("heroTagline");
  if (tagEl) tagEl.textContent = data.site.tagline;

  const DEFAULT_DELAY = 4000; // 黑底阶段时长（毫秒），可配置
  let timer = null;
  let entered = false;

  // 阶段二：背景图淡入 + 文字缩小移角落
  function enterPhase2() {
    if (entered) return;
    entered = true;
    hero.classList.add("phase2");
    if (heroHint) heroHint.style.display = "none";
    clearTimeout(timer);
  }

  // 预加载背景图，加载完成后再启动计时（避免黑底阶段提前结束图还没好）
  const img = new Image();
  img.onload = function () {
    heroBg.style.backgroundImage = "url('" + data.heroBg + "')";
    timer = setTimeout(enterPhase2, DEFAULT_DELAY);
  };
  img.onerror = function () {
    // 背景图加载失败：停留在黑底 + 名字，导航仍可用
    hero.classList.add("no-bg");
    if (heroHint) heroHint.textContent = "";
  };
  img.src = data.heroBg;

  // 点击页面任意处 → 跳过等待，直接进入阶段二
  hero.addEventListener("click", function (e) {
    // 排除点击导航的情况（导航在 hero 内部，但点击导航应走导航跳转）
    if (e.target.closest(".nav")) return;
    enterPhase2();
  });
})();
