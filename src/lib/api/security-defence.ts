import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";
import {SupportedLanguage} from "@/lib/i18n/types";

export type SecurityDefencePageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiSecurityDefencePage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};


export async function getSecurityDefencePage(
    locale: SupportedLanguage
): Promise<SecurityDefencePageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiSecurityDefencePage>>(
        "/api/security-defence-page?populate=image",
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