import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import Areas from "./components/Areas";
import News from "./components/News";

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

    return (
        <LanguageProvider>
            <BrowserRouter>
                <Header onThemeChange={handleThemeChange} currentTheme={theme} />
                <ScrollToTop />
                <Routes>
                    <Route
                    path="/"
                    index
                    element={(
                        <PageLoader>
                            <Home />
                        </PageLoader>
                    )}
                    />
                    <Route
                    path="/about"
                    element={(
                        <PageLoader>
                            <About />
                        </PageLoader>
                    )}
                    />
                    <Route
                    path="/areas"
                    element={(
                        <PageLoader>
                            <Areas />
                        </PageLoader>
                    )}
                    />
                    <Route
                    path="/news"
                    element={(
                        <PageLoader>
                            <News />
                        </PageLoader>
                    )}
                    />
                    <Route
                    path="/privacy_policy"
                    element={(
                        <PageLoader>
                            <PrivacyPolicy />
                        </PageLoader>
                    )}
                    />
                    <Route
                    path="*"
                    element={(
                        <PageLoader>
                            <NotFoundPage />
                        </PageLoader>
                    )}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;