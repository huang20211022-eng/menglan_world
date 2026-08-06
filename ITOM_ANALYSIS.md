# ITOM_ANALYSIS.md

> **本文档保存原始 ITom 项目的三轮深度分析结果。**
> 这些内容已从 `CLAUDE.md` 中精简出来，作为遗留参考保留。
> 日常开发请以 `CLAUDE.md` 和 `MY_PROJECT_SPEC.md` 为准。

---

## 原始完整目录结构

```
/
├── index.html                       # Vite 入口 HTML，含 SEO meta、Google Fonts、sr-only 回退
├── package.json                     # 依赖 + scripts
├── vite.config.js                   # Vite 7：React 插件、gzip 压缩、SEO 插件、Sanity CDN 代理
├── eslint.config.js                 # ESLint 9 flat config（JS recommended + React Hooks + React Refresh）
├── seo-plugin.js                    # 自定义 Vite 构建插件：注入 JSON-LD、meta 标签、llms.txt
├── README.md                        # 面向公众的 README
├── TODO.md                          # 任务/待办列表
│
├── functions/
│   └── sanity-cdn/[[catchall]].js   # Cloudflare Worker：代理 Sanity CDN，1 年缓存
│
├── scripts/                         # 构建/优化/修复工具（14 个脚本）
│   ├── optimize_textures.js
│   ├── optimize_about.js
│   ├── optimize_clouds.js
│   ├── optimize_contact.js
│   ├── optimize_corridor_recursive.js
│   ├── optimize_gallery.js
│   ├── fix_awards_textures.js
│   ├── fix_quality.js
│   ├── fix_textures_jimp.js
│   ├── fix_textures_sharp.js
│   ├── list_dims.js
│   ├── upgrade_contact_quality.js
│   └── test_sharp.js
│
├── src/
│   ├── main.jsx                     # React DOM 入口，控制台品牌签名
│   ├── App.jsx                      # 根组件：providers、Canvas 配置、纹理预加载、懒加载
│   ├── App.css                      # 遗留 Vite 模板样式（logo-spin keyframes）
│   ├── index.css                    # 遗留 Vite 模板（root font、color-scheme）
│   │
│   ├── assets/
│   │   └── react.svg                # 默认 React SVG（未使用的占位符）
│   │
│   ├── components/
│   │   ├── canvas/                  # 所有 3D WebGL/R3F 组件（31 个文件）
│   │   │   ├── Experience.jsx       # 主 3D 场景编排器
│   │   │   │
│   │   │   ├── background/          # （遗留/废弃——未积极使用）
│   │   │   │   ├── PaperBackground.jsx
│   │   │   │   └── Tunnel.jsx
│   │   │   │
│   │   │   ├── corridor/            # 无限走廊系统（15 个文件）
│   │   │   │   ├── InfiniteCorridorManager.jsx  # 主控：滑动窗口段管理
│   │   │   │   ├── CorridorSegment.jsx          # 单段（墙壁 + 门 + 装饰 + hero）
│   │   │   │   ├── CorridorWalls.jsx            # 锯齿墙、地砖、天花板、踢脚线
│   │   │   │   ├── CorridorDecorations.jsx      # 灯、画框、桌子、柜子、树、栅格
│   │   │   │   ├── DoorSection.jsx              # 最复杂的组件：门单元（墙+框+门+房间+音频）
│   │   │   │   ├── Door.jsx                     # 遗留简单门（入口使用）
│   │   │   │   ├── SegmentDoors.jsx             # 段末自动打开的双门
│   │   │   │   ├── LoopDoors.jsx                # 遗留双门，带循环回调
│   │   │   │   ├── RoomInterior.jsx             # 门→房间桥梁（迷你走廊 + 房间切换）
│   │   │   │   ├── RoomWarmup.jsx               # 预加载期间屏幕外 shader 预编译
│   │   │   │   ├── TeleportRoom.jsx             # 传送期间镜头定位（null 组件）
│   │   │   │   ├── HeroText.jsx                 # "ITOM" + 标语，带分裂效果
│   │   │   │   ├── Avatar.jsx                   # 9 帧 boomerang 动画角色
│   │   │   │   ├── Doodles.jsx                  # 浮动纸片装饰（星星、思想气泡等）
│   │   │   │   └── Corridor.jsx                 # 遗留简单走廊（由 CorridorWalls 替代）
│   │   │   │
│   │   │   ├── entrance/              # 入口体验（3 个文件）
│   │   │   │   ├── EmptyCorridor.jsx           # 入口阶段占位地板
│   │   │   │   ├── EntranceDoors.jsx           # 主入口：双门、砖块、猫、树、虫子、鸭子
│   │   │   │   └── SignSystem.jsx              # 悬挂标志，风摇动画
│   │   │   │
│   │   │   ├── rooms/                 # 房间内部（4 个房间，14+ 文件）
│   │   │   │   ├── About/
│   │   │   │   │   ├── AboutRoom.jsx            # 天空飞行体验（动量滚动，无 GSAP）
│   │   │   │   │   ├── InfiniteSkyManager.jsx   # 无限云块 + 故事里程碑
│   │   │   │   │   ├── SkyChunk.jsx             # 40 单位天空段，程序化云
│   │   │   │   │   ├── PaperAirplane.jsx        # 低多边形折纸飞机（BufferGeometry）
│   │   │   │   │   ├── StoryMilestone.jsx       # 职业里程碑标记
│   │   │   │   │   ├── fix_hover_stutter.cjs    # 性能修复脚本
│   │   │   │   │   ├── mobile_opt.cjs           # 移动端优化配置
│   │   │   │   │   └── mobile_opt2.cjs          # 移动端优化 v2
│   │   │   │   │
│   │   │   │   ├── Contact/
│   │   │   │   │   ├── ContactRoom.jsx          # 码头/栈桥，海浪，灯塔，船
│   │   │   │   │   ├── MessagePaper.jsx         # 交互式 3D 纸表单，HTML 输入
│   │   │   │   │   ├── SocialBarrel.jsx         # 可点击浮动桶，悬停揭示
│   │   │   │   │   └── TornPaperGeometry.js     # 自定义几何体：撕边纸平面
│   │   │   │   │
│   │   │   │   ├── Gallery/
│   │   │   │   │   ├── GalleryRoom.jsx          # 晾衣绳轮播，城市背景
│   │   │   │   │   ├── GalleryClouds.jsx        # 漂移程序化云平面
│   │   │   │   │   ├── PaperMaterial.jsx        # 自定义 shader 材质（弯曲 + 风 + 翻转）
│   │   │   │   │   └── usePaintMaterial.js      # Hook：注入 paint-reveal shader 到任意材质
│   │   │   │   │
│   │   │   │   └── Studio/
│   │   │   │       ├── StudioRoom.jsx           # 无限圆柱显示器塔
│   │   │   │       ├── FloatingCodeParticles.jsx # 代码符号粒子系统（Troika Text）
│   │   │   │       └── contentData.js           # 27 条硬编码内容（回退数据）
│   │   │   │
│   │   │   └── shaders/               # 自定义 GLSL shader 材质（3 个文件）
│   │   │       ├── RevealMaterial.jsx           # 笔触丢弃揭示 + paint 过渡
│   │   │       ├── RevealBasicMaterial.jsx      # 简化揭示（无 paint 支持）
│   │   │       └── PaintRevealMaterial.jsx      # 基于混合的揭示（素描→涂色）
│   │   │
│   │   ├── dom/                       # 2D DOM 覆盖组件（2 个文件）
│   │   │   ├── Preloader.jsx                  # 加载屏幕，纸撕裂退出动画
│   │   │   └── PaperTransition.jsx            # 传送期间全屏纸关闭/打开
│   │   │
│   │   └── ui/                        # 2D UI / HUD 组件（6 个文件）
│   │       ├── NavigationUI.jsx               # 汉堡菜单、地图覆盖、房间传送、音频面板
│   │       ├── GlobalOverlay.jsx              # 撕纸卡片覆盖，打字文本效果
│   │       ├── ScreenReaderOverlay.jsx        # 不可见可访问 HTML 导航（SEO/a11y）
│   │       ├── AudioControls.jsx              # 独立音量滑块 + 静音
│   │       ├── AchievementsPanel.jsx          # 滑出面板，列出所有成就
│   │       └── AchievementPopup.jsx           # 成就解锁 Toast 通知
│   │
│   ├── context/                      # React Context providers（全局状态）（4 个文件）
│   │   ├── SceneContext.jsx                  # 中枢神经系统：房间、传送、覆盖
│   │   ├── AudioManager.jsx                  # 音频上下文：静音、音量、play()、活跃声音
│   │   ├── PerformanceContext.jsx            # 设备分级：HIGH/MEDIUM/LOW，自适应设置
│   │   └── AchievementsContext.jsx           # 教程/成就系统，localStorage + PostHog
│   │
│   ├── hooks/                        # 自定义 React hooks（6 个文件）
│   │   ├── useInfiniteCamera.js              # 走廊的滚动/视差/glance 镜头
│   │   ├── useScrollCamera.js                # 简单基于滚动的 Z 镜头（遗留）
│   │   ├── useMouseParallax.js               # 鼠标驱动视差，直接修改镜头
│   │   ├── useParallax.js                    # 通用视差 hook（返回 React state）
│   │   ├── useDocumentMeta.js                # 虚拟路由：History API、meta 标签、深度链接
│   │   └── useSanityData.js                  # Sanity 数据获取，模块级缓存 + pub/sub
│   │
│   ├── config/                       # 配置文件（2 个文件）
│   │   ├── texturePreloadList.js             # 主纹理清单，设备感知过滤
│   │   └── sanity.js                         # Sanity client：project kv5wjjmj，urlFor()，getProxyUrl()
│   │
│   ├── utils/                        # 工具模块（2 个文件）
│   │   ├── audioManager.js                   # 独立 BGM 单例（模块级 Audio 元素）
│   │   └── deviceDetect.js                   # 设备检测：mobile、touch、memory、CPU cores
│   │
│   └── styles/                       # SCSS 样式表（11 个文件）
│       ├── main.scss                        # 入口（导入 variables、mixins、base、Preloader）
│       ├── _variables.scss                  # 设计 token（颜色、字体、断点、间距、z-index）
│       ├── _mixins.scss                     # 响应式 mixins（mobile、tablet、desktop）、flex、fullscreen
│       ├── _base.scss                       # CSS reset、@keyframes fadeIn/bounce、body typography
│       ├── Preloader.scss                   # Preloader 屏幕（paper halves 布局）
│       ├── NavigationUI.scss                # 地图面板、音频面板、按钮、提示、菜单覆盖
│       ├── GlobalOverlay.scss               # @font-face 声明、覆盖卡片、自定义滚动条
│       ├── AudioControls.scss               # 自定义 range input 样式（webkit + moz）
│       ├── AchievementPopup.scss            # Toast 弹窗，enter/exit keyframes
│       ├── AchievementsPanel.scss           # 侧面面板，locked/unlocked 状态
│       └── ScreenReaderOverlay.scss         # .sr-only 无障碍工具类
│
├── public/                          # 静态资源（根路径提供）
│   ├── favico.png
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── og-image.webp
│   ├── _headers                          # Cloudflare 自定义 HTTP headers
│   ├── _redirects                        # SPA fallback：/* /index.html 200
│   │
│   ├── cursors/                          # 自定义光标图片
│   │   ├── cursor-default.webp
│   │   └── cursor-pointer.webp
│   │
│   ├── fonts/                            # 自定义字体（TTF）
│   │   ├── CabinSketch-Regular.ttf
│   │   ├── CabinSketch-Bold.ttf
│   │   ├── FrederickatheGreat-Regular.ttf
│   │   ├── RubikScribble-Regular.ttf
│   │   └── SatisfySL.json
│   │
│   ├── images/                           # 标准图片资源（用于 <img> 标签）
│   │   ├── ink-splash.webp
│   │   ├── JSSREDNIBALON_painted.webp
│   │   ├── map.webp + map_*_painted.webp（5 个地图变体）
│   │   ├── pin.webp + pin-slot.webp
│   │
│   ├── sounds/                           # 音频文件（MP3/OGG，波兰语文件名）
│   │   ├── cfl_turningpages-belem-breeze-487596.ogg  # 背景音乐
│   │   ├── baloonpoop.mp3
│   │   ├── papersound.mp3
│   │   ├── otwarciedrzwi.mp3             # 门打开
│   │   ├── uchyleniedrzwi.mp3            # 门半开/吱吱声
│   │   ├── zamknieciedrzwi.mp3           # 门关闭
│   │   ├── szummiasta.mp3                # 城市环境音（Gallery）
│   │   ├── szummonitorow.mp3             # 电子设备嗡嗡声（Studio）
│   │   ├── szummorza.mp3                 # 海浪（Contact）
│   │   └── szumwiatru.mp3                # 风（About）
│   │
│   └── textures/                         # 3D 纹理（WebP 格式，200+ 文件）
│       ├── paper-texture.webp
│       ├── doors/
│       ├── entrance/                     # 入口场景纹理（32 个文件 + 备份）
│       ├── corridor/                     # 走廊纹理（42+ 个文件 + avatar_anim/ + decorations/ + doors/）
│       ├── about/                        # About 房间纹理（26 个文件：气球、奖项、云）
│       ├── gallery/                      # Gallery 纹理（项目卡片、logo、风景）
│       ├── contact/                      # Contact 纹理（molo、桶、船、灯笼、表单）
│       ├── clouds/                       # About 房间云纹理（8 个 UUID 命名文件）
│       └── studio/                       # Studio 纹理（显示器/TV/手机表面）
│
└── portfolio-itom/                   # Sanity Studio v3（独立 npm 项目）
    ├── package.json
    ├── sanity.config.js                # 项目 kv5wjjmj，数据集 production，Structure Tool
    ├── sanity.cli.js
    ├── eslint.config.mjs
    ├── static/.gitkeep
    └── schemaTypes/
        ├── index.js                    # 导出全部 5 个类型
        ├── globalInfo.js               # 单例：siteTitle、siteDescription、aboutMe、社交 URL
        ├── galleryProject.js           # title、slug、url、description、frontImage、paintedImage、techStack
        ├── studioItem.js               # title、device、platform、description、url、front/painted textures
        ├── awardCertificate.js         # title、category（sotd/sotm/other）、certificateImage、date、url
        └── faq.js                      # question、answer
```

