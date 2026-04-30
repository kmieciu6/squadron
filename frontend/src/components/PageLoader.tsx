'use client';

import { useState, useEffect, useRef, type ReactNode, type JSX } from 'react';
import { usePathname } from 'next/navigation';
import { PageLoaderContext } from "@/context/PageLoaderContext";

type PageLoaderProps = {
    children: ReactNode;
};

const PageLoader = ({ children }: PageLoaderProps): JSX.Element => {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let cancelled = false;
        let forceStopId: number | null = null;
        let toWatch: HTMLImageElement[] = [];
        let doneOne: (() => void) | null = null;

        const start = window.setTimeout(() => {
            const container = pageRef.current;

            if (!container) {
                if (!cancelled) setLoading(false);
                return;
            }

            const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
            toWatch = imgs.filter((img) => !img.complete);

            if (toWatch.length === 0) {
                if (!cancelled) setLoading(false);
                return;
            }

            let pending = toWatch.length;

            doneOne = () => {
                pending -= 1;
                if (pending <= 0 && !cancelled) {
                    setLoading(false);
                }
            };

            toWatch.forEach((img) => {
                img.addEventListener('load', doneOne!, { once: true });
                img.addEventListener('error', doneOne!, { once: true });
            });

            forceStopId = window.setTimeout(() => {
                if (!cancelled) setLoading(false);
            }, 2500);
        }, 0);

        return () => {
            cancelled = true;
            window.clearTimeout(start);

            if (forceStopId !== null) {
                window.clearTimeout(forceStopId);
            }

            if (doneOne) {
                toWatch.forEach((img) => {
                    img.removeEventListener('load', doneOne!);
                    img.removeEventListener('error', doneOne!);
                });
            }
        };
    }, [pathname]);

    return (
        <PageLoaderContext.Provider value={{ loading }}>
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