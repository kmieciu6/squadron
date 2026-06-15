"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MapCoords } from "@/components/MapWrapper";

type RealMapProps = {
    center: MapCoords;
    zoom?: number;
    placeId: string;
};

const RealMap = ({ center, zoom = 15, placeId }: RealMapProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error("Brak NEXT_PUBLIC_GOOGLE_MAPS_API_KEY w .env");
        return null;
    }

    return (
        <APIProvider apiKey={apiKey} libraries={["places"]}>
            <section className="company_map_card">
                <div className="company_map_card__header">
                    <div>
                        <h3>SQUADRON Sp. z o.o.</h3>
                        <p>ul. Narwicka 6, 80-557 Gdańsk</p>
                    </div>

                    <a
                        href={`https://www.google.com/maps/search/?api=1&query_place_id=${placeId}&query=${center.lat},${center.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Otwórz mapę
                    </a>
                </div>

                <div className="company_map_card__map">
                    <Map
                        className="map"
                        defaultZoom={zoom}
                        defaultCenter={center}
                        mapId="404f0de6d5b0dc31"
                    >
                        <AdvancedMarker position={center} />
                    </Map>
                </div>
            </section>
        </APIProvider>
    );
};

export default RealMap;