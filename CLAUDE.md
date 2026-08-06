# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive 3D WebGL portfolio for Tomasz "ITom" Szmajda — an Awwwards/FWA-caliber creative developer portfolio. The user navigates a hand-drawn sketch-aesthetic infinite corridor with doors leading to 4 immersive rooms (Gallery, Studio, About, Contact). Built with React 19, React Three Fiber (R3F) 9.4, Three.js 0.182, GSAP 3.14, and Vite 7.2. All textures are custom hand-drawn artwork in `public/textures/`.

**Two npm projects in this repo:**
- **Root** (`/`): The main Vite + React + R3F application
- **Sanity Studio** (`/portfolio-itom/`): Sanity v3 CMS for content management (separate `package.json`)

## Complete Directory Structure

```
/
├── index.html                       # Vite entry HTML with SEO meta, Google Fonts, sr-only fallback
├── package.json                     # Dependencies + scripts
├── vite.config.js                   # Vite 7: React plugin, gzip compression, SEO plugin, Sanity CDN proxy
├── eslint.config.js                 # ESLint 9 flat config (JS recommended + React Hooks + React Refresh)
├── seo-plugin.js                    # Custom Vite build plugin: injects JSON-LD, meta tags, llms.txt from Sanity
├── CLAUDE.md                        # This file
├── README.md                        # Public-facing README
├── TODO.md                          # Task/todo list
│
├── functions/
│   └── sanity-cdn/[[catchall]].js   # Cloudflare Worker: proxy Sanity CDN with 1-year cache
│
├── scripts/                         # Build/optimization/fix utilities (14 scripts)
│   ├── optimize_textures.js         # General texture optimization
│   ├── optimize_about.js            # About room texture optimization
│   ├── optimize_clouds.js           # Cloud texture optimization
│   ├── optimize_contact.js          # Contact room texture optimization
│   ├── optimize_corridor_recursive.js
│   ├── optimize_gallery.js          # Gallery room texture optimization
│   ├── fix_awards_textures.js       # Fix/rename awards textures
│   ├── fix_quality.js               # Fix texture quality
│   ├── fix_textures_jimp.js         # Batch texture processing (Jimp)
│   ├── fix_textures_sharp.js        # Batch texture processing (Sharp)
│   ├── list_dims.js                 # List all texture dimensions
│   ├── upgrade_contact_quality.js   # Contact room texture quality upgrade
│   └── test_sharp.js                # Test Sharp library
│
├── src/
│   ├── main.jsx                     # React DOM entry, console branding signature
│   ├── App.jsx                      # Root: providers, Canvas config, texture preloading, lazy-loading
│   ├── App.css                      # Legacy Vite template styles (logo-spin keyframes)
│   ├── index.css                    # Legacy Vite template (root font, color-scheme)
│   │
│   ├── assets/
│   │   └── react.svg                # Default React SVG (unused placeholder)
│   │
│   ├── components/
│   │   ├── canvas/                  # ALL 3D WebGL/R3F components (31 files)
│   │   │   ├── Experience.jsx       # Main 3D scene orchestrator
│   │   │   │
│   │   │   ├── background/          # (Legacy/deprecated — not actively used)
│   │   │   │   ├── PaperBackground.jsx   # Paper-textured background environment
│   │   │   │   └── Tunnel.jsx            # Inverted cylinder tunnel effect
│   │   │   │
│   │   │   ├── corridor/            # Infinite Corridor system (15 files)
│   │   │   │   ├── InfiniteCorridorManager.jsx  # Master: sliding window segment management
│   │   │   │   ├── CorridorSegment.jsx          # Single segment (walls + doors + decorations + hero)
│   │   │   │   ├── CorridorWalls.jsx            # Sawtooth walls, floor tiles, ceiling, baseboards
│   │   │   │   ├── CorridorDecorations.jsx      # Lamps, picture frames, table, cabinet, tree, grates
│   │   │   │   ├── DoorSection.jsx              # MOST COMPLEX: door unit (wall+frame+door+room+audio)
│   │   │   │   ├── Door.jsx                     # Legacy simple door (used by entrance)
│   │   │   │   ├── SegmentDoors.jsx             # Auto-opening double doors at segment end
│   │   │   │   ├── LoopDoors.jsx                # Legacy double doors with loop callback
│   │   │   │   ├── RoomInterior.jsx             # Door→Room bridge (mini-corridor + room switch)
│   │   │   │   ├── RoomWarmup.jsx               # Off-screen shader pre-compilation during preloader
│   │   │   │   ├── TeleportRoom.jsx             # Camera positioning during teleport (null component)
│   │   │   │   ├── HeroText.jsx                 # "ITOM" + tagline with split effect
│   │   │   │   ├── Avatar.jsx                   # 9-frame boomerang animated character
│   │   │   │   ├── Doodles.jsx                  # Floating paper decorations (stars, thought bubble, etc.)
│   │   │   │   └── Corridor.jsx                 # Legacy simple corridor (replaced by CorridorWalls)
│   │   │   │
│   │   │   ├── entrance/              # Entry experience (3 files)
│   │   │   │   ├── EmptyCorridor.jsx           # Placeholder floor during entrance phase
│   │   │   │   ├── EntranceDoors.jsx           # Main entrance: double doors, bricks, cat, tree, bug, duck
│   │   │   │   └── SignSystem.jsx              # Hanging sign with wind-sway animation
│   │   │   │
│   │   │   ├── rooms/                 # Room interiors (4 rooms, 14+ files)
│   │   │   │   ├── About/
│   │   │   │   │   ├── AboutRoom.jsx            # Sky flying experience (momentum scroll, no GSAP)
│   │   │   │   │   ├── InfiniteSkyManager.jsx   # Infinite cloud chunks + story milestones
│   │   │   │   │   ├── SkyChunk.jsx             # 40-unit sky segment with procedural clouds
│   │   │   │   │   ├── PaperAirplane.jsx        # Low-poly origami airplane (BufferGeometry)
│   │   │   │   │   ├── StoryMilestone.jsx       # Career milestone markers
│   │   │   │   │   ├── fix_hover_stutter.cjs    # Performance fix script
│   │   │   │   │   ├── mobile_opt.cjs           # Mobile optimization config
│   │   │   │   │   └── mobile_opt2.cjs          # Mobile optimization v2
│   │   │   │   │
│   │   │   │   ├── Contact/
│   │   │   │   │   ├── ContactRoom.jsx          # Dock/pier with ocean waves, lighthouse, ship
│   │   │   │   │   ├── MessagePaper.jsx         # Interactive 3D paper form with HTML inputs
│   │   │   │   │   ├── SocialBarrel.jsx         # Clickable floating barrel with hover reveal
│   │   │   │   │   └── TornPaperGeometry.js     # Custom geometry: torn-edge paper plane
│   │   │   │   │
│   │   │   │   ├── Gallery/
│   │   │   │   │   ├── GalleryRoom.jsx          # Clothesline carousel with city backdrop
│   │   │   │   │   ├── GalleryClouds.jsx        # Drifting procedural cloud planes
│   │   │   │   │   ├── PaperMaterial.jsx        # Custom shader material (bend + wind + flip)
│   │   │   │   │   └── usePaintMaterial.js      # Hook: injects paint-reveal shader into any material
│   │   │   │   │
│   │   │   │   └── Studio/
│   │   │   │       ├── StudioRoom.jsx           # Infinite cylindrical monitor tower
│   │   │   │       ├── FloatingCodeParticles.jsx # Code-symbol particle system (Troika Text)
│   │   │   │       └── contentData.js           # 27 hardcoded content items (fallback data)
│   │   │   │
│   │   │   └── shaders/               # Custom GLSL shader materials (3 files)
│   │   │       ├── RevealMaterial.jsx           # Brush-stroke discard reveal + paint transition
│   │   │       ├── RevealBasicMaterial.jsx      # Simplified reveal (no paint support)
│   │   │       └── PaintRevealMaterial.jsx      # Blend-based reveal (sketch→painted)
│   │   │
│   │   ├── dom/                       # 2D DOM overlay components (2 files)
│   │   │   ├── Preloader.jsx                  # Loading screen with paper-tear exit animation
│   │   │   └── PaperTransition.jsx            # Full-screen paper close/open during teleport
│   │   │
│   │   └── ui/                        # 2D UI / HUD components (6 files)
│   │       ├── NavigationUI.jsx               # Hamburger menu, map overlay, room teleport, audio panel
│   │       ├── GlobalOverlay.jsx              # Torn-paper card overlay with typing text effect
│   │       ├── ScreenReaderOverlay.jsx        # Invisible accessible HTML navigation for SEO/a11y
│   │       ├── AudioControls.jsx              # Standalone volume slider + mute (not imported by Nav)
│   │       ├── AchievementsPanel.jsx          # Slide-out panel listing all achievements
│   │       └── AchievementPopup.jsx           # Toast notification for achievement unlock
│   │
│   ├── context/                      # React Context providers (global state) (4 files)
│   │   ├── SceneContext.jsx                  # Central nervous system: rooms, teleport, overlay
│   │   ├── AudioManager.jsx                  # Audio context: mute, volume, play(), active sounds
│   │   ├── PerformanceContext.jsx            # Device tiering: HIGH/MEDIUM/LOW with adaptive settings
│   │   └── AchievementsContext.jsx           # Tutorial/achievement system with localStorage + PostHog
│   │
│   ├── hooks/                        # Custom React hooks (6 files)
│   │   ├── useInfiniteCamera.js              # Scroll/parallax/glance camera for corridor
│   │   ├── useScrollCamera.js                # Simple scroll-based Z camera (legacy)
│   │   ├── useMouseParallax.js               # Mouse-driven parallax mutating camera directly
│   │   ├── useParallax.js                    # Generic parallax hook (returns React state)
│   │   ├── useDocumentMeta.js                # Virtual routing: History API, meta tags, deep linking
│   │   └── useSanityData.js                  # Sanity data fetch with module-level cache + pub/sub
│   │
│   ├── config/                       # Configuration files (2 files)
│   │   ├── texturePreloadList.js             # Master texture manifest with device-aware filtering
│   │   └── sanity.js                         # Sanity client: project kv5wjjmj, urlFor(), getProxyUrl()
│   │
│   ├── utils/                        # Utility modules (2 files)
│   │   ├── audioManager.js                   # Standalone BGM singleton (module-level Audio element)
│   │   └── deviceDetect.js                   # Device detection: mobile, touch, memory, CPU cores
│   │
│   └── styles/                       # SCSS stylesheets (11 files)
│       ├── main.scss                        # Entry point (imports variables, mixins, base, Preloader)
│       ├── _variables.scss                  # Design tokens (colors, fonts, breakpoints, spacing, z-index)
│       ├── _mixins.scss                     # Responsive mixins (mobile, tablet, desktop), flex, fullscreen
│       ├── _base.scss                       # CSS reset, @keyframes fadeIn/bounce, body typography
│       ├── Preloader.scss                   # Preloader screen (paper halves layout)
│       ├── NavigationUI.scss                # Map panel, audio panel, buttons, hints, menu overlay
│       ├── GlobalOverlay.scss               # @font-face declarations, overlay cards, custom scrollbar
│       ├── AudioControls.scss               # Custom range input styling (webkit + moz)
│       ├── AchievementPopup.scss            # Toast popup with enter/exit keyframes
│       ├── AchievementsPanel.scss           # Side panel with locked/unlocked states
│       └── ScreenReaderOverlay.scss         # .sr-only accessibility utilities
│
├── public/                          # Static assets (served at root)
│   ├── favico.png
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── og-image.webp
│   ├── _headers                          # Cloudflare custom HTTP headers
│   ├── _redirects                        # SPA fallback: /* /index.html 200
│   │
│   ├── cursors/                          # Custom cursor images
│   │   ├── cursor-default.webp
│   │   └── cursor-pointer.webp
│   │
│   ├── fonts/                            # Custom fonts (TTF)
│   │   ├── CabinSketch-Regular.ttf       # Primary UI font (hand-drawn sketch)
│   │   ├── CabinSketch-Bold.ttf
│   │   ├── FrederickatheGreat-Regular.ttf # Decorative title font
│   │   ├── RubikScribble-Regular.ttf     # Scribble font (HeroText)
│   │   └── SatisfySL.json               # Font metrics data
│   │
│   ├── images/                           # Standard image assets (for <img> tags)
│   │   ├── ink-splash.webp
│   │   ├── JSSREDNIBALON_painted.webp
│   │   ├── map.webp + map_*_painted.webp (5 map variants)
│   │   ├── pin.webp + pin-slot.webp
│   │
│   ├── sounds/                           # Audio files (MP3/OGG, Polish filenames)
│   │   ├── cfl_turningpages-belem-breeze-487596.ogg  # Background music
│   │   ├── baloonpoop.mp3                # Balloon pop sound
│   │   ├── papersound.mp3                # Paper rustling
│   │   ├── otwarciedrzwi.mp3             # Door opening
│   │   ├── uchyleniedrzwi.mp3            # Door ajar/squeak
│   │   ├── zamknieciedrzwi.mp3           # Door closing
│   │   ├── szummiasta.mp3                # City ambient (Gallery)
│   │   ├── szummonitorow.mp3             # Electronics hum (Studio)
│   │   ├── szummorza.mp3                 # Ocean waves (Contact)
│   │   └── szumwiatru.mp3                # Wind (About)
│   │
│   └── textures/                         # 3D textures (WebP format, 200+ files)
│       ├── paper-texture.webp            # Universal paper texture background
│       ├── doors/                        # Entrance door textures
│       ├── entrance/                     # Entrance scene textures (32 files + backups)
│       ├── corridor/                     # Corridor textures (42+ files + avatar_anim/ + decorations/ + doors/)
│       ├── about/                        # About room textures (26 files: balloons, awards, clouds)
│       ├── gallery/                      # Gallery textures (project cards, logos, scenery)
│       ├── contact/                      # Contact textures (molo, barrel, ship, lantern, form)
│       ├── clouds/                       # About room cloud textures (8 UUID-named files)
│       └── studio/                       # Studio textures (monitor/TV/phone faces)
│
└── portfolio-itom/                   # Sanity Studio v3 (separate npm project)
    ├── package.json
    ├── sanity.config.js                # Project kv5wjjmj, dataset production, Structure Tool
    ├── sanity.cli.js
    ├── eslint.config.mjs
    ├── static/.gitkeep
    └── schemaTypes/
        ├── index.js                    # Exports all 5 types
        ├── globalInfo.js               # Singleton: siteTitle, siteDescription, aboutMe, social URLs
        ├── galleryProject.js           # title, slug, url, description, frontImage, paintedImage, techStack
        ├── studioItem.js               # title, device, platform, description, url, front/painted textures
        ├── awardCertificate.js         # title, category (sotd/sotm/other), certificateImage, date, url
        └── faq.js                      # question, answer
```

