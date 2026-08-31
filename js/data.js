/* ============================================
   站点数据配置 —— 所有内容都在这里改！
   加作品 = 图片丢进 images/ 目录 + 在 photos 里加一条
   ============================================ */

window.SITE = {
  /* ---- 站点信息 ---- */
  site: {
    name: "香蕉黄油拿铁",
    nameEn: "BANANA BUTTER LATTE",
    tagline: "无限进步",
    copyright: "© 2025 香蕉黄油拿铁",
  },

  /* ---- 作品分类 ---- */
  categories: ["全部", "风光", "人像", "街头", "生活感照"],

  /* ---- 首页阶段二背景图（纯白，保证文字可读） ---- */
  heroBg: "images/hero-bg.svg",

  /* ---- 作品数据 ----
     image    : 大图路径（Lightbox 用）
     thumbnail: 缩略图路径（网格用）
     featured : true 表示进首页精选 */
  photos: [
    {
      id: "001",
      title: "晨雾中的贡嘎",
      category: "风光",
      location: "四川 · 贡嘎",
      date: "2024-11",
      camera: "Sony A7R IV · 24mm f/8",
      story: "凌晨四点半上山，等到第一缕光穿过云海。",
      image: "images/full/001.svg",
      thumbnail: "images/thumb/001.svg",
      featured: true,
    },
    {
      id: "002",
      title: "星夜湖畔",
      category: "风光",
      location: "青海 · 茶卡",
      date: "2024-08",
      camera: "Sony A7R IV · 14mm f/2.8",
      story: "无风的夜，湖面像一面黑色的镜子。",
      image: "images/full/002.svg",
      thumbnail: "images/thumb/002.svg",
      featured: true,
    },
    {
      id: "003",
      title: "山谷来风",
      category: "风光",
      location: "新疆 · 喀纳斯",
      date: "2023-09",
      camera: "Sony A7 III · 35mm f/8",
      story: "风从山谷深处涌来，云影在山脊上奔跑。",
      image: "images/full/003.svg",
      thumbnail: "images/thumb/003.svg",
      featured: false,
    },
    {
      id: "004",
      title: "午后侧影",
      category: "人像",
      location: "北京 · 胡同",
      date: "2024-05",
      camera: "Sony A7R IV · 85mm f/1.8",
      story: "光从老木窗漏进来，恰好落在她肩上。",
      image: "images/full/004.svg",
      thumbnail: "images/thumb/004.svg",
      featured: true,
    },
    {
      id: "005",
      title: "风与旅人",
      category: "人像",
      location: "云南 · 大理",
      date: "2024-02",
      camera: "Sony A7 III · 50mm f/1.4",
      story: "骑行路上遇见的人，各自带着各自的风。",
      image: "images/full/005.svg",
      thumbnail: "images/thumb/005.svg",
      featured: false,
    },
    {
      id: "006",
      title: "无声对话",
      category: "人像",
      location: "上海 · 外滩",
      date: "2023-12",
      camera: "Sony A7R IV · 135mm f/1.8",
      story: "人群中两个对视的陌生人，三秒后又各自走开。",
      image: "images/full/006.svg",
      thumbnail: "images/thumb/006.svg",
      featured: false,
    },
    {
      id: "007",
      title: "雨巷",
      category: "街头",
      location: "苏州 · 平江路",
      date: "2024-06",
      camera: "Sony A7 III · 35mm f/4",
      story: "梅雨季的黄昏，一把红伞拐进了巷子深处。",
      image: "images/full/007.svg",
      thumbnail: "images/thumb/007.svg",
      featured: true,
    },
    {
      id: "008",
      title: "电车窗外",
      category: "街头",
      location: "香港 · 中环",
      date: "2024-03",
      camera: "Sony A7 III · 28mm f/5.6",
      story: "叮叮车二层，窗外擦过一整座城市的颜色。",
      image: "images/full/008.svg",
      thumbnail: "images/thumb/008.svg",
      featured: false,
    },
    {
      id: "009",
      title: "黄昏路口",
      category: "街头",
      location: "重庆 · 解放碑",
      date: "2023-10",
      camera: "Sony A7R IV · 55mm f/2.8",
      story: "下班的人潮在红灯前停了一拍。",
      image: "images/full/009.svg",
      thumbnail: "images/thumb/009.svg",
      featured: false,
    },
    {
      id: "010",
      title: "清晨的咖啡",
      category: "生活感照",
      location: "家里 · 窗台",
      date: "2024-09",
      camera: "Sony A7 III · 35mm f/2",
      story: "周末早上的第一杯，热气还没散。",
      image: "images/full/010.svg",
      thumbnail: "images/thumb/010.svg",
      featured: true,
    },
    {
      id: "011",
      title: "窗边书页",
      category: "生活感照",
      location: "北京 · 书房",
      date: "2024-01",
      camera: "Sony A7R IV · 50mm f/2",
      story: "翻到某一页的时候，光刚好落在标题上。",
      image: "images/full/011.svg",
      thumbnail: "images/thumb/011.svg",
      featured: false,
    },
    {
      id: "012",
      title: "阳台的猫",
      category: "生活感照",
      location: "家里 · 阳台",
      date: "2023-06",
      camera: "Sony A7 III · 85mm f/2",
      story: "它每天下午三点来这里，看同一片云。",
      image: "images/full/012.svg",
      thumbnail: "images/thumb/012.svg",
      featured: true,
    },
  ],

  /* ---- 关于我 ---- */
  about: {
    avatar: "images/avatar.svg",
    bio: [
      "你好，我是<strong>香蕉黄油拿铁</strong>，一名业余摄影爱好者。",
      "我用镜头记录两样东西：<strong>山川</strong>和<strong>日常</strong>。凌晨的雪山、深夜的湖面、巷口的猫、窗台上的咖啡——世界安静下来的时候，最好看。",
      "这个网站是我的小小作品集，记录每一次按下快门的理由。如果你也喜欢这些光影，欢迎通过下方方式找我聊聊。",
    ],
    timeline: [
      { year: "2021", event: "入手第一台相机，开始记录周末的远足" },
      { year: "2022", event: "第一次独自去高原，拍下第一张星空" },
      { year: "2023", event: "开始系统学习构图与后期" },
      { year: "2024", event: "走遍 6 个省份，作品超过 3000 张" },
      { year: "2025", event: "这个网站诞生，精选开始展出" },
    ],
  },

  /* ---- 联系 ---- */
  contact: {
    email: "hello@bananabutterlatte.com",
    socials: [
      { name: "微博", url: "#", note: "@香蕉黄油拿铁" },
      { name: "小红书", url: "#", note: "香蕉黄油拿铁" },
      { name: "Instagram", url: "#", note: "@bb.latte" },
    ],
  },
};
