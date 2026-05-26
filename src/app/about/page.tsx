import AboutPage from "@/templates/AboutPage";
import { cookies } from "next/headers";
import { getAboutPage } from "@/lib/api/about";
import { notFound } from "next/navigation";

export default async function About() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getAboutPage(locale);

    if (!data) return notFound();

    return (
        <AboutPage data={data} />
    );
}