# CLAUDE.md

Codebase guidance for Claude Code. **These are the rules — follow them.**

---

## 开发规范

### Git 规范
- **一个任务一个 Commit**——不混合无关修改
- Commit message 使用约定式提交格式（`feat:`、`fix:`、`chore:`、`docs:`、`refactor:`）
- Push 前确保当前分支可正常构建

### 架构原则
- **优先保持 ITom 原始架构**——原项目经过精心设计，每个模块都有其存在理由。重构时先理解设计意图，再决定是否改动
- **不允许一次修改多个模块**——修改前先确认影响范围。涉及跨模块时，先审查所有消费者再动手

### 开发流程
1. 阅读 `MY_PROJECT_SPEC.md` 确认当前阶段和任务
2. 阅读本文件了解架构约束
3. 单文件修改直接进行；多文件修改先规划再执行
4. 修改后验证 `npm run build` 通过

---

## 项目状态

| 里程碑 | 状态 |
|--------|------|
| ITom 项目分析 | ✅ 已完成三轮深度分析（详见 `ITOM_ANALYSIS.md`） |
| MY_PROJECT_SPEC.md | ✅ 已建立重构规格文档 |
| 代码迁移 | ✅ 已迁移到 menglan_world |
| GitHub 迁移 | ✅ 已迁移到 `huang20211022-eng/menglan_world` |
| 网站 Branding | 🔄 进行中——参见 `REPLACE_CHECKLIST.md` |
| 架构重构 | 🔄 进行中——按 `MY_PROJECT_SPEC.md` 执行 |

**当前重构目标（阶段 1）：**
- 确立 `Experience` 为场景唯一入口
- `CameraContext` 统一镜头控制（替代分散的 camera override 模式）
- `PerformanceContext` 统一性能分级
- `AnimationManager` 作为 GSAP 统一入口
- 所有 Shader 迁移到 `src/shaders/`

---

## 项目概览

交互式 3D WebGL 作品集 —— 手绘风格无限走廊 + 4 个沉浸式房间。

**技术栈：** Vite + React 19 + React Three Fiber 9.4 + Three.js 0.182 + GSAP 3.14 + Sanity v3 CMS

**两个 npm 项目：**
- **Root** (`/`): 主应用 —— `npm run dev` → `localhost:5173`
- **Sanity Studio** (`/portfolio-itom/`): CMS —— project `kv5wjjmj`，dataset `production`

```bash
npm run dev          # Vite dev → localhost:5173
npm run build        # 生产构建（含 SEO 插件 + gzip）
npm run lint         # ESLint flat config
cd portfolio-itom && npm run dev   # Sanity Studio
```

---

## Three.js 架构

```
React Three Fiber (R3F)
  └── <Experience>          ← 唯一 3D 场景入口
        ├── CameraContext    ← 统一镜头控制
        └── PerformanceContext ← 统一性能分级
```

### 设计理由

**为什么是 R3F 而不是原生 Three.js：** 这个项目本质上是一个复杂的状态机（4 个交互房间 + 无限走廊 + 传送系统），完美契合 React 的声明式模型。`Experience.jsx` 根据 `hasEntered` 条件渲染入口/走廊/房间，React 的 reconciliation 自动处理 3D 对象的生命周期——无需手动 `scene.add()` / `scene.remove()`。自定义 Shader 通过 `extend()` 注册为 JSX 标签使用，`uProgress` 作为 GSAP-animatable 属性直接驱动——纯 React + R3F 的优势。

**为什么不拆分 Canvas：** 整个体验是一个连续的空间——从入口穿过走廊进入房间，镜头是连续的。单 Canvas 保证 WebGL 上下文一致，避免多 Canvas 间的上下文切换开销。DOM overlay（导航 UI、预加载器、过渡动画）通过 CSS `z-index` 分层，与 WebGL 渲染管线完全独立。

**规则：**
- `Experience.jsx` 是场景唯一入口，所有 3D 内容必须在其子树内
- `CameraContext` 拥有镜头所有权——组件不得直接读写 `camera.position` / `camera.rotation`
- `PerformanceContext` 决定 dpr / shadows / antialias / 粒子数

---

## GSAP 动画架构

```
AnimationManager            ← 统一动画入口（唯一允许创建 Timeline 的模块）
  ├── timeline.add()        ← 组件通过 AnimationManager 获取动画槽位
  └── onComplete hooks      ← 动画完成回调统一在此注册
```

### 设计理由

**为什么选择 GSAP 而不是 CSS Animation / React Spring / Framer Motion：**
- CSS 无法动画 Three.js 对象（camera、3D mesh、shader uniforms）
- React Spring / Framer Motion 缺少：`delayedCall`（定时清理）、`killTweensOf()`（取消飞行中的动画——对镜头切换至关重要）、Timeline API 的精确位置偏移（`'<'`、`'-=0.5'`）
- GSAP 可以直接 tween 任意 JS 对象（包括 shader material 的 `uProgress` getter/setter）

