export async function getPageBySlug(slug: string, locale: string) {
    const base = process.env.NEXT_PUBLIC_STRAPI_URL;

    console.log("locale:", locale, "slug:", slug);

    const makeUrl = (loc: string) => {
        const qs = new URLSearchParams({
        "filters[slug][$eq]": slug,
        locale: loc,
        });

        return `${base}/api/pages?${qs.toString()}`;
    }

    let res = await fetch(makeUrl(locale), {
        next: { revalidate: 10 }, // odświeżanie co 10s
    });

    if (!res.ok) throw new Error("Failed to fetch page");

    let json = await res.json();
    let page = json.data?.[0] ?? null;

    if (!page && locale !== "en") {
        res = await fetch(makeUrl("en"), { next: { revalidate: 10 } })
        if (!res.ok) throw new Error("Failed to fetch fallback page");
        json = await res.json();
        page = json.data?.[0] ?? null;
    }
    console.log("content sample:", String(page?.content ?? "").slice(0, 300));

    return page;
}