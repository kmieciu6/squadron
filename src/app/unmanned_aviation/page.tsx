import { cookies } from "next/headers";
import { getUnmannedAviationPage } from "@/lib/api/unmanned-aviation";
import { notFound } from "next/navigation";
import UnmannedAviationPage from "@/templates/UnmannedAviationPage";

export default async function UnmannedAviation() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getUnmannedAviationPage(locale);

    if (!data) return notFound();

    return (
        <UnmannedAviationPage data={data} />
    );
}