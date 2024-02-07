import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollTop from "./ScrollTop";
import Cookies from "./Cookies";

const Header = () => {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
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

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', closeBurgerMenu);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', closeBurgerMenu);
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h1>Logo</h1>
          </Link>
        </div>
        <div className='bookmarks'>
          <div
            ref={burgerMenuRef}
            className={`burger-menu ${isBurgerMenuOpen ? 'open' : ''}`}
            onClick={toggleBurgerMenu}
          >
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
          </div>
          <div className={`nav-links ${isBurgerMenuOpen ? 'open' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <Cookies />
      <ScrollTop />
    </>
  );
};

export default Header;