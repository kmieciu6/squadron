'use client';

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

type CookiesConsentContextValue = {
    isAccepted: boolean;
    isDecided: boolean | null;
    acceptCookies: () => void;
declineCookies: () => void;
};

const CookiesConsentContext = createContext<CookiesConsentContextValue | undefined>(
    undefined
);

type CookiesConsentProviderProps = {
    children: ReactNode;
};

export const CookiesConsentProvider = ({ children }: CookiesConsentProviderProps) => {
    const [isAccepted, setIsAccepted] = useState<boolean>(false);
    const [isDecided, setIsDecided] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem('cookiesAccepted');

        // eslint-disable-next-line react-hooks/set-state-in-effect
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

    const value: CookiesConsentContextValue = {
        isAccepted,
        isDecided,
        acceptCookies,
        declineCookies,
    };

    return (
        <CookiesConsentContext.Provider value={value}>
            {children}
        </CookiesConsentContext.Provider>
    );
};

export const useCookiesConsent = (): CookiesConsentContextValue => {
    const context = useContext(CookiesConsentContext);
    if (!context) {
        throw new Error('useCookiesConsent must be used within a CookiesConsentProvider');
    }
    return context;
};