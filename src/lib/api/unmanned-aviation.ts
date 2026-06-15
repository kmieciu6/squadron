import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";
import {SupportedLanguage} from "@/lib/i18n/types";

export type UnmannedAviationPageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiUnmannedAviationPage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};


export async function getUnmannedAviationPage(
    locale: SupportedLanguage
): Promise<UnmannedAviationPageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiUnmannedAviationPage>>(
        "/api/unmanned-aviation-page?populate=image",
        {
            locale,
        }
    );

    if (!json.data) {
        return null;
    }

    return {
        title: json.data.title ?? "",
        content: json.data.content ?? "",
        image: mapImage(json.data.image),
    };
}