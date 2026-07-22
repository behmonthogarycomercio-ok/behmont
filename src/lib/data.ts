import { cache } from 'react';
import { createServerSupabase } from './supabase/server';
import { slugify } from './slugify';
import type { Category, Product, Promotion, Brand } from './types';

export const getSiteSettings = cache(async () => {
  const supabase = createServerSupabase();
  const { data } = await supabase.from('site_settings').select('key, value');
  const settings = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  return {
    whatsappNumber: settings.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
    mlStoreUrl: settings.ml_store_url || '',
    siteName: settings.site_name || 'BEHMONT — Comercio y Hogar',
    contactEmail: settings.contact_email || '',
    contactPhone: settings.contact_phone || '',
    contactAddress: settings.contact_address || '',
    instagramUrl: settings.instagram_url || '',
    facebookUrl: settings.facebook_url || '',
    businessHours: settings.business_hours || '',
    googleReviewUrl: settings.google_review_url || '',
  };
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  return data || [];
});

export async function getPromotions(placement?: 'hero' | 'banner' | 'strip' | 'financiacion'): Promise<Promotion[]> {
  const supabase = createServerSupabase();
  let query = supabase
    .from('promotions')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (placement) query = query.eq('placement', placement);
  const { data } = await query;
  return data || [];
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase.from('brands').select('*').order('sort_order', { ascending: true });
  return data || [];
}

/** Marcas con más productos activos, para destacar en el home. */
export async function getTopBrands(limit = 14): Promise<Brand[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('products')
    .select('brand_id, brand:brands(*)')
    .eq('active', true)
    .not('brand_id', 'is', null);

  const counts = new Map<string, { brand: Brand; count: number }>();
  for (const row of data || []) {
    const brand = row.brand as unknown as Brand | null;
    if (!brand) continue;
    const existing = counts.get(brand.id);
    if (existing) existing.count += 1;
    else counts.set(brand.id, { brand, count: 1 });
  }

  return [...counts.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((entry) => entry.brand);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(12);
  return data || [];
}

export async function getDiscountedProducts(): Promise<Product[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .not('compare_at_price', 'is', null)
    .order('created_at', { ascending: false });
  return (data || []).filter((p) => p.compare_at_price && p.compare_at_price > p.price);
}

export async function getProductsByCategory(slug: string): Promise<{
  category: Category | null;
  products: Product[];
}> {
  const supabase = createServerSupabase();
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (!category) return { category: null, products: [] };

  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });

  return { category, products: products || [] };
}

export async function getProductsByBrand(slug: string): Promise<{
  brand: Brand | null;
  products: Product[];
}> {
  const brands = await getBrands();
  const brand = brands.find((b) => slugify(b.name) === slug) || null;
  if (!brand) return { brand: null, products: [] };

  const supabase = createServerSupabase();
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .eq('brand_id', brand.id)
    .order('created_at', { ascending: false });

  return { brand, products: products || [] };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();
  return data;
}

export async function getRelatedProducts(
  categoryId: string,
  excludeProductId: string,
  limit = 4
): Promise<Product[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .eq('category_id', categoryId)
    .neq('id', excludeProductId)
    .limit(limit);
  return data || [];
}

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = createServerSupabase();
  const safeQuery = query.replace(/[,()%]/g, ' ').trim();

  const { data: matchingBrands } = await supabase
    .from('brands')
    .select('id')
    .ilike('name', `%${safeQuery}%`);
  const brandIds = (matchingBrands || []).map((b) => b.id);

  const filters = [
    `name.ilike.%${safeQuery}%`,
    `sku.ilike.%${safeQuery}%`,
    `specs_text.ilike.%${safeQuery}%`,
  ];
  if (brandIds.length) filters.push(`brand_id.in.(${brandIds.join(',')})`);

  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .or(filters.join(','))
    .limit(40);
  return data || [];
}
