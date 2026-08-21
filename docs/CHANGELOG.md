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

---

## 2026-08-10 — About Room V1 Content Baseline

**模块：** About Room 内容落地

**This version is the baseline for future About Room V2/V3 iterations.**

**修改内容：**

**Personal Positioning：**
- 角色：`AI Developer & Automation Creator`
- Motto：`"AI should solve real problems."`
- 副标题：`AI Developer & Automation Creator`

**Life Milestones：**
- Education：`2016-2020` Bachelor of Software Engineering, `2021-2024` Master of Computer Technology
- Career：`2020-NOW`（IT Assistant Engineer → IoT Security Research → Azure Tech Support → AI Application Engineer → Freelance AI Developer）
- Journey 副标题：`From software engineering to AI development`
- 左岛标签：`2016-2024` (Education)
- 右岛标签：`2020-NOW` (Career)

**Technology Stack（10 技能气球）：**
- Python, AI Development, Prompt Engineering, Claude Code, Git, RAG, SQL, RPA, Coze, Azure
- 标题改为 `TECH STACK`，副标题 `AI • Automation • Cloud • Development`

**Projects & Impact：**
- `AWARDS` → `PROJECTS & IMPACT`
- Menglan World（Current Project）
- Family Menu AI（Coming Soon）
- Desktop AI Companion（Coming Soon）
- 卡片标签：`CURRENT` / `COMING SOON` / `ALL PROJECTS`

**Technical Capabilities：** AI Development, Automation, Python, Cloud, Localization, Prompt Engineering, Workflow Design, Technical Support

**Brand & Contact：** Menglan, menglan.world, AI Developer, China, Remote/Shanghai, GitHub, LinkedIn, YouTube, WeChat, Portfolio URL

**SEO：**
- About Title: `About Menglan | AI Developer & Automation Creator`
- About Description: 更新为 AI Developer 定位
- useDocumentMeta.js /about 路由更新
- AchievementsContext: `Sky Walker` → `Sky Explorer`

**隐藏/移除的 Tomasz 原始内容：**
- Tomasz 姓名、Slogan（"Crafting digital experiences that push creative boundaries"）
- University of Opole 引用
- Tomasz 职业时间线（2025-NOW, 2023-NOW）
- Awwwards, CSS Winner, GSAP SOTD, Orpetron, Design Nominees
- 原始 AWARDS_DATA 中所有证书链接
- 所有 Tomasz 个人链接

**保留但未使用的 Legacy 数据：**
- `LEGACY_AWARDS_DATA` — 完整保存原 Tomasz Awwwards 奖项数据，供未来参考
- 备注：旧数据永不暴露于 UI

**已完成的素材：**
- Cloud Avatar — ✅
- Wave Animation（wave01-wave09） — ✅

**待完成的素材：**
- Education Island 纹理 — P2
- Career Island 纹理 — P2
- Project Images（3 个） — P3
- Skill Icons（10 个气球) — P4

**涉及文件：**
- `src/components/canvas/rooms/About/AboutRoom.jsx` — STORY_MILESTONES 更新
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx` — 主要修改：Intro motto, PROJECTS_DATA, BALLOON_CONFIG, Journey/Skills 文字
- `src/hooks/useDocumentMeta.js` — /about SEO 更新
- `src/context/AchievementsContext.jsx` — about_fly 成就 title 更新

**技术架构保护：**
- Three.js / R3F / InfiniteSkyManager / SkyChunk / PaperAirplane — 全部保留
- 动量滚动、飞行效果、云层系统、GSAP、Shader、相机逻辑 — 全部保留
- 气球爆裂 + respawn 机制 — 保留
- 卡片浮动 + spread 动画 — 保留

**构建：** ✅ 通过

**Commit：** `efc55fa`

---

## 2026-08-12 — About Room V1 Material Integration

**模块：** About Room 素材集成 + 内容完善

**This version integrates all P2-P4 Menglan image assets into the About Room.**

**修改内容：**

**Intro Milestone：**
- Title: `MENGLAN WORLD` → `MENGLAN`
- Subtitle: `Menglan World` → `AI Developer & Automation Creator`

**Journey Milestone：**
- Education Island 纹理: `uowyspa.webp` → `ml/uowyspa_ml.webp`
- Career Island 纹理: `freelancewyspa.webp` → `ml/freelancewyspa_ml.webp`
- Education Island 文字: 动态显示 B.S. Software Engineering (2016-2020) + M.S. Computer Technology (2021-2024)
- Career Island 文字: 动态显示 6 个职业阶段（IT Assistant Eng → Freelance AI Dev）

**Technology Stack（10 技能气球纹理）：**
- 所有 10 个技能气球纹理替换为自定义 Menglan 图标（sketch + painted 共 20 张）
- 纹理路径全部指向 `public/textures/about/ml/`
- Python, AI Development, Prompt Engineering, Claude Code, Git, RAG, SQL, RPA, Coze, Azure
- `legacyAspects` 映射更新为新纹理的实际宽高比

**Projects & Impact：**
- Certificate 图片替换: Tomasz SOTD 证书 → Menglan 证书 (MSdegree, MSdegree_1, CET6, RPAcertification)
- 中心卡片标签: `ALL PROJECTS` → `CERTIFICATIONS`
- 原 Tomasz 证书图片保留不删除

**纹理预加载：**
- `texturePreloadList.js` 新增 28 条 `ml/` 纹理预加载路径
- 保留所有原始 Tomasz 纹理预加载路径（备份）

**未修改 / 保留：**
- SOTY/SOTD/SOTM 卡片纹理 — 作为视觉装饰保留
- SOTDAYYOUNGMULTI*.webp — 保留作为备份
- 所有原始气球纹理 — 保留不删除
- 所有原始岛屿纹理 — 保留不删除
- LEGACY_AWARDS_DATA — 保留不删除
- 所有 Three.js / R3F / GSAP / Shader / 动画代码 — 零改动

**涉及文件：**
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx`
- `src/config/texturePreloadList.js`

**构建：** ✅ 通过

**Commit：** 待提交

---

## 2026-08-12 — About Room V1.1 UI & Interaction Refinement

**模块：** About Room 交互优化 + 数据源修复

**修改内容：**

**Journey Islands — VIEW JOURNEY 交互：**
- Education Island: 默认显示简洁摘要（"Degrees & Studies"）+ VIEW JOURNEY 按钮
- Career Island: 默认显示简洁摘要（"Professional Journey"）+ VIEW JOURNEY 按钮
- 点击 VIEW JOURNEY 后动态展开完整时间线（2 个学位 + 6 个职业阶段）
- 点击 ✕ CLOSE 收起回到简洁模式
- 解决了上一版本文字溢出白框的问题

**MENGLAN 标题字间距：**
- Intro Milestone 标题增加 `letterSpacing: 0.06`
- 字母间更舒展，可读性更好

**Projects VIEW 按钮数据源追踪与修复：**
- 完整追踪链路：VIEW button → openOverlay() → GlobalOverlay → Sanity/fallback data
- 发现 `useSanityData.js` 中硬编码了原 Tomasz 标题：
  - `'Site of the Day Awards'` → `'Current Project'`
  - `'Site of the Month Awards'` → `'Coming Soon'`
  - `'Other Awards'` → `'Certifications & Qualifications'`
- platformConfig label/icon 同步更新为 Menglan 品牌

**VIEW 按钮数据链路分析结果：**
- A. 实现文件: `InfiniteSkyManager.jsx` (AwardButton) + `GlobalOverlay.jsx` (DOM overlay)
- B. 数据源: `useSanityData.js` → Sanity CMS `awardCertificate` → `PROJECTS_DATA` fallback
- C. 图片来源: Sanity CDN 托管的 Tomasz 证书图片（通过 `/sanity-cdn` Cloudflare proxy）
- D. 保留图片: SOTY.webp / SOTD.webp / SOTM.webp（卡片装饰，不含 Tomasz 文本）
- E. 如需替换: 需在 Sanity CMS 中更新 `awardCertificate` 文档的 `certificateImage` 字段
- F. 本地证书图片已替换: `ml/MSdegree.webp`, `ml/MSdegree_1.webp`, `ml/CET6.webp`, `ml/RPAcertification.webp`

