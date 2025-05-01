import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => <div className='loading-spinner'></div>;

const PageLoader = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const onLoad = () => setLoading(false)
        if (document.readyState  === 'complete') {
            onLoad();
        } else { 
            window.addEventListener('load', onLoad);
            return () => window.removeEventListener('load', onLoad);
        }
    }, []);

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