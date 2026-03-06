'use client';

import useTranslation from '../hooks/useTranslation';
import useIntersectionHide from "@/app/hooks/useIntersectionHide";

const PrivacyPolicy = () => {
    const { t } = useTranslation('common')
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();

    return (
        <section className="privacy_policy page">
            <div ref={sec1Ref} className={`privacy_policy_container ${isSec1Hidden ? 'hidden' : ''}`}>
                <h1>{t('privacy_policy',)}</h1>
            </div>

            <div ref={sec2Ref} className={`privacy_policy_container ${isSec2Hidden ? 'hidden' : ''}`}>

            </div>
        </section>
    );
}

export default PrivacyPolicy;