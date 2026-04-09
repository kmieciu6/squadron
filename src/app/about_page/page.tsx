'use client'

import useTranslation from "@/app/hooks/useTranslation";
import useIntersectionHide from "@/app/hooks/useIntersectionHide";
import React from "react";

const AboutPage = () => {
    const { t } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='about_page subpage'>
            <div className='about_content'>
                <div ref={sec1Ref} className={`container ${isSec1Hidden ? 'hidden' : ''}`}>
                    <h1>{t('about_title1')}</h1>
                </div>
                <div ref={sec2Ref} className={`container text ${isSec2Hidden ? 'hidden' : ''}`}>
                    <h2>{t("about_title2")}</h2>
                    <p>{t("about_text1")}</p>
                    <h2>{t("about_title3")}</h2>
                    <p>{t("about_text2")}</p>
                    <h2>{t("about_title4")}</h2>
                    <p>{t("about_text3")}</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;