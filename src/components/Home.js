import { useState, useEffect, useRef } from 'react';
import useIntersectionHide from './hooks/useIntersectionHide';
import opening_photo from '../assets/dron2.jpg';
import turbine_photo from '../assets/turbiny.jpg';
import droneBackground from '../assets/dron_background.png';
import droneBackground1 from '../assets/dron_background1.png';
import droneBackground2 from '../assets/dron_background2.png';

const Home = () => {
    const [titleRef, isTitleHidden] = useIntersectionHide();
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide();
    const [sec6Ref, isSec6Hidden] = useIntersectionHide();
    const [images, setImages] = useState([]);
    const [offsetY, setOffsetY] = useState(0);
    const sectionRef = useRef(null);
    const [localOffset, setLocalOffset] = useState(0);


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

    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        const handleScroll = () => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            // Gdy sekcja znajduje się w widoku (gdy jej top jest mniejszy od wysokości viewportu)
            const offset = window.innerHeight - rect.top;
            // Ograniczamy wartość, żeby efekt był tylko w obrębie sekcji
            const maxOffset = sectionRef.current.offsetHeight;
            setLocalOffset(Math.min(Math.max(offset, 0), maxOffset));
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const scrollFactor = 1; 

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

            {/* <div ref={sec5Ref} className={`text text5 text_width ${isSec5Hidden ? 'hidden' : ''}`} style={{ transform: `translateX(${offsetY * 0.5}px)` }}> */}
            <div className='text5'>
                <div className='text_overlay'>
                    <h3>Title</h3>
                    <p>
                        Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                        aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                        nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                        consequat Lorem nulla nostrud.
                    </p>
                    <h1>Przykładowy nagłówek</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum.</p>
                    <h1>Przykładowy nagłówek</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum.</p>
                </div>
            </div>
            <section 
                ref={sectionRef} 
                style={{
                    position: 'relative',
                    height: '100vh',      // wysokość sekcji – dopasuj do potrzeb
                    overflow: 'hidden'
                }}
                >
                {/* Kontener, który będzie "przyklejony" */}
                <div 
                    style={{
                    position: 'sticky',
                    top: 0,
                    transform: `translateX(-${localOffset * scrollFactor}px)`,
                    width: '200vw',      // szerokość większa niż viewport, aby był zakres przesunięcia
                    height: '100%',
                    display: 'flex'
                    }}
                >
                    {/* Przykładowe "slajdy" lub segmenty */}
                    <div style={{ width: '50%', background: 'tomato', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h2>Segment 1</h2>
                    </div>
                    <div style={{ width: '50%', background: 'teal', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h2>Segment 2</h2>
                    </div>
                </div>
            </section>

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