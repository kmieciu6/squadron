'use client';
import { useEffect, useState } from 'react';
import { useCookiesConsent } from "../context/CookiesConsentContext";
import useTranslation from "../hooks/useTranslation";

const CookieBanner = () => {
    const { t } = useTranslation('common');
    const { isDecided, acceptCookies, declineCookies } = useCookiesConsent();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || isDecided === null || isDecided === true) return null;

    return (
        <div className="cookie_banner">
            <p>
                {t('cookies_text')}
                <a href="/privacy_policy">{`${t('privacy_policy')}.`}</a>
            </p>
            <div className="cookie_buttons">
                <button onClick={acceptCookies}>{t('accept')}</button>
                <button onClick={declineCookies}>{t('reject')}</button>
            </div>
        </div>
    );
};

export default CookieBanner;