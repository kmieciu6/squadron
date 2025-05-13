"use client";
import { useRef, useState, useEffect } from 'react';

export default function useIntersectionHide(
    desktopOptions = { threshold: 0.2, rootMargin: "100px" }, 
    mobileOptions = { threshold: 0.2, rootMargin: "0px" }
) {
    const ref = useRef(null);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const observerOptions = isMobile ? mobileOptions : desktopOptions;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
              // console.log("Observed:", entry.target, "isIntersecting:", entry.isIntersecting); // Debug
                if (entry.isIntersecting) {
                    setIsHidden(false);
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [desktopOptions, mobileOptions]);
    
    return [ref, isHidden];
}