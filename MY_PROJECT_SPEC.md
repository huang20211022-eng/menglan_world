# MY_PROJECT_SPEC.md

> **ITom 3D Interactive Portfolio — 项目需求规格说明书**
>
> 版本：v1.0
> 最后更新：2026-08-06
> 本文档是本项目的唯一需求来源（Single Source of Truth），所有设计、开发、测试均以此为依据。

---

## 目录

1. [项目定位](#1-项目定位)
2. [最终目标](#2-最终目标)
3. [页面规划](#3-页面规划)
4. [网站风格](#4-网站风格)
5. [动画风格](#5-动画风格)
6. [颜色规范](#6-颜色规范)
7. [字体规范](#7-字体规范)
8. [页面列表与功能](#8-页面列表与功能)
9. [数据来源](#9-数据来源)
10. [后台需求（Sanity CMS）](#10-后台需求sanity-cms)
11. [SEO 需求](#11-seo-需求)
12. [性能要求](#12-性能要求)
13. [可维护规范](#13-可维护规范)
14. [后续开发计划](#14-后续开发计划)

---

## 1. 项目定位

### 1.1 项目名称
**ITom Dev — Interactive 3D Creative Developer Portfolio**

### 1.2 一句话描述
一个 Awwwards/FWA 级别的沉浸式 3D WebGL 创意开发者个人作品集网站。

### 1.3 目标用户
- **首要用户**：创意行业的招聘方、潜在客户、设计/技术社区评审
- **次要用户**：搜索引擎爬虫（SEO 友好）、屏幕阅读器用户（无障碍访问）

### 1.4 核心理念
用户在一个**手绘素描风格**的无限走廊中穿行，走廊两侧有 4 扇门，每扇门通往一个沉浸式 3D 房间，每个房间对应一个内容主题——画廊（作品）、工作室（社交内容）、关于（个人故事）、联系（社交链接）。整个体验模拟翻阅一本手绘素描本的感觉。

### 1.5 核心差异化
- **不是传统网页**：全 3D WebGL 场景，无传统页面跳转
- **手绘美学**：所有纹理为定制手绘 artwork，黑白色调素描风格 + 悬停时颜色揭示
- **物理级交互**：门可以推开、卡片可以翻转、显示器塔可以旋转
- **画入过渡**：自定义 GLSL 着色器实现颜料/画笔揭示效果
- **无感性能**：自适应设备层级、离线着色器预编译、设备感知纹理加载

---

## 2. 最终目标

### 2.1 用户体验目标
- **第一印象**：用户在 3 秒内理解这是一个创意开发者的作品集
- **探索感**：用户主动滚动/点击来探索内容（而非被动浏览）
- **记忆点**：手绘素描→颜色揭示的核心交互让用户印象深刻
- **零迷失**：地图面板 + 传送系统让用户永远知道自己在哪

### 2.2 品牌目标
- 获得 Awwwards Site of the Day (SOTD) 或其他设计奖项认可
- 在创意开发社区建立个人品牌影响力
- 将访客转化为潜在客户/招聘方的联系意愿

### 2.3 技术目标
- **Lighthouse 评分**：Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- **加载时间**：首屏可交互 < 3 秒（高速网络）/ < 6 秒（3G）
- **帧率**：走廊滚动保持 60fps（HIGH 层级）/ ≥ 30fps（LOW 层级）
- **兼容性**：支持所有现代浏览器（Chrome/Firefox/Safari/Edge，最近 3 个大版本）
- **可维护性**：Sanity CMS 可更新所有内容，无需修改代码

### 2.4 架构目标
- 代码分离：3D 场景（R3F Canvas）与 2D UI（DOM Overlay）清晰分层
- 组件化：每个房间为独立组件，遵循统一的 Room Component Contract
- 数据驱动：所有内容通过 Sanity CMS 管理，组件通过 hooks 订阅数据
- 类型安全：函数通过 JSDoc 注释提供类型提示

---

## 3. 页面规划

### 3.1 总体结构
本网站是一个**单页应用（SPA）**，通过虚拟路由（History API）模拟多页面导航。用户始终在一个 3D 场景中移动，没有传统的"页面"概念。以下是内容的逻辑分区：

### 3.2 逻辑页面（6 个）

| 序号 | 逻辑页面 | URL 路径 | 3D 场景位置 | 描述 |
|------|---------|---------|------------|------|
| 1 | 入口/加载 | `/` | 入口门前 | 纸张撕裂加载动画 → 入口大门 |
| 2 | 走廊 | `/` | 无限走廊 | 可滚动的无限走廊，门通往各房间 |
| 3 | 画廊 | `/gallery` | 画廊房间 | 晾衣绳上的项目卡片轮播 |
| 4 | 工作室 | `/studio` | 工作室房间 | 圆柱形显示器塔，展示社交内容 |
| 5 | 关于 | `/about` | 关于房间 | 天空飞行，故事里程碑 |
| 6 | 联系 | `/contact` | 联系房间 | 码头/海景，社交桶和留言纸 |

### 3.3 用户旅程流程

```
[加载屏幕] → [入口大门] → [无限走廊] ←→ [4 个房间]
                                ↑↓
                          [地图面板传送]
```

1. 用户打开网站 → 看到纸张撕裂加载动画
2. 加载完成 → 纸张撕开，露出入口大门
3. 点击大门 → 相机飞入，进入无限走廊
4. 在走廊中滚动 → 看到 4 扇门（画廊/工作室/关于/联系）
5. 点击门 → 相机飞入房间，进入沉浸式体验
6. 按 ESC 或返回按钮 → 相机飞回走廊
7. 使用地图面板 → 可快速传送到任意房间

---

## 4. 网站风格

### 4.1 核心视觉概念
**"一本手绘素描本的 3D 化"**

整个网站模拟翻阅一本艺术家的素描本——纸张纹理、手绘线条、撕裂边缘、铅笔笔触。所有 3D 元素都保持黑色墨水线条 + 纸张底色的风格，然后在悬停/交互时通过着色器揭示水彩般的彩色版本。

### 4.2 视觉元素规范

| 元素 | 规范 |
|------|------|
| **背景** | 纸张纹理（`paper-texture.webp`），底色 #fafafa |
| **3D 模型** | 全部为平面（PlaneGeometry/BoxGeometry），使用手绘纹理贴图 |
| **线条** | #1a1a1a（近黑墨水色），模拟墨水笔触 |
| **造型** | 锯齿形墙壁、不规则撕裂边缘、手绘字体 |
| **按钮/卡片** | clip-path 多边形模拟撕纸边缘 + SVG 描边边框 |
| **UI 面板** | 纸张纹理背景 + 撕纸边缘 + 手绘边框装饰 |
| **光标** | 自定义手绘风格光标（`cursors/cursor-default.webp`、`cursor-pointer.webp`） |
| **地图** | 手绘走廊地图，房间位置标记为图钉 |
| **雾效** | #fafafa 颜色雾，距离 15-50 单位 |

### 4.3 禁止使用的视觉元素
- ❌ 现实照片（只有手绘 artwork）
- ❌ 纯色平面（必须带纸张纹理）
- ❌ 直角边缘（必须使用撕纸/锯齿边缘）
- ❌ 系统默认字体（必须使用手绘风格字体）
- ❌ 标准按钮样式（必须使用撕纸边框 + 纸张纹理）

---

## 5. 动画风格

### 5.1 动画设计原则
- **手绘感**：动画应有"翻页"、"撕纸"、"画笔描绘"的感觉
- **物理感**：缓动函数模仿真实物理（门推开、卡片翻面、纸张飘动）
- **流畅优先**：所有动画使用 GSAP，确保 60fps
- **不打断**：用户主动触发动画（点击/悬停/滚动），不用自动播放动画打断用户
- **有反馈**：每个交互都有即时视觉反馈（悬停→门微开+画笔揭示，点击→相机飞行）

### 5.2 核心动画类型

| 动画类型 | 描述 | 技术 |
|---------|------|------|
| **画笔揭示** | 悬停时黑色素描局部被彩色版本替换，从底部向上带噪点边缘 | GLSL 着色器 `uProgress` uniform + GSAP 0.8s power2.out |
| **画入过渡** | 进入房间时，颜料波前沿扫过整个房间，带噪点边界和发光湿边 | GLSL 着色器 `uPaintProgress` uniform + GSAP 2.5s power2.inOut |
| **门开关** | 门围绕铰链旋转打开，手柄先旋转再门旋转 | GSAP timeline: 手柄 0.15s → 门 0.7s power2.out |
| **相机飞行** | 相机平滑飞到门前 → 对齐旋转 → 飞入房间 | GSAP 1.0s + 1.5s power2.inOut |
| **纸张撕裂** | 加载/传送时纸张从中间撕裂分开/合拢 | GSAP timeline: 两半 xPercent ±100, rotation ±2, 1.2-1.8s power3.inOut |
| **卡片翻转** | 画廊项目卡片从晾衣绳上取下并 180° 翻转 | GSAP timeline: 5 步骤约 1.4s（提升→翻转→放大） |
| **塔楼旋转** | 工作室显示器塔楼拖拽旋转 + 惯性衰减 + 自动旋转 | useFrame + 摩擦衰减 |
| **飞行效果** | 关于房间相机倾斜/俯仰随滚动速度变化 | useFrame + 正弦波 bank/pitch |

### 5.3 缓动函数使用规范

| 缓动函数 | 使用场景 |
|---------|---------|
| `power2.out` | **默认缓动**——悬停、揭示、门关闭 |
| `power2.inOut` | 相机飞行、门打开、卡片滚动 |
| `power2.in` | 门关闭、反向揭示 |
| `power3.inOut` | 纸张撕裂、卡片最终定位 |
| `power3.out` | 卡片回落 |
| `back.out(1.7)` | 弹性超调——弹出效果（墨水溅开、讲话气泡） |
| `'none'` (0.01s) | 快速传送模式（纸张闭合期间的即时动画） |

### 5.4 动画时长规范

| 类型 | 时长 | 说明 |
|------|------|------|
| 悬停画笔揭示 | 0.8s (进入) / 0.5s (离开) | power2.out |
| 门微开（悬停） | 0.3s | power2.out |
| 门全开（点击） | 手柄 0.15s + 门 0.7s | power2.out |
| 相机飞行到门 | 1.0s | power2.inOut |
| 相机飞入房间 | 1.5s | power2.inOut |
| 纸张撕裂打开 | 1.8s | power3.inOut |
| 纸张撕裂合拢 | 0.8s | power2.inOut |
| 卡片翻转 | ~1.4s | 多步 timeline |
| 画入过渡 | 2.5s (+ 0.2s 延迟) | power2.inOut |
| 快速传送 | 0.01s | 'none'（所有步骤） |

---

## 6. 颜色规范

### 6.1 主色调

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| **纸张白** | `#fafafa` | 场景背景色、雾色、Canvas 背景 |
| **墨水黑** | `#1a1a1a` | 3D 线条色、文字色、素描纹理主色 |
| **纸张基色** | `#e0e0e0` | 3D 材质 color（与纹理相乘得到手绘效果） |
| **纯白** | `#ffffff` | UI 卡片背景 |

### 6.2 功能色（用于 UI 元素）

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| 画廊标识色 | TBD | 画廊房间地图高亮、标签色 |
| 工作室标识色 | TBD | 工作室房间地图高亮、标签色 |
| 关于标识色 | TBD | 关于房间地图高亮、标签色 |
| 联系标识色 | TBD | 联系房间地图高亮、标签色 |

### 6.3 颜色使用规则
- **3D 场景中的所有材质**使用 `meshBasicMaterial`（无光照），颜色设置为 `#e0e0e0` 与纹理相乘
- **_painted 纹理**的颜色在设计阶段确定，由艺术家手绘，不走代码色值
- **UI 元素**的背景统一使用纸张纹理 `url('/textures/paper-texture.webp')`
- **文字**统一使用 `#1a1a1a`（墨水黑）
- 悬停/交互时的颜色揭示由着色器处理，颜色来源于 painted 纹理

---

## 7. 字体规范

### 7.1 字体系统

| 字体名称 | 格式 | 来源 | 用途 | 字重 |
|---------|------|------|------|------|
| **Cabin Sketch** | TTF | 本地 `/fonts/` | **主要 UI 字体**：按钮、标签、导航 | Regular (400), Bold (700) |
| **Inter** | WOFF2 | Google Fonts | **正文字体**：描述文本、SEO 内容、表单 | 300, 400, 500, 600, 700 |
| **Caveat** | WOFF2 | Google Fonts | **手写字体**：辅助文字、标签 | 400, 500, 600, 700 |
| **Gloria Hallelujah** | WOFF2 | Google Fonts | **标题字体**：大标题、房间名称 | 400 |
| **Fredericka the Great** | TTF | 本地 `/fonts/` | **装饰字体**：特殊标题 | 400 |
| **Rubik Scribble** | TTF | 本地 `/fonts/` | **Hero 字体**：走廊 "ITOM" 大字 | 400 |
| **Satisfy** | JSON | 本地 `/fonts/` | **3D 文字**：Three.js Text 组件使用 | — |

### 7.2 字体使用规则

| 使用场景 | 字体 | 字重 | 大小参考 |
|---------|------|------|---------|
| 页面标题（SEO） | Gloria Hallelujah | 400 | 2-3rem |
| 导航按钮 | Cabin Sketch | Bold 700 | 1rem |
| UI 面板标题 | Cabin Sketch | Bold 700 | 1.5rem |
| 正文/描述 | Inter | 400 | 0.875-1rem |
| 手写标注 | Caveat | 500 | 1-1.25rem |
| 走廊 Hero 大字 | Rubik Scribble | 400 | 响应式 0.65-1× 基准 |
| 3D 文字（房间内） | Satisfy | — | 可配置 |

### 7.3 字体加载策略
- Google Fonts 通过 `<link>` 在 index.html 中预连接并加载
- 本地 TTF 字体通过 `@font-face` 在 GlobalOverlay.scss 中声明
- Inter 字体额外通过 `new FontFace()` 在 App.jsx 中内联预加载关键子集
- 所有字体使用 `font-display: swap` 确保文字在字体加载期间可见

---

## 8. 页面列表与功能

### 8.1 加载屏幕（Preloader）

| 属性 | 内容 |
|------|------|
| **URL** | `/`（初始状态） |
| **3D 场景** | 无（此阶段 Canvas 在后台编译着色器） |
| **DOM 覆盖层** | 全屏纸张撕裂动画 + 加载百分比 |
| **核心功能** | ① 展示手绘 LOGO + 加载百分比 ② 两个旋转环动画（10s + 4s 反向）③ SVG 描边虚线进度条 ④ 监听 THREE.js 加载管理器获取真实进度 |

**交互流程**：
1. 页面加载 → 显示纸张闭合状态 + 0% 进度
2. 资源加载中 → GSAP 平滑插值百分比显示（避免跳变）
3. 加载完成（99.5%）→ 播放撕裂音效 → 纸张撕开动画（1.8s power3.inOut）
4. 纸张完全撕开 → 显示入口大门场景

---

### 8.2 入口场景（Entrance）

| 属性 | 内容 |
|------|------|
| **URL** | `/`（已加载但未进入） |
| **3D 场景** | 手绘走廊地板 + 入口大门 + 悬挂指示牌 |
| **DOM 覆盖层** | 成就提示弹窗（"点击大门进入"） |

**场景元素**：
- **EmptyCorridor**：5 段纸张纹理地板，跟随摄像机位置
- **EntranceDoors**：双开大门 + 砖块立面 + 石门步道
  - 窗户里的小人（悬停时探头）+ 猫（瞳孔跟踪鼠标）+ 橡皮鸭（带讲话气泡）+ 虫子（点击后墨水溅开 "BUG FIXED!"）+ 树上摇摆的老鼠
- **SignSystem**：悬挂式入口指示牌，带风吹摆动动画

**交互功能**：
1. 悬停大门 → 门微开（0.08 弧度）+ 手柄旋转 + 画笔揭示彩色大门
2. 悬停窗户 → 小人探头出来（弹性超调动画）
3. 点击虫子 → 墨水溅开动画 + "BUG FIXED!" 文字
4. 点击大门 → 门全开 + 相机飞入（1.8s）→ 进入无限走廊

---

### 8.3 无限走廊（Corridor）

| 属性 | 内容 |
|------|------|
| **URL** | `/`（已进入状态） |
| **3D 场景** | 无限延伸的手绘走廊，锯齿形墙壁 |
| **DOM 覆盖层** | 导航 UI（汉堡菜单、地图面板、音频面板、成就面板） |

**场景架构**：
- **3 段滑动窗口**：只渲染当前段 + 前一段 + 后一段（每段 80 单位）
- **可见性管理**：距离相机 > 30 单位或 < -5 单位的段自动隐藏
- **段 0**（起始段，Z=10 到 Z=-70）：包含欢迎区 + 4 扇门 + 装饰物

**段内元素**：
- **CorridorWalls**：锯齿形墙壁（24° 倾角）、地板瓷砖（3 条拼接 + 交替镜像）、天花板瓷砖、踢脚线
- **HeroText**："ITOM" 大字（Rubik Scribble 字体）+ "< creative developer />" 标语 — 相机靠近时字母分裂散开
- **Avatar**：9 帧来回动画的 2D 角色（20fps）— 相机靠近时闪避到旁边
- **Doodles**：浮动装饰——纸飞机、纸球、铅笔、咖啡杯、星星、曲线、涂鸦圆圈、思考气泡
- **CorridorDecorations**：天花板灯（带白色发光面）、4 个可检查的相框（悬停画笔揭示 + 点击放大查看）、桌子 + 花盆、橱柜 + 相框、盆栽树、通风格栅
- **SegmentDoors**：段末双开门——相机距离 < 12 单位时自动打开，> 18 单位时关闭
- **4 扇 DoorSection**：

| 门 | 位置 | 房间 | 入口距离 |
|----|------|------|---------|
| 画廊门 | Z=-18, 左侧 | Gallery | 8 单位 |
| 工作室门 | Z=-32, 右侧 | Studio | 8 单位 |
| 关于门 | Z=-48, 左侧 | About | 25 单位 |
| 联系门 | Z=-62, 右侧 | Contact | 8 单位 |

**DoorSection 行为**：
- **动态墙倾角**：相机靠近（15 单位内）墙体从几乎平直（0.02°）倾斜到最大角度（~27°），带三角比例校正
- **悬停**：门微开 + 手柄旋转 + 画笔揭示彩色版（0.8s）
- **点击进入**：保存相机状态 → 相机飞向门对齐位置 → 延迟加载房间组件 → 等待房间就绪 → 门全开 → 相机飞入
- **ESC 退出**：真正的反向动画——相机走回门口 → 重新对齐走廊位置 → 门关闭 → 释放相机控制
- **传送到达**：自动触发点击（极速 0.01s 动画）

**走廊交互功能**：
1. **滚动**（鼠标滚轮/触摸拖拽/键盘方向键）：沿 Z 轴前后移动
2. **视差**（鼠标移动/手机陀螺仪）：相机 X/Y 微移
3. **自动扫视**：靠近门时相机自动看向门的方向
4. **滑动扫视**（移动端）：手指横向滑动改变视角
5. **键盘导航**：↑↓ 滚动，←→ 扫视，PageUp/PageDown 快速滚动，Space 向下

**UI 覆盖层**：
- **地图面板**：展示手绘走廊地图，4 个房间位置以图钉标记，悬停/当前房间触发水彩画揭示覆盖层动画，点击→传送
- **音频面板**：BGM 音量滑块 + 音效音量滑块 + 静音开关
- **成就面板**：列出 6 个成就，显示完成进度
- **成就弹窗**：Toast 样式弹出，撕纸边框，特殊处理首个成就（内嵌声音开关）
- **返回按钮**：房间内可见，点击触发 ESC 退出

---

### 8.4 画廊房间（Gallery Room）

| 属性 | 内容 |
|------|------|
| **URL** | `/gallery` |
| **3D 场景** | 阳台 + 晾衣绳项目卡片轮播 + 城市天际线 |
| **DOM 覆盖层** | 无（纯 3D 交互） |
| **进入方式** | 走廊画廊门进入 / 地图传送 |

**场景元素**：
- **晾衣绳系统**：`CatmullRomCurve3` 曲线，10 张重复项目卡片用衣夹悬挂
- **项目卡片**（每个项目）：
  - 正面：项目手绘素描封面 + PaperMaterial 着色器（弯曲 + 飘动效果）
  - 背面：项目描述 + 技术栈 LOGO（React/HTML/CSS/JS/Tailwind 等，4 个以内）+ "OPEN PROJECT" 按钮
  - 交互：悬停→画笔揭示彩色版（PaintRevealMaterial）+ 点击→卡片翻转
- **阳台场景**：地板（梯形）+ 栏杆（railing.webp）+ 晾衣绳杆
- **背景**：房屋群（中心 + 左右镜像）+ 城市天际线（中心 + 左右镜像）+ 65 朵云（GalleryClouds）+ 天空球体
- **飞鸟**：Flappy-Bird 式物理（重力 + 周期性跳跃），2 帧翅膀动画
- **画入过渡**：方向从左到右（dirX: -1.0），距离 -5 到 55

**交互功能**：
1. **水平滚动**（滚轮/触摸拖拽）：卡片沿曲线左右滑动，边缘卡片淡出缩小
2. **悬停卡片**：画笔揭示彩色版（0.8s）+ PaperMaterial bend 微调
3. **点击卡片**：卡片滚动到中央 → 从衣夹提起 → 180° 翻转 → 放大 → 显示背面
4. **背面操作**：查看技术栈 LOGO → 悬停→画笔揭示 → 点击 "OPEN PROJECT" → 新标签页打开项目 URL
5. **点击卡片外部/ESC**：卡片翻转回正面 → 放回衣夹
6. **画入过渡**：首次进入房间时颜料波前沿扫过（跳过传送到达）

---

### 8.5 工作室房间（Studio Room）

| 属性 | 内容 |
|------|------|
| **URL** | `/studio` |
| **3D 场景** | 圆柱形显示器塔 + 代码粒子 |
| **DOM 覆盖层** | GlobalOverlay（内容详情卡） |
| **进入方式** | 走廊工作室门进入 / 地图传送 |

**场景元素**：
- **显示器塔**：圆柱形排列，每环 4 个显示器，间距 2.5 单位，最少 48 个（12 环）无缝循环
- **3 种设备形状**：
  - 显示器（Monitor）：博客文章，1.6×1×0.15
  - 电视（TV）：YouTube 视频，1.6×1.187×1.0
  - 手机（Phone）：TikTok，0.6×1.139×0.1
- **每个显示器 6 面**：正面/背面/顶部/底部/左侧/右侧，每面 sketch+painted 纹理对
- **FloatingCodeParticles**：60 个 2D 代码符号粒子（Troika Text），随塔旋转和下落速度产生视差
- **画入过渡**：方向从顶到底（dirY: -1.0），noiseAxes: 'xz'

**交互功能**：
1. **水平拖拽**：旋转整个塔楼（GSAP 动量 + 惯性衰减 + 空闲自动旋转）
2. **垂直滚动**：控制显示器下落速度
3. **悬停显示器**：该显示器 6 面同时画笔揭示彩色版
4. **点击显示器**：
   - 第一步：塔旋转使目标显示器朝向相机（0.8s power2.inOut）
   - 第二步：相机前移 + 右移 + 下移放大到显示器前（0.5s power2.inOut）
   - 第三步：打开 GlobalOverlay，显示内容详情卡
5. **关闭覆盖层**：相机飞回原位（0.8s power2.inOut），覆盖层关闭

**GlobalOverlay 内容卡功能**：
- 撕纸边框 + 纸张纹理背景
- 标题（GSAP TextPlugin 打字机效果，~2.5s）
- 描述文字
- 元信息（日期、播放量/阅读时间/点赞数，按平台显示）
- "OPEN LINK" 按钮 → 新标签页打开
- 证书查看模式（certificate_grid 布局）：响应式网格展示 SOTD/SOTM 等证书图片
- 桌面端：卡片在右侧；移动端：卡片在底部
- 自定义拖拽滚动条

---

### 8.6 关于房间（About Room）

| 属性 | 内容 |
|------|------|
| **URL** | `/about` |
| **3D 场景** | 天空飞行 + 纸飞机 + 故事里程碑 |
| **DOM 覆盖层** | GlobalOverlay（证书查看） |
| **进入方式** | 走廊关于门进入（入口距离 25）/ 地图传送 |

**场景元素**：
- **InfiniteSkyManager**：5 个可见 SkyChunk（每个 40×20×12 单位）循环复用
- **SkyChunk**：每个包含 15-23 朵随机云（带种子随机数） + 4 种故事里程碑
- **故事里程碑**：
  - **IntroMilestone**：姓名 + 云端头像 + 格言 — 元素靠近相机时散开（maxSpread=15）
  - **AwardsMilestone**：SOTD/SOTM/SOTY 浮动卡片，悬停画笔揭示 + VIEW 按钮打开覆盖层
  - **JourneyMilestone**：两个浮动岛屿（大学 + 自由职业），从云下浮出 + 上下摆动
  - **SkillsMilestone**：10 个技能气球（3 种尺寸），悬停→彩色揭示，点击→爆裂音效 + 技能名显示 + 新气球从下方升起
- **PaperAirplane**：低面数手工折纸飞机（BufferGeometry + 12 顶点 + 三角索引 + Edges 描边）
- **硬裁剪**：Z=-8 处裁剪防止云进入走廊（CORRIDOR_CLIP_Z）

**交互功能**：
1. **动量滚动**（滚轮/触摸）：累积速度 + 0.95 摩擦衰减——可向前/向后飞
2. **飞行效果**：滚动速度 > 0 时相机倾斜（Z 轴 bank）+ 俯仰（X 轴 pitch），正弦波变化
3. **纸飞机跟随**：纸飞机的旋转跟随相机的 bank/pitch
4. **悬停奖杯卡片**：画笔揭示彩色版（0.8s）
5. **点击 VIEW 按钮**：打开 GlobalOverlay 显示证书大图
6. **悬停气球**：画笔揭示彩色版（0.8s）
7. **点击气球**：爆裂音效 + 技能名浮出 → 新气球从下方升上来
8. **无 GSAP**：本房间不使用 GSAP，所有动画在 useFrame 中通过 lerp 实现

---

### 8.7 联系房间（Contact Room）

| 属性 | 内容 |
|------|------|
| **URL** | `/contact` |
| **3D 场景** | 码头 + 海洋波浪 + 灯塔 + 船 |
| **DOM 覆盖层** | 留言纸 HTML 表单（Hidden HTML inputs） |
| **进入方式** | 走廊联系门进入 / 地图传送 |

**场景元素**：
- **码头**（molo.webp）：木质平台
- **海洋**：4 层波浪平面，正弦波 Y 偏移动画，逐层递减透明度
- **灯塔**（latarnia.webp）：远处地标
- **船**（statek.webp）：波浪上摆动 + 水平航行 + 轻微侧倾
- **5 个社交桶**（SocialBarrel）：

| 桶 | 位置 | 功能 |
|----|------|------|
| LinkedIn | 左侧 | 新标签页打开 LinkedIn URL |
| GitHub | 左侧 | 新标签页打开 GitHub URL |
| Facebook | 右侧 | 新标签页打开 Facebook URL |
| Instagram | 右侧 | 新标签页打开 Instagram URL |
| Message | 中央 | 触发 mailto 链接 |

- **桶动画**：正弦波浮动 + 水平漂移 + 旋转摆动 + 悬停 scale lerp 到 1.1 + 画笔揭示
- **留言纸**（MessagePaper）：3D 纸平面 + TornPaperGeometry 撕裂边缘 + `<Html>` 覆盖的隐藏表单输入
- **画入过渡**：方向从右到左（dirX: 1.0）— Contact 在走廊右侧

**交互功能**：
1. **相机旋转顺序**：进入时切换为 'YXZ'（支持低头看纸条），退出时恢复 'XYZ'
2. **阶段状态机**：ENTERING → LOOKING_DOWN → WRITING → ROLLING → HOLDING → THROWING → DONE
3. **悬停桶**：画笔揭示彩色版（0.8s）
4. **点击社交桶**：新标签页打开对应社交链接
5. **点击 Message 桶**：直接触发 `mailto:` 链接
6. **ESC 退出**：返回走廊

---

### 8.8 屏幕阅读器覆盖层（ScreenReaderOverlay）

| 属性 | 内容 |
|------|------|
| **可见性** | `.sr-only`（对视觉用户隐藏，对屏幕阅读器和 SEO 爬虫可见） |
| **内容** | 上下文感知的 HTML 导航 |

**功能**：
- 跳到内容链接
- 基于 3D 场景状态（未进入/走廊/房间内）的条件导航
- 房间特定的内容描述（从 Sanity 数据渲染的项目列表、奖项、工作室内容）
- 到其他房间的快速导航链接
- ARIA live region 用于状态变更通知
- 在 index.html 中也有 `.sr-only-seo` 的静态 SEO 回退内容

---

## 9. 数据来源

### 9.1 数据架构总览

```
[Sanity CMS] → GROQ Queries → useSanityData.js → Module-Level Cache → React Hooks → Components
                                                                              ↓
                                                                     [Fallback Data]（Sanity 不可用时）
```

### 9.2 远程数据 — Sanity CMS

| 数据类型 | Sanity Schema | 获取方式 | 使用位置 |
|---------|---------------|---------|---------|
| 全局信息 | `globalInfo`（单例） | GROQ `*[_type == "globalInfo"][0]` | SEO 插件（构建时）、index.html meta 标签 |
| 画廊项目 | `galleryProject` | GROQ `*[_type == "galleryProject"]` | GalleryRoom 项目卡片 |
| 工作室内容 | `studioItem` | GROQ `*[_type == "studioItem"] \| order(date desc)` | StudioRoom 显示器内容 |
| 奖项证书 | `awardCertificate` | GROQ `*[_type == "awardCertificate"] \| order(date desc)` | AboutRoom 奖项里程碑 + GlobalOverlay 证书视图 |
| FAQ | `faq` | GROQ `*[_type == "faq"]` | SEO 插件 JSON-LD FAQPage |

**Sanity 项目配置**：
- Project ID: `kv5wjjmj`
- Dataset: `production`
- CDN 模式：`useCdn: true`
- API 版本：`2024-03-01`

### 9.3 图片管线

```
Sanity Image (cdn.sanity.io)
  → urlFor(source)       // Sanity image URL builder
  → getProxyUrl(builder) // Rewrite cdn.sanity.io → /sanity-cdn
  → Cloudflare Worker    // Proxy with 1-year cacheTtl
  → /sanity-cdn/*        // Same-origin served to browser
```

### 9.4 本地静态数据

| 数据 | 位置 | 用途 | 何时使用 |
|------|------|------|---------|
| 画廊回退项目 | GalleryRoom.jsx 内 `FALLBACK_PROJECTS` | 当 Sanity 返回空项目列表时 | Sanity 无数据 |
| 工作室回退内容 | `contentData.js`（27 项） | 当 Sanity 返回空内容列表时 | Sanity 无数据 |
| 奖项回退数据 | `InfiniteSkyManager.jsx` 内硬编码 | 当 Sanity 返回空奖项列表时 | Sanity 无数据 |
| 平台配置 | `contentData.js` → `PLATFORM_CONFIG` | 平台→颜色/图标/形状映射 | 始终使用 |
| 纹理文件 | `/public/textures/`（200+ 文件） | 所有 3D/UI 视觉元素 | 始终使用 |
| 音效文件 | `/public/sounds/`（10 个文件） | 背景音乐 + 环境音 + 交互音效 | 始终使用 |
| 字体文件 | `/public/fonts/`（5 个文件） | UI + 3D 文字 | 始终使用 |

### 9.5 用户本地数据（localStorage）

| 键 | 类型 | 默认值 | 用途 |
|----|------|--------|------|
| `audio_muted` | `'true'` / `'false'` | `'false'` | 静音状态持久化 |
| `audio_volume` | float 字符串 (0.0-1.0) | `'0.5'` | 音量设置持久化 |
| `itom_achievements` | JSON 数组 | `[]` | 已解锁成就 ID 列表（不含 `corridor_enter`） |

### 9.6 环境变量

| 变量 | 用途 |
|------|------|
| `VITE_POSTHOG_KEY` | PostHog 分析项目密钥 |
| `VITE_POSTHOG_HOST` | PostHog 分析服务地址 |
| （可选）`VITE_SANITY_TOKEN` | 构建时 Sanity API 认证令牌 |

---

## 10. 后台需求（Sanity CMS）

### 10.1 Sanity Studio 配置

- **框架**：Sanity Studio v3
- **位置**：`/portfolio-itom/`（独立 npm 项目）
- **部署**：托管在 Sanity.io 云端，或自行部署
- **访问权限**：通过 Sanity 用户认证管理

### 10.2 内容类型详情

#### globalInfo（全局信息 — 单例文档）
```
字段：
  siteTitle:        string (必填)    — 网站标题（SEO title）
  siteDescription:  text (必填)      — 网站描述（SEO description）
  aboutMe:          text (必填)      — "关于我" SEO 文本
  githubUrl:        url              — GitHub 链接
  linkedinUrl:      url              — LinkedIn 链接
  xUrl:             url              — X (Twitter) 链接
  instagramUrl:     url              — Instagram 链接
  tiktokUrl:        url              — TikTok 链接
  youtubeUrl:       url              — YouTube 链接
```

#### galleryProject（画廊项目）
```
字段：
  title:            string (必填)    — 项目标题
  slug:             slug (自动)      — URL slug
  url:              url              — 项目链接
  seoTitle:         string           — SEO 长标题（用于 Google）
  seoDescription:   text             — SEO 描述
  description:      text (必填)      — 项目描述（卡片背面显示）
  frontImage:       image + hotspot (必填) — 正面素描图
  paintedImage:     image + hotspot (必填) — 正面彩绘图
  techStack:        array of string (最多4个) — 技术栈
    可选值：React, HTML, CSS, JavaScript, Tailwind, Firebase, Netlify, WordPress, Elementor, PHP
```

#### studioItem（工作室内容）
```
字段：
  title:                  string (必填)  — 内容标题
  device:                 string (必填)  — 'phone' | 'tv' | 'monitor'
  platform:               string (必填)  — 'youtube' | 'tiktok' | 'instagram' | 'x' | 'linkedin' | 'codrops' | 'blog'
  description:            text (必填)    — 内容描述
  url:                    url            — 内容链接
  seoTitle:               string         — SEO 标题
  seoDescription:         text           — SEO 描述
  frontTexture:           image + hotspot (必填) — 显示器正面素描贴图
  paintedFrontTexture:    image + hotspot (必填) — 显示器正面彩绘贴图
  date:                   date (必填)    — 发布日期
  views:                  string         — 播放量（仅 YouTube/TikTok，blog 隐藏）
  likes:                  string         — 点赞数（仅 TikTok）
  duration:               string         — 时长（仅 YouTube）
  readTime:               string         — 阅读时间（仅 blog）
```

#### awardCertificate（奖项证书）
```
字段：
  title:              string (必填)  — 奖项名称
  category:           string (必填)  — 'sotd' | 'sotm' | 'other'
  seoTitle:           string         — SEO 标题
  seoDescription:     text           — SEO 描述
  certificateImage:   image + hotspot (必填) — 证书大图
  date:               date (必填)    — 获奖日期
  url:                url            — 证书链接
```

#### faq（常见问题）
```
字段：
  question:  string (必填)  — 问题
  answer:    text (必填)    — 回答
```

### 10.3 Sanity Studio 结构

- `globalInfo` 使用**单例文档**模式（documentId: 'globalInfo'），固定在侧边栏顶部
- 所有文档类型可通过 Structure Tool 侧边栏访问
- Vision Tool 启用，用于 GROQ 查询调试

### 10.4 图片上传要求

- 所有图片需使用 Sanity 的 Hotspot 功能设置焦点
- **素描版**（sketch）：黑白色调，手绘风格，带纸张纹理
- **彩绘版**（painted）：同一图像的彩色水彩/画笔渲染版本
- 推荐格式：上传 PNG 原图，由 Sanity CDN 自动转换为 WebP
- 图片尺寸建议：不超过 2048px 宽（CDN 会按需缩放）

---

## 11. SEO 需求

### 11.1 基础 SEO

| 需求 | 实现 | 状态 |
|------|------|------|
| 动态 `<title>` | useDocumentMeta → Sanity globalInfo.siteTitle + 房间后缀 | ✅ |
| 动态 `<meta description>` | useDocumentMeta → Sanity globalInfo.siteDescription | ✅ |
| Open Graph 标签 | `og:title`, `og:description`, `og:url`, `og:image` | ✅ |
| Twitter Card 标签 | `twitter:title`, `twitter:description`, `twitter:image` | ✅ |
| Canonical URL | `<link rel="canonical">` 动态更新 | ✅ |
| robots.txt | 允许所有爬虫，指向 sitemap.xml | ✅ |
| sitemap.xml | 手动维护的 XML 站点地图 | ✅ |
| favicon | favico.png | ✅ |
| 语言声明 | `<html lang="en">` | ✅ |

### 11.2 结构化数据（JSON-LD）

构建时由 `seo-plugin.js` 动态注入以下 Schema.org 类型：

| Schema 类型 | 数据来源 | 用途 |
|------------|---------|------|
| `Person` | globalInfo | 个人身份节点（@id 引用中心） |
| `WebSite` | globalInfo | 网站描述 |
| `ProfilePage` | globalInfo | 个人资料页 |
| `FAQPage` | faq | FAQ 结构化数据（用于 Google AI 搜索） |
| `ItemList`（项目） | galleryProject | 作品列表 |
| `CreativeWork`（每个项目） | galleryProject | 每个项目的详细信息 |
| `VideoObject` | studioItem（YouTube/TikTok） | 视频内容 |
| `Article` | studioItem（blog/Codrops） | 文章内容 |
| `SocialMediaPosting` | studioItem（Instagram/X/LinkedIn） | 社交帖子 |
| `ItemList`（奖项） | awardCertificate | 奖项列表 |

### 11.3 构建时 SEO 注入

- **`seo-plugin.js`** Vite 插件在 `transformIndexHtml` 阶段：
  - 从 Sanity 获取所有数据
  - 替换 index.html 中的静态 SEO 占位符为动态数据
  - 注入 JSON-LD `<script type="application/ld+json">`
  - 将结构化内容注入 `#seo-content` div
- **开发模式**：通过 `configureServer` 中间件提供 `/llms.txt`
- **生产构建**：`generateBundle` 发出 `llms.txt` 到输出目录

### 11.4 无障碍 SEO

- **ScreenReaderOverlay**：隐藏的语义 HTML，包含所有房间内容的纯文本渲染
- **index.html `.sr-only-seo`**：静态 SEO 回退文本（对爬虫可见，对用户隐藏）
- **ARIA 属性**：导航按钮使用 `aria-label`，面板使用 `inert` 属性管理焦点
- **键盘导航**：走廊支持方向键/PageUp/PageDown/Space，房间支持 ESC 退出

### 11.5 SPA 深链接

- **虚拟路由**：`/`, `/about`, `/gallery`, `/studio`, `/contact` 各对应不同内容
- **`_redirects`**：`/* /index.html 200` — 所有路径返回 index.html（SPA 回退）
- **History API**：`pushState`/`replaceState` 记录导航历史
- **popstate 监听**：浏览器前进/后退正确触发传送或元数据更新
- **直接访问**：访问 `/gallery` → 等待入口完成 → 自动传送到画廊

---

## 12. 性能要求

### 12.1 性能指标目标

| 指标 | 目标值 | 测量方式 |
|------|--------|---------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| Total Blocking Time (TBT) | < 200ms | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| 走廊滚动帧率 | 60fps (HIGH) / ≥30fps (LOW) | PerformanceMonitor |
| JavaScript 包大小 | < 500KB (gzip) | 构建输出 |
| 纹理总大小 | < 15MB (WebP) | 构建输出 |

### 12.2 设备自适应层级

| 层级 | 检测条件 | dpr | 阴影 | 抗锯齿 | 粒子/装饰 | 纹理加载 |
|------|---------|-----|------|--------|-----------|---------|
| **HIGH** | 桌面、>4 核、>4GB RAM | [1, 2] | ✅ | ✅ | 100% | 全部（含 painted） |
| **MEDIUM** | 移动端 或 ≤4 核 | [1, 1.5] | ❌ | ✅ | 60% | 全部（含 painted） |
| **LOW** | 移动端 + ≤4 核 或 ≤4GB RAM | [0.8, 1] | ❌ | ❌ | 30% | 仅 CORE_TEXTURES（无 painted） |

**运行时降级**：drei `<PerformanceMonitor>` 在帧率下降时自动降级（3 次 flipflop），HIGH→MEDIUM→LOW 单向。

### 12.3 加载优化

| 策略 | 实现 |
|------|------|
| **着色器预编译** | RoomWarmup 在加载阶段离屏渲染所有 4 个房间，调用 `gl.compileAsync()` |
| **纹理预加载** | 200+ 纹理在模块级别通过 `useTexture.preload()` 和 `useLoader.preload()` 预加载 |
| **设备感知加载** | 触摸设备跳过所有 `_painted` 纹理变体（节省 ~40% GPU 内存） |
| **懒加载组件** | `Experience` 组件 `React.lazy()` 导入；房间组件仅在门点击时加载 |
| **代码分割** | Vite 自动按路由分割（R3F/drei/GSAP 各自分块） |
| **图片优化** | Sanity CDN 自动 WebP + 按需尺寸缩放；Vite 构建 gzip 压缩 |
| **Cloudflare CDN** | Sanity 图片通过 Cloudflare Worker 代理，1 年缓存 |
| **早退出** | LOW 层级跳过 RoomWarmup 全部（避免 WebGL 上下文丢失） |

### 12.4 运行时优化

| 策略 | 实现 |
|------|------|
| **可见性裁剪** | SegmentVisibilityWrapper 隐藏远离相机的走廊段 |
| **硬 Z 裁剪** | 走廊墙壁在入口段 zClip 处裁剪；关于房间在 Z=-8 处裁剪 |
| **draw call 减少** | 所有材质使用 `meshBasicMaterial`（无光照计算） |
| **直接 DOM 更新** | 工作室显示器位置直接通过 ref 修改（绕过 React） |
| **预分配 Vector3** | useFrame 中使用模块级常量，避免 GC |
| **ref 替代 state** | 滚动位置、动画值使用 ref 而非 React state |
| **memo 包装** | 大组件（CorridorSegment 等）使用 `React.memo()` |

---

## 13. 可维护规范

### 13.1 代码组织原则

1. **组件职责单一**：每个文件只做一件事（DoorSection 虽然复杂但职责明确：管理一扇门的完整生命周期）
2. **统一接口契约**：所有房间遵循相同的 Room Component Contract（showRoom, onReady, isExiting, isWarmup）
3. **Context 集中管理**：全局状态放在 4 个 Context 中，不在组件间 prop-drilling
4. **Hooks 封装逻辑**：可复用逻辑（相机、数据获取、文档元数据）提取到 hooks
5. **配置与代码分离**：纹理列表（texturePreloadList.js）、平台配置（contentData.js）独立文件

### 13.2 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| React 组件 | PascalCase | `DoorSection`, `GalleryRoom` |
| 自定义 Hooks | camelCase + use 前缀 | `useInfiniteCamera`, `useSanityData` |
| Context Providers | PascalCase + Provider 后缀 | `SceneProvider`, `AudioProvider` |
| CSS/SCSS 类名 | BEM 风格 | `.nav-btn`, `.map-content__label` |
| 纹理文件 | 小写 + 连字符/下划线 | `door_left_sketch.webp` |
| 常量 | UPPER_SNAKE_CASE | `SEGMENT_LENGTH`, `WALL_ANGLE` |
| 文件名（组件） | PascalCase | `DoorSection.jsx` |
| 文件名（工具） | camelCase | `deviceDetect.js` |

### 13.3 添加新房间的步骤

1. 在 `src/components/canvas/rooms/` 下创建新文件夹
2. 实现 Room Component Contract 的 4 个 props
3. 在 `RoomInterior.jsx` 的 switch 中添加新房间的 case
4. 在 `CorridorSegment.jsx` 的 `doorPositions` 数组中添加新门位置
5. 在 `useDocumentMeta.js` 的 `ROOM_META` 中添加 URL 和元数据
6. 在 `SceneContext.jsx` 的 roomId 联合类型中添加新值
7. 在 `NavigationUI.jsx` 的地图面板中添加新区域
8. 在 Sanity Studio 中添加对应的内容类型（如需 CMS）
9. 更新 SEO 插件以包含新房间的内容
10. 添加成就定义（如需）
11. 添加新的纹理文件到 `/public/textures/` 和 `texturePreloadList.js`
12. 添加新的音效文件到 `/public/sounds/` 和 AudioManager

### 13.4 添加新着色器效果的步骤

1. 在 `src/components/canvas/shaders/` 创建新类，继承 `THREE.MeshBasicMaterial`
2. 实现 `customProgramCacheKey()` 返回唯一标识符
3. 通过 `onBeforeCompile` 注入自定义 GLSL：
   - 顶点着色器修改 → `shader.vertexShader` 的 `#include` 替换
   - 片段着色器修改 → `shader.fragmentShader` 的 `#include` 替换
4. 使用 `extend()` 注册为 R3F 元素
5. 在目标组件中使用 JSX 标签语法（`<newMaterial ... />`）

### 13.5 自动化与工具链

| 工具 | 用途 |
|------|------|
| **ESLint** (v9 flat config) | 代码质量检查（`npm run lint`） |
| **Vite** | 开发服务器 + 生产构建 |
| **vite-plugin-compression** | gzip 输出 |
| **seo-plugin.js** | 构建时 SEO 注入 |
| **scripts/** | 纹理优化批量处理脚本（Sharp/Jimp） |

### 13.6 文档维护

- **CLAUDE.md**：面向 AI/开发者的项目架构文档（本文件的补充，侧重实现细节）
- **MY_PROJECT_SPEC.md**（本文件）：面向产品/设计/开发的需求规格说明书
- **README.md**：面向公众的项目介绍
- **TODO.md**：开发任务跟踪

---

## 14. 后续开发计划

### 14.1 优先级定义
- **P0**：必须完成 — 核心功能缺失或严重 bug
- **P1**：高优先级 — 显著改善用户体验
- **P2**：中优先级 — 提升完整度和精致度
- **P3**：低优先级 — 锦上添花

### 14.2 待完成功能

#### 用户体验增强

| 功能 | 优先级 | 描述 |
|------|--------|------|
| 自定义光标集成 | P1 | `/public/cursors/` 已有光标图片，需全站集成手绘风格光标 |
| 留言纸表单功能 | P1 | Contact 房间的 MessagePaper 目前仅触发 mailto，可改为真正的表单提交 |
| 移动端触摸优化 | P1 | 测试和完善各房间的触摸交互（特别是 Gallery 卡片翻转、Studio 拖拽） |
| 加载失败优雅降级 | P1 | Sanity 不可用时提供更好的离线体验和错误提示 |
| 音效开关记忆 | P2 | 按房间记住音效偏好（目前仅全局静音） |
| 教程/引导系统增强 | P2 | 首次访问时的分步引导（目前仅有成就弹窗） |
| 房间内导航提示 | P2 | 每个房间内的操作提示（如 "拖拽旋转"、"滚轮翻页"） |

#### 技术与性能

| 功能 | 优先级 | 描述 |
|------|--------|------|
| Web Worker 纹理解码 | P2 | 将纹理加载移到 Worker 线程，减少主线程阻塞 |
| Service Worker 缓存 | P2 | 离线可访问（至少缓存静态资源和回退数据） |
| 更精细的 LOD 策略 | P2 | 远离相机的装饰物降低纹理分辨率或替换为简单几何体 |
| PostHog 事件完善 | P2 | 添加更多用户行为追踪事件（房间停留时间、卡片点击、传送使用） |
| A/B 测试支持 | P3 | 为入口/UI 布局提供 A/B 测试框架 |

#### 内容与 CMS

| 功能 | 优先级 | 描述 |
|------|--------|------|
| Sanity Studio 图片优化指南 | P2 | 在 Studio 中添加图片上传尺寸/格式提示和校验 |
| 多语言支持架构 | P3 | 为未来国际化预留字段和路由结构 |
| 博客/新闻动态房间 | P3 | 新增第 5 个房间展示博客文章（可复用 Studio 的 blog 平台内容） |

#### 视觉与动画

| 功能 | 优先级 | 描述 |
|------|--------|------|
| Contact 房间消息投掷动画 | P2 | 完成 MessagePaper 的 ROLLING→HOLDING→THROWING 阶段动画 |
| 走廊夜灯效果 | P3 | 基于时间/滚动的环境光变化 |
| 更多装饰元素变体 | P3 | Doodles 和 CorridorDecorations 的随机变体减少重复感 |
| 季节性/节日主题 | P3 | 特殊日期的隐藏装饰（如圣诞节雪花） |

#### SEO 与可访问性

| 功能 | 优先级 | 描述 |
|------|--------|------|
| 404 页面 | P1 | 为不存在的路径提供 3D 404 体验 |
| JSON-LD 验证 | P2 | 使用 Google Rich Results Test 验证所有结构化数据 |
| 动态 sitemap.xml | P3 | 从 Sanity 数据自动生成（目前为手动维护） |

### 14.3 技术债务

| 项目 | 描述 | 建议操作 |
|------|------|---------|
| 遗留组件清理 | `Door.jsx`, `LoopDoors.jsx`, `Corridor.jsx`, `PaperBackground.jsx`, `Tunnel.jsx` 等已不再使用 | 确认后移除，减少维护负担 |
| 遗留 CSS 清理 | `App.css` 和 `index.css` 包含 Vite 模板代码 | 移除无用样式 |
| 遗留 hooks 清理 | `useScrollCamera.js`, `useMouseParallax.js`, `useParallax.js` 可能重复 | 评估合并或移除 |
| 硬编码纹理路径 | `CorridorDecorations.jsx` 等组件中纹理路径仍以字符串硬编码 | 迁移到 texturePreloadList.js 集中管理 |
| AboutRoom 无 GSAP | About 房间使用原始 addEventListener + useFrame，与其他房间动画模式不一致 | 考虑统一为 GSAP Observer |
| 测试覆盖 | 当前无自动化测试 | 添加关键交互的集成测试 |
| TypeScript 迁移 | 当前为 JSX + JSDoc | 逐步迁移到 TypeScript |

---

## 附录 A：技术栈一览

| 类别 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 19.2 |
| 3D 引擎 | Three.js | 0.182.0 |
| R3F 集成 | @react-three/fiber | 9.4.2 |
| R3F 工具 | @react-three/drei | 10.7.1 |
| 动画 | GSAP | 3.14.2 |
| 构建工具 | Vite | 7.2.4 |
| CSS 预处理 | Sass | (Vite 内置) |
| CMS | Sanity | v3 (Studio) |
| 分析 | PostHog | (via SDK) |
| 图片处理 | Sharp, Jimp | (构建脚本) |
| 部署 | Cloudflare Pages / Netlify | — |

## 附录 B：浏览器支持

| 浏览器 | 最低版本 | 说明 |
|--------|---------|------|
| Chrome | 120+ | 完整支持 |
| Firefox | 120+ | 完整支持 |
| Safari | 16+ | WebGL 2.0 要求 |
| Edge | 120+ | 完整支持 |
| iOS Safari | 16+ | 陀螺仪权限需用户手势 |
| Android Chrome | 120+ | LOW 层级优化 |

---

> **本文档是 ITom 3D Interactive Portfolio 项目的唯一需求来源。**
>
> 任何需求变更应更新此文档并在 Git 中提交。
> 所有设计决策、功能优先级和技术选型均以此文档为最终依据。
