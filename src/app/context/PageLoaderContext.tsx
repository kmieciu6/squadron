'use client';

import { createContext, useContext } from 'react';

type PageLoaderContextValue = {
    loading: boolean;
};

export const PageLoaderContext = createContext<PageLoaderContextValue>({
    loading: true,
});

export const usePageLoader = (): PageLoaderContextValue => useContext(PageLoaderContext);