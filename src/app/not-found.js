'use client';
import useTranslation from './hooks/useTranslation';
import Link from "next/link";
import Image from 'next/image';

const NotFoundPage = () => {
    const { t } = useTranslation('common')

    return (
        <section className='not_found_page'>
            <h1>{t('Error 404')}</h1>
            <p>
                {t('not_found_page')}
            </p>
            <Link href='/'><button>{t('main_page')}</button></Link>
            <Image
                src="/images/page_not_found.jpg"
                alt="not found"
                width={800}
                height={800}
                priority
            />
        </section>
    );
}

export default NotFoundPage;