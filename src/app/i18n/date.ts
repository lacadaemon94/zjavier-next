import { enUS, es } from "date-fns/locale";
import type { Locale } from "./config";

export function getDateLocale(locale: Locale) {
  return locale === "es" ? es : enUS;
}
