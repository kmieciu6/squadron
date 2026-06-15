export const supportedLanguages = ["en", "pl"] as const;

export type SupportedLanguage = typeof supportedLanguages[number];

export function isSupportedLanguage(value: unknown): value is SupportedLanguage {
    return (
        typeof value === "string" &&
        supportedLanguages.includes(value as SupportedLanguage)
    );
}