**为什么需要 AnimationManager：** 原项目中 GSAP 调用分散在 17 个文件中（124+ 处），存在几个问题：
1. 镜头所有权竞争——DoorSection 和 useInfiniteCamera 通过 `setCameraOverride` 协商，但缺乏统一仲裁
2. Hover 动画竞态——依赖各处手动添加 `overwrite: true`，容易遗漏
3. 传送期间的多组件协调——PaperTransition、TeleportRoom、DoorSection 各自 watch SceneContext 的 phase flag，耦合在状态上而非动画层

AnimationManager 统一解决：创建/销毁 Timeline、镜头动画仲裁、shader uniform 动画、DOM 过渡动画。

**规则：**
- **禁止**组件直接 `gsap.to()` / `gsap.timeline()` / `gsap.fromTo()`
- 所有 GSAP 调用必须经过 `AnimationManager`
- `overwrite` / `killTweensOf` 由 AnimationManager 统一处理

**关键动画模式（保留）：**
- **uProgress getter/setter**：`gsap.to(materialRef, { uProgress: 1.0, duration: 0.8, ease: 'power2.out' })` 驱动笔刷揭示——setter 直接写 GPU uniform，零 React 重渲染
- **双层 mesh 堆叠**：painted 层（初始隐藏，`depthWrite=false`）在 sketch 层之后——`uProgress` 增加时 sketch 像素被 GLSL noise 丢弃，露出 painted 纹理
- **旋转代理对象**：`gsap.to({y: startY}, { y: targetY, onUpdate: () => { camera.rotation.y = proxy.y } })` ——避免 Euler 万向节锁，补偿父级旋转
- **250ms 延迟模式**：镜头飞行动画完成后等 250ms 再调用 `enterRoom()`——让 GSAP 动画循环在 React reconciliation 之前优雅完成，防止帧卡顿
- **快速传送模式**：所有 duration → 0.01s，`ease: 'none'`——在 paper overlay 关闭期间执行，用户看不到中间状态

---

## Shader 系统

```
src/shaders/                ← 所有 Shader 统一放这里
  ├── RevealMaterial.jsx    ← DISCARD 策略（双层 mesh）
  ├── RevealBasicMaterial.jsx ← DISCARD 策略（简化版，无 paint）
  ├── PaintRevealMaterial.jsx ← BLEND 策略（单 mesh 纹理混合）
  ├── PaperMaterial.jsx     ← forwardRef + onBeforeCompile（Gallery 卡片）
  └── usePaintMaterial.js   ← Hook：注入任意 MeshBasicMaterial
```

### 设计理由

**为什么扩展 MeshBasicMaterial 而不是使用 ShaderMaterial：** 这是整个渲染管线最关键的决策。通过扩展 `MeshBasicMaterial`，代码保留了 Three.js 内部的完整材质管线（颜色管理、纹理采样、雾效、抖动），仅在目标注入点通过 `onBeforeCompile` 注入自定义 GLSL（~30 行/材质）。如果使用原始 `ShaderMaterial`，每次 Three.js 内部 shader 结构更新都会导致破坏性变更。基于补丁的注入是向前兼容的。

**为什么值噪声而不是 Perlin/Simplex：** ~10× 更快/像素（无梯度向量查找），~10 行 GLSL vs ~60 行，值噪声的块状感在美学上读作笔触粗糙度——Perlin 平滑的梯度看起来会不自然。

**为什么 `customProgramCacheKey()` 返回不同字符串：** Three.js 按材质类型 + 启用的功能缓存编译后的 `WebGLProgram`。RevealMaterial 可以编译为两种结构不同的程序（有/无 paint uniform）。不同的缓存键强制分离程序编译——没有它，一个实例编译的程序会缺少另一个实例需要的 uniform。

**为什么是三层独立 Shader 类而不是一个可配置类：**

| Material | 策略 | Paint | 原因 |
|----------|------|-------|------|
| RevealMaterial | DISCARD | 可选 | 最复杂的——可选 paint 会产生不同的 shader 程序 |
| RevealBasicMaterial | DISCARD | 无 | 更简单，更少 GPU 周期——用于不需要 paint 的 About room 元素 |
| PaintRevealMaterial | BLEND | 自身 | 完全不同的渲染策略——单 mesh 而不是双层 |

**为什么 `usePaintMaterial` 是 Hook 而不是另一个 Material 类：** 它是编排层——拥有驱动 paint sweep 的 GSAP tween（React 生命周期关注点），通过 `getWorldPosition()` 追踪 room origin（需要 React refs），向房间中所有 mesh 广播共享的 `uniformsData`（一次 sweep，多个 material），并且不绑定基类（适用于任何 material，不仅仅是 RevealMaterial）。

### 修改规则

修改 Shader 时必须**同步检查三个层级**：

