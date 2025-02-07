import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "./Cookies";
import { getTranslation } from '../translations/LanguageUtils';
import { useLanguage } from '../translations/LanguageContext';
import flag_poland from '../../assets/pl.svg'
import flag_england from '../../assets/gb.svg'
import flag_germany from '../../assets/de.svg'
import { NavDropdown } from "react-bootstrap";

const Header = () => {
    const [dynamicVisible, setDynamicVisible] = useState(false); // Widoczność dynamicznego headera
    const lastScrollY = useRef(0); // Ostatnia pozycja scrolla
    const threshold = 20; // Próg w pikselach
    const scrollTimeout = useRef(null); // Opóźnienie reakcji na przewijanie

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = setTimeout(() => {
            if (currentScrollY > threshold && currentScrollY < lastScrollY.current) {
                setDynamicVisible(true); // Przewijanie w górę
            } else if (currentScrollY > threshold && currentScrollY > lastScrollY.current) {
                setDynamicVisible(false); // Przewijanie w dół
            }

            lastScrollY.current = currentScrollY;
        }, 10); // 10 ms opóźnienia
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    return (
        <>
            {/* Statyczny header */}
            <HeaderContent className="header static-header" />

            {/* Dynamiczny header */}
            <HeaderContent
                className={`header dynamic-header ${dynamicVisible ? "visible" : "hidden"}`}
            />
        </>
    );
};

const HeaderContent = ({ className }) => {
    const { currentLanguage } = useLanguage();
    const { changeLanguage } = useLanguage();
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false); // Stan burger menu
    const burgerMenuRef = useRef(null);

    const toggleBurgerMenu = () => {
        setBurgerMenuOpen(!isBurgerMenuOpen);
    };

    const closeBurgerMenu = (event) => {
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(event.target)) {
            setBurgerMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {

            if (window.innerWidth > 1023) {
                setBurgerMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("click", closeBurgerMenu);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("click", closeBurgerMenu);
        };
    }, []);

    return (
        <>
            <div className={className}>
                <div className="logo">
                    <Link to="/">
                        <h1>Logo</h1>
                    </Link>
                </div>
                <div className="bookmarks">
                    <div ref={burgerMenuRef} className="burger-wrapper">
                        <div
                            className={`burger-menu ${isBurgerMenuOpen ? "open" : ""}`}
                            onClick={toggleBurgerMenu}
                        >
                            <div className="burger-line"></div>
                            <div className="burger-line"></div>
                            <div className="burger-line"></div>
                        </div>
                        <div className={`nav-links ${isBurgerMenuOpen ? "open" : ""}`}>
                            <Link to="/">{getTranslation('main_page', currentLanguage)}</Link>
                            <Link to="/about">{getTranslation('about', currentLanguage)}</Link>
                            <Link to="/contact">{getTranslation('contact', currentLanguage)}</Link>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={getTranslation('language', currentLanguage)}
                                menuVariant="dark"
                                className="nav_dropdown"
                                >
                                <NavDropdown.Item onClick={() => changeLanguage('pl')}>
                                    {getTranslation('polish', currentLanguage)} <img src={flag_poland} className="flag" alt="polski"/>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => changeLanguage('en')}>
                                    {getTranslation('english', currentLanguage)} <img src={flag_england} className="flag" alt="english"/>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => changeLanguage('de')}>
                                    {getTranslation('german', currentLanguage)} <img src={flag_germany} className="flag" alt="deutsch"/>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                </div>
            </div>
            <Cookies />
        </>
    );
};

export default Header;