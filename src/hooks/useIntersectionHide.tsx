"use client";

import { useRef, useState, useEffect, type RefObject } from "react";
import {usePageLoader} from "@/context/PageLoaderContext";

type Options = IntersectionObserverInit;

type UseIntersectionHideReturn<T extends Element> = readonly [
    RefObject<T | null>,
    boolean
];

function useIntersectionHide<T extends Element = HTMLDivElement>(
    desktopOptions: Options = { threshold: 0.4, rootMargin: "0px" },
    mobileOptions: Options = { threshold: 0.2, rootMargin: "0px" }
): UseIntersectionHideReturn<T> {
    const ref = useRef<T | null>(null);
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const { loading } = usePageLoader();

    useEffect(() => {
        if (typeof window === "undefined" || loading) return;

        const el = ref.current;
        if (!el) return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const observerOptions = isMobile ? mobileOptions : desktopOptions;

        let observer: IntersectionObserver | null = null;

        const rafId = window.requestAnimationFrame(() => {
            observer = new IntersectionObserver((entries, obs) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setIsHidden(false);
                        obs.unobserve(entry.target);
                    }
                }
            }, observerOptions);

            observer.observe(el);
        });

        return () => {
            window.cancelAnimationFrame(rafId);
            observer?.disconnect();
        };
    }, [desktopOptions, mobileOptions, loading]);

    return [ref, isHidden] as const;
}

export default useIntersectionHide;