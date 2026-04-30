import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/strapi";
import {cookies} from "next/headers";
import AboutPage from "@/app/projects/[slug]/AboutPage";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props ) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";

    const page = await getPageBySlug(slug, locale);

    if (!page) return notFound();

    return <AboutPage title={page.title} content={page.content} />;
}