## Commands

```bash
# Main app
npm run dev          # Vite dev server → localhost:5173
npm run build        # Production build (runs SEO plugin + compression)
npm run preview      # Preview production build
npm run lint         # ESLint (flat config, eslint.config.js)

# Sanity Studio (separate project)
cd portfolio-itom && npm run dev
```

## High-Level Architecture

### Entry & Initialization Sequence

1. **`main.jsx`** → renders `<App />` into `#root` with `<StrictMode>`, prints Awwwards console signature
2. **`App.jsx`** (Module Level): PostHog init, device detection (`isMobileDevice`, `isWeakCPU`, `isLowRAM`, `isSmallScreen`, `isLowEnd`, `supportsHover`), texture preloading via `useTexture.preload()` and `useLoader.preload(TextureLoader, ...)`, `Experience` lazy-loaded
3. **`App.jsx`** (Render): `PerformanceProvider` → `AchievementsProvider` → `AppContent` → `AudioProvider` → `SceneProvider` → `DocumentMetaBridge` + `GlobalAudioEnabler` + `Canvas` + `NavigationUI` + `GlobalOverlay` + `PaperTransition` + `ScreenReaderOverlay` + `Preloader`
4. **Sanity data fetch** is triggered at module level in `useSanityData.js` (`loadSanityData()` auto-executes on import) and also in `App.jsx` `useEffect`

### Context Architecture (State Management)

There are 4 React contexts — all singletons wrapping the app:

| Context | Responsibility |
|---------|---------------|
| **`SceneContext`** | Central nervous system. `currentRoom`, `hasEntered`, overlay content, **teleport state machine** (6 phases), deep linking URL sync |
| **`PerformanceContext`** | Adaptive device tier detection (HIGH/MEDIUM/LOW). Drives Canvas `dpr`, `antialias`, `shadows`. `PerformanceMonitor` from drei auto-downgrades on FPS drops |
| **`AudioContext`** | Global mute/volume with localStorage persistence. All active `Audio` instances stored in a ref — volume changes propagate to all |
| **`AchievementsContext`** | Tutorial hints + achievement unlocking with WebAudio chime, PostHog tracking, localStorage persistence |

### Complete App Initialization Sequence

```
Phase 1: main.jsx
  - Console branding signature
  - ReactDOM.createRoot renders <App /> in <StrictMode>

Phase 2: App.jsx MODULE LEVEL
  - PostHog init (VITE_POSTHOG_KEY, VITE_POSTHOG_HOST, person_profiles: 'identified_only')
  - Device detection (6 boolean flags)
  - Texture preloading: LOW_END → CORE_TEXTURES only; HIGH_END → PRELOAD_ALL + PRELOAD_LOADER
  - filterTexturesByDevice() filters _painted variants on touch devices
  - Experience component: lazy(() => import('./components/canvas/Experience'))

Phase 3: App.jsx RENDER TREE
  - PerformanceProvider → AchievementsProvider → AppContent
  - AppContent: AudioProvider → SceneProvider
  - DocumentMetaBridge (useDocumentMeta runs, deep-link check)
  - GlobalAudioEnabler (enables audio on first user interaction)
  - Canvas with tier-dependent dpr/antialias/shadows/powerPreference
  - PerformanceMonitor throttles on FPS decline (3 flipflops → downgradeTier)
  - Suspense → Experience (lazy)
  - Preload all (drei)

Phase 4: Experience.jsx MOUNTS
  - useInfiniteCamera: scroll/parallax disabled (hasEntered=false)
  - RoomWarmup: all 4 rooms at Y=-500 (off-screen)
  - EmptyCorridor + EntranceDoors + SignSystem (entrance scene)
  - InfiniteCorridorManager (segments [0,1], hide segment -1 doors)
  - TeleportRoom (returns null, waits for teleportPhase)

Phase 5: Sanity Data Loading (parallel)
  - App.jsx useEffect: loadSanityData() + preloadBrowserImage for IMAGE_ASSETS
  - 3 parallel GROQ queries (galleryProject, studioItem, awardCertificate)
  - Maps images through urlFor() → getProxyUrl() (CDN rewrite)
  - Preloads resulting texture URLs
  - Publishes to listeners → cache.loaded = true

Phase 6: Scene Ready → Preloader Complete
  - RoomWarmup detects Sanity data loaded → renders 3 frames
  - Calls gl.compileAsync(scene, camera) for shader pre-compilation
  - onWarmupComplete → setSceneReady(true)
  - Preloader plays exit animation → setIsLoaded(true)

Phase 7: User Interaction
  - Click entrance doors → GSAP fly-through → markEntered()
  - hasEntered=true: scroll/parallax enabled, entrance unmounts, tutorials start
  - Deep-link auto-teleport fires if applicable (300ms delay)
```

### Application Flow (User Journey)

```
Preloader → Entrance Doors → Infinite Corridor → Room Entry → Room Exit / Teleport
```

#### 1. Preloader Phase
- **`Preloader.jsx`** — 2D DOM overlay with paper-tear animation. Shows loading screen until `sceneReady` is true. Uses GSAP to animate a smooth progress tracker (not raw THREE.js progress). Exit sequence: paper halves tear apart (`xPercent: ±100`, `rotation: ±2`, 1.8s `power3.inOut`), opacity fades, then calls `onComplete`.
- **`RoomWarmup.jsx`** — While preloader shows, mounts all 4 rooms 500 units below the scene. Waits for Sanity data, then uses `gl.compileAsync()` (WebGL 2026 API) to pre-compile all shaders for 3 frames (1 on LOW). After warmup, calls `onWarmupComplete` → `onSceneReady`. On LOW tier devices, skips warmup entirely to prevent WebGL context loss.
- **Why this exists**: Without warmup, the first room entry would cause a visible stutter as Three.js compiles shaders. Mounting rooms off-screen forces compilation during the loading screen.

#### 2. Entrance Phase
- **`EmptyCorridor`** renders 5 floor segments (40 units each) that track the camera position
- **`EntranceDoors`** — the main double doors at Z=22 with brick facade, window (with peek-a-boo avatar that slides out on hover), cat with mouse-tracking pupils, rubber duck with speech bubble, animated bug with ink splash reveal, tree with swinging mouse, stone path floor
- **`SignSystem`** — hanging sign with nonlinear sinusoidal wind-sway animation
- During this phase, `InfiniteCorridorManager` hides segment -1's `SegmentDoors` (to avoid visual duplication with entrance doors) but keeps the corridor content preloaded
- Clicking entrance doors triggers a **GSAP camera fly-through animation** (camera moves forward through opening doors to z=11), then calls `markEntered()` which sets `hasEntered = true`

#### 3. Infinite Corridor (`InfiniteCorridorManager.jsx`)
- **3-segment sliding window**: Only current, previous, and next segments render. `useFrame` checks camera Z → calculates `currentSegment` → updates `activeSegments` state
- **`SegmentVisibilityWrapper`**: Each segment wrapper toggles `group.visible` based on camera Z — hides segments >30 units ahead or >5 units behind camera to reduce draw calls
- **Segment length**: 80 units. Segment 0 starts at Z=10, goes to Z=-70
- **Door positions per segment**: Gallery (Z=-18, left), Studio (Z=-32, right), About (Z=-48, left, `enterDistance: 25`), Contact (Z=-62, right)
- **Sawtooth walls**: Walls angle toward the camera. `WALL_ANGLE = atan2(1.8, 4)` ≈ 24°. Door sections tilt dynamically based on camera proximity (see DoorSection below)
- Each segment contains: `CorridorWalls` + `HeroText` + `Avatar` + `Doodles` + 4× `DoorSection` + `CorridorDecorations` + `SegmentDoors`

#### 4. DoorSection — The Most Complex Component
Each door is a self-contained unit (wall + door + frame + room interior). Key behaviors:

**Dynamic Tilt**: The wall tilts toward the camera based on proximity. `BASE_TILT = 0.02` (nearly flat) ramps to `MAX_TILT = WALL_ANGLE + 0.1` (≈27°) when camera is within 3 units. Trigonometric scale correction (`exactScale = DOOR_Z_SPAN / (WALL_LENGTH * sin(angle))`) keeps the Z-projection constant.

**Hover → Paint Reveal**: The door sketch texture uses `<revealMaterial>` (custom shader that discards pixels with noisy brush-stroke edges based on `uProgress` uniform). On hover, `uProgress` animates from 0→1 via GSAP (0.8s `power2.out`), revealing the colored `_painted` texture behind. Door slightly opens (`y: ±0.15`, 0.3s) and handle rotates (`z: ±0.1`, 0.2s). On touch devices, painted textures are replaced with a 1×1 transparent GIF to save memory.

