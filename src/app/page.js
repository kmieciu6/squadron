"use client";
import useIntersectionHide from './hooks/useIntersectionHide';
import useTranslation from './hooks/useTranslation';
import drone from '../../public/images/dron.jpg';
import turbine_photo from '../../public/images/turbiny.jpg';
import opening_photo from '../../public/images/turbins_sea.png';
import icon1 from '../../public/icons/Rocket car icon.png';
import icon2 from '../../public/icons/Document icon.png';
import icon3 from '../../public/icons/Anti-drone systems.png';
import icon4 from '../../public/icons/Drone icon.png';
import {useEffect, useState} from "react";

const Home = () => {
    const { t } = useTranslation('common')
    const [titleRef, isTitleHidden] = useIntersectionHide();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [current, setCurrent] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);

    function highlighted(text) {
        const parts = text.split(/\*\*(.*?)\*\*/g);

        return parts.map((part, i) =>
            i % 2 === 1 ? (
                <span key={i} className="highlight">{part}</span>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    }

    const slides = [
        {
            title: highlighted(t("slide1_title")),
            content: t("slide1_text"),
            image: opening_photo
        },
        {
            title: highlighted(t("slide1_title")),
            content: t("slide1_text"),
            image: drone
        },
        {
            title: highlighted(t("slide1_title")),
            content: t("slide1_text"),
            image: turbine_photo
        },
        // {
        //     type: "video",
        //     title: t("slide4_title"),
        //     content: t("slide4_text"),
        //     video: "/videos/my_video.mp4"
        // }

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

    const options = [
        {
            key: 'offer1',
            img: icon1,
            buttonLabel: t("offer_title1"),
            content : (
                <>
                    <h3>{t("offer_title1_1")}</h3>
                    <li><p>{t("offer_text1_1")}</p></li>
                    <li><p>{t("offer_text1_2")}</p></li>
                    <li><p>{t("offer_text1_3")}</p></li>
                    <br/>
                    <h3>{t("offer_title1_2")}</h3>
                    <li><p>{t("offer_text1_4")}</p></li>
                    <li><p>{t("offer_text1_5")}</p></li>
                    <li><p>{t("offer_text1_6")}</p></li>
                    <li><p>{t("offer_text1_7")}</p></li>
                    <li><p>{t("offer_text1_8")}</p></li>
                    <br/>
                    <h3>{t("offer_title1_3")}</h3>
                    <li><p>{t("offer_text1_9")}</p></li>
                    <li><p>{t("offer_text1_10")}</p></li>
                    <li><p>{t("offer_text1_11")}</p></li>
                    <br/>
                    <h3>{t("offer_title1_4")}</h3>
                    <li><p>{t("offer_text1_12")}</p></li>
                    <li><p>{t("offer_text1_13")}</p></li>
                    <br/>
                    <h3>{t("offer_title1_5")}</h3>
                    <br/>
                    <h3>{t("offer_title1_6")}</h3>
                </>
            ),
        },
        {
            key: 'offer2',
            img: icon2,
            buttonLabel: t("offer_title2"),
            content : (
                <>
                    <h3>{t("offer_title2_1")}</h3>
                    <li><p>{t("offer_text2_1")}</p></li>
                    <li><p>{t("offer_text2_2")}</p></li>
                    <li><p>{t("offer_text2_3")}</p></li>
                    <li><p>{t("offer_text2_4")}</p></li>
                    <li><p>{t("offer_text2_5")}</p></li>
                    <li><p>{t("offer_text2_6")}</p></li>
                    <li><p>{t("offer_text2_7")}</p></li>
                    <br/>
                    <h3>{t("offer_title2_2")}</h3>
                    <li><p>{t("offer_text2_8")}</p></li>
                    <li><p>{t("offer_text2_9")}</p></li>
                    <li><p>{t("offer_text2_10")}</p></li>
                    <li><p>{t("offer_text2_11")}</p></li>
                    <li><p>{t("offer_text2_12")}</p></li>
                    <li><p>{t("offer_text2_13")}</p></li>
                </>
            ),
        },
        {
            key: 'offer3',
            img: icon3,
            buttonLabel: t("offer_title3"),
            content : (
                <>
                    <h3>{t("offer_title3_1")}</h3>
                    <li><p>{t("offer_text3_1")}</p></li>
                    <li><p>{t("offer_text3_2")}</p></li>
                    <li><p>{t("offer_text3_2")}</p></li>
                </>
            ),
        },
        {
            key: 'offer4',
            img: icon4,
            buttonLabel: t("offer_title4"),
            content : (
                <>
                    <h3>{t("offer_title4_1")}</h3>
                    <li><p>{t("offer_text4_1")}</p></li>
                    <li><p>{t("offer_text4_2")}</p></li>
                    <li><p>{t("offer_text4_3")}</p></li>
                    <li><p>{t("offer_text4_4")}</p></li>
                    <li><p>{t("offer_text4_5")}</p></li>
                    <li><p>{t("offer_text4_6")}</p></li>
                    <br/>
                    <h3>{t("offer_title4_2")}</h3>
                    <li><p>{t("offer_text4_7")}</p></li>
                    <li><p>{t("offer_text4_8")}</p></li>
                    <li><p>{t("offer_text4_9")}</p></li>
                </>
            ),
        }
    ];

    const logos = [
        {
            logo: "/logos/ASE GROUP LOGO.png",
            link: "https://ase.pl/"
        },
        {
            logo: "/logos/ASE ATEX ASE GROUP LOGO.png",
            link: "https://aseatex.ase.pl/"
        },
        {
            logo: "/logos/BPR ASE GROUP LOGO.png",
            link: "https://ase.pl/pl/camino-project"
        },
        {
            logo: "/logos/EKO-KONSULT ASE GROUP LOGO.png",
            link: "https://ekokonsult.ase.pl/"
        },
        {
            logo: "/logos/PROJMORS ASE GROUP LOGO.png",
            link: "https://projmors.ase.pl/"
        },

        //powtórka
        {
            logo: "/logos/ASE GROUP LOGO.png",
            link: "https://ase.pl/"
        },
        {
            logo: "/logos/ASE ATEX ASE GROUP LOGO.png",
            link: "https://aseatex.ase.pl/"
        },
        {
            logo: "/logos/BPR ASE GROUP LOGO.png",
            link: "https://ase.pl/pl/camino-project"
        },
        {
            logo: "/logos/EKO-KONSULT ASE GROUP LOGO.png",
            link: "https://ekokonsult.ase.pl/"
        },
        {
            logo: "/logos/PROJMORS ASE GROUP LOGO.png",
            link: "https://projmors.ase.pl/"
        }
    ];

    const allLogos = [...logos, ...logos];

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
                                {slide.type === "video" ? (
                                    <video
                                        src={slide.video}
                                        className="slide-image"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={slide.image.src}
                                         alt={slide.title}
                                         className="slide-image"
                                    />
                                )}
                                <div className="overlay">
                                    <div className="text-box">
                                        <div className={`opening_text ${isTitleHidden ? 'hidden' : ''}`} ref={titleRef}>
                                            <h3>{slide.title}</h3>
                                            {/*<p>{slide.content}</p>*/}
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
                <div className='text1_background' id='offer'>
                    <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                        <h1>
                            {t('offer')}
                        </h1>
                        <div className="text1_container">
                            <div className="switcher_buttons">
                                {options.map((opt, idx) => (
                                    <button
                                        key={opt.key}
                                        className={idx === current ? "active" : ""}
                                        onClick={() => setCurrent(idx)}
                                    >
                                        <img src={opt.img.src} alt={opt.buttonLabel} />
                                        <p>{opt.buttonLabel}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="switcher_text">
                                {options[current].content}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text2_background' id='about'>
                    <div ref={sec2Ref} className={`text text2 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                        <div className='container'>
                            <div className='content'>
                                <div>
                                    <h2>
                                        {t("about_title1")}
                                    </h2>
                                    <p>
                                        {t("about_text1")}
                                </p>
                                </div>
                            </div>
                        </div>

                        <div className='container'>
                        <div className='content'>
                                <div>
                                    <h2>
                                        {t("about_title2")}
                                    </h2>
                                    <p>
                                        {t("about_text2")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='content'>
                                <div>
                                    <h2>
                                        {t("about_title3")}
                                    </h2>
                                    <p>
                                        {t("about_text3")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text3_background' id='reference'>
                    <div ref={sec3Ref} className={`text text3 text_width ${isSec3Hidden ? 'hidden' : ''}`}>
                        <h1>
                            {t("reference")}
                        </h1>
                    </div>
                </div>

                <div className='text4_background' id='cooperation'>
                    <div ref={sec4Ref} className={`text text4 text_width ${isSec4Hidden ? 'hidden' : ''}`}>
                        <h1>
                            {t("partners")}
                        </h1>
                        <div className="logo_slider">
                            <div className="logo_slider-track">
                                {allLogos.map((item, index) => (
                                    <div className="logo_slide" key={index}>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            <img src={item.logo} alt={`partner-${index % logos.length}`}/>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;