**涉及文件：**
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx`
- `src/hooks/useSanityData.js`

**构建：** ✅ 通过

**Commit：** 待提交

---

## 2026-08-12 — V1.1.2 Sanity Startup Decoupling / Local-First Fallback

**模块：** Sanity 启动解耦 / 真正的本地优先降级

**Why V1.1.1 Failed：**

V1.1.1 仅修复了 `RoomWarmup` → `cache.loaded` 阻塞链（Sanity fetch timeout），但**未发现第二个阻塞链**：

```
Preloader → DefaultLoadingManager.onLoad → active = false → targetProgress = 100 → exit
```

`loadSanityData()` 内的 `useTexture.preload()` 和 `useLoader.preload(TextureLoader, ...)` 调用会向 `THREE.DefaultLoadingManager` 注册 Sanity CDN URL。当本地纹理加载完成后，Sanity 图片预加载**重新激活**了 loading manager（触发 `onStart`）。由于 Sanity CDN 不可达，这些图片加载卡住，`onLoad` 永不触发——导致 `active` 卡在 `true`，`targetProgress` 卡在 85%，Preloader 永远无法退出。——

即使 `cache.loaded = true` + `sceneReady = true`，Preloader 进度条仍卡在 85%。

**修改内容：**

**1. `src/hooks/useSanityData.js` — 移除 GPU 纹理预加载中的 Sanity 图片**
- 删除 `useTexture.preload()` 调用（通过 drei 缓存 + Three.js DefaultLoadingManager）
- 删除 `useLoader.preload(TextureLoader, ...)` 调用（同上）
- 保留 `preloadBrowserImage()`（`new Image()`——不注册 DefaultLoadingManager）
- 删除不再使用的 3 个 imports：`useTexture`、`useLoader`、`TextureLoader`

**2. `src/components/dom/Preloader.jsx` — 安全防护**
- 添加场景就绪 2 秒后强制退出机制：当 `ready` 为 true 且 2 秒内未退出，强制执行 `setActive(false)` + `setTargetProgress(100)`
- 防御性措施——即使未来有任何纹理加载卡在 loading manager 中，也不能无限期阻塞

**架构变更：**

```
Before (ITom 遗留):
  Sanity Required → Local Fallback
  Sanity API 阻塞 RoomWarmup (30s timeout)
  Sanity CDN 图片阻塞 Preloader (DefaultLoadingManager)

After (V1.1.2):
  Local First → Sanity Enhancement
  Sanity API: max 8s timeout → fallback
  Sanity CDN 图片: 永不阻塞 (browser-only preload)
  Preloader: 2s 场景就绪后强制退出
```

**Sanity 不可达时的行为：**
- Sanity API 不可达 → 8s 超时 → `cache.loaded = true` → RoomWarmup 继续 → 所有房间使用本地 fallback
- Sanity API 可达但 CDN 不可达 → fetch 成功 → 数据已缓存（CDN URL）→ 但无 `useTexture.preload()`，所以不阻塞 Preloader
- Sanity 完全不可达 → 同第一条路径
- 任何情况下，Preloader 在 `sceneReady` 后最多 2s 强制退出

**涉及文件：**
- `src/hooks/useSanityData.js` — 移除 GPU 纹理预加载，仅保留 `preloadBrowserImage()`
- `src/components/dom/Preloader.jsx` — 添加场景就绪强制退出安全防护
- `src/components/canvas/corridor/HeroText.jsx` — MENGLAN 字母间距：baseX 0.27→0.35 (+30%)
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx` — IntroMilestone MENGLAN letterSpacing: 0.06→0.15

**MENGLAN 字间距修改：**
- HeroText 走廊 MENGLAN：字母基位置间距从 0.27 → 0.35（+30%），tagline 括号同步扩展
- About Room IntroMilestone MENGLAN：letterSpacing 从 0.06 → 0.15（+150%）
- Responsive scale 仍然适用（0.65x–1.0x 视口），移动端自动适应
- 未更改 fontSize、字体、内容、布局结构

**构建：** ✅ 通过（11.93s）

**Commit：** 待提交

**模块：** Sanity 离线降级 / 运行时稳定性热修复

This is a runtime stability hotfix — minimal change, maximum impact.

**问题诊断：**

当 Sanity API 不可达时（网络断开、CDN 故障、TLS 错误），网站预加载器会卡死在加载画面，无法进入主场景。

**调用链分析：**

```
loadSanityData() [module-level auto-call]
  → sanityClient.fetch() ×3 [~30s default timeout]
  → cache.loaded = true [set after fetch completes or errors]
  
RoomWarmup.useFrame()
  → if (!isSanityDataLoaded()) return;  // ← 阻塞点
  → onWarmupComplete → sceneReady → Preloader exit
```

**根因：** `RoomWarmup.jsx:35` 每帧检查 `isSanityDataLoaded()`，该函数返回 `cache.loaded`，而 `cache.loaded` 只有在 Sanity fetch 成功或失败后才设为 `true`。Sanity client 默认超时约 30 秒，在此期间整个预加载器被阻塞。

**已有 Fallback 验证：**

| 房间 | Fallback 变量 | 状态 |
|------|-------------|------|
| Gallery | `FALLBACK_PROJECTS` | ✅ `GalleryRoom.jsx:213` |
| Studio | `CONTENT_DATA` | ✅ `StudioRoom.jsx:112` |
| About | `PROJECTS_DATA` | ✅ `InfiniteSkyManager.jsx:550` |

三个房间均已有本地数据兜底——只需让 fetch 快速超时即可激活。

**修复内容：**

- `src/hooks/useSanityData.js`：为 3 个 `sanityClient.fetch()` 调用添加 `withTimeout()` 包装（8 秒超时）
- 超时后返回 `null`，现有 null 检查（line 111/125/139）自动跳过 Sanity 数据映射
- `cache.loaded = true` 正常设置，RoomWarmup 解除阻塞
- 所有房间自动使用本地 fallback 数据
- Sanity 正常工作时行为完全不变（zero regression risk）

**技术细节：**
- `withTimeout()` 使用 `Promise.race` + `setTimeout` 实现
- `clearTimeout()` 在 finally 中清理，防止内存泄漏
- 超时时返回 `null`（非 reject），避免破坏 `Promise.all` 解构
- 三个 fetch 各有独立 timeout（总计最多 8s），并行执行

**涉及文件：**
- `src/hooks/useSanityData.js` — 添加 `withTimeout` 包装器 + `SANITY_FETCH_TIMEOUT` 常量

**构建：** ✅ 通过

**Commit：** 待提交

---

## 2026-08-12 — V1.1.3 Canvas Crash Fix / Local-First Gallery & Studio

**模块：** CanvasImpl 崩溃修复 / Gallery & Studio 本地优先

**Why V1.1.2 Failed：**

V1.1.2 解决了**启动时**的 DefaultLoadingManager 阻塞（移除了 `useTexture.preload` / `useLoader.preload` 用于 Sanity 图片）和 Preloader 无限制挂起（2 秒安全防护）。但**第二层崩溃路径**未被发现：

```
loadSanityData() fetch 成功
  → cache.projects / cache.content 填充了 Sanity CDN URL
  → useGalleryProjects() / useStudioContent() 返回 CDN URL
  → GalleryRoom.jsx:224  useTexture([cdn_sanity_url, ...])
  → StudioRoom.jsx:642   useLoader(TextureLoader, cdn_sanity_url)
  → Sanity CDN → 500 Internal Server Error
  → Three.js TextureLoader → Uncaught Error
  → <CanvasImpl> 崩溃 → 白屏
```

**浏览器控制台错误：**
- `Uncaught Error: Could not load /sanity-cdn/images/kv5wjjmj/production/b74f1f8354f55b3025e57f9ab1d199b34058eb3d-1696x2528.png?w=1024&q=80&auto=format`
- `An error occurred in the <CanvasImpl> component.`
- `GET /sanity-cdn/images/... 500 (Internal Server Error)`

