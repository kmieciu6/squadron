'use client';

import React, {useState, useEffect, useRef, JSX} from 'react';
import useTranslation from '../../hooks/useTranslation';
import { useTheme } from 'next-themes';
import NavLink from './NavLink';
import { useRouter, usePathname } from 'next/navigation';
import logo from '../../../../public/logos/logo_white.png';
import { MdOutlineBrightnessAuto, MdLightMode, MdDarkMode } from 'react-icons/md';
import Image from "next/image";

type HeaderContentProps = {
    className: string;
};

type SubpageMenuItem = {
    key: string;
    label: string;
    href?: string;
    id?: string;
};

type AseLink = {
    path: string;
    label: string;
};

const HOME_PATHS = ['/'] as const;

const Header = (): JSX.Element => {
    const [dynamicVisible, setDynamicVisible] = useState<boolean>(false);

    const staticHeaderRef = useRef<HTMLDivElement | null>(null);
    const lastScrollY = useRef<number>(0);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleScroll = (): void => {
        const currentScrollY = window.scrollY;
        const staticHeaderHeight = staticHeaderRef.current?.offsetHeight ?? 0;

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
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    return (
        <div>
            <div ref={staticHeaderRef}>
                <HeaderContent
                    className="header static-header" />
            </div>

            <HeaderContent
                className={`header dynamic-header ${dynamicVisible ? 'visible' : 'hidden'}`}
            />
        </div>
    );
};

function HeaderContent({ className }: HeaderContentProps): JSX.Element {
    const { t, local, changeLanguage } = useTranslation('common');
    const { theme, setTheme } = useTheme();

    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);
    const burgerMenuRef = useRef<HTMLDivElement | null>(null);

    const [isAseOpen, setAseOpen] = useState<boolean>(false);
    const aseRef = useRef<HTMLDivElement | null>(null);

    const [mounted, setMounted] = useState<boolean>(false);
    const [isFinePointer, setIsFinePointer] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname() ?? '/';
    const isHome = HOME_PATHS.includes(pathname as (typeof HOME_PATHS)[number]);

    const SUBPAGE_MENUS: Record<string, SubpageMenuItem[]> = {
        '/privacy_policy': [
            { key: 'home', label: t('main_page'), href: '/' },
            { key: 'contact', label: t('contact'), href: '/contact_page' },
        ],
        '/contact_page': [{ key: 'home', label: t('main_page'), href: '/' }],
    };

    const DEFAULT_SUBPAGE_MENU: SubpageMenuItem[] = [
        { key: 'home', label: t('main_page'), href: '/' },
        { key: 'contact', label: t('contact'), href: '/contact_page' },
    ];

    const currentSubpageMenu = SUBPAGE_MENUS[pathname] ?? DEFAULT_SUBPAGE_MENU;

    const aseLinks: AseLink[] = [
        { path: 'https://ase.pl/', label: 'ASE GROUP' },
        { path: 'https://bpr.ase.pl/', label: 'BPR ASE GROUP' },
        { path: 'https://projmors.ase.pl/', label: 'PROJMORS' },
        { path: 'https://ekokonsult.ase.pl/', label: 'EKO-KONSULT' },
        { path: 'https://aseatex.ase.pl/', label: 'ASE ATEX' },
        { path: 'https://aseoffshore.pl/', label: 'ASE OFFSHORE' },
        { path: 'https://www.elmech.pl/', label: 'ELMECH' },
        { path: 'https://www.ase-lt.lt/', label: 'ASE BALTIC' },
        { path: 'https://ase.pl/pl/camino-project', label: 'CAMINO' },
    ];

    const handleAsePointerDown = (e: React.PointerEvent<HTMLButtonElement>): void => {
        if (!isFinePointer) {
            if (!isAseOpen) {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation?.();
                e.preventDefault();
                setAseOpen(true);
            }
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = (): void => setIsFinePointer(mq.matches);

        update();

        if (mq.addEventListener) mq.addEventListener('change', update);
        else mq.addListener(update);

        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', update);
            else mq.removeListener(update);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = (): void => {
            if (window.innerWidth > 1023) setBurgerMenuOpen(false);
        };

        window.addEventListener('resize', handleResize);

        if (!isFinePointer) {
            const handleDocPointerDown = (e: PointerEvent): void => {
                const target = e.target as Node | null;

                const inAse = !!target && !!aseRef.current?.contains(target);
                const inBurger = !!target && !!burgerMenuRef.current?.contains(target);

                if (inAse) {
                    setAseOpen(false);
                    return;
                }

                if (inBurger) return;

                setBurgerMenuOpen(false);
                setAseOpen(false);
            };

            document.addEventListener('pointerdown', handleDocPointerDown);

            return () => {
                window.removeEventListener('resize', handleResize);
                document.removeEventListener('pointerdown', handleDocPointerDown);
            };
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isFinePointer]);

    const handleMenuItemClick = (): void => {
        setBurgerMenuOpen(false);
        setAseOpen(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const modes = ['system', 'light', 'dark'] as const;
    type ThemeMode = (typeof modes)[number];

    const toggleTheme = (): void => {
        const current = (theme ?? 'system') as ThemeMode;
        const idx = (modes.indexOf(current) + 1) % modes.length;
        setTheme(modes[idx]);
    };

    // Icon type: react-icons mają typy komponentów, ale tu wystarczy ogólny
    let Icon: React.ComponentType | null = null;
    if (mounted) {
        const current = (theme ?? 'system') as ThemeMode;
        Icon =
            {
                system: MdOutlineBrightnessAuto,
                light: MdLightMode,
                dark: MdDarkMode,
            }[current] ?? null;
    }

    const goHomeOrScrollTop = (e?: React.MouseEvent<HTMLAnchorElement>): void => {
        e?.preventDefault();
        handleMenuItemClick();

        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            router.push('/');
        }
    };

    return (
        <div className={className}>
            <div className='header_content'>
                <div className="logo">
                    <a className="nav-link" onClick={goHomeOrScrollTop}>
                        <Image
                            src={logo}
                            alt="Logo"
                            width={250}
                            height={100}
                            className="logo_image"
                            loading="eager"
                        />
                    </a>
                </div>

                <div className="bookmarks">
                    <div ref={burgerMenuRef} className="burger-wrapper">
                        <div
                            className={`burger-menu ${isBurgerMenuOpen ? 'open' : ''}`}
                            onPointerDown={
                                !isFinePointer
                                    ? (e: React.PointerEvent<HTMLDivElement>) => {
                                        if (!isBurgerMenuOpen) e.stopPropagation();
                                    }
                                    : undefined
                            }
                            onClick={() => setBurgerMenuOpen((o) => !o)}
                        >
                            <div className="burger-line" />
                            <div className="burger-line" />
                            <div className="burger-line" />
                        </div>

                        <div className={`nav-links ${isBurgerMenuOpen ? 'open' : ''}`}>
                            <div className='nav-container'>
                                {isHome ? (
                                    <>
                                        <a
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
                                                handleMenuItemClick();
                                            }}
                                        >
                                            {t('offer')}
                                        </a>

                                        <a
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                                handleMenuItemClick();
                                            }}
                                        >
                                            {t('about')}
                                        </a>

                                        <a
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('reference')?.scrollIntoView({ behavior: 'smooth' });
                                                handleMenuItemClick();
                                            }}
                                        >
                                            {t('reference')}
                                        </a>

                                        <a
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('cooperation')?.scrollIntoView({ behavior: 'smooth' });
                                                handleMenuItemClick();
                                            }}
                                        >
                                            {t('cooperation')}
                                        </a>

                                        <a className="nav-link" href="/contact_page">
                                            {t('contact')}
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        {currentSubpageMenu.map((item) => (
                                            <a
                                                key={item.key}
                                                href={item.href ?? '#'}
                                                className="nav-link"
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    if (item.id) {
                                                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                                    } else if (item.href) {
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
                            </div>
                            <div className='nav-container'>
                                <div
                                    ref={aseRef}
                                    className="ase-switcher"
                                    onMouseEnter={isFinePointer ? () => setAseOpen(true) : undefined}
                                    onMouseLeave={isFinePointer ? () => setAseOpen(false) : undefined}
                                >
                                    <button
                                        className={`nav-link ase-toggle${isAseOpen ? ' active' : ''}`}
                                        onPointerDown={!isFinePointer ? handleAsePointerDown : undefined}
                                        aria-haspopup="menu"
                                        aria-expanded={isAseOpen}
                                    >
                                        ASE GROUP
                                    </button>

                                    {isAseOpen && (
                                        <div className="ase-menu" role="menu">
                                            {aseLinks.map(({ path, label }, i) => (
                                                <NavLink
                                                    key={`${label}-${i}`}
                                                    className="dropdown-item"
                                                    to={path}
                                                    onClick={handleMenuItemClick}
                                                    target="_blank"
                                                >
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
                                        handleMenuItemClick();
                                    }}
                                    aria-label={`Change language, current: ${local.toUpperCase()}`}
                                    title={local === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
                                >
                                    {local === 'pl' ? 'PL' : 'EN'}
                                </button>

                                <button
                                    className="theme-toggle"
                                    onClick={toggleTheme}
                                    aria-label="Toggle theme"
                                    title="Toggle theme"
                                >
                                    {mounted && Icon ? <Icon /> : null}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;