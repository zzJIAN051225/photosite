# 部署到 GitHub Pages（图文步骤）

> 你的部署包在：`D:\dsh\photosite\github-pages`
> 总共 126 个文件，需要**分 2 次上传**（GitHub 单次最多 100 个文件）

---

## 第 1 步：创建仓库（1 分钟）

1. 打开 **https://github.com** 并登录你的账号
2. 点右上角 **「+」** → **「New repository」**
3. 仓库名（Repository name）填：`photosite`
4. 可见性选 **「Public」**（公开，GitHub Pages 免费版要求公开）
5. **不要**勾选 "Add a README file"（保持空仓库）
6. 点绿色按钮 **「Create repository」**

---

## 第 2 步：上传文件（分 2 次）

创建完成后会进入空仓库页面，会看到 **"uploading an existing file"** 链接。

### 第 2a 次：上传"非图片"文件（18 个）

1. 打开文件夹 `D:\dsh\photosite\github-pages`
2. 把以下内容拖进上传区：
   - `index.html`、`motion.html`、`about.html`、`contact.html`、`video.html`、`部署到GitHub步骤.md`
   - `css\` 整个文件夹（2 个文件）
   - `js\` 整个文件夹（7 个文件）
   - `images\` 根目录 3 个文件（hero-bg.webp、hero-bg.svg、avatar.svg）
3. **注意**：第 2a 次**不要**上传 `images\motion` 文件夹里的内容！
4. 页面底部 Commit 框写：`add site files`，点 **「Commit changes」**

### 第 2b 次：上传图片（108 个）

1. 回到仓库页面，点 **「Add file」** → **「Upload files」**
2. 打开 `D:\dsh\photosite\github-pages\images\motion` 文件夹
3. **全选**里面的 108 个 `.webp` 文件，拖进上传区
   - ⚠️ 如果超过 100 个，先传前 90 个，再传剩下的（GitHub 会自动跳过同名文件，重复传不碍事）
4. 页面底部 Commit 框写：`add photos`，点 **「Commit changes」**

> 💡 拖拽上传时，GitHub 会自动保留文件夹结构（images/motion/...），不用手动建目录。

---

## 第 3 步：启用 GitHub Pages（1 分钟）

1. 在仓库页面顶部菜单点 **「Settings」**（设置）
2. 左侧菜单往下找 **「Pages」**（在 "Code and automation" 分组下）
3. **「Build and deployment」** 区域：
   - Source（来源）选 **「Deploy from a branch」**
   - Branch（分支）选 **`main`**
   - 文件夹选 **`/ (root)`**
4. 点 **「Save」**
5. 等待 1~2 分钟，页面顶部会出现网址：
   ```
   https://你的用户名.github.io/photosite/
   ```

---

## 第 4 步：完成！验证

用手机或任何浏览器打开上面的网址：

- `https://你的用户名.github.io/photosite/` → 首页
- `https://你的用户名.github.io/photosite/motion.html` → 作品集
- `https://你的用户名.github.io/photosite/about.html` → 关于我

**全世界上网的人都能访问了！** 🎉

---

## 📌 重要说明

| 项目 | 说明 |
|------|------|
| 后台管理 | GitHub Pages 只支持静态页面，**后台（上传/编辑）只能在你自己电脑本地用**（双击 `启动网站.bat`） |
| 更新照片 | 以后加照片：本地改好后，重新上传改动的 `js/motion-data.js` + 新图片到仓库即可 |
| 数据同步 | 前台展示数据在 `js/motion-data.js`（后台每次改动会自动同步生成） |

---

## 常见问题

**Q: 上传时提示文件太多？**
A: 分批传，每次 ≤ 100 个文件即可。

**Q: 网址打不开 / 404？**
A: 检查第 3 步是否保存成功；等待 2 分钟后刷新。确认网址拼写：`用户名.github.io/仓库名/`。

**Q: 想用自己的域名？**
A: 在 Settings → Pages → Custom domain 填你的域名，并在域名服务商加 CNAME 指向 `用户名.github.io`。
