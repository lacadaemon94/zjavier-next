export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LANGUAGE_COOKIE = "zj_lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function localeFromAcceptLanguage(
  acceptLanguage: string | undefined | null,
): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  return acceptLanguage
    .split(",")
    .map((language) => language.trim().toLowerCase())
    .some((language) => language === "es" || language.startsWith("es-"))
    ? "es"
    : DEFAULT_LOCALE;
}
