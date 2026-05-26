import { cookies } from "next/headers";
import { getSecurityDefencePage } from "@/lib/api/security-defence";
import { notFound } from "next/navigation";
import SecurityDefencePage from "@/templates/SecurityDefencePage";

export default async function SecurityDefence() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getSecurityDefencePage(locale);

    if (!data) return notFound();

    return (
        <SecurityDefencePage data={data} />
    );
}