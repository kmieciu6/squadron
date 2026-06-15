import { getPageBySlug } from "@/lib/api/projects";
import { notFound } from "next/navigation";
import ProjectsPage from "../../../templates/ProjectsPage";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const locale = await getRequestLocale();

    const page = await getPageBySlug(slug, locale);

    if (!page) return notFound();

    return <ProjectsPage data={page} />;
}