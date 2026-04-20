'use client'

import useTranslation from "@/app/hooks/useTranslation";
import useIntersectionHide from "@/app/hooks/useIntersectionHide";
import React from "react";

const MallardPage = () => {
    const { t, tRich } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec6Ref, isSec6Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec7Ref, isSec7Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec8Ref, isSec8Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec9Ref, isSec9Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec10Ref, isSec10Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='mallard_page subpage'>
            <div ref={sec1Ref} className={`container opening ${isSec1Hidden ? 'hidden' : ''}`}>
                {/*<h1>{t('mallard_title1')}</h1>*/}
            </div>
            <div className='mallard_content'>
                <div ref={sec2Ref} className={`container text ${isSec2Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title2")}</h2>
                    <p>{tRich("mallard_text1")}</p>
                    <p>{tRich("mallard_text2")}</p>
                </div>
                <div ref={sec3Ref} className={`container text ${isSec3Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title3")}</h2>
                    <p>{tRich("mallard_text3")}</p>
                    <p>{t("mallard_text4")}</p>
                </div>
                <div ref={sec4Ref} className={`container text ${isSec4Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title4")}</h2>
                    <p>{t("mallard_text5")}</p>
                    <p>{t("mallard_text6")}</p>
                    <h2>{t("mallard_title5")}</h2>
                    <p>{t("mallard_text7")}</p>
                </div>
                <div ref={sec5Ref} className={`container text ${isSec5Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title6")}</h2>
                    <p>{tRich("mallard_text8")}</p>
                    <p>{tRich("mallard_text9")}</p>
                    <p>{t("mallard_text10")}</p>
                    <p>{t("mallard_text11")}</p>
                    <p>{t("mallard_text12")}</p>
                </div>
                <div ref={sec6Ref} className={`container text ${isSec6Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title7")}</h2>
                    <p>{tRich("mallard_text13")}</p>
                    <p>{tRich("mallard_text14")}</p>
                    <p>{t("mallard_text15")}</p>
                    <p>{t("mallard_text16")}</p>
                </div>
                <div ref={sec7Ref} className={`container text ${isSec7Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title8")}</h2>
                    <p>{t("mallard_text17")}</p>
                    <p>{t("mallard_text18")}</p>
                </div>
                <div ref={sec8Ref} className={`container text ${isSec8Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title9")}</h2>
                    <p>{t("mallard_text19")}</p>
                    <p>{t("mallard_text20")}</p>
                </div>
                <div ref={sec9Ref} className={`container text ${isSec9Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title10")}</h2>
                    <p>{t("mallard_text21")}</p>
                    <h2>{t("mallard_title11")}</h2>
                    <p>{t("mallard_text22")}</p>
                </div>
                <div ref={sec10Ref} className={`container text ${isSec10Hidden ? 'hidden' : ''}`}>
                    <h2>{t("mallard_title12")}</h2>
                    <p>{tRich("mallard_text23")}</p>
                    <h2>{t("mallard_title13")}</h2>
                    <p>{t("mallard_text24")}</p>
                    <p>{tRich("mallard_text25")}</p>
                </div>
            </div>
        </div>
    )
}

export default MallardPage;