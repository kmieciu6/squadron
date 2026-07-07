'use client';

import { createContext, useContext } from 'react';

export type PageLoaderContextValue = {
    loading: boolean;
    targetHash: string | null;
};

export const PageLoaderContext = createContext<PageLoaderContextValue>({
    loading: false,
    targetHash: null,
});

export const usePageLoader = () => useContext(PageLoaderContext);