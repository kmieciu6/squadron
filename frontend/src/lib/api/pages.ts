import { getStrapiMediaUrl, strapiFetch } from "@/lib/strapi";

type StrapiImage = {
    url: string;
    alternativeText?: string | null;
};

type StrapiSingleResponse<T> = {
    data: T | null;
};

type StrapiCollectionResponse<T> = {
    data: T[];
};

export type PageImage = {
    url: string;
    alternativeText: string;
};

export type HomePageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiHomePage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
};

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

export type ProjectsPageData = {
    title: string;
    content: string;
    image?: PageImage;
};

type StrapiProjectPage = {
    title?: string | null;
    content?: string | null;
    image?: StrapiImage | null;
    slug?: string | null;
};

function mapImage(image?: StrapiImage | null): PageImage | undefined {
    if (!image) return undefined;

    return {
        url: getStrapiMediaUrl(image.url),
        alternativeText: image.alternativeText ?? "",
    };
}

export async function getHomePage(
    locale: string
): Promise<HomePageData | null> {
    const json = await strapiFetch<StrapiSingleResponse<StrapiHomePage>>(
        "/api/home-page?populate=image",
        {
            locale,
            // cache: "no-store",
            // revalidate: 60,
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

export async function getPageBySlug(
    slug: string,
    locale: string
): Promise<ProjectsPageData | null> {
    const json = await strapiFetch<StrapiCollectionResponse<StrapiProjectPage>>(
        `/api/projects?filters[slug][$eq]=${slug}&populate=image`,
        {
            locale,
        }
    );

    const item = json.data[0];

    if (!item) return null;

    return {
        title: item.title ?? "",
        content: item.content ?? "",
        image: mapImage(item.image),
    };
}

export function getUnmannedAviationPage(locale: string) {
    return strapiFetch("/api/unmanned-aviation-page?populate=image", {
        locale,
    });
}

export function getSecurityDefencePage(locale: string) {
    return strapiFetch("/api/security-defence-page?populate=image", {
        locale,
    });
}

export function getStudioPage(locale: string) {
    return strapiFetch("/api/studio-page?populate=image", {
        locale,
    });
}

export function getContactPage(locale: string) {
    return strapiFetch("/api/contact-page?populate=image", {
        locale,
    });
}