import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

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
    .select('id, sku, name, stock, active, images, ml_item_id, product_locations(id, zona_id, quantity)')
    .eq('active', true)
    .order('name');

  if (zonasError || productsError) {
    return NextResponse.json({ error: 'No se pudo cargar el catálogo' }, { status: 500 });
  }

  return NextResponse.json({ products, zonas });
}
