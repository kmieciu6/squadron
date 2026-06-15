import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";
import {SupportedLanguage} from "@/lib/i18n/types";

export type StudioPageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiStudioPage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};


export async function getStudioPage(
    locale: SupportedLanguage
): Promise<StudioPageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiStudioPage>>(
        "/api/studio-page?populate=image",
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