---

## 完整应用初始化序列

```
阶段 1: main.jsx
  - 控制台品牌签名
  - ReactDOM.createRoot 渲染 <App /> 在 <StrictMode> 中

阶段 2: App.jsx 模块级
  - PostHog 初始化（VITE_POSTHOG_KEY、VITE_POSTHOG_HOST、person_profiles: 'identified_only'）
  - 设备检测（6 个布尔标志）
  - 纹理预加载：LOW_END → 仅 CORE_TEXTURES；HIGH_END → PRELOAD_ALL + PRELOAD_LOADER
  - filterTexturesByDevice() 在触摸设备上过滤 _painted 变体
  - Experience 组件：lazy(() => import('./components/canvas/Experience'))

阶段 3: App.jsx 渲染树
  - PerformanceProvider → AchievementsProvider → AppContent
  - AppContent：AudioProvider → SceneProvider
  - DocumentMetaBridge（useDocumentMeta 运行，深度链接检查）
  - GlobalAudioEnabler（首次用户交互时启用音频）
  - Canvas，依赖 tier 的 dpr/antialias/shadows/powerPreference
  - PerformanceMonitor 在 FPS 下降时节流（3 次翻转 → downgradeTier）
  - Suspense → Experience（lazy）
  - Preload all（drei）

阶段 4: Experience.jsx 挂载
  - useInfiniteCamera：scroll/parallax 禁用（hasEntered=false）
  - RoomWarmup：全部 4 个房间在 Y=-500（屏幕外）
  - EmptyCorridor + EntranceDoors + SignSystem（入口场景）
  - InfiniteCorridorManager（segments [0,1]，隐藏 segment -1 的门）
  - TeleportRoom（返回 null，等待 teleportPhase）

阶段 5: Sanity 数据加载（并行）
  - App.jsx useEffect：loadSanityData() + 为 IMAGE_ASSETS 预加载浏览器图片
  - 3 个并行 GROQ 查询（galleryProject、studioItem、awardCertificate）
  - 图片通过 urlFor() → getProxyUrl()（CDN 重写）映射
  - 预加载结果纹理 URL
  - 发布给监听者 → cache.loaded = true

阶段 6: 场景就绪 → Preloader 完成
  - RoomWarmup 检测到 Sanity 数据已加载 → 渲染 3 帧
  - 调用 gl.compileAsync(scene, camera) 进行 shader 预编译
  - onWarmupComplete → setSceneReady(true)
  - Preloader 播放退出动画 → setIsLoaded(true)

阶段 7: 用户交互
  - 点击入口门 → GSAP 飞行穿越 → markEntered()
  - hasEntered=true：scroll/parallax 启用，入口卸载，教程开始
  - 深度链接自动传送触发（如适用，300ms 延迟）
```

