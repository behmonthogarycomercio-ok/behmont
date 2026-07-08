export interface DailyPlan {
  days: number;
  weeks: number;
  surcharge: number; // 0.25 = 25%
}

export interface MonthlyPlan {
  months: number;
  surcharge: number;
}

// Allowed delivery + financing zones
export const ALLOWED_ZONES: { city: string; codes: string[] }[] = [
  { city: 'Federal',                codes: ['3180'] },
  { city: 'Federación',             codes: ['3206'] },
  { city: 'Chajarí',                codes: ['3228'] },
  { city: 'Concordia',              codes: ['3200', '3201', '3202', '3203', '3204', '3205'] },
  { city: 'Concepción del Uruguay', codes: ['3260', '3261'] },
  { city: 'Gualeguaychú',          codes: ['2820', '2821', '2822', '2823', '2824', '2825', '2826'] },
];

export function getZoneFromPostalCode(cp: string): string | null {
  const zone = ALLOWED_ZONES.find((z) => z.codes.includes(cp.trim()));
  return zone ? zone.city : null;
}

// Product / cart financing — daily & weekly
// weeks = round(days / 6)  — each week = 6 payment days
export const DAILY_PLANS: DailyPlan[] = [
  { days: 33,  weeks: Math.round(33 / 6),  surcharge: 0.25 },
  { days: 66,  weeks: Math.round(66 / 6),  surcharge: 0.50 },
  { days: 99,  weeks: Math.round(99 / 6),  surcharge: 0.75 },
  { days: 132, weeks: Math.round(132 / 6), surcharge: 1.00 },
  { days: 165, weeks: Math.round(165 / 6), surcharge: 1.15 },
  { days: 200, weeks: Math.round(200 / 6), surcharge: 1.35 },
  { days: 220, weeks: Math.round(220 / 6), surcharge: 1.45 },
];

// Product / cart financing — monthly (8% per month)
export const MONTHLY_PLANS: MonthlyPlan[] = Array.from({ length: 10 }, (_, i) => {
  const months = i + 3; // 3 – 12
  return { months, surcharge: months * 0.08 };
});


export function calcDaily(principal: number, surcharge: number, days: number): number {
  return (principal * (1 + surcharge)) / days;
}

// Weekly = daily × 6  (6 payment days per week)
export function calcWeekly(principal: number, surcharge: number, days: number): number {
  return calcDaily(principal, surcharge, days) * 6;
}

export function calcMonthly(principal: number, surcharge: number, months: number): number {
  return (principal * (1 + surcharge)) / months;
}

export function fmtARS(n: number): string {
  return n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
