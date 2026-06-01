import { getStrapiMediaUrl } from "./media";
import type { PageImage, StrapiImage } from "./types";

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

export function mapImages(
    images?: StrapiImage[] | null
): PageImage[] {
    return (images ?? [])
        .map((image) => mapImage(image))
        .filter((image): image is PageImage => Boolean(image));
}