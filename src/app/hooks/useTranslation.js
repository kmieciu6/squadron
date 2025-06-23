'use client';
import { useEffect, useState, useCallback } from 'react';
import en_common from '../languages/en/common.json';
import pl_common from '../languages/pl/common.json';
import de_common from '../languages/de/common.json';

const translations = {
    en: {
        common: en_common,
    },
    pl: {
        common: pl_common,
    },
    de: {
        common: de_common,
    },
};

const supportedLanguages = ['en', 'pl', 'de'];

const useTranslation = (namespace = 'common') => {
    const [local, setLocale] = useState('en');
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const stored = localStorage.getItem('locale');
        const browser = navigator.language.slice(0, 2);
        const lang = supportedLanguages.includes(stored) 
            ? stored
            : supportedLanguages.includes(browser)
            ? browser
            : 'en';

        setLocale(lang);
        setMessages(translations[lang][namespace] || {});
    }, [namespace]);

    const t = useCallback((key) => {
        return key.split('.').reduce((obj, part) => obj?.[part], messages) || key;
    }, [messages]);

    const changeLanguage = (lang) => {
        if (!supportedLanguages.includes(lang)) return;
        localStorage.setItem('locale', lang);
        setLocale(lang);
        setMessages(translations[lang][namespace] || {});
        window.location.reload();
    };

    return { t, local, changeLanguage };
}

export default useTranslation;