**根因：** GalleryRoom 和 StudioRoom 的 `activeProjects = sanityProjects || FALLBACK_PROJECTS` 降级仅当 `sanityProjects` 为 `null` 时触发。当 Sanity API **可达**时，`cache.projects` / `cache.content` 被填充了 CDN URL——非 null → Gallery/Studio 将 CDN URL 传入 Three.js `useTexture()` / `TextureLoader` → CDN 500 → Canvas 崩溃。

**修复内容：**

**1. `src/hooks/useSanityData.js` — 禁用 Gallery/Studio Sanity 数据缓存**
- 注释掉 `cache.projects` 的数据映射（原 lines 108-119）—— 防止 GalleryRoom 使用 CDN URL
- 注释掉 `cache.content` 的数据映射（原 lines 121-133）—— 防止 StudioRoom 使用 CDN URL
- **保留** `cache.awards` 映射 —— About room 奖项通过 DOM overlay 渲染（不会崩溃 Canvas）
- **保留**所有 Sanity fetch/query 代码 —— 未来 V3 重新激活仅需取消注释
- 两个 `preloadBrowserImage()` 安全码段保持不变（`if (cache.projects)` / `if (cache.content)` 为 null 时自然跳过）

**2. `src/components/canvas/corridor/HeroText.jsx` — 修复重复 React key（P1）**
- Line 141：`key={letter.char}` → `key={`${letter.char}-${i}`}`
- 问题："MENGLAN"包含两个字面上的 `'N'` 字符 → 两个 `key="N"` → React 重复 key 警告
- Key 现在是 `"M-0"`, `"E-1"`, `"N-2"`, `"G-3"`, `"L-4"`, `"A-5"`, `"N-6"` —— 全部唯一

**修复后的行为：**
- `useGalleryProjects()` → 返回 `null` → `FALLBACK_PROJECTS`（本地纹理路径）
- `useStudioContent()` → 返回 `null` → `CONTENT_DATA`（本地纹理路径）
- `useAwards()` → 仍然返回 Sanity 数据（如果可用），通过 DOM overlay 中的 `<img>` 标签渲染
- Gallery 和 Studio 渲染原始 ITom 项目图片（V1 版本无 Menglan 品牌素材）
- Sanity CDN 500 → 不会崩溃 Canvas —— 没有 CDN URL 被 Three.js 加载
- Vite proxy TLS 错误在终端输出是预期的且完全无害

**Local-First 验证清单：**

| 条件 | 预期结果 |
|------|--------|
| Sanity API 不可达 | 所有房间使用本地 fallback ✅ |
| Sanity API 可达，CDN 不可达 | Gallery/Studio 使用本地 fallback，About DOM 奖项显示空图片但不会崩溃 ✅ |
| Sanity API + CDN 可达 | Gallery/Studio 使用本地 fallback，About DOM 奖项通过 CDN 正常加载 ✅ |
| 无网络 | 所有房间使用本地 fallback ✅ |

**架构原则（强化）：**

> Sanity is an **enhancement**, not a startup prerequisite.
> Three.js must never receive a URL pointing at an unreliable external service.
> For V1, Gallery and Studio always use local ITom textures — CMS integration is deferred to V3.

**涉及文件：**
- `src/hooks/useSanityData.js` — 禁用 cache.projects / cache.content 填充
- `src/components/canvas/corridor/HeroText.jsx` — 修复重复 React key

**构建：** ✅ 通过（2m 23s）

**Commit：** 待提交

---

## 2026-08-12 — V1.1.4 Journey Modal + Entrance Hero Refinement

**模块：** About Room Journey Modal 重构 + 入口 MENGLAN 间距修复

**修改内容：**

**1. Education/Career Journey — 从 3D 岛屿内展开改为独立 2D Modal**

原行为：点击 VIEW JOURNEY → 本地 `useState` 切换 → 3D Text 元素嵌入在岛屿平面上展开。文字空间不足，内容溢出岛屿。

新行为：点击 VIEW JOURNEY → `openOverlay()` → GlobalOverlay 渲染独立的 2D DOM Modal。

- Education: 岛屿牌子上始终仅显示简短内容（"Education / Degrees & Studies / VIEW JOURNEY"）
- Career: 岛屿牌子上始终仅显示简短内容（"Career / Professional Journey / VIEW JOURNEY"）
- 详细时间线在居中 paper-card Modal 中展示，桌面端宽度 `clamp(320px, 50vw, 600px)`
- Career 时间线包含子标题（Chinese Academy of Sciences 等）

**2. GlobalOverlay — 新增 `journey` 布局**

`src/components/ui/GlobalOverlay.jsx` 的 ContentCard 新增第三种布局类型：

- 居中 paper card（同 SVG 手撕边框 + Cabin Sketch 字体）
- Timeline 结构：`{ year, label }` → 粗体年份 + 内容描述
- 年度项目间以虚线边框分隔
- 内容区域可滚动（长 Career 时间线在移动端需要）
- 桌面端无聚光灯蒙版（与 certificate_grid 行为一致）
- 点击背景或 Close（✕ 按钮）关闭
- 弹出/关闭动画与现有 Overlay 系统一致

**3. Entrance MENGLAN — 动态 Text 叠加**

入口 "MENGLAN" 由 `public/textures/entrance/sign.webp` 作为栅格图片渲染。栅格图案上原有的文字拥挤无法在代码中调整。

解决方案：在 SignSystem 中叠加动态 `<Text>` 组件：
- 背景条覆盖原有拥挤的栅格文字（`planeGeometry [1.8, 0.28]`，`#e0e0e0` 不透明度 92%）
- RubikScribble 字体带有 `letterSpacing={0.08}` 和细描边（outlineWidth 0.006）
- 文字大小适配标志宽度（fontSize 0.28 → 7 个字母适配 2 单位宽度，留有间隙）
- 深度写入关闭（避免遮挡透明标志背景）
- 随标志一起响应风动摇摆动画（同一 group）
- 不改变头像、副标题、入口门、猫、老鼠、鸭子或任何装饰元素

**已使用/复用的机制：**
- Education/Career Modal：复用 `SceneContext.openOverlay()` + `GlobalOverlay`（`journey` 布局）
- Entrance MENGLAN：SignSystem 中的 `<Text>` 组件，复用标志的 group ref 动画
- 弹窗打开时，AboutRoom 的滚动阻止（`overlayRef.current`）自动生效，无需额外改动

**涉及文件：**
- `src/components/ui/GlobalOverlay.jsx` — 新增 `journey` 布局 + cardStyle 覆盖 + maskStyle 覆盖
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx` — JourneyMilestone 移除内联展开，替换为 `openOverlay()` 调用
- `src/components/canvas/entrance/SignSystem.jsx` — 新增 Text overlay import，在标志上方添加 MENGLAN 文字覆盖层

**未修改（按要求冻结）：**
- Projects & Impact / SOTY / SOTD / SOTM / Certificates — 零改动
- Sanity awards 数据 — 零改动
- 走廊 HeroText MENGLAN — 零改动（仅入口标志受影响）
- Education/Career Island 纹理 — 零改动
- Camera / Flight / Scroll / SkyChunk — 零改动
- 头像窗口 / AI Developer 副标题 / 门 / 猫 / 老鼠 / 鸭子 / bug — 零改动

**构建：** ✅ 通过（57.40s）

**Commit：** 待提交

---

## 2026-08-12 — V1.1.5 Entrance MENGLAN Typography Refinement

**模块：** 入口 MENGLAN 排版修复（逐字母定位）

**问题诊断：**

V1.1.4 在 SignSystem 中添加了动态 `<Text>` 覆盖层，但存在两个问题：

1. **双层渲染** — `sign.webp` 光栅图本身包含写入的 "MENGLAN" 文字。动态背景条使用了 `transparent opacity=0.92`（半透明），导致下方旧文字透过来 → 出现拥挤的双重图像效果。

2. **letterSpacing 不够精确** — 单个 `<Text letterSpacing={0.08}>` 无法为 RubikScribble 手绘字体提供足够均匀的间距。字母 "M"、"G"、"A" 比 "E"、"N"、"L" 更宽，统一间距会使宽窄字母之间的间隙不一致。

**确认：** 在代码库中搜索了所有 "MENGLAN" 字符串、Text 组件和 SignSystem 用法后确认——入口场景中渲染的 "MENGLAN" **唯一**来源于 `sign.webp` 光栅图像，由 `SignSystem.jsx` 渲染。代码库中没有其他入口 MENGLAN 组件。不存在第三层。

**修复：**

**`src/components/canvas/entrance/SignSystem.jsx`：**

1. **全覆盖背景条** — `transparent={false}`（完全遮挡下方光栅文字），`planeGeometry [1.9, 0.34]`（更宽更高以完全覆盖）。颜色匹配原标志纸色（`#e0e0e0`）。

