import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";

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
    locale: string
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