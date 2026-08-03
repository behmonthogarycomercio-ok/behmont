import { NextResponse } from 'next/server';
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase/server';
import { slugify } from '@/lib/slugify';
import { guessCategorySlug } from '@/lib/categorize';
import {
  parsePriceListCsv, parsePriceListExcel, diffPriceList,
  type ExistingProduct, type PriceListDiff,
} from '@/lib/price-list-import';

export const maxDuration = 60;

async function fetchAllProducts(supabase: ReturnType<typeof createServiceSupabase>): Promise<ExistingProduct[]> {
  let all: ExistingProduct[] = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from('products')
      .select('id, sku, name, price, stock, active')
      .range(from, from + pageSize - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all = all.concat(data as ExistingProduct[]);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

export async function POST(request: Request) {
  const sessionSupabase = createServerSupabase();
  const { data: { user } } = await sessionSupabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const apply = formData.get('apply') === '1';

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Falta el archivo' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const isExcel = /\.xlsx?$/i.test(file.name);

  let rows;
  try {
    rows = isExcel ? await parsePriceListExcel(buffer) : parsePriceListCsv(buffer);
  } catch {
    return NextResponse.json({ error: 'No se pudo leer el archivo. Verificá el formato.' }, { status: 400 });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: 'El archivo no tiene filas reconocibles (Articulo/Nombre/Stock/Precio).' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  const existing = await fetchAllProducts(supabase);
  const diff = diffPriceList(rows, existing);

  if (!apply) {
    return NextResponse.json({ preview: true, rowCount: rows.length, diff });
  }

  const applied = await applyDiff(supabase, diff);
  return NextResponse.json({ preview: false, rowCount: rows.length, applied });
}

async function applyDiff(supabase: ReturnType<typeof createServiceSupabase>, diff: PriceListDiff) {
  const errors: string[] = [];

  // 1) Actualizar precio/stock de los que cambiaron
  for (const u of diff.toUpdate) {
    const { error } = await supabase
      .from('products')
      .update({ price: u.newPrice, stock: u.newStock })
      .eq('id', u.id);
    if (error) errors.push(`Actualizar ${u.sku}: ${error.message}`);
  }

  // 2) Desactivar los que ya no estan en la lista
  if (diff.toDeactivate.length > 0) {
    const { error } = await supabase
      .from('products')
      .update({ active: false })
      .in('id', diff.toDeactivate.map((d) => d.id));
    if (error) errors.push(`Desactivar: ${error.message}`);
  }

  // 3) Crear productos nuevos (marca lookup-or-create, categoria por
  //    etiqueta de la lista o adivinada por palabras clave, sin categoria
  //    si no hay match claro -- mismo criterio que el sync de MercadoLibre)
  let created = 0;
  if (diff.toCreate.length > 0) {
    const { data: brands } = await supabase.from('brands').select('id, name');
    const brandByName = new Map<string, string>(
      (brands || []).map((b: { id: string; name: string }) => [b.name.trim().toLowerCase(), b.id])
    );

    const { data: categories } = await supabase.from('categories').select('id, slug');
    const categoryBySlug = new Map<string, string>(
      (categories || []).map((c: { id: string; slug: string }) => [c.slug, c.id])
    );

    const { data: existingSlugs } = await supabase.from('products').select('slug');
    const usedSlugs = new Set<string>((existingSlugs || []).map((p: { slug: string }) => p.slug));

    for (const item of diff.toCreate) {
      let brandId: string | null = null;
      if (item.brand) {
        const key = item.brand.trim().toLowerCase();
        brandId = brandByName.get(key) ?? null;
        if (!brandId) {
          const { data: newBrand, error } = await supabase
            .from('brands')
            .insert({ name: item.brand })
            .select('id')
            .single();
          if (error) { errors.push(`Marca ${item.brand}: ${error.message}`); }
          else { brandId = newBrand.id; brandByName.set(key, newBrand.id); }
        }
      }

      const categorySlug = item.categorySlug ?? guessCategorySlug(item.displayName);
      const categoryId = categorySlug ? categoryBySlug.get(categorySlug) ?? null : null;

      let baseSlug = slugify(item.displayName) || slugify(item.sku);
      let slug = baseSlug;
      let suffix = 2;
      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix++;
      }
      usedSlugs.add(slug);

      const { error } = await supabase.from('products').insert({
        sku: item.sku,
        name: item.displayName,
        slug,
        category_id: categoryId,
        brand_id: brandId,
        price: item.price,
        stock: item.stock,
        images: [],
        specs: [],
        active: true,
      });
      if (error) errors.push(`Crear ${item.sku}: ${error.message}`);
      else created++;
    }
  }

  return {
    updated: diff.toUpdate.length,
    deactivated: diff.toDeactivate.length,
    created,
    errors,
  };
}