---

## 完整 Context API 参考

### SceneContext

| 状态变量 | 类型 | 默认值 | 用途 |
|---|---|---|---|
| `currentRoom` | `string \| null` | `null` | 活跃房间 ID 或 `null` = 走廊 |
| `hasEntered` | `boolean` | `false` | 是否已穿过入口门 |
| `exitRequested` | `boolean` | `false` | 从 UI 返回按钮发信号给 DoorSection |
| `overlayContent` | `object \| null` | `null` | GlobalOverlay 的内容 |
| `teleportTarget` | `string \| null` | `null` | 目标房间 ID |
| `isTeleporting` | `boolean` | `false` | 传送进行中 |
| `teleportPhase` | `'closing' \| 'teleporting' \| 'opening' \| null` | `null` | 当前传送状态机阶段 |
| `pendingDoorClick` | `string \| null` | `null` | 相机定位后自动点击的门标签 |
| `isFastTeleport` | `boolean` | `false` | 快速传送模式（全部动画 0.01s） |

**全部 Actions：** `enterRoom`、`exitRoom`、`requestExit`、`clearExitRequest`、`markEntered`、`openOverlay`、`closeOverlay`、`teleportTo`、`startTeleportTransition`、`openTeleportTransition`、`completeTeleport`、`signalRoomReady`、`finishPaperOpen`、`cancelTeleport`

