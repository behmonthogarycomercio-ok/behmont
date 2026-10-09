import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { ingresoSchema, canIngreso, DEPOSITO_STAFF_LABELS } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { pushToMLIfLinked } from '@/lib/ml-sync';

// Sin login: solo PIN 0 (Javier) y PIN 1 (Gabriel) pueden registrar ingreso
// de mercadería, y cada uno con su código secreto -- el botón ya está oculto
// para el resto en el cliente, pero la restricción real es esta, server-side.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-ingreso:${ip}`, 60, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = ingresoSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code, productId, zonaId, quantity, note } = parsed.data;

  if (!canIngreso(pin)) {
    return NextResponse.json({ error: 'Este PIN no puede registrar ingresos de mercadería.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { data, error } = await supabase.rpc('registrar_ingreso', {
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
