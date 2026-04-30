export type AboutPageData = {
    title: string;
    content: string;
    image?: {
        url: string;
        alternativeText?: string;
    };
};

type StrapiImage = {
    url: string;
    alternativeText?: string | null;
};

type StrapiAboutResponse = {
    data: {
        title?: string;
        content?: string;
        image?: StrapiImage | null;
    } | null;
};

export async function getAboutPage(locale: string): Promise<AboutPageData | null> {
    const internalApiUrl = process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
    const publicApiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

    if (!internalApiUrl) {
        throw new Error('Missing INTERNAL_API_URL');
    }

    const res = await fetch(
        `${internalApiUrl}/api/about-page?locale=${encodeURIComponent(locale)}&populate=image`,
        {
            // headers: {
            //     Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            // },
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        // throw new Error('Failed to fetch page');
        const text = await res.text();
        throw new Error(`Failed to fetch about page. Status: ${res.status}. Body: ${text}`);
    }

    const json: StrapiAboutResponse = await res.json();

    if (!json.data) {
        return null;
    }

    return {
        title: json.data.title ?? '',
        content: json.data.content ?? '',
        image: json.data.image
            ? {
                url: `${publicApiUrl}${json.data.image.url}`,
                alternativeText: json.data.image.alternativeText ?? '',
            }
            : undefined,
    };
}