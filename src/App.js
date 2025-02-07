import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './scss/main.scss';
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import Contact from './components/Contact';
import { LanguageProvider } from "./components/translations/LanguageContext";

function App() {
    return (
        <LanguageProvider>
            <BrowserRouter>
                <Header />
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
                    path="/contact"
                    element={(
                        <PageLoader>
                            <Contact />
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