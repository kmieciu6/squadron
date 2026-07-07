'use client';

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ReactNode,
    type JSX,
} from 'react';
import { usePathname } from 'next/navigation';
import { PageLoaderContext } from '@/context/PageLoaderContext';

type PageLoaderProps = {
    children: ReactNode;
};

const MAX_WAIT_MS = 1200;
const MIN_LOADER_MS = 150;
const VIEWPORT_MARGIN = 300;

const getCurrentHash = (): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const hash = window.location.hash.replace('#', '').trim();

    if (!hash) {
        return null;
    }

    return decodeURIComponent(hash);
};

const isNearViewport = (element: Element): boolean => {
    const rect = element.getBoundingClientRect();

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
        rect.bottom >= -VIEWPORT_MARGIN &&
        rect.top <= viewportHeight + VIEWPORT_MARGIN &&
        rect.right >= -VIEWPORT_MARGIN &&
        rect.left <= viewportWidth + VIEWPORT_MARGIN
    );
};

const getPriorityImages = (
    container: HTMLElement,
    targetHash: string | null,
): HTMLImageElement[] => {
    const allImages = Array.from(
        container.querySelectorAll('img'),
    ) as HTMLImageElement[];

    const viewportImages = allImages.filter(isNearViewport);

    if (!targetHash) {
        return viewportImages;
    }

    const targetElement = document.getElementById(targetHash);

    if (!targetElement) {
        return viewportImages;
    }

    const targetImages = Array.from(
        targetElement.querySelectorAll('img'),
    ) as HTMLImageElement[];

    return Array.from(new Set([...viewportImages, ...targetImages]));
};

const PageLoader = ({ children }: PageLoaderProps): JSX.Element => {
    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const [targetHash, setTargetHash] = useState<string | null>(null);

    const pageRef = useRef<HTMLDivElement | null>(null);

    const runLoader = useCallback(() => {
        let cancelled = false;
        let finished = false;

        let rafId: number | null = null;
        let forceStopId: number | null = null;
        let minDelayId: number | null = null;

        let watchedImages: HTMLImageElement[] = [];
        let doneOne: (() => void) | null = null;

        const finish = (startedAt: number) => {
            if (cancelled || finished) {
                return;
            }

            finished = true;

            const elapsed = performance.now() - startedAt;
            const remainingDelay = Math.max(0, MIN_LOADER_MS - elapsed);

            minDelayId = window.setTimeout(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            }, remainingDelay);
        };

        rafId = window.requestAnimationFrame(() => {
            if (cancelled) {
                return;
            }

            const startedAt = performance.now();
            const hash = getCurrentHash();

            setTargetHash(hash);
            setLoading(true);

            const container = pageRef.current;

            if (!container) {
                finish(startedAt);
                return;
            }

            const priorityImages = getPriorityImages(container, hash).filter(
                (img) => !img.complete,
            );

            if (priorityImages.length === 0) {
                finish(startedAt);
                return;
            }

            watchedImages = priorityImages;

            let pending = watchedImages.length;

            doneOne = () => {
                pending -= 1;

                if (pending <= 0) {
                    finish(startedAt);
                }
            };

            watchedImages.forEach((img) => {
                img.addEventListener('load', doneOne!, { once: true });
                img.addEventListener('error', doneOne!, { once: true });
            });

            forceStopId = window.setTimeout(() => {
                finish(startedAt);
            }, MAX_WAIT_MS);
        });

        return () => {
            cancelled = true;

            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }

            if (forceStopId !== null) {
                window.clearTimeout(forceStopId);
            }

            if (minDelayId !== null) {
                window.clearTimeout(minDelayId);
            }

            if (doneOne) {
                watchedImages.forEach((img) => {
                    img.removeEventListener('load', doneOne!);
                    img.removeEventListener('error', doneOne!);
                });
            }
        };
    }, []);

    useEffect(() => {
        let cleanup = runLoader();

        const handleHashChange = () => {
            cleanup();
            cleanup = runLoader();
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            cleanup();
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname, runLoader]);

    return (
        <PageLoaderContext.Provider value={{ loading, targetHash }}>
            <div ref={pageRef} key={pathname}>
                {loading && (
                    <div className="overlay">
                        <div className="loading-spinner" />
                    </div>
                )}

                {children}
            </div>
        </PageLoaderContext.Provider>
    );
};

export default PageLoader;