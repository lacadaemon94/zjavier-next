import { NextResponse, type NextRequest } from "next/server";
import {
  LANGUAGE_COOKIE,
  isLocale,
  localeFromAcceptLanguage,
} from "./app/i18n/config";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const savedLocale = request.cookies.get(LANGUAGE_COOKIE)?.value;

  if (!isLocale(savedLocale)) {
    response.cookies.set(
      LANGUAGE_COOKIE,
      localeFromAcceptLanguage(request.headers.get("accept-language")),
      {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      },
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
