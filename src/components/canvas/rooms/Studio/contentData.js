/**
 * Studio Content Data
 *
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 *
 * Platforms: 'youtube', 'blog', 'tiktok'
 *
 * V2.5: Studio content finalized — 4 Menglan items (TikTok / Blog / YouTube ×2),
 * all local, all URLs null (no fabricated links). Textures map by platform:
 *   tiktok  → phonefront_followmeontiktok (newly replaced)
 *   blog    → monitorfront_postnafbdoublewinner (already replaced)
 *   youtube → tvfront_filmikprojektdlamultiego / tvfront_filmikedytowaniezdjec
 * Original ITom images are kept as backups only (not referenced at runtime).
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'YouTube',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Blog',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '🎵',
        label: 'TikTok',
        shape: 'phone', // Vertical phone
    },
    instagram: {
        color: '#E1306C',
        accentColor: '#C13584',
        icon: '📷',
        label: 'Instagram',
        shape: 'phone',
    },
    x: {
        color: '#000000',
        accentColor: '#14171A',
        icon: '𝕏',
        label: 'X (Twitter)',
        shape: 'monitor',
    },
    linkedin: {
        color: '#0077B5',
        accentColor: '#005E93',
        icon: 'in',
        label: 'LinkedIn',
        shape: 'monitor',
    },
    codrops: {
        color: '#0099FF',
        accentColor: '#0077CC',
        icon: '💧',
        label: 'Codrops',
        shape: 'monitor',
    },
};

const RAW_CONTENT_DATA = [
    // ============ Studio V2 — Menglan Content (all local, URLs null) ============
    // 4 items repeated by StudioRoom to fill the 48-monitor tower.
    // Texture mapping is automatic by platform (see texture arrays below).
    {
        id: 'tt-001',
        platform: 'tiktok',
        title: 'AI EXPERIMENTS',
        description: 'Short experiments, AI tools, automation ideas, and behind-the-scenes development.',
        url: null,
        date: 'In Development',
    },
    {
        id: 'blog-001',
        platform: 'blog',
        title: 'AI DEVELOPMENT LOG',
        description: 'A collection of my experiments, development notes, and lessons learned while building AI-powered applications and automation tools.',
        url: null,
        date: 'In Development',
    },
    {
        id: 'yt-001',
        platform: 'youtube',
        title: 'AI PROJECT SHOWCASE',
        description: 'Project demos and walkthroughs of AI applications, automation tools, and creative web experiments.',
        url: null,
        date: 'In Development',
    },
    {
        id: 'yt-002',
        platform: 'youtube',
        title: 'BUILDING WITH CLAUDE CODE',
        description: 'Development experiments using Claude Code, Python, AI workflows, and modern web technologies.',
        url: null,
        date: 'In Development',
    },
];

const ytTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp', '/textures/studio/tvfront_filmikedytowaniezdjec.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
