// import React, { useState, useEffect } from 'react';
// import photo from '../assets/1.jpg';

// const LoadingSpinner = () => <div className='loading-spinner'>Trwa ładowanie...</div>;

// const Home = () => {

//     const [isImageLoading, setIsImageLoading] = useState(true);

//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             setIsImageLoading(false);
//         }, 5000); // Zwiększono czas opóźnienia do 5000 ms (czyli 5 sekund)

//         return () => clearTimeout(timeoutId);
//     }, []);

//     const handleImageLoad = () => {
//         setIsImageLoading(false);
//     };

//     const handleImageError = () => {
//         setIsImageLoading(false);
//         // Obsługa błędu ładowania obrazu (jeśli potrzebna)
//     };

//     return (
//         <div>
//             {isImageLoading && (
//                 <div className='overlay'>
//                     <LoadingSpinner />
//                 </div>
//             )}
//             <div className='page-content'>
//                 <h1>Strona z obrazkiem</h1>
//                 <img
//                     src={photo}
//                     alt="Opis zdjęcia"
//                     style={{ display: isImageLoading ? 'none' : 'block' }}
//                     onLoad={handleImageLoad}
//                     onError={handleImageError}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Home;






import photo from '../assets/1.jpg';

const Home = () => {

    return (
        <div>
            
            <div>
                <h1>Home</h1>
                <img
                    src={photo}
                    alt="Opis zdjęcia"
                />
            </div>
        </div>
    );
};

export default Home;
