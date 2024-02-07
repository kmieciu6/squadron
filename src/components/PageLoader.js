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







// PageLoader.js

import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => <div className='loading-spinner'></div>;

const PageLoader = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    const resources = Array.from(document.querySelectorAll('img, script, link[rel="stylesheet"]'));
    const totalResources = resources.length;
    let loadedResources = 0;

    const handleResourceLoad = () => {
      loadedResources++;
      if (loadedResources === totalResources) {
        setIsPageLoading(false);
      }
    };

    resources.forEach(resource => {
      if ((resource.tagName === 'IMG' || resource.tagName === 'LINK' || resource.tagName === 'SCRIPT') && resource.readyState === 'complete') {
        handleResourceLoad();
      } else {
        resource.addEventListener('load', handleResourceLoad);
      }
    });

    return () => {
      resources.forEach(resource => {
        resource.removeEventListener('load', handleResourceLoad);
      });
    };
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
