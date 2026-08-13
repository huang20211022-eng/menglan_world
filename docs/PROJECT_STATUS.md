# PROJECT_STATUS.md

> 始终保持最新。每次开发结束后覆盖更新，不追加历史。

---

## 当前开发阶段

**阶段 2：架构规范化** — 🔄 进行中

→ **Phase 2.1 架构稳定化 Task 1 已完成（Sanity 重试修复 + 走廊裁剪常量共享）。**

## 当前版本

**v0.4.0-about-room-v1**（待发布）

## 已完成模块

| 模块 | 状态 | Commit |
|------|------|--------|
| 项目身份初始化 | ✅ | `475403e` |
| 网站 Branding（index.html, sitemap, _headers） | ✅ | `d1b526a` |
| useDocumentMeta + ContactRoom rebrand | ✅ | `cb86e16` |
| ScreenReaderOverlay rebrand | ✅ | `ccd1d25` |
| CLAUDE.md 重构 + ITOM_ANALYSIS.md 创建 | ✅ | `6c9761f` |
| P1 项 rebrand（seo-plugin, main.jsx, HeroText, InfiniteSkyManager, AboutRoom） | ✅ | `c94716b` |
| Hero V1 文案（Title, Subtitle, Slogan, Meta, 联系方式） | ✅ | 已合并 |
| 项目文档系统（docs/） | ✅ | 已合并 |
| 头像素材替换 | ✅ | 已合并 |
| About Room 技术分析 | ✅ | 已合并 |
| About Room V1 Content Baseline | ✅ | `efc55fa` |
| About Room V1 Material Integration | ✅ | 已合并 |
| LICENSE 版权更新 | ✅ | `3145ddb` |
| V1.1.1 Sanity Offline Fallback | ⚠️ 不完整（被 V1.1.2 取代） | 已合并 |
| V1.1.2 Sanity Startup Decoupling | ✅ | 已合并 |
| V1.1.3 Canvas Crash Fix (Gallery/Studio) | ✅ | 已合并 |
| V1.1.4 Journey Modal + Entrance Hero Refinement | ✅ | 已合并 |
| V1.1.5 Entrance MENGLAN Typography Refinement | ✅ | 已合并 |
| Phase 2.1 Task 1 — Sanity 重试修复 + 走廊裁剪常量共享 | ✅ | 待提交 |

### About Room V1.1 — 完成清单

| 内容项 | 状态 |
|--------|------|
| Journey Island Education → VIEW JOURNEY Modal（GlobalOverlay journey layout） | ✅ |
| Journey Island Career → VIEW JOURNEY Modal（GlobalOverlay journey layout） | ✅ |
| MENGLAN 标题字间距优化（V1.1.2: HeroText baseX 0.27→0.35） | ✅ |
| MENGLAN 入口 SignSystem 逐字母 Text 叠加（V1.1.5: 7 个独立 `<Text>`，不透明遮罩） | ✅ |
| Projects VIEW 按钮数据源修复（useSanityData.js 标题 rebrand） | ✅ |
| VIEW 按钮数据流完整追踪 | ✅ |
| Sanity CDN 不可达时 Gallery/Studio 不崩溃（Canvas crash fix） | ✅ |
| Preloader 2s 安全防护强制退出 | ✅ |
| HeroText 重复 key 修复（`N`→`N-2` `N-6`） | ✅ |

### About Room V1 Material Integration — 完成清单

| 内容项 | 状态 |
|--------|------|
| Personal Positioning（AI Developer & Automation Creator） | ✅ |
| Introduction / Motto（"AI should solve real problems."） | ✅ |
| Intro Title（MENGLAN） + Subtitle（AI Developer & Automation Creator） | ✅ |
| Education Timeline（2016-2024, B.S. + M.S.） | ✅ |
| Career Timeline（2020-Present, 6 个阶段） | ✅ |
| Technology Stack（10 技能: Python, AI Dev, Prompt Eng, Claude Code, Git, RAG, SQL, RPA, Coze, Azure） | ✅ |
| Projects & Impact（Menglan World, Family Menu AI, Desktop AI Companion） | ✅ |
| Technical Capabilities | ✅ |
| Brand Information（Menglan, menglan.world, China, Remote/Shanghai） | ✅ |
| Contact Information（email, GitHub, LinkedIn, YouTube, WeChat, Portfolio） | ✅ |
| SEO（About title + description） | ✅ |
| Cloud Avatar | ✅ |
| Wave Animation（wave01-wave09） | ✅ |
| Education Island 纹理（uowyspa_ml.webp） | ✅ |
| Career Island 纹理（freelancewyspa_ml.webp） | ✅ |
| Skill Icons（10 个技能气球纹理，sketch + painted 共 20 张） | ✅ |
| Certificate 替换（MSdegree, MSdegree_1, CET6, RPAcertification） | ✅ |
| Journey Island 文字（Education + Career 动态文本） | ✅ |
| BALLOON_CONFIG 纹理路径更新 | ✅ |
| legacyAspects 映射更新 | ✅ |
| PROJECTS_DATA 证书集成 | ✅ |
| texturePreloadList 新纹理预加载 | ✅ |