### AudioContext

| 导出 | 类型 | 用途 |
|---|---|---|
| `isMuted` | boolean | 从 localStorage `audio_muted` 读取，持久化 |
| `globalVolume` | float 0..1 | 从 localStorage `audio_volume` 读取，默认 0.5 |
| `audioEnabled` | boolean | 首次用户交互后翻转为 true |
| `play(soundName, {loop, volume})` | function | 创建 `new Audio(path)`，应用全局静音/音量，返回 `{stop, fade}` |
| `toggleMute()` | function | 切换 isMuted，持久化 |
| `setGlobalVolume(v)` | function | 设置 globalVolume，volume > 0 时自动取消静音 |
| `enableAudio()` | function | 由 GlobalAudioEnabler 在首次交互时调用 |

### AchievementsContext

**6 个成就：** `corridor_enter`（探索者）、`corridor_explore`（漫游者）、`about_fly`（天空行者）、`studio_interact`（导演）、`gallery_inspect`（艺术评论家）、`contact_choose`（社交达人）

**状态：** `completed`（ID 数组，来自 localStorage `itom_achievements`）、`activePopup`（`{id, status: 'pending'|'completed'|'hiding'}`）

**关键行为：**
- `corridor_enter` 从 localStorage 中过滤掉（每次新访问都显示）
- `completedRef`（useRef）防止高频事件期间重复触发
- PostHog：`posthog.capture('achievement_unlocked', {achievement_id, achievement_title})`
- WebAudio 提示音：振荡器频率扫描 A4→E5（440→659.25Hz），增益包络——已构建但从未触发（`osc.start()` 和 `osc.stop()` 被注释掉）

---

## 废弃与遗留组件

| 组件 | 位置 | 为何废弃 |
|------|------|----------|
| `Door.jsx` | `corridor/Door.jsx` | 被 DoorSection 部分替代 |
| `LoopDoors.jsx` | `corridor/LoopDoors.jsx` | 遗留双门实现 |
| `Corridor.jsx` | `corridor/Corridor.jsx` | 被 CorridorWalls + CorridorSegment 替代 |
| `PaperBackground.jsx` | `background/PaperBackground.jsx` | 未积极使用（App.jsx 改用 color+fog 做背景） |
| `Tunnel.jsx` | `background/Tunnel.jsx` | 未积极使用 |
| `useScrollCamera.js` | `hooks/useScrollCamera.js` | 被 useInfiniteCamera 取代 |
| `useMouseParallax.js` | `hooks/useMouseParallax.js` | 用于 2D DOM 元素，独立于 useInfiniteCamera 的视差 |
| `useParallax.js` | `hooks/useParallax.js` | 通用视差 hook，返回 React state |
| `App.css` | `src/App.css` | Vite 模板遗留（logo-spin keyframes） |
| `index.css` | `src/index.css` | Vite 模板遗留（root color-scheme） |

---

## 已知 Bug 与维护说明

### 已知 Bug

