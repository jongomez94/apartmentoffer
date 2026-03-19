import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  getLocaleFromAcceptLanguage,
  isValidLocale,
} from "./lib/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.slice(1, 3);
  const hasLocaleInPath = isValidLocale(pathnameLocale) && pathname.startsWith(`/${pathnameLocale}`);

  // If visiting root /
  if (pathname === "/" || pathname === "") {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const acceptLanguage = request.headers.get("accept-language");
    const preferredLocale =
      (cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : null) ??
      getLocaleFromAcceptLanguage(acceptLanguage) ??
      defaultLocale;

    const response = NextResponse.redirect(
      new URL(`/${preferredLocale}`, request.url)
    );
    response.cookies.set(LOCALE_COOKIE, preferredLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return response;
  }

  // If path has valid locale, set cookie and continue
  if (hasLocaleInPath && isValidLocale(pathnameLocale)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
