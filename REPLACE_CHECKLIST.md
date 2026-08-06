# REPLACE_CHECKLIST.md

> **生成日期：** 2026-08-06
> **目的：** 全项目遗留 ITom 品牌引用审计。不修改代码——仅记录查找结果。

---

## 1. React 源代码文件

### ✗ `src/main.jsx:7-13` — 控制台签名
```
%c TOM KING %c PORTFOLIO
Hi Jury! Check out the code quality.
```
**操作：** 替换为 Menglan World 控制台品牌签名。

---

### ✗ `src/hooks/useDocumentMeta.js:12-37` — 虚拟路由元数据
5 个路由全部为 ITom 品牌：
- `/` → `ITom — Creative 3D Portfolio`
- `/about` → `About Me — ITom Portfolio`
- `/gallery` → `Gallery & Projects — ITom Portfolio`
- `/studio` → `The Studio — ITom Portfolio`
- `/contact` → `Contact — ITom Portfolio`
- **第 85、90 行：** 硬编码 `https://itomdev.com` 用于 OG URL 和 canonical。

**操作：** 全部 5 个路由的 title/description 重新品牌化；域名替换为 `menglan.world`。

---

### ✗ `src/components/ui/ScreenReaderOverlay.jsx:29,33` — 无障碍文字
```jsx
<h1>ITom — Creative Developer Portfolio</h1>
<p>Welcome to ITom's interactive 3D portfolio...</p>
```

**操作：** 重新品牌化为 Menglan World。

---

### ✗ `src/components/canvas/rooms/Contact/ContactRoom.jsx:252` — 邮箱
```js
window.location.href = 'mailto:tomszma12@gmail.com';
```

**操作：** 替换为 MengLan 邮箱或移除。

---

### ✗ `src/components/canvas/rooms/Contact/ContactRoom.jsx:407,417,427,437` — 社交媒体链接
| 行号 | 平台 | URL |
|------|------|-----|
| 407 | LinkedIn | `tomasz-szmajda-259337305/` |
| 417 | GitHub | `github.com/ITomPoland` |
| 427 | Facebook | `facebook.com/people/ITom/...` |
| 437 | Instagram | `instagram.com/itom.dev/` |

**操作：** 替换为 MengLan 的社交链接或替换为占位符。

---

### ✗ `src/components/canvas/rooms/Contact/MessagePaper.jsx:156-158` — 允许的域名
```js
const ALLOWED_ORIGINS = [
    'itomdev.com',
    'www.itomdev.com',
    'portfolio-itom.pages.dev',
];
```

**操作：** 替换为 `menglan.world` / `www.menglan.world` / 新部署域名。

---

### ✗ `src/components/canvas/rooms/Studio/contentData.js` — 硬编码的社交媒体数据
**27 个条目**包含：
- `youtube.com/@itompoland`（6 次）
- `facebook.com/tomasz.szmajda.58`（8 次）
- `tiktok.com/@itompoland`（12 次）

**操作：** 替换为 MengLan 的内容数据，或清空并仅依赖 Sanity CMS。

---

### ✗ `src/components/canvas/rooms/About/InfiniteSkyManager.jsx:355,368` — 个人姓名渲染
```jsx
TOMASZ SZMAJDA
(ITOM)
```
通过 `RubikScribble` 字体渲染。

**操作：** 替换为 MengLan 品牌文字。

---

### ✗ `src/components/canvas/rooms/About/AboutRoom.jsx:28` — 故事里程碑数据
```js
{ id: 'intro', title: 'ITOM', subtitle: '< creative developer />' },
```

**操作：** 更新故事内容。

---

### ✗ `src/components/canvas/corridor/HeroText.jsx:17,57,100,134` — "ITOM" 英雄文字
Rubik Scribble 字体中的 "ITOM" 字母分裂效果。

**操作：** 替换为 "MENGLAN" 或等效品牌文字。

---

### ✗ `src/components/canvas/Experience.jsx:16,26` — 注释
```
// - ITOM/Avatar at Z≈5.5
// 3. Behind doors: infinite corridor with ITOM
```

**操作：** 更新注释。

---

### ✗ `src/components/canvas/entrance/EntranceDoors.jsx:301` — 注释
```
// Camera flies through - STOP CLOSER to avatar/ITOM
```

### ✗ `src/components/canvas/entrance/EmptyCorridor.jsx:10` — 注释
```
// No doors, no decorations, no ITOM
```

