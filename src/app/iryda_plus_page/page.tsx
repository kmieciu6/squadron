'use client'

import useTranslation from "@/app/hooks/useTranslation";
import useIntersectionHide from "@/app/hooks/useIntersectionHide";
import React from "react";

const IrydaPlusPage = () => {
    const { t, tRich } = useTranslation("common");
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec6Ref, isSec6Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec7Ref, isSec7Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec8Ref, isSec8Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <div className='iryda_plus_page subpage'>
            <div ref={sec1Ref} className={`container opening ${isSec1Hidden ? 'hidden' : ''}`}>
                {/*<h1>{t('iryda_plus_title1')}</h1>*/}
            </div>
            <div className='iryda_plus_content'>
                <div ref={sec2Ref} className={`container text ${isSec2Hidden ? 'hidden' : ''}`}>
                    <h2>{t("iryda_plus_title2")}</h2>
                    <p>{tRich("iryda_plus_text1")}</p>
                    <p>{t("iryda_plus_text2")}</p>
                    <h2>{t("iryda_plus_title3")}</h2>
                    <p>{t("iryda_plus_text3")}</p>
                    <p>{tRich("iryda_plus_text4")}</p>
                </div>
                <div ref={sec3Ref} className={`container text ${isSec3Hidden ? 'hidden' : ''}`}>
                    <h2>{t("iryda_plus_title4")}</h2>
                    <p>{t("iryda_plus_text5")}</p>
                    <p>{tRich("iryda_plus_text6")}</p>
                    <h2>{t("iryda_plus_title5")}</h2>
                    <p>{tRich("iryda_plus_text7")}</p>
                    <p>{t("iryda_plus_text8")}</p>
                </div>
                <div ref={sec4Ref} className={`container text ${isSec4Hidden ? 'hidden' : ''}`}>
                    <h2>{t("iryda_plus_title6")}</h2>
                    <p>{t("iryda_plus_text9")}</p>
                    <ul>
                        <li>{tRich("iryda_plus_text10")}</li>
                        <li>{tRich("iryda_plus_text11")}</li>
                        <li>{tRich("iryda_plus_text12")}</li>
                        <li>{tRich("iryda_plus_text13")}</li>
                        <li>{tRich("iryda_plus_text14")}</li>
                    </ul>
                    <p>{t("iryda_plus_text15")}</p>
                    <p>{t("iryda_plus_text16")}</p>
                    <h2>{t("iryda_plus_title7")}</h2>
                    <p>{t("iryda_plus_text17")}</p>
                    <p>{t("iryda_plus_text18")}</p>
                </div>
                <div ref={sec5Ref} className={`container text ${isSec5Hidden ? 'hidden' : ''}`}>
                    <h2>{t("iryda_plus_title8")}</h2>
                    <p>{t("iryda_plus_text19")}</p>
                    <p>{t("iryda_plus_text20")}</p>
                    <h2>{t("iryda_plus_title9")}</h2>
                    <p>{t("iryda_plus_text21")}</p>
                    <p>{t("iryda_plus_text22")}</p>
                </div>
                <div ref={sec6Ref} className={`container text ${isSec6Hidden ? 'hidden' : ''}`}>
                    <h2>{t("iryda_plus_title10")}</h2>
                    <p>{t("iryda_plus_text23")}</p>
                    <p>{t("iryda_plus_text24")}</p>
                    <h2>{t("iryda_plus_title11")}</h2>
                    <p>{t("iryda_plus_text25")}</p>
                    <ul>
                        <li>{tRich("iryda_plus_text26")}</li>
                        <li>{tRich("iryda_plus_text27")}</li>
                        <li>{tRich("iryda_plus_text28")}</li>
                        <li>{tRich("iryda_plus_text29")}</li>
                        <li>{tRich("iryda_plus_text30")}</li>
                    </ul>
                    <p>{t("iryda_plus_text31")}</p>
                </div>
                <div ref={sec7Ref} className={`container text ${isSec7Hidden ? 'hidden' : ''}`}>
                    <h2>{t("iryda_plus_title12")}</h2>
                    <p>{t("iryda_plus_text32")}</p>
                    <p>{t("iryda_plus_text33")}</p>
                    <h2>{t("iryda_plus_title13")}</h2>
                    <p>{tRich("iryda_plus_text34")}</p>
                    <p>{t("iryda_plus_text35")}</p>
                </div>
                <div ref={sec8Ref} className={`container text ${isSec8Hidden ? 'hidden' : ''}`}>
                    <h2>{t("iryda_plus_title14")}</h2>
                    <p>{t("iryda_plus_text36")}</p>
                </div>
            </div>
        </div>
    )
}

export default IrydaPlusPage;