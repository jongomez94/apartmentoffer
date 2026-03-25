"use client";

import { useState, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getNavLabels, paths } from "@/lib/navigation";
import LanguageSwitcher, { navLinkClass } from "@/components/LanguageSwitcher";

const BRAND = "Casa Portal de la Montaña";

function navItemClass(active: boolean) {
  return `${navLinkClass} ${active ? "border-sage/60 bg-white/45" : ""}`;
}

export default function SiteHeader() {
  const pathname = usePathname() || "/en";
  const locale = (pathname.split("/")[1] || "en") as Locale;
  const labels = getNavLabels(locale);
  const p = paths(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const isActive = (href: string) => {
    if (href === p.home) return pathname === p.home || pathname === `${p.home}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const navLinks = (
    <>
      <Link href={p.home} className={navItemClass(isActive(p.home))} onClick={closeMenu}>
        {labels.home}
      </Link>
      <Link href={p.apartment} className={navItemClass(isActive(p.apartment))} onClick={closeMenu}>
        {labels.apartment}
      </Link>
      <Link
        href={p.gardenStudio}
        className={navItemClass(isActive(p.gardenStudio))}
        onClick={closeMenu}
      >
        {labels.gardenStudio}
      </Link>
      <Link href={p.events} className={navItemClass(isActive(p.events))} onClick={closeMenu}>
        {labels.events}
      </Link>
      <Link
        href={p.guestExperiences}
        className={navItemClass(isActive(p.guestExperiences))}
        onClick={closeMenu}
      >
        {labels.guestExperiences}
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/20 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 md:py-4">
        {/* Mobile: menu left · title center · language right */}
        <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-2 md:hidden">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/40 bg-white/25 text-stone-900 backdrop-blur-md transition-colors hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-sage"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link
            href={p.home}
            className="block min-w-0 w-full justify-self-center text-center font-serif text-sm font-medium leading-snug tracking-tight text-stone-900 sm:text-base"
            onClick={closeMenu}
          >
            {BRAND}
          </Link>

          <div className="shrink-0 justify-self-end">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile: collapsible nav (links only) */}
        <nav
          id={menuId}
          aria-hidden={!menuOpen}
          className={`md:hidden ${menuOpen ? "mt-3 max-h-[24rem] border-t border-white/10 pt-3 opacity-100" : "max-h-0 overflow-hidden border-0 pt-0 opacity-0"} transition-[max-height,opacity] duration-200 ease-out ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-label="Main navigation"
        >
          <div className="flex flex-col gap-2 pb-1">{navLinks}</div>
        </nav>

        {/* Desktop */}
        <div className="hidden flex-wrap items-center justify-between gap-4 md:flex">
          <Link
            href={p.home}
            className="max-w-[55%] font-serif text-base font-medium leading-tight tracking-tight text-stone-900 lg:max-w-none lg:text-xl"
          >
            {BRAND}
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-2" aria-label="Main">
            <Link href={p.home} className={navItemClass(isActive(p.home))}>
              {labels.home}
            </Link>
            <Link href={p.apartment} className={navItemClass(isActive(p.apartment))}>
              {labels.apartment}
            </Link>
            <Link href={p.gardenStudio} className={navItemClass(isActive(p.gardenStudio))}>
              {labels.gardenStudio}
            </Link>
            <Link href={p.events} className={navItemClass(isActive(p.events))}>
              {labels.events}
            </Link>
            <Link
              href={p.guestExperiences}
              className={navItemClass(isActive(p.guestExperiences))}
            >
              {labels.guestExperiences}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
