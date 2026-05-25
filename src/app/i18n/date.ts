import { enUS, es } from "date-fns/locale";
import { format } from "date-fns";
import type { Locale } from "./config";

export function getDateLocale(locale: Locale) {
  return locale === "es" ? es : enUS;
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toLocaleUpperCase("es") + value.slice(1);
}

export function formatLocalizedDate(
  date: Date,
  formatString: string,
  locale: Locale,
) {
  const formattedDate = format(date, formatString, {
    locale: getDateLocale(locale),
  });

  return locale === "es" ? capitalizeFirstLetter(formattedDate) : formattedDate;
}
