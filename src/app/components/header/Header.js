'use client';
import { useState, useEffect, useRef } from "react";
import useTranslation from '../../hooks/useTranslation';
import { useTheme } from "next-themes";
import NavLink from "./NavLink";
// import flag_poland from '../../../../public/icons/pl.svg';
// import flag_england from '../../../../public/icons/gb.svg';
import { useRouter, usePathname } from "next/navigation";
import logoLight from "../../../../public/logos/logo.png";
import logoDark from "../../../../public/logos/logo_white.png";
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
        <div>
            <div ref={staticHeaderRef}>
                <HeaderContent className="header static-header" />
            </div>
            <HeaderContent className={`header dynamic-header ${dynamicVisible ? "visible" : "hidden"}`} />
        </div>
    );
}

function HeaderContent({ className }) {
    const { t, local, changeLanguage } = useTranslation('common');
    const { theme, resolvedTheme, setTheme} = useTheme();
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const burgerMenuRef = useRef(null);
    const [isAseOpen, setAseOpen] = useState(false);
    const aseRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [isFinePointer, setIsFinePointer] = useState(false);
    const router = useRouter();                // ⬅️ DODAJ
    const pathname = usePathname();
    const HOME_PATHS = ["/"];

    const isHome = HOME_PATHS.includes(pathname);

    const SUBPAGE_MENUS = {
        "/privacy_policy": [
            { key: "home", label: t("main_page"), href: "/" },
            { key: "privacy", label: t("privacy_policy"), id: "privacy_policy" },
        ],
    };

    // domyślne menu dla „reszty” (w tym 404)
    const DEFAULT_SUBPAGE_MENU = [
        { key: "home", label: t("main_page"), href: "/" },
    ];

    const currentSubpageMenu = SUBPAGE_MENUS[pathname] || DEFAULT_SUBPAGE_MENU;

    const handleAsePointerDown = (e) => {
        if (!isFinePointer) {
            if (!isAseOpen) {
                e.stopPropagation();                         // React
                e.nativeEvent.stopImmediatePropagation?.();  // ⬅️ Natywnie (to był brakujący klocek)
                e.preventDefault();                          // OK dla pointerdown
                setAseOpen(true);
            }
            // gdy otwarte – NIC nie rób; globalny pointerdown (na dokumencie) ma zamknąć
        }
    };

    const aseLinks = [
        { path: "https://ase.pl/", label: 'ASE GROUP' },
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
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setIsFinePointer(mq.matches);
        update();
        if (mq.addEventListener) mq.addEventListener('change', update);
        else mq.addListener(update);
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', update);
            else mq.removeListener(update);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1023) setBurgerMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);

        if (!isFinePointer) {
            const handleDocPointerDown = (e) => {
                const t = e.target;
                const inAse    = aseRef.current?.contains(t);
                const inBurger = burgerMenuRef.current?.contains(t);

                // ⬅️ najpierw ASE – klik w przycisk/listę ASE ma zamykać ASE
                if (inAse) {
                    setAseOpen(false);
                    return;
                }

                // dopiero teraz przepuszczamy interakcje wewnątrz burger
                if (inBurger) {
                    return;
                }

                // poza wszystkim: zamknij wszystko
                setBurgerMenuOpen(false);
                setAseOpen(false);
            };

            document.addEventListener("pointerdown", handleDocPointerDown);
            return () => {
                window.removeEventListener("resize", handleResize);
                document.removeEventListener("pointerdown", handleDocPointerDown);
            };
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isFinePointer]);


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

    const currentTheme = resolvedTheme || theme;
    const logoSrc = mounted && currentTheme === 'dark' ? logoDark.src : logoLight.src;

    const goHomeOrScrollTop = (e) => {
        if (e) e.preventDefault();
        handleMenuItemClick(); // zamknij burger/ASE jeśli otwarte

        if (pathname === "/") {
            // już jesteśmy na głównej → scroll na samą górę
            if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            // inna strona → przejdź na /
            router.push("/");
        }
    };

    return (
        <div className={className}>
            <div className="logo">
                {/*<NavLink to="/">*/}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                <a className="nav-link" onClick={goHomeOrScrollTop}>
                    <img src={logoSrc} alt="Logo" />
                </a>
                {/*</NavLink>*/}
            </div>
            <div className="bookmarks">
                <div ref={burgerMenuRef} className="burger-wrapper">
                    <div className={`burger-menu ${isBurgerMenuOpen ? "open" : ""}`}
                         onPointerDown={!isFinePointer ? (e) => {
                            if (!isBurgerMenuOpen) e.stopPropagation(); // otwieramy – nie zamykaj globalnie
                         } : undefined}
                         onClick={() => setBurgerMenuOpen(o => !o)}>
                        <div className="burger-line"></div>
                        <div className="burger-line"></div>
                        <div className="burger-line"></div>
                    </div>
                    <div className={`nav-links ${isBurgerMenuOpen ? "open" : ""}`}>
                        {isHome ? (
                            <>
                                {/*<a className="nav-link" onClick={goHomeOrScrollTop}>{t("main_page")}</a>*/}

                                <a className="nav-link" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
                                    handleMenuItemClick();
                                }}>{t("offer")}</a>

                                <a className="nav-link" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                    handleMenuItemClick();
                                }}>{t("about")}</a>

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
                            </>
                        ) : (
                            <>
                                {currentSubpageMenu.map((item) => (
                                    <a
                                        key={item.key}
                                        href={item.href || "#"}
                                        className="nav-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (item.id) {
                                                document.getElementById(item.id)?.scrollIntoView({
                                                    behavior: 'smooth',
                                                });
                                            } else {
                                                router.push(item.href);
                                            }
                                            handleMenuItemClick();
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </>
                        )}

                        <a className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                            handleMenuItemClick();
                        }}>{t("contact")}</a>

                        <div ref={aseRef} className="ase-switcher"
                             onMouseEnter={isFinePointer ? () => setAseOpen(true) : undefined}
                             onMouseLeave={isFinePointer ? () => setAseOpen(false) : undefined}>
                            <button
                                className={`nav-link ase-toggle${isAseOpen ? ' active' : ''}`}
                                onPointerDown={!isFinePointer ? handleAsePointerDown : undefined}
                                aria-haspopup="menu"
                                aria-expanded={isAseOpen}>
                                ASE GROUP
                            </button>
                            {isAseOpen && (
                                <div className="ase-menu" role="menu">
                                    {aseLinks.map(({ path, label }, i) => (
                                        <NavLink key={`${label}-${i}`} className="dropdown-item" to={ path} onClick={handleMenuItemClick} target="_blank">
                                            {label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            className="nav-link language-toggle"
                            onClick={() => {
                                const next = local === 'pl' ? 'en' : 'pl';
                                changeLanguage(next);
                                handleMenuItemClick(); // zamknij burger po wyborze
                            }}
                            aria-label={`Change language, current: ${local.toUpperCase()}`}
                            title={local === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
                        >
                            {local === 'pl' ? (
                                <>
                                    PL
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {/*<img src={flag_poland.src} alt="Polish flag" className="flag" />*/}
                                </>
                            ) : (
                                <>
                                    EN
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {/*<img src={flag_england.src} alt="English flag" className="flag" />*/}
                                </>
                            )}
                        </button>

                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            title="Toggle theme"
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