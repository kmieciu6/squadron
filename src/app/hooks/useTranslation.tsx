'use client';

import { useEffect, useState, useCallback } from 'react';
import en_common from '../languages/en/common.json';
import pl_common from '../languages/pl/common.json';

type SupportedLanguage = 'en' |'pl';
type Namespace = 'common';
type Messages = Record<string, unknown>;


const translations: Record<SupportedLanguage, Record<Namespace, Messages>> = {
    en: { common: en_common as Messages },
    pl: { common: pl_common as Messages },
};

const supportedLanguages: SupportedLanguage[] = ['en', 'pl'];

const isSupportedLanguage = (v: unknown): v is SupportedLanguage =>
    typeof v === 'string' && (supportedLanguages as string[]).includes(v);

const useTranslation = (namespace: Namespace = 'common') => {
    const [local, setLocale] = useState<SupportedLanguage>('en');
    const [messages, setMessages] = useState<Messages>({});

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem('locale');
        const browser = navigator.language.slice(0, 2);

        const lang: SupportedLanguage = isSupportedLanguage(stored)
            ? stored
            : isSupportedLanguage(browser)
                ? browser
                : 'en';

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocale(lang);
        setMessages(translations[lang][namespace] ?? {});
    }, [namespace]);

    const t = useCallback(
        (key: string): string => {
            const value = key
                .split('.')
                .reduce<unknown>((obj, part) => {
                    if (obj && typeof obj === 'object' && part in (obj as Record<string, unknown>)) {
                        return (obj as Record<string, unknown>)[part];
                    }
                    return undefined;
                }, messages);

            return typeof value === 'string' ? value : key;
        },
        [messages]
    );

    const changeLanguage = useCallback(
        (lang: SupportedLanguage) => {
            if (!supportedLanguages.includes(lang)) return;

            localStorage.setItem('locale', lang);
            setLocale(lang);
            setMessages(translations[lang][namespace] ?? {});
            window.location.reload();
        },
        [namespace]
    );

    return { t, local, changeLanguage };
};

export default useTranslation;