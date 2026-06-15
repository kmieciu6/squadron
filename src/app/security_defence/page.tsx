import { getSecurityDefencePage } from "@/lib/api/security-defence";
import { notFound } from "next/navigation";
import SecurityDefencePage from "@/templates/SecurityDefencePage";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

export default async function SecurityDefence() {
    const locale = await getRequestLocale();
    const data = await getSecurityDefencePage(locale);

    if (!data) return notFound();

    return (
        <SecurityDefencePage data={data} />
    );
}