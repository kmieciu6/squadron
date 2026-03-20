'use client'

import useTranslation from "@/app/hooks/useTranslation";
import useIntersectionHide from "@/app/hooks/useIntersectionHide";

const UnmannedAviationPage = () => {
    const { t } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='unmanned_aviation page'>
            <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                <h1>{t('unmanned_aviation_title1')}</h1>
            </div>
        </div>
    )
}

export default UnmannedAviationPage;