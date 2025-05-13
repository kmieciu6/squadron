'use client';
import { useTranslation } from '../hooks/useTranslation';

export default function PrivacyPolicy() {
    const { t } = useTranslation('common')

    return (
        <section className="privacy_policy page">
            <h1>{t('privacy_policy',)}</h1>
        </section>
    );
}