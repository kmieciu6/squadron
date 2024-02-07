// import React, { useState, useEffect, cloneElement } from 'react';

// const LoadingSpinner = () => <div className='loading-spinner'></div>;

// const PageLoader = ({ children }) => {
//   const [isPageLoading, setIsPageLoading] = useState(true);

//   const handleLoad = () => {
//     setIsPageLoading(false);
//   };

//   useEffect(() => {
//     window.addEventListener('load', handleLoad);
//     return () => window.removeEventListener('load', handleLoad);
//   }, []);

//   const loadedChildren = cloneElement(children, { onLoad: handleLoad });

//   return (
//     <div>
//       {isPageLoading && (
//         <div className='overlay'>
//           <LoadingSpinner />
//         </div>
//       )}
//       {loadedChildren}
//     </div>
//   );
// };

// export default PageLoader;









import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => <div className='loading-spinner'></div>;

const PageLoader = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div>
      {isPageLoading && (
        <div className='overlay'>
          <LoadingSpinner />
        </div>
      )}
      {children}
    </div>
  );
};

export default PageLoader;
