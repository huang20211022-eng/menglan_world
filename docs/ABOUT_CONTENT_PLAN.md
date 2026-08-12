# ABOUT_CONTENT_PLAN.md

> **About Room 内容规划文档**
>
> 创建日期：2026-08-07
> 版本：v1.0
> 状态：内容设计阶段（开发前）

---

## 目录

1. [品牌定位](#1-品牌定位)
2. [Milestone 1 — Intro（个人介绍）](#2-milestone-1--intro个人介绍)
3. [Milestone 2 — Projects & Impact（项目与成就）](#3-milestone-2--projects--impact项目与成就)
4. [Milestone 3 — Journey（飞行旅程）](#4-milestone-3--journey飞行旅程)
5. [Milestone 4 — Skills（技术武器库）](#5-milestone-4--skills技术武器库)
6. [素材需求总览](#6-素材需求总览)
7. [素材优先级矩阵](#7-素材优先级矩阵)
8. [About Room 开发路线](#8-about-room-开发路线)
9. [附录：现有技术资产清单](#9-附录现有技术资产清单)

---

## 1. 品牌定位

### 1.1 原始品牌（Tomasz / ITom）

| 维度 | 原始内容 |
|------|---------|
| **身份** | Creative Developer — 视觉设计师 + Three.js 开发者 |
| **核心叙事** | "我在大学学计算机科学，同时做自由职业，获得了 Awwwards SOTD" |
| **成就体系** | Awwwards Site of the Day/Month/Year + CSS Design Awards |
| **技术栈** | React, Three.js, GSAP, JavaScript, CSS, Next.js, HTML, Git, Figma, Firebase |
| **语气** | "Crafting digital experiences that push creative boundaries" — 设计师式的艺术表达 |

### 1.2 新品牌定位（Menglan / AI Developer）

| 维度 | 目标定位 |
|------|---------|
| **身份** | AI Developer / Freelancer — 用 AI + 代码构建自动化与智能体验 |
| **核心叙事** | 待你提供：你的学习/职业旅程、项目成就、技术专长 |
| **成就体系** | 待你定义：AI 项目 / 开源贡献 / 认证 / 客户案例 |
| **技术栈** | 待你提供：你的真实技能栈 |
| **语气** | 待你定义：专业/亲切/极客/创意？保持 "第一人称" 还是 "中性化"？ |

### 1.3 About Room 概念重新定位

```
原始概念："设计师的云端奖项陈列室"
    ↓
新概念："AI 探索者的飞行日志"

用户滚动的过程 = 穿越你的技术成长史
云层 = AI 时代的信息海洋
纸飞机 = 你的探索精神
浮动岛屿 = 你的教育/职业里程碑
技能气球 = 你的技术武器库，点击"引爆"揭示细节
```

---

## 2. Milestone 1 — Intro（个人介绍）

### 2.1 当前状态

| 元素 | 当前内容 | 替换状态 |
|------|---------|---------|
| 标题 (Rubik Scribble) | `MENGLAN WORLD` | ✅ 已替换 |
| 副标题 (Cabin Sketch) | `Menglan World` | ✅ 已替换 |
| 格言 Line 1 (Cabin Sketch italic) | `"Crafting digital experiences` | 🔴 需替换 |
| 格言 Line 2 (Cabin Sketch italic) | `that push creative boundaries"` | 🔴 需替换 |
| 云端头像 | `awatarnachmurce.webp` (Tomasz) | 🔴 需替换 |

### 2.2 内容规划

| 元素 | 说明 | 字数限制 |
|------|------|---------|
| **标题** | 你的名字/品牌名。3D Text，Rubik Scribble 字体。当前已为 MENGLAN WORLD，可保留或改为中文名 | ~15 字符 |
| **副标题** | 你的身份标签。例：`AI Developer & Automation Engineer`。Cabin Sketch Regular 字体 | ~40 字符 |
| **格言 Line 1** | 你的核心信念/定位语第一行。例：`"Building intelligent systems` | ~35 字符 |
| **格言 Line 2** | 格言第二行。例：`that solve real-world problems"` | ~35 字符 |
| **云端头像** | 你的照片放在云上的圆形区域。PNG/WebP，建议 2816×1536 保持与原始宽高比一致（避免拉伸） | 图片 |

### 2.3 动画保留

```
保留：spread 动画（元素靠近相机时向左右散开）
保留：头像浮动动画（sin(time) × 0.15 上下浮动）
保留：spreadFactor 缓出曲线 (spreadFactor = spreadFactor²)
```

---

## 3. Milestone 2 — Projects & Impact（项目与成就）

### 3.1 当前状态（Awards Milestone）

原始设计是 3 张浮动卡片（SOTY / SOTD / SOTM）+ 每张卡片 VIEW 按钮 → 打开 GlobalOverlay 证书网格。

| 元素 | 当前内容 | 替换状态 |
|------|---------|---------|
| SOTY 卡片 | Site of the Year — 顶部中间，向上浮出 | 🔴 需替换 |
| SOTD 卡片 | Site of the Day (×4 证书) — 左侧，向右展开 | 🔴 需替换 |
| SOTM 卡片 | Site of the Month (0 条空数组) — 右侧，向左展开 | 🔴 需替换 |
| 卡片纹理 | SOTY/SOTD/SOTM .webp + _painted | 🔴 需替换 |
| 证书大图 | SOTDAYYOUNGMULTI*.webp (×4) — GlobalOverlay 证书查看 | 🔴 需替换 |
| VIEW 按钮 | button.webp / button_painted.webp | ✅ 保留 |
| 分类标签 | "SOTD" / "SOTM" / "OTHER" | 🔴 需替换 |
| mock 数据 | AWARDS_DATA (行 416-471) — 全部 Tomasz 奖项 | 🔴 需重写 |

### 3.2 内容规划

建议将 "Awards" 改为 **"Projects & Impact"**，3 张卡片改为：

| 卡片 | 位置 | 建议用途 | 内容 |
|------|------|---------|------|
| **主卡片** (原 SOTY) | 中心上方，重点 | **Featured Project** — 你最自豪的项目 | 项目封面图 + 描述 + 链接 |
| **左卡片** (原 SOTD) | 左侧 | **AI & Automation** — AI 相关项目集合 | 多个项目的证书网格视图 |
| **右卡片** (原 SOTM) | 右侧 | **Open Source / Community** — 开源贡献或社区参与 | 多个项目的证书网格视图 |

#### 每张卡片的数据结构（与现有 AWARDS_DATA 兼容）

```javascript
{
    id: 'project-featured',
    layout: 'certificate_grid',     // 保留——复用 GlobalOverlay 的证书网格布局
    title: 'Featured Projects',
    items: [
        {
            label: '项目名称',
            date: '2025-01',
            image: '/textures/about/xxx.webp',  // 证书/截图大图
            url: 'https://...'
        },
        // ... 更多项目
    ],
    platformConfig: {
        label: 'PROJECT',           // 替换原来的 'HONOR'/'AWARD'/'PRESTIGE'
        color: '#1a1a1a',
        icon: '🚀'                  // 替换 ⭐/🏆/👑
    }
}
```

### 3.3 动画保留

```
保留：3 张卡片的 Z 深度叠放（SOTY 在最前面）
保留：卡片 spread 动画（左右卡片向外展开）
保留：SOTY 卡片向上浮出动画 (sotyFactor)
保留：hover 画笔揭示 + VIEW 按钮 hover 效果
保留：AwardButton: gsap.to(uProgress) + scale lerp
保留：GlobalOverlay certificate_grid 响应式网格布局
```

---

## 4. Milestone 3 — Journey（飞行旅程）

### 4.1 当前状态

| 元素 | 当前内容 | 替换状态 |
|------|---------|---------|
| 标题 | `JOURNEY` | ✅ 保留（或改为中文） |
| 副标题 | `My path so far...` | 🔴 需替换 |
| 左岛纹理 | `uowyspa.webp` (University of Opole 岛) | 🔴 需替换 |
| 左岛标签 | `2025-NOW` | 🔴 需替换 |
| 右岛纹理 | `freelancewyspa.webp` (Freelance 岛) | 🔴 需替换 |
| 右岛标签 | `2023-NOW` | 🔴 需替换 |

### 4.2 内容规划

两个浮动岛屿的设计非常好——建议保留这个双岛隐喻：

| 岛屿 | 建议主题 | 标签示例 | 纹理建议 |
|------|---------|---------|---------|
| **左岛** (位置 -3.5, 浮起 1.5) | **Education & Foundation** — 你的学习经历 | `2020-2024` | 手绘风格学校/学习场景 |
| **右岛** (位置 +3.5, 浮起 2.5) | **Career & Projects** — 你的职业自由职业旅程 | `2024-NOW` | 手绘风格工作/AI 场景 |

#### 岛屿纹理规格

```
原始尺寸：2816×1536 (与原始一致，避免遗留宽高比修正逻辑)
格式：WebP
风格：手绘素描 + 彩绘版 (_painted)
内容：岛屿上可以有代表性建筑/符号
  - 教育岛：学校建筑、书本、电脑
  - 职业岛：AI 机器人、代码符号、云服务图标
```

### 4.3 动画保留

```
保留：岛屿从云下浮出动画 (revealFactor: startY → endY)
保留：浮动摆动动画 (sin(time) × 0.2-0.25)
保留：岛屿微旋转 (sin(time) × ±0.05)
保留：标题 + 副标题固定在顶部
```

---

## 5. Milestone 4 — Skills（技术武器库）

### 5.1 当前状态

10 个技能气球，3 种尺寸（large/medium/small），点击→爆裂→技能名浮出→3 秒后淡出→新气球从下方升起。

| 气球 | 尺寸 | 当前技能 | 动作 |
|------|------|---------|------|
| 1 | large | React | ⚠️ 按需决定保留或替换 |
| 2 | large | Three.js | ⚠️ 按需 |
| 3 | large | GSAP | ⚠️ 按需 |
| 4 | medium | JavaScript | ✅ 通用 |
| 5 | medium | CSS | ✅ 通用 |
| 6 | medium | Next.js | ⚠️ 按需 |
| 7 | small | HTML | ✅ 通用 |
| 8 | small | Git | ✅ 通用 |
| 9 | small | Figma | ⚠️ AI Developer 可能不需要 |
| 10 | small | Firebase | ⚠️ AI Developer 可能不需要 |

### 5.2 内容规划

**配比不变：** 保持 3 large + 3 medium + 4 small = 10 个气球的结构不变。

#### 建议技能配比（待你确认）

| 优先级 | 尺寸 | 建议技能 | 理由 |
|--------|------|---------|------|
| large | 3.0× | Python | AI/ML 核心语言 |
| large | 3.0× | AI & LLM | LangChain / OpenAI / Claude API |
| large | 3.0× | Automation | n8n / Zapier / 自定义工作流 |
| medium | 2.2× | React | 前端框架 |
| medium | 2.2× | TypeScript | 类型安全 |
| medium | 2.2× | Docker | 容器化部署 |
| small | 1.6× | Node.js | 后端 |
| small | 1.6× | Git | 版本控制 |
| small | 1.6× | Vite | 构建工具 |
| small | 1.6× | Tailwind | CSS 框架 |

### 5.3 关于自定义气球纹理

**如果可以生成纹理：** 每个技能需要 `xxxduzybalon.webp` + `xxxduzybalon_painted.webp` 一对（sketch 版 + 彩绘版）。如果暂时无法生成手绘风格气球纹理，可以采用以下策略：

| 策略 | 说明 | 适用阶段 |
|------|------|---------|
| **A. 保留现有纹理，只改标签** | React/JS/CSS/HTML/Git 这 5 个不变；Three.js/GSAP/Next.js/Figma/Firebase 暂时保留纹理但改标签文字 | V1 |
| **B. 用简单图形替代** | 生成彩色椭圆 + 文字作为临时气球（不是手绘风格，但功能正确） | V1→V2 过渡 |
| **C. 定制手绘纹理** | 请艺术家手绘新技能气球（与网站风格一致） | V2/V3 |

### 5.4 动画保留

```
保留：气球从下方浮上动画 (revealFactor: config.y-8 → config.y)
保留：hover 画笔揭示 + 磁性跟随 (mouse position → targetMagnet)
保留：点击爆裂动画 (popRef → scale + opacity)
保留：技能名浮出 + 3 秒后淡出
保留：respawn 机制 (从下方重新升起)
保留：spread 散开动画 (靠近相机时向两侧扩散)
保留：PositionalAudio 爆裂音效 (baloonpoop.mp3)
```

---

## 6. 素材需求总览

### 6.1 文字素材

| # | Milestone | 内容 | 字数 | 优先级 |
|---|-----------|------|------|--------|
| T1 | Intro | 格言 Line 1 | ≤35 字符 | P0 |
| T2 | Intro | 格言 Line 2 | ≤35 字符 | P0 |
| T3 | Intro | 副标题（身份标签） | ≤40 字符 | P1 |
| T4 | Projects | 主卡片标题 | ≤20 字符 | P0 |
| T5 | Projects | 左卡片标题 | ≤20 字符 | P0 |
| T6 | Projects | 右卡片标题 | ≤20 字符 | P0 |
| T7 | Projects | 每张卡片分类标签 (3 个) | ≤10 字符 | P1 |
| T8 | Projects | 每个项目：名称 + 日期 + 描述 | 各 ≤100 字符 | P0 |
| T9 | Journey | 副标题 | ≤40 字符 | P1 |
| T10 | Journey | 左岛标签 | ≤15 字符 | P0 |
| T11 | Journey | 右岛标签 | ≤15 字符 | P0 |
| T12 | Skills | 副标题 | ≤40 字符 | P1 |
| T13 | Skills | 10 个技能标签 (label) | 各 ≤15 字符 | P0 |

### 6.2 图片素材

| # | Milestone | 文件 | 规格 | 优先级 |
|---|-----------|------|------|--------|
| I1 | Intro | 云端头像 | WebP, 建议 2816×1536 (与原始一致) | P1 |
| I2 | Projects | 主卡片 sketch 纹理 | WebP, 2400×1760 (与原始一致) | P1 |
| I3 | Projects | 主卡片 painted 纹理 | WebP, 2400×1760 | P1 |
| I4 | Projects | 左卡片 sketch 纹理 | WebP, 2400×1760 | P2 |
| I5 | Projects | 左卡片 painted 纹理 | WebP, 2400×1760 | P2 |
| I6 | Projects | 右卡片 sketch 纹理 | WebP, 2400×1760 | P2 |
| I7 | Projects | 右卡片 painted 纹理 | WebP, 2400×1760 | P2 |
| I8 | Projects | 每个项目的证书/截图大图 | WebP, 不限尺寸 | P1 |
| I9 | Journey | 教育岛纹理 | WebP, 2816×1536 | P2 |
| I10 | Journey | 职业岛纹理 | WebP, 2816×1536 | P2 |
| I11 | Skills | 新增技能气球 sketch (每项) | WebP, 各技能不同宽高比 | P3 |
| I12 | Skills | 新增技能气球 painted (每项) | WebP, 各技能不同宽高比 | P3 |

### 6.3 外部链接

| # | Milestone | 内容 | 优先级 |
|---|-----------|------|--------|
| L1 | Projects | 每个项目的 URL（GitHub/部署地址） | P0 |
| L2 | Projects | 奖项/认证的证书链接 | P2 |

### 6.4 品牌定义

| # | 内容 | 优先级 |
|---|------|--------|
| B1 | 你的 Title/身份标签（如 "AI Developer & Automation Engineer"） | P1 |
| B2 | 个人品牌语气：专业/亲切/极客/创意？ | P1 |
| B3 | 中文名 vs 英文名（菜单中显示哪个） | P1 |
| B4 | 个人照片（至少 1 张，用于头像） | P1 |

---

## 7. 素材优先级矩阵

```
          │ 阻塞开发   │  提升品质    │  锦上添花
──────────┼───────────┼─────────────┼─────────────
 文字     │ P0 (8项)  │  P1 (6项)   │  —
 图片     │ —         │  P1 (3项)   │  P2 (7项) + P3 (20项)
 链接     │ P0 (项目) │  P2 (证书)  │  —
 品牌定义 │ —         │  P1 (3项)   │  —
```

### P0（阻塞 About Room V1 开发）

这些素材缺失会导致无法推进内容替换：

1. **T1-T2**：Intro 格言 (2 行)
2. **T4-T6**：3 张项目卡片的标题
3. **T8**：每个项目的名称、日期
4. **T10-T11**：Journey 双岛标签 (2 个)
5. **T13**：10 个技能标签
6. **L1**：每个项目的 URL

### P1（V1 完成后立即需要）

7. **T3**：Intro 副标题（身份标签）
8. **T7**：每张卡片的分类标签
9. **T9**：Journey 副标题
10. **T12**：Skills 副标题
11. **I1**：云端头像
12. **I2-I3**：主卡片纹理
13. **I8**：项目截图 (V1 可用现有 SOTD 纹理占位)
14. **B1-B4**：品牌定义

### P2（About V2）

15. **I4-I7**：项目卡片纹理（全部 3 张）
16. **I9-I10**：Journey 岛屿纹理
17. **L2**：证书链接

### P3（About V3 / 最后）

18. **I11-I12**：新技能气球纹理（全部 20 张）
19. Sanity 内容接入和动态化

---

## 8. About Room 开发路线

### 8.1 总体策略

**"渐进式替换"** — 每次替换一组内容，保持项目始终可构建可运行。

```
V1 (文字层) → V2 (图片层) → V3 (数据层)
  ~2 小时        ~1-2 天         ~2-3 天
```

### 8.2 About V1：文字与数据替换（P0 素材到位后）

**目标：** 零视觉改动，只替换文字和数据。所有现有纹理保持不变（包括 Tomasz 的气球和岛屿纹理——它们作为"占位符"继续工作）。

**范围：**

| 文件 | 改动内容 |
|------|---------|
| `InfiniteSkyManager.jsx` | AWARDS_DATA mock 数据重写（行 416-471） |
| `InfiniteSkyManager.jsx` | IntroMilestone 格言替换（行 393, 407） |
| `InfiniteSkyManager.jsx` | JourneyMilestone 副标题 + 标签（行 917, 940, 963） |
| `InfiniteSkyManager.jsx` | SkillsMilestone 副标题（行 1414） |
| `InfiniteSkyManager.jsx` | BALLOON_CONFIG 标签文字（行 977-993 的 label 字段） |
| `InfiniteSkyManager.jsx` | Awards 卡片标签（行 676 "SOTD", 736 "SOTM", 797 "OTHER"） |
| `InfiniteSkyManager.jsx` | Awards 标题（行 627 "AWARDS"） |
| `AboutRoom.jsx` | STORY_MILESTONES journey subtitle（行 30） |

**不改动：**
- 所有纹理文件
- 所有动画代码
- 所有 Three.js/GSAP/Shader 代码
- 气球纹理路径（保留现有的 .webp 引用）
- SOTY/SOTD/SOTM 卡片纹理
- 岛屿纹理

**构建：** ✅ 预期通过（只有文字数据改动）

### 8.3 About V2：素材替换（P1+P2 素材到位后）

**目标：** 逐步替换纹理，从占位符切换到实际品牌素材。

**阶段 2a — 核心素材（P1）：**

| 步骤 | 内容 | 需要素材 |
|------|------|---------|
| 1 | 替换云端头像 | I1 |
| 2 | 替换主项目卡片纹理 | I2, I3 |
| 3 | 添加项目截图/证书 (GlobalOverlay) | I8 |
| 4 | 更新品牌定义 + 微调文字语气 | B1-B4 |

**阶段 2b — 完整素材（P2）：**

| 步骤 | 内容 | 需要素材 |
|------|------|---------|
| 5 | 替换全部 3 张项目卡片纹理 | I4-I7 |
| 6 | 替换 Journey 岛屿纹理 | I9, I10 |
| 7 | 删除遗留 Tomasz 纹理 (SOTDAYYOUNGMULTI*.webp ×4) | — |
| 8 | 删除 `FEATURED.webp` 引用（文件不存在） | — |
| 9 | 删除遗留工具脚本 (`fix_hover_stutter.cjs`, `mobile_opt.cjs`, `mobile_opt2.cjs`) | — |

### 8.4 About V3：动态内容化（P3 素材到位后）

**目标：** 接入 Sanity CMS，实现内容可动态更新。

**范围：**

| 步骤 | 内容 |
|------|------|
| 1 | 创建/修改 Sanity schema — `projectItem` 替代 `awardCertificate`（或新增） |
| 2 | `useAwards()` → `useProjects()` hook 重写 |
| 3 | 生成新技能气球纹理 (I11, I12) — 全部替换占位纹理 |
| 4 | About Room 内容完全由 Sanity 驱动——可在 CMS 中修改文字和图片 |
| 5 | 回退数据更新——Sanity 不可达时显示你的真实数据而非 Tomasz 的 |
| 6 | `MY_PROJECT_SPEC.md` 第 8.6 节更新——反映新的 About Room 内容结构 |

---

## 9. 附录：现有技术资产清单

### 9.1 完全可复用的代码（零改动）

| 文件 | 行数 | 内容 |
|------|------|------|
| `AboutRoom.jsx` | 272 | 动量滚动、飞行效果、成就触发、纸飞机跟随 |
| `SkyChunk.jsx` | 200 | 云生成、飘动动画、世界空间裁剪 |
| `PaperAirplane.jsx` | 130 | 低面数纸飞机几何体 |
| `StoryMilestone.jsx` | 213 | 通用 Story 模板（当前未被实际使用——被内联组件替代） |

### 9.2 可复用的动画模式

| 模式 | 位置 | 用途 |
|------|------|------|
| gsap.to(uProgress) | AwardButton, SkillBalloon | 画笔揭示 (hover) |
| gsap.to(uProgress, reverse) | AwardButton, SkillBalloon | 画笔揭示 (unhover) |
| gsap.delayedCall(0.55) | AwardButton, SkillBalloon | painted 层延迟隐藏 |
| scale lerp (hover 1.05) | AwardButton, SkillBalloon | 悬停放大 |
| Z-distance spread | 所有 Milestone | 元素靠近相机时散开 |
| float-up reveal | Journey, Skills | 从云下浮出 |
| pop + respawn | SkillBalloon | 气球爆裂重生 |

### 9.3 可复用的纹理（不需要替换）

| 纹理 | 用途 |
|------|------|
| `button.webp` / `button_painted.webp` | VIEW 按钮 |
| 云纹理 (8 张 UUID 命名) | SkyChunk 云 |
| `reactduzybalon.webp` / `_painted` | 如果保留 React |
| `JSSREDNIBALON.webp` / `_painted` | 如果保留 JavaScript |
| `csssrednibalon.webp` / `_painted` | 如果保留 CSS |
| `htmlmalybalon.webp` / `_painted` | 如果保留 HTML |
| `gitmalybalon.webp` / `_painted` | 如果保留 Git |

---

> **下一步：** V1 Content Baseline 已确认并实现 (2026-08-10)。等待 P2 素材（Education/Career Island 纹理）后启动 About V2。
>
> **关联文档：**
> - `CLAUDE.md` — About Room 架构设计（第 424-452 行）
> - `MY_PROJECT_SPEC.md` — 第 8.6 节 About Room 需求规格
> - `PROJECT_STATUS.md` — 当前阶段和任务状态
> - `ITOM_ANALYSIS.md` — 原始 ITom 项目深度分析（遗留参考）

---

## V1 Content Baseline

> **Status:** ✅ Confirmed & Implemented
>
> **Date:** 2026-08-10
>
> The V1 content has been confirmed by the project owner and implemented as the current content baseline.
>
> Future changes should be recorded as V2, V3, etc., rather than overwriting this baseline.

### V1 Content Manifest

| Milestone | Element | V1 Content |
|-----------|---------|------------|
| **Intro** | Title | `MENGLAN` |
| | Subtitle | `AI Developer & Automation Creator` |
| | Motto L1 | `"AI should solve` |
| | Motto L2 | `real problems."` |
| | Avatar | Cloud avatar — ✅ replaced |
| **Projects** | Title | `PROJECTS & IMPACT` |
| | Card 1 (Left) | `CURRENT` — Menglan World (2026) |
| | Card 2 (Right) | `COMING SOON` — Family Menu AI + Desktop AI Companion |
| | Card 3 (Center) | `ALL PROJECTS` — All 3 projects overview |
| | Data | `PROJECTS_DATA` (new) |
| | Legacy | `LEGACY_AWARDS_DATA` (preserved, unused) |
| **Journey** | Title | `JOURNEY` |
| | Subtitle | `From software engineering to AI development` |
| | Left Island | Education: `2016-2024` |
| | Right Island | Career: `2020-NOW` |
| **Skills** | Title | `TECH STACK` |
| | Subtitle | `AI • Automation • Cloud • Development` |
| | Large 1 | Python |
| | Large 2 | AI Development |
| | Large 3 | Prompt Engineering |
| | Medium 1 | Claude Code |
| | Medium 2 | Git |
| | Medium 3 | RAG |
| | Small 1 | SQL |
| | Small 2 | RPA |
| | Small 3 | Coze |
| | Small 4 | Azure |
| **SEO** | Title | `About Menglan \| AI Developer & Automation Creator` |
| | Description | AI Developer focused on AI applications, workflow automation... |
| **Achievement** | about_fly | `Sky Explorer` (was: `Sky Walker`) |

### V1 Asset Checklist

| Asset | Priority | Status |
|-------|----------|--------|
| Cloud Avatar | P0 | ✅ Completed |
| Wave Animation (wave01-wave09) | P1 | ✅ Completed |
| Education Island texture | P2 | ✅ Completed (2026-08-12) |
| Career Island texture | P2 | ✅ Completed (2026-08-12) |
| Project Image — Menglan World | P3 | ⬜ Pending (SOTY.webp as placeholder) |
| Project Image — Family Menu AI | P3 | ⬜ Pending (SOTD.webp as placeholder) |
| Project Image — Desktop AI Companion | P3 | ⬜ Pending (SOTM.webp as placeholder) |
| Skill Icon — Python | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — AI Development | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — Prompt Engineering | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — Claude Code | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — RAG | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — SQL | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — RPA | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — Coze | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — Azure | P4 | ✅ Completed (2026-08-12) |
| Skill Icon — Git (custom) | P4 | ✅ Completed (2026-08-12) |
| Certificate — MSdegree | P2 | ✅ Completed (2026-08-12) |
| Certificate — MSdegree_1 | P2 | ✅ Completed (2026-08-12) |
| Certificate — CET6 | P2 | ✅ Completed (2026-08-12) |
| Certificate — RPAcertification | P2 | ✅ Completed (2026-08-12) |

### V1 Technical Notes

- Skill balloon textures: custom Menglan icons replace original Tomasz balloon textures
- Island textures: `uowyspa_ml.webp` (EDU island) and `freelancewyspa_ml.webp` (Career island) replace original
- Journey island text expanded: Education shows full degree info, Career shows all 6 stages
- Certificate images: Menglan's MSdegree, MSdegree_1, CET6, RPAcertification replace Tomasz SOTD certificates
- SOTY/SOTD/SOTM card textures retained as visual decoration (no Tomasz-specific content)
- Original Tomasz island/balloon/certificate textures preserved as backup (not deleted)
- `LEGACY_AWARDS_DATA` preserved in `InfiniteSkyManager.jsx` with clear `// LEGACY:` comment block
- Three.js / R3F / GSAP / Shader / camera architecture untouched
- All animation patterns (spread, float-up, pop+respawn, brush-reveal) preserved
- `StoryMilestone.jsx` component noted as unused (kept for potential future use)
- Legacy `.cjs` tool scripts (`fix_hover_stutter.cjs`, `mobile_opt.cjs`, `mobile_opt2.cjs`) preserved

---

## V1 Material Integration (2026-08-12)

> **Status:** ✅ Completed
>
> All P2-P4 image assets have been integrated. Custom Menglan skill balloon textures, island textures, and certificate images are now live.

### What was done

| Area | Change |
|------|--------|
| **Intro** | Title `MENGLAN WORLD` → `MENGLAN`, Subtitle `Menglan World` → `AI Developer & Automation Creator` |
| **Journey Islands** | Textures updated to `ml/` variants; dynamic text shows full education + career details |
| **Skills Balloons** | All 10 balloon textures replaced with custom Menglan icons (20 files: sketch + painted) |
| **Certificates** | 4 Menglan certificates replace Tomasz SOTD awards in the CERTIFICATIONS card |
| **Preload** | 28 new `ml/` texture paths added to texture preload list |

### What's still Coming Soon

| Item | Status |
|------|--------|
| Project screenshots (Menglan World, Family Menu AI, Desktop AI Companion) | Using SOTY/SOTD/SOTM as placeholders |
| Project card textures (SOTY/SOTD/SOTM → Menglan-themed) | Retained as visual decor for now |
| Sanity CMS dynamic content | Future (V3) |
| OG image + favicon replacement | Needs assets |
| Entrance door textures | Future |

---

## V1.1 UI & Interaction Refinement (2026-08-12)

> **Status:** ✅ Completed
>
> UI polish + data source investigation and fix.

### Changes

| Area | Change |
|------|--------|
| **Journey Islands** | Default: compact summary + VIEW JOURNEY button → click expands full timeline → ✕ CLOSE to collapse |
| **MENGLAN Title** | Added `letterSpacing: 0.06` for improved readability |
| **Sanity fallback** | Updated `useSanityData.js` cache titles from Tomasz ("Site of the Day Awards") to Menglan ("Current Project", "Coming Soon", "Certifications & Qualifications") |

### VIEW Button Data Flow (Investigation Result)

```
InfiniteSkyManager.jsx: AwardButton onClick
  → useScene().openOverlay(awardsData.category)
    → SceneContext: setOverlayContent()
      → GlobalOverlay.jsx: certificate_grid layout
        → <img src={item.image}> → Sanity CDN images
```

**Key finding:** `useSanityData.js` fetches `*[_type == "awardCertificate"]` from Sanity CMS. If Sanity has data, it OVERRIDES the local `PROJECTS_DATA` fallback. The cache builder had hardcoded Tomasz titles.

**Remaining old images (Sanity CDN, not local):**
- Tomasz certificate images hosted on Sanity CDN (via `/sanity-cdn` proxy)
- These require Sanity CMS update to replace — can't be fixed by local file changes alone

**Local images safely retained:**
- SOTY.webp / SOTD.webp / SOTM.webp — card decoration (no Tomasz text)
- SOTY_painted.webp / SOTD_painted.webp / SOTM_painted.webp
- SOTDAYYOUNGMULTI*.webp × 4 — legacy backup
- All original balloon textures — legacy backup
- All original island textures — legacy backup
