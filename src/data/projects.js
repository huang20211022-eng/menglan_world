// ============================================================
// src/data/projects.js
// Single source of truth for project content (Phase 2.4 Task 2D-1).
//
// Both the About Room (InfiniteSkyManager) and the Gallery Room read from
// here, so project identity, descriptions, links, and screenshots can no
// longer drift out of sync between rooms.
//
// Field glossary:
//   - tech:        array of technology names (comma-joined for display).
//   - status:      'current' | 'prototype' | 'completed' (machine-readable).
//   - url:         primary public/demo URL (may be null).
//   - github:      source repository URL (may be null).
//   - images:      project screenshots (About certificate_grid + future detail).
//   - galleryCover: reserved for future Menglan-branded card cover art
//                   (Task 2D-2). Currently null — Gallery falls back to legacy
//                   covers mapped locally in GalleryRoom.jsx.
//   - featured:    whether this is the primary/current project.
//   - comingSoon:  whether the project is not yet publicly released.
// ============================================================

export const PROJECTS = [
    {
        id: 'menglan-world',
        name: 'Menglan World',
        category: '3D AI Portfolio',
        description: 'An interactive 3D portfolio world combining AI, web technologies, and creative storytelling.',
        tech: ['React Three Fiber', 'Three.js', 'React', 'AI-assisted Development'],
        status: 'current',
        url: 'https://menglan-world-git-main-menglan.vercel.app/',
        github: 'https://github.com/huang20211022-eng/menglan_world/',
        images: [
            '/textures/projects/menglan-world/hero.webp',
            '/textures/projects/menglan-world/gallery.webp',
        ],
        galleryCover: null,
        featured: true,
        comingSoon: false,
    },
    {
        id: 'family-menu-ai',
        name: 'AI Family Menu Assistant',
        category: 'AI Application',
        description: 'An AI-powered meal planning assistant for family daily cooking.',
        tech: ['Android', 'Flutter', 'Claude'],
        status: 'prototype',
        url: null,
        github: null,
        images: [
            '/textures/projects/family-menu-ai/home.webp',
            '/textures/projects/family-menu-ai/menu.webp',
        ],
        galleryCover: null,
        featured: false,
        comingSoon: true,
    },
    {
        id: 'ai-rpa-enterprise',
        name: 'AI & RPA Enterprise Solutions',
        category: 'Enterprise AI Application',
        description: 'Enterprise AI solutions combining knowledge-base Q&A systems with RPA automation and business workflow deployment.',
        tech: ['Python', 'AI', 'RAG', 'RPA'],
        status: 'completed',
        url: null,
        github: null,
        images: [
            '/textures/projects/ai-rpa-enterprise/dashboard.webp',
            '/textures/projects/ai-rpa-enterprise/workflow.webp',
        ],
        galleryCover: null,
        featured: false,
        comingSoon: false,
    },
];

export default PROJECTS;