| 层级 | 检查内容 |
|------|----------|
| **Materials** | 扩展的基类、`customProgramCacheKey()` 返回值 |
| **Uniforms** | 声明、默认值、JS 侧 getter/setter 签名 |
| **onBeforeCompile** | GLSL 注入位置：`#include <common>`（noise 函数）、`<alphatest_fragment>`（UV discard）、`<dithering_fragment>`（paint discard + glow） |

**Paint 方向（从门侧扫入）：**
- Gallery `(-1, 0, 0)` — 左侧门，向右展开
- Studio `(0, -1, 0)` — 顶部向下（幕布升起感）
- Contact `(1, 0, 0)` — 右侧门，向左展开（Gallery 的镜像）

**湿油漆发光效果**（3 个文件中相同的公式）：仅在 `uPaintProgress < 0.999` 时激活，边界 2.0 单位内的蓝白色 RGB 提升——让油漆感觉"活着"而不是静态遮罩。

---

## Context 架构

4 个 Context Provider，按依赖关系嵌套：

```
<PerformanceProvider>         ← 最外层——配置 Canvas，无依赖
  <AchievementsProvider>      ← 依赖 AudioProvider（解锁时播放提示音）
    <AudioProvider>           ← 纯浏览器 API，无 Context 依赖
      <SceneProvider>         ← 最内层——包裹 Canvas，无 Context 依赖
```

**为什么是 4 个分离的 Provider 而不是合并：**
1. **不同的消费者域**——SceneContext 消费者在 Canvas 内（使用 `useThree()`），AchievementsContext 消费者完全在 DOM 层——合并会强制 DOM 消费者进入 Canvas 的 React 子树（物理上不可能）
2. **不同的变化频率**——SceneContext 每个 session 重渲染数十次，PerformanceContext 挂载后零次——合并意味着每次进入房间都会不必要地重渲染音频滑块和成就面板
3. **PerformanceContext 必须在 Canvas 外**——在 WebGL 上下文创建之前配置 `dpr` / `shadows` / `antialias`

**为什么是 React Context 而不是 Redux/Zustand：** 状态图较浅（~20 个消费者），4 个 Provider 干净嵌套无循环依赖。GSAP 处理真正复杂的状态（动画）。React Context 只存储**决策**（哪个房间？正在传送？），不存储**连续值**（镜头位置、滚动位置——这些在 `useRef` 中）。

---

## 房间架构

4 个房间共享统一组件契约：

```jsx
<RoomComponent
  showRoom={boolean}    // 镜头已进入房间
  onReady={callback}    // GPU 资源就绪回调
  isExiting={boolean}   // 退出动画进行中——立即停止所有镜头操作
  isWarmup={boolean}    // 预热模式（Y=-500）——跳过音频和交互
/>
```

### 设计理由

**为什么是 `onReady`（帧计数）而不是 `useEffect` 或 `Suspense`：**
`useEffect` 在 React commit 后触发。Suspense 在异步 import 后 resolve。两者都不保证 GPU 工作完成——shader 编译是异步的，纹理上传是排队的，前几帧可能不完整。帧计数（5-25 帧）确保多个完整的渲染周期已执行后再发出就绪信号。

**为什么每个房间有不同的 `enterDistance`：**
About 需要 25 单位将用户置于活跃飞行区域并留出加速空间。其他房间标准 8 单位（2m 玄关 + 6m 入口）将镜头置于舒适的起始距离。

**为什么 About Room 不用 GSAP：**
About 使用动量滚动（`scrollVelocity` 累积 + 摩擦衰减 ×0.95/帧）——飞行感需要连续的无限制运动。GSAP 的补间模型（有固定持续时间的有限动画）与此根本冲突。Gallery 和 Studio 使用 GSAP Observer 是因为它们有离散的"吸附到卡片"行为。

| 房间 | 概念 | 交互模式 | 音频 |
|------|------|----------|------|
| **Gallery** | 晾衣绳卡片 + 天际线 | GSAP Observer、卡片翻转、CatmullRomCurve3 吸附 | `szummiasta.mp3` |
| **Studio** | 无限显示器塔（48+） | 拖拽旋转 + 滚动控速、点击 → Overlay | `szummonitorow.mp3` |
| **About** | 天空飞行 + 里程碑 | 动量滚动（无 GSAP）、纸飞机、技能气球 | `szumwiatru.mp3` |
| **Contact** | 码头 + 海浪 + 社交桶 | 4 层海浪、MessagePaper 表单 | `szummorza.mp3` |

### RoomWarmup 预编译策略

在预加载期间，4 个房间全部挂载在 Y=-500（远离镜头视锥体）。渲染 3 帧（LOW tier 上 1 帧）以触发所有 `onBeforeCompile` 回调，然后调用 `gl.compileAsync(scene, camera)`。这消除了首次进入房间时的 shader 编译卡顿——WebGL 应用中最主要的帧掉落来源。LOW tier 设备完全跳过热身以防止 WebGL 上下文丢失。

