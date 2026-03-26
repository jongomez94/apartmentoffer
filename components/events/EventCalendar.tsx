"use client";

import { useMemo, useState } from "react";
import type { SiteEvent } from "@/lib/events/types";
import {
  CALENDAR_TIMEZONE,
  daysInCalendarMonth,
  getWeekdayIndexMonFirst,
  groupEventsByLocalStartDay,
  localDateKey,
} from "@/lib/events/calendar";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import EventNavLink from "./EventNavLink";

const monthYearEn = new Intl.DateTimeFormat("en-US", {
  timeZone: CALENDAR_TIMEZONE,
  month: "long",
  year: "numeric",
});

const monthYearEs = new Intl.DateTimeFormat("es-SV", {
  timeZone: CALENDAR_TIMEZONE,
  month: "long",
  year: "numeric",
});

function labels(locale: Locale) {
  return locale === "es"
    ? {
        prev: "Mes anterior",
        next: "Mes siguiente",
        weekdays: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        tzNote: "Calendario en hora de El Salvador.",
        more: "más",
      }
    : {
        prev: "Previous month",
        next: "Next month",
        weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        tzNote: "Calendar times are shown in El Salvador time.",
        more: "more",
      };
}

function todayYmdInTz(): { y: number; m: number; d: number } {
  const key = localDateKey(new Date().toISOString());
  const [y, m, d] = key.split("-").map(Number);
  return { y, m, d };
}

function ymdKey(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function EventCalendar({
  events,
  locale,
}: {
  events: SiteEvent[];
  locale: Locale;
}) {
  const L = labels(locale);
  const today = todayYmdInTz();
  const [cursorYear, setCursorYear] = useState(today.y);
  const [cursorMonth, setCursorMonth] = useState(today.m);

  const byDay = useMemo(() => groupEventsByLocalStartDay(events), [events]);

  const firstDow = getWeekdayIndexMonFirst(cursorYear, cursorMonth, 1);
  const dim = daysInCalendarMonth(cursorYear, cursorMonth);

  const headerLabel =
    locale === "es"
      ? monthYearEs.format(new Date(Date.UTC(cursorYear, cursorMonth - 1, 15, 18, 0, 0)))
      : monthYearEn.format(new Date(Date.UTC(cursorYear, cursorMonth - 1, 15, 18, 0, 0)));

  const cells: Array<{ day: number | null; key: string | null }> = [];
  for (let i = 0; i < firstDow; i++) cells.push({ day: null, key: null });
  for (let d = 1; d <= dim; d++) {
    cells.push({ day: d, key: ymdKey(cursorYear, cursorMonth, d) });
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, key: null });

  function shiftMonth(delta: number) {
    const d = new Date(Date.UTC(cursorYear, cursorMonth - 1 + delta, 1, 18, 0, 0));
    setCursorYear(d.getUTCFullYear());
    setCursorMonth(d.getUTCMonth() + 1);
  }

  const p = paths(locale);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-serif text-2xl font-medium text-stone-900 capitalize">{headerLabel}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="rounded-sm border border-stone-300 bg-white px-4 py-2 font-sans text-sm text-stone-700 transition-colors hover:bg-stone-50"
          >
            {L.prev}
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="rounded-sm border border-stone-300 bg-white px-4 py-2 font-sans text-sm text-stone-700 transition-colors hover:bg-stone-50"
          >
            {L.next}
          </button>
        </div>
      </div>
      <p className="mb-4 font-sans text-xs text-stone-500">{L.tzNote}</p>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200">
        {L.weekdays.map((w) => (
          <div
            key={w}
            className="bg-stone-100 px-1 py-2 text-center font-sans text-xs font-medium uppercase tracking-wider text-stone-600"
          >
            {w}
          </div>
        ))}
        {cells.map((cell, idx) => {
          const isToday =
            cell.key !== null &&
            cell.key === ymdKey(today.y, today.m, today.d) &&
            cursorYear === today.y &&
            cursorMonth === today.m;
          const dayEvents = cell.key ? (byDay.get(cell.key) ?? []) : [];
          return (
            <div
              key={idx}
              className={`min-h-[5.5rem] bg-white p-1.5 ${isToday ? "ring-1 ring-inset ring-sage/40" : ""}`}
            >
              {cell.day !== null && (
                <>
                  <div
                    className={`font-sans text-xs font-medium ${isToday ? "text-sage" : "text-stone-500"}`}
                  >
                    {cell.day}
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <li key={ev.id}>
                        {ev.slug ? (
                          <EventNavLink
                            href={p.event(ev.slug)}
                            className="line-clamp-2 font-sans text-[11px] leading-tight text-sage hover:underline"
                          >
                            {ev.title}
                          </EventNavLink>
                        ) : (
                          <span className="line-clamp-2 font-sans text-[11px] leading-tight text-stone-700">
                            {ev.title}
                          </span>
                        )}
                      </li>
                    ))}
                    {dayEvents.length > 2 && (
                      <li className="font-sans text-[10px] text-stone-400">+{dayEvents.length - 2} {L.more}</li>
                    )}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
