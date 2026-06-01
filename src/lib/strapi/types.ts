export type StrapiSingleResponse<T> = {
    data: T | null;
};

export type StrapiCollectionResponse<T> = {
    data: T[];
};

export type StrapiImage = {
    id?: number;
    documentId?: string;
    url?: string | null;
    alternativeText?: string | null;
    name?: string | null;
    width?: number | null;
    height?: number | null;};

export type PageImage = {
    url: string;
    alternativeText: string;
};