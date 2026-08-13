/**
 * Studio Content Data
 *
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 *
 * Platforms: 'youtube', 'blog', 'tiktok'
 *
 * V2.2: Rebranded from ITom/Tomasz content to Menglan's identity.
 * Only "Menglan World" is a published project. The remaining items are
 * placeholders clearly marked COMING SOON / AI EXPERIMENT / DEVELOPMENT LOG.
 * No fabricated external URLs, articles, videos, or projects.
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
    // ============ Published Work (Menglan) ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: 'Menglan World',
        description: 'Interactive 3D portfolio — navigate a hand-drawn infinite corridor and explore four immersive rooms built with React Three Fiber and custom GLSL shaders.',
        url: 'https://menglan-world-git-main-menglan.vercel.app/',
        date: '2026',
    },
    {
        id: 'blog-002',
        platform: 'blog',
        title: 'AI Development',
        description: 'Building AI-powered tools — from prompt engineering and RAG pipelines to desktop AI companions.',
        url: null,
        date: 'In Development',
    },
    {
        id: 'blog-003',
        platform: 'blog',
        title: 'Automation',
        description: 'RPA and workflow automation — turning repetitive tasks into reliable, hands-off processes.',
        url: null,
        date: 'In Development',
    },
    {
        id: 'yt-001',
        platform: 'youtube',
        title: 'AI Developer Journey',
        description: 'My path from software engineering to AI development — experiments, lessons, and building in public.',
        url: null,
        date: 'In Development',
    },

    // ============ Coming Soon / AI Experiment / Development Log ============
    // Placeholders: no fabricated URLs, articles, videos, or projects.
    { id: 'yt-002', platform: 'youtube', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-001', platform: 'tiktok', title: 'AI EXPERIMENT', description: 'An AI experiment is in progress. Details will be shared here soon.', url: null, date: 'Coming Soon' },
    { id: 'blog-004', platform: 'blog', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-002', platform: 'tiktok', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'yt-003', platform: 'youtube', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-003', platform: 'tiktok', title: 'AI EXPERIMENT', description: 'An AI experiment is in progress. Details will be shared here soon.', url: null, date: 'Coming Soon' },
    { id: 'yt-004', platform: 'youtube', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-004', platform: 'tiktok', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'blog-005', platform: 'blog', title: 'AI EXPERIMENT', description: 'An AI experiment is in progress. Details will be shared here soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-005', platform: 'tiktok', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'yt-005', platform: 'youtube', title: 'AI EXPERIMENT', description: 'An AI experiment is in progress. Details will be shared here soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-006', platform: 'tiktok', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'yt-006', platform: 'youtube', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-007', platform: 'tiktok', title: 'AI EXPERIMENT', description: 'An AI experiment is in progress. Details will be shared here soon.', url: null, date: 'Coming Soon' },
    { id: 'blog-006', platform: 'blog', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-008', platform: 'tiktok', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'yt-007', platform: 'youtube', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-009', platform: 'tiktok', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'blog-007', platform: 'blog', title: 'AI EXPERIMENT', description: 'An AI experiment is in progress. Details will be shared here soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-010', platform: 'tiktok', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'yt-008', platform: 'youtube', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-011', platform: 'tiktok', title: 'AI EXPERIMENT', description: 'An AI experiment is in progress. Details will be shared here soon.', url: null, date: 'Coming Soon' },
    { id: 'blog-008', platform: 'blog', title: 'COMING SOON', description: 'This space is reserved for upcoming work. Check back soon.', url: null, date: 'Coming Soon' },
    { id: 'tt-012', platform: 'tiktok', title: 'DEVELOPMENT LOG', description: 'A development log entry is in progress. Check back soon.', url: null, date: 'Coming Soon' },
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
