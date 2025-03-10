import { useRef, useState, useEffect } from 'react';

export default function useIntersectionHide(options = { threshold: 0.8, rootMargin: "100px" }) {
  const ref = useRef(null);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        // console.log("Observed:", entry.target, "isIntersecting:", entry.isIntersecting); // Debug
        if (entry.isIntersecting) {
          setIsHidden(false);
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