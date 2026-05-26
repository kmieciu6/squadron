import { cookies } from "next/headers";
import { getPrivacyPolicyPage } from "@/lib/api/privacy-policy";
import { notFound } from "next/navigation";
import PrivacyPolicyPage from "@/templates/PrivacyPolicyPage";

export default async function PrivacyPolicy() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getPrivacyPolicyPage(locale);

    if (!data) return notFound();

    return (
        <PrivacyPolicyPage data={data} />
    );
}