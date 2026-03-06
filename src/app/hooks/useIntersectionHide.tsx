"use client";

import { useRef, useState, useEffect, type RefObject } from "react";

type Options = IntersectionObserverInit;

type UseIntersectionHideReturn<T extends Element> = readonly [
    RefObject<T | null>,
    boolean
];

function useIntersectionHide<T extends Element = HTMLDivElement>(
    desktopOptions: Options = { threshold: 0.2, rootMargin: "100px" },
    mobileOptions: Options = { threshold: 0.2, rootMargin: "0px" }
): UseIntersectionHideReturn<T> {
    const ref = useRef<T | null>(null);
    const [isHidden, setIsHidden] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const observerOptions = isMobile ? mobileOptions : desktopOptions;

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver((entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setIsHidden(false);
                    obs.unobserve(entry.target);
                }
            }
        }, observerOptions);

        observer.observe(el);

        return () => {
            observer.unobserve(el);
            observer.disconnect();
        };
    }, [desktopOptions, mobileOptions]);

    return [ref, isHidden] as const;
}

export default useIntersectionHide;