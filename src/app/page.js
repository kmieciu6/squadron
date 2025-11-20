"use client";
import useIntersectionHide from './hooks/useIntersectionHide';
import useTranslation from './hooks/useTranslation';
import dron from '../../public/images/dron.jpg';
import turbine_photo from '../../public/images/turbiny.jpg';
import opening_photo from '../../public/images/turbins_sea.png';
import {useEffect, useState} from "react";

const Home = () => {
    const { t } = useTranslation('common')
    const [titleRef, isTitleHidden] = useIntersectionHide();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);

    const slides = [
        {
            title: t("slide1_title"),
            content: t("slide1_text"),
            image: opening_photo
        },
        {
            title: t("slide2_title"),
            content: t("slide2_text"),
            image: dron
        },
        {
            title: t("slide3_title"),
            content: t("slide3_text"),
            image: turbine_photo
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length, resetTimer]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setResetTimer((prev) => !prev);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
        setResetTimer((prev) => !prev);
    };
    
    return (
        <div className='home page' id='home'>

            <div className='opening'>
                <div className="carousel">
                    <button onClick={prevSlide} className="prev-button">❮</button>
                    <div className="carousel-inner">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`slide ${index === currentIndex ? "active" : ""}`}
                            >
                                <img src={slide.image.src} alt={slide.title} className="slide-image" />
                                <div className="overlay">
                                    <div className="text-box">
                                        <div className={`opening_text ${isTitleHidden ? 'hidden' : ''}`} ref={titleRef}>
                                            <h3>{slide.title}</h3>
                                            <p>{slide.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={nextSlide} className="next-button">❯</button>
                </div>
            </div>

            <div className="text text_container">
                <div className='text1_background'>
                    <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>

                    </div>
                </div>

                <div className='text2_background' id='areas'>
                    <div ref={sec2Ref} className={`text text2 text_width ${isSec2Hidden ? 'hidden' : ''}`}>

                    </div>
                </div>

                <div className='text3_background' id='cooperation'>
                    <div ref={sec3Ref} className={`text text3 text_width ${isSec3Hidden ? 'hidden' : ''}`}>
                        <h1>
                            {t("cooperation")}
                        </h1>
                        <div className='text3_images_container'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;