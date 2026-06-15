import { getUnmannedAviationPage } from "@/lib/api/unmanned-aviation";
import { notFound } from "next/navigation";
import UnmannedAviationPage from "@/templates/UnmannedAviationPage";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

export default async function UnmannedAviation() {
    const locale = await getRequestLocale();
    const data = await getUnmannedAviationPage(locale);

    if (!data) return notFound();

    return (
        <UnmannedAviationPage data={data} />
    );
}