**Click → Room Entry Sequence**:
1. Camera override → locks `useInfiniteCamera` out
2. Save camera state (for ESC exit)
3. Tilt locks at MAX_TILT
4. GSAP animates camera to door-aligned position + rotation (1.0s `power2.inOut`; 0.01s for fast teleport)
5. Sets `shouldRenderRoom = true` → lazy-loads room component
6. Waits for room's `onReady()` callback (or 8s timeout fallback)
7. Opens door: handle rotates (`z: ±0.4`, 0.15s `power2.out`), door swings (`y: ±PI*0.6`, 0.7s `power2.out`), camera flies through (1.5s `power2.inOut`)
8. After 250ms delay, calls `enterRoom(doorId)` → updates SceneContext → triggers URL change

**Exit (ESC or back button)**: True reverse animation — 2 phases:
1. Phase A: Camera walks backward to door alignment position + rotation (1.5s `power2.inOut`)
2. Phase B: Camera returns to original corridor position + rotation (1.0s `power2.inOut`)
3. Door closes (0.6s `power2.in`), then `setCameraOverride(false)` releases control

**Auto-click (teleport arrival)**: When `pendingDoorClick` matches this door's ID and segment is 0, `handleClick` fires automatically with `isTeleport: true` flag for ultra-fast animations

#### 5. Teleport System (Multi-Phase State Machine)

Managed by `SceneContext` (6 phases), executed by `TeleportRoom` + `PaperTransition` + `DoorSection`:

```
teleportTo(roomId)
  → phase: 'closing'  → PaperTransition closes (paper halves slide together, 0.8s power2.inOut)
  → phase: 'teleporting' → TeleportRoom sets camera to door Z + 8, resets rotation
  → completeTeleport() → sets pendingDoorClick, opens door immediately (fast mode)
  → DoorSection.handleClick(isTeleport: true) → ultra-fast animations (0.01s durations)
  → signalRoomReady() → phase: 'opening' → PaperTransition opens (paper tears apart, 1.2s power3.inOut)
```

During fast teleport, the paper stays closed throughout — the user sees paper close, then open at the new room. All intermediate animations run at 0.01s duration behind the closed paper.

### Camera System (`useInfiniteCamera`)

Only active when `hasEntered && !isTeleporting && !isInRoom`. Otherwise, GSAP (DoorSection) or TeleportRoom owns the camera.

- **Scroll**: GSAP `Observer` normalizes wheel + touch + pointer events → updates `targetZ` → lerp smoothed (factor 0.035) → `camera.position.z`
- **Parallax**: Mouse position normalized to [-1, 1] → `targetParallax` → smoothed → `camera.position.x/y`. Mobile uses gyroscope (`DeviceOrientationEvent`) with iOS 13+ permission flow
- **Auto-glance**: Proximity-based door glance. Pre-computed `DOOR_POSITIONS` array checked each frame with a distance curve (START_DIST=15, PEAK_DIST=8, END_DIST=-2). Camera Y-rotates toward the nearest door with eased intensity. Dynamic lerp: slow to engage (0.03), fast to release (0.08)
- **Keyboard**: Arrow keys scroll, left/right glance, PageUp/PageDown fast-scroll, Spacebar
- **Swipe glance (mobile)**: Horizontal touch delta (deltaX) mapped to `targetSwipeGlance`, clamped at ±0.26 rad (~15°)
- **Camera override mechanism**: `setCameraOverride(true)` prevents the hook from touching camera. On release (`false`), state syncs from current camera position + blend-in phase (30 frames of smooth rotation interpolation) to prevent snapping
- **`gsap.killTweensOf(camera.position)`** called when scroll re-enables to clear any residual GSAP camera animations

**Camera Position Formula (in useFrame):**
```js
camera.position.z = currentZ                              // scroll
camera.position.x = parallax.x                            // mouse/gyro
camera.position.y = 0.2 + parallax.y                      // mouse/gyro + base height
camera.lookAt(
  parallax.x * 0.3 + glanceOffset * 3 + swipeGlance * 4,  // lookX
  0.13 + parallax.y,                                       // lookY
  currentZ - 10                                            // lookZ (ahead)
)
```

### Performance System (`PerformanceContext`)

| Tier | Detection | dpr | Shadows | Antialias | Particle Count |
|------|-----------|-----|---------|-----------|----------------|
| **HIGH** | Desktop, >4 cores, >4GB RAM | [1, 2] | true | true | 100% |
| **MEDIUM** | Mobile OR ≤4 cores | [1, 1.5] | false | true | 60% |
| **LOW** | Mobile + ≤4 cores OR ≤4GB RAM | [0.8, 1] | false | false | 30% |

Runtime degradation: Drei's `<PerformanceMonitor>` calls `downgradeTier()` on FPS decline (3 flipflops threshold), stepping HIGH→MEDIUM→LOW (one-way).

### Texture Preloading Strategy

Module-level preloading in `App.jsx` — NOT inside components:

- **`PRELOAD_ALL`** (via `useTexture.preload`): Entrance, corridor, UI, gallery, contact, image assets (~200+ textures)
- **`PRELOAD_LOADER`** (via `useLoader.preload(TextureLoader, ...)`): About, studio textures (~80+ textures)
- **`filterTexturesByDevice(list, supportsHover)`**: On touch-only devices (no hover), excludes all `_painted` texture variants to reduce GPU memory. On desktop (`hover: hover`), both standard and painted load. Always keeps the standard version even when painted exists (both variants needed for reveal shader)
- **Browser-level preloading**: `new Image().src = path` for standard `<img>` assets (map overlays, avatar images)

## Shader System

All custom materials use Three.js's `onBeforeCompile` hook to inject custom GLSL at runtime.

### RevealMaterial (`src/components/canvas/shaders/RevealMaterial.jsx`)
- **Extends**: `THREE.MeshBasicMaterial`
- **R3F tag**: `<revealMaterial>`
- **Primary mode — Brush-stroke discard** (UV-space, driven by `uProgress` 0→1):
  - Discards sketch pixels from bottom-to-top using: `(1.0 - vMapUv.y) + hashNoise(vMapUv * 15.0) * 0.15 < uProgress * 1.5`
  - Reveals a separate `meshBasicMaterial` mesh (painted version) behind it
  - Used on doors, handles, picture frames, balloons, barrels
- **Secondary mode — Paint transition** (world-space, when `paintUniforms` are set):
  - Discards pixels based on 3D world position relative to `uRoomOrigin` + configurable direction vector
  - `uPaintProgress` drives a wave front through the room with noise-modulated edges
  - Glow effect on boundary pixels (blue-tinted RGB when `boundary < 2.0` and `uPaintProgress < 0.999`)
  - `customProgramCacheKey()` returns `'RevealMaterial_v3_paint'` vs `'RevealMaterial_v3'` for program isolation
- **Key detail**: Color/lighting remains 100% standard MeshBasicMaterial; only alpha discard is modified

### RevealBasicMaterial (`src/components/canvas/shaders/RevealBasicMaterial.jsx`)
- **Extends**: `THREE.MeshBasicMaterial`
- **R3F tag**: `<revealBasicMaterial>`
- Same brush-stroke discard logic as RevealMaterial but **without paint transition support**
- Used for About room elements (balloons, award cards) that don't need room-level paint transitions
- Separate `customProgramCacheKey` for shader program isolation

### PaintRevealMaterial (`src/components/canvas/shaders/PaintRevealMaterial.jsx`)
- **Extends**: `THREE.MeshBasicMaterial`
- **R3F tag**: `<paintRevealMaterial>`
- **Blends** between sketch (`map`) and painted (`uMapPainted`) textures using noise mask (instead of discarding)
- Injects into `map_fragment` to replace `diffuseColor` with `paintedColor` based on `uProgress`
- Used on Gallery cards for hover paint reveal

### PaperMaterial (`src/components/canvas/rooms/Gallery/PaperMaterial.jsx`)
- **ForwardRef component** wrapping `meshBasicMaterial` with extensive `onBeforeCompile` shader injection
- **Vertex shader**: Adds `uBend` (Y² parabolic bend), `uWindStrength` + `uTime` flutter on Z
- **Fragment shader**: Dual-sided textures (`map` front, `mapBack` back with Y flip), brush-stroke blend with `mapPainted`, paint transition with glow edge
- **Imperative API via ref**: `.bend`, `.windStrength`, `.uProgress` (getter/setter updating underlying shader uniforms)
- Used on Gallery project cards hanging from clothesline

