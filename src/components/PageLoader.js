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
        // po paint/raf wyłączamy loader
        const frame = window.requestAnimationFrame(() => {
            setLoading(false);
        });
        return () => window.cancelAnimationFrame(frame);
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