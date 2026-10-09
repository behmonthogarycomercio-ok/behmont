import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { retiroSchema, DEPOSITO_STAFF_LABELS, isLocalOnly, LOCAL_ZONA_CODIGO } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { pushToMLIfLinked } from '@/lib/ml-sync';
import { notifyAdmins, notifyDepositoSupervisor } from '@/lib/push';

// Sin login: cualquiera de los 6 PINs de la terminal /deposito puede retirar
// stock, pero cada uno con su código secreto (no alcanza con mandar el PIN)
// para que nadie pueda retirar a nombre de otro. Lucas/Luz/Lito (personal
// del local) solo pueden retirar de la zona "salón", nunca de los depósitos
// reales. El RPC registrar_retiro es atómico (evita la carrera de dos
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
  const { pin, code, productId, zonaId, quantity, note } = parsed.data;

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  if (isLocalOnly(pin)) {
    const { data: rootCodigo } = await supabase.rpc('zona_root_codigo', { p_zona_id: zonaId });
    if (rootCodigo !== LOCAL_ZONA_CODIGO) {
      return NextResponse.json({ error: 'Solo podés retirar del salón.' }, { status: 403 });
    }
  }

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
  const { data: product } = await supabase.from('products').select('name, ml_item_id').eq('id', productId).maybeSingle();
  if (product?.ml_item_id) {
    await pushToMLIfLinked(product.ml_item_id, { stock: row?.new_stock });
  }

  const staffName = DEPOSITO_STAFF_LABELS[pin];
  const notifyPayload = {
    title: '📦 Retiro de depósito',
    body: `${staffName} retiró ${quantity} de "${product?.name || 'un producto'}"`,
    url: '/admin/depositos',
  };
  await Promise.all([notifyAdmins(notifyPayload), notifyDepositoSupervisor(notifyPayload)]);

  return NextResponse.json({ ok: true, newQuantity: row?.new_quantity, newStock: row?.new_stock });
}
