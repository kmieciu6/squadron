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
    image_opening: PageImage[];
    label_application: string;
    title_application: string;
    text_application: string;
    application_point1: string;
    application_point2: string;
    application_point3: string;
    application_point4: string;
    badge_application_title: string;
    badge_application_text: string;
    image_application: PageImage[];
    title_offer: string;
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
    title_reference: string;
    text_reference: string;
    title_reference_topic1: string;
    text_reference_topic1: string;
    title_reference_topic2: string;
    text_reference_topic2: string;
    title_reference_topic3: string;
    text_reference_topic3: string;
    title_reference_topic4: string;
    text_reference_topic4: string;
    title_reference_topic5: string;
    text_reference_topic5: string;
    title_reference_topic6: string;
    text_reference_topic6: string;
    title_cooperation: string;
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
    image_opening?: StrapiImage[] | null;
    label_application?: string | null;
    title_application?: string | null;
    text_application?: string | null;
    application_point1?: string | null;
    application_point2?: string | null;
    application_point3?: string | null;
    application_point4?: string | null;
    badge_application_title?: string | null;
    badge_application_text?: string | null;
    image_application?: StrapiImage[] | null;
    title_offer?: string | null;
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
    title_reference?: string | null;
    text_reference?: string | null;
    title_reference_topic1?: string | null;
    text_reference_topic1?: string | null;
    title_reference_topic2?: string | null;
    text_reference_topic2?: string | null;
    title_reference_topic3?: string | null;
    text_reference_topic3?: string | null;
    title_reference_topic4?: string | null;
    text_reference_topic4?: string | null;
    title_reference_topic5?: string | null;
    text_reference_topic5?: string | null;
    title_reference_topic6?: string | null;
    text_reference_topic6?: string | null;
    title_cooperation?: string | null;
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
        image_opening: mapImages(data.image_opening),
        label_application: data.label_application ?? "",
        title_application: data.title_application ?? "",
        text_application: data.text_application ?? "",
        application_point1: data.application_point1 ?? "",
        application_point2: data.application_point2 ?? "",
        application_point3: data.application_point3 ?? "",
        application_point4: data.application_point4 ?? "",
        badge_application_title: data.badge_application_title ?? "",
        badge_application_text: data.badge_application_text ?? "",
        image_application: mapImages(data.image_application),
        title_offer: data.title_offer ?? "",
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
        title_reference: data.title_reference ?? "",
        text_reference: data.text_reference ?? "",
        title_reference_topic1: data.title_reference_topic1 ?? "",
        text_reference_topic1: data.text_reference_topic1 ?? "",
        title_reference_topic2: data.title_reference_topic2 ?? "",
        text_reference_topic2: data.text_reference_topic2 ?? "",
        title_reference_topic3: data.title_reference_topic3 ?? "",
        text_reference_topic3: data.text_reference_topic3 ?? "",
        title_reference_topic4: data.title_reference_topic4 ?? "",
        text_reference_topic4: data.text_reference_topic4 ?? "",
        title_reference_topic5: data.title_reference_topic5 ?? "",
        text_reference_topic5: data.text_reference_topic5 ?? "",
        title_reference_topic6: data.title_reference_topic6 ?? "",
        text_reference_topic6: data.text_reference_topic6 ?? "",
        title_cooperation: data.title_cooperation ?? "",
    };
}

export async function getHomePage(
    locale: string
): Promise<HomePageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiHomePage>>(
        "/api/home-page?populate[image_opening]=true&populate[image_application]=true",
        {
            locale,
        }
    );

    if (!json.data) return null;

    return mapHomePage(json.data);
}