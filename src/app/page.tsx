"use client";

import useIntersectionHide from './hooks/useIntersectionHide';
import useTranslation from './hooks/useTranslation';
import drone from '../../public/images/drone.png';
import studio from '../../public/images/studio.png';
import security from '../../public/images/security.png';
import counter_drone from '../../public/images/counter_drone.png';
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
    titleText: string;
    content?: string;
    image: SlideImage;
}
    | {
    type: "video";
    titleText: string;
    content?: string;
    video: string;
};

type OfferCattegory = {
    key: string;
    img: StaticImageData;
    title: string;
    subOptions: SubOption[];
};

type SubOption = {
    key: string;
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
    // const [sec4Ref, isSec4Hidden] = useIntersectionHide<HTMLDivElement>();

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentCategory, setCurrentCategory] = useState<number>(0);
    const [currentSubOptions, setCurrentSubOptions] = useState<number>(0);
    const [resetTimer, setResetTimer] = useState<boolean>(false);

    const slides: Slide[] = useMemo(() => {
        return [
            {
                type: "image",
                titleText: t("slide_title1"),
                content: t("slide_text1"),
                image: drone
            },
            {
                type: "image",
                titleText: t("slide_title2"),
                content: t("slide_text2"),
                image: security
            },
            {
                type: "image",
                titleText: t("slide_title3"),
                content: t("slide_text3"),
                image: studio
            },
            {
                type: "image",
                titleText: t("slide_title4"),
                content: t("slide_text4"),
                image: counter_drone
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

    const goToSlide = (index: number ) => {
        setCurrentIndex(index);
        setResetTimer((prev) => !prev);
    }

    const handleCategoryChange = (idx: number) => {
        setCurrentCategory(idx);
        setCurrentSubOptions(0);
    }

    const categories: OfferCattegory[] = useMemo(
        () => [
        {
            key: "cat1",
            img: icon1,
            title: t("offer_category_title1"),
            subOptions: [
                {
                    key: "offer1",
                    buttonLabel: t("offer1_title1"),
                    content : (
                        <>
                            <h3>{t("offer1_title2")}</h3>
                            <ul>
                                <li>{t("offer1_text1")}</li>
                                <li>{t("offer1_text2")}</li>
                                <li>{t("offer1_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer1_title3")}</h3>
                            <ul>
                                <li>{t("offer1_text4")}</li>
                                <li>{t("offer1_text5")}</li>
                            </ul>
                        </>
                    )
                },
                {
                    key: "offer2",
                    buttonLabel: t("offer2_title1"),
                    content : (
                        <>
                            <h3>{t("offer2_title2")}</h3>
                            <ul>
                                <li>{t("offer2_text1")}</li>
                                <li>{t("offer2_text2")}</li>
                                <li>{t("offer2_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer2_title3")}</h3>
                            <ul>
                                <li>{t("offer2_text4")}</li>
                                <li>{t("offer2_text5")}</li>
                                <li>{t("offer2_text6")}</li>
                                <li>{t("offer2_text7")}</li>
                                <li>{t("offer2_text8")}</li>
                            </ul>
                        </>
                    )
                },
                {
                    key: "offer3",
                    buttonLabel: t("offer3_title1"),
                    content : (
                        <>
                            <h3>{t("offer3_title2")}</h3>
                            <ul>
                                <li>{t("offer3_text1")}</li>
                                <li>{t("offer3_text2")}</li>
                                <li>{t("offer3_text3")}</li>
                                <li>{t("offer3_text4")}</li>
                                <li>{t("offer3_text5")}</li>
                                <li>{t("offer3_text6")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer3_title3")}</h3>
                            <ul>
                                <li>{t("offer3_text7")}</li>
                                <li>{t("offer3_text8")}</li>
                                <li>{t("offer3_text9")}</li>
                            </ul>
                        </>
                    )
                },
                {
                    key: "offer4",
                    buttonLabel: t("offer4_title1"),
                    content : (
                        <>
                            <h3>{t("offer4_title2")}</h3>
                            <ul>
                                <li>{t("offer4_text1")}</li>
                                <li>{t("offer4_text2")}</li>
                                <li>{t("offer4_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer4_title3")}</h3>
                            <ul>
                                <li>{t("offer4_text4")}</li>
                                <li>{t("offer4_text5")}</li>
                            </ul>
                        </>
                    )
                },
            ]
        },
        {
            key: "cat2",
            img: icon2,
            title: t("offer_category_title2"),
            subOptions: [
                {
                    key: 'offer5',
                    buttonLabel: t("offer5_title1"),
                    content: (
                        <>
                            <h3>{t("offer5_title2")}</h3>
                            <ul>
                                <li>{t("offer5_text1")}</li>
                                <li>{t("offer5_text2")}</li>
                                <li>{t("offer5_text3")}</li>
                                <li>{t("offer5_text4")}</li>
                                <li>{t("offer5_text5")}</li>
                                <li>{t("offer5_text6")}</li>
                                <li>{t("offer5_text7")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer5_title3")}</h3>
                            <ul>
                                <li>{t("offer5_text8")}</li>
                                <li>{t("offer5_text9")}</li>
                                <li>{t("offer5_text10")}</li>
                                <li>{t("offer5_text11")}</li>
                                <li>{t("offer5_text12")}</li>
                                <li>{t("offer5_text13")}</li>
                            </ul>
                        </>
                    ),
                },
                {
                    key: "offer6",
                    buttonLabel: t("offer6_title1"),
                    content : (
                        <>
                            <h3>{t("offer6_title2")}</h3>
                            <ul>
                                <li>{t("offer6_text1")}</li>
                                <li>{t("offer6_text2")}</li>
                                <li>{t("offer6_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer6_title3")}</h3>
                            <ul>
                                <li>{t("offer6_text4")}</li>
                                <li>{t("offer6_text5")}</li>
                            </ul>
                        </>
                    )
                },
                {
                    key: "offer7",
                    buttonLabel: t("offer7_title1"),
                    content : (
                        <>
                        </>
                    )
                },
                {
                    key: "offer8",
                    buttonLabel: t("offer8_title1"),
                    content : (
                        <>
                            <iframe
                                src="https://docs.google.com/presentation/d/10qFqRrjAWiMn92TMHgGQOXumw2Jovo7h96_t0yUc1do/edit?slide=id.g3d36bb218e4_2_85#slide=id.g3d36bb218e4_2_85"
                                width="100%"
                                height="600"
                                allowFullScreen
                                loading="lazy"
                                className='iframe'
                            />
                        </>
                    )
                },
            ]
        },
        {
            key: "cat3",
            img: icon3,
            title: t("offer_category_title3"),
            subOptions: [
                {
                    key: 'offer9',
                    buttonLabel: t("offer9_title1"),
                    content: (
                        <>
                            <h3>{t("offer9_title2")}</h3>
                            <ul>
                                <li>{t("offer9_text1")}</li>
                                <li>{t("offer9_text2")}</li>
                                <li>{t("offer9_text3")}</li>
                                <li>{t("offer9_text4")}</li>
                                <li>{t("offer9_text5")}</li>
                                <li>{t("offer9_text6")}</li>
                                <li>{t("offer9_text7")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer9_title3")}</h3>
                            <ul>
                                <li>{t("offer9_text8")}</li>
                                <li>{t("offer9_text9")}</li>
                                <li>{t("offer9_text10")}</li>
                                <li>{t("offer9_text11")}</li>
                                <li>{t("offer9_text12")}</li>
                                <li>{t("offer9_text13")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer9_title4")}</h3>
                            <br/>
                            <h3>{t("offer9_title5")}</h3>
                        </>
                    ),
                },
                {
                    key: "offer10",
                    buttonLabel: t("offer10_title1"),
                    content : (
                        <>
                            <h3>{t("offer10_title2")}</h3>
                            <ul>
                                <li>{t("offer10_text1")}</li>
                                <li>{t("offer10_text2")}</li>
                                <li>{t("offer10_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer10_title3")}</h3>
                            <ul>
                                <li>{t("offer10_text4")}</li>
                                <li>{t("offer10_text5")}</li>
                            </ul>
                        </>
                    )
                },
                {
                    key: "offer11",
                    buttonLabel: t("offer11_title1"),
                    content : (
                        <>
                            <h3>{t("offer11_title2")}</h3>
                            <ul>
                                <li>{t("offer11_text1")}</li>
                                <li>{t("offer11_text2")}</li>
                                <li>{t("offer11_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer11_title3")}</h3>
                            <ul>
                                <li>{t("offer11_text4")}</li>
                                <li>{t("offer11_text5")}</li>
                            </ul>
                        </>
                    )
                },
                // {
                //     key: "offer12",
                //     buttonLabel: t("offer12_title1"),
                //     content : (
                //         <>
                //         </>
                //     )
                // },
            ]
        },
        {
            key: "cat4",
            img: icon4,
            title: t("offer_category_title4"),
            subOptions: [
                {
                    key: 'offer13',
                    buttonLabel: t("offer13_title1"),
                    content: (
                        <>
                            <h3>{t("offer13_title2")}</h3>
                            <ul>
                                <li>{t("offer13_text1")}</li>
                                <li>{t("offer13_text2")}</li>
                                <li>{t("offer13_text3")}</li>
                                <li>{t("offer13_text4")}</li>
                                <li>{t("offer13_text5")}</li>
                                <li>{t("offer13_text6")}</li>
                                <li>{t("offer13_text7")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer13_title3")}</h3>
                            <ul>
                                <li>{t("offer13_text8")}</li>
                                <li>{t("offer13_text9")}</li>
                                <li>{t("offer13_text10")}</li>
                                <li>{t("offer13_text11")}</li>
                                <li>{t("offer13_text12")}</li>
                                <li>{t("offer13_text13")}</li>
                            </ul>
                        </>
                    ),
                },
                {
                    key: "offer14",
                    buttonLabel: t("offer14_title1"),
                    content : (
                        <>
                            <h3>{t("offer14_title2")}</h3>
                            <ul>
                                <li>{t("offer14_text1")}</li>
                                <li>{t("offer14_text2")}</li>
                                <li>{t("offer14_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer14_title3")}</h3>
                            <ul>
                                <li>{t("offer14_text4")}</li>
                                <li>{t("offer14_text5")}</li>
                            </ul>
                        </>
                    )
                },
                {
                    key: "offer15",
                    buttonLabel: t("offer15_title1"),
                    content : (
                        <>
                            <h3>{t("offer15_title2")}</h3>
                            <ul>
                                <li>{t("offer15_text1")}</li>
                                <li>{t("offer15_text2")}</li>
                                <li>{t("offer15_text3")}</li>
                            </ul>
                            <br/>
                            <h3>{t("offer15_title3")}</h3>
                            <ul>
                                <li>{t("offer15_text4")}</li>
                                <li>{t("offer15_text5")}</li>
                            </ul>
                        </>
                    )
                },
                // {
                //     key: "offer16",
                //     buttonLabel: t("offer16_title1"),
                //     content : (
                //         <>
                //         </>
                //     )
                // },
            ]
        },
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
                                            <h3>{slide.content}</h3>
                                        </div>
                                    </div>
                                    <div className={`carousel-nav ${isTitleHidden ? 'hidden' : ''}`} ref={titleRef}>
                                        {slides.map((slide, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`carousel-nav-item ${index === currentIndex ? "active" : ""}`}
                                                onClick={() => goToSlide(index)}
                                            >
                                                <p>
                                                    {slide.titleText}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                          </div>
                        ))}
                    </div>
                    <button onClick={nextSlide} className="next-button">❯</button>
                </div>
            </div>

            <div className="text_container">

                {/*Offer*/}
                <div className='offer' id='offer'>
                    <div ref={sec1Ref} className={`text text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                        <h1>
                            {t('offer')}
                        </h1>
                        <div className="text_content">
                            <div className="switcher_category_buttons">
                                {categories.map((opt, idx) => (
                                    // <button
                                    //     key={opt.key}
                                    //     className={idx === currentCategory ? "active" : ""}
                                    //     onClick={() => handleCategoryChange(idx)}
                                    // >
                                    //     <Image
                                    //         src={opt.img}
                                    //         alt={opt.title}
                                    //         className='img'
                                    //         loading="eager"
                                    //     />
                                    //     <p>{opt.title}</p>
                                    // </button>

                                    <React.Fragment key={opt.key}>
                                        <button
                                            className={idx === currentCategory ? "active" : ""}
                                            onClick={() => handleCategoryChange(idx)}
                                        >
                                            <Image
                                                src={opt.img}
                                                alt={opt.title}
                                                className="img"
                                                loading="eager"
                                            />
                                            <p>{opt.title}</p>
                                        </button>

                                        {idx === currentCategory && (
                                            <div className="mobile_only">
                                                <div className="switcher_offer_buttons">
                                                    {categories[currentCategory].subOptions.map((opt, subIdx) => (
                                                        <button
                                                            key={opt.key}
                                                            className={subIdx === currentSubOptions ? "active" : ""}
                                                            onClick={() => setCurrentSubOptions(subIdx)}
                                                        >
                                                            <p>{opt.buttonLabel}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="switcher_text">
                                                    {categories[currentCategory].subOptions[currentSubOptions].content}
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className='switcher_offer_buttons desktop_only'>
                                {categories[currentCategory].subOptions.map((opt, idx) => (
                                    <button
                                        key={opt.key}
                                        className={idx === currentSubOptions ? "active" : ""}
                                        onClick={() => setCurrentSubOptions(idx)}
                                    >
                                        {/*<Image*/}
                                        {/*    src={opt.img}*/}
                                        {/*    alt={opt.buttonLabel}*/}
                                        {/*    className='img'*/}
                                        {/*    loading="eager"*/}
                                        {/*/>*/}
                                        <p>{opt.buttonLabel}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="switcher_text desktop_only">
                                {categories[currentCategory].subOptions[currentSubOptions].content}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/*Reference*/}
                <div className='reference' id='reference'>
                    <div ref={sec2Ref} className={`text text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                        <h1>{t("reference")}</h1>
                    </div>
                </div>

                {/*Cooperation*/}
                <div className='cooperation' id='cooperation'>
                    <div ref={sec3Ref} className={`text text_width ${isSec3Hidden ? 'hidden' : ''}`}>
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