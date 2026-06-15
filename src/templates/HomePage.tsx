'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import useTranslation from '@/hooks/useTranslation';
import { HomePageData } from "@/lib/api/home";
import { MarkdownContent } from "@/components/MarkdownContent";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";

type Slide =
    | {
    type?: "image";
    titleText: string;
    content?: string;
    image: string;
}
    | {
    type: "video";
    titleText: string;
    content?: string;
    video: string;
};

type OfferCategory = {
    key: string;
    img: string;
    title: string;
    subOptions: SubOption[];
};

type SubOption = {
    key: string;
    buttonLabel: string;
    content: React.ReactNode;
};

type PartnerLogo = {
    logo: string;
    link: string;
};

type Props = {
    data: HomePageData;
};

export default function HomePage({ data}: Props) {
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
    const mobileGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mobileTextRef = useRef<HTMLDivElement | null>(null);

    const isMobileOffer = () => {
        if (typeof window === "undefined") return false;

        return window.matchMedia("(max-width: 1023px)").matches;
    };

    const scrollAfterRender = (callback: () => void) => {
        if (!isMobileOffer()) return;

        window.setTimeout(() => {
            window.requestAnimationFrame(callback);
        }, 0);
    };

    const handleMobileCategoryChange = (idx: number) => {
        setCurrentCategory(idx);
        setCurrentSubOptions(0);

        scrollAfterRender(() => {
            mobileGroupRefs.current[idx]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    };

    const handleMobileSubOptionChange = (idx: number) => {
        setCurrentSubOptions(idx);

        scrollAfterRender(() => {
            mobileTextRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    };

    const slides: Slide[] = [
        {
            type: "image",
            titleText: data.title_opening1,
            content: data.text_opening1,
            image: data.images?.[0]?.url ?? "/images/drone.png",
        },
        {
            type: "image",
            titleText: data.title_opening2,
            content: data.text_opening2,
            image: data.images?.[1]?.url ?? "/images/security.png",
        },
        {
            type: "image",
            titleText: data.title_opening3,
            content: data.text_opening3,
            image: data.images?.[2]?.url ?? "/images/studio.png",
        },
        {
            type: "image",
            titleText: data.title_opening4,
            content: data.text_opening4,
            image: data.images?.[3]?.url ?? "/images/counter_drone.png",
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

    const goToSlide = (index: number ) => {
        setCurrentIndex(index);
        setResetTimer((prev) => !prev);
    }

    const handleCategoryChange = (idx: number) => {
        setCurrentCategory(idx);
        setCurrentSubOptions(0);
    }

    const categories: OfferCategory[] = useMemo(
        () => [
            {
                key: "cat1",
                img: "/icons/Rocket car icon.png",
                title: data.cat1_title,
                subOptions: [
                    {
                        key: "offer1",
                        buttonLabel: data.cat1_offer1_title,
                        content: (
                                <MarkdownContent content={data.cat1_offer1}/>
                        )
                    },
                    {
                        key: "offer2",
                        buttonLabel: data.cat1_offer2_title,
                        content: (
                            <MarkdownContent content={data.cat1_offer2}/>
                        )
                    },
                    {
                        key: "offer3",
                        buttonLabel: data.cat1_offer3_title,
                        content: (
                            <MarkdownContent content={data.cat1_offer3}/>
                        )
                    },
                    {
                        key: "offer4",
                        buttonLabel: data.cat1_offer4_title,
                        content: (
                            <MarkdownContent content={data.cat1_offer4}/>
                        )
                    },
                ]
            },
            {
                key: "cat2",
                img: "/icons/Document icon.png",
                title: data.cat2_title,
                subOptions: [
                    {
                        key: 'offer5',
                        buttonLabel: data.cat2_offer1_title,
                        content: (
                            <MarkdownContent content={data.cat2_offer1}/>
                        ),
                    },
                    {
                        key: "offer6",
                        buttonLabel: data.cat2_offer2_title,
                        content: (
                            <MarkdownContent content={data.cat2_offer2}/>
                        )
                    },
                    {
                        key: "offer7",
                        buttonLabel: data.cat2_offer3_title,
                        content: (
                            <MarkdownContent content={data.cat2_offer3}/>
                        )
                    },
                    {
                        key: "offer8",
                        buttonLabel: data.cat2_offer4_title,
                        content: (
                            <>
                                <iframe
                                    src="https://docs.google.com/presentation/d/e/2PACX-1vQ-XBJn8_0R0JoOkc204tphTzZIdat07_oDo42aCvJbHXTfurpxG7iIk-neJ9OME1S3iGvYKjpKoBxN/pubembed?start=true&loop=true&delayms=3000"
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
                img: "/icons/Anti-drone systems.png",
                title: data.cat3_title,
                subOptions: [
                    {
                        key: 'offer9',
                        buttonLabel: data.cat3_offer1_title,
                        content: (
                            <MarkdownContent content={data.cat3_offer1}/>
                        ),
                    },
                    {
                        key: "offer10",
                        buttonLabel: data.cat3_offer2_title,
                        content: (
                            <MarkdownContent content={data.cat3_offer2}/>
                        )
                    },
                    {
                        key: "offer11",
                        buttonLabel: data.cat3_offer3_title,
                        content: (
                            <MarkdownContent content={data.cat3_offer3}/>
                        )
                    },
                    // {
                    //     key: "offer12",
                    //     buttonLabel: data.cat3_offer4_title,
                    //     content: (
                    //         <MarkdownContent content={data.cat3_offer4}/>
                    //     )
                    // },
                ]
            },
            {
                key: "cat4",
                img: "/icons/Drone icon.png",
                title: data.cat4_title,
                subOptions: [
                    {
                        key: 'offer13',
                        buttonLabel: data.cat4_offer1_title,
                        content: (
                            <MarkdownContent content={data.cat4_offer1}/>
                        ),
                    },
                    {
                        key: "offer14",
                        buttonLabel: data.cat4_offer2_title,
                        content: (
                            <MarkdownContent content={data.cat4_offer2}/>
                        )
                    },
                    {
                        key: "offer15",
                        buttonLabel: data.cat4_offer3_title,
                        content: (
                            <MarkdownContent content={data.cat4_offer3}/>
                        )
                    },
                    // {
                    //     key: "offer16",
                    //     buttonLabel: data.cat4_offer4_title,
                    //     content: (
                    //         <MarkdownContent content={data.cat4_offer4}/>
                    //     )
                    // },
                ]
            },
        ], [data.cat1_offer1, data.cat1_offer1_title, data.cat1_offer2, data.cat1_offer2_title, data.cat1_offer3, data.cat1_offer3_title, data.cat1_offer4, data.cat1_offer4_title, data.cat1_title, data.cat2_offer1, data.cat2_offer1_title, data.cat2_offer2, data.cat2_offer2_title, data.cat2_offer3, data.cat2_offer3_title, data.cat2_offer4_title, data.cat2_title, data.cat3_offer1, data.cat3_offer1_title, data.cat3_offer2, data.cat3_offer2_title, data.cat3_offer3, data.cat3_offer3_title, data.cat3_title, data.cat4_offer1, data.cat4_offer1_title, data.cat4_offer2, data.cat4_offer2_title, data.cat4_offer3, data.cat4_offer3_title, data.cat4_title]);

    const selectedCategory = categories[currentCategory];
    const selectedSubOption = selectedCategory?.subOptions[currentSubOptions];

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
                                    src={slide.image}
                                    alt={slide.titleText}
                                    className="slide-image"
                                    width={1200}
                                    height={800}
                                    loading="eager"
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
                    <div className="offer_content">
                        <div className="offer_categories">
                            {categories.map((category, idx) => (
                                    <button
                                        key={category.key}
                                        type="button"
                                        className={`offer_category_card ${idx === currentCategory ? "active" : ""}`}
                                        onClick={() => handleCategoryChange(idx)}
                                    >
                                        <Image
                                            src={category.img}
                                            alt={category.title}
                                            width={100}
                                            height={100}
                                            className="offer_category_icon"
                                            loading="eager"
                                        />
                                        <p>{category.title}</p>
                                    </button>
                            ))}
                        </div>

                        <div className='offer_desktop_panel desktop_only'>
                            <div className="offer_subnav">
                            {selectedCategory.subOptions.map((option, idx) => (
                                <button
                                    key={option.key}
                                    type="button"
                                    className={`offer_subnav_button ${idx === currentSubOptions ? "active" : ""}`}
                                    onClick={() => setCurrentSubOptions(idx)}
                                >
                                    <p>{option.buttonLabel}</p>
                                </button>
                            ))}
                        </div>
                            <div className="offer_text_card">
                                {selectedSubOption?.buttonLabel && (
                                    <h2>{selectedSubOption.buttonLabel}</h2>
                                )}

                                <div className="offer_text_content">
                                    {selectedSubOption?.content}
                                </div>
                            </div>
                        </div>

                        <div className="offer_mobile_panel mobile_only">
                            {categories.map((category, categoryIdx) => (
                                <div
                                    key={category.key}
                                    ref={(el) => {
                                        mobileGroupRefs.current[categoryIdx] = el;
                                    }}
                                    className={`offer_mobile_group ${categoryIdx === currentCategory ? "active" : ""}`}
                                >
                                    <button
                                        type="button"
                                        className="offer_mobile_category"
                                        onClick={() => handleMobileCategoryChange(categoryIdx)}
                                    >
                                        <span>{category.title}</span>
                                        <span>{categoryIdx === currentCategory ? "−" : "+"}</span>
                                    </button>

                                    {categoryIdx === currentCategory && (
                                        <div className="offer_mobile_content">
                                            <div ref={mobileTextRef} className="offer_mobile_subnav">
                                                {category.subOptions.map((option, subIdx) => (
                                                    <button
                                                        key={option.key}
                                                        type="button"
                                                        className={`offer_mobile_subnav_button ${subIdx === currentSubOptions ? "active" : ""}`}
                                                        onClick={() => handleMobileSubOptionChange(subIdx)}
                                                    >
                                                        {option.buttonLabel}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="offer_text_card">
                                                {selectedSubOption?.buttonLabel && (
                                                    <h2>{selectedSubOption.buttonLabel}</h2>
                                                )}

                                                <div className="offer_text_content">
                                                    {selectedSubOption?.content}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
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
    )
}