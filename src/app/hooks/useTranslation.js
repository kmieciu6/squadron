'use client';
import { useEffect, useState } from 'react';
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

export function useTranslation(namespace = 'common') {
    const [local, setLocale] = useState('en');
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const stored = localStorage.getItem('locale') || navigator.language.slice(0, 2) || 'en';
        const supported = ['en', 'pl', 'de'];
        const lang = supported.includes(stored) ? stored : 'en';

        setLocale(lang);
        setMessages(translations[lang][namespace] || {});
    }, [namespace]);

    const t = (key) => {
        // return key.split('.').reduce((obj, part) => obj?.[part], messages) || key;
        return messages[key] || key;
    };

    const changeLanguage = (lang) => {
        localStorage.setItem('locale', lang);
        setLocale(lang);
        setMessages(translations[lang][namespace] || {});
        // 🔁 wymuś odświeżenie strony (prosty sposób):
        window.location.reload();
    };
    

    return { t, local, changeLanguage };
}