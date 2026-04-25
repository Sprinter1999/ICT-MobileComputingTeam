# ICT Mobile Computing Team Website Refactor

本版本将原来单页个人主页式结构改为参考中国科学院计算技术研究所自然语言处理研究组网站的信息门户式课题组网站结构。

## 文件变更

### 需要替换的文件

- `index.html`：替换原仓库首页，改为课题组门户首页。

### 建议新增的文件

- `teachers.html`：指导教师页面。
- `group.html`：研究队伍页面。
- `publications.html`：论文论著页面。
- `contact.html`：联系我们页面。
- `assets/css/site.css`：全站新版样式文件。
- `assets/js/main.js`：语言切换、移动端菜单、当前页面高亮逻辑。
- `assets/img/lab-mark.svg`：课题组标识占位图，可后续替换为正式 logo。

### 原文件处理建议

- 原 `stylesheet.css` 可以保留作为备份，也可以不再引用。
- 原 `images/ICT.jpg` 可以继续保留，后续如需把首页 hero 区换成实景图，可在 `index.html` 或 `site.css` 中接入。
- 原 `mipnerf/`、`mipnerf360/`、`zipnerf/` 目录来自 fork 模板，若与课题组网站无关，可以在确认不使用后删除，保持仓库干净。

## 布局说明

- 顶部深蓝信息栏：放置中国科学院计算技术研究所、中国科学院和联系邮箱。
- 主导航：`主页 / Teachers / Group / Publication / Contact Us`，会根据当前页面自动高亮。
- 首页：包含课题组介绍、招生信息、新闻快讯、研究方向。
- Teachers：展示刘敏、王煜炜、孙胜、陈亚丽、徐刚。
- Group：展示在读硕士生、博士生和 alumni。
- Publication：展示近期代表性论文。
- Contact Us：展示邮箱、地址、招生说明和研究关键词。

## 使用方式

1. 将本文件夹中的所有文件复制到原 GitHub Pages 仓库根目录。
2. 提交并推送到 `master` 分支。
3. 等待 GitHub Pages 自动部署。
4. 访问：`https://sprinter1999.github.io/ICT-MobileComputingTeam/`

## 后续可继续完善

- 添加真实课题组合照、教师头像和学生头像。
- 将论文列表拆分为 BibTeX 或 JSON 数据源，便于维护。
- 增加 News 页面或动态页面。
- 如果需要中英文完全分离，也可以进一步拆成 `/zh/` 与 `/en/` 两套页面。

## 2026-04-25 Bug Fix

本次修复内容：

- 顶部、联系页、页脚不再直接显示邮箱地址，统一改为可点击的邮箱图标，点击后仍会通过 `mailto:` 打开邮件客户端。
- 修复点击 English 后页面可能空白的问题：语言状态从 `body.lang-en` 改为 `html[data-lang]` 控制，并加入 `localStorage` 异常保护。
- 修复关闭页面后再次打开仍可能无法显示的问题：页面加载早期会安全读取语言设置，异常时自动回退到中文页面。

若浏览器仍缓存旧版脚本，部署后请强制刷新一次页面：Windows 使用 `Ctrl + F5`，macOS 使用 `Cmd + Shift + R`。
