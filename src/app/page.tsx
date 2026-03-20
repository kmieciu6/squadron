"use client";

import useIntersectionHide from './hooks/useIntersectionHide';
import useTranslation from './hooks/useTranslation';
import wind_farm from '../../public/images/wind_farm.png';
import drone from '../../public/images/drone.png';
import studio from '../../public/images/studio.png';
import security from '../../public/images/security.png';
import icon1 from '../../public/icons/Rocket car icon.png';
import icon2 from '../../public/icons/Document icon.png';
import icon3 from '../../public/icons/Anti-drone systems.png';
import icon4 from '../../public/icons/Drone icon.png';
import React, {JSX, useEffect, useMemo, useState} from "react";
import Image, {StaticImageData} from "next/image";

type SlideImage = StaticImageData;

type Slide =
    | {
    type?: "image";
    titleText: string;              // do alt / SEO
    // titleNode: React.ReactNode;     // do renderu (z highlightami)
    content?: string;
    image: SlideImage;
}
    | {
    type: "video";
    titleText: string;
    // titleNode: React.ReactNode;
    content?: string;
    video: string;
};

type OfferOption = {
    key: string;
    img: StaticImageData;
    buttonLabel: string;
    content: React.ReactNode;
};

type PartnerLogo = {
    logo: string; // ścieżka w /public
    link: string;
};

const Home = (): JSX.Element => {
    const { t } = useTranslation('common')
    const [titleRef, isTitleHidden] = useIntersectionHide<HTMLDivElement>();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide<HTMLDivElement>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);
    const [resetTimer, setResetTimer] = useState<boolean>(false);

    // function highlighted(text: string): React.ReactNode {
    //     const parts = text.split(/\*\*(.*?)\*\*/g);
    //
    //     return parts.map((part, i) =>
    //         i % 2 === 1 ? (
    //             <span key={i} className="highlight">{part}</span>
    //         ) : (
    //             <span key={i}>{part}</span>
    //         )
    //     );
    // }

    const slides: Slide[] = useMemo(() => {
        // const titleText = t("slide1_title");
        return [
            {
                type: "image",
                titleText: t("slide1_title"),
                // titleNode: highlighted(t("slide1_text")),
                // content: t("slide1_text"),
                image: wind_farm
            },
            {
                type: "image",
                titleText: t("slide2_title"),
                // titleNode: highlighted(titleText),
                // content: t("slide2_text"),
                image: drone
            },
            {
                type: "image",
                titleText: t("slide3_title"),
                // titleNode: highlighted(titleText),
                // content: t("slide2_text"),
                image: studio
            },
            {
                type: "image",
                titleText: t("slide4_title"),
                // titleNode: highlighted(titleText),
                // content: t("slide3_text"),
                image: security
            },
        ];
    }, [t]);

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

    const options: OfferOption[] = useMemo(
        () => [
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
    ], [t]);

    const logos: PartnerLogo[] = [
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
                                    <Image
                                        src={slide.image.src}
                                        alt={slide.titleText}
                                        className="slide-image"
                                        width={1200}
                                        height={800}
                                    />
                                )}
                                <div className="overlay">
                                    <div className="text-box">
                                        <div className={`opening_text ${isTitleHidden ? 'hidden' : ''}`} ref={titleRef}>
                                            <h3>{slide.titleText}</h3>
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

                {/*Core Areas*/}
                <div className='text1_background' id='core_areas'>
                    <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                        <h1>
                            {t('core_areas_title1')}
                        </h1>
                        <div className='container'>
                            <div className='content'>
                                <h2>{t('core_areas_title2')}</h2>
                                <a href='/studio_page'>
                                    {t('more')}
                                </a>
                            </div>
                            <div className='content'>
                                <h2>{t('core_areas_title3')}</h2>
                                <a href='/unmanned_aviation_page'>
                                    {t('more')}
                                </a>
                            </div>
                            <div className='content'>
                                <h2>{t('core_areas_title4')}</h2>
                                <a href='/security_defence_page'>
                                    {t('more')}
                                </a>
                            </div>
                            <div className='content'>
                                <h2>{t('core_areas_title5')}</h2>
                                <a href='/counter_drone_page'>
                                    {t('more')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Offer*/}
                <div className='text2_background' id='offer'>
                    <div ref={sec2Ref} className={`text text2 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                        <h1>
                            {t('offer')}
                        </h1>
                        <div className="text2_container">
                            <div className="switcher_buttons">
                                {options.map((opt, idx) => (
                                    <button
                                        key={opt.key}
                                        className={idx === current ? "active" : ""}
                                        onClick={() => setCurrent(idx)}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={opt.img.src} alt={opt.buttonLabel}
                                           width={200}
                                           height={100}
                                        />
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

                {/*About*/}
                <div className='text3_background' id='about'>
                    <div ref={sec3Ref} className={`text text3 text_width ${isSec3Hidden ? 'hidden' : ''}`}>
                        <div className='container'>
                            <div className='content'>
                                <div>
                                    <h2>{t("about_title1")}</h2>
                                    <p>{t("about_text1")}</p>
                                </div>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='content'>
                                <div>
                                  <h2>{t("about_title2")}</h2>
                                  <p>{t("about_text2")}</p>
                                </div>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='content'>
                                <div>
                                    <h2>{t("about_title3")}</h2>
                                    <p>{t("about_text3")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Reference*/}
                <div className='text4_background' id='reference'>
                    <div ref={sec4Ref} className={`text text4 text_width ${isSec4Hidden ? 'hidden' : ''}`}>
                        <h1>{t("reference")}</h1>
                    </div>
                </div>

                {/*Cooperation*/}
                <div className='text5_background' id='cooperation'>
                    <div ref={sec5Ref} className={`text text5 text_width ${isSec5Hidden ? 'hidden' : ''}`}>
                        <h1>{t("partners")}</h1>
                        <div className="logo_slider">
                            <div className="logo_slider-track">
                                {allLogos.map((item, index) => (
                                    <div className="logo_slide" key={index}>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            <Image src={item.logo} alt={`partner-${index % logos.length}`}
                                               width={200}
                                               height={200}
                                            />
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