---

## 冻结项（本次不处理，留给下一阶段）

| 冻结项 | 原因 | 处理阶段 |
|--------|------|---------|
| **MENGLAN 入口标识最终视觉效果** | V1.1.5 逐字母定位 + 不透明遮罩已实现技术方案，但手写字体（RubikScribble）的视觉协调性仍需设计师介入微调 | 视觉优化阶段 |
| **Projects VIEW 按钮内容** | 仍显示旧 ITom/Sanity 项目内容（SOTY/SOTD/SOTM/Certificates）。卡片标签已更正但内部内容未更新。等待 Menglan 品牌的项目截图和卡片纹理 | V2 图片层 |
| **contentData.js 27 条硬编码数据** | Studio Room 社交媒体内容仍为旧数据 | P2 品牌收尾 |
| **Gallery Room 项目卡片** | 仍使用旧 ITom 纹理 | V2 图片层 |
| **Studio Room 显示器内容** | 仍使用旧 ITom 纹理 | V2 图片层 |
| **Sanity CMS 动态内容** | CMS 数据管线已保留但暂停使用（V1.1.2 解耦） | V3 数据层 |

---

## 当前正在开发

**Phase 2.1 — 架构稳定化**（两个纯技术修复，已完成）

| 任务 | 内容 | 状态 |
|------|------|------|
| Task 1A | `useSanityData.js` `fetchPromise` 死锁修复（失败后可重试） | ✅ |
| Task 1B | `CORRIDOR_CLIP_Z` 合并为共享常量（SkyChunk 导出，InfiniteSkyManager 导入） | ✅ |

---

## 下一步任务

| 优先级 | 任务 | 阻塞因素 |
|--------|------|---------|
| **🟡 P2** | Phase 2.2 — ITom legacy 清理 | 无 |
| **🟡 P2** | `contentData.js` — 27 条硬编码 Studio 社交媒体数据替换 | 需要社交内容链接 |
| **🟡 P2** | `MessagePaper.jsx` — 允许域名更新 | 无 |
| **🟢 P3** | 代码注释清理（Experience, EntranceDoors 等） | 无 |
| **🟢 P3** | `AchievementsContext.jsx` — localStorage 键名 `itom_achievements` 迁移 | 无 |
| **🟢 P3** | `public/og-image.webp` + 品牌 favicon 替换 | 需要 OG 图片和 favicon |
| **🟢 P3** | About Room V2 — 替换项目卡片纹理 + 项目截图 | 等待 P3 素材 |
| **🔵 Future** | About Room V3 — Sanity CMS 动态内容接入 | 依赖 V1+V2 完成 |
| **🔵 Future** | About Room V3 — 自定义技能气球纹理优化 | 等待 P4 素材 |
| **🔵 Future** | Avatar 九帧动画重新制作 | 需要动画素材 |
| **🔵 Future** | EntranceDoors 门纹理重新设计 | 需要门纹理素材 |

## About Room 开发路线

```
V1 ✅ (文字/数据/素材层) → V2 (图片层) → V3 (数据层)
   已完成 ✅                 ← 下一阶段      未来
```

详见 `docs/ABOUT_CONTENT_PLAN.md`。

---

## 当前风险

| 风险 | 严重性 | 说明 |
|------|--------|------|
| P3 项目截图未到位 | 低 | 现有 SOTY/SOTD/SOTM 卡片纹理作为占位符正常工作，不阻塞功能 |
| 项目均为 "Coming Soon" | 低 | 项目卡片显示占位数据，等真实项目上线后更新 |
| Sanity 阻塞网站启动 | 🟢 已修复 | V1.1.2：完全解耦。Sanity API timeout (8s) + CDN 图片不再注册 DefaultLoadingManager + Preloader 2s 强制退出安全防护 |
| Sanity 图片 500 导致 Canvas 崩溃 | 🟢 已修复 | V1.1.3：Gallery/Studio 始终使用本地纹理，不再将 Sanity CDN URL 传递给 Three.js TextureLoader |
| 域名未验证 | 中 | `menglan.world` 实际 DNS/部署状态未确认 |
| 原 Tomasz 素材未删除 | 低 | 作为备份保留，不影响当前 UI |

---

## 最近更新时间

2026-08-13（Phase 2.1 Task 1 完成）
