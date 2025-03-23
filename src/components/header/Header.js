import React, { useState, useEffect, useRef } from "react";
import Cookies from "./Cookies";
import { getTranslation } from '../translations/LanguageUtils';
import { useLanguage } from '../translations/LanguageContext';
import NavLink from "./NavLink";
import flag_poland from '../../assets/pl.svg'
import flag_england from '../../assets/gb.svg'
import flag_germany from '../../assets/de.svg'
import logo from '../../assets/logo.png'
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faA } from "@fortawesome/free-solid-svg-icons";

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
                            <NavLink to="/" onClick={handleMenuItemClick}>{getTranslation('main_page', currentLanguage)}</NavLink>
                            <NavLink to="/about" onClick={handleMenuItemClick}>{getTranslation('about', currentLanguage)}</NavLink>
                            <NavLink to="/areas" onClick={handleMenuItemClick}>{getTranslation('areas', currentLanguage)}</NavLink>
                            <NavLink to="/news" onClick={handleMenuItemClick}>{getTranslation('news', currentLanguage)}</NavLink>
                            <a 
                                href="#footer" 
                                onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                                handleMenuItemClick();
                            }}
                            >
                                {getTranslation('contact', currentLanguage)}
                            </a>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={
                                    currentLanguage === 'pl' ? 'PL' :
                                    currentLanguage === 'en' ? 'EN' :
                                    currentLanguage === 'de' ? 'DE' :
                                    "Language"
                                }
                                menuVariant="dark"
                                className="nav_dropdown language-dropdown"
                                renderMenuOnMount
                                rootCloseEvent="click"
                                >
                                <NavDropdown.Item 
                                    onClick={() => {
                                        changeLanguage('pl');
                                        handleMenuItemClick();
                                    }}
                                    className="nav_dropdown_button"
                                >
                                    {getTranslation('polish', currentLanguage)} <img src={flag_poland} className="flag" alt="polski"/>
                                </NavDropdown.Item>
                                <NavDropdown.Item 
                                    onClick={() => {
                                        changeLanguage('en');
                                        handleMenuItemClick();
                                    }}
                                    className="nav_dropdown_button"
                                >
                                    {getTranslation('english', currentLanguage)} <img src={flag_england} className="flag" alt="english"/>
                                </NavDropdown.Item>
                                <NavDropdown.Item 
                                    onClick={() => { 
                                        changeLanguage('de');
                                        handleMenuItemClick();
                                    }}
                                    className="nav_dropdown_button"
                                >
                                    {getTranslation('german', currentLanguage)} <img src={flag_germany} className="flag" alt="deutsch"/>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <div>
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