1. **成就提示音静默禁用** — `AchievementsContext.jsx:85-86` — Web Audio 振荡器链已完整构建但从未启动
2. **缺少音频文件** — `Preloader.jsx` 引用 `/sounds/pencil.mp3` 和 `/sounds/tear.mp3` — 两者都不存在于 `/public/sounds/`——静默失败
3. **Contact Room 消息表单未完成** — 整个消息编写流程（PHASE.WRITING、ROLLING、HOLDING、THROWING）被注释掉。`handleMailSelect` 直接重定向到 `mailto:`
4. **LoopDoors.jsx 引用未声明的 `rightDoorRef`** — 仅创建了 `leftDoorRef`。如果组件被渲染会抛出异常（当前未使用）
5. **Audio `fade()` 是 stub** — `AudioManager.jsx:133-137` — 立即暂停而不是逐渐降低音量

### 脆弱模式

1. **魔法数字无集中常量** — `SEGMENT_LENGTH=80` 必须在 `CorridorSegment.jsx` 和 `useInfiniteCamera.js` 之间匹配。`TeleportRoom.jsx` 硬编码了必须匹配门位置的 Z 值（`-6, -20, -36, -50`）
2. **不一致的移动端断点** — `ContactRoom.jsx` 和 `EntranceDoors.jsx` 使用 `window.innerWidth < 1000`，`GlobalOverlay.jsx` 和 `StudioRoom.jsx` 使用 `window.innerWidth < 768`
3. **不一致的动画模式** — AboutRoom 使用原始 `addEventListener` + `useFrame` lerp（无 GSAP）。GalleryRoom 和 StudioRoom 使用 GSAP Observer。ContactRoom 使用自定义 lerp
4. **StudioRoom 双重事件监听器** — 同时添加 `pointerup`/`pointermove` 和 `touchend`/`touchmove`。在触摸设备上两种事件都触发，导致双重执行

### 状态管理风险

1. **传送可能卡住且无恢复** — 如果 PaperTransition ref 未挂载或 `completeTeleport()` 触发但 `pendingDoorClick` 从未 resolve（segment 0 的门未挂载），`isTeleporting` 永久保持 `true`
2. **镜头覆写在失败退出时未释放** — 如果 GSAP 退出时间线从未完成（组件在动画期间卸载、加载期间 ESC），`cameraOverride` 保持 true，永久禁用 scroll/parallax
3. **pendingDoorClick 仅在 segment 0 上工作** — 传送仅自动点击 segment 0 上的门。如果 segment 0 被 `SegmentVisibilityWrapper` 剔除，pending click 静默丢失
4. **重复静音状态** — `audioManager.js` 和 `AudioManager.jsx` 各自维护独立的 `isMuted` 变量

### 内存与资源

1. **SkyChunk 每帧分配** — `SkyChunk.jsx:170-171` 每朵云每帧创建 `new THREE.Euler()` 和 `new THREE.Quaternion()`（~200-300 次分配/帧）
2. **GSAP tweens 在隐藏组件上** — DoorSection 创建许多 GSAP tweens。如果 `SegmentVisibilityWrapper` 在动画期间切换可见性，tweens 不会被 kill（组件隐藏而非卸载）
3. **无显式几何体/材质释放** — `DoorSection.jsx:295` 在 `useMemo` 中创建 `ShapeGeometry` 但从未调用 `.dispose()`

### 构建/部署风险

1. **Sanity 构建时中断会静默剥离所有 SEO** — `seo-plugin.js` 若 Sanity 获取失败返回原始 `index.html` 不变
2. **Cloudflare Worker 依赖** — `getProxyUrl()` 将所有 Sanity CDN URL 重写为 `/sanity-cdn`。如果 Worker 未部署，所有 Sanity 图片断裂
3. **`failIfMajorPerformanceCaveat: true` 在软件 GPU 上完全阻止应用**，无回退或错误消息

### 代码质量问题

1. **超大组件** — `DoorSection.jsx`（1287 行）、`GalleryRoom.jsx`（1366 行）、`InfiniteSkyManager.jsx`（1300+ 行）
2. **深层 props 传递** — `setCameraOverride` 经过 6 个组件层级
3. **死代码** — `useScrollCamera.js`、`useMouseParallax.js`、`useParallax.js`、`Door.jsx`、`LoopDoors.jsx` 未被使用
4. **组件内定义组件** — `CorridorDecorations.jsx` 在父组件内定义 `InspectableFrame`，每次渲染时重新定义
5. **无论是否需要都加载全部三种 Sanity 数据类型** — `loadSanityData()` 获取 projects、studio content 和 awards，即使只需要其中一种

### 无障碍差距

1. 无键盘机制"点击"3D 门 — 通过 ScreenReaderOverlay 传送是进入房间的唯一键盘路径
2. 3D 对象（`<mesh>`）在 Three.js 中无法接收 `aria-label`
3. ScreenReaderOverlay 未覆盖：预加载阶段、成就弹窗、音频面板内容、加载/传送状态
4. ESC 退出房间方便但不可被发现 — 无 UI 提示

---

## 完整的 GSAP 模式目录

### 缓动函数用法

