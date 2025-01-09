// useIntersectionHide.js
import { useRef, useState, useEffect } from 'react';

/**
 * @param {object} options - obiekt konfiguracyjny IntersectionObserver (np. {threshold: 0.1})
 * @returns {[React.RefObject, boolean]} - tablica [ref, isHidden]
 * 
 * Przykład użycia:
 * const [myRef, isHidden] = useIntersectionHide({ threshold: 0.1 });
 * <div ref={myRef} className={isHidden ? 'hidden' : ''}>Treść</div>
 */
export default function useIntersectionHide(options = { threshold: 0.1 }) {
  const ref = useRef(null);
  // stan: na starcie element ukryty (true => .hidden)
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Zdejmujemy "ukrycie"
          setIsHidden(false);
          // Przestajemy obserwować, by nie zmieniać stanu w tę i nazad
          obs.unobserve(entry.target);
        }
      });
    }, options);

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options]);

  return [ref, isHidden];
}