2. **逐字母定位** — 一个 `<Text>` 组件替换为 7 个独立 `<Text>` 组件，每个字母具有精确的 X 坐标：

   | 字母 | X 坐标 |  |
   |--------|-----------|---|
   | M | -0.78 | ← 最左 |
   | E | -0.52 | |
   | N | -0.26 | |
   | G | 0.00 | ← 正中心 |
   | L | 0.26 | |
   | A | 0.52 | |
   | N | 0.78 | ← 最右 |

   - 间距：字母中心之间 0.26 单位——宽窄字母间隙均匀
   - 展开范围：1.56 单位——舒适地位于 2 单位宽的标志内（每侧边距 0.22）
   - fontSize：0.28——在保持清晰度的前提下尽可能大
   - 字体：RubikScribble-Regular.ttf——保留手绘风格

**涉及文件：**
- `src/components/canvas/entrance/SignSystem.jsx` — 不透明背景条 + 逐字母 MENGLAN

**未修改：**
- Education Modal、Career Modal、Journey Islands
- Projects、Certificates、Skills、Sanity
- Gallery、Studio、Contact
- 头像、AI Developer 副标题、猫、老鼠、鸭子、bug
- 入口门、门动画、Camera、GSAP、走廊 HeroText

**构建：** ✅ 通过（9.58s）

**Commit：** 已合并

---

## 2026-08-12 — Phase Finalization: About Room V1 Handoff

**模块：** 阶段 1 第一轮收尾 / 文档更新 + Git 提交 + GitHub Push

**阶段总结：**

本次阶段完成了 About Room 和 Hero 区域的第一轮品牌迁移。从 ITom 原始项目出发，经过 V1 Content Baseline → Material Integration → V1.1 UI & Interaction → V1.1.1~V1.1.5 五个子版本的迭代，最终交付了一个稳定可用的 V1 版本。

**完成的核心工作：**

| 维度 | 成果 |
|------|------|
| **品牌替换** | 全站 ITom → Menglan World（index.html, sitemap, _headers, SEO, useDocumentMeta, ContactRoom, ScreenReaderOverlay, seo-plugin, main.jsx, HeroText, InfiniteSkyManager, AboutRoom） |
| **About Room 内容** | 4 个 Milestone（Intro / Journey / Skills / Projects）全部替换为 Menglan 个人内容 |
| **素材集成** | Avatar、岛屿纹理、10 个技能气球、4 个证书图片 — 共 ~50 张素材完成替换 |
| **Journey Modal** | Education + Career 从 3D 岛屿内展开改为独立 DOM Modal（GlobalOverlay journey layout） |
| **入口 MENGLAN** | 逐字母 `<Text>` 定位 + 不透明遮罩覆盖 sign.webp 光栅文字 |
| **稳定性** | Sanity 离线降级（8s timeout）、Canvas 崩溃修复（不再传 CDN URL 给 Three.js）、Preloader 2s 安全防护 |
| **代码质量** | HeroText 重复 key 修复、MENGLAN 字间距优化、useSanityData 数据链路追踪 |

**修改文件汇总（本次提交）：**

| 文件 | 变更内容 |
|------|---------|
| `src/hooks/useSanityData.js` | Sanity offline fallback + cache.projects/content 禁用 + withTimeout |
| `src/components/dom/Preloader.jsx` | 2s 场景就绪后强制退出安全防护 |
| `src/components/canvas/corridor/HeroText.jsx` | MENGLAN 字间距 + 重复 key 修复 |
| `src/components/canvas/entrance/SignSystem.jsx` | 逐字母 MENGLAN Text overlay |
| `src/components/canvas/rooms/About/InfiniteSkyManager.jsx` | Journey Modal + letterSpacing |
| `src/components/ui/GlobalOverlay.jsx` | journey layout |
| `docs/ABOUT_CONTENT_PLAN.md` | 内容规划文档 |
| `docs/CHANGELOG.md` | V1.1.1~V1.1.5 + 收尾条目 |
| `docs/PROJECT_STATUS.md` | 阶段状态覆盖更新 |
| `public/textures/about/awatarnachmurce.webp` | 头像替换 |

**未跟踪文件（备份，不提交）：**

| 文件 | 说明 |
|------|------|
| `public/textures/about/awatarnachmurce_itom.webp` | ITom 原头像备份 |
| `public/textures/about/backups/awatarnachmurce_ml.webp` | ML 头像备份 |

**冻结项（留给下一阶段）：**

- MENGLAN 入口标识最终视觉效果（需设计师微调手写字体间距）
- Projects VIEW 按钮旧 ITom 内容
- Gallery/Studio 房间旧纹理
- contentData.js 27 条硬编码数据
- Sanity CMS 动态内容接入（V3）

**构建：** ✅ 通过

**Commit：** 当前提交

---

## 2026-08-13 — Phase 2.1 Task 1: Architecture Stabilization

**模块：** Sanity 重试死锁修复 + 走廊裁剪常量共享

**Task 1A — `fetchPromise` 死锁修复：**

`src/hooks/useSanityData.js` 中存在一个模块级 `let fetchPromise = null`，在 `loadSanityData()` 中一旦发起 Sanity fetch 就赋值，但从未重置。当 Sanity fetch 失败（8s 超时或 reject）后，`fetchPromise` 永久保留为已拒绝的 Promise，导致后续所有 `loadSanityData()` 调用都因 `if (fetchPromise) return fetchPromise` 而直接返回同一个失败的 Promise，只能整页刷新才能恢复。

**修复：** 在 fetch 链的 `finally` 块中重置 `fetchPromise = null`，使失败后未来调用可重新发起请求。不影响 in-flight 请求（`finally` 仅在 Promise settle 后执行）、Local-First fallback、Sanity 配置或 8s 超时机制。

**Task 1B — `CORRIDOR_CLIP_Z` 常量合并：**

`CORRIDOR_CLIP_Z = -8.0` 在 `SkyChunk.jsx`（已导出）与 `InfiniteSkyManager.jsx`（本地 `MILESTONE_CORRIDOR_CLIP_Z`）中重复定义，值必须保持一致。合并为单一来源：

- `SkyChunk.jsx` 继续作为导出方（`export { CHUNK_LENGTH, CORRIDOR_CLIP_Z, ROOM_Z }`）
- `InfiniteSkyManager.jsx` 移除本地 `MILESTONE_CORRIDOR_CLIP_Z`，改为从 `SkyChunk` 导入 `CORRIDOR_CLIP_Z`，4 处引用同步替换

值保持 `-8.0`，无视觉行为变化。

**修改文件：**

| 文件 | 变更内容 |
|------|---------|
| `src/hooks/useSanityData.js` | `finally` 块重置 `fetchPromise = null` |
| `src/components/canvas/rooms/About/InfiniteSkyManager.jsx` | 导入 `CORRIDOR_CLIP_Z`，移除本地 `MILESTONE_CORRIDOR_CLIP_Z` |
| `docs/PROJECT_STATUS.md` | 阶段状态覆盖更新 |
| `docs/CHANGELOG.md` | 本条目 |

**未修改：** Hero、MENGLAN、Entrance、SignSystem、Journey Modal、Education/Career/Skills/Projects、SOTY/SOTD/SOTM、Gallery/Studio/Contact 内容、SEO、Sanity schema、ITom 数据、图片素材。

**构建：** ✅ 通过（11.87s）

**Commit：** 待提交

---

## 2026-08-13 — Phase 2.2 Task 2A: ITom Legacy Cleanup (User-Visible Content)

