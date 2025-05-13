'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PageLoader = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);

        // Czekaj na załadowanie wszystkich obrazów
        const images = Array.from(document.images);
        let pending = images.filter(img => !img.complete).length;

        if (pending === 0) {
            setLoading(false);
            return;
        }

        const onImgEvent = () => {
            pending -= 1;
            if (pending === 0) {
                setLoading(false);
            }
        };

        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', onImgEvent);
                img.addEventListener('error', onImgEvent);
            }
        });

        return () => {
            images.forEach(img => {
                img.removeEventListener('load', onImgEvent);
                img.removeEventListener('error', onImgEvent);
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