import { notFound } from "next/navigation";
import { getHomePage } from "@/lib/api/home";
import HomePage from "@/templates/HomePage";
import {cookies} from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getHomePage(locale);

    if (!data) return notFound();

    return (
        <HomePage data={data} />
    );
}