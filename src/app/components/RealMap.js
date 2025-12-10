"use client";

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const center = {
    lat: 54.385569,
    lng: 18.633790
};

const RealMap = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error("Brak NEXT_PUBLIC_GOOGLE_MAPS_API_KEY w .env.local");
        return null;
    }

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                className="map"
                defaultZoom={14}
                defaultCenter={center}
                mapId={"404f0de6d5b0dc31"}
            >
                <AdvancedMarker position={center} />
            </Map>
        </APIProvider>
    );
};

export default RealMap;