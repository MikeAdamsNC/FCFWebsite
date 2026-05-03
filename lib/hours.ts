import type { Hours } from "./content-types";

export function isOpenNow(hours: Hours, now: Date = new Date()): boolean {
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  return hours.days.includes(day) && h >= hours.open && h < hours.close;
}

export function nextOpening(hours: Hours, now: Date = new Date()): string {
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const openLabel = formatHour(hours.open);
  const closeLabel = formatHour(hours.close);
  if (hours.days.includes(day) && h < hours.close) {
    return h < hours.open ? `Opens today at ${openLabel}` : `Open now · Closes at ${closeLabel}`;
  }
  const nextDay = nextOpenDay(day, hours.days);
  const daysAhead = ((nextDay - day + 7) % 7) || 7;
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const target = new Date(now);
  target.setDate(now.getDate() + daysAhead);
  const name = daysAhead === 1 ? "tomorrow" : names[target.getDay()];
  return `Opens ${name} at ${openLabel}`;
}

function formatHour(h: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const hour = ((h + 11) % 12) + 1;
  return `${hour} ${period}`;
}

function nextOpenDay(today: number, openDays: number[]): number {
  for (let i = 1; i <= 7; i++) {
    const d = (today + i) % 7;
    if (openDays.includes(d)) return d;
  }
  return today;
}
