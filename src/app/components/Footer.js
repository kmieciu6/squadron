"use client";
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import useTranslation from '../hooks/useTranslation';
// import linkedIn from "../../../public/icons/logo_linkedIn.png";
import logo from "../../../public/logos/logo_white.png";
import rectangle from "../../../public/icons/Rectangle.png";
import { usePathname } from "next/navigation";
// import MapWrapper from "@/app/components/MapWrapper";

const Footer = () => {
    const { t } = useTranslation('common')

    const [infoVisible, setInfoVisible] = useState(false);
    const infoRef = useRef(null);

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
            mapObserver.unobserve(entry.target);
        }
        }, observerOptions);

        if (infoRef.current) {
        infoObserver.observe(infoRef.current);
        }

        // Sprzątanie
        return () => {
        infoObserver.disconnect();
        };
    }, []);

    const pathname = usePathname();

    useEffect(() => {
        setInfoVisible(false);

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

        if (infoRef.current) infoObserver.observe(infoRef.current);

        return () => {
            infoObserver.disconnect();
        };
    }, [pathname]); // 👈 Dodaj pathname jako zależność

    return (
        <div className="footer" id="footer">
            <div className="footer_container">
                <div
                    className={
                    "info_contact slide-from-bottom " +
                    (infoVisible ? "slide-in" : "")
                    }
                    ref={infoRef}
                >
                    {/*<MapWrapper />*/}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt="logo" className="logo" />
                    <a href="https://www.google.com/maps/place/Squadron+Sp.+z+o.o./@54.3856259,18.6330175,164m/data=!3m2!1e3!4b1!4m6!3m5!1s0x46fd74a42ca67505:0xf1f8e3ef31bef071!8m2!3d54.3856251!4d18.6336612!16s%2Fg%2F11gyxfjdqx!5m1!1e2?hl=pl-PL&entry=ttu&g_ep=EgoyMDI1MDMxNy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="address">
                        <img src={rectangle.src} alt="rectangle" className="rectangle" />
                        <div>
                            <h3>
                                SQUADRON ASE Group Sp. z o. o.
                            </h3>
                            <h5>
                                ul. Narwicka 6
                                <br/>
                                80-557 Gdańsk
                            </h5>
                        </div>
                    </a>
                    <a href="https://www.google.com/maps/place/Aleja+Zwycięstwa+13+A,+80-219+Gdańsk/@54.3710643,18.6279891,164m/data=!3m1!1e3!4m6!3m5!1s0x46fd749dcbf75493:0xb3ebc2e18a19f0fc!8m2!3d54.3711651!4d18.6288861!16s%2Fg%2F11nnsc2l41?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="address">
                        <img src={rectangle.src} alt="rectangle" className="rectangle" />
                        <div>
                            <h3>
                                Biuro SQUADRON  Sp. z o. o.
                            </h3>
                            <h5>
                                Al. Zwycięstwa 13A
                                <br/>
                                Biuro nr. 222
                                <br/>
                                80-557 Gdańsk
                            </h5>
                        </div>
                    </a>
                    <div className="tel_mail">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <div>
                            <h3>
                                {t("write_to_us")}
                            </h3>
                            <a href="mailto:biuro@squadron.pl" >
                                <h5>
                                    biuro@squadron.pl
                                </h5>
                            </a>
                            <a href="tel:+48609690340" >
                                {/*<FontAwesomeIcon icon={faPhone} className="icon" />*/}
                                <h5>
                                    +48 609 690 340
                                </h5>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>© 2025 Squadron ASE Group</p>
                </div>
            </div>
        </div>
    )
};

export default Footer;