// src/lib/utils/dayOfYear.ts
export function getDayOfYearInTZ(date: Date, timeZone = 'Europe/Madrid') {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(date);

  const y = Number(parts.find(p => p.type === 'year')!.value);
  const m = Number(parts.find(p => p.type === 'month')!.value);
  const d = Number(parts.find(p => p.type === 'day')!.value);

  const start = new Date(Date.UTC(y, 0, 1));
  const current = new Date(Date.UTC(y, m - 1, d));
  return Math.floor((current.getTime() - start.getTime()) / 86400000) + 1; // 1..365/366
}
