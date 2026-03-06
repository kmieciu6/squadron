"use client";

import dynamic from "next/dynamic";
import { useCookiesConsent } from "../context/CookiesConsentContext";
import ConsentPlaceholder from "./ConsentPlaceholder";
import useTranslation from "../hooks/useTranslation";

// dynamiczny import, żeby mapa ładowała się dopiero w przeglądarce
const RealMap = dynamic(() => import("./RealMap"), { ssr: false });

const MapWrapper = () => {
    const { t } = useTranslation('common');
    const { isAccepted, acceptCookies } = useCookiesConsent();

    if (!isAccepted) {
        return (
            <ConsentPlaceholder
                text={t('accept_cookies_to_show_map')}
                onAccept={acceptCookies}
                className='map_consent_placeholder'
            />
        );
    }

    return <RealMap />;
};

export default MapWrapper;