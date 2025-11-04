'use client';
import { useState, useEffect, useRef } from "react";
import useTranslation from '../../hooks/useTranslation';
import { useTheme } from "next-themes";
import NavLink from "./NavLink";
import flag_poland from '../../../../public/icons/pl.svg';
import flag_england from '../../../../public/icons/gb.svg';
// import flag_germany from '../../../../public/icons/de.svg';
import logo from "../../../../public/images/logo.png";
import { MdOutlineBrightnessAuto, MdLightMode, MdDarkMode } from "react-icons/md";

const Header = () => {
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
    const { theme, setTheme} = useTheme();
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const burgerMenuRef = useRef(null);
    const [isAseOpen, setAseOpen] = useState(false);
    const aseRef = useRef(null);
    const [isLangOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    const aseLinks = [
        { path: "https://ase.pl/", label: 'ASE Group' },
        { path: "https://bpr.ase.pl/", label: 'BPR ASE GROUP' },
        { path: "https://projmors.ase.pl/", label: 'PROJMORS' },
        { path: "https://ekokonsult.ase.pl/", label: 'EKO-KONSULT' },
        { path: "https://aseatex.ase.pl/", label: 'ASE ATEX' },
        { path: "https://aseoffshore.pl/", label: 'ASE OFFSHORE' },
        { path: "https://www.elmech.pl/", label: 'ELMECH' },
        { path: "https://www.ase-lt.lt/", label: 'ASE BALTIC' },
        { path: "https://ase.pl/pl/camino-project", label: 'CAMINO' },
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
            if (aseRef.current && !aseRef.current.contains(event.target)) {
                setAseOpen(false);
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
        setAseOpen(false);
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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

                        <a className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                            handleMenuItemClick();
                        }}>{t("about")}</a>

                        <a className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
                            handleMenuItemClick();
                        }}>{t("offer")}</a>

                        <a className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('reference')?.scrollIntoView({ behavior: 'smooth' });
                            handleMenuItemClick();
                        }}>{t("reference")}</a>

                        <a className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('cooperation')?.scrollIntoView({ behavior: 'smooth' });
                            handleMenuItemClick();
                        }}>{t("cooperation")}</a>

                        <a className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                            handleMenuItemClick();
                        }}>{t("contact")}</a>

                        <div ref={aseRef} className="ase-switcher"
                             onMouseEnter={() => setAseOpen(true)}
                             onMouseLeave={() => setAseOpen(false)}>
                            <button className={`nav-link ase-toggle${isAseOpen ? ' active' : ''}`} onClick={() => setAseOpen(o => !o)}>
                                ASE Group
                            </button>
                            {isAseOpen && (
                                <div className="ase-menu">
                                    {aseLinks.map(({ path, label }) => (
                                        <NavLink key={path} className="dropdown-item" to={ path} onClick={handleMenuItemClick} target="_blank">
                                            {label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div ref={langRef} className="language-switcher"
                             onMouseEnter={() => setLangOpen(true)}
                             onMouseLeave={() => setLangOpen(false)}>
                            <button className={`nav-link language-toggle${isLangOpen ? ' active' : ''}`} onClick={() => setLangOpen(o => !o)}>
                                {local.toUpperCase()}
                            </button>
                            {isLangOpen && (
                                <div className="language-menu">
                                    <button className="dropdown-item" onClick={() => { changeLanguage('pl'); setLangOpen(false); }}>
                                        {t("polish")} 
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={flag_poland.src} alt="flag" className="flag" />
                                    </button>
                                    <button className="dropdown-item" onClick={() => { changeLanguage('en'); setLangOpen(false); }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        {t("english")} <img src={flag_england.src} alt="flag" className="flag" />
                                    </button>
                                    {/*<button className="dropdown-item" onClick={() => { changeLanguage('de'); setLangOpen(false); }}>*/}
                                    {/*    /!* eslint-disable-next-line @next/next/no-img-element *!/*/}
                                    {/*    {t("german")} <img src={flag_germany.src} alt="flag" className="flag" />*/}
                                    {/*</button>*/}
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

export default Header;