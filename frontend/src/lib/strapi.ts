const INTERNAL_STRAPI_URL =
    process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const STRAPI_CACHE_TAG = "strapi";

const STRAPI_REVALIDATE_TIME = 300;

type StrapiFetchOptions = {
    locale?: string;
    revalidate?: number;
    cache?: RequestCache;
    tags?: string[];
};

export function getStrapiMediaUrl(url?: string | null): string {
    if (!url) return "";

    if (url.startsWith("http")) {
        return url;
    }

    return `${PUBLIC_STRAPI_URL}${url}`;
}

export async function strapiFetch<T>(
    path: string,
    options?: StrapiFetchOptions
): Promise<T> {
    if (!INTERNAL_STRAPI_URL) {
        throw new Error("Missing INTERNAL_API_URL or NEXT_PUBLIC_API_URL");
    }

    const url = new URL(path, INTERNAL_STRAPI_URL);

    if (options?.locale) {
        url.searchParams.set("locale", options.locale);
    }

    const res = await fetch(url.toString(), {
        cache: options?.cache,
        next:
            options?.cache === "no-store"
                ? undefined
                : {
                    revalidate: options?.revalidate ?? STRAPI_REVALIDATE_TIME,
                    tags: options?.tags ?? [STRAPI_CACHE_TAG],
                },
    });

    if (!res.ok) {
        const text = await res.text();

        throw new Error(
            `Strapi fetch failed: ${res.status} ${res.statusText}. Body: ${text}`
        );
    }

    return res.json();
}