"use client";
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Contact from "./Contact";
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import useTranslation from '../hooks/useTranslation';
import linkedIn from "../../../public/icons/logo_linkedIn.png";
import logo from "../../../public/logos/logo_white.png";
import { usePathname } from "next/navigation";

const Footer = () => {
    const { t } = useTranslation('common')

    const center = {
        lat: 54.385569, 
        lng: 18.633790 
    };

    const [infoVisible, setInfoVisible] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);

    const infoRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // Konfiguracja IntersectionObserver
        const observerOptions = {
        root: null,
        threshold: 0.6, // Gdy 60% elementu jest widoczne
        };

        const infoObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;  // Jest tylko jeden obserwowany
        if (entry.isIntersecting) {
            setInfoVisible(true);
            infoObserver.unobserve(entry.target); // Przestajemy obserwować
        }
        }, observerOptions);

        const mapObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setMapVisible(true);
            mapObserver.unobserve(entry.target);
        }
        }, observerOptions);

        if (infoRef.current) {
        infoObserver.observe(infoRef.current);
        }
        if (mapRef.current) {
        mapObserver.observe(mapRef.current);
        }

        // Sprzątanie
        return () => {
        infoObserver.disconnect();
        mapObserver.disconnect();
        };
    }, []);

    const pathname = usePathname();

    useEffect(() => {
        setInfoVisible(false);
        setMapVisible(false);

        const observerOptions = {
            root: null,
            threshold: 0.6,
        };

        const infoObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInfoVisible(true);
                infoObserver.unobserve(entry.target);
            }
        }, observerOptions);

        const mapObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setMapVisible(true);
                mapObserver.unobserve(entry.target);
            }
        }, observerOptions);

        if (infoRef.current) infoObserver.observe(infoRef.current);
        if (mapRef.current) mapObserver.observe(mapRef.current);

        return () => {
            infoObserver.disconnect();
            mapObserver.disconnect();
        };
    }, [pathname]); // 👈 Dodaj pathname jako zależność



    return (
        <div className="footer" id="footer">
            <div className="footer_container">
                <div className="info_contact">
                    <div
                        className={
                        "info " +
                        "slide-from-left " + 
                        (infoVisible ? "slide-in" : "")
                        }
                        ref={infoRef}
                    >
                        <h1>
                            {t('contact')}
                        </h1>
                        <APIProvider apiKey={'AIzaSyDjDAoTQpelI8spxHbPujrD8kj-0EZ63Bk'}>
                            <Map 
                                className="map" 
                                defaultZoom={14} 
                                defaultCenter={center}
                                mapId={"404f0de6d5b0dc31"}>
                                <AdvancedMarker position={center}/>
                            </Map>
                        </APIProvider>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.src} alt="logo" className="logo" />
                        <a href="https://www.google.com/maps/place/Squadron+Sp.+z+o.o./@54.3856259,18.6330175,164m/data=!3m2!1e3!4b1!4m6!3m5!1s0x46fd74a42ca67505:0xf1f8e3ef31bef071!8m2!3d54.3856251!4d18.6336612!16s%2Fg%2F11gyxfjdqx!5m1!1e2?hl=pl-PL&entry=ttu&g_ep=EgoyMDI1MDMxNy4wIKXMDSoASAFQAw%3D%3D" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="address">
                            <h5>
                                ul. Narwicka 6
                                <br/>
                                80-557 Gdańsk
                            </h5>
                        </a>
                        <div className="tel_mail">
                            <a href="tel:+48609690340" >
                                <FontAwesomeIcon icon={faPhone} className="icon" />
                                <h5>
                                    +48 609 690 340
                                </h5>
                            </a>
                            <a href="mailto:biuro@squadron.pl" >
                                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                <h5>
                                    biuro@squadron.pl
                                </h5>
                            </a>
                        </div>
                        <a href="https://pl.linkedin.com/company/squadron-sp.-z-o.o." className="in">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={linkedIn.src} alt="logo linkedIn"/>
                        </a>
                    </div>
                    <div
                        className={
                        "contact slide-from-right " +
                        (mapVisible ? "slide-in" : "")
                        }
                        ref={mapRef}
                    >
                        <Contact/>
                    </div>    
                </div>
                <div className="info_map">
                    <p>© 2025 Squadron ASE Group</p>
                </div>
            </div>
        </div>
    )
};

export default Footer;