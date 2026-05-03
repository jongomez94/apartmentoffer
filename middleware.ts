import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  getLocaleFromAcceptLanguage,
  isValidLocale,
} from "./lib/i18n/config";
import { updateSupabaseSession } from "./lib/supabase/middleware";

const LOCALE_COOKIE = "NEXT_LOCALE";

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((c) => {
    to.cookies.set(c.name, c.value);
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const supabaseResponse = await updateSupabaseSession(request);

  const pathnameLocale = pathname.slice(1, 3);
  const hasLocaleInPath = isValidLocale(pathnameLocale) && pathname.startsWith(`/${pathnameLocale}`);

  if (pathname === "/" || pathname === "") {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const acceptLanguage = request.headers.get("accept-language");
    const preferredLocale =
      (cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : null) ??
      getLocaleFromAcceptLanguage(acceptLanguage) ??
      defaultLocale;

    const redirect = NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
    copyCookies(supabaseResponse, redirect);
    redirect.cookies.set(LOCALE_COOKIE, preferredLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return redirect;
  }

  if (hasLocaleInPath && isValidLocale(pathnameLocale)) {
    supabaseResponse.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
