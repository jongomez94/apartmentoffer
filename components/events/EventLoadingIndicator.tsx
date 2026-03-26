"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";

export default function EventLoadingIndicator({
  locale,
  compact,
}: {
  locale: Locale;
  /** Omit outer min-height when used inside a fixed overlay */
  compact?: boolean;
}) {
  const text = locale === "es" ? "Un momento..." : "One moment...";

  return (
    <div
      className={
        compact
          ? "flex flex-col items-center justify-center px-6 py-8"
          : "flex min-h-[min(70vh,32rem)] flex-col items-center justify-center bg-cream px-6 pb-24 pt-12 md:pt-16"
      }
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <motion.p
        className="font-serif text-2xl font-medium text-stone-800 md:text-3xl"
        initial={{ opacity: 0.45 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {text}
      </motion.p>
      <div className="mt-10 flex gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-sage/70"
            animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
