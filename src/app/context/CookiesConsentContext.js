'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CookiesConsentContext = createContext();

export const CookiesConsentProvider = ({ children }) => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDecided, setIsDecided] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('cookiesAccepted');
        if (stored === 'true') setIsAccepted(true);
        if (stored !== null) setIsDecided(true);
        else setIsDecided(false);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setIsAccepted(true);
        setIsDecided(true);
    };

    const declineCookies = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        setIsAccepted(false);
        setIsDecided(true);
    };

    return (
        <CookiesConsentContext.Provider value={{ isAccepted, isDecided, acceptCookies, declineCookies }}>
            {children}
        </CookiesConsentContext.Provider>
    )
};

export const useCookiesConsent = () => {
    const context = useContext(CookiesConsentContext);
    if (!context) {
        throw new Error('useCookiesConsent must be used within a CookiesConsentProvider');
    }
    return context;
};