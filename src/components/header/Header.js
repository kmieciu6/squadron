import React, { useState, useEffect, useRef } from "react";
import Cookies from "./Cookies";
import { getTranslation } from '../translations/LanguageUtils';
import { useLanguage } from '../translations/LanguageContext';
import NavLink from "./NavLink";
import flag_poland from '../../assets/pl.svg'
import flag_england from '../../assets/gb.svg'
import flag_germany from '../../assets/de.svg'
import logo from '../../assets/logo.png'
// import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faA } from "@fortawesome/free-solid-svg-icons";
import { HashLink } from 'react-router-hash-link';

const Header = ({ onThemeChange, currentTheme }) => {
    const [dynamicVisible, setDynamicVisible] = useState(false); // Widoczność dynamicznego headera
    const staticHeaderRef = useRef(null);
    const lastScrollY = useRef(0); // Ostatnia pozycja scrolla
    const scrollTimeout = useRef(null); // Opóźnienie reakcji na przewijanie

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const staticHeaderHeight = staticHeaderRef.current ? staticHeaderRef.current.offsetHeight : 0;

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = setTimeout(() => {
            if (currentScrollY > staticHeaderHeight  && currentScrollY < lastScrollY.current) {
                setDynamicVisible(true); // Przewijanie w górę
            } else {
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
            <div ref={staticHeaderRef}>
                <HeaderContent 
                    className="header static-header" 
                    onThemeChange={onThemeChange}
                    currentTheme={currentTheme}
                />
            </div>

            {/* Dynamiczny header */}
            <HeaderContent
                className={`header dynamic-header ${dynamicVisible ? "visible" : "hidden"}`}
                onThemeChange={onThemeChange}
                currentTheme={currentTheme}
            />
        </>
    );
};

const HeaderContent = ({ className, onThemeChange, currentTheme }) => {
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

    const handleMenuItemClick = () => {
        setBurgerMenuOpen(false);
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

    const [isLangOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);

    // opcjonalnie: zamykanie po kliknięciu poza
    useEffect(() => {
    const onClick = e => {
        if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
        }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    }, []);


    return (
        <>
            <div className={className}>
                <div className="logo">
                    <NavLink to="/"> 
                        <img src={logo} alt="Logo" />
                    </NavLink>
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
                            <NavLink 
                                className="nav-link"
                                to="/" 
                                onClick={handleMenuItemClick}
                            >
                                {getTranslation('main_page', currentLanguage)}
                            </NavLink>
                            <NavLink 
                                className="nav-link"
                                to="/about" 
                                onClick={handleMenuItemClick}
                            >
                                {getTranslation('about', currentLanguage)}
                            </NavLink>
                            <HashLink 
                                className="nav-link"
                                smooth to="/#areas" 
                                onClick={handleMenuItemClick}
                            >
                                {getTranslation('areas', currentLanguage)}
                            </HashLink>
                            <HashLink 
                                className="nav-link"
                                smooth to="/#news" 
                                onClick={handleMenuItemClick}
                            >
                                {getTranslation('news', currentLanguage)}
                            </HashLink>


                            <a 
                                className="nav-link"
                                href="#footer" 
                                onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                                handleMenuItemClick();
                            }}
                            >
                                {getTranslation('contact', currentLanguage)}
                            </a>
                            <div ref={langRef} className="language-switcher">
                                <button
                                    className={`nav-link language-toggle${isLangOpen ? ' active' : ''}`}
                                    onClick={() => setLangOpen(o => !o)}
                                >
                                    {currentLanguage.toUpperCase()}
                                </button>
                                {isLangOpen && (
                                    <div className="language-menu">
                                        <button
                                            className="dropdown-item"
                                            onClick={() => { changeLanguage('pl'); setLangOpen(false); }}
                                        >
                                            {getTranslation('polish', currentLanguage)} <img src={flag_poland} alt="flag" className="flag" />
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => { changeLanguage('en'); setLangOpen(false); }}
                                        >
                                            {getTranslation('english', currentLanguage)} <img src={flag_england} alt="flag" className="flag" />
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => { changeLanguage('de'); setLangOpen(false); }}
                                        >
                                            {getTranslation('german', currentLanguage)} <img src={flag_germany} alt="flag" className="flag" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="theme-switcher">
                                <ThemeSwitcher
                                    currentTheme={currentTheme}
                                    onThemeChange={onThemeChange}
                                />                         
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Cookies />
        </>
    );
};

function ThemeSwitcher({ currentTheme, onThemeChange }) {
    // Funkcja, która przechodzi w pętli:
    // system -> light -> dark -> system
    const cycleTheme = (theme) => {
        if (theme === "system") return "light";
        if (theme === "light") return "dark";
        return "system"; // jeśli obecny to 'dark'
    };
  
    // Wybranie właściwej ikony na podstawie obecnego tematu
    const getIcon = (theme) => {
        if (theme === "light") return faSun;
        if (theme === "dark") return faMoon;
        return faA; // 'system'
    };
  
    // Gdy klikniemy przycisk, wyliczamy nowy tryb i wywołujemy onThemeChange
    const handleClick = () => {
        const nextTheme = cycleTheme(currentTheme);
        onThemeChange(nextTheme);
    };
  
    return (
        <button onClick={handleClick} className="icon-button">
            <FontAwesomeIcon className="icons_light" icon={getIcon(currentTheme)} />
        </button>
    );
}

export default Header;