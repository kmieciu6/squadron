import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/api/pages";
import { cookies } from "next/headers";
import ProjectsPage from "./ProjectsPage";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";

    const page = await getPageBySlug(slug, locale);

    if (!page) return notFound();

    return <ProjectsPage data={page} />;
}