import { cookies } from "next/headers";
import { getStudioPage } from "@/lib/api/studio";
import { notFound } from "next/navigation";
import StudioPage from "@/templates/StudioPage";

export default async function Studio() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getStudioPage(locale);

    if (!data) return notFound();

    return (
        <StudioPage data={data} />
    );
}