'use client';

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type RefCallback,
} from 'react';
import { usePageLoader } from '@/context/PageLoaderContext';

type Options = IntersectionObserverInit;

type UseIntersectionHideConfig = {
    desktopOptions?: Options;
    mobileOptions?: Options;
    waitForLoader?: boolean;
    revealDelayMs?: number;
    disabled?: boolean;
};

type UseIntersectionHideReturn<T extends Element> = readonly [
    RefCallback<T>,
    boolean,
];

const DEFAULT_DESKTOP_OPTIONS: Options = {
    threshold: 0.4,
    rootMargin: '0px',
};

const DEFAULT_MOBILE_OPTIONS: Options = {
    threshold: 0.2,
    rootMargin: '0px',
};

function useIntersectionHide<T extends Element = HTMLDivElement>(
    config: UseIntersectionHideConfig = {},
): UseIntersectionHideReturn<T> {
    const {
        desktopOptions = DEFAULT_DESKTOP_OPTIONS,
        mobileOptions = DEFAULT_MOBILE_OPTIONS,
        waitForLoader = true,
        revealDelayMs = 0,
        disabled = false,
    } = config;

    const [node, setNode] = useState<T | null>(null);
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const revealTimerRef = useRef<number | null>(null);

    const { loading } = usePageLoader();

    const ref = useCallback((element: T | null) => {
        setNode(element);
    }, []);

    const observerOptions = useMemo(() => {
        if (typeof window === 'undefined') {
            return desktopOptions;
        }

        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        return isMobile ? mobileOptions : desktopOptions;
    }, [desktopOptions, mobileOptions]);

    const reveal = useCallback(() => {
        if (revealTimerRef.current !== null) {
            window.clearTimeout(revealTimerRef.current);
        }

        revealTimerRef.current = window.setTimeout(() => {
            window.requestAnimationFrame(() => {
                setIsHidden(false);
            });
        }, revealDelayMs);
    }, [revealDelayMs]);

    useEffect(() => {
        if (disabled) {
            reveal();

            return () => {
                if (revealTimerRef.current !== null) {
                    window.clearTimeout(revealTimerRef.current);
                    revealTimerRef.current = null;
                }
            };
        }

        if (waitForLoader && loading) {
            return;
        }

        if (!node) {
            return;
        }

        observerRef.current?.disconnect();
        observerRef.current = null;

        let rafId: number | null = null;

        rafId = window.requestAnimationFrame(() => {
            observerRef.current = new IntersectionObserver((entries, observer) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        reveal();

                        observer.unobserve(entry.target);
                        observer.disconnect();
                        observerRef.current = null;
                    }
                }
            }, observerOptions);

            observerRef.current.observe(node);
        });

        return () => {
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }

            if (revealTimerRef.current !== null) {
                window.clearTimeout(revealTimerRef.current);
                revealTimerRef.current = null;
            }

            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, [
        disabled,
        loading,
        node,
        observerOptions,
        reveal,
        waitForLoader,
    ]);

    return [ref, isHidden] as const;
}

export default useIntersectionHide;