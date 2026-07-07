'use client';

import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";
import { usePageLoader } from "@/context/PageLoaderContext";

type LazySectionProps = {
    id?: string;
    children: ReactNode;
    className?: string;
    rootMargin?: string;
    placeholderHeight?: CSSProperties["minHeight"];
    forceRenderAfterMs?: number;
};

const LazySection = ({
        id,
        children,
        className,
        rootMargin = "700px",
        placeholderHeight = "70vh",
        forceRenderAfterMs = 3500,
    }: LazySectionProps) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { targetHash } = usePageLoader();

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (!id || !targetHash || targetHash !== id || shouldRender) {
            return;
        }

        const rafId = window.requestAnimationFrame(() => {
            setShouldRender(true);

            window.requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({
                    block: "start",
                });
            });
        });

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, [id, targetHash, shouldRender]);

    useEffect(() => {
        if (shouldRender) {
            return;
        }

        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin,
            },
        );

        observer.observe(section);

        const fallbackTimerId = window.setTimeout(() => {
            setShouldRender(true);
            observer.disconnect();
        }, forceRenderAfterMs);

        return () => {
            observer.disconnect();
            window.clearTimeout(fallbackTimerId);
        };
    }, [rootMargin, shouldRender, forceRenderAfterMs]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={className}
            style={{
                minHeight: shouldRender ? undefined : placeholderHeight,
            }}
        >
            {shouldRender ? children : null}
        </section>
    );
};

export default LazySection;