LOW tier 上强制关闭视锥体剔除（前 25 帧遍历所有 mesh 设置 `frustumCulled = false`）——确保无论可见性如何都编译 shader。AboutRoom 的 `FRAMES_TO_WAIT = 25` 是最高的（最复杂的几何体：InfiniteSkyManager + SkyChunks + milestones）。

---

## 镜头系统设计

### 走廊镜头（`useInfiniteCamera.js`）

自定义 hook（非 drei controls）——走廊恰好有**一个自由度**：Z 轴移动。没有现成的 drei control 匹配此约束。

**输入融合（每帧确定的更新顺序）：**
1. Scroll Z —— GSAP Observer 统一 wheel + touch + pointer → `targetZ` → lerp (0.035)
2. Parallax X/Y —— 鼠标位置映射到镜头偏移。移动端使用 DeviceOrientation 陀螺仪（iOS 13+ 权限流程）
3. Auto-glance —— 基于距离的镜头 Y 轴旋转朝向最近的门（START_DIST=15, PEAK_DIST=8）。非对称 lerp：缓慢进入 (0.03)，快速释放 (0.08)
4. Swipe glance（移动端）——水平触摸 delta 映射到 glance

```js
// Per-frame 镜头位置公式
camera.position.z = currentZ
camera.position.x = parallax.x
camera.position.y = 0.2 + parallax.y
camera.lookAt(
  parallax.x * 0.3 + glanceOffset * 3 + swipeGlance * 4,  // lookX
  0.13 + parallax.y,                                        // lookY
  currentZ - 10                                             // lookZ (向前看)
)
```

**为什么需要镜头覆写系统：** 当 DoorSection 播放门进入动画时，它通过 `setCameraOverride(true)` 锁定 `useInfiniteCamera`。这防止 hook 的 lerp 计算与 GSAP 的补间争夺镜头。释放时 (`false`)，执行 ~60 行同步：读取当前物理镜头位置、重新计算走廊段、导出当前 glance 值、初始化所有内部 ref 以匹配实际值。然后开始 30 帧混合插值（~0.5s @ 60fps）以平滑过渡到理想值——没有这个，镜头会瞬间跳回走廊朝向。

### TeleportRoom

独立组件执行即时镜头重定位——与 useInfiniteCamera 的连续每帧插值根本不同。保持其分离意味着 useInfiniteCamera 不知道传送的存在（清晰的关注点分离），并且传送逻辑不会向每个 `useFrame` 调用添加条件分支。

---

## 传送系统设计

一个**分布式状态机**，由 SceneContext 协调，由三个独立组件执行：

```
teleportTo(roomId)
  → phase: 'closing'  → PaperTransition 关闭（paper 两半滑入，0.8s power2.inOut）
  → phase: 'teleporting' → TeleportRoom 设置镜头到 doorZ + 8，重置旋转
  → completeTeleport() → 设置 pendingDoorClick，立即开门（快速模式）
  → DoorSection.handleClick(isTeleport: true) → 超快动画（0.01s 时长）
  → signalRoomReady() → phase: 'opening' → PaperTransition 打开（paper 撕开，1.2s power3.inOut）
```

**为什么三个组件而不是一个单一的 TeleportManager：** 每个组件处理根本不同的渲染域——PaperTransition（DOM：CSS clip-path 多边形 + GSAP）、TeleportRoom（R3F：即时镜头重定位）、DoorSection（R3F：门点击动画序列）。如果合并为一个组件，就需要同时管理 DOM 动画和 WebGL 镜头变换，交叉两个渲染管线。

**为什么基于 SceneContext 的协调而不是事件：** `teleportPhase` 状态（`'closing'` → `'teleporting'` → `'opening'` → `null`）充当每个组件独立监听的**时钟信号**。这比自定义事件更健壮：该阶段是单一事实来源，React 的渲染保证所有组件在同一帧看到同一阶段，并且无需手动事件监听器清理。

**为什么快速 vs 慢速传送：** 从地图面板，用户点击房间 → paper 关闭 → 镜头传送 → 门打开 → paper 打开。Paper 关闭期间遮盖即时重定位。所有中间动画以 0.01s 运行（paper 已关闭——用户看不到它们）。DoorSection 检查 `isFastTeleport` 并缩短：对齐时长、门打开时长和飞行时长。当通过 ESC 退出时，完整的 1.0-1.5s 动画播放，因为用户正在观看。

**传送可能卡住且无恢复机制：** 如果 PaperTransition ref 未挂载或 `pendingDoorClick` 从未 resolve（segment 0 的门未挂载），`isTeleporting` 永久保持 `true`。`cancelTeleport()` 存在但从未在任何地方调用。这是一个已知风险。

---

## 入口与初始化流程

