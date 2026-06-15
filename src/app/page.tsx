import { notFound } from "next/navigation";
import { getHomePage } from "@/lib/api/home";
import HomePage from "@/templates/HomePage";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

export default async function Home() {
    const locale = await getRequestLocale();
    const data = await getHomePage(locale);

    if (!data) return notFound();

    return (
        <HomePage data={data} />
    );
}