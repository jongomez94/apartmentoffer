"use client";

import { createContext, useContext } from "react";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";

type ContentContextValue = {
  content: Content;
  locale: Locale;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({
  children,
  content,
  locale,
}: {
  children: React.ReactNode;
  content: Content;
  locale: Locale;
}) {
  return (
    <ContentContext.Provider value={{ content, locale }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
}
