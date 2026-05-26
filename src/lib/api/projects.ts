import {
    mapImage,
    PageImage,
    StrapiCollectionResponse,
    strapiFetch,
    StrapiImage,
} from "@/lib/strapi";

export type ProjectsPageData = {
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
    image?: PageImage;
};

type StrapiProjectPage = {
    title?: string | null;
    content1?: string | null;
    content2?: string | null;
    content3?: string | null;
    content4?: string | null;
    content5?: string | null;
    image?: StrapiImage | StrapiImage[] | null;
    slug?: string | null;
};


export async function getPageBySlug(
    slug: string,
    locale: string
): Promise<ProjectsPageData | null> {
    const json = await strapiFetch<StrapiCollectionResponse<StrapiProjectPage>>(
        `/api/projects-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`,
        {
            locale,
        }
    );

    const item = json.data[0];

    if (!item) return null;

    const image = Array.isArray(item.image) ? item.image[0] : item.image;

    return {
        title: item.title ?? "",
        content1: item.content1 ?? "",
        content2: item.content2 ?? "",
        content3: item.content3 ?? "",
        content4: item.content4 ?? "",
        content5: item.content5 ?? "",
        image: mapImage(image),
    };
}