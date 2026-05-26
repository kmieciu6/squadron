import {
    mapImage,
    PageImage,
    StrapiSingleResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";

export type PrivacyPolicyPageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiPrivacyPolicyPage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};


export async function getPrivacyPolicyPage(
    locale: string
): Promise<PrivacyPolicyPageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiPrivacyPolicyPage>>(
        "/api/privacy-policy-page?populate=image",
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