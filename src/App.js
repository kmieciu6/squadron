import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './scss/main.scss';
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import ScrollToTop from "./components/header/ScrollToTop";
import { LanguageProvider } from "./components/translations/LanguageContext";
import Uav from "./components/Uav";
import OffshoreExpertise from "./components/OffshoreExpertise";
import Soft from "./components/Soft";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLocation } from 'react-router-dom';

function App() {
    // Ustawiamy w stanie to, co mamy w localStorage lub domyślnie 'system'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "system";
    });

    useEffect(() => {
        const htmlEl = document.documentElement; // <html>
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
        const applySystemTheme = () => {
            const isDarkMode = mediaQuery.matches;
            htmlEl.classList.toggle("dark-theme", isDarkMode);
            htmlEl.classList.toggle("light-theme", !isDarkMode);
        };
      
        if (theme === "system") {
            applySystemTheme();
            mediaQuery.addEventListener("change", applySystemTheme);
        } else {
            htmlEl.classList.toggle("dark-theme", theme === "dark");
            htmlEl.classList.toggle("light-theme", theme === "light");
        }
        return () => {
            mediaQuery.removeEventListener("change", applySystemTheme);
        };
    }, [theme]);
      
    // Funkcja do zmiany tematu, np. wywoływana przy kliknięciu przycisku
    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const { pathname } = useLocation();

    return (
        <LanguageProvider>
            <Header onThemeChange={handleThemeChange} currentTheme={theme} />
            <ScrollToTop />
            <PageLoader>
                <Routes>
                    <Route
                        path="/"
                        index
                        element={<Home />}
                    />
                    <Route
                        path="/about"
                        element={<About />}
                    />
                    <Route
                        path="/uav"
                        element={<Uav />}
                    />
                    <Route
                        path="/offshore"
                        element={<OffshoreExpertise />}
                    />
                    <Route
                        path="/soft"
                        element={<Soft />}
                    />
                    <Route
                        path="/privacy_policy"
                        element={<PrivacyPolicy />}
                    />
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Routes>
            </PageLoader>
            <Footer key={pathname}/>
        </LanguageProvider>
    );
}

export default App;