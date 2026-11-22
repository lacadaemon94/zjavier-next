import { NextResponse, type NextRequest } from "next/server";
import {
  LANGUAGE_COOKIE,
  isLocale,
  localeFromAcceptLanguage,
} from "./app/i18n/config";

const OG_ROUTE_REGEX = /^\/([^/]+)\/(opengraph-image|square-opengraph-image)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const ogMatch = pathname.match(OG_ROUTE_REGEX);
  if (ogMatch) {
    const [, slug, variant] = ogMatch;
    const ogUrl = request.nextUrl.clone();
    ogUrl.pathname = `/og/${slug}/${variant}`;
    return NextResponse.rewrite(ogUrl);
  }

  const savedLocale = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const locale = isLocale(savedLocale)
    ? savedLocale
    : localeFromAcceptLanguage(request.headers.get("accept-language"));

  const firstSegment = pathname.split("/")[1];
  const response = isLocale(firstSegment)
    ? NextResponse.next()
    : NextResponse.rewrite(
        new URL(
          `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
          request.url,
        ),
      );

  if (!isLocale(firstSegment)) {
    response.headers.append("Vary", "Cookie, Accept-Language");
  }

  if (!isLocale(savedLocale)) {
    response.cookies.set(LANGUAGE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|og|robots\\.txt|sitemap\\.xml|.*\\..*).*)"],
};
