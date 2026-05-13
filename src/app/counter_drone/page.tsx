'use client'

import useTranslation from "@/hooks/useTranslation";
import useIntersectionHide from "@/hooks/useIntersectionHide";

const CounterDronePage = () => {
    const { t } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='counter_drone subpage'>
            <div ref={sec1Ref} className={`container ${isSec1Hidden ? 'hidden' : ''}`}>
                <h1>{t('counter_drone_title1')}</h1>
            </div>
        </div>
    )
}

export default CounterDronePage;