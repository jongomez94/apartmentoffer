"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import EventLoadingIndicator from "./EventLoadingIndicator";

export default function EventDetailLoading() {
  const pathname = usePathname();
  const locale: Locale = pathname?.startsWith("/es") ? "es" : "en";

  return (
    <main className="overflow-x-hidden pt-24">
      <EventLoadingIndicator locale={locale} />
    </main>
  );
}
