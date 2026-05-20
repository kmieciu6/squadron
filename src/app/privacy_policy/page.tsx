import { notFound } from "next/navigation";
import { getPrivacyPolicyPage } from "@/lib/api/pages";
import PrivacyPolicyPage from "@/templates/PrivacyPolicyPage";
import {cookies} from "next/headers";

export default async function PrivacyPolicy() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getPrivacyPolicyPage(locale);

    if (!data) return notFound();

    return (
        <PrivacyPolicyPage data={data} />
    );
}