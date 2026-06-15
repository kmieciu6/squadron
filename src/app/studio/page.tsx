import { getStudioPage } from "@/lib/api/studio";
import { notFound } from "next/navigation";
import StudioPage from "@/templates/StudioPage";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

export default async function Studio() {
    const locale = await getRequestLocale();
    const data = await getStudioPage(locale);

    if (!data) return notFound();

    return (
        <StudioPage data={data} />
    );
}