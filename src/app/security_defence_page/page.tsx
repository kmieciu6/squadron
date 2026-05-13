'use client'

import useTranslation from "@/hooks/useTranslation";
import useIntersectionHide from "@/hooks/useIntersectionHide";

const SecurityDefencePage = () => {
    const { t } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='security_defence subpage'>
            <div ref={sec1Ref} className={`container ${isSec1Hidden ? 'hidden' : ''}`}>
                <h1>{t('security_defence_title1')}</h1>
            </div>
        </div>
    )
}

export default SecurityDefencePage;