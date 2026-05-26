import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";

export type HomePageData = {
    title_opening1: string;
    title_opening2: string;
    title_opening3: string;
    title_opening4: string;
    text_opening1?: string;
    text_opening2?: string;
    text_opening3?: string;
    text_opening4?: string;
    content: string;
    image?: PageImage;
};

type StrapiHomePage = {
    title_opening1?: string | null;
    title_opening2?: string | null;
    title_opening3?: string | null;
    title_opening4?: string | null;
    text_opening1?: string | null;
    text_opening2?: string | null;
    text_opening3?: string | null;
    text_opening4?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};

function mapHomePage(data: StrapiHomePage): HomePageData {
    return {
        title_opening1: data.title_opening1 ?? "",
        title_opening2: data.title_opening2 ?? "",
        title_opening3: data.title_opening3 ?? "",
        title_opening4: data.title_opening4 ?? "",
        text_opening1: data.text_opening1 ?? "",
        text_opening2: data.text_opening2 ?? "",
        text_opening3: data.text_opening3 ?? "",
        text_opening4: data.text_opening4 ?? "",
        content: data.content ?? "",
        image: mapImage(data.image),
    };
}

export async function getHomePage(
    locale: string
): Promise<HomePageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiHomePage>>(
        "/api/home-page?populate=image",
        {
            locale,
        }
    );

    if (!json.data) return null;

    return mapHomePage(json.data);
}