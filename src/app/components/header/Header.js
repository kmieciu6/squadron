'use client';
import { useState, useEffect, useRef } from "react";
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from "next-themes";
import NavLink from "./NavLink";
import flag_poland from '../../../../public/icons/pl.svg';
import flag_england from '../../../../public/icons/gb.svg';
import flag_germany from '../../../../public/icons/de.svg';
import logo from "../../../../public/images/logo.png";
import { MdOutlineBrightnessAuto, MdLightMode, MdDarkMode } from "react-icons/md";

export default function Header() {
    const [dynamicVisible, setDynamicVisible] = useState(false);
    const staticHeaderRef = useRef(null);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef(null);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const staticHeaderHeight = staticHeaderRef.current ? staticHeaderRef.current.offsetHeight : 0;

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
            if (currentScrollY > staticHeaderHeight && currentScrollY < lastScrollY.current) {
                setDynamicVisible(true);
            } else {
                setDynamicVisible(false);
            }
            lastScrollY.current = currentScrollY;
        }, 10);
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
            <div ref={staticHeaderRef}>
                <HeaderContent className="header static-header" />
            </div>
            <HeaderContent className={`header dynamic-header ${dynamicVisible ? "visible" : "hidden"}`} />
        </>
    );
}

function HeaderContent({ className }) {
    const { t, local, changeLanguage } = useTranslation('common');
    const { theme, setTheme, systemTheme } = useTheme();
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const burgerMenuRef = useRef(null);
    const [isAreasOpen, setAreasOpen] = useState(false);
    const areasRef = useRef(null);
    const [isLangOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    const areaLinks = [
        { path: "/uav", label: t("uav") },
        { path: "/offshore_expertise", label: t("offshore_expertise") },
        { path: "/soft", label: t("soft") },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1023) setBurgerMenuOpen(false);
        };
        const handleClick = (event) => {
            if (burgerMenuRef.current && !burgerMenuRef.current.contains(event.target)) {
                setBurgerMenuOpen(false);
            }
            if (langRef.current && !langRef.current.contains(event.target)) {
                setLangOpen(false);
            }
            if (areasRef.current && !areasRef.current.contains(event.target)) {
                setAreasOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        document.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const handleMenuItemClick = () => {
        setBurgerMenuOpen(false);
        setAreasOpen(false);
    };

    useEffect(() => 
        setMounted(true), 
    []);
    
    const modes = ["system", "light", "dark"];
    const toggleTheme = () => {
        const idx = (modes.indexOf(theme) + 1) % modes.length;
        setTheme(modes[idx]);
    };

    let Icon = null;
    if (mounted) {
        Icon = {
            system: MdOutlineBrightnessAuto,
            light:  MdLightMode,
            dark:   MdDarkMode,
        }[theme];
    }

    return (
        <div className={className}>
            <div className="logo">
                <NavLink to="/">
                    <img src={logo.src} alt="Logo" />
                </NavLink>
            </div>
            <div className="bookmarks">
                <div ref={burgerMenuRef} className="burger-wrapper">
                    <div className={`burger-menu ${isBurgerMenuOpen ? "open" : ""}`} onClick={() => setBurgerMenuOpen(o => !o)}>
                        <div className="burger-line"></div>
                        <div className="burger-line"></div>
                        <div className="burger-line"></div>
                    </div>
                    <div className={`nav-links ${isBurgerMenuOpen ? "open" : ""}`}>
                        <NavLink className="nav-link" to="/" onClick={handleMenuItemClick}>{t("main_page")}</NavLink>
                        <NavLink className="nav-link" to="/about" onClick={handleMenuItemClick}>{t("about")}</NavLink>

                        <div ref={areasRef} className="areas-switcher">
                            <button className={`nav-link areas-toggle${isAreasOpen ? ' active' : ''}`} onClick={() => setAreasOpen(o => !o)}>
                                {t("areas")}
                            </button>
                            {isAreasOpen && (
                                <div className="areas-menu">
                                    {areaLinks.map(({ path, label }) => (
                                        <NavLink key={path} className="dropdown-item" to={path} onClick={handleMenuItemClick}>
                                            {label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <a className="nav-link" href="#footer" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                            handleMenuItemClick();
                        }}>{t("contact")}</a>

                        <div ref={langRef} className="language-switcher">
                            <button className={`nav-link language-toggle${isLangOpen ? ' active' : ''}`} onClick={() => setLangOpen(o => !o)}>
                                {local.toUpperCase()}
                            </button>
                            {isLangOpen && (
                                <div className="language-menu">
                                    <button className="dropdown-item" onClick={() => { changeLanguage('pl'); setLangOpen(false); }}>
                                        {t("polish")} 
                                        <img src={flag_poland.src} alt="flag" className="flag" />
                                    </button>
                                    <button className="dropdown-item" onClick={() => { changeLanguage('en'); setLangOpen(false); }}>
                                        {t("english")} <img src={flag_england.src} alt="flag" className="flag" />
                                    </button>
                                    <button className="dropdown-item" onClick={() => { changeLanguage('de'); setLangOpen(false); }}>
                                        {t("german")} <img src={flag_germany.src} alt="flag" className="flag" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {mounted && Icon && <Icon/>}
                        </button>        
                    </div>
                </div>
            </div>
        </div>
    );
}