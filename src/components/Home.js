import { useState, useEffect } from 'react';
import useIntersectionHide from './hooks/useIntersectionHide';
import opening_photo from '../assets/dron2.jpg';
import dron_photo from '../assets/dron.png';
import turbine_photo from '../assets/turbiny.jpg';
import soldier_photo from '../assets/soldier.png';
import carousel1 from '../assets/dron.jpg';
import carousel2 from '../assets/dron1.jpg';
import carousel3 from '../assets/dron2.jpg';
import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [titleRef, isTitleHidden] = useIntersectionHide({ threshold: 0.8, rootMargin: "0px 0px -200px 0px" });
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);
    const { currentLanguage } = useLanguage();

    const slides = [
        {
            title: "Title 1",
            content: "Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Est do reprehenderit mollit",
            image: carousel1
        },
        {
            title: "Title 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum.",
            image: carousel2
        },
        {
            title: "Title 3",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum.",
            image: carousel3
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
    <div className='home page'>
        <div className='opening'> 
            <img
                src={opening_photo}
                alt="opening"
            />      
            <h1
                ref={titleRef}
                className={isTitleHidden ? 'hidden' : ''}
            >
                Aliqua laboris aliquip nulla exercitation elit officia duis.
            </h1>
        </div>

        <div className="text text_container">

            <div className='text1_background'>
                <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                    <div className='text1_container'>
                        <h1>
                            {getTranslation("unique_entity", currentLanguage)}
                        </h1>
                        <div>
                            <p>
                                {getTranslation("home_tex1.1", currentLanguage)}
                            </p>
                            <p>
                                {getTranslation("home_tex1.2", currentLanguage)}
                            </p>
                            <NavLink to="/about" className="read_more_button">
                                {getTranslation("read_more_about", currentLanguage) } 
                                <FontAwesomeIcon icon={faArrowRight} className="icon" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text2_background'>
                <div ref={sec2Ref} className={`text text2 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                    <h1>
                        {getTranslation("areas", currentLanguage)}    
                    </h1>
                    <div className='images_container'>
                        <div className='image'>
                            <img
                                src={dron_photo}
                                alt="turbina"
                            />
                            <div className='text_overlay'>   
                                <h3>
                                    UAV
                                </h3>
                                <p>
                                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                                    consequat Lorem nulla nostrud.
                                </p>
                                <button>
                                    {getTranslation("more", currentLanguage)}
                                </button>
                            </div>                    
                        </div>
                        <div className='image'>
                            <img
                                src={turbine_photo}
                                alt="turbina"
                            />
                            <div className='text_overlay'>   
                                <h3>
                                EKSPERTYZY OFFSHORE
                                </h3>
                                <p>
                                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                                    consequat Lorem nulla nostrud.
                                </p>
                                <button>
                                    {getTranslation("more", currentLanguage)}
                                </button>
                            </div>         
                        </div>
                        <div className='image'>
                            <img
                                src={soldier_photo}
                                alt="turbina"
                            />
                            <div className='text_overlay'> 
                                <h3>
                                    SOFT
                                </h3>  
                                <p>
                                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                                    consequat Lorem nulla nostrud.
                                </p>
                                <button>
                                    {getTranslation("more", currentLanguage)}
                                </button>
                            </div>         
                        </div>
                    </div>
                </div>
            </div>

            <div ref={sec3Ref} className={`text text3 text_width ${isSec3Hidden ? 'hidden' : ''}`}>
                <p>
                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                    consequat Lorem nulla nostrud.
                </p>
            </div>

            <div ref={sec4Ref} className={`text text4 text_width ${isSec4Hidden ? 'hidden' : ''}`}>
                <div className="carousel">
                    <button onClick={prevSlide} className="prev-button">❮</button>
                    <div className="carousel-inner">
                        {slides.map((slide, index) => (
                            <div 
                                key={index} 
                                className={`slide ${index === currentIndex ? "active" : ""}`}
                            >
                                <div className='text-column'>
                                    <div className='text-container'>
                                        <h3>{slide.title}</h3>
                                        <p>{slide.content}</p>
                                    </div>
                                </div>
                                <div className='image-column'>
                                    <img src={slide.image} alt={slide.title} className="slide-image" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={nextSlide} className="next-button">❯</button>
                </div>
            </div>

            <div ref={sec5Ref} className={`text text5 text_width ${isSec5Hidden ? 'hidden' : ''}`}>
                <p>
                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                    consequat Lorem nulla nostrud.
                </p>
            </div>
        </div>
    </div>
    );
};

export default Home;