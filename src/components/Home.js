import opening_photo from '../assets/dron2.jpg';
import useIntersectionHide from './hooks/useIntersectionHide';

const Home = () => {

    const [titleRef, isTitleHidden] = useIntersectionHide();

    const [sec1Ref, isSec1Hidden] = useIntersectionHide();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide();
    const [sec6Ref, isSec6Hidden] = useIntersectionHide();

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

        <div className="text">
            
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

            <div ref={sec2Ref} className={`text text2 ${isSec2Hidden ? 'hidden' : ''}`}>
                <div className='text_width'>
                    <p>
                        Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                        aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                        nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                        consequat Lorem nulla nostrud.
                    </p>
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
                <p>
                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                    consequat Lorem nulla nostrud.
                </p>
            </div>

            <div ref={sec5Ref} className={`text text5 text_width ${isSec5Hidden ? 'hidden' : ''}`}>
                <p>
                    Do pariatur et elit cupidatat do ipsum mollit. Ullamco est do reprehenderit mollit. Eiusmod aliqua eiusmod nulla 
                    aute id id irure incididunt dolore. Eiusmod anim duis labore elit nisi ex nulla. Quis officia ut et veniam proident 
                    nulla reprehenderit magna pariatur culpa commodo. Reprehenderit velit consequat sint magna sunt dolor et ipsum 
                    consequat Lorem nulla nostrud.
                </p>
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