```
阶段 1: main.jsx
  → ReactDOM.createRoot 渲染 <App /> 在 <StrictMode> 中

阶段 2: App.jsx 模块级（JS 解析期间执行——React 挂载前的最早时刻）
  → PostHog 初始化
  → 设备检测（6 个布尔标志）
  → 纹理预加载：LOW_END → 仅 CORE_TEXTURES；HIGH_END → PRELOAD_ALL + PRELOAD_LOADER
  → filterTexturesByDevice() 在触摸设备上过滤 _painted 变体
  → Experience 组件：lazy(() => import('./components/canvas/Experience'))

阶段 3: App.jsx 渲染树
  → PerformanceProvider → AchievementsProvider → AppContent
  → AudioProvider → SceneProvider
  → DocumentMetaBridge（useDocumentMeta 运行，深度链接检查）
  → GlobalAudioEnabler（首次用户交互时启用音频）
  → Canvas（依赖 tier 的 dpr/antialias/shadows/powerPreference）
  → PerformanceMonitor（FPS 下降时降级——3 次翻转 → downgradeTier）
  → Suspense → Experience（lazy）
  → Preload all（drei）

阶段 4: Experience.jsx 挂载
  → useInfiniteCamera：scroll/parallax 禁用（hasEntered=false）
  → RoomWarmup：全部 4 个房间在 Y=-500（屏幕外）
  → EmptyCorridor + EntranceDoors + SignSystem（入口场景）
  → InfiniteCorridorManager（segments [0,1]，隐藏 segment -1 的门）

阶段 5: Sanity 数据加载（并行）
  → 3 个并行 GROQ 查询（galleryProject、studioItem、awardCertificate）
  → 图片通过 urlFor() → getProxyUrl()（CDN 重写）映射
  → 预加载结果纹理 URL → 发布给监听者 → cache.loaded = true

阶段 6: 场景就绪 → Preloader 完成
  → RoomWarmup 检测到 Sanity 数据已加载 → 渲染 3 帧
  → 调用 gl.compileAsync(scene, camera) 进行 shader 预编译
  → onWarmupComplete → setSceneReady(true)
  → Preloader 播放退出动画 → setIsLoaded(true)

阶段 7: 用户交互
  → 点击入口门 → GSAP 飞行穿越 → markEntered()
  → hasEntered=true：scroll/parallax 启用，入口卸载，教程开始
  → 深度链接自动传送触发（如适用，300ms 延迟）
```

---

## 纹理预加载策略

### 为什么是模块级预加载（import 时）而不是组件级

```javascript
// App.jsx —— 模块作用域，JS 解析期间执行
if (isLowEnd) {
  filteredCore.forEach(path => useTexture.preload(path));
} else {
  filteredAll.forEach(path => useTexture.preload(path));
  filteredLoader.forEach(path => useLoader.preload(TextureLoader, path));
}
```

这在**脚本评估期间**执行——JS bundle 解析后的最早可能时刻。到 React 创建第一个 DOM 节点时（~100ms 后），许多纹理已经中途传输或已送达。优先级：JS 解析 → 纹理 HTTP 请求触发 → React 创建 root → Canvas 渲染 → 纹理已缓存。如果没有这个，waterfall 会将整个 React 引导延迟加到加载时间上。

### 为什么分离 PRELOAD_ALL（useTexture）vs PRELOAD_LOADER（useLoader）

这些使用**不同的内部缓存**。`useTexture.preload()` 放入 Drei 的全局缓存。`useLoader.preload(TextureLoader, path)` 放入 Three.js 的 DefaultLoadingManager。用错误的方法预加载意味着组件会错过缓存并进行重复的网络请求。分离确保缓存对齐：ABOUT 和 STUDIO 房间使用 `useLoader(TextureLoader)`（用于显式编码控制），所以它们通过 `useLoader.preload` 预加载。

### 为什么按设备过滤纹理

触摸设备无法触发基于 hover 的 paint reveal。在移动端加载 `_painted` 纹理浪费 ~40MB 带宽并有 GPU 内存耗尽风险（对移动 GPU 的有限 VRAM 尤其关键）。过滤器是模块评估时的 `(hover: hover)` 媒体查询二进制检查。在触摸设备上，painted 纹理被替换为 1×1 透明 GIF（~150 字节 data URI）。

---

## 虚拟路由设计

使用 History API（非 react-router）进行虚拟路由。5 条路由：

| 路径 | 房间 | 标题 |
|------|------|------|
| `/` | `null`（走廊） | Menglan World |
| `/about` | `about` | About — Menglan World |
| `/gallery` | `gallery` | Gallery — Menglan World |
| `/studio` | `studio` | Studio — Menglan World |
| `/contact` | `contact` | Contact — Menglan World |

