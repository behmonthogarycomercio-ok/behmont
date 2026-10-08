import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { retiroSchema, DEPOSITO_STAFF_LABELS } from '@/lib/deposito';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { pushToMLIfLinked } from '@/lib/ml-sync';

// Sin login: cualquiera de los 4 PINs de la terminal /deposito puede retirar
// stock. El RPC registrar_retiro es atómico (evita la carrera de dos
// retiros simultáneos de la misma ubicación) y deja la auditoría en
// stock_movements.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-retirar:${ip}`, 60, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = retiroSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, productId, zonaId, quantity, note } = parsed.data;

  const supabase = createServiceSupabase();
  const { data, error } = await supabase.rpc('registrar_retiro', {
    p_product_id: productId,
    p_zona_id: zonaId,
    p_quantity: quantity,
    p_staff_pin: pin,
    p_staff_name: DEPOSITO_STAFF_LABELS[pin],
    p_note: note ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const row = data?.[0];
  const { data: product } = await supabase.from('products').select('ml_item_id').eq('id', productId).maybeSingle();
  if (product?.ml_item_id) {
    await pushToMLIfLinked(product.ml_item_id, { stock: row?.new_stock });
  }

  return NextResponse.json({ ok: true, newQuantity: row?.new_quantity, newStock: row?.new_stock });
}
