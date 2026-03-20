"use client";

import dynamic from "next/dynamic";
import { useCookiesConsent } from "../context/CookiesConsentContext";
import ConsentPlaceholder from "./ConsentPlaceholder";
import useTranslation from "../hooks/useTranslation";

const RealMap = dynamic(() => import("./RealMap"), { ssr: false });

export type MapCoords = {
    lat: number;
    lng: number;
};

type MapWrapperProps = {
    center: MapCoords;
    zoom?: number;
}

const MapWrapper = ({center, zoom = 14}: MapWrapperProps) => {
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

    return <RealMap center={center} zoom={zoom} />;
};

export default MapWrapper;