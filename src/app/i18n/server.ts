import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LANGUAGE_COOKIE,
  isLocale,
  localeFromAcceptLanguage,
  type Locale,
} from "./config";
import { getDictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get(LANGUAGE_COOKIE)?.value;

  if (isLocale(savedLocale)) {
    return savedLocale;
  }

  const headerStore = await headers();
  const acceptedLocale = localeFromAcceptLanguage(
    headerStore.get("accept-language"),
  );

  return acceptedLocale || DEFAULT_LOCALE;
}

export async function getI18n() {
  const locale = await getLocale();

  return {
    locale,
    dictionary: getDictionary(locale),
  };
}
