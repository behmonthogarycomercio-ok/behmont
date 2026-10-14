import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { getProductCode } from '@/lib/product-display';
import type { ProductSpec } from '@/lib/types';

// Sin login: lo llama el buscador de productos de /ventas/[vendedor]. A
// diferencia de /api/deposito/productos (que nunca expone price porque el
// depósito no necesita saberlo), acá el precio SÍ viaja -- es el mismo
// precio de lista público de la web, y el vendedor lo necesita para que
// "Precio lista" en la preventa salga siempre del catálogo real, nunca
// tipeado a mano (evita que quede desactualizado o mal cargado).
export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-productos:${ip}`, 60, 60)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const supabase = createServiceSupabase();

  type ProductRow = {
    id: string;
    sku: string;
    name: string;
    stock: number;
    price: number;
    ml_item_id: string | null;
    specs: ProductSpec[] | null;
  };
  const products: ProductRow[] = [];
  let productsError = null;
  for (let from = 0; ; from += 1000) {
    const { data: page, error } = await supabase
      .from('products')
      .select('id, sku, name, stock, price, ml_item_id, specs')
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

  if (productsError) {
    return NextResponse.json({ error: 'No se pudo cargar el catálogo' }, { status: 500 });
  }

  // Mismo código que ve el público en la web -- products.sku a veces es el
  // ID interno de MercadoLibre, no el SKU real, así que acá también hay que
  // resolverlo via specs.SKU para que coincida con lo que busca el vendedor.
  const resolvedProducts = products.map(({ specs, ...rest }) => ({
    ...rest,
    sku: getProductCode({ sku: rest.sku, ml_item_id: rest.ml_item_id, specs: specs || [] }) ?? rest.sku,
  }));

  return NextResponse.json({ products: resolvedProducts });
}
