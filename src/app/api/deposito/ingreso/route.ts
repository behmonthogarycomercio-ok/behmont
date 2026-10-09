import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { ingresoSchema, canIngreso, DEPOSITO_STAFF_LABELS } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { pushToMLIfLinked } from '@/lib/ml-sync';
import { notifyAdmins, notifyDepositoSupervisor } from '@/lib/push';

// Sin login: solo Gabriel puede registrar ingreso de mercadería, con su
// código secreto -- el botón ya está oculto para el resto en el cliente,
// pero la restricción real es esta, server-side.
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
  if (!zonaId) {
    return NextResponse.json({ error: 'Elegí una zona para el ingreso.' }, { status: 400 });
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
  const { data: product } = await supabase.from('products').select('name, ml_item_id').eq('id', productId).maybeSingle();
  if (product?.ml_item_id) {
    await pushToMLIfLinked(product.ml_item_id, { stock: row?.new_stock });
  }

  const staffName = DEPOSITO_STAFF_LABELS[pin];
  const notifyPayload = {
    title: '📦 Ingreso a depósito',
    body: `${staffName} ingresó ${quantity} de "${product?.name || 'un producto'}"`,
    url: '/admin/depositos',
  };
  await Promise.all([notifyAdmins(notifyPayload), notifyDepositoSupervisor(notifyPayload)]);

  return NextResponse.json({ ok: true, newQuantity: row?.new_quantity, newStock: row?.new_stock });
}
