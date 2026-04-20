'use client';

import { useEffect, useState } from 'react';
import { useCookiesConsent } from "../context/CookiesConsentContext";
import useTranslation from "../hooks/useTranslation";
import Link from "next/link";

const CookieBanner = () => {
    const { t } = useTranslation('common');
    const { isDecided, acceptCookies, declineCookies } = useCookiesConsent();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if (!isMounted || isDecided === null || isDecided) return null;

    return (
        <div className="cookie_banner">
            <p>
                {t('cookies_text')}
                <Link href="/privacy_policy">{`${t('privacy_policy_page_page')}.`}</Link>
            </p>
            <div className="cookie_buttons">
                <button onClick={acceptCookies}>{t('accept')}</button>
                <button onClick={declineCookies}>{t('reject')}</button>
            </div>
        </div>
    );
};

export default CookieBanner;