**模块：** 用户可见 ITom 遗留内容清理

**目标：** 访客不再看到属于 ITom/Tomasz/Tomasz Szmajda/Young Multi/Monetune/Orpetron/Awwwards/CSS Winner/Design Nominees/tomkingbio.netlify.app/@itompoland/tomasz.szmajda.58/itomdev.com 的内容。

**修改内容：**

**1. Gallery Room — `GalleryRoom.jsx` `FALLBACK_PROJECTS`**
- 4 个 Tomasz 项目（MONETUNE/TIMBERKITTY/YOUNG MULTI/BIO）→ 3 个 Menglan 项目：
  - **Menglan World**（Current，url 指向 Vercel 部署）
  - **Family Menu AI**（Coming Soon，url: null）
  - **Desktop AI Companion**（Coming Soon，url: null）
- 纹理仍为占位符（不改变 3D 结构 / 卡片翻转 / 相机 / 纹理加载 / UI）
- 新增 `if (project.url)` 守卫：Coming Soon 项目点击 OPEN PROJECT 不再跳转到不存在的 URL（`window.open(null)` → about:blank 问题）

**2. About Room — `InfiniteSkyManager.jsx` `LEGACY_AWARDS_DATA`**
- 删除 Tomasz Awwwards 遗留数据（61 行，零运行时引用）
- 修复陈旧的 "Legacy AWARDS_DATA preserved below" 注释

**3. Studio Room — `contentData.js` `RAW_CONTENT_DATA`**
- 28 条（8 yt + 8 blog + 12 tt）Tomasz 内容 → 4 条真实 Menglan 项目 + 24 条占位符
- 4 条真实内容：Menglan World（已发布，vercel URL）、AI Development / Automation / AI Developer Journey（In Development，url: null）
- 24 条占位符：标题在 COMING SOON / AI EXPERIMENT / DEVELOPMENT LOG 间循环，描述统一 "This space is reserved for upcoming work"，url: null
- 保留平台分布 8/8/12、PLATFORM_CONFIG、纹理轮询、getContentByPlatform/getLatestContent
- 严格禁止伪造内容：无虚构 YouTube/Blog/TikTok URL、真实项目、客户、奖项、文章

**4. README.md — Acknowledgments**
- Tomasz 版权声明 → Menglan World 身份（LICENSE 已为 © 2026 Menglan Huang）
- 保留对原始 ITom 开源项目的诚实致谢

**5. MessagePaper.jsx — `ALLOWED_ORIGINS`**
- `itomdev.com` / `www.itomdev.com` / `portfolio-itom.pages.dev` → `menglan.world` / `www.menglan.world`

**6. sanity.config.js — Studio 标题**
- `portfolio-itom` → `Menglan World`

**未修改（按要求冻结）：**
- TODO.md、3 个 .cjs 脚本、备份图片、原始 ITom 纹理
- ITOM_ANALYSIS.md、CLAUDE.md、REPLACE_CHECKLIST.md
- Sanity CMS schema、Gallery/Studio 现有图片、Hero、MENGLAN 排版、About Journey、Projects VIEW、Gallery/Studio 3D 结构
- AchievementsContext 的 `itom_achievements` localStorage 键（推迟到 Task 2B）
- seo-plugin.js（已确认无 Tomasz/ITom/Awwwards 字符串）

