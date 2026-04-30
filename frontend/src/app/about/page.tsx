import { notFound } from "next/navigation";
import { getAboutPage } from "@/lib/strapi/about";
import AboutPage from "@/templates/AboutPage";
import {cookies} from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getAboutPage(locale);

    if (!data) return notFound();

    return (
        <AboutPage data={data} />
    );
}