| 缓动 | 主要用例 |
|---|---|
| `power2.out` | 门悬停、笔触揭示、卡片关闭——最常用 |
| `power2.inOut` | 镜头飞行穿越、门打开、卡片滚动 |
| `power2.in` | 门关闭、反向揭示 |
| `power3.inOut` | 纸撕裂分离、卡片最终位置 |
| `power3.out` | 卡片回落到晾衣绳 |
| `power1.inOut` | 卡片翻转旋转 |
| `sine.inOut` / `sine.out` | 卡片缩放动画 |
| `back.out(1.7)` | 墨水溅开缩放、鸭子语音气泡——超调弹性 |
| `'none'` | 快速传送模式（0.01s 时长） |
| `'none'`（TextPlugin） | 打字机效果——匀速 |

### 笔触揭示模式（6+ 组件中重复）

```js
// 悬停进入
gsap.to(materialRef, { uProgress: 1.0, duration: 0.8, ease: 'power2.out', overwrite: true })
// 悬停离开
gsap.to(materialRef, { uProgress: 0.0, duration: 0.5, ease: 'power2.out', overwrite: true })
// Painted 层延迟切换
gsap.delayedCall(0.55, () => { paintedRef.visible = false })
```

### 门悬停模式

```js
gsap.to(doorRef.rotation, { y: ±0.15, duration: 0.3, ease: 'power2.out' })  // 进入
gsap.to(doorRef.rotation, { y: 0, duration: 0.3, ease: 'power2.out' })      // 离开
```

### 镜头飞行穿越模式（DoorSection 入口）

```
阶段 A — 对齐：gsap.to(camera.position + rotationProxy → 门位置，1.0s power2.inOut)
阶段 B — 进入：gsap.to(handle → z:±0.4, 0.15s) || gsap.to(door → y:±PI*0.6, 0.7s)
                  gsap.to(camera.position → 房间内部，1.5s power2.inOut)
```

### Gallery 卡片翻转（最复杂的时间线）

```
gsap.timeline():
  卡片旋转重置 (0.3s)
  → 从衣夹上抬起 (y-0.5, 0.15s) || 旋转 (x:0.5, 0.15s) || 弯曲 (0.8, 0.15s)
  → 上升 (y+1.5, 0.4s) || 翻转 (x:PI*0.8, 0.4s) || 弯曲 (-0.3, 0.4s)
  → 居中 (0.4s) || 最终翻转 (x:PI, 0.4s) || 弯曲 (0, 0.5s)
  → 放大 (1.1, 0.3s)
```

---

## Shader GLSL 技术细节

### 值噪声实现

```glsl
float revealRand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float revealNoise(vec2 p) {
    vec2 ip = floor(p); vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);  // 三次 Hermite smoothstep 近似
    float res = mix(mix(revealRand(ip), revealRand(ip+vec2(1.0,0.0)), u.x),
                    mix(revealRand(ip+vec2(0.0,1.0)), revealRand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res*res;  // 平方输出：更暗的图片，增加对比度
}
```

**两种噪声变体：**
- **变体 A**（RevealMaterial、RevealBasicMaterial、PaintRevealMaterial、PaperMaterial）：使用 `revealRand` + `revealNoise`，输出平方（更暗，更高对比度）
- **变体 B**（仅 `usePaintMaterial.js`）：使用 `paintHash` + `paintNoise`——不同哈希种子（78.233 vs 4.1414），不平方输出（更柔和，更均匀）

### 湿油漆发光效果（3 个文件中相同公式）

```glsl
if (uPaintProgress < 0.999 && pBoundary < 2.0) {
    float pGlow = smoothstep(2.0, 0.0, pBoundary);
    gl_FragColor.rgb += vec3(pGlow * 0.4, pGlow * 0.5, pGlow * 0.7);
}
```

### Paint 过渡配置 per Room

| Room | dirX | dirY | dirZ | noiseAxes |
|------|------|------|------|-----------|
| Gallery | -1.0 | 0.0 | 0.1 | yz |
| Studio | 0.0 | -1.0 | 0.0 | xz |
| Contact | 1.0 | 0.0 | -0.1 | yz |

### alphaTest 层级

| alphaTest | 目的 | 使用位置 |
|-----------|------|----------|
| 0.01 | 仅移除近乎透明的像素 | 砖纹理 |
| 0.05 | 非常保守的 alpha 切割 | 卡片上的 "OPEN PROJECT" 按钮 |
| 0.1 | 标准素描纹理 alpha 切割 | 素描门、栏杆、房屋、天际线、鸟、箭头 |
| 0.5 | 涂色纹理的激进 alpha 切割 | Painted 层（在 sketch 后面）、把手、云 |

### onBeforeCompile 注入顺序

`#include <dithering_fragment>` 是 Three.js 在 `gl_FragColor` 写入之前的最后一个 include。在其后注入确保：所有标准 Three.js 光照/map/颜色计算先完成，为低精度渲染目标应用抖动，然后 paint 过渡作为最终步骤运行，覆盖所有内容。

---

## 性能优化技术

### 热路径中的内存/GC 避免

**模块级预分配 Vector3/Euler/Quaternion 常量：**

| 文件 | 常量 | 用法 |
|------|------|------|
| `CorridorDecorations.jsx:21-26` | `tempPos`、`tempRot`、`tempScale`、`tempCamDir`、`tempEuler`、`tempQuat` | `useFrame` 镜头计算 |
| `GalleryRoom.jsx:17-18` | `_tempScale` | 60fps 按钮悬停 `scale.lerp()` |
| `SocialBarrel.jsx:9-10` | `_tempScale` | 60fps 桶悬停 `scale.lerp()` |
| `InfiniteSkyManager.jsx:13` | `_tempVec3` | 指针处理中的 `getWorldPosition()` |