**涉及文件：**
- `src/components/canvas/rooms/Gallery/GalleryRoom.jsx`
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx`
- `src/components/canvas/rooms/Studio/contentData.js`
- `README.md`
- `src/components/canvas/rooms/Contact/MessagePaper.jsx`
- `portfolio-itom/sanity.config.js`

**构建：** ✅ 通过（8.81s）

**Commit：** `91771cd`

---

## 2026-08-13 — Phase 2.2 Task 2B-1: Contact Room Email & Phone Buoys

**模块：** Contact Room 增强 — Email / Phone 信息浮标

**目标：** 在保留现有 GitHub/LinkedIn/YouTube/Website/Message 功能的基础上，新增 Email 和 Phone 两个浮标，点击后通过 GlobalOverlay 打开信息弹窗，风格与 About Education/Career Modal 一致。

**修改内容：**

**`src/components/canvas/rooms/Contact/ContactRoom.jsx`：**
- `useScene()` 解构新增 `openOverlay`
- 新增两个 `SocialBarrel` 浮标：
  - **EMAIL**（desktop `[-4, 0.7, -9]`，mobile `[-1.8, -0.6, -8.5]`）：点击打开 `layout: 'journey'` 弹窗，显示邮箱 `huang20211022@gmail.com`
  - **PHONE**（desktop `[4, 0.7, -9]`，mobile `[1.8, -0.6, -8.5]`）：点击打开 `layout: 'journey'` 弹窗，显示「Available on request」（无真实号码可填，遵循「严格禁止伪造内容」约束）
- 复用 `journey` 布局 = About Education/Career Modal 同一视觉风格（居中手撕纸卡 + SVG 撕边 + Cabin Sketch 字体 + 虚线分隔），`maskStyle` 无聚光灯蒙版（与 journey 一致）

**未修改：**
- 现有 5 个浮标（LINKEDIN/GITHUB/YOUTUBE/WEBSITE/MESSAGE）功能零改动
- 其他 Room（Gallery/Studio/About）零改动
- SocialBarrel、GlobalOverlay、SceneContext 组件零改动（仅复用现有 `openOverlay` + `journey` 布局）
- MessagePaper、音频、海浪、船、灯塔、码头、传送逻辑零改动

**⚠️ 待用户补充：**
- PHONE 弹窗当前为「Available on request」占位。用户提供真实手机号后替换 `ContactRoom.jsx` 中 PHONE 浮标的 `items[0].label` 即可。

**涉及文件：**
- `src/components/canvas/rooms/Contact/ContactRoom.jsx`

**构建：** ✅ 通过（5.88s）

**Commit：** `0b249a4`

---

## 2026-08-14 — Phase 2.2 Task 2B-1.5: Contact Room Final Polish

**模块：** Contact Room Email / Phone 浮标收尾

**目标：** 修复浮标遮挡、填充真实联系方式、修复邮箱 @ 字体异常。仅改 Contact Room（+ GlobalOverlay journey 布局的可选字体支持），不影响其他 Room。

**修改内容：**

**1. 浮标坐标重排（修复遮挡）**
- **EMAIL** 移到顶部区域：desktop `[0, 1.4, -9]`，mobile `[0, 1.3, -9]`（原 `[-4, 0.7, -9]` 挡住 LinkedIn）
- **PHONE** 移到底部区域：desktop `[0, -1.6, -8]`，mobile `[0, -1.5, -8]`（原 `[4, 0.7, -9]` 挡住 YouTube）
- 现在 Email/Phone 与 LinkedIn/YouTube 的 X 轴距离 ≥3，与 GitHub/Website 距离 ≥3，不再重叠

**2. Phone 内容**
- `电话: (+86) 18377400771`
- `备注: Available for professional communication.`

**3. Email 内容**
- `主要邮箱: huang20211022@gmail.com`
- `备用邮箱: 1981273089@qq.com`
- `备注: 用于项目咨询、合作和交流。`

**4. 邮箱 @ 字体修复**
- `GlobalOverlay.jsx` journey 布局新增可选 `item.sans` 标志
- `sans: true` 时 label 值使用 `system-ui / sans-serif`，否则保持原 Cabin Sketch（About Education/Career Modal 不受影响）
- Email 地址、Phone 号码、备注值均标记 `sans: true`（@ 符号 + CJK 字符在 Cabin Sketch 下渲染异常）

**未修改：**
- 现有 5 个浮标（LINKEDIN/GITHUB/YOUTUBE/WEBSITE/MESSAGE）零改动
- Gallery / Studio / About / Sanity 零改动
- About Education/Career Modal 字体零改动（`item.sans` 为可选 opt-in，默认行为不变）

**涉及文件：**
- `src/components/canvas/rooms/Contact/ContactRoom.jsx`
- `src/components/ui/GlobalOverlay.jsx`（仅 journey label 字体可选化）

**构建：** ✅ 通过（6.86s）

**Commit：** `be10fe3`

---

## 2026-08-14 — Phase 2.2 Task 2B-1.6: Remove MESSAGE Buoy from Contact Room

**模块：** Contact Room 布局清理

**目标：** 移除无实际功能、与 Email/Phone 重复、造成布局拥挤的 MESSAGE 桶，保留 6 个有效浮标。

**修改内容：**

- 从 `ContactRoom.jsx` 移除 `{/* MAIL (Triggers animation) */}` 的 MESSAGE `SocialBarrel` 配置
- 移除后剩余 6 个浮标：LINKEDIN / GITHUB（左）、YOUTUBE / WEBSITE（右）、EMAIL（顶部中心）/ PHONE（底部中心），左右对称平衡、无空洞
- `handleMailSelect` 函数保留：其内部 WRITING/ROLLING/HOLDING/THROWING 消息流仍为注释掉的冻结功能（见 CLAUDE.md「Contact Room 消息表单未完成」），未在本次范围删除

**未修改：**
- GlobalOverlay、openOverlay 系统、journey layout 零改动
- MessagePaper 组件、音频、海浪、船、灯塔、码头、传送逻辑零改动
- 其余 6 个浮标（LINKEDIN/GITHUB/YOUTUBE/WEBSITE/EMAIL/PHONE）零改动
- Gallery / Studio / About / Sanity 零改动

**涉及文件：**
- `src/components/canvas/rooms/Contact/ContactRoom.jsx`

**构建：** ✅ 通过（6.66s）

**Commit：** `142d1ab`

---

## 2026-08-14 — Phase 2.2 Task 2B-1.7: Reposition Phone Buoy

**模块：** Contact Room Phone 浮标位置调整

**目标：** 删除 Message 桶后 Phone 被移到木桥附近（底部），视觉不协调。将 Phone 移回原 Message 桶的中央偏下位置。

**修改内容：**

- `ContactRoom.jsx` Phone 浮标 `position` 由底部 `[0, -1.6, -8]`（mobile `[0, -1.5, -8]`）改为原 Message 桶位置 `[0, -0.7, -7]`（mobile `[0, -0.7, -6]`）
- Phone 现在位于 Contact Room 中央偏下，与 Email（顶部中心）上下呼应，不遮挡其他 5 个浮标

**未修改：**
- Github / LinkedIn / Email / Youtube / Website 零改动
- GlobalOverlay、openOverlay、journey layout、MessagePaper、音频、海浪、船、灯塔、码头、传送逻辑零改动
- Gallery / Studio / About / Sanity 零改动

**涉及文件：**
- `src/components/canvas/rooms/Contact/ContactRoom.jsx`（仅 Phone buoy `position`）

**构建：** ✅ 通过（6.66s）

**Commit：** `9be0014`

---

## 2026-08-14 — Phase 2.2 Task 2B-2: ITom Internal Legacy Cleanup

**模块：** 代码内部 ITom 遗留引用清理

**目标：** 清理代码内部用户不可见的 ITom 遗留引用，不影响现有功能。

**修改内容：**

**1. localStorage 成就键重命名**
- `AchievementsContext.jsx`：`itom_achievements` → `menglan_world_achievements`（3 处读写，提取为模块级 `STORAGE_KEY` 常量，避免魔法字符串）

**2. 走廊/入口组件陈旧注释清理（ITOM → MENGLAN / branding）**
- `Experience.jsx`：`ITOM/Avatar` → `MENGLAN/Avatar`、`corridor with ITOM` → `corridor with MENGLAN`
- `EmptyCorridor.jsx`：`no ITOM` → `no branding text`
- `EntranceDoors.jsx`：`avatar/ITOM` → `avatar/branding`
- `CorridorSegment.jsx`：`ITOM text / ITOM letters` → `MENGLAN text / MENGLAN letters`

**分类处理结果（搜索 ITom / Tomasz / portfolio-itom）：**

| 分类 | 处理 | 位置 |
|------|------|------|
| 状态 key | ✅ 替换 | `AchievementsContext.jsx` `itom_achievements` |
| 陈旧注释 | ✅ 替换 | 走廊/入口 4 个组件 |
| 保留（版权/开源感谢） | ⏸️ 保留 | README 原仓库 `ITomPoland/portfolio-itom` 链接 |
| 保留（原素材备份说明） | ⏸️ 保留 | `texturePreloadList.js`「Legacy Tomasz, preserved as backup」 |
| 保留（reband 历史注释） | ⏸️ 保留 | Gallery / Studio / About 内 rebrand 说明注释（受「不要修改 Gallery/Studio/About」约束） |
| 保留（受保护脚本） | ⏸️ 保留 | `About/*.cjs`（含 `tomsz` / `portfolio-itom` 路径） |
| 保留（Sanity Studio） | ⏸️ 保留 | `portfolio-itom/` 目录 + npm 包名 + `globalInfo.js` schema 描述（受「不要修改 Sanity schema」约束） |

**未修改：**
- Gallery / Studio / About 视觉内容 / Contact / Sanity schema 零改动
- 功能零改动（仅键名 + 注释）

**涉及文件：**
- `src/context/AchievementsContext.jsx`
- `src/components/canvas/Experience.jsx`
- `src/components/canvas/entrance/EmptyCorridor.jsx`
- `src/components/canvas/entrance/EntranceDoors.jsx`
- `src/components/canvas/corridor/CorridorSegment.jsx`

**构建：** ✅ 通过（6.36s）

**Commit：** 待提交

---

## 2026-08-18 — Phase 2.3 Task 2C-1: About Projects & Professional Profile Content

**模块：** About Room Projects / Skills / Credentials / Coming Soon 内容重构

**目标：** 重构 About Room 的 Projects / Skills / Credentials / Coming Soon 数据结构，建立共享素材目录与 Asset Checklist，为 V2 图片层做准备。

**修改内容：**

**1. 新建共享素材目录（6 个，About/Gallery/Studio 共享，`.gitkeep` 占位）**
- `public/textures/projects/{menglan-world, family-menu-ai, ai-rpa-enterprise}/`
- `public/textures/certifications/{cet6, rpa, master}/`

**2. Projects 数据结构（3 个当前项目，`PROJECTS` 常量）**
- Menglan World（3D AI Portfolio，Current，GitHub + Vercel Demo 链接）
- AI Family Menu Assistant（AI Application，Prototype，无链接）
- AI & RPA Enterprise Solutions（Enterprise AI Application，Completed，无链接）

**3. Professional Capabilities（6 项，`PROFESSIONAL_CAPABILITIES` 常量，非"官方认证"）**
- Azure Cloud Support / Artificial Intelligence / Python Programming / Modern Web Development / Workflow Automation / AI Agent & Prompt Engineering

**4. Professional Credentials（4 项真实凭证，`PROFESSIONAL_CREDENTIALS` 常量）**
- CET-6（2022）/ RPA Advanced Certification（2025）/ Master of Computer Technology（2024）/ Bachelor of Software Engineering（暂无图片）

**5. Coming Soon（3 项，`COMING_SOON` 常量）**
- AI Agents Platform / AI Mobile Applications / AI + 3D Interactive Experience

**6. 卡片标签与 Skills 更新**
- `CURRENT` → `PROJECTS`、`CERTIFICATIONS` → `CREDENTIALS`
- Skills 副标题 `AI • Automation • Cloud • Development` → `Professional Capabilities`
- `BALLOON_CONFIG` 顶部注释新增 6 项能力归类映射

**未修改：**
- Gallery / Studio / Contact / Hero / Entrance / Camera / GSAP / Shader / Sanity / GlobalOverlay 基础结构零改动
- 未删除任何原素材（SOTY/SOTD/SOTM、painted 纹理、ITom 纹理、备份）
- 未复制已有图片到新目录（目录留空，等新图片提供）

**涉及文件：**
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx`
- `public/textures/projects/**/.gitkeep`（6 个新目录）
- `public/textures/certifications/**/.gitkeep`（6 个新目录）
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`
- `docs/ABOUT_CONTENT_PLAN.md`

**构建：** ✅ 通过（10.12s）

**Commit：** `7786569`

