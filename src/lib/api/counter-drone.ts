import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";

export type CounterDronePageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiCounterDronePage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};


export async function getCounterDronePage(
    locale: string
): Promise<CounterDronePageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiCounterDronePage>>(
        "/api/counter-drone-page?populate=image",
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