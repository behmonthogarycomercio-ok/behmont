import { cache } from 'react';
import { createServerSupabase } from './supabase/server';
import { slugify } from './slugify';
import { BEHMONT_IMP_SKUS } from './behmont-imp-skus';
import type { Category, Product, Promotion, Brand } from './types';

export const getSiteSettings = cache(async () => {
  const supabase = createServerSupabase();
  const { data } = await supabase.from('site_settings').select('key, value');
  const settings = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  return {
    whatsappNumber: settings.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
    whatsappNumber2: settings.whatsapp_number_2 || '',
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

export type Coupon = {
  id: string;
  code: string;
  description: string;
  discount_pct: number | null;
  valid_until: string | null;
};

export async function getActiveCoupons(): Promise<Coupon[]> {
  const supabase = createServerSupabase();
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabase
    .from('coupons')
    .select('id, code, description, discount_pct, valid_until')
    .eq('active', true)
    .order('sort_order');
  return (data || []).filter((c) => !c.valid_until || c.valid_until >= today);
}

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

export async function getProductsBySku(skus: string[]): Promise<Product[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .in('sku', skus)
    .eq('active', true);
  const bySku = new Map((data || []).map((p) => [p.sku, p]));
  return skus.map((sku) => bySku.get(sku)).filter((p): p is Product => Boolean(p));
}

// El producto con mayor % de descuento activo y con stock -- la "oferta
// bomba" que se muestra en la barra superior del header con cuenta
// regresiva hasta la medianoche.
export async function getBombOffer(): Promise<Product | null> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .gt('stock', 0)
    .not('compare_at_price', 'is', null);

  const discounted = (data || []).filter(
    (p) => p.compare_at_price && p.compare_at_price > p.price
  );
  if (discounted.length === 0) return null;

  discounted.sort((a, b) => {
    const discA = 1 - a.price / (a.compare_at_price as number);
    const discB = 1 - b.price / (b.compare_at_price as number);
    return discB - discA;
  });

  return discounted[0];
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

// Trae productos activos con stock cuyo nombre matchea alguna de las
// palabras clave dadas -- para armar carruseles tematicos ("gancho") con
// productos reales del inventario, sin depender de una categoria unica.
export async function getProductsByNameKeywords(keywords: string[], limit = 12): Promise<Product[]> {
  const supabase = createServerSupabase();
  const filters = keywords.map((k) => `name.ilike.%${k}%`).join(',');
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .gt('stock', 0)
    .or(filters)
    .order('created_at', { ascending: false })
    .limit(limit);
  return data || [];
}

export type CategoryWithDiscount = Category & { maxDiscountPct: number; discountedCount: number };

// Categorías que hoy tienen al menos un producto con descuento activo,
// para el carrusel "Ofertas por sección" del home -- ordenadas por el
// descuento más fuerte primero.
export async function getCategoriesWithDiscounts(): Promise<CategoryWithDiscount[]> {
  const [categories, discounted] = await Promise.all([getCategories(), getDiscountedProducts()]);

  const byCategory = new Map<string, Product[]>();
  for (const p of discounted) {
    if (!p.category_id) continue;
    const list = byCategory.get(p.category_id) ?? [];
    list.push(p);
    byCategory.set(p.category_id, list);
  }

  const result: CategoryWithDiscount[] = [];
  for (const cat of categories) {
    const products = byCategory.get(cat.id);
    if (!products || products.length === 0) continue;
    const maxDiscountPct = Math.max(
      ...products.map((p) => Math.round(100 - (p.price / (p.compare_at_price as number)) * 100))
    );
    result.push({ ...cat, maxDiscountPct, discountedCount: products.length });
  }

  return result.sort((a, b) => b.maxDiscountPct - a.maxDiscountPct);
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

  return { category, products: sortBehmontFirst(products || []) };
}

// Los productos de marca propia (Behmont) van primero en el listado de
// cada categoría, sin importar precio; el resto mantiene su orden. Dentro de
// Behmont, la línea "IMP" (importados) va antes que el resto de Behmont.
// El chequeo de IMP es solo por SKU (no por brand_id): muchos productos
// traídos de MercadoLibre quedaron con brand null o con la marca del
// fabricante (Kemei, Kanji, etc.) en vez de "Behmont", pero igual son
// Behmont - IMP según la lista del distribuidor.
function sortBehmontFirst(products: Product[]): Product[] {
  const imp = products.filter((p) => BEHMONT_IMP_SKUS.has(p.sku));
  const behmontRest = products.filter((p) => !BEHMONT_IMP_SKUS.has(p.sku) && p.brand?.name === 'Behmont');
  const rest = products.filter((p) => !BEHMONT_IMP_SKUS.has(p.sku) && p.brand?.name !== 'Behmont');
  return [...imp, ...behmontRest, ...rest];
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
  if (data) return data;

  // Enlace corto por código (ej. /producto/MR-7BLACK) además del slug largo
  // con el título -- se resuelve al mismo producto.
  const escapedSku = slug.replace(/[%_]/g, (m) => `\\${m}`);
  const { data: bySku } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .ilike('sku', escapedSku)
    .eq('active', true)
    .maybeSingle();
  return bySku;
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

export type SearchResult = { products: Product[]; isFuzzy: boolean };

/**
 * Busca por coincidencia exacta (substring) primero. Si no encuentra nada
 * -- por ejemplo "lavacabezas" con S de más, que no aparece como
 * substring en "Lavacabeza de cerámica" -- cae a una búsqueda por
 * similitud de texto (pg_trgm), tolerante a plurales, letras de más/menos
 * y errores de tipeo. `isFuzzy` le indica a la UI si mostrar los
 * resultados como "similares a tu búsqueda" en vez de exactos.
 */
export async function searchProducts(query: string): Promise<SearchResult> {
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

  if (data && data.length > 0) return { products: sortBehmontFirst(data), isFuzzy: false };

  const { data: fuzzyMatches } = await supabase.rpc('search_products_fuzzy', {
    search_query: safeQuery,
  });
  if (!fuzzyMatches || fuzzyMatches.length === 0) return { products: [], isFuzzy: false };

  const ids = fuzzyMatches.map((m: { id: string }) => m.id);
  const { data: fuzzyProducts } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('active', true)
    .in('id', ids);

  const rank = new Map<string, number>(ids.map((id: string, i: number) => [id, i]));
  const sorted = (fuzzyProducts || []).sort(
    (a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0)
  );
  return { products: sortBehmontFirst(sorted), isFuzzy: true };
}
