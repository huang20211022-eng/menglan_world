# CHANGELOG.md

> 永久追加，每次完成一个模块在末尾添加新的记录。

---

## 2026-08-07 — Hero V1 内容注入

**模块：** Hero 首页文案 + 联系方式

**修改内容：**
- HeroText.jsx：副标题 `creative developer` → `AI Developer`，新增 Slogan 行
- index.html：Meta Title/Description、OG、Twitter Card、sr-only-seo 全部更新
- useDocumentMeta.js：5 个路由统一 `Menglan World` → `Menglan`，Title/Description 更新
- ScreenReaderOverlay.jsx：h1 标题、欢迎语更新
- AchievementsContext.jsx：`corridor_enter` 成就 CTA → `Enter Portfolio`
- ContactRoom.jsx：邮箱、LinkedIn/GitHub URL、FACEBOOK→YOUTUBE、INSTAGRAM→WEBSITE
- seo-plugin.js：4 处 fallback title/description 更新
- main.jsx：控制台签名更新为 slogan

**构建：** ✅ 通过

**Commit：** 待提交

---

## 2026-08-06 — P1 Branding 重构

**模块：** SEO Plugin + 控制台 + Hero Text + About Room

**修改内容：**
- seo-plugin.js：~40 处 `itomdev.com` → `menglan.world`，Tomasz Szmajda → Menglan，ITom → Menglan World
- main.jsx：控制台签名 TOM KING PORTFOLIO → MENGLAN WORLD
- HeroText.jsx：ITOM（4 字母）→ MENGLAN（7 字母），重新计算 letter positions + split directions
- InfiniteSkyManager.jsx：TOMASZ SZMAJDA → MENGLAN WORLD，(ITOM) → Menglan World
- AboutRoom.jsx：intro milestone title/subtitle rebrand

**构建：** ✅ 通过

**Commit：** `c94716b`

---

## 2026-08-06 — CLAUDE.md 重构 + 文档化

**模块：** 项目文档

**修改内容：**
- CLAUDE.md：从 124KB 精简至 35,134 字节，保留核心架构、设计理由、10 条设计哲学、4 阶段路线图
- ITOM_ANALYSIS.md（新）：39,088 字节，迁移详细 API 参考、GSAP 模式目录、Shader GLSL 代码、已知 bug
- REPLACE_CHECKLIST.md（新）：369 行全项目 ITom 品牌审计（30 文件，~200 引用）

**构建：** ✅ 通过

**Commit：** `6c9761f`

---

## 2026-08-06 — P0 ScreenReaderOverlay Rebrand

**模块：** 无障碍覆盖层

**修改内容：**
- ScreenReaderOverlay.jsx：13 处修改——ITom → Menglan World，全部第一人称 "my/me" → 中性措辞

**构建：** ✅ 通过

**Commit：** `ccd1d25`

---

## 2026-08-06 — P0 useDocumentMeta + ContactRoom Rebrand

**模块：** 虚拟路由 + 联系房间

**修改内容：**
- useDocumentMeta.js：5 个路由 title/description rebrand，`itomdev.com` → `menglan.world`
- ContactRoom.jsx：邮箱 `tomszma12@gmail.com` → `hello@menglan.world`，LinkedIn/GitHub/Facebook/Instagram 链接更新

**构建：** ✅ 通过

**Commit：** `cb86e16`

---

## 2026-08-06 — 网站 Branding 全局替换

**模块：** index.html + sitemap.xml + _headers

**修改内容：**
- index.html：title、meta description、author、keywords、OG、Twitter Card、sr-only SEO 块全部 rebrand
- sitemap.xml：5 条 URL `itomdev.com` → `menglan.world`，lastmod 更新
- _headers：7 条域名规则 `itomdev.com` → `menglan.world`

**构建：** ✅ 通过

**Commit：** `d1b526a`

---

## 2026-08-05 — 项目身份初始化

**模块：** 项目元数据

**修改内容：**
- package.json：`portfolio-itom` → `menglan_world`
- README.md：重写为 Menglan World 品牌
- 初始化 CLAUDE.md 项目记忆文件
- 生成 MY_PROJECT_SPEC.md 需求规格文档

**构建：** ✅ 通过

**Commit：** `475403e`

---

## 2026-02 ~ 2026-07 — ITom 原始开发

**模块：** 全项目（ITom 时代）

**内容：**
- 三轮 ITom 项目深度分析完成
- React + Three.js (R3F) + GSAP + Vite 完整技术栈
- 4 个交互房间 + 无限走廊 + 自定义 Shader 系统
- 传送系统、虚拟路由、成就系统、音频管理
- 性能分级（HIGH/MEDIUM/LOW）、设备自适应
- Sanity CMS 集成

**Commits：** `9845fba` ~ `298c4fd`（ITom 时代）

---

## 2026-08-07 — About Room 技术分析 + 内容规划

**模块：** About Room 完整审计 + 内容设计

**完成内容：**
- About Room 全部 8 个源文件深度阅读与分析
- 46 个纹理文件审计（含 backups/ 目录 27 个遗留文件）
- 识别：可保留技术模块（80% 代码不动）vs 需替换的内容（~20 行文字 + ~15 张纹理 + 硬编码数据）
- `docs/ABOUT_CONTENT_PLAN.md` 创建：品牌定位 + 4 个 Milestone 内容规划 + 素材优先级矩阵 + V1/V2/V3 开发路线
- About Room 架构图：AboutRoom → InfiniteSkyManager → SkyChunk + 4 个 Milestone 组件
- 技术结论：动量滚动、飞行效果、云系统、气球爆裂机制全部可保留
- `docs/PROJECT_STATUS.md` 更新：About Room 进入内容设计阶段
- 遗留产物发现：
  - `FEATURED.webp` — 代码引用但文件不存在
  - `fix_hover_stutter.cjs`, `mobile_opt.cjs`, `mobile_opt2.cjs` — Tomasz 本地工具脚本
  - `StoryMilestone.jsx` — 未被实际使用的通用模板组件

**构建：** N/A（未修改源码）

**Commit：** 待提交
