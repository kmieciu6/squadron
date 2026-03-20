'use client'

import useTranslation from "@/app/hooks/useTranslation";
import useIntersectionHide from "@/app/hooks/useIntersectionHide";

const SecurityDefencePage = () => {
    const { t } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='security_defence page'>
            <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                <h1>{t('security_defence_title1')}</h1>
            </div>
        </div>
    )
}

export default SecurityDefencePage;