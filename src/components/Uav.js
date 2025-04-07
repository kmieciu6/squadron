import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";
import opening_photo from "../assets/dron_image.png"
import useIntersectionHide from "./hooks/useIntersectionHide";

const Uav = () => {
    const { currentLanguage } = useLanguage();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();

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
                                {getTranslation("uav_title", currentLanguage)}
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
            </div>
        </section>
    );
}

export default Uav;