export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://behmont.com.ar';

export const DEFAULT_OG = {
  siteName: 'BEHMONT — Comercio y Hogar',
  locale: 'es_AR',
  type: 'website' as const,
};
