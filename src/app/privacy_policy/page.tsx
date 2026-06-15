import { getPrivacyPolicyPage } from "@/lib/api/privacy-policy";
import { notFound } from "next/navigation";
import PrivacyPolicyPage from "@/templates/PrivacyPolicyPage";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

export default async function PrivacyPolicy() {
    const locale = await getRequestLocale();
    const data = await getPrivacyPolicyPage(locale);

    if (!data) return notFound();

    return (
        <PrivacyPolicyPage data={data} />
    );
}