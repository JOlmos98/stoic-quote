// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';

import es from '$lib/content/quotes/es.json';
import en from '$lib/content/quotes/en.json';

type Quote = {
  id: string;
  quote: string;
  author: string;
  context: string;
  references: string;
};

function getDatePartsInTZ(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);

  const y = Number(parts.find((p) => p.type === 'year')!.value);
  const m = Number(parts.find((p) => p.type === 'month')!.value);
  const d = Number(parts.find((p) => p.type === 'day')!.value);
  return { y, m, d };
}

function getDayOfYearInTZ(date: Date, timeZone: string) {
  const { y, m, d } = getDatePartsInTZ(date, timeZone);
  const start = new Date(Date.UTC(y, 0, 1));
  const current = new Date(Date.UTC(y, m - 1, d));
  return Math.floor((current.getTime() - start.getTime()) / 86400000) + 1; // 1..365/366
}

function formatYMDInTZ(date: Date, timeZone: string) {
  const { y, m, d } = getDatePartsInTZ(date, timeZone);
  const mm = String(m).padStart(2, '0');
  const dd = String(d).padStart(2, '0');
  return `${y}/${mm}/${dd}`;
}

export const load: PageServerLoad = async ({ locals }) => {
  // Ajusta aquí si tu setup de Paraglide expone el locale con otra clave.
  const locale =
    (locals as any)?.paraglide?.locale ??
    (locals as any)?.languageTag ??
    (locals as any)?.locale ??
    'es';

  const quotes: Quote[] = String(locale).startsWith('en') ? (en as Quote[]) : (es as Quote[]);

  const tz = 'Europe/Madrid';
  const now = new Date();
  const doy = getDayOfYearInTZ(now, tz);

  // Mientras no tengas 365, esto evita crashear (recicla).
  const index = (doy - 1) % quotes.length;

  return {
    daily: quotes[index],
    dateYMD: formatYMDInTZ(now, tz),
    doy
  };
};
