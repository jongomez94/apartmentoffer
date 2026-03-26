"use client";

import { createContext, useCallback, useContext, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import EventLoadingIndicator from "./EventLoadingIndicator";

const EventNavContext = createContext<((href: string) => void) | null>(null);

export function useEventNav(): ((href: string) => void) | null {
  return useContext(EventNavContext);
}

export default function EventNavProvider({
  children,
  locale: localeProp,
}: {
  children: ReactNode;
  locale: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const safeLocale: Locale = isValidLocale(localeProp) ? localeProp : defaultLocale;

  const navigateToEvent = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href);
      });
    },
    [router],
  );

  return (
    <EventNavContext.Provider value={navigateToEvent}>
      {children}
      {isPending ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-cream/92 backdrop-blur-[2px]"
          aria-busy="true"
          aria-live="polite"
        >
          <EventLoadingIndicator locale={safeLocale} compact />
        </div>
      ) : null}
    </EventNavContext.Provider>
  );
}