---

## 2026-08-19 — Phase 2.3 Task 2C-2: About Room V2 Image Layer Integration

**模块：** About Room 项目截图 + 凭证图片接入

**目标：** 把 Phase 2.3 Asset Checklist 中「待提供」的项目截图（6 张）与凭证图片（4 张）接入 About Room，凭证图片路径从 `/textures/about/ml/` 迁移到 `/textures/certifications/`。

**修改内容：**

**1. `InfiniteSkyManager.jsx` — 项目截图接线**
- `PROJECTS` 常量：`assetDir` 字段 → `images` 数组（每项目 2 张真实截图）
  - Menglan World: `hero.webp` + `gallery.webp`
  - AI Family Menu Assistant: `home.webp` + `menu.webp`
  - AI & RPA Enterprise Solutions: `dashboard.webp` + `workflow.webp`
- `PROJECTS_DATA.featured` / `.sotd`：`PROJECTS.map` → `PROJECTS.flatMap`，3 项 → 6 项（每项目 hero + detail 两张卡片），移除 SOTY/SOTD/SOTM 占位图引用

**2. `InfiniteSkyManager.jsx` — 凭证图片迁移**
- `PROFESSIONAL_CREDENTIALS`：`image` / `targetDir` 字段 → `images` 数组，路径从 `/textures/about/ml/` 迁移到 `/textures/certifications/`
  - CET-6 → `certifications/cet6/cet6.webp`
  - RPA Advanced Certification → `certifications/rpa/rpa-certification.webp`
  - Master of Computer Technology → `certifications/master/master-degree.webp` + `master-graduation.webp`（2 张）
  - Bachelor of Software Engineering → 无图片（不伪造，保持占位）
- `PROJECTS_DATA.other`：`map` → `flatMap`，4 项 → 5 项（Master 展开为 2 张）

**3. `texturePreloadList.js` — 预加载更新**
- 移除旧的 `/textures/about/ml/{MSdegree, MSdegree_1, CET6, RPAcertification}.webp` 4 条
- 新增 10 条：6 张项目截图 + 4 张凭证图片（迁移到新路径）

**未修改（按要求冻结）：**
- 3D 卡片面纹理（SOTY/SOTD/SOTM + `_painted`）零改动——它们仍是 AwardsMilestone 的浮动卡片装饰
- 3D 结构 / 卡片翻转 / Camera / GSAP / Shader / AwardsMilestone 渲染零改动
- Gallery / Studio / Contact / Hero / Entrance / Sanity 零改动
- 原素材文件未删除（`/textures/about/ml/*` 旧凭证图片保留在磁盘，仅从预加载列表移除）

**涉及文件：**
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx`
- `src/config/texturePreloadList.js`
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`

**构建：** ✅ 通过（9.21s）

**Commit：** `3b46bbd`

---

## 2026-08-19 — Phase 2.3 Task 2C-3: About VIEW Local-First Fix

**模块：** About Room VIEW 弹窗数据源修复

**问题：** CURRENT PROJECT / CREDENTIALS 的 VIEW 弹窗仍显示旧 Tomasz 项目与证书；卡片计数显示 10/6/0（旧 Sanity awards 数据）。

**根因：** `InfiniteSkyManager.jsx` 的 `awardsData = sanityAwards || PROJECTS_DATA` —— `useAwards()` 返回 `useSanityData.js` 的 `cache.awards`（Sanity `*[_type == "awardCertificate"]` 旧 Tomasz 数据），Sanity 可达时覆盖本地 `PROJECTS_DATA`。

**修改内容：**

**1. `InfiniteSkyManager.jsx` — 强制 Local-First**
- 移除 `useAwards` import 与 `sanityAwards`，`awardsData = PROJECTS_DATA`（不再被 Sanity 覆盖）
- `PROFESSIONAL_CREDENTIALS`：`images` 数组 → 单个 `image` 字段；Master 拆分为 `Master Degree` + `Master Graduation`（两张真实凭证）；移除无图的 `Bachelor`
- `PROJECTS_DATA.other.items`：`flatMap` → `map`（4 项）
- 卡片计数：`{awardsData.sotd/sotm/other.items.length}` → `{PROJECTS.length}`(3) / `{COMING_SOON.length}`(3) / `{PROFESSIONAL_CREDENTIALS.length}`(4)

**2. `useSanityData.js` — 禁用 cache.awards**
- `if (awardsData && ...)` → `if (false && awardsData && ...)`：About VIEW 不再读取旧 awards cache，切断 Sanity CDN 图片预加载

**未修改（按要求冻结）：**
- Gallery / Studio / Contact / Hero / Entrance / Corridor 零改动
- 未重新启用 Sanity（API fetch 仍保留为 V3 占位）
- 未删除任何旧图片（`/textures/about/ml/*`、SOTDAYYOUNGMULTI*.webp、ITom 备份全部保留）
- About 页面视觉结构零改动（仅数据源与计数）

**验证：** `npm run build` ✅（9.69s）+ `npm run dev` ✅（ready in 365ms）

**涉及文件：**
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx`
- `src/hooks/useSanityData.js`
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`
- `docs/ABOUT_CONTENT_PLAN.md`

**Commit：** `98824b8`

---

## 2026-08-19 — Phase 2.4 Task 2D-1: Unify About/Gallery Project Data

**模块：** 项目数据源统一（About Room + Gallery Room）

**背景：** About Room 与 Gallery Room 各自维护独立项目数据副本。About 用 `PROJECTS`（name/status/links/tech），Gallery 用 `FALLBACK_PROJECTS`（title/front/painted/techStack），第 3 个项目内容不一致（About="AI & RPA Enterprise Solutions" vs Gallery="Desktop AI Companion"）。

**修改内容：**

**1. 新建 `src/data/projects.js` — 单一数据源**
- 3 个正式项目：Menglan World / AI Family Menu Assistant / AI & RPA Enterprise Solutions
- 统一字段：`id, name, category, description, tech(数组), status(current/prototype/completed), url, github, images, galleryCover(暂空), featured, comingSoon`

**2. `InfiniteSkyManager.jsx`（About）— 移除本地 PROJECTS 副本**
- 删除本地 `const PROJECTS = [...]`，改为 `import { PROJECTS } from '../../../../data/projects'`
- `PROJECTS_DATA` 派生适配：`p.links.demo || p.links.github` → `p.url || p.github`；`status` 小写 → 首字母大写显示（`p.status.charAt(0).toUpperCase() + p.status.slice(1)`）
- 卡片计数 `{PROJECTS.length}`（3）保持不变

**3. `GalleryRoom.jsx`（Gallery）— 移除本地 FALLBACK_PROJECTS 副本**
- 删除 `FALLBACK_PROJECTS` 与 `useGalleryProjects()`，改为从共享 `PROJECTS` 派生 `activeProjects`
- 新增本地 `GALLERY_COVER_FALLBACK`（遗留封面：menglan-world→monetuneprzod / family-menu-ai→timberkittyprzod / ai-rpa-enterprise→youngmultiprzod）+ `GALLERY_TECH_STACK`（遗留 tech logo 路径）——仅保留 Gallery 专属展示资产
- `PROJECT_COUNT = 10`、3D 晾衣绳结构、卡片翻转详情交互保持不变

**未修改（按要求冻结）：**
- 图片零改动（monetuneprzod / timberkittyprzod / youngmultiprzod 未替换；bioprzod、遗留 tech logo、原始 Tomasz 图片全部保留给 2D-2 / 2D-4）
- Credentials / Journey / Skills / Coming Soon / About UI / GlobalOverlay / Sanity 零改动
- 未开始 2D-2 / Gallery 图片替换 / Studio

**验证：** `npm run build` ✅（8.21s）

