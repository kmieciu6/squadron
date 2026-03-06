'use client';

import {useState, useEffect, type ReactNode, type JSX} from 'react';
import { usePathname } from 'next/navigation';

type PageLoaderProps = {
    children: ReactNode;
}

const PageLoader = ({ children }: PageLoaderProps): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname();

    useEffect(() => {

        let cancelled = false;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);

        const timeoutId = window.setTimeout(() => {
            if (!cancelled) setLoading(false);
        }, 2500);

        // Czekaj na załadowanie wszystkich obrazów
        const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];

        const toWatch = imgs.filter((img) => {
            const src = img.currentSrc || img.src;
            return !!src && !img.complete;
        });

        if (toWatch.length === 0) {
            window.clearTimeout(timeoutId);
            if (!cancelled) setLoading(false);
            return () => {
                cancelled = true;
            };
        }

        let pending = toWatch.length;

        const doneOne = () => {
            pending -= 1;
            if (pending <= 0) {
                window.clearTimeout(timeoutId);
                if (!cancelled) setLoading(false);
            }
        };

        toWatch.forEach((img) => {
            // once:true => listener sam się zdejmie po 1 odpaleniu
            img.addEventListener('load', doneOne, { once: true });
            img.addEventListener('error', doneOne, { once: true });
        });

        return () => {
            cancelled = true;
            window.clearTimeout(timeoutId);
            // (once:true i tak sprząta, ale zostawiamy porządek)
            toWatch.forEach((img) => {
                img.removeEventListener('load', doneOne);
                img.removeEventListener('error', doneOne);
            });
        };
    }, [pathname]);

    return (
        <>
            {loading && (
                <div className="overlay">
                    <div className="loading-spinner" />
                </div>
            )}
            {children}
        </>
    );
};

export default PageLoader;