**操作：** 更新注释。

---

### ✗ `src/components/canvas/corridor/CorridorSegment.jsx:17,121` — 注释
```
// Each segment contains: walls, avatar, ITOM text, doors, decorations.
{/* ITOM Text - centered */}
```

**操作：** 更新注释。

---

### ✗ `src/context/AchievementsContext.jsx:25,99,122` — localStorage 键名
```js
localStorage.getItem('itom_achievements');
localStorage.setItem('itom_achievements', ...);
```

**操作：** 重命名为 `menglan_world_achievements` 或等效名称。（注意：会清除现有用户的成就——考虑迁移。）

---

### ✗ `src/components/canvas/rooms/About/mobile_opt.cjs:3` — 旧文件路径
```
const FILE_PATH = 'c:/Users/tomsz/Desktop/portfolio/portfolio-itom/...';
```

### ✗ `src/components/canvas/rooms/About/mobile_opt2.cjs:2` — 旧文件路径
```
const FILE_PATH = 'c:/Users/tomsz/Desktop/portfolio/portfolio-itom/...';
```

### ✗ `src/components/canvas/rooms/About/fix_hover_stutter.cjs:3` — 旧文件路径
```
const FILE_PATH = 'c:/Users/tomsz/Desktop/portfolio/portfolio-itom/...';
```

**操作：** 3 个 `.cjs` 文件是过期的优化脚本，包含旧作者文件系统路径。删除或更新。

---

## 2. 项目根目录文件

### ✗ `seo-plugin.js` — 构建时 JSON-LD 生成器
**重度 ITom 品牌化**（~40 处引用）：
- `@id: 'https://itomdev.com/...'` — 15 个 JSON-LD 节点
- `name: 'Tomasz Szmajda'`, `alternateName: ['ITom', 'ITom Dev', ...]`
- `'Portfolio Projects by Tomasz "ITom" Szmajda'`
- `'Web Design Awards received by Tomasz "ITom" Szmajda'`
- 回退标题：`'ITom - Creative Developer'`
- `llms.txt` 生成：硬编码 `itomdev.com` 回退和 Tomasz 引用
- 社交媒体 `sameAs` 链接来自 Sanity `globalInfo`

**操作：** 全文重写——替换所有 `itomdev.com` → `menglan.world`，`Tomasz Szmajda` → `MengLan`，`ITom` 引用 → 移除。（注意：`@id` URL 更改可能会影响已索引的 schema 实体。）

---

### ✗ `LICENSE:3` — 版权声明
```
Copyright (c) 2026 Tomasz Szmajda
```

**操作：** 更新版权所有者。（注意：如果保留原有版权归属，请咨询法律意见。）

---

### ✗ `README.md:64,191-205` — 致谢与版权
- **第 64 行：** `git clone` URL 使用 `MengLan/menglan_world.git`（可能需要更新）
- **第 191-205 行：** "Acknowledgments" 章节引用 Tomasz Szmajda 和原始仓库
- 版权提示：`All personal assets... are copyright of Tomasz Szmajda`

**操作：** 决定归属策略——保留致谢但更新为当前品牌？完全移除？更新版权提示。

---

### ✗ `TODO.md:1` — 标题
```
# 🎨 Portfolio ITOM — Master To-Do List
```

### ✗ `TODO.md` — 旧文件路径（8 处引用）
```
c:/Users/tomsz/Desktop/portfolio/portfolio-itom/...
```

**操作：** 重新品牌化标题 + 更新文件路径，或如果已过时则完全移除。

---

### ✗ `MY_PROJECT_SPEC.md:3,33...` — 项目规格说明书
全文广泛引用 ITom（~20 处）：
- **第 3 行：** `ITom 3D Interactive Portfolio — 项目需求规格说明书`
- **第 33 行：** `ITom Dev — Interactive 3D Creative Developer Portfolio`
- **第 565 行：** `itom_achievements` localStorage 键
- **第 582 行：** `/portfolio-itom/` 路径引用
- 全文多处

**操作：** 全面审查和重新品牌化。这是重构规格说明书——需要与重构目标保持一致。

---

### ✗ `.agent/PROJECT.md:1` — Agent 文档标题
```
# 🎨 Portfolio ITOM - Project Documentation
```

**操作：** 重新品牌化标题 + 内容审查。

---

## 3. `public/` 静态资源

