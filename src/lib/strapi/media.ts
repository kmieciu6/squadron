const PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function getStrapiMediaUrl(url?: string | null): string {
    if (!url) return "";

    if (url.startsWith("http")) {
        return url;
    }

    return new URL(url, PUBLIC_STRAPI_URL).toString();
}