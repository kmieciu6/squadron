import {
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage, mapImages,
} from "@/lib/strapi";

export type HomePageData = {
    title_opening1: string;
    title_opening2: string;
    title_opening3: string;
    title_opening4: string;
    text_opening1: string;
    text_opening2: string;
    text_opening3: string;
    text_opening4: string;
    cat1_title: string;
    cat1_offer1_title: string;
    cat1_offer1: string;
    cat1_offer2_title: string;
    cat1_offer2: string;
    cat1_offer3_title: string;
    cat1_offer3: string;
    cat1_offer4_title: string;
    cat1_offer4: string;
    cat2_title: string;
    cat2_offer1_title: string;
    cat2_offer1: string;
    cat2_offer2_title: string;
    cat2_offer2: string;
    cat2_offer3_title: string;
    cat2_offer3: string;
    cat2_offer4_title: string;
    cat2_offer4: string;
    cat3_title: string;
    cat3_offer1_title: string;
    cat3_offer1: string;
    cat3_offer2_title: string;
    cat3_offer2: string;
    cat3_offer3_title: string;
    cat3_offer3: string;
    cat3_offer4_title: string;
    cat3_offer4: string;
    cat4_title: string;
    cat4_offer1_title: string;
    cat4_offer1: string;
    cat4_offer2_title: string;
    cat4_offer2: string;
    cat4_offer3_title: string;
    cat4_offer3: string;
    cat4_offer4_title: string;
    cat4_offer4: string;
    images: PageImage[];
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
    cat1_title?: string | null;
    cat1_offer1_title?: string | null;
    cat1_offer1?: string | null;
    cat1_offer2_title?: string | null;
    cat1_offer2?: string | null;
    cat1_offer3_title?: string | null;
    cat1_offer3?: string | null;
    cat1_offer4_title?: string | null;
    cat1_offer4?: string | null;
    cat2_title?: string | null;
    cat2_offer1_title?: string | null;
    cat2_offer1?: string | null;
    cat2_offer2_title?: string | null;
    cat2_offer2?: string | null;
    cat2_offer3_title?: string | null;
    cat2_offer3?: string | null;
    cat2_offer4_title?: string | null;
    cat2_offer4?: string | null;
    cat3_title?: string | null;
    cat3_offer1_title?: string | null;
    cat3_offer1?: string | null;
    cat3_offer2_title?: string | null;
    cat3_offer2?: string | null;
    cat3_offer3_title?: string | null;
    cat3_offer3?: string | null;
    cat3_offer4_title?: string | null;
    cat3_offer4?: string | null;
    cat4_title?: string | null;
    cat4_offer1_title?: string | null;
    cat4_offer1?: string | null;
    cat4_offer2_title?: string | null;
    cat4_offer2?: string | null;
    cat4_offer3_title?: string | null;
    cat4_offer3?: string | null;
    cat4_offer4_title?: string | null;
    cat4_offer4?: string | null;
    image?: StrapiImage[] | null;
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
        cat1_title: data.cat1_title ?? "",
        cat1_offer1_title: data.cat1_offer1_title ?? "",
        cat1_offer1: data.cat1_offer1 ?? "",
        cat1_offer2_title: data.cat1_offer2_title ?? "",
        cat1_offer2: data.cat1_offer2 ?? "",
        cat1_offer3_title: data.cat1_offer3_title ?? "",
        cat1_offer3: data.cat1_offer3 ?? "",
        cat1_offer4_title: data.cat1_offer4_title ?? "",
        cat1_offer4: data.cat1_offer4 ?? "",
        cat2_title: data.cat2_title ?? "",
        cat2_offer1_title: data.cat2_offer1_title ?? "",
        cat2_offer1: data.cat2_offer1 ?? "",
        cat2_offer2_title: data.cat2_offer2_title ?? "",
        cat2_offer2: data.cat2_offer2 ?? "",
        cat2_offer3_title: data.cat2_offer3_title ?? "",
        cat2_offer3: data.cat2_offer3 ?? "",
        cat2_offer4_title: data.cat2_offer4_title ?? "",
        cat2_offer4: data.cat2_offer4 ?? "",
        cat3_title: data.cat3_title ?? "",
        cat3_offer1_title: data.cat3_offer1_title ?? "",
        cat3_offer1: data.cat3_offer1 ?? "",
        cat3_offer2_title: data.cat3_offer2_title ?? "",
        cat3_offer2: data.cat3_offer2 ?? "",
        cat3_offer3_title: data.cat3_offer3_title ?? "",
        cat3_offer3: data.cat3_offer3 ?? "",
        cat3_offer4_title: data.cat3_offer4_title ?? "",
        cat3_offer4: data.cat3_offer4 ?? "",
        cat4_title: data.cat4_title ?? "",
        cat4_offer1_title: data.cat4_offer1_title ?? "",
        cat4_offer1: data.cat4_offer1 ?? "",
        cat4_offer2_title: data.cat4_offer2_title ?? "",
        cat4_offer2: data.cat4_offer2 ?? "",
        cat4_offer3_title: data.cat4_offer3_title ?? "",
        cat4_offer3: data.cat4_offer3 ?? "",
        cat4_offer4_title: data.cat4_offer4_title ?? "",
        cat4_offer4: data.cat4_offer4 ?? "",
        images: mapImages(data.image),
    };
}

export async function getHomePage(
    locale: string
): Promise<HomePageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiHomePage>>(
        "/api/home-page?populate[image]=true",
        {
            locale,
        }
    );

    if (!json.data) return null;

    return mapHomePage(json.data);
}