### ✗ `public/_headers:1` — 旧部署域名
```
https://portfolio-itom.pages.dev/*
  X-Robots-Tag: noindex
```

**操作：** 如果有新的 Cloudflare Pages 域名，请更新（如果未部署则移除）。

---

## 4. `portfolio-itom/` — Sanity Studio 项目

### ✗ `portfolio-itom/package.json:2` — npm 包名
```json
"name": "portfolio-itom"
```

### ✗ `portfolio-itom/package-lock.json:2,8` — lockfile 名称

### ✗ `portfolio-itom/sanity.config.js:8` — Studio 标题
```js
title: 'portfolio-itom',
```

### ✗ `portfolio-itom/schemaTypes/globalInfo.js:10` — Schema 描述
```
description: 'The title of your website... (e.g. ITom - Creative Developer)'
```

**操作：** 重命名 Sanity 项目 + 更新描述。请注意，更改 Sanity `name` 可能会影响已部署的 CMS 实例。

---

## 5. `package.json` 与 lockfile（根目录）

### ✓ `package.json:2` — 已清理
```json
"name": "menglan_world"
```
✅ 正确。

### ✗ `package-lock.json:2,8` — 旧名称
```json
"name": "portfolio-itom"
```

**操作：** 运行 `npm install` 重新生成 lockfile（将拾取 `menglan_world` 项目名称）。

---

## 6. 未追踪/临时文件

### ✗ `localhost_5173-20260403T205917.html` — 构建产物（未追踪？）
出现在搜索结果中——可能是抓取的页面快照或测试输出。

**操作：** 确认文件是否应提交。可能属于 `.gitignore`。

---

## 7. 静态资源（Logo / SVG / Favicon）

### `/public/vite.svg` 和 `/src/assets/react.svg`
两个文件都是默认的 Vite/React 模板 SVG，非 ITom 专属。低优先级。

### `/public/favico.png`
当前网站图标。非品牌专属，但可能需要自定义 Menglan World 图标。

### `/public/og-image.webp`
当前 OpenGraph 图片。很可能包含 ITom 品牌。需要重新生成。

**操作：** 替换 `og-image.webp`。考虑用 Menglan World 品牌替换 `favico.png`。

---

## 8. CLAUDE.md

### ✗ `CLAUDE.md:114`
```bash
cd portfolio-itom && npm run dev
```

### ✗ `CLAUDE.md:140`
```
| `portfolio-itom/schemaTypes/` | Sanity Schema（5 个类型） |
```

**操作：** 更新为 Sanity Studio 的新名称（如果已重命名）。

---

## 汇总统计

| 类别 | 文件数 | 预计需修改行数 |
|------|--------|---------------|
| React 源代码 | 14 | ~80 |
| 根目录配置文件 | 5 | ~70 |
| `seo-plugin.js` | 1 | ~40 |
| `portfolio-itom/`（Sanity） | 4 | 5 |
| `public/` 静态资源 | 3 | 3 |
| 临时/Agent 文件 | 3 | 5 |
| **总计** | **30** | **~200** |

---

## 建议优先级

| 优先级 | 范围 |
|----------|-------|
| **P0（关键）** | `useDocumentMeta.js` — 运行时 meta 标签 + 域名 |
| **P0（关键）** | `ContactRoom.jsx` — 个人邮箱 + 社交链接 |
| **P0（关键）** | `ScreenReaderOverlay.jsx` — 无障碍文字 |
| **P1（高）** | `seo-plugin.js` — JSON-LD / SEO 结构化数据 |
| **P1（高）** | `InfiniteSkyManager.jsx` + `AboutRoom.jsx` — 屏幕上可见的姓名 |
| **P1（高）** | `HeroText.jsx` — "ITOM" 英雄文字 |
| **P1（高）** | `main.jsx` — 控制台签名 |
| **P2（中）** | `contentData.js` — 27 条硬编码的社交媒体条目 |
| **P2（中）** | `MessagePaper.jsx` — 允许的来源域名 |
| **P2（中）** | `LICENSE` — 版权所有者 |
| **P2（中）** | `README.md` — 致谢 + 版权 |
| **P3（低）** | 代码注释（Experience、EntranceDoors、EmptyCorridor 等） |
| **P3（低）** | `AchievementsContext.jsx` — localStorage 键名 |
| **P3（低）** | 3 个 `.cjs` 优化脚本（可删除） |
| **P3（低）** | `public/og-image.webp` + `public/favico.png` |
