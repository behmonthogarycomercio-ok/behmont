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

  // Paginado explícito: PostgREST corta en 1000 filas por default, y hoy hay
  // más de 2000 productos activos -- sin esto, la terminal de depósito y los
  // buscadores de /ventas nunca veían los productos que quedaban más allá de
  // la fila 1000 (nunca aparecían en el buscador, sin ningún error visible).
  type ProductRow = { id: string; sku: string; name: string; stock: number; active: boolean; images: string[] | null; ml_item_id: string | null; specs: ProductSpec[] | null; product_locations: unknown };
  const products: ProductRow[] = [];
  let productsError = null;
  for (let from = 0; ; from += 1000) {
    const { data: page, error } = await supabase
      .from('products')
      .select('id, sku, name, stock, active, images, ml_item_id, specs, product_locations(id, zona_id, quantity)')
      .eq('active', true)
      .order('name')
      .range(from, from + 999);
    if (error) {
      productsError = error;
      break;
    }
    products.push(...((page || []) as ProductRow[]));
    if (!page || page.length < 1000) break;
  }

  if (zonasError || productsError) {
    return NextResponse.json({ error: 'No se pudo cargar el catálogo' }, { status: 500 });
  }

  // Mismo código que ve el público en la web (getProductCode) -- products.sku
  // a veces es el ID interno de MercadoLibre, no el SKU real del distribuidor,
  // así que acá también hay que resolverlo via specs.SKU para que coincida.
  const resolvedProducts = products.map(({ specs, ...rest }) => ({
    ...rest,
    sku: getProductCode({ sku: rest.sku, ml_item_id: rest.ml_item_id, specs: specs || [] }) ?? rest.sku,
  }));

  return NextResponse.json({ products: resolvedProducts, zonas });
}
