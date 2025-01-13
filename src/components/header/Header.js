import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "./Cookies";

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
        }, 10); // 100 ms opóźnienia
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
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Cookies />
        </>
    );
};

export default Header;