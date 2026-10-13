import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { getProductCode } from '@/lib/product-display';
import type { ProductSpec } from '@/lib/types';

// Sin login: lo llama la terminal /deposito y /deposito/gestion. El select
// nunca incluye price/compare_at_price -- la terminal no debe poder ver
// precios bajo ningún escenario, ni siquiera por un bug de render.
export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-productos:${ip}`, 60, 60)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const supabase = createServiceSupabase();

  const { data: zonas, error: zonasError } = await supabase
    .from('zonas')
    .select('id, parent_id, tipo, codigo, nombre, active')
    .order('sort_order');

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, sku, name, stock, active, images, ml_item_id, specs, product_locations(id, zona_id, quantity)')
    .eq('active', true)
    .order('name');

  if (zonasError || productsError) {
    return NextResponse.json({ error: 'No se pudo cargar el catálogo' }, { status: 500 });
  }

  // Mismo código que ve el público en la web (getProductCode) -- products.sku
  // a veces es el ID interno de MercadoLibre, no el SKU real del distribuidor,
  // así que acá también hay que resolverlo via specs.SKU para que coincida.
  type ProductRow = { id: string; sku: string; name: string; stock: number; active: boolean; images: string[] | null; ml_item_id: string | null; specs: ProductSpec[] | null; product_locations: unknown };
  const resolvedProducts = ((products || []) as ProductRow[]).map(({ specs, ...rest }) => ({
    ...rest,
    sku: getProductCode({ sku: rest.sku, ml_item_id: rest.ml_item_id, specs: specs || [] }) ?? rest.sku,
  }));

  return NextResponse.json({ products: resolvedProducts, zonas });
}
