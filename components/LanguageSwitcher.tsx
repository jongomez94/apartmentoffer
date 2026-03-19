"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = (pathname?.slice(1, 3) || "en") as Locale;
  const otherLocale: Locale = currentLocale === "en" ? "es" : "en";
  const otherPath = pathname?.replace(`/${currentLocale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2">
      <Link
        href={otherPath}
        className="rounded-sm border border-white/40 bg-white/25 px-4 py-2 font-sans text-sm font-medium text-stone-800 backdrop-blur-md transition-colors hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-sage"
        aria-label={`Switch to ${localeNames[otherLocale]}`}
      >
        {localeNames[otherLocale]}
      </Link>
    </div>
  );
}
