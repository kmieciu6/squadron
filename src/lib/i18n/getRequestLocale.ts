import { cookies, headers } from "next/headers";
import {
    isSupportedLanguage,
    type SupportedLanguage,
} from "@/lib/i18n/types";

export async function getRequestLocale(): Promise<SupportedLanguage> {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("locale")?.value;

    if (isSupportedLanguage(cookieLocale)) {
        return cookieLocale;
    }

    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language") ?? "";

    const browserLocale = acceptLanguage
        .split(",")
        .map((part) => part.split(";")[0]?.trim().toLowerCase())
        .map((locale) => locale?.split("-")[0])
        .find(isSupportedLanguage);

    return browserLocale ?? "en";
}