**每帧状态使用 Refs：** StudioRoom（`dragDistance`、`particleTowerRotation`、`particleFallOffset`）、useInfiniteCamera（`targetZ`、`currentZ`、`parallax`、`glanceOffset`）、InfiniteSkyManager（`revealFactorRef`、`spreadFactorRef`、`timeRef`）

**已知 GC 违规：** `SkyChunk.jsx:170-171` 每朵云每帧创建 `new THREE.Euler()` 和 `new THREE.Quaternion()`（~200-300 次分配/帧）——已知优化机会

### 直接 DOM/Ref 操作绕过 React

| 文件 | 操作 | 技术 |
|------|------|------|
| `Preloader.jsx:279-280` | 百分比文本 | `textLeftRef.current.innerText` — 直接 DOM |
| `Preloader.jsx:281-282` | SVG stroke dashoffset | `pathLeftRef.current.style.strokeDashoffset` |
| `StudioRoom.jsx:536-540` | 显示器 Y 位置 | `monitorRefs.current[index].position.y = ...` 在 useFrame 中 — 绕过 React for 48+ monitors |

### 可见性与视锥体剔除

- **SegmentVisibilityWrapper** — 基于镜头 Z 切换 `group.visible`。隐藏镜头后 >5 单位或前 >30 单位的段
- **硬 Z 裁剪** — CorridorWalls 的 `zClip` 参数、SkyChunk 的 `CORRIDOR_CLIP_Z = -8.0`
- **手动世界 Z 计算**（非 `getWorldPosition()`）— InfiniteSkyManager 使用 `scrollProgress * CHUNK_LENGTH + chunkLocalZ`——"不使用 getWorldPosition() 因为子 useFrame 在父之前触发"

---

## 几何体技术

### TornPaperGeometry

`TornPaperGeometry.js` — 撕边纸自定义 `BufferGeometry`：
1. 从 `PlaneGeometry(width, height, segmentsX, segmentsY)` 开始
2. 确定性 PRNG（seed=12345 的正弦哈希）实现一致的撕裂模式
3. 每条边缘顶点：`(seededRandom(i) - 0.5) * tearIntensity`
4. 左边缘乘数 = 2.5×（笔记本撕裂效果）
5. 微 Z 位移（最高 0.01）实现 3D 卷曲
6. 全局扭曲：所有顶点上的 `Math.sin(x * 3) * Math.cos(y * 2) * 0.015`

### 走廊锯齿墙生成

`CorridorWalls.jsx` 中的 `generateWallSegments()`：
1. 外侧边缘直线填充段（`baseX = ±3.5`）
2. 从 `baseX` 到 `innerX = ±1.7` 的倾斜门段，跨 `DOOR_Z_SPAN = 4` 单位
3. 连接段回到外边缘
4. 左墙角度：`atan2(1.8, -4)` ≈ 155°；右墙：`atan2(-1.8, -4) + PI` ≈ 25°
5. Z 裁剪参数用于入口阶段重叠防止

### DoorSection ShapeGeometry with Hole

`DoorSection.jsx:268` — `new THREE.ShapeGeometry(wallShape)` 其中 `wallShape.holes.push(holePath)` 在单一几何体中创建带矩形门孔的墙平面，避免重叠 mesh 和 z-fighting

### PaperAirplane 手工构建 BufferGeometry

`PaperAirplane.jsx` — 12 个顶点在 3D 中手动定位（机头、翼尖、中心折痕、尾翼），25 个三角形索引覆盖顶部/底部/侧面，`Float32Array` 中的 `BufferAttribute`，`computeVertexNormals()` 实现平滑边缘，额外的 `Line` 对象用于顶部脊线（被 `Edges` threshold=15 遗漏）

---

## 数据与 API 模式

### Sanity Client 配置

`src/config/sanity.js`：项目 `kv5wjjmj`，数据集 `production`，CDN 模式（`useCdn: true`），API 版本 `2024-03-01`

### Sanity Schemas

- **galleryProject**：title、slug、url、seoTitle、seoDescription、description、frontImage（image+hotspot）、paintedImage（image+hotspot）、techStack（10 个预定义选项数组：React/HTML/CSS/JS/Tailwind/Firebase/Netlify/WordPress/Elementor/PHP）
- **studioItem**：title、device（'phone'|'tv'|'monitor'）、platform（'youtube'|'tiktok'|'instagram'|'x'|'linkedin'|'codrops'|'blog'）、description、url、seoTitle、seoDescription、frontTexture、paintedFrontTexture、date、条件字段（views/likes/duration/readTime 基于 platform）
- **awardCertificate**：title、category（'sotd'|'sotm'|'other'）、seoTitle、seoDescription、certificateImage、date、url
- **globalInfo**：单例文档。siteTitle、siteDescription、aboutMe、githubUrl、linkedinUrl、xUrl、instagramUrl、tiktokUrl、youtubeUrl
- **faq**：question、answer

### 数据加载模式

`src/hooks/useSanityData.js` —— **模块级缓存** + **pub/sub 模式**：`cache = {projects, content, awards, loading, loaded, error}`、`listeners = new Set()`、用于去重的 `fetchPromise`。`loadSanityData()` 在模块级别和 App.jsx useEffect 中自动触发。3 个订阅 hooks：`useGalleryProjects()`、`useStudioContent()`、`useAwards()`

### 硬编码回退数据

