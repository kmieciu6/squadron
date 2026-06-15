import AboutPage from "@/templates/AboutPage";
import { getAboutPage } from "@/lib/api/about";
import { notFound } from "next/navigation";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

export default async function About() {
    const locale = await getRequestLocale();
    const data = await getAboutPage(locale);

    if (!data) return notFound();

    return (
        <AboutPage data={data} />
    );
}