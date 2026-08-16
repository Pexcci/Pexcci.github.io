# 张志强的个人主页

一套基于个人简历制作的响应式个人主页，可直接部署到 GitHub Pages。项目使用原生 HTML、CSS 和 JavaScript，无需安装依赖或构建。

页面采用移动优先适配，支持手机浏览器、刘海屏安全区域、触控菜单，并可在部署后添加到手机主屏幕。首次在线打开后，主要页面资源可以离线访问。

## 文件说明

- `index.html`：主页结构与内容模块
- `styles.css`：页面样式、响应式布局和深浅色主题
- `script.js`：交互、主题切换和 GitHub 仓库同步
- `profile.js`：集中管理个人资料、项目和研究方向
- `assets/zhang-zhiqiang.jpg`：从简历中提取的个人照片
- `manifest.webmanifest`、`sw.js`：手机主屏幕安装和离线访问支持
- `standalone.html`：可直接发送到手机打开的单文件版本
- `GITHUB_PROFILE_README.md`：GitHub 账号首页专用介绍

## GitHub 账号

页面已配置 GitHub 用户名 `httpkaitou8`，会自动链接到账号并读取公开仓库。

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库，例如 `homepage`。
2. 把本文件夹内的全部内容上传到仓库根目录。
3. 在仓库中进入 `Settings` → `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 选择 `main` 分支和 `/ (root)` 目录，保存即可。

几分钟后，可通过 `https://你的用户名.github.io/homepage/` 访问。

## 设置 GitHub 账号首页

1. 新建一个与 GitHub 用户名完全相同的公开仓库。
2. 勾选创建 `README.md`。
3. 用 `GITHUB_PROFILE_README.md` 的内容替换仓库中的 `README.md`。

GitHub 会自动把它展示在你的账号首页。
