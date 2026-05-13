'use client'

import useTranslation from "@/hooks/useTranslation";
import useIntersectionHide from "@/hooks/useIntersectionHide";

const UnmannedAviationPage = () => {
    const { t } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='unmanned_aviation subpage'>
            <div ref={sec1Ref} className={`container ${isSec1Hidden ? 'hidden' : ''}`}>
                <h1>{t('unmanned_aviation_title1')}</h1>
            </div>
        </div>
    )
}

export default UnmannedAviationPage;