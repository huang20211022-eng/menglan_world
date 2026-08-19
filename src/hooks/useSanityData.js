import { useState, useEffect } from 'react';
import { sanityClient, urlFor, getProxyUrl } from '../config/sanity';

// Flaga bezpieczeństwa: Jeśli użytkownik nie wpisał jeszcze Project ID, 
// hooki zwrócą null, co pozwoli na załadowanie danych hardcodowanych (fallback).
export const isSanityConfigured = sanityClient.config().projectId !== 'YOUR_PROJECT_ID';

// Globalny cache dla danych z Sanity
const cache = {
    projects: null,
    content: null,
    awards: null,
    loading: false,
    loaded: false,
    error: null,
};

let fetchPromise = null;
const listeners = new Set();

function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function notifyUpdate() {
    listeners.forEach(l => l());
}

// Pomocniczy preloader dla zwykłych obrazków HTML (np. certyfikatów)
const preloadBrowserImage = (path) => {
    if (typeof window === 'undefined' || !path) return;
    const img = new Image();
    img.src = path;
};

// Sprawdzenie, czy urządzenie obsługuje hover (kursory, komputery)
const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

// Timeout wrapper for Sanity fetch — prevents preloader from hanging
// indefinitely when Sanity API is unreachable (default client timeout is ~30s).
// After timeout, cache.loaded is set to true and local fallback data is used.
const SANITY_FETCH_TIMEOUT = 8000;
const withTimeout = (promise, ms) => {
    let timer;
    const timeout = new Promise((resolve) => {
        timer = setTimeout(() => resolve(null), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

export function loadSanityData() {
    if (!isSanityConfigured) {
        cache.loaded = true;
        return Promise.resolve(cache);
    }

    if (fetchPromise) {
        return fetchPromise;
    }

    cache.loading = true;

    fetchPromise = (async () => {
        try {
            const [projectsData, contentData, awardsData] = await Promise.all([
                // 1. Projects (Galeria)
                withTimeout(sanityClient.fetch(`
                    *[_type == "galleryProject"] {
                        title,
                        "id": slug.current,
                        url,
                        description,
                        frontImage,
                        paintedImage,
                        techStack
                    }
                `), SANITY_FETCH_TIMEOUT),
                // 2. Studio Content
                withTimeout(sanityClient.fetch(`
                    *[_type == "studioItem"] {
                        title,
                        platform,
                        description,
                        url,
                        frontTexture,
                        paintedFrontTexture,
                        date,
                        views,
                        likes,
                        duration,
                        readTime
                    } | order(date desc)
                `), SANITY_FETCH_TIMEOUT),
                // 3. Awards (Certyfikaty w About)
                withTimeout(sanityClient.fetch(`
                    *[_type == "awardCertificate"] {
                        title,
                        category,
                        certificateImage,
                        date,
                        url
                    } | order(date desc)
                `), SANITY_FETCH_TIMEOUT)
            ]);

            // ═══════════════════════════════════════════════════════════════════
            // V1.1.3: Gallery and Studio rooms ALWAYS use local fallback textures.
            // Sanity CDN URLs are NOT populated into cache.projects / cache.content
            // because GalleryRoom.jsx and StudioRoom.jsx pass these URLs directly to
            // Three.js useTexture() / TextureLoader, which throws uncaught errors when
            // the CDN is unreachable — crashing <CanvasImpl> and causing a white screen.
            //
            // When Menglan-branded Gallery/Studio assets are prepared (V3), uncomment
            // the mappings below and the rooms will use CMS data instead of fallbacks.
            // ═══════════════════════════════════════════════════════════════════

            // --- DISABLED for V1: Gallery projects from Sanity CDN ---
            // Mapowanie danych galerii i techStack na ścieżki lokalne oraz optymalizacja obrazków z Sanity
            // if (projectsData && projectsData.length > 0) {
            //     cache.projects = projectsData.map(p => {
            //         const frontUrl = p.frontImage ? getProxyUrl(urlFor(p.frontImage).width(1024).quality(80).auto('format')) : null;
            //         const paintedUrl = p.paintedImage ? getProxyUrl(urlFor(p.paintedImage).width(1024).quality(80).auto('format')) : null;
            //         return {
            //             ...p,
            //             front: frontUrl,
            //             painted: paintedUrl,
            //             techStack: p.techStack ? p.techStack.map(t => '/textures/gallery/' + t) : []
            //         };
            //     });
            // }

            // --- DISABLED for V1: Studio content from Sanity CDN ---
            // Mapowanie danych studio, przypisanie id oraz optymalizacja obrazków z Sanity
            // if (contentData && contentData.length > 0) {
            //     cache.content = contentData.map((item, index) => {
            //         const frontTextureUrl = item.frontTexture ? getProxyUrl(urlFor(item.frontTexture).width(1024).quality(80).auto('format')) : null;
            //         const paintedFrontTextureUrl = item.paintedFrontTexture ? getProxyUrl(urlFor(item.paintedFrontTexture).width(1024).quality(80).auto('format')) : null;
            //         return {
            //             ...item,
            //             id: item.platform + '-' + index,
            //             frontTexture: frontTextureUrl,
            //             paintedFrontTexture: paintedFrontTextureUrl
            //         };
            //     });
            // }

            // ═══════════════════════════════════════════════════════════════════
            // Task 2C-3: About VIEW is Local-First. cache.awards is DISABLED — the
            // Sanity awardCertificate query returns legacy Tomasz data that was
            // overriding local PROJECTS_DATA / PROFESSIONAL_CREDENTIALS in
            // InfiniteSkyManager. About now reads local data only. Remove the
            // `false &&` guard to re-enable when Menglan CMS awards exist (V3).
            // ═══════════════════════════════════════════════════════════════════
            if (false && awardsData && awardsData.length > 0) {
                const mapItems = (items) => items.map(a => {
                    const imageUrl = a.certificateImage ? getProxyUrl(urlFor(a.certificateImage).width(800).quality(80).auto('format')) : null;
                    return {
                        label: a.title,
                        date: new Date(a.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        image: imageUrl,
                        url: a.url || null
                    };
                });

                cache.awards = {
                    sotd: {
                        id: 'project-current',
                        layout: 'certificate_grid',
                        title: 'Current Project',
                        items: mapItems(awardsData.filter(a => a.category === 'sotd')),
                        platformConfig: { label: 'CURRENT', color: '#1a1a1a', icon: '💻' }
                    },
                    sotm: {
                        id: 'project-upcoming',
                        layout: 'certificate_grid',
                        title: 'Coming Soon',
                        items: mapItems(awardsData.filter(a => a.category === 'sotm')),
                        platformConfig: { label: 'SOON', color: '#1a1a1a', icon: '🔮' }
                    },
                    other: {
                        id: 'project-more',
                        layout: 'certificate_grid',
                        title: 'Certifications & Qualifications',
                        items: mapItems(awardsData.filter(a => a.category === 'other')),
                        platformConfig: { label: 'CERTIFICATIONS', color: '#1a1a1a', icon: '✨' }
                    }
                };
            }

            // PRELOADING ZDJĘĆ/TEKSTUR Z SANITY
            // ⚠️ CRITICAL: Only use preloadBrowserImage() (new Image()) for Sanity CDN URLs.
            // Do NOT use useTexture.preload() or useLoader.preload(TextureLoader, ...) because
            // they register with THREE.DefaultLoadingManager, which would REACTIVATE the
            // loading manager and block the Preloader from exiting if the CDN is unreachable.
            // (The Preloader waits for DefaultLoadingManager.onLoad to fire.)

            // 1. Projekty galerii — browser-level preload only
            if (cache.projects) {
                cache.projects.forEach(p => {
                    if (p.front) {
                        preloadBrowserImage(p.front);
                    }
                    // Optymalizacja mobilna: Ładujemy malowane wersje TYLKO jeśli urządzenie wspiera hover (komputery)
                    if (p.painted && supportsHover) {
                        preloadBrowserImage(p.painted);
                    }
                });
            }

            // 2. Studio — browser-level preload only
            if (cache.content) {
                cache.content.forEach(c => {
                    if (c.frontTexture) {
                        preloadBrowserImage(c.frontTexture);
                    }
                    // Optymalizacja mobilna: Ładujemy malowane wersje TYLKO dla komputerów (z myszką/hover)
                    if (c.paintedFrontTexture && supportsHover) {
                        preloadBrowserImage(c.paintedFrontTexture);
                    }
                });
            }

            // 3. Nagrody (certyfikaty w oknach 2D) - preload w przeglądarce
            if (cache.awards) {
                ['sotd', 'sotm', 'other'].forEach(category => {
                    cache.awards[category].items.forEach(item => {
                        if (item.image) {
                            preloadBrowserImage(item.image);
                        }
                    });
                });
            }

            cache.loaded = true;
            cache.loading = false;
        } catch (error) {
            console.error("Error preloading Sanity data:", error);
            cache.error = error;
            cache.loading = false;
            // Oznaczamy jako załadowane w razie błędu, żeby aplikacja nie wisiała w nieskończoność na preloaderze
            cache.loaded = true;
        } finally {
            // Reset fetchPromise so future loadSanityData() calls can retry
            // instead of returning the same failed/rejected Promise forever.
            fetchPromise = null;
        }

        notifyUpdate();
        return cache;
    })();

    return fetchPromise;
}

export function isSanityDataLoaded() {
    if (!isSanityConfigured) return true;
    return cache.loaded;
}

export function useGalleryProjects() {
    const [projects, setProjects] = useState(cache.projects);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setProjects(cache.projects);
            return;
        }

        const handleUpdate = () => {
            setProjects(cache.projects);
        };

        return subscribe(handleUpdate);
    }, []);

    return projects;
}

export function useStudioContent() {
    const [content, setContent] = useState(cache.content);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setContent(cache.content);
            return;
        }

        const handleUpdate = () => {
            setContent(cache.content);
        };

        return subscribe(handleUpdate);
    }, []);

    return content;
}

export function useAwards() {
    const [awardsData, setAwardsData] = useState(cache.awards);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setAwardsData(cache.awards);
            return;
        }

        const handleUpdate = () => {
            setAwardsData(cache.awards);
        };

        return subscribe(handleUpdate);
    }, []);

    return awardsData;
}

// Automatyczne odpalenie pobierania przy załadowaniu modułu JS
loadSanityData();