**工作原理：**
1. `getInitialRoomFromUrl()` ——启动时解析 `window.location.pathname`，返回房间 ID
2. 房间变化时 → 更新 `document.title`、`<meta description>`、OG 标签、`<link canonical>` → `history.replaceState`（首次加载）或 `history.pushState`
3. popstate（后退/前进）→ 读取 `event.state?.room`，如果用户已进入则调用 `teleportTo(targetRoom)`
4. `DocumentMetaBridge` ——在 `sceneReady && hasEntered && !deeplinkHandled` 之后，300ms 延迟后自动传送到 `initialRoom`
5. SPA fallback：`public/_redirects` —— `/* /index.html 200` ——为所有路径提供 index.html

**为什么不用 react-router-dom：** 一个只有 6 条虚拟路由的单页体验不需要 ~12KB gzipped 的路由器。`useDocumentMeta.js` 直接使用 History API（`pushState`/`replaceState`），提供可深度链接的 URL（`/gallery`、`/about`）而无需页面重载。

---

## 三层状态分类

所有状态根据变化频率分为三层。这对性能至关重要：

| 类别 | 机制 | 变化频率 | 消费者 | 示例 |
|------|------|----------|--------|------|
| 应用状态（影响 React UI） | Context（`useState` + Provider） | 低（用户交互） | 多个组件条件渲染 | `currentRoom`、`hasEntered` |
| 动画状态（每帧） | `useRef`（可变） | 高（60fps `useFrame`） | 内部 hook | `targetZ`、`parallax`、`glanceOffset` |
| 全局单例 | 模块级 `let`/`const` | 可变（生命周期 = 页面加载） | 任何导入模块 | BGM 音频、Sanity 缓存 |

**黄金法则："如果不渲染 React，就不要使用 React state。"** 每帧值（`targetZ`、`parallax`、`glanceOffset`、`currentSegment`）必须在 `useRef` 中。如果它们是 `useState`，每 60fps 的 `useFrame` 调用都会触发完整的 React 重渲染，消耗整个帧预算。

**"影子 ref"模式**（AchievementsContext）：`completedRef` 在高频事件期间镜像 `completed` 状态以进行同步检查（滚轮每 session 触发 `unlockAchievement` 100+ 次）。没有 ref，`setState` 的异步批处理意味着 `completed.includes(id)` 在第一次状态刷新前返回 100 次 false——导致 100 次重复的 PostHog 事件。

**重复静音状态风险：** `audioManager.js` 和 `AudioManager.jsx` 各自维护独立的 `isMuted` 变量，读取相同的 localStorage 键。通过模块 `toggleMute()` 的更改不会在 UI 中触发 React 重渲染。这是遗留问题——将在重构中解决。


## 性能分级

| Tier | 检测条件 | dpr | Shadows | Antialias | 粒子数 |
|------|----------|-----|---------|-----------|--------|
| HIGH | Desktop, >4 cores, >4GB RAM | [1, 2] | true | true | 100% |
| MEDIUM | Mobile or ≤4 cores | [1, 1.5] | false | true | 60% |
| LOW | Mobile + ≤4 cores or ≤4GB | [0.8, 1] | false | false | 30% |

运行时降级：`<PerformanceMonitor flipflops={3}>` → `downgradeTier()`（单向 HIGH→MEDIUM→LOW，从不回升）

### 设计理由

**为什么是离散分级而不是连续缩放：** GPU 能力是离散的——阴影开/关，抗锯齿开/关。没有有意义的连续映射。3 个 tier 可测试、可调优、可预测。

**为什么单向降级：** 如果 GPU 证明无法处理 HIGH，在类似负载下很可能再次失败。热节流意味着性能单调递减。重新启用阴影比初始降级更可能在视觉上造成不适。

**为什么 MEDIUM 禁用阴影但保留抗锯齿：** 阴影需要额外的渲染 pass 和大纹理分配——移动端的首要瓶颈。抗锯齿在现代 GPU 上硬件加速。在手工绘制的素描美学中，锯齿边缘高度可见且破坏沉浸感。

**为什么全部使用 `meshBasicMaterial`：** 这是最大的性能优化——零光照计算。每个像素都是单次纹理查找。手工绘制的黑白素描美学使得无光照成为一个特性而非限制。

**关键性能模式（禁止在 `useFrame` 中违反）：**
- 禁止 `new THREE.Vector3()` / `new THREE.Euler()` ——使用模块级预分配常量
- 每帧变化的值用 `useRef`，非 React state（避免 60fps 重渲染）
- 直接 DOM 操作用于预加载器百分比（`textRef.current.innerText`——零 React 开销）
- `texture.clone()` 用于独立的 repeat/offset，无需重新下载

---

## 核心文件索引