### usePaintMaterial (`src/components/canvas/rooms/Gallery/usePaintMaterial.js`)
- **Hook** returning an `onBeforeCompile` callback for injecting paint-reveal into ANY `MeshBasicMaterial`
- Returns: `{ onBeforeCompile, uniformsData, animatePaint(delay, duration), resetPaint(), updateRoomOrigin(groupRef), transparent, needsUpdate }`
- `animatePaint(delay, duration)`: GSAP tweens `uPaintProgress` from 0→1 (2.5s `power2.inOut`, 0.2s delay)
- `updateRoomOrigin(groupRef)`: Sets `uRoomOrigin` from group world position
- Configurable via `paintConfig`: `dirX/Y/Z`, `startDist/endDist`, `noiseAxes`
- Special case: `dirX: 1.0` for Contact room (right-side doors, opposite to Gallery's left-side `dirX: -1.0`)

### Common Shader Patterns
- All use **value noise** (hash-based 2D noise), not Perlin/Simplex — efficient for alpha discard
- `customProgramCacheKey()` returns unique strings per shader configuration — prevents Three.js from reusing incompatible compiled programs
- All register via `extend()` for R3F JSX tag syntax (`<revealMaterial ... />`)

## Complete Context API Reference

### SceneContext (`src/context/SceneContext.jsx`)

**Full State:**

| State Variable | Type | Default | Purpose |
|---|---|---|---|
| `currentRoom` | `string \| null` | `null` | Active room ID (`'about'`, `'gallery'`, `'studio'`, `'contact'`, or `null` = corridor) |
| `hasEntered` | `boolean` | `false` | Has user clicked entrance doors? Gates corridor visibility and scroll |
| `exitRequested` | `boolean` | `false` | Signal from UI back button to DoorSection to trigger exit animation |
| `overlayContent` | `object \| null` | `null` | Content for GlobalOverlay (Studio monitor detail, certificate view) |
| `teleportTarget` | `string \| null` | `null` | Room ID to teleport to |
| `isTeleporting` | `boolean` | `false` | Active teleport in progress |
| `teleportPhase` | `'closing' \| 'teleporting' \| 'opening' \| null` | `null` | Current phase of teleport state machine |
| `pendingDoorClick` | `string \| null` | `null` | Door label to auto-click after teleport camera positions |
| `isFastTeleport` | `boolean` | `false` | Fast teleport mode (all animations at 0.01s, paper stays closed) |

**All Actions:**

| Action | Purpose |
|---|---|
| `enterRoom(roomId)` | Called by DoorSection after camera flies through door — sets currentRoom |
| `exitRoom()` | Called after DoorSection close animation — clears currentRoom |
| `requestExit()` | NavigationUI back button triggers this — sets exitRequested |
| `clearExitRequest()` | DoorSection clears after handling exit |
| `markEntered()` | EntranceDoors calls after opening — sets hasEntered=true |
| `openOverlay(content)` | Opens GlobalOverlay with content |
| `closeOverlay()` | Closes overlay |
| `teleportTo(roomId)` | Initiates teleport from map UI or deep link |
| `startTeleportTransition()` | PaperTransition calls when paper finishes closing |
| `openTeleportTransition()` | TeleportRoom calls after camera is positioned (normal mode) |
| `completeTeleport()` | Sets pendingDoorClick to trigger auto door click |
| `signalRoomReady()` | DoorSection calls after fast-teleport entry — opens paper |
| `finishPaperOpen()` | PaperTransition calls when opening completes |
| `cancelTeleport()` | Error recovery — resets all teleport state |

**Derived Computed Value**: `isInRoom: currentRoom !== null`

### AudioContext (`src/context/AudioManager.jsx`)

| State/Export | Type | Purpose |
|---|---|---|
| `isMuted` | boolean | From localStorage `audio_muted`, persisted |
| `globalVolume` | float 0..1 | From localStorage `audio_volume`, default 0.5, persisted |
| `audioEnabled` | boolean | Flips to true on first user interaction (via GlobalAudioEnabler) |
| `play(soundName, {loop, volume})` | function | Creates `new Audio(path)`, applies global mute/volume, returns `{stop, fade}` |
| `toggleMute()` | function | Toggles isMuted, persists to localStorage |
| `setGlobalVolume(v)` | function | Sets globalVolume, persists to localStorage, auto-unmutes if volume > 0 |
| `enableAudio()` | function | Called by GlobalAudioEnabler on first user interaction |

**5 hardcoded sounds**: `szumwiatru`, `szummiasta`, `uchyleniedrzwi`, `otwarciedrzwi`, `zamknieciedrzwi`
**Active sounds tracking**: `activeSounds` ref stores all playing `Audio` instances — volume/mute changes propagate to all via useEffect

**Separate BGM module** (`src/utils/audioManager.js`): Module-level singleton using `new Audio()` + `CustomEvent('musicVolumeChanged')` for UI sync. Not React state.

### AchievementsContext (`src/context/AchievementsContext.jsx`)

**6 Achievements:**

| ID | Title | Label |
|---|---|---|
| `corridor_enter` | Explorer | Click a door to enter |
| `corridor_explore` | Wanderer | Scroll to explore the corridor |
| `about_fly` | Sky Walker | Scroll to fly through my story |
| `studio_interact` | Director | Drag to rotate and browse |
| `gallery_inspect` | Art Critic | Click project to inspect |
| `contact_choose` | Sociable | Find a contact method |

**State**: `completed` (array of IDs, from localStorage `itom_achievements`), `activePopup` (`{id, status: 'pending'|'completed'|'hiding'}`)

**Key behaviors**:
- `corridor_enter` is filtered OUT of localStorage (always shows on fresh visit)
- `completedRef` (useRef) prevents double-fire on rapid events (wheel scroll ticks)
- PostHog: `posthog.capture('achievement_unlocked', {achievement_id, achievement_title})`
- WebAudio chime: oscillator frequency sweep A4→E5 (440→659.25Hz) with gain envelope

## Routing & Deep Linking

### Virtual Routing (`useDocumentMeta.js`)

The app uses **History API** (not react-router) for virtual routing. URL changes happen as users navigate rooms in 3D space:

| Path | Room | Title |
|---|---|---|
| `/` | `null` (corridor) | ITom — Creative 3D Portfolio |
| `/about` | `about` | About Me — ITom Portfolio |
| `/gallery` | `gallery` | Gallery & Projects — ITom Portfolio |
| `/studio` | `studio` | Studio — ITom Portfolio |
| `/contact` | `contact` | Contact — ITom Portfolio |

**How it works:**
1. **`getInitialRoomFromUrl()`**: Parses `window.location.pathname` on startup, returns room ID
2. **On room change**: Updates `document.title`, `<meta description>`, OG tags, `<link canonical>` → `history.replaceState` (first load) or `history.pushState`
3. **On popstate** (back/forward): Reads `event.state?.room`, calls `teleportTo(targetRoom)` if user has entered
4. **`DocumentMetaBridge`**: In `App.jsx`, after `sceneReady && hasEntered && !deeplinkHandled`, auto-teleports to `initialRoom` after 300ms delay
5. **SPA fallback**: `public/_redirects` — `/* /index.html 200` — serves index.html for all paths

## Data Structures & Sanity CMS

### Sanity Client (`src/config/sanity.js`)
- Project: `kv5wjjmj`, Dataset: `production`, CDN mode (`useCdn: true`), API version `2024-03-01`
- `urlFor(source)`: Builds Sanity image URL with chained transformations
- `getProxyUrl(builder)`: Rewrites `https://cdn.sanity.io` → `/sanity-cdn` (same-origin proxy via Cloudflare Worker)

### Sanity Schemas (`portfolio-itom/schemaTypes/`)

**`galleryProject`**: title, slug, url, seoTitle, seoDescription, description, frontImage (image+hotspot), paintedImage (image+hotspot), techStack (array of 10 predefined options: React/HTML/CSS/JS/Tailwind/Firebase/Netlify/WordPress/Elementor/PHP)

**`studioItem`**: title, device ('phone'|'tv'|'monitor'), platform ('youtube'|'tiktok'|'instagram'|'x'|'linkedin'|'codrops'|'blog'), description, url, seoTitle, seoDescription, frontTexture, paintedFrontTexture, date, conditional fields (views/likes/duration/readTime based on platform)

**`awardCertificate`**: title, category ('sotd'|'sotm'|'other'), seoTitle, seoDescription, certificateImage, date, url

**`globalInfo`**: Singleton document. siteTitle, siteDescription, aboutMe, githubUrl, linkedinUrl, xUrl, instagramUrl, tiktokUrl, youtubeUrl

**`faq`**: question, answer

### Data Loading (`src/hooks/useSanityData.js`)
- **Module-level cache** + **pub/sub pattern**: `cache = {projects, content, awards, loading, loaded, error}`, `listeners = new Set()`, `fetchPromise` for dedup
- `loadSanityData()` auto-fires at module level and in App.jsx useEffect
- Fetches 3 parallel GROQ queries, maps images through `urlFor()` → `getProxyUrl()`, preloads textures
- Three subscribe hooks: `useGalleryProjects()`, `useStudioContent()`, `useAwards()`
- Returns mapped shapes with `front`, `painted`, `frontTexture`, `paintedFrontTexture`, `techStack[]`

### Hardcoded Fallback Data
- **`contentData.js`** (Studio): 27 items (8 YouTube + 8 blog + 11 TikTok) in `RAW_CONTENT_DATA`. `PLATFORM_CONFIG` maps platform→color/icon/shape. `CONTENT_DATA` assigns fallback textures for null entries.
- **`InfiniteSkyManager.jsx`** (Awards): Hardcoded certificate data when Sanity returns empty awards

### Texture Preloading Manifest (`src/config/texturePreloadList.js`)
Organized into named exports: `ENTRANCE_TEXTURES` (32), `CORRIDOR_TEXTURES` (42), `UI_TEXTURES` (9 avatar frames), `IMAGE_ASSETS` (9 browser images), `GALLERY_TEXTURES`, `ABOUT_TEXTURES` (26), `CONTACT_TEXTURES` (8), `STUDIO_TEXTURES` (16)
- `PRELOAD_ALL`: Entrance + Corridor + UI + Gallery + Contact + Image Assets
- `PRELOAD_LOADER`: About + Studio (via TextureLoader)
- `filterTexturesByDevice(list, usePainted)`: Strips `_painted` variants on touch devices

## CSS / SCSS Design System

### Architecture
- Entry: `src/styles/main.scss` imports `_variables` → `_mixins` → `_base` → `Preloader`
- Each component SCSS is imported directly in its JSX component (not via main.scss)
- Uses **Sass variables** (not CSS custom properties) compiled at build time

### Design Tokens (`_variables.scss`)

| Token | Value |
|---|---|
| `$color-white` | `#ffffff` |
| `$color-off-white` | `#fafafa` (background) |
| `$color-black` | `#1a1a1a` (lines/ink) |
| `$color-paper` | `#e0e0e0` (material base) |
| `$font-primary` | Inter (300-700) |
| `$font-title` | Gloria Hallelujah |
| `$font-handwritten` | Caveat (400-700) |
| `$transition-fast` | 0.2s |
| `$transition-normal` | 0.4s |
| `$transition-slow` | 0.8s |

### Responsive Breakpoints
- Mobile: ≤767px, Tablet: 768-1023px, Desktop: ≥1024px, Wide: ≥1440px
- Hardcoded `@media (max-width: 768px)` and `(max-width: 480px)` also used in component SCSS

### Font System
- **Google Fonts**: Caveat, Gloria Hallelujah, Inter (loaded in index.html)
- **Local @font-face** (in GlobalOverlay.scss): CabinSketch Bold/Regular, Fredericka the Great, Rubik Scribble
- **Inline font preload** (App.jsx): Inter woff2 from gstatic
- All local fonts are TTF format in `/public/fonts/`

### Torn Paper Aesthetic
The defining visual signature, implemented across multiple layers:
1. **clip-path polygons**: 50+ vertex jagged edges on preloader halves, buttons, cards, panels
2. **Paper texture background**: `url('/textures/paper-texture.webp')` on `::before` pseudo-elements
3. **Inline SVG borders**: Hardcoded SVG data URIs as `::after` pseudo-elements tracing the clip-path with black stroke
4. **Programmatic tear generation**: Preloader and PaperTransition use seeded 12-segment random paths
5. **3D torn geometry** (`TornPaperGeometry.js`): Vertex-displaced `PlaneGeometry` (2.5× left-edge tear, subtle warp)
6. **CSS `mix-blend-mode: multiply`**: Text over paper looks ink-on-paper (preloader percentage text)

## GSAP Animation System

### Overview
- **GSAP 3.14.2** with `Observer` (from `gsap/all`) and `TextPlugin` (from `gsap/TextPlugin`)
- No `ScrollTrigger`, no `Flip` plugin, no `gsap.context()` used
- All animations are direct `gsap.to()`, `fromTo()`, `timeline()`, `set()`, `delayedCall()`, `killTweensOf()`

### Easing Functions Used

| Easing | Primary Use Cases |
|---|---|
| `power2.out` | Door hover, brush reveal, card close — MOST USED |
| `power2.inOut` | Camera fly-through, door open, card scroll |
| `power2.in` | Door close, reverse reveal |
| `power3.inOut` | Paper tear apart, card final position |
| `power3.out` | Card drop back to clothesline |
| `power1.inOut` | Card flip rotation |
| `sine.inOut` / `sine.out` | Card scale animations |
| `back.out(1.7)` | Ink splash scale, duck speech bubble — overshoot elastic |
| `'none'` | Fast teleport mode (0.01s duration) |
| `'none'` (TextPlugin) | Typewriter effect — uniform speed |

### Brush Reveal Pattern (repeated in 6+ components)
```js
// Hover enter
gsap.to(materialRef, { uProgress: 1.0, duration: 0.8, ease: 'power2.out', overwrite: true })
// Hover leave
gsap.to(materialRef, { uProgress: 0.0, duration: 0.5, ease: 'power2.out', overwrite: true })
// Painted layer delayed toggle
gsap.delayedCall(0.55, () => { paintedRef.visible = false })
```
Always uses `overwrite: true` to prevent race conditions.

### Door Hover Pattern
```js
gsap.to(doorRef.rotation, { y: ±0.15, duration: 0.3, ease: 'power2.out' })  // enter
gsap.to(doorRef.rotation, { y: 0, duration: 0.3, ease: 'power2.out' })      // leave
```

### Camera Fly-Through Pattern (DoorSection entry)
```
Phase A — Align: gsap.to(camera.position + rotationProxy → door position, 1.0s power2.inOut)
Phase B — Enter: gsap.to(handle → z:±0.4, 0.15s) || gsap.to(door → y:±PI*0.6, 0.7s)
                  gsap.to(camera.position → inside room, 1.5s power2.inOut)
```

### Camera Override Pattern
1. Call `setCameraOverride(true)` → disables `useInfiniteCamera.useFrame()`
2. GSAP tweens directly on `camera.position` and `camera.rotation` (via rotation proxy)
3. On complete: `setCameraOverride(false)` → syncs hook state + 30-frame blend-in

### Gallery Card Flip (most complex timeline)
```
gsap.timeline():
  card rotation reset (0.3s)
  → lift from clothespin (y-0.5, 0.15s) || rotate (x:0.5, 0.15s) || bend (0.8, 0.15s)
  → rise up (y+1.5, 0.4s) || flip (x:PI*0.8, 0.4s) || bend (-0.3, 0.4s)
  → center position (0.4s) || final flip (x:PI, 0.4s) || bend (0, 0.5s)
  → scale up (1.1, 0.3s)
```
Total: ~1.4s. Bend uniform creates paper curling effect during flip.

## Room-Specific Architecture

### Gallery Room
- **Concept**: Projects hanging on a clothesline over a balcony with city skyline backdrop
- **Infinite scroll**: `PROJECT_COUNT=10` cards wrap using modulo on a `CatmullRomCurve3`. Cards fade/scale based on distance from center. `gsap.to(scroll, 0.5s)` for snap-to-card scrolling
- **Card flip**: GSAP timeline — card lifts from clothespin, rotates 180°, scales up. Back shows description + tech stack logos + "OPEN PROJECT" button. Front/rear text follows card curvature via `PaperMaterial` bend uniform
- **Card hover**: `PaintRevealMaterial` blends sketch→painted (0.8s `power2.out`), only desktop (`matchMedia('(hover: hover)')`)
- **Scenery**: floor (trapezoid shape), railing, houses (center + mirrored), city skyline (center + mirrored), flying bird with Flappy-Bird-like physics (gravity + periodic jump), 65 clouds, sky sphere
- **Scroll**: GSAP Observer on window for unified wheel/touch/pointer → `targetScroll` ref → lerp in useFrame (`delta * 5`)
- **Data**: Falls back to `FALLBACK_PROJECTS` hardcoded data when Sanity returns empty
- **Audio**: `szummiasta.mp3` (city ambient) via `PositionalAudio`

### Studio Room
- **Concept**: Infinite cylindrical tower of monitors/TVs/phones falling downward
- **Content**: 48+ items (12 rings × 4 monitors) with seamless modulo cycling. Data from Sanity with fallback to 27 hardcoded items
- **Interaction**: Drag to rotate tower horizontally (+ inertia/auto-rotation), scroll to control fall speed. Click a monitor to zoom in + open `GlobalOverlay`
- **Infinite loop**: Monitors teleport to top when falling below Y=-10. Direct `ref.current.position.y` mutation (no React state)
- **3 device shapes**: Monitor (blog, 1.6×1×0.15), TV (YouTube, 1.6×1.187×1.0), Phone (TikTok, 0.6×1.139×0.1)
- **6-face reveal per monitor**: Each face uses `<revealMaterial>` with sketch/painted pair. Hover animates all 6 face `uProgress` refs simultaneously
- **FloatingCodeParticles**: 60 2D text particles using Troika Text (code symbols: `{/}`, `</>`, `=>`, `&&`, `01`, `0101`, etc.) with tower-rotation parallax
- **Responsive params**: zoom distance, pan offsets, tower radius differ for mobile/tablet/desktop
- **Paint transition**: Top-to-bottom direction (dirY: -1.0, noiseAxes: 'xz')
- **Audio**: `szummonitorow.mp3` (electronics hum)

### About Room
- **Concept**: Flying through sky with clouds, paper airplane, and story milestones
- **Momentum-based scroll**: `window.addEventListener('wheel')` accumulates `scrollVelocity`, decays with friction (×0.95/frame). No clamping — can fly backward. **No GSAP used at all** in this room.
- **Flight effect**: Camera banks (Z-rotation) and pitches (X-rotation) in a sinusoidal pattern based on `scrollPosition % CHUNK_LENGTH`. Smooth lerp. Paper airplane mesh follows camera rotation
- **`InfiniteSkyManager`** + **`SkyChunk`**: 5 visible sky chunks of `CHUNK_LENGTH=40` units, cycled when camera passes through. Each chunk has 15-23 procedural clouds + 4 story milestone types:
  - **IntroMilestone**: Name, avatar on cloud, motto text (elements spread apart with maxSpread=15)
  - **AwardsMilestone**: SOTD/SOTM/SOTY floating cards with brush-stroke reveal + VIEW buttons → overlay
  - **JourneyMilestone**: Two floating islands (UO + Freelance) that bob up from below clouds
  - **SkillsMilestone**: 10 skill balloons (React, Three.js, GSAP, JS, CSS, Next.js, HTML, Git, Figma, Firebase) in 3 sizes. Pop on click with audio, respawn from below. Hover shows painted version
- **Paper airplane**: Low-poly origami style — hand-built `BufferGeometry` with 12 vertices + triangle indices + `Edges` outline
- **Hard clipping**: `CORRIDOR_CLIP_Z = -8.0` prevents sky content from bleeding into corridor
- **Force frustum culling off during warmup**: Traverses all meshes for first 25 frames, then restores culling
- **Audio**: `szumwiatru.mp3` (wind) via `PositionalAudio`

### Contact Room
- **Concept**: Dock/pier over animated ocean waves with social media barrels and message paper
- **Wave layers**: 4 ocean planes with sinusoidal Y-offset animation, decreasing opacity per layer
- **Social barrels**: LinkedIn, GitHub, Facebook, Instagram, Message — each opens external link or triggers mailto. Each barrel has: sine-wave floating (`sin(time * 0.8) * 0.15`), horizontal drift (`sin(time * 0.4) * 0.2`), rotation (`sin(time * 0.6) * 0.05`), hover scale lerp to 1.1, and brush-stroke paint reveal on hover
- **Message paper**: `MessagePaper.jsx` — 3D paper form with hidden HTML inputs (`<Html>` from drei) for keyboard capture. Text rendered with `<Text>` component. Wrapped in `TornPaperGeometry` for notebook-tear edge effect
- **Ship animation**: Bobs on waves (Y) + sails horizontally (X) + slight roll (Z)
- **Camera**: Rotation order changed to 'YXZ' on mount (for proper head-nod), restored to 'XYZ' on unmount. Phase state machine: ENTERING→LOOKING_DOWN→WRITING→ROLLING→HOLDING→THROWING→DONE
- **Paint transition**: Right-to-left direction (`dirX: 1.0`) — Contact is on right side of corridor
- **Audio**: `szummorza.mp3` (ocean waves) via `PositionalAudio`

## Room Component Contract

All 4 rooms receive the same props from `RoomInterior`:

```jsx
<RoomComponent
  showRoom={boolean}    // Room is fully visible (camera inside)
  onReady={callback}    // Room MUST call this when loaded → triggers door open
  isExiting={boolean}   // Exit animation in progress — room should stop all camera control
  isWarmup={boolean}    // Mounted in RoomWarmup 500 units below — skip audio, skip animations
/>
```

**Room readiness pattern**: Each room counts rendered frames in `useFrame` (typically 5-25 frames), then calls `onReady()`. This ensures GPU has actually drawn the content before the door opens. During warmup (`isWarmup=true`), rooms skip audio, ambient sounds, and tutorial popups.

## Key Implementation Patterns & Gotchas

- **No `new THREE.Vector3()` in `useFrame`**: Pre-allocated module-level constants (`_tempScale` in GalleryRoom, module-level vectors in `useInfiniteCamera`). Was a known memory churn issue in `InfiniteSkyManager`, `SkyChunk`
- **`useTexture.preload()` is called at module scope**, not inside components — it uses Drei's internal preload cache
- **Refs for continuous values in `useFrame`**: Studio room uses `particleTowerRotation` and `particleFallOffset` as refs (not state) to pass values to `FloatingCodeParticles` without triggering re-renders. Gallery uses `currentScroll` ref for the same reason.
- **Direct `ref.current.position.y` mutation**: Corridor `SegmentVisibilityWrapper` and Studio `MonitorBlock` positions are set imperatively in `useFrame` — bypasses React
- **Rotation proxy objects**: DoorSection uses plain `{x:0, y:0, z:0}` objects as GSAP targets, with `onUpdate` setting `camera.rotation` — prevents GSAP/R3F conflict on camera.rotation
- **`customProgramCacheKey()`** on shader materials: Returns different strings for different shader configurations (e.g., `'RevealMaterial_v3'` vs `'RevealMaterial_v3_paint'`) to prevent Three.js from reusing incompatible compiled shader programs
- **Texture cloning for independent repeat/offset**: Wall/baseboard textures are cloned (`texture.clone()`) so each mesh can have independent wrapping without affecting others sharing the same source texture
- **`gl.compileAsync()`** is a 2026 WebGL API — fallback to sync `gl.compile()` on older browsers
- **GSAP `Observer`** is used for unified scroll/touch/pointer input (not direct event listeners) in Gallery and Corridor
- **`inert` attribute** on closed panels for accessibility — prevents Tab from reaching hidden controls
- **The `portfolio-itom/` subfolder** is a separate Sanity Studio v3 project — do not run its commands from root
- **All rooms handle `isWarmup` prop**: Skip audio, tutorials, and paint animations when mounted just for shader compilation
- **Teleport saves "safe corridor position"**: When teleporting into a room, `DoorSection` overwrites `savedCameraState` with a synthetic corridor position (Z=distance behind door) so that exiting returns to the corridor, not the previous room's position
- **`gsap.killTweensOf()` cleanup**: Always called before setting new animations on the same target (PaperTransition calls `timelineRef.current.kill()`, useInfiniteCamera kills camera.position/rotation tweens)
- **250ms delay after room entry**: `enterRoom()` is called 250ms after camera fly-through completes to decouple React context updates from GSAP animation loop (prevents frame stutter)
- **`overwrite: true`** on all hover GSAP tweens to prevent competing animations

## SEO & Build-Time Plugin (`seo-plugin.js`)

Custom Vite plugin that runs at build time:

1. **Fetches all Sanity data** at `transformIndexHtml` hook
2. **Injects dynamic JSON-LD** structured data: `@graph` with Person, WebSite, ProfilePage, FAQPage, ItemList (projects), VideoObject/Article/SocialMediaPosting (studio content), ItemList (awards)
3. **Updates meta tags**: `<title>`, `<meta description>`, OG tags, Twitter cards — all from Sanity `globalInfo`
4. **Replaces static SEO fallback** in `index.html` with live data
5. **Emits `llms.txt`** into build output (Markdown file for LLM scrapers)
6. **Serves `llms.txt`** in dev mode via `configureServer` middleware

## localStorage Keys

| Key | Shape | Context |
|---|---|---|
| `audio_muted` | `'true'` \| `'false'` | AudioManager + audioManager.js |
| `audio_volume` | float 0..1 string | AudioManager |
| `itom_achievements` | JSON array of IDs | AchievementsContext (excludes `corridor_enter`) |

## Deprecated / Legacy Components

- **`Door.jsx`** and **`LoopDoors.jsx`**: Legacy door implementations, partially replaced by DoorSection
- **`Corridor.jsx`**: Simple straight corridor, replaced by CorridorWalls + CorridorSegment
- **`PaperBackground.jsx`** and **`Tunnel.jsx`**: Not actively used (App.jsx uses color+fog for background instead)
- **`useScrollCamera.js`**: Simple scroll camera, superseded by useInfiniteCamera
- **`useMouseParallax.js`** and **`useParallax.js`**: Used for 2D DOM elements, separate from useInfiniteCamera's parallax
- **`App.css`** and **`index.css`**: Vite template artifacts (logo-spin keyframes, root color-scheme)

---

# Design Rationale: Why the Author Made These Decisions

> This section analyzes the **why** behind every major design decision. It is the architectural reasoning layer on top of the "what" documented above.

---

## Why SPA + R3F Canvas + DOM Overlay Architecture?

The render tree in `App.jsx` reveals the core architectural decision:

```jsx
<Canvas>...</Canvas>           // Full-screen WebGL 3D scene
{isLoaded && (
  <NavigationUI />             // DOM overlay: map, audio, achievements
  <GlobalOverlay />            // DOM overlay: content card with GSAP typing effect
  <PaperTransition />          // DOM overlay: tear-paper animation for teleport
)}
<Preloader />                  // DOM overlay: loading screen
```

This split solves four concrete problems that a pure-3D or pure-DOM approach cannot:

**1. R3F cannot efficiently render complex UI.** While drei offers `Html` and `Text`, building the Map panel (quadrant-based hover zones with GSAP-animated clip-path paint reveals, movable pin markers, audio sliders, and achievement panels) entirely in 3D would be extraordinarily painful. Each `<Html>` portal creates an iframe-like bridge between WebGL and DOM pipelines with its own render overhead. The author chose the right tool for the right job: WebGL for spatial rendering and camera work, DOM for text layout, form controls, accessibility, and CSS animations.

**2. The Preloader and PaperTransition need precise DOM overlay control.** The paper-tear effect uses SVG `clipPath: polygon(...)` with 50+ vertex jagged edges and CSS `::before` pseudo-elements with paper texture backgrounds. This is a purely DOM-native effect. Implementing it inside Canvas would require building the entire animation in GLSL shaders — technically possible but dramatically more complex for the same visual result.

**3. DOM-based navigation surfaces retain browser-native accessibility.** `NavigationUI` uses standard `onMouseEnter`, `onClick`, `aria-*`, `inert` attributes, and keyboard focus management. Porting these into R3F would lose all built-in accessibility and require reimplementing focus trapping.

**4. Separation of rendering pipelines prevents DOM reflows from causing WebGL context loss.** The Canvas runs on the GPU via WebGL. The DOM overlay operates on the browser's compositor. By keeping them separate in the React tree but visually layered via CSS `z-index`, DOM reflows never force a GPU context rebuild.

**The SPA + Virtual Routing pattern** avoids `react-router-dom` overhead. `useDocumentMeta.js` uses the History API directly (`pushState`/`replaceState`), giving deep-linkable URLs (`/gallery`, `/about`) without page reloads, while `SceneContext` reads the initial URL via `getInitialRoomFromUrl()` and auto-teleports after scene load. A full router with `<BrowserRouter>` would add ~12KB gzipped for a single-page experience with only 6 virtual routes.

---

## Why Split Context into 4 Separate Providers?

The four Context providers form a nesting hierarchy with clear dependencies:

```
<PerformanceProvider>         // outermost -- configures Canvas, no dependencies
  <AchievementsProvider>      // depends on AudioProvider (needs chime on unlock)
    <AppContent>
      <AudioProvider>         // pure browser API, no context dependencies
        <SceneProvider>       // innermost -- wraps Canvas, no context dependencies
```

They cannot be merged because:

**1. They have fundamentally different consumers.** `SceneContext` consumers (`TeleportRoom`, `DoorSection`, `Experience`) are inside the Canvas (they use `useThree()`). `AchievementsContext` is consumed entirely in DOM-land (`NavigationUI`, `AchievementPopup`). Merging them would force DOM consumers to live inside the Canvas's React subtree — which they physically cannot since they render HTML elements.

**2. `PerformanceContext` is read at the `<Canvas>` configuration level.** It must be outside the Canvas to configure `dpr`, `shadows`, and `antialias` props before the WebGL context is created.

**3. They change at different frequencies.** `SceneContext` re-renders on every door-enter, room-exit, and teleport-phase change (dozens per session). `PerformanceContext` re-renders zero times after mount (unless FPS degrades). `AudioContext` re-renders only on mute-toggle or volume-drag. If merged, every room entry would unnecessarily re-render audio sliders and the achievement panel.

**4. `AudioContext` wraps a pure browser API** (`new Audio()`, `localStorage`). The lower-level `audioManager.js` utility is deliberately separate because it manages a persistent background music track as a module-level singleton — this is not React state and should survive re-renders. The Context layer wraps this with React-observable state for UI components, while the singleton handles the non-React concern of "one global music track."

---

## Why React Three Fiber Instead of Vanilla Three.js?

R3F was chosen because this project is fundamentally a **complex state machine** (4 interactive rooms + infinite corridor + teleport system) that maps perfectly to React's declarative model.

**1. Declarative scene graph driven by React state.** `Experience.jsx` conditionally renders based on `hasEntered`:
```jsx
{!hasEntered && (<EntranceDoors ... />)}
{!hasEntered && (<SignSystem ... />)}
```
When entrance doors open, the entire entrance section unmounts and the corridor takes over — without any manual `scene.add()` / `scene.remove()`. React's reconciliation handles 3D object lifecycle.

**2. React Suspense for asset loading.** The entire `Experience` is wrapped in `<Suspense fallback={null}>`. `useTexture()` (a drei hook) suspends until textures load. In vanilla Three.js, you'd manually track each texture's load state and write custom logic to block rendering.

**3. Component composition enables separation of concerns.** `DoorSection` renders `<RoomInterior>` as a child, which lazily loads room components. The wall-with-hole geometry is computed in `useMemo`. The tilt animation runs in `useFrame`. Audio lives in a `<PositionalAudio>` component. In vanilla Three.js, all these concerns would collapse into imperative code.

**4. Custom shaders as JSX tags.** Shaders register via `extend()` and are used as `<revealMaterial uProgress={0.0} />`. Exposing `uProgress` as a GSAP-animatable getter/setter is purely a React + R3F advantage — in vanilla Three.js, you'd manually update uniforms each frame.

**5. Drei ecosystem.** `Text`, `PositionalAudio`, `Float`, `useTexture`, `PerformanceMonitor`, `Preload` all reduce boilerplate significantly.

**Why not alternatives:**
- **A-Frame**: HTML-based, cannot integrate with React state management
- **Babylon.js**: Excellent engine but its React bindings are far less mature than R3F
- **PlayCanvas**: Editor-based, incompatible with custom shader pipeline

---

## Why GSAP for ALL Animations Instead of CSS?

**CSS fundamentally cannot animate what this project needs to animate:**

| Animation Target | GSAP | CSS |
|-----------------|------|-----|
| Three.js camera position/rotation | ✅ `gsap.to(camera.position, ...)` | ❌ No CSS property for camera |
| 3D object transforms (door.rotation.y) | ✅ `gsap.to(doorRef.rotation, { y: PI*0.6 })` | ❌ CSS transforms apply to DOM, not Three.js |
| Custom GLSL shader uniforms (uProgress) | ✅ `gsap.to(materialRef, { uProgress: 1.0 })` | ❌ CSS cannot touch GPU shader uniforms |
| Multi-stage timelines with precise offsets | ✅ `gsap.timeline()` with position parameter | ❌ CSS animation-delay is static and not cancelable |
| Delayed cleanup after animation | ✅ `gsap.delayedCall(0.55, () => ...)` | ❌ Requires fragile setTimeout/clearTimeout chains |

The project uses 17 files with 124+ GSAP calls. CSS animations are used only for trivial decorative UI elements (achievement popup enter/exit, ring spinner rotation).

**Why not React Spring / Framer Motion?** Both have R3F adapters, but lack:
- `delayedCall` for timed cleanup
- The ability to tween arbitrary JS objects (shader material `uProgress`)
- `gsap.killTweensOf()` — critical for canceling in-flight camera animations when transitioning between DoorSection and InfiniteCamera ownership
- Timeline API with precise positional offsets (`'<'`, `'-=0.5'`)

**Why not Three.js AnimationMixer?** Designed for pre-authored glTF/FBX keyframe clips, not real-time interactive, GSAP-driven sequences.

**The 250ms delay pattern:** After the camera fly-through animation completes, `enterRoom(doorId)` is called with a 250ms delay. This is a **de-synchronization buffer**: `enterRoom()` triggers React Context updates causing cascading re-renders (`InfiniteCorridorManager` props change, `DoorSection` exit logic fires, UI elements mount/unmount). If these re-renders happen during GSAP's active animation loop, React's reconciliation can block the main thread and cause visible frame stutter. The 250ms lets the GSAP loop finish gracefully before React tree updates.

---

## Why Camera Designed This Way?

**Why a single custom hook instead of drei's built-in controls?**

The corridor camera has exactly **one degree of freedom**: Z-axis movement. No drei control matches this constraint:
- OrbitControls: orbit/zoom/pan (too many DoF)
- FlyControls: free 3D movement (wrong interaction model)
- MapControls: 2D pan in screen space (wrong dimension)

More importantly, `useInfiniteCamera` does things no off-the-shelf control does:
- Proximity-based auto-glance at doors with distance-based strength curves and asymmetric lerp (slow to engage 0.03, fast to release 0.08)
- Unified input fusion: desktop wheel + touch drag + mouse parallax + keyboard arrows + gyroscope, all converging in one deterministic per-frame update order
- GSAP animation hand-off via camera override system

**Why the camera override system?**

When `DoorSection` finishes its exit animation and releases control, `setCameraOverride(false)` performs ~60 lines of synchronization:
1. Reads the camera's current position (wherever the exit animation left it)
2. Recalculates which corridor segment the camera is in
3. Derives the current glance value from the physical camera rotation
4. Initializes all internal refs to match ground truth
5. Begins smooth interpolation toward ideal values

Without this, the inactive controller's state would be stale, causing a visible camera snap when it takes over.

**Why 30-frame blend-in when re-enabling scroll?**

The camera's rotation after exiting a room diverges from what `lookAt` would compute. The blend saves the physical rotation at re-enable time, computes the target from `lookAt`, then lerps over 30 frames (~0.5s at 60fps). Without this, the camera would snap instantly to the corridor-facing orientation.

**Why rotation proxy objects?** Directly tweening `camera.rotation.y` would tween Euler angles, which suffer from gimbal lock and wrap-around ambiguity. A plain `{y: value}` proxy interpolates linearly, with `onUpdate` setting `camera.rotation.y = proxy.y`. The proxy also handles parent group rotation compensation (subtracting parent Y from world-target Y).

**Why TeleportRoom as a separate component?** TeleportRoom performs instantaneous camera snapping — fundamentally different from useInfiniteCamera's continuous per-frame interpolation. Keeping it separate means useInfiniteCamera has no knowledge of teleportation (clean separation of concerns), and the teleport logic doesn't add a conditional branch to every `useFrame` call.

---

## Why Rooms Divided This Way?

**Why the mini-corridor (RoomInterior) before each room?**

The 2-meter-deep corridor segment behind every door serves four purposes:
1. **Spatial transition**: Camera flies through door → enters controlled vestibule → then opens into room content. Without this, the camera would immediately face the room's content, which is disorienting after a 60-degree angled fly-through.
2. **Visual consistency**: Reuses main corridor textures (walls, floor, baseboards), creating a unified "behind every door" aesthetic.
3. **Positional anchoring**: Every room starts at exactly 2 units deep. The camera's `enterDistance` carries it through this vestibule into the room.
4. **Performance boundary**: The mini-corridor geometry is always rendered, providing visual continuity while room content lazy-loads.

**Why the Room Component Contract?**

The four props (`showRoom`, `onReady`, `isExiting`, `isWarmup`) form a minimal but complete interface:
- `showRoom`: When false, no interaction setup, minimal visual. Prevents wasted work.
- `onReady`: Signals GPU resources are compiled. Without this, the door would open before textures upload — showing blank geometry.
- `isExiting`: DoorSection is animating camera out. **Must stop all camera manipulation immediately** to prevent two systems fighting.
- `isWarmup`: Mounted in RoomWarmup 500 units below. Skip audio, skip tutorials, skip interaction listeners.

**Why onReady (frame counting) instead of useEffect or Suspense?**

`useEffect` fires after React commits. Suspense resolves after async imports. Neither guarantees GPU work completion:
1. Shader compilation is asynchronous — `gl.compile()` queues GPU work that completes during rendering, not during React's commit phase
2. Texture uploads are queued — the GPU may process them in subsequent frames
3. The first few rendered frames may be incomplete (missing textures, uncompiled shaders)

Frame counting (5-25 frames) ensures several complete render cycles have executed before signaling readiness. AboutRoom waits 25 frames (most complex geometry: InfiniteSkyManager with SkyChunks and milestones); Gallery and Studio wait 5 frames (simpler: mostly textured planes).

**Why different enterDistance for About (25) vs others (8)?**

The distance includes the 2m vestibule + room entry. About needs 23m into the sky to place the user in the active flying zone with room to accelerate. An 8-unit entry would leave the user barely past the mini-corridor. The standard 8 units (2m + 6m) places cameras at a comfortable starting distance for gallery balcony, studio tower ring, or contact dock.

**Why does each room have its own paint transition direction?**

| Room | Door Side | Paint Direction | Rationale |
|------|-----------|----------------|-----------|
| Gallery | Left | `(-1, 0, 0)` — left to right | Door is on the left; room opens toward the right |
| Studio | Left | `(0, -1, 0)` — top to bottom | Tower has vertical emphasis; feels like a curtain rising |
| Contact | Right | `(1, 0, 0)` — right to left | Mirror of Gallery; door is on the right |
| About | N/A | No paint transition | Open-sky room with no "wall" to peel away |

The paint reveal feels like it originates from the door — as if the user's entry literally paints the room into existence.

---

## Why Shaders Organized This Way?

**Why extend MeshBasicMaterial instead of ShaderMaterial?**

The key insight (from `RevealMaterial.jsx`): "Only modifies the DISCARD logic (alpha), NOT the color/lighting." By extending `MeshBasicMaterial`, the code:
- Preserves the entire Three.js internal material pipeline (color management, texture sampling, fog, dithering)
- Injects only at targeted hook points via `onBeforeCompile`
- Avoids reimplementing 50+ lines of standard GLSL — only ~30 lines of custom code per material
- Seamlessly integrates: `map`, `transparent`, `alphaTest`, `color`, `depthWrite` work as standard JSX attributes

A raw `ShaderMaterial` would break when Three.js updates its internal shader structure. Patch-based injection is forward-compatible.

**Why onBeforeCompile instead of raw GLSL?**

The injection strategy at three specific points was deliberate:
- `#include <common>`: Append noise utility functions (no existing GLSL overlap)
- `#include <alphatest_fragment>`: After standard alpha test, apply custom UV-based discard
- `#include <dithering_fragment>`: After all color computation, apply world-space paint discard + edge glow

This ensures shadow maps, fog, color space conversion, and dithering all work automatically around the custom patches.

**Why 3 separate reveal classes instead of one configurable class?**

Each addresses a fundamentally different rendering strategy:

| Class | Strategy | Injection Point | Paint Support |
|-------|----------|----------------|---------------|
| RevealMaterial | DISCARD (two-mesh stack) | alphatest + dithering | Yes (optional, produces different shader) |
| RevealBasicMaterial | DISCARD (two-mesh stack) | alphatest only | No (simpler, fewer GPU cycles) |
| PaintRevealMaterial | BLEND (single mesh) | map_fragment only | Is itself the blend |

**RevealMaterial (discard) vs PaintRevealMaterial (blend):**
- Discard pattern: Two overlapping meshes — painted mesh behind, sketch mesh in front progressively discarded. Used on doors, handles. Works because meshes are perfectly co-planar and `alphaTest: 0.1` prevents Z-fighting.
- Blend pattern: Single mesh with two textures — `diffuseColor` is replaced with painted texture color above the brush-stroke threshold. Used where stacking two meshes would cause Z-fighting.

**Why value noise instead of Perlin/Simplex?**
- ~10× faster per pixel (no gradient vector lookup)
- ~10 lines of GLSL vs ~60 lines for 2D Simplex
- Aesthetically appropriate: value noise's blockiness reads as brush-stroke roughness; Perlin's smoothly varying gradients would look unnaturally "flowy"
- Historical patent concern: Simplex noise was under US patent until early 2025

**Why the "wet paint glow" edge effect?**

The blue-tinted RGB boost at the paint boundary (`glow * 0.4R, 0.5G, 0.7B`) serves multiple purposes:
- Makes the paint feel "alive" rather than a static binary mask
- Guides the eye to the transitioning edge (reinforcing the sketch-being-painted narrative)
- Covers alpha edge harshness with a 2-unit gradient band
- Turns off at completion (`uPaintProgress < 0.999`) — purely a transition artifact
- Evokes "magic spark" rather than mechanical wipe — aligned with portfolio brand

**Why customProgramCacheKey returns different strings?**

Three.js caches compiled `WebGLProgram` objects by material type + enabled features. RevealMaterial can compile into TWO structurally different programs (with or without paint uniforms). If the first instance compiles without paint, a second instance WITH paint would receive a program missing three uniforms — causing WebGL errors. Different cache keys force separate program compilation.

**Why usePaintMaterial is a hook rather than another material class?**

The hook serves as an **orchestration layer**: it owns the GSAP tween driving the paint sweep (React lifecycle concern), tracks room origin via `getWorldPosition()` (requires React refs), broadcasts shared `uniformsData` to all meshes in a room (one sweep, many materials), and is basis-class-agnostic (works with any material, not just RevealMaterial).

---

## Why Resources Loaded This Way?

**Why module-level preloading (import time) vs component-level?**

```javascript
// App.jsx — module scope, executes during script evaluation
if (isLowEnd) {
  filteredCore.forEach(path => useTexture.preload(path));
} else {
  filteredAll.forEach(path => useTexture.preload(path));
  filteredLoader.forEach(path => useLoader.preload(TextureLoader, path));
}
```

This executes during **script evaluation** — the earliest possible moment after JS bundle parse. By the time React creates its first DOM node (~100ms later), many textures are already mid-flight or delivered. The precedence is: JS parse → texture HTTP requests fire → React creates root → Canvas renders → textures already cached. Without this, the waterfall adds the entire React bootstrapping latency to loading time.

**Why split PRELOAD_ALL (useTexture) vs PRELOAD_LOADER (useLoader/TextureLoader)?**

These use DIFFERENT internal caches. `useTexture.preload()` puts into Drei's global cache. `useLoader.preload(TextureLoader, path)` puts into Three.js's DefaultLoadingManager. Preloading with the wrong method means the component would miss the cache and make a duplicate network request. The split ensures cache alignment: ABOUT and STUDIO rooms use `useLoader(TextureLoader)` (for explicit encoding control), so they are preloaded via `useLoader.preload`.

**Why filter textures by device?**

Touch devices cannot trigger hover-based paint reveals (no `onPointerEnter` equivalent for touch). Loading `_painted` textures on mobile wastes ~40MB of bandwidth and risks GPU memory exhaustion (especially critical for mobile GPUs with limited VRAM). The filter is a binary `(hover: hover)` media query check at module evaluation time.

**Why Cloudflare proxy for Sanity images?**

The `/sanity-cdn/*` proxy provides:
- Edge caching with 1-year TTL (Sanity image URLs are immutable)
- Bandwidth cost reduction (most requests never reach Sanity's origin)
- Same-origin requests (no CORS preflight, single HTTP/2 connection pool)
- Hides Sanity project ID from browser devtools
- Consistent caching policy under the portfolio's own control

**Why pub/sub instead of React Query or SWR?**

The data is static CMS content — once loaded, it never needs revalidation or mutation. React Query's primary value (stale-while-revalidate) would go unused. The module-level `cache` object + `fetchPromise` singleton provides the same deduplication guarantee in 5 lines. `isSanityDataLoaded()` is called synchronously by RoomWarmup's `useFrame` — React Query's cache requires a provider wrapper that would add complexity to this hot path.

**Why the two-phase loading pipeline?**

```
Phase 1: Module-level texture preload (JS evaluation time)
  → HTTP waterfall starts before React mounts

Phase 2: RoomWarmup shader compilation (3 frames after React renders)
  → All 4 rooms mounted 500 units below, gl.compileAsync() forces GPU compilation

Phase 3: Preloader exit
  → User sees paper-tear animation while 80+ WebGL programs compile
```

Each phase's output is a prerequisite for the next: textures must load before shaders compile (shaders sample textures), shaders must compile before user interaction (on-the-fly compilation causes 50-200ms frame drops), and the Preloader's animation masks all of it.

---

## Why No Redux?

The project relies on React's built-in `useContext` + `useState` + `useCallback` for state management. No Redux, Zustand, Jotai, MobX, or XState.

**Why Context is sufficient:**

1. **The state graph is shallow and tree-shaped.** The 4 providers form a clean nesting with no circular dependencies. Communication goes through Context boundaries that wrap both Canvas-land and DOM-land.

2. **~20 consumers per Context.** The project has roughly 40 R3F components and 10 DOM components. Redux shines with 100+ connected components across deeply nested routes.

3. **GSAP handles the truly complex state (animations).** `targetZ`, `currentZ`, `parallax`, `glanceOffset` are all in `useRef` — updated at 60fps without React renders. React Context only stores **decisions** (which room? teleporting?), not **continuous values** (camera position, scroll position).

4. **The teleport state machine uses temporal orchestration, not reducers.** The sequence is: `teleportTo()` → PaperTransition closes → `startTeleportTransition()` → TeleportRoom positions camera → `completeTeleport()` → DoorSection auto-clicks → `signalRoomReady()`. Each function transitions one specific flag, triggered by GSAP `onComplete` callbacks. This linear A→B→C→D sequence with one branch (isFastTeleport) is more readable than opaque action types dispatched to a reducer.

**Threshold where Redux would become necessary:**
- 10+ rooms with independent sub-navigation, each with data fetching, caching, and mutation
- Multiple widgets across different tree branches reacting to the same state change
- Need for middleware: logging every transition, persisting/restoring full state, optimistic rollback
- Multiple developers needing a shared DevTools debugging surface

---

## Why Portal (Teleport) Designed This Way?

The teleport system is a **distributed state machine** coordinated by SceneContext, executed by three independent components:

**Why three components instead of one monolithic TeleportManager?**

Each component handles a fundamentally different rendering domain:
- **PaperTransition** (DOM): Animates the paper-tear overlay — CSS clip-path polygons with GSAP
- **TeleportRoom** (R3F): Instantly repositions the camera — `camera.position.set(0, 0.2, doorZ + 8)`
- **DoorSection** (R3F): Plays the door-click animation (camera alignment + door open + fly-through)

If merged into one component, it would need to simultaneously manage DOM animations and WebGL camera transforms, cross-cutting two rendering pipelines. The separation means each component only needs knowledge of its own domain.

**Why SceneContext-based coordination instead of events?**

The `teleportPhase` state (`'closing'` → `'teleporting'` → `'opening'` → `null`) acts as a **clock signal** that each component watches independently:
- PaperTransition watches `teleportPhase` and animates accordingly
- TeleportRoom watches `teleportPhase === 'teleporting'` and repositions camera
- DoorSection watches `pendingDoorClick` and triggers entry

This is more robust than custom events because: the phase is a single source of truth, React's rendering guarantees all components see the same phase in the same frame, and there's no need for manual event listener cleanup.

**Why fast vs slow teleport?**

From the map panel, the user clicks a room → paper closes → camera teleports → door opens → paper opens. The paper closure masks the instantaneous repositioning. All intermediate animations run at 0.01s (the paper is closed — the user cannot see them). DoorSection checks `isFastTeleport` and shortens: alignment duration, door open duration, and fly duration. When exiting via ESC, the full 1.0-1.5s animations play because the user is watching.

---

## Why PerformanceContext Designed This Way?

**Why tier-based instead of continuous scaling?**

GPU capabilities are discrete: shadows ON/OFF, antialias ON/OFF, `powerPreference: "high-performance"/"default"/"low-power"`. There is no meaningful continuous mapping for these. Three tiers are: testable (developers manually verify HIGH/MEDIUM/LOW), tunable (artists adjust `particleCount: 1.0/0.6/0.3` per tier), and predictable (users get one of three known configurations, not an interpolated edge case).

**Why one-time detection + one-way runtime downgrade?**

```javascript
// Pass 1: One-time detection on mount
if (isMobile) detectedTier = MEDIUM;
if (navigator.hardwareConcurrency <= 4) detectedTier = isMobile ? LOW : MEDIUM;
if (navigator.deviceMemory <= 4) detectedTier = LOW;

// Pass 2: Runtime downgrade via drei PerformanceMonitor
<PerformanceMonitor onDecline={() => downgradeTier()} flipflops={3} />
```

The one-way downgrade (never upgrades) is correct because: if GPU proves it cannot handle HIGH, it will likely fail again under similar load; thermal throttling means performance monotonically decreases; re-enabling shadows would be more visually jarring than the initial downgrade.

**Why specific tier thresholds?**
- 4 CPU cores: separates budget mobile (2-4 cores) from mid-range laptops (6-8 cores) and high-end (12+ cores)
- 4GB RAM: below this, OOM is a real risk when loading full-resolution textures
- Mobile UA: overrides to MEDIUM even on flagship phones (thermal throttling + lower GPU fill rate vs desktop GPUs)
- `flipflops={3}`: prevents spurious downgrades from single-frame GC pauses

**Why different DPR ranges?**
- HIGH [1, 2]: Retina at native sharpness (up to 8.3M pixels at 1920×1080)
- MEDIUM [1, 1.5]: Upper bound at 4.7MP — mobile users typically cannot distinguish 1.5× vs 2×
- LOW [0.8, 1]: Minimum 0.8× prevents extreme pixelation (below 0.8×, text becomes illegible)

**Why shadows disabled on MEDIUM but antialias stays?**
- Shadows: Extra render pass (shadowmap generation + shadow sampler), large texture allocation (1024×1024+ per light), shader complexity. Primary mobile bottleneck.
- Antialias: Hardware-accelerated MSAA on modern GPUs. In the hand-drawn sketch aesthetic, aliased edges on text/geometry are highly visible and break immersion.
- Judgment: Antialias visual fidelity (for this art style) outweighs shadow immersion.

---

## Why Some State in Context vs useRef vs Module-Level?

The codebase follows a clear three-tier classification:

| State Category | Mechanism | Change Frequency | Consumers |
|---------------|-----------|------------------|-----------|
| App state (affects React UI) | Context (`useState` + Provider) | Low (user interaction) | Multiple components for conditional rendering |
| Animation state (per-frame) | `useRef` (mutable) | High (60fps `useFrame`) | Internal to hook; exposed via getter functions |
| Global singletons | Module-level `let`/`const` | Varies (lifetime = page load) | Any importing module |

**The golden rule: "If it doesn't render React, don't use React state."**

Per-frame values (`targetZ`, `parallax`, `glanceOffset`, `currentSegment`) must be in `useRef`. If they were `useState`, each `useFrame` call at 60fps would trigger a full React re-render (reconciliation → virtual DOM diff → commit), consuming the entire frame budget.

The same principle explains why `Preloader.jsx` bypasses React entirely for the percentage display:
```js
textLeftRef.current.innerText = percentageText; // Direct DOM mutation, zero React overhead
```

**Context for decisions, refs for motion.** `currentRoom` (Context) changes when the user clicks a door — at most once every few seconds. `currentSegment` (ref) changes every time the camera crosses an 80-unit boundary — potentially multiple times per second. React re-renders on room change (desired: UI updates) but not on segment change (undesired: 60fps overhead).

**The "shadow ref" pattern** (`AchievementsContext`): `completedRef` mirrors `completed` state for synchronous checks during high-frequency events (wheel scroll triggers `unlockAchievement` 100+ times/second). Without the ref, `setState`'s async batching means `completed.includes(id)` returns false 100 times before the first state flush — causing 100 duplicate PostHog events.

**Module-level for true singletons.** `useSanityData.js`'s `cache` object lives outside React's tree. If it were in Context, unmounting/remounting the provider would lose the cache. `audioManager.js`'s `bgMusicAudio` is a persistent `<Audio>` element that must survive all component lifecycle events.

---

## Why Hooks Organized This Way?

**`hooks/` vs `context/` vs `utils/`**: The boundary is whether the module creates shared state or just encapsulates behavior:
- `context/`: Creates new shared state for the tree + exports `useX()` consumer hooks
- `hooks/`: Encapsulates reusable behavior that consumes existing state
- `utils/`: Pure modules with zero React imports

**Why `usePaintMaterial` lives in `rooms/Gallery/` not `hooks/`?**

It is co-located with what changes together. If you modify the Gallery room's paint effect, you change `usePaintMaterial.js`, `PaperMaterial.jsx`, and `GalleryRoom.jsx` — all in the same directory. The `hooks/` directory is for truly shared hooks: `useInfiniteCamera` is used by `Experience.jsx` (not any specific room). The principle: **colocate until reuse forces extraction.**

**Why `useParallax` and `useMouseParallax` are separate?**

They serve different rendering domains: `useParallax` returns React state `{x, y}` for DOM elements (CSS translate), using its own `requestAnimationFrame` loop with slow lerp (0.1). `useMouseParallax` directly mutates `camera.position.x/y` via `useFrame` (R3F render loop) with fast lerp (0.05). Different animation loops, different consumers, different smoothing — merging would create an abstraction that serves neither well.

**Why `useScrollCamera` still exists?** It is the original 65-line simple corridor scroll, superseded by the 500-line `useInfiniteCamera`. Retained as: reference implementation documenting the original design, potential fallback, and git history preservation. Dead but harmless.

---

## Why Shader Files in `components/canvas/shaders/`?

The three shader files are React JSX components that use Three.js shader material APIs — not standalone GLSL files. Their only consumers are inside `components/canvas/`. Placing them at a top-level `shaders/` would incorrectly imply they are raw `.glsl` or `.vert/.frag` files usable outside the React tree. The current location says: "these are shader-material React components used by the Canvas rendering pipeline."

## Why Directory Boundaries: canvas/ vs dom/ vs ui/?

The distinction mirrors how game engines separate "world-space HUD" from "screen-space UI":

- **canvas/**: Must render inside `<Canvas>`. Uses `useFrame`, `useThree`, `useLoader`. Returns Three.js elements. Has access to WebGL context.
- **dom/**: Heavy DOM overlays tightly coupled to 3D scene state. `Preloader` monitors `THREE.DefaultLoadingManager`. `PaperTransition` subscribes to `SceneContext.teleportPhase`. Transient, full-screen, tightly coupled to WebGL lifecycle. You would never reuse these outside this app.
- **ui/**: Reusable interface widgets. `NavigationUI` could conceptually be extracted to a design system. `AchievementPopup` is a self-contained toast. Named like a UI kit, not scene elements.

---

## Author's Design Philosophy: Key Principles

Synthesizing all architectural decisions reveals a consistent design philosophy:

**1. "Heavier on the 3D, lighter on the architecture."** Complexity is invested where the user sees it (custom shaders, GSAP-coordinated state machines, device-tier rendering, paper-tear transitions, achievement gamification). Plumbing is kept minimal (React Context over Redux, colocated hooks, History API over react-router, module-scope singletons).

**2. "Choose the right tool for each rendering domain."** The Canvas/DOM split, GSAP/CSS split, R3F/vanilla-Three.js choice, and component directory structure all follow the same principle: match the tool to the substrate. WebGL for spatial rendering, DOM for text/forms/accessibility, GSAP for 3D+shader animation, CSS for trivial decorative transitions.

**3. "State shape follows change frequency."** The Context/ref/module-level three-tier classification is not arbitrary — it is a performance-driven decision where the key variable is "how often does this change?" Decisions (rooms, teleport phases) change slowly and go in Context. Motion (camera, scroll, parallax) changes every frame and goes in refs. Singletons (audio, cache) exist once and go at module level.

**4. "Colocate until reuse forces extraction."** `usePaintMaterial` lives in `rooms/Gallery/` because only one room uses it. Shaders live in `components/canvas/shaders/` because only Canvas components use them. This minimizes import distance for the primary consumer while keeping the extraction path clear: if a second room needs paint-reveal, move the hook to `hooks/` and parameterize.

**5. "Preload everything before the user sees anything."** The two-phase loading pipeline (module-level texture preload → RoomWarmup shader compile → Preloader exit) is an aggressive pre-computation strategy. The philosophy is: spend time before the first interaction to ensure every subsequent interaction is instant. Room entry shader compilation, the primary source of frame drops in WebGL apps, is eliminated by compiling during the loading screen.

**6. "Make state machines visible, not abstract."** The teleport state machine uses explicit phase flags and GSAP `onComplete` callbacks in sequence, not a reducer with opaque action types. Each phase transition is a named function (`startTeleportTransition`, `completeTeleport`, `signalRoomReady`). The linear A→B→C→D flow with one branch is more readable than the equivalent `dispatch({type: '...'})` pattern.

**7. "De-synchronize React from GSAP."** The 250ms delay after camera fly-through, the `cameraOverride` system, and the `skipFrameAfterEnable` mechanism all solve the same problem: React reconciliation and GSAP animation loops should not overlap. When they do, React's synchronous rendering blocks the animation thread, causing visible stutter. The solution is always temporal separation: let GSAP finish, then let React update.

**8. "Optimize for the first frame, not the average frame."** RoomWarmup exists to eliminate first-entry shader compilation stutter. Module-level texture preloading starts before React mounts. The `compileAsync` call forces all shaders to compile upfront. The philosophy is: users remember the first impression, not the average experience. A single 200ms dropped frame during door entry would undermine the entire polished feel.

**9. "Embrace the constraints of the medium."** The hand-drawn sketch aesthetic is not just an artistic choice — it is a performance-optimal one. `meshBasicMaterial` (no lighting, no shadows on MEDIUM tier) means every mesh is a single texture lookup. Black ink on paper texture means no complex PBR materials, no normal maps, no environment maps. The aesthetic constraint IS the performance strategy.

**10. "Leave breadcrumbs for future developers."** Legacy components (`Door.jsx`, `Corridor.jsx`, `useScrollCamera.js`) are retained rather than deleted. Comments explain WHY decisions were made ("KEY INSIGHT: Only modifies the DISCARD logic"). The `customProgramCacheKey` pattern is applied consistently. The codebase reads as a deliberately architected system, not an organically grown one.
