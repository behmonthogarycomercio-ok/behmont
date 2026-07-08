import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { createServerSupabase } from '@/lib/supabase/server';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerSupabase();

  const [{ data: products }, { data: categories }, { data: brands }] = await Promise.all([
    supabase.from('products').select('slug, updated_at').eq('active', true),
    supabase.from('categories').select('slug').eq('active', true),
    supabase.from('brands').select('id, name').not('name', 'is', null),
  ]);

  const toSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const now = new Date().toISOString();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/buscar`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/ofertas`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/mayorista`,    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/financiacion`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/prestamos`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq`,          lastModified: now, changeFrequency: 'monthly', priority: 0.4 },

    ...(categories || []).map((cat) => ({
      url: `${SITE_URL}/categoria/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    ...(brands || []).map((b) => ({
      url: `${SITE_URL}/marca/${toSlug(b.name)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),

    ...(products || []).map((p) => ({
      url: `${SITE_URL}/producto/${p.slug}`,
      lastModified: p.updated_at ?? now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
  ];
}
