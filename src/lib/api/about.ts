import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";

export type AboutPageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiAboutPage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};


export async function getAboutPage(
    locale: string
): Promise<AboutPageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiAboutPage>>(
        "/api/about-page?populate=image",
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