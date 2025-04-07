import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";
import opening_photo from "../assets/dron.jpg"
import useIntersectionHide from "./hooks/useIntersectionHide";

const OffshoreExpertise = () => {
    const { currentLanguage } = useLanguage();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();

    return (
        <section className="offshore_section page">
            <div className='opening'> 
                <img
                    src={opening_photo}
                    alt="opening"
                />      
                <h1>
                    {getTranslation("offshore_expertise", currentLanguage)}
                </h1>
            </div>
            <div className="text text_container">
                <div className='text1_background'>
                    <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                        <div className='text1_container'>
                            <h1>
                                {getTranslation("offshore_title", currentLanguage)}
                            </h1>
                            <div>
                                <p>
                                    {getTranslation("offshore_text1.1", currentLanguage)}
                                </p>
                                <p>
                                    {getTranslation("offshore_text1.2", currentLanguage)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OffshoreExpertise;