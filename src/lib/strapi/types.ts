import { getStrapiMediaUrl} from "@/lib/strapi/media";

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

export function mapImage(
    image?: StrapiImage | StrapiImage[] | null
): PageImage | undefined {
    const imageItem = Array.isArray(image) ? image[0] : image;

    if (!imageItem?.url) return undefined;

    return {
        url: getStrapiMediaUrl(imageItem.url),
        alternativeText: imageItem.alternativeText ?? "",
    };
}