'use client';
import useIntersectionHide from '../hooks/useIntersectionHide';
import { useTranslation } from '../hooks/useTranslation';
import opening_photo from "../../../public/images/turbiny.jpg"

export default function Soft() {
    const { t } = useTranslation('common')
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();

    return (
        <section className="soft_section page">
            <div className='opening'> 
                <img
                    src={opening_photo.src}
                    alt="opening"
                />      
                <h1>
                    {t("soft")}
                </h1>
            </div>
            <div className="text text_container">
                <div className='text1_background'>
                    <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                        <div className='text1_container'>
                            <h1>
                                {t("soft_title")}
                            </h1>
                            <div>
                                <p>
                                    {t("soft_text1.1")}
                                </p>
                                <p>
                                    {t("soft_text1.2")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}