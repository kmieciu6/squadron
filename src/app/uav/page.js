'use client';
import { useState } from 'react';
import useIntersectionHide from '../hooks/useIntersectionHide';
import useTranslation from '../hooks/useTranslation';
import opening_photo from "../../../public/images/dron_image.png"
import photo1 from "../../../public/images/dron_image.png"
import photo2 from "../../../public/images/dron_image.png"
import photo3 from "../../../public/images/dron_image.png"
import photo4 from "../../../public/images/dron_image.png"
import photo5 from "../../../public/images/dron_image.png"
import photo6 from "../../../public/images/dron_image.png"

const Uav = () => {
    const { t } = useTranslation('common')
    const [current, setCurrent] = useState(0);
    const [titleRef, isTitleHidden] = useIntersectionHide();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide();

    const options = [
        {
            label: t("uav_title3.1"),
            text1: t("uav_text3.1.1"),
            text2: t("uav_text3.1.2"),
        },
        {
            label: t("uav_title3.2"),
            text1: t("uav_text3.2.1"),
            text2: t("uav_text3.2.2"),
        },
        {
            label: t("uav_title3.3"),
            text1: t("uav_text3.3.1"),
            text2: t("uav_text3.3.2"),
        },
        {
            label: t("uav_title3.4"),
            text1: t("uav_text3.4.1"),
            text2: t("uav_text3.4.2"),
        }
    ];

    return (
        <section className="uav_section page">
            <div className='opening'> 
                <img
                    src={opening_photo.src}
                    alt="opening"
                />      
                <div className={`opening_text ${isTitleHidden ? 'hidden' : ''}`} ref={titleRef}>
                    <h1>
                        {t("uav")}
                    </h1>
                </div>
            </div>

            <div className="text text_container">
                <div className='text1_background'>
                    <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                        <div className='text1_container'>
                            <h1>
                                {t("uav_title1")}
                            </h1>
                            <div>
                                <p>
                                    {t("uav_text1.1")}
                                </p>
                                <p>
                                    {t("uav_text1.2")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text2_background' id="offer">
                    <div ref={sec2Ref} className={`text text2 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                        <h2>
                            {t("offer")}
                        </h2>
                        <div className="text2_container">
                            <div>
                                <img src={photo1.src} alt=""/>
                                <h3>
                                    {t("uav_title2.1")}
                                </h3>
                                <p>
                                    {t("uav_text2.1")}
                                </p>
                            </div>
                            <div>
                                <img src={photo2.src} alt=""/>
                                <h3>
                                    {t("uav_title2.2")}
                                </h3>
                                <p>
                                    {t("uav_text2.2")}
                                </p>
                            </div>
                            <div>
                                <img src={photo3.src} alt=""/>
                                <h3>
                                    {t("uav_title2.3")}
                                </h3>
                                <p>
                                    {t("uav_text2.3")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text3_background' id="implementation">
                    <div ref={sec3Ref} className={`text text3 text_width ${isSec3Hidden ? 'hidden' : ''}`}>
                        <h2>
                            {t("uav_title3")}
                        </h2>
                        <div className="text3_container">
                            <div className="switcher_buttons">
                                {options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    className={idx === current ? "active" : ""}
                                    onClick={() => setCurrent(idx)}
                                >
                                    {opt.label}
                                </button>
                                ))}
                            </div>
                            <div className="switcher_text">
                                <h3>{options[current].label}</h3>
                                <p>{options[current].text1}</p>
                                <br/>
                                <p>{options[current].text2}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text4_background' id="projects">
                    <div ref={sec4Ref} className={`text text4 text_width ${isSec4Hidden ? 'hidden' : ''}`}>
                        <h2>
                            {t("uav_title4")}
                        </h2>
                        <div className="text4_container">
                            <div className='container'>
                                <div>
                                    <h3>
                                        {t("uav_title4.1")}
                                    </h3>
                                    <p>
                                        {t("uav_text4.1")}
                                    </p>
                                </div>
                                <img src={photo4.src} alt=""/>
                            </div>
                            <div className='container'>
                                <div>
                                    <h3>
                                        {t("uav_title4.2")}
                                    </h3>
                                    <p>
                                        {t("uav_text4.2")}
                                    </p>
                                </div>
                                <img src={photo5.src} alt=""/>
                            </div>
                            <div className='container'>
                                <div>
                                    <h3>
                                        {t("uav_title4.3")}
                                    </h3>
                                    <p>
                                        {t("uav_text4.3")}
                                    </p>
                                </div>
                                <img src={photo6.src} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Uav;