| 文件 | 用途 |
|------|------|
| `MY_PROJECT_SPEC.md` | **重构规格文档——先读这个** |
| `REPLACE_CHECKLIST.md` | Branding 替换审计清单 |
| `ITOM_ANALYSIS.md` | 原始 ITom 项目深度分析（遗留参考） |
| `src/main.jsx` | React DOM 入口 + 控制台签名 |
| `src/App.jsx` | 根组件：Provider 嵌套、纹理预加载、Experience 懒加载 |
| `src/components/canvas/Experience.jsx` | **3D 场景入口** |
| `src/context/SceneContext.jsx` | 场景状态：currentRoom、传送状态机（6 阶段） |
| `src/context/PerformanceContext.jsx` | 设备分级 + 运行时降级 |
| `src/context/AudioManager.jsx` | 全局音频：mute、volume、play() |
| `src/context/AchievementsContext.jsx` | 6 个成就（localStorage + PostHog） |
| `src/hooks/useInfiniteCamera.js` | 走廊镜头：scroll + parallax + auto-glance |
| `src/hooks/useSanityData.js` | Sanity 数据（模块级缓存 + pub/sub） |
| `src/hooks/useDocumentMeta.js` | 虚拟路由（History API、5 条路径） |
| `src/config/sanity.js` | Sanity client 配置 |
| `src/config/texturePreloadList.js` | 纹理预加载清单（按设备过滤） |
| `src/utils/deviceDetect.js` | 设备检测（matchMedia） |
| `src/utils/audioManager.js` | BGM 单例（模块级，非 React） |
| `seo-plugin.js` | 构建时 JSON-LD + llms.txt 注入 |
| `portfolio-itom/schemaTypes/` | Sanity Schema（5 个类型） |

---

## 核心设计哲学

综合所有架构决策，揭示出贯穿整个项目的设计原则。理解这些原则比理解任何单行代码更重要：

**1. "在 3D 上投入复杂度，在架构上保持轻量。"**
复杂度投入在用户看到的地方（自定义 shader、GSAP 协调的状态机、设备分级渲染、纸撕裂过渡、成就游戏化）。基础架构保持最小（React Context 而不是 Redux、共置 hooks、History API 而不是 react-router、模块作用域单例）。

**2. "为每个渲染域选择正确的工具。"**
Canvas/DOM 分离、GSAP/CSS 分离、R3F/原生 Three.js 选择、组件目录结构——都遵循同一原则：将工具与底层匹配。WebGL 用于空间渲染，DOM 用于文本/表单/无障碍，GSAP 用于 3D+shader 动画，CSS 仅用于琐碎的装饰性过渡。

**3. "状态形态跟随变化频率。"**
Context/ref/模块级三层分类不是随意的——它是性能驱动的决策，关键变量是"这多久变化一次？"决策（房间、传送阶段）变化慢，放 Context。运动（镜头、滚动、视差）每帧变化，放 ref。单例（音频、缓存）存在一次，放模块级别。

**4. "共置直到复用强制提取。"**
`usePaintMaterial` 在 `rooms/Gallery/` 中因为只有一个房间使用它。Shaders 在 `components/canvas/shaders/` 中因为只有 Canvas 组件使用它们。这最小化了主要消费者的导入距离，同时保持提取路径清晰：如果第二个房间需要 paint-reveal，将 hook 移至 `hooks/` 并参数化。

**5. "在用户看到任何东西之前预加载一切。"**
两阶段加载管线（模块级纹理预加载 → RoomWarmup shader 编译 → Preloader 退出）是一种激进的预计算策略。理念是：在第一次交互之前花时间，确保每个后续交互都是即时的。房间进入时的 shader 编译——WebGL 应用中最主要的帧掉落来源——在加载屏幕期间被消除。

**6. "让状态机可见，不要抽象。"**
传送状态机使用显式阶段标志和 GSAP `onComplete` 回调顺序执行，而不是带有不透明 action type 的 reducer。每个阶段转换都是一个命名函数（`startTeleportTransition`、`completeTeleport`、`signalRoomReady`）。线性 A→B→C→D 流程加一个分支比等效的 `dispatch({type: '...'})` 模式更可读。

**7. "将 React 与 GSAP 去同步化。"**
镜头飞入后的 250ms 延迟、`cameraOverride` 系统、`skipFrameAfterEnable` 机制——都解决同一个问题：React reconciliation 和 GSAP 动画循环不应重叠。当它们重叠时，React 的同步渲染会阻塞动画线程，造成可见卡顿。解决方案始终是时序分离：让 GSAP 完成，然后让 React 更新。

**8. "为第一帧优化，而不是平均帧。"**
RoomWarmup 存在是为了消除首次进入时的 shader 编译卡顿。模块级纹理预加载在 React 挂载之前启动。`compileAsync` 调用强制所有 shader 提前编译。理念是：用户记住的是第一印象，而不是平均体验。门进入时的一次 200ms 帧掉落会破坏整个打磨感。

**9. "拥抱媒介的约束。"**
手工绘制的素描美学不仅是艺术选择——它是性能最优的。`meshBasicMaterial`（无光照，在 MEDIUM tier 上无阴影）意味着每个 mesh 是单次纹理查找。白色纸纹理上的黑色墨水意味着无需复杂的 PBR 材质、法线贴图、环境贴图。美学约束本身就是性能策略。

**10. "为未来的开发者留面包屑。"**
保留而非删除遗留组件（`Door.jsx`、`Corridor.jsx`、`useScrollCamera.js`）。注释解释**为什么**做出决策（"KEY INSIGHT: Only modifies the DISCARD logic"）。`customProgramCacheKey` 模式始终一致应用。代码库读起来像一个刻意架构的系统，而非有机生长出来的。

---

## 当前架构 vs 目标架构

| 维度 | 当前（ITom 遗留） | 目标（Menglan World） |
|------|-------------------|----------------------|
| 3D 入口 | Experience.jsx（保持） | Experience.jsx |
| 镜头控制 | useInfiniteCamera + 分散的 setCameraOverride | CameraContext 统一管理 |
| GSAP 入口 | 17 个文件分散调用（124+ 处） | AnimationManager 统一入口 |
| Shader 位置 | `components/canvas/shaders/` + room 目录 | `src/shaders/` 统一目录 |
| 性能控制 | PerformanceContext（保持） | PerformanceContext |
| 状态管理 | 4 个 React Context（保持） | 精简为 CameraContext + PerformanceContext + SceneContext |
| 房间通信 | 各房间独立实现 | 统一 Room 契约 + AnimationManager |
| Branding | ITom / itomdev.com | Menglan World / menglan.world |

---

## 开发路线图

### 阶段 1：清理与去品牌化（当前）
- [x] index.html / sitemap / robots / _headers 去品牌化
- [x] useDocumentMeta.js 路由元数据重写
- [x] ContactRoom 邮箱 + 社交链接替换
- [ ] `seo-plugin.js` JSON-LD 重写（~40 处引用）
- [ ] `main.jsx` 控制台签名替换
- [ ] `ScreenReaderOverlay.jsx` 无障碍文字更新
- [ ] `HeroText.jsx` "ITOM" → 新品牌名
- [ ] `InfiniteSkyManager.jsx` "TOMASZ SZMAJDA" → 新品牌名
- [ ] `AboutRoom.jsx` 故事里程碑数据更新
- [ ] `contentData.js` 27 条硬编码社交数据清除
- [ ] `MessagePaper.jsx` 允许域名更新
- [ ] `LICENSE` 版权所有者更新

### 阶段 2：架构规范化
- [ ] 实现 `AnimationManager` 单例
- [ ] 实现 `CameraContext` 统一镜头控制
- [ ] 所有 GSAP 调用迁移到 AnimationManager
- [ ] 所有 Shader 迁移到 `src/shaders/`
- [ ] 房间组件统一契约检查

### 阶段 3：功能完善
- [ ] Contact Room 消息表单（当前回退到 mailto）
- [ ] 自定义光标集成（资源已在 `/public/cursors/`）
- [ ] 移动端触摸交互优化
- [ ] Sanity CMS 不可达时的优雅降级
- [ ] 404 页面 3D 体验

### 阶段 4：性能与质量
- [ ] Service Worker 离线缓存
- [ ] Web Worker 纹理解码
- [ ] TypeScript 迁移
- [ ] 自动化集成测试

---

## 关键实现备忘

- **无 Redux/Zustand** —— React Context 足够覆盖当前状态图（~20 个消费者，浅依赖树）
- **镜头操作权转移**：`setCameraOverride(true)` 禁用 `useInfiniteCamera`，由 AnimationManager 接管——这是权宜之计，目标是 CameraContext 统一管理
- **`useFrame` 防过期闭包**：所有来自 props/state 的值必须在 ref 中镜像——`useFrame` 是在 hook 创建时捕获的闭包
- **房间就绪检测**：帧计数（5-25 帧），非 `useEffect`/`Suspense`——它们不保证 GPU 工作完成
- **模块级纹理预加载**：JS 解析阶段即启动 HTTP 请求，早于 React 挂载——最小化瀑布流延迟
- **虚拟路由**：History API（非 react-router），5 条路径，SPA fallback: `public/_redirects`
- **`failIfMajorPerformanceCaveat: true`**：软件 GPU 上直接拒绝运行——无回退，无错误消息
- **Sanity 图片 URL 通过 `/sanity-cdn` Cloudflare Worker 代理重写**，实现边缘缓存（1 年 TTL）
- **`texture.clone()` 用于独立 repeat/offset**——避免为每个 mesh 重新下载纹理
- **`customProgramCacheKey()` 必须为每个 shader 配置返回唯一字符串**——防止 Three.js 复用不兼容的编译程序
- **成就提示音静默禁用**（`AchievementsContext.jsx:85-86`）——Web Audio oscillator 链已构建但从未触发
- **Contact Room 消息表单未完成**——整个 WRITING/ROLLING/HOLDING/THROWING 阶段被注释掉，`handleMailSelect` 直接重定向到 `mailto:`
- **`cancelTeleport()` 从未被调用**——传送状态机缺少超时/恢复机制