- **contentData.js**（Studio）：27 条内容（8 YouTube + 8 blog + 11 TikTok）。`PLATFORM_CONFIG` 将 platform 映射到 color/icon/shape。`CONTENT_DATA` 为 null 条目分配回退纹理
- **InfiniteSkyManager.jsx**（奖项）：当 Sanity 返回空数组时的硬编码证书数据

---

## localStorage 键

| 键 | 形状 | Context |
|---|---|---|
| `audio_muted` | `'true'` \| `'false'` | AudioManager + audioManager.js |
| `audio_volume` | float 0..1 字符串 | AudioManager |
| `itom_achievements` | ID 的 JSON 数组 | AchievementsContext（排除 `corridor_enter`） |

---

## 字体系统

- **Google Fonts**：Caveat、Gloria Hallelujah、Inter（在 index.html 中加载）
- **本地 @font-face**（在 GlobalOverlay.scss 中）：CabinSketch Bold/Regular、Fredericka the Great、Rubik Scribble
- **内联字体预加载**（App.jsx）：来自 gstatic 的 Inter woff2
- 所有本地字体为 TTF 格式，位于 `/public/fonts/`

---

## 撕纸美学

跨多个图层实现的决定性视觉特征：
1. **clip-path 多边形**：预加载器两半、按钮、卡片、面板上的 50+ 顶点锯齿边缘
2. **纸纹理背景**：`::before` 伪元素上的 `url('/textures/paper-texture.webp')`
3. **内联 SVG 边框**：硬编码 SVG data URI 在 `::after` 伪元素上，用黑色描边描摹 clip-path
4. **程序化撕裂生成**：预加载器和 PaperTransition 使用种子的 12 段随机路径
5. **3D 撕裂几何体**（`TornPaperGeometry.js`）：顶点位移 `PlaneGeometry`（2.5× 左边缘撕裂，微妙扭曲）
6. **CSS `mix-blend-mode: multiply`**：纸上的文字看起来像纸上的墨水（预加载器百分比文本）

---

## 响应式断点

- 移动端：≤767px，平板：768-1023px，桌面：≥1024px，宽屏：≥1440px
- 硬编码 `@media (max-width: 768px)` 和 `(max-width: 480px)` 也用于组件 SCSS
- 不一致：`window.innerWidth < 1000` vs `< 768` 跨不同组件

---

## React 模式

### Null 渲染 Effect 组件

两个组件返回 `null` 仅用于运行 effects：
- **DocumentMetaBridge**（`App.jsx:116-131`）：调用 `useDocumentMeta()` hook，处理 300ms 延迟的深度链接自动传送。必须在 SceneProvider 内但在 Canvas 外
- **GlobalAudioEnabler**（`App.jsx:81-95`）：在首次用户交互时添加一次性 click/touch/keydown 监听器（`{once: true}`）以解锁 Web Audio API

### React.memo + forwardRef 组合

`GalleryRoom.jsx:690` — `ProjectCard = memo(forwardRef(...))` 是罕见模式。卡片在循环中渲染 10×；每张接收频繁变化的 props（`isSelected`、`paintProgress`、`isTransitioning`）。memo 防止 1 张卡片变化时 9 张未选中卡片重渲染

### useFrame 中的过期闭包预防

useFrame 内部读取的来自 props 或 state 的所有值都镜像在 refs 中：
```js
const scrollEnabledRef = useRef(scrollEnabled);
useLayoutEffect(() => { scrollEnabledRef.current = scrollEnabled; }, [scrollEnabled]);
```

### useEffect 清理模式

每个 GSAP timeline/Observer、每个 `addEventListener`、每个 `setTimeout`/`setInterval`、每个 `requestAnimationFrame` 在 useEffect 返回函数中都有对应的清理

### useLayoutEffect 用于同步 GSAP 清理

`useInfiniteCamera.js:70` — 使用 `useLayoutEffect`（非 `useEffect`）在浏览器绘制前调用 `gsap.killTweensOf(camera.position)`。如果使用 `useEffect`，会有一帧 GSAP 和 hook 同时争夺镜头控制——导致可见闪烁

### 条件渲染作为内存管理

- `{!hasEntered && <EntranceDoors />}` — 入口组件在进入后卸载，释放 GPU 内存
- `{isLoaded && (<NavigationUI />)}` — UI 在预加载器完成前隐藏
- `{showRoom && <RoomComponent />}` — 房间仅在相机对齐时懒挂载

---

## 三次深度分析总结

### 第一次分析：架构概览
- 映射了完整的文件结构和组件树
- 识别了 Context 依赖图
- 记录了用户旅程和初始化序列

### 第二次分析：性能与模式
- 发现了 8 个性能优化（预分配常量、ref 用于每帧状态、直接 DOM 操作）
- 编目了所有 shader 变体及其使用位置
- 记录了房间组件契约和不同交互模式背后的原因
- 发现了 AboutRoom 与其他房间的根本差异（无 GSAP、动量滚动）

### 第三次分析：设计理由
- 提取了 10 条核心设计哲学
- 为每个重大架构决策记录了"为什么"（R3F over vanilla Three.js、GSAP over alternatives、Context over Redux）
- 识别了 5 个已知 bug 和 4 个状态管理风险
- 创建了完整的 shader 技术参考（噪声变体、发光公式、onBeforeCompile 注入点）
- 记录了传送状态机的完整分布式编排

---

*此文档由原始 `CLAUDE.md` 的精简过程生成。最后更新：2026-08-06。*
