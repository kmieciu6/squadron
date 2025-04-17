import { useState } from "react";
import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";
import opening_photo from "../assets/dron_image.png"
import photo1 from "../assets/dron_image.png"
import photo2 from "../assets/dron_image.png"
import photo3 from "../assets/dron_image.png"
import photo4 from "../assets/dron_image.png"
import photo5 from "../assets/dron_image.png"
import photo6 from "../assets/dron_image.png"
import useIntersectionHide from "./hooks/useIntersectionHide";

const Uav = () => {
    const { currentLanguage } = useLanguage();
    const [current, setCurrent] = useState(0);
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();

    const options = [
        {
            label: getTranslation("uav_title3.1", currentLanguage),
            text1: getTranslation("uav_text3.1.1", currentLanguage),
            text2: getTranslation("uav_text3.1.2", currentLanguage),
        },
        {
            label: getTranslation("uav_title3.2", currentLanguage),
            text1: getTranslation("uav_text3.2.1", currentLanguage),
            text2: getTranslation("uav_text3.2.2", currentLanguage),
        },
        {
            label: getTranslation("uav_title3.3", currentLanguage),
            text1: getTranslation("uav_text3.3.1", currentLanguage),
            text2: getTranslation("uav_text3.3.2", currentLanguage),
        },
        {
            label: getTranslation("uav_title3.4", currentLanguage),
            text1: getTranslation("uav_text3.4.1", currentLanguage),
            text2: getTranslation("uav_text3.4.2", currentLanguage),
        }
    ];

    return (
        <section className="uav_section page">
            <div className='opening'> 
                <img
                    src={opening_photo}
                    alt="opening"
                />      
                <h1>
                    {getTranslation("uav", currentLanguage)}
                </h1>
            </div>

            <div className="text text_container">
                <div className='text1_background'>
                    <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                        <div className='text1_container'>
                            <h1>
                                {getTranslation("uav_title1", currentLanguage)}
                            </h1>
                            <div>
                                <p>
                                    {getTranslation("uav_text1.1", currentLanguage)}
                                </p>
                                <p>
                                    {getTranslation("uav_text1.2", currentLanguage)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text2_background'>
                    <div ref={sec2Ref} className={`text text2 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                        <h2>
                            {getTranslation("offer", currentLanguage)}
                        </h2>
                        <div>
                            <div>
                                <img src={photo1} alt=""/>
                                <h3>
                                    {getTranslation("uav_title2.1", currentLanguage)}
                                </h3>
                                <p>
                                    {getTranslation("uav_text2.1", currentLanguage)}
                                </p>
                            </div>
                            <div>
                                <img src={photo2} alt=""/>
                                <h3>
                                    {getTranslation("uav_title2.2", currentLanguage)}
                                </h3>
                                <p>
                                    {getTranslation("uav_text2.2", currentLanguage)}
                                </p>
                            </div>
                            <div>
                                <img src={photo3} alt=""/>
                                <h3>
                                    {getTranslation("uav_title2.3", currentLanguage)}
                                </h3>
                                <p>
                                    {getTranslation("uav_text2.3", currentLanguage)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text3_background'>
                    <div className={`text text3 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                        <h2>
                            {getTranslation("uav_title3", currentLanguage)}
                        </h2>
                        <div className="text3_container">
                            <div className="switcher__text">
                                <h3>{options[current].label}</h3>
                                <p>{options[current].text1}</p>
                                <br/>
                                <p>{options[current].text2}</p>
                            </div>

                            <div className="switcher__buttons">
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
                        </div>
                    </div>
                </div>

                <div className='text4_background'>
                    <div className={`text text4 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                        <h2>
                            {getTranslation("uav_title4", currentLanguage)}
                        </h2>
                        <div className="text4_container">
                            <div>
                                <div>
                                    <h3>
                                        {getTranslation("uav_title4.1", currentLanguage)}
                                    </h3>
                                    <p>
                                        {getTranslation("uav_text4.1", currentLanguage)}
                                    </p>
                                </div>
                                <img src={photo4} alt=""/>
                            </div>
                            <div>
                                <div>
                                    <h3>
                                        {getTranslation("uav_title4.2", currentLanguage)}
                                    </h3>
                                    <p>
                                        {getTranslation("uav_text4.2", currentLanguage)}
                                    </p>
                                </div>
                                <img src={photo5} alt=""/>
                            </div>
                            <div>
                                <div>
                                    <h3>
                                        {getTranslation("uav_title4.3", currentLanguage)}
                                    </h3>
                                    <p>
                                        {getTranslation("uav_text4.3", currentLanguage)}
                                    </p>
                                </div>
                                <img src={photo6} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Uav;