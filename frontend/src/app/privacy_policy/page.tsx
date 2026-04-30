'use client';

import useTranslation from '@/hooks/useTranslation';
import useIntersectionHide from "@/hooks/useIntersectionHide";

const PrivacyPolicy = () => {
    const { t } = useTranslation('common')
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();

    return (
        <section className="privacy_policy subpage">
            <div ref={sec1Ref} className={`container ${isSec1Hidden ? 'hidden' : ''}`}>
                <h1>{t('privacy_policy')}</h1>
            </div>

            <div ref={sec2Ref} className={`container ${isSec2Hidden ? 'hidden' : ''}`}>

            </div>
        </section>
    );
}

export default PrivacyPolicy;