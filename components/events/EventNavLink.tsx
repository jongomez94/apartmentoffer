"use client";

import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useEventNav } from "./EventNavProvider";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  Pick<LinkProps, "href" | "prefetch" | "replace" | "scroll">;

/**
 * Like next/link for internal event URLs, but uses a transition + router.push
 * so the events layout can show a full-screen pending state the instant you click.
 */
export default function EventNavLink({ href, prefetch, replace, scroll, onClick, ...rest }: Props) {
  const navigateToEvent = useEventNav();

  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (typeof href !== "string" || !navigateToEvent) return;
        e.preventDefault();
        navigateToEvent(href);
      }}
      {...rest}
    />
  );
}
