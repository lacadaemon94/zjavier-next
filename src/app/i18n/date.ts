import type { Locale } from "./config";

function capitalizeFirstLetter(value: string, locale: Locale) {
  return value.charAt(0).toLocaleUpperCase(locale) + value.slice(1);
}

function getEnglishOrdinal(day: number) {
  const mod100 = day % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function formatLocalizedDate(
  date: Date,
  formatString: "MMM dd" | "MMMM do, yyyy",
  locale: Locale,
) {
  const intlLocale = locale === "es" ? "es-SV" : "en-US";

  if (formatString === "MMM dd") {
    const parts = new Intl.DateTimeFormat(intlLocale, {
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    }).formatToParts(date);

    const month = (parts.find((p) => p.type === "month")?.value ?? "").replace(
      /\.$/,
      "",
    );
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const formatted = `${month} ${day}`.trim();

    return locale === "es"
      ? capitalizeFirstLetter(formatted, locale)
      : formatted;
  }

  if (locale === "es") {
    const formatted = new Intl.DateTimeFormat("es-SV", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);

    return capitalizeFirstLetter(formatted, locale);
  }

  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  }).format(date);
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${getEnglishOrdinal(day)}, ${year}`;
}
