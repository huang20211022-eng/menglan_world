# 🌍 Menglan World — Interactive 3D WebGL Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Three.js-0.182-black?style=for-the-badge&logo=threedotjs" alt="Three.js" />
  <img src="https://img.shields.io/badge/R3F-9.4-purple?style=for-the-badge" alt="React Three Fiber" />
  <img src="https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock" alt="GSAP" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Sanity-v3-F36458?style=for-the-badge&logo=sanity" alt="Sanity" />
</div>

<br />

> An Awwwards/FWA-caliber immersive 3D WebGL experience — navigate a hand-drawn infinite corridor, open doors into interactive rooms, and explore a world where every texture is custom artwork.

---

## 📖 Project Introduction

**Menglan World** is an interactive 3D portfolio built entirely with WebGL and modern frontend technologies. The user navigates a hand-drawn sketch-aesthetic infinite corridor, with four doors leading to immersive 3D rooms — Gallery, Studio, About, and Contact. On hover, black-and-white sketch textures reveal painted color versions through custom GLSL shaders, creating a "sketchbook coming to life" effect.

### ✨ Key Features

- **Infinite Corridor** — Scroll through a procedurally-managed 3-segment sliding window corridor with sawtooth walls, dynamic door tilting, and proximity-based camera auto-glance
- **4 Immersive Rooms** — Gallery (clothesline card carousel), Studio (cylindrical monitor tower), About (sky flight with story milestones), Contact (dock with ocean waves)
- **Custom Shader System** — GLSL brush-stroke discard reveal + world-space paint transition with "wet paint glow" edge effect
- **Paper-Tear Transitions** — SVG clip-path polygon animations for loading screen and room teleport
- **Teleport State Machine** — 6-phase distributed state machine enabling instant room switching via map panel
- **Adaptive Performance** — 3-tier device detection (HIGH/MEDIUM/LOW) with automatic FPS-based runtime degradation
- **SEO for WebGL SPAs** — Semantic HTML fallback, dynamic JSON-LD structured data, llms.txt generation, SPA deep linking
- **Sanity CMS** — All content (projects, studio items, awards, FAQ) managed via headless CMS

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Frontend Framework | React | 19.2 |
| 3D Engine | Three.js | 0.182 |
| React 3D Integration | @react-three/fiber | 9.4 |
| R3F Utilities | @react-three/drei | 10.7 |
| Animation | GSAP | 3.14 |
| Build Tool | Vite | 7.2 |
| CSS Preprocessing | Sass | 1.97 |
| Headless CMS | Sanity Studio | v3 |
| Analytics | PostHog | 1.360 |
| Image Processing | Sharp, Jimp | — |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 9
- Hardware acceleration enabled in your browser

### Installation

```bash
# Clone the repository
git clone https://github.com/MengLan/menglan_world.git
cd menglan_world

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Production build (runs SEO plugin + gzip compression) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (flat config) |

> [!IMPORTANT]
> This project loads hundreds of high-resolution textures. Initial local load may take a few seconds as the dev server buffers asset delivery. For accurate performance testing, always use `npm run build && npm run preview`.

### Sanity Studio

The CMS backend lives in a separate project:

```bash
cd portfolio-itom
npm install
npm run dev
```

---

## 📁 Project Structure

```
menglan_world/
├── index.html                    # Vite entry HTML with SEO meta
├── package.json                  # Dependencies + scripts
├── vite.config.js                # Vite 7: React, gzip, SEO plugin
├── seo-plugin.js                 # Build-time JSON-LD + llms.txt injection
│
├── functions/
│   └── sanity-cdn/[[catchall]].js  # Cloudflare Worker: Sanity CDN proxy
│
├── scripts/                      # Build/optimization utilities (14 scripts)
│
├── src/
│   ├── main.jsx                  # React DOM entry
│   ├── App.jsx                   # Root: providers, Canvas, preloading
│   │
│   ├── components/
│   │   ├── canvas/               # All 3D WebGL/R3F components
│   │   │   ├── Experience.jsx    # Main 3D scene orchestrator
│   │   │   ├── corridor/         # Infinite Corridor system (15 files)
│   │   │   ├── entrance/         # Entry experience (3 files)
│   │   │   ├── rooms/            # Room interiors (About/Contact/Gallery/Studio)
│   │   │   └── shaders/          # Custom GLSL materials (3 files)
│   │   ├── dom/                  # 2D DOM overlays (Preloader, PaperTransition)
│   │   └── ui/                   # 2D UI/HUD components (Navigation, Overlay, Audio)
│   │
│   ├── context/                  # React Context providers (Scene, Audio, Performance, Achievements)
│   ├── hooks/                    # Custom hooks (useInfiniteCamera, useDocumentMeta, useSanityData)
│   ├── config/                   # Texture preload manifest + Sanity client
│   ├── utils/                    # Audio manager + Device detection
│   └── styles/                   # SCSS stylesheets (11 files)
│
├── public/
│   ├── textures/                 # 200+ custom hand-drawn WebP textures
│   ├── sounds/                   # Audio files (BGM, ambient, SFX)
│   ├── fonts/                    # Custom TTF fonts (CabinSketch, RubikScribble, etc.)
│   ├── images/                   # Standard image assets
│   └── cursors/                  # Custom cursor images
│
└── portfolio-itom/               # Sanity Studio v3 (separate npm project)
    └── schemaTypes/              # 5 content types (globalInfo, galleryProject, studioItem, awardCertificate, faq)
```

---

## 🗺️ Development Roadmap

### Near-term (P1)

- [ ] Custom cursor integration (assets already in `/public/cursors/`)
- [ ] Contact room message form (currently falls back to mailto)
- [ ] Mobile touch interaction refinements
- [ ] Graceful degradation when Sanity CMS is unreachable
- [ ] 404 page with 3D experience

### Mid-term (P2)

- [ ] Per-room audio preference memory
- [ ] Enhanced tutorial/onboarding system
- [ ] Web Worker texture decoding
- [ ] Service Worker offline caching
- [ ] More granular LOD (Level of Detail) strategy
- [ ] Contact room message throwing animation (ROLLING → HOLDING → THROWING phases)

### Long-term (P3)

- [ ] Multi-language support architecture
- [ ] Blog/News room (5th room)
- [ ] Dynamic sitemap.xml from Sanity data
- [ ] Seasonal/holiday themed decorations
- [ ] TypeScript migration
- [ ] Automated integration tests

---

## 🤝 Contributing

Contributions improving shader physics, 3D math logic, component memoization, or performance are welcome.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

This project is built upon the original **ITom Dev — Interactive 3D Developer Portfolio**, designed and developed by **Tomasz "ITom" Szmajda**. The original work represents exceptional craftsmanship in creative web development, pushing the boundaries of what's possible with WebGL, React Three Fiber, and custom shader programming.

- Original Author: [Tomasz Szmajda (ITom Dev)](https://itomdev.com)
- Original Repository: [ITomPoland/portfolio-itom](https://github.com/ITomPoland/portfolio-itom)

Menglan World carries forward this vision with gratitude and respect for the original creator's artistry and engineering excellence.

---

## 📄 License

The code in this repository is licensed under the [MIT License](LICENSE).

> [!NOTE]
> All personal assets, 3D textures, images, and copywriting are copyright of Tomasz Szmajda and may not be reused or reproduced without explicit permission.

---

*Menglan World — A 3D journey through code and creativity.*
