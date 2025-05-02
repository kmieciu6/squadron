import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingSpinner = () => <div className='loading-spinner'></div>;

const PageLoader = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();

    useEffect (() => {
        const onLoad = () => setLoading(false)

        if (document.readyState  === 'complete') {
            onLoad();
        } else { 
            window.addEventListener('load', onLoad);
            return () => window.removeEventListener('load', onLoad);
        }
    }, []);

    useEffect(() => {
        // start nawigacji
        setLoading(true);

        const images = Array.from(document.images);
        let pending = images.filter(img => !img.complete).length;

        if (pending === 0) {
            // jeśli wszystkie już w cache albo brak <img>
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

        // po paint/raf wyłączamy loader
        // const frame = window.requestAnimationFrame(() => {
        //     setLoading(false);
        // });
        return () => {
            images.forEach(img => {
                img.removeEventListener('load', onImgEvent);
                img.removeEventListener('error', onImgEvent);
            });
        };
    }, [pathname]);

    return (
        <div>
            {loading && (
                <div className='overlay'>
                    <LoadingSpinner />
                </div>
            )}
            {children}
        </div>
    );
};

export default PageLoader;