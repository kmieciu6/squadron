import { getStrapiMediaUrl } from "./media";
import type { PageImage, StrapiImage } from "./types";

export function mapImage(image?: StrapiImage | null): PageImage | undefined {
    if (!image?.url) return undefined;

    return {
        url: getStrapiMediaUrl(image.url),
        alternativeText: image.alternativeText ?? "",
    };
}