import type { SiteEvent } from "./types";

/** El Salvador does not observe DST; Intl still handles edge cases consistently. */
export const CALENDAR_TIMEZONE = "America/El_Salvador";

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: CALENDAR_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function localDateKey(iso: string): string {
  return dateKeyFormatter.format(new Date(iso));
}

const timeFormatterEn = new Intl.DateTimeFormat("en-US", {
  timeZone: CALENDAR_TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const timeFormatterEs = new Intl.DateTimeFormat("es-SV", {
  timeZone: CALENDAR_TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const longDateEn = new Intl.DateTimeFormat("en-US", {
  timeZone: CALENDAR_TIMEZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const longDateEs = new Intl.DateTimeFormat("es-SV", {
  timeZone: CALENDAR_TIMEZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatEventRange(startsAt: string, endsAt: string | null, locale: "en" | "es"): string {
  const start = new Date(startsAt);
  const longFmt = locale === "es" ? longDateEs : longDateEn;
  const timeFmt = locale === "es" ? timeFormatterEs : timeFormatterEn;
  const startDay = longFmt.format(start);
  const startTime = timeFmt.format(start);
  if (!endsAt) return `${startDay} · ${startTime}`;
  const end = new Date(endsAt);
  const sameDay = localDateKey(startsAt) === localDateKey(endsAt);
  if (sameDay) {
    return `${startDay} · ${startTime} – ${timeFmt.format(end)}`;
  }
  return `${longFmt.format(start)} ${startTime} → ${longFmt.format(end)} ${timeFmt.format(end)}`;
}

/** Monday = 0 … Sunday = 6 (civil date in El Salvador, fixed UTC−6). */
export function getWeekdayIndexMonFirst(year: number, month: number, day: number): number {
  const approxLocalNoonUtc = Date.UTC(year, month - 1, day, 18, 0, 0);
  const jsDow = new Date(approxLocalNoonUtc).getUTCDay();
  return (jsDow + 6) % 7;
}

export function daysInCalendarMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function groupEventsByLocalStartDay(events: SiteEvent[]): Map<string, SiteEvent[]> {
  const map = new Map<string, SiteEvent[]>();
  for (const ev of events) {
    const key = localDateKey(ev.startsAt);
    const list = map.get(key) ?? [];
    list.push(ev);
    map.set(key, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  }
  return map;
}
