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