**涉及文件：**
- `src/data/projects.js`（新建）
- `src/components/canvas/rooms/About/InfiniteSkyManager.jsx`
- `src/components/canvas/rooms/Gallery/GalleryRoom.jsx`
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`

**Commit：** `957a412`

---

## 2026-08-20 — Phase 2.4 Task 2D-2: Gallery V2 — Menglan Project Assets

**模块：** Gallery Room 素材接入与项目详情重构

**修改内容：**

**1. 项目封面接入（新素材）**
- `GALLERY_COVER_FALLBACK` → `GALLERY_COVERS`，指向新 Menglan 封面：
  - Menglan World → `cover.webp` / `cover_painted.webp`
  - AI Family Menu Assistant → `cover.webp` / `cover_painted.webp`
  - AI & RPA Enterprise Solutions → `cover.png`（PNG，按磁盘实际）/ `cover_painted.webp`

**2. Tech Stack 图标接入（`/textures/gallery/ml/`）**
- Menglan World：React / Three.js / GSAP / Claude Code
- AI Family Menu Assistant：Flutter / Android / Claude Code（**Dart 图标缺失**，暂显示 3 个）
- AI & RPA Enterprise Solutions：Python / RAG / RPA / Coze
- 移除旧 ITom tech logo（csslogo/htmllogo/jslogo/elementorlogo/firebaselogo/wordpresslogo/phplogo/netlifylogo/tailwindlogo）
- 修复 painted 派生逻辑：`path.replace('.webp', '_painted.webp')` 保留 `ml/` 子目录

**3. 项目详情文案（卡片背面）**
- 3 个项目 description 更新为正式文案（本地 `GALLERY_DETAILS`，不动共享 `src/data/projects.js`，避免影响 About）
- OPEN PROJECT 按钮改为动态标签 + `openUrl`（GitHub 优先，demo 兜底）
- AI & RPA：`buttonLabel: 'PRIVATE PROJECT'`，`openUrl: null`（点击不跳转，无虚假链接）

**4. 旧 ITom 运行时引用清除**
- `monetuneprzod` / `timberkittyprzod` / `youngmultiprzod` / `bioprzod` 从 GalleryRoom 运行时移除
- 旧 tech logo 从 GalleryRoom 运行时移除
- 图片文件本体未删除（保留备份）

**未修改（按要求冻结）：**
- About / Studio / Contact / Hero / EntranceDoors / SignSystem / useInfiniteCamera / GSAP / Shader / Sanity / SceneContext / GlobalOverlay 零改动
- `src/data/projects.js` 零改动（About 数据源不动）
- `texturePreloadList.js` 零改动（预加载清单，避免影响其他模块）
- 3D 晾衣绳 / 卡片翻转 / 相机 / 移动窗口结构零改动

**验证：** `npm run build` ✅（7.83s）+ `npm run dev` ✅（ready 422ms，`/` 与 `/gallery` 均 200）

**涉及文件：**
- `src/components/canvas/rooms/Gallery/GalleryRoom.jsx`
- `public/textures/projects/*/cover*`（新素材，用户已准备）
- `public/textures/gallery/ml/*`（新 tech 图标，用户已准备）
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`

**Commit：** b99b9d7

---

## 2026-08-20 — Gallery V2 补丁：Family Menu Tech Stack 修正

**模块：** Gallery Room Tech Stack

**修改内容：**
- `GALLERY_TECH_STACK['family-menu-ai']`：Flutter / Android / Claude Code → **Flutter / Gradle / Android**
- 移除 Claude Code 图标；新增 `gradle.webp` / `gradle_painted.webp`（用户已补充到 `/textures/gallery/ml/`）
- 预加载清单 `allLogos` 增加 `gradle`（sketch + painted）
- 保留 sketch → painted hover 效果与布局不变（tech stack 渲染按 `length` 动态居中，3 个图标）

**未修改：** Menglan World / AI & RPA 的 tech stack；其他房间零改动。

**验证：** `npm run build` ✅

**涉及文件：**
- `src/components/canvas/rooms/Gallery/GalleryRoom.jsx`
- `public/textures/gallery/ml/gradle.webp` + `gradle_painted.webp`（新素材）
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`

**Commit：** f12f574

---

## 2026-08-20 — Gallery V2 补丁：Family Menu Tech Stack 补全为 4 格

**模块：** Gallery Room Tech Stack

**修改内容：**
- `GALLERY_TECH_STACK['family-menu-ai']` 固定为 4 个：**Flutter / Gradle / Android / Claude Code**
- 对应 `flutter` / `gradle` / `android` / `claude`（sketch + `_painted`，均已存在）
- 保留现有 4 格布局与 sketch → painted hover 效果（`techStack.length` 动态居中）

**未修改：** Menglan World / AI & RPA 的 tech stack；其他房间零改动。

**验证：** `npm run build` ✅

**涉及文件：**
- `src/components/canvas/rooms/Gallery/GalleryRoom.jsx`
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`

**Commit：** f22c24f

---

## 2026-08-20 — Phase 2.5: Studio V2 — Menglan Content

**模块：** Studio Room 内容接入

**修改内容：**
- `contentData.js`：`RAW_CONTENT_DATA` 从 27 条占位 → 4 条正式本地内容，全部 `url: null`
  - AI EXPERIMENTS（tiktok）
  - AI DEVELOPMENT LOG（blog）
  - AI PROJECT SHOWCASE（youtube）
  - BUILDING WITH CLAUDE CODE（youtube）
- 纹理映射保持平台自动映射：tiktok→`phonefront_followmeontiktok`（用户新换）、blog→`monitorfront_postnafbdoublewinner`、youtube→`tvfront_filmikprojektdlamultiego`/`tvfront_filmikedytowaniezdjec`
- `GlobalOverlay.jsx` + `GlobalOverlay.scss`：URL 为空时「Open Link ↗」→ 不可点击的「Coming Soon」（无空链接跳转）
- 设备外壳纹理 / 3D 结构 / 动画 / 交互零改动；旧 ITom 图片仅保留为备份，未删除

**未修改：** 之前已替换的 3 张 Studio 图片保持不动；其他房间零改动。

**验证：** `npm run build` ✅

**涉及文件：**
- `src/components/canvas/rooms/Studio/contentData.js`
- `src/components/ui/GlobalOverlay.jsx`
- `src/styles/GlobalOverlay.scss`
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`

**Commit：** fd71de4

---

## 2026-08-21 — Phase 2 最终视觉修复（两处 MENGLAN 排版）

**模块：** 走廊 Hero + 入口 Sign 的 MENGLAN 排版

**背景：** 用 fontTools 实测 `RubikScribble-Regular.ttf` 字形宽度（M=0.856em、E=0.667em、N=0.740em、G=0.753em、L=0.626em、A=0.755em），定位两处排版问题：走廊 Hero 的字间距 0.35 远小于字母自然字宽（0.6–0.86em），导致字母重度重叠（过挤）；入口 Sign 的字间距 0.26 + 字号 0.28 使覆盖层宽达 1.84 单位，超出木牌烘焙文本（实测 1.436 单位），显得过宽。

**修改内容：**
- `HeroText.jsx`（走廊 MENGLAN）：
  - `baseX` 步距 `0.35 → 0.6`（`±1.05 → ±1.8`），字母自然舒展、基本不再重叠
  - `splitDir` 由 `baseX × 2` 改为 `baseX × 1`——否则加宽后分裂动画会把字母推到走廊墙外（7 单位走廊，墙在 ±3.5）；1.0 比例下满分裂峰值约 ±3.4，仍在墙内
- `SignSystem.jsx`（入口 MENGLAN）：
  - 遮罩条 `[1.9, 0.34] → [1.5, 0.30]`（仍完整覆盖烘焙文本 1.436）
  - 字号 `0.28 → 0.24`，字母步距 `0.26 → 0.20`（`±0.78 → ±0.60`），整体宽度从 ~1.84 收窄到 ~1.34–1.40，居中落在 2 单位木牌内

**未修改：** About / Gallery / Studio / Contact / Sanity / Shader / Camera 及其他 GSAP 逻辑零改动；Hero 的 tagline、slogan、装饰星，Sign 的 `sign.webp` / `belka.webp` 等门面素材均保持原样。

**验证：** `npm run build` ✅（946 modules）；`npm run dev` ✅（HTTP 200，端口 5175）。

**涉及文件：**
- `src/components/canvas/corridor/HeroText.jsx`
- `src/components/canvas/entrance/SignSystem.jsx`
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`

**Commit：** 待提交
