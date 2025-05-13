'use client';
import { useTranslation } from '../hooks/useTranslation';

export default function NotFoundPage() {
    const { t } = useTranslation('common')

    return (
        <section className='not_found_page'>
            <h1>{t('Error 404')}</h1>
            <p>
                {t('not_found_page')}
            </p>
            <Link to='/'><button>{t('main_page')}</button></Link>
            <img src={img_page_not_found} alt='not found'/>
        </section>
    );
}