import { useState, useEffect, useRef } from 'react';
import useIntersectionHide from './hooks/useIntersectionHide';
import opening_photo from '../assets/dron2.jpg';
import turbine_photo from '../assets/turbiny.jpg';
import droneBackground from '../assets/dron_background.png';
import droneBackground1 from '../assets/dron_background1.png';
import droneBackground2 from '../assets/dron_background2.png';
import carousel1 from '../assets/dron.jpg';
import carousel2 from '../assets/dron1.jpg';
import carousel3 from '../assets/dron2.jpg';

const Home = () => {
    const [titleRef, isTitleHidden] = useIntersectionHide();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide();
    const [sec6Ref, isSec6Hidden] = useIntersectionHide();
    const [images, setImages] = useState([]);

    const textContainerRef = useRef(null);
    const droneImages = [droneBackground, droneBackground1, droneBackground2];

    const MIN_DISTANCE = 300;
    const MAX_ATTEMPTS = 10;

    const getValidPosition = (existingDrones, containerWidth, containerHeight) => {
        let attempts = 0;
        while (attempts < MAX_ATTEMPTS) {
            const top = Math.random() * (containerHeight - 150);
            const left = Math.random() * (containerWidth - 150);
            const size = Math.random() * 50 + 100; // Rozmiar między 100 a 150px

            // Sprawdzenie, czy dron nie nachodzi na inne
            const tooClose = existingDrones.some(drone => {
                const dx = parseFloat(drone.left) - left;
                const dy = parseFloat(drone.top) - top;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return distance < MIN_DISTANCE;
            });

            if (!tooClose) return { top: `${top}px`, left: `${left}px`, size: `${size}px` };
            attempts++;
        }

        console.warn("Nie mogę znaleźć wolnego miejsca dla nowego drona!");
        return { top: "50%", left: "50%", size: "120px" }; // Domyślna pozycja awaryjna
    };

    const getRandomDrone = () => {
        return droneImages[Math.floor(Math.random() * droneImages.length)];
    }

    useEffect(() => {
        if (!textContainerRef.current) {
            console.warn("`textContainerRef.current` jest NULL – czekam...");
            return;
        }

        const container = textContainerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        console.log("Generuję drony w `text_container`!");

        let generatedDrones = [];

        for (let i = 0; i < 7; i++) {
            const { top, left, size } = getValidPosition(generatedDrones, containerWidth, containerHeight);
            generatedDrones.push({
                id: i,
                src: getRandomDrone(),
                top,
                left,
                size
            });
        }

        setImages(generatedDrones);
    }, []);

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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);
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

        <div className="text text_container" ref={textContainerRef}>
            {images.map(({ id, src, top, left, size }) => (
                <img 
                    key={id}
                    src={src}
                    alt="drone"
                    className='drone_img'
                    style={{ 
                        top,
                        left,
                        width: size,
                    }}
                />
            ))}
            
            <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                <h2>
                    Do pariatur et elit cupidatat do ipsum mollit
                </h2>
                <p>
                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                    consequat Lorem nulla nostrud.
                </p>
            </div>


            <div className='text_background'>
                <div ref={sec2Ref} className={`text text2 text_width ${isSec2Hidden ? 'hidden' : ''}`}>
                    <p>
                        Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                        aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                        nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                        consequat Lorem nulla nostrud.
                    </p>
                </div>
            </div>

            <div ref={sec3Ref} className={`text text3 text_width ${isSec3Hidden ? 'hidden' : ''}`}>
                <div className='image_container'>
                    <img
                        src={turbine_photo}
                        alt="turbina"
                    />
                    <div className='text_overlay'>   
                        <h4>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.    
                        </h4>
                    </div>                    
                </div>
                <p>
                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                    consequat Lorem nulla nostrud.
                </p>
            </div>

            <div ref={sec4Ref} className={`text text4 text_width ${isSec4Hidden ? 'hidden' : ''}`}>
                <p>
                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                    consequat Lorem nulla nostrud.
                </p>
            </div>

            <div ref={sec5Ref} className={`text text5 text_width ${isSec5Hidden ? 'hidden' : ''}`}>
                <div className='text_overlay'>
                    {/* <h3>Title</h3>
                    <p>
                        Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                        aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                        nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                        consequat Lorem nulla nostrud.
                    </p>
                    <h1>Przykładowy nagłówek</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum.</p>
                    <h1>Przykładowy nagłówek</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum.</p> */}
                    <div className="carousel">
                        <button onClick={prevSlide} className="prev-button">❮</button>
                        <div className="slide">
                            <img src={slides[currentIndex].image} alt={slides[currentIndex].title} className="slide-image" />
                            <h3>{slides[currentIndex].title}</h3>
                            <p>{slides[currentIndex].content}</p>
                        </div>
                        <button onClick={nextSlide} className="next-button">❯</button>
                    </div>
                </div>
            </div>

            <div ref={sec6Ref} className={`text text6 text_width ${isSec6Hidden ? 'hidden' : ''}`}>
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