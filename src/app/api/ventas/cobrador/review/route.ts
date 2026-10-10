import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { cobradorPinSchema } from '@/lib/preventas';
import { verifyCobradorCode } from '@/lib/cobrador-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { notifyDrivers } from '@/lib/push';
import { formatPrice } from '@/lib/price';

type PreventaItem = { sku: string; name: string; quantity: number; precioLista: number; precioOfrecido: number };

// Sin login: el cobrador aprueba o rechaza tras controlar el local, subiendo
// SIEMPRE una foto del papel (no completa un formulario de verificación a
// mano, por tiempo). Al aprobar, genera el envío real en ml_shipments --
// "pasa a producción" -- y notifica a los repartidores, igual que una carga
// manual de /envios.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-cobrador-review:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const formData = await request.formData();
  const pinResult = cobradorPinSchema.safeParse(formData.get('pin'));
  const code = formData.get('code');
  const preventaId = formData.get('preventaId');
  const decision = formData.get('decision');
  const notas = (formData.get('notas') as string) || '';
  const motivoRechazo = (formData.get('motivoRechazo') as string) || '';
  const foto = formData.get('foto');

  if (
    !pinResult.success ||
    typeof code !== 'string' ||
    code.length < 4 ||
    typeof preventaId !== 'string' ||
    (decision !== 'aprobar' && decision !== 'rechazar') ||
    !(foto instanceof File)
  ) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  if (decision === 'rechazar' && !motivoRechazo.trim()) {
    return NextResponse.json({ error: 'El motivo de rechazo es obligatorio.' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyCobradorCode(supabase, pinResult.data, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { data: preventa } = await supabase.from('preventas').select('*').eq('id', preventaId).maybeSingle();
  if (!preventa) {
    return NextResponse.json({ error: 'No se encontró la preventa.' }, { status: 404 });
  }
  if (preventa.cobrador_pin !== pinResult.data) {
    return NextResponse.json({ error: 'Esta preventa no te está asignada a vos.' }, { status: 403 });
  }
  if (preventa.status !== 'pendiente_cobrador') {
    return NextResponse.json({ error: 'Esta preventa ya fue revisada.' }, { status: 409 });
  }

  const path = `preventas/${preventaId}-${Date.now()}.jpg`;
  const { error: uploadError } = await supabase.storage.from('product-images').upload(path, foto);
  if (uploadError) {
    return NextResponse.json({ error: 'No se pudo subir la foto' }, { status: 500 });
  }
  const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(path);

  if (decision === 'rechazar') {
    const { error } = await supabase
      .from('preventas')
      .update({
        status: 'rechazada_cobrador',
        cobrador_foto_url: publicUrl.publicUrl,
        cobrador_notas: notas || null,
        cobrador_motivo_rechazo: motivoRechazo.trim(),
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', preventaId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, status: 'rechazada_cobrador' });
  }

  // aprobar -> crea el envío real, "pasa a producción".
  const items = (preventa.items || []) as PreventaItem[];
  const destinoDetalle = [
    preventa.cliente_direccion,
    preventa.cliente_ciudad,
    preventa.cliente_codigo_postal ? `CP: ${preventa.cliente_codigo_postal}` : null,
    preventa.cliente_contacto ? `Tel: ${preventa.cliente_contacto}` : null,
    `DNI/CUIT: ${preventa.cliente_dni_cuit}`,
  ]
    .filter(Boolean)
    .join(' — ');
  const total = items.reduce((sum, i) => sum + i.precioOfrecido * i.quantity, 0);
  const notes = [
    `Preventa aprobada por ${preventa.cobrador_nombre}`,
    `${preventa.cuotas_cantidad} cuotas ${preventa.cuotas_tipo} de $${formatPrice(preventa.cuota_precio)}`,
    preventa.interes_porcentaje ? `${preventa.interes_porcentaje}% interés` : null,
    preventa.observaciones ? `Obs: ${preventa.observaciones}` : null,
  ]
    .filter(Boolean)
    .join(' — ');

  const { data: shipment, error: shipmentError } = await supabase
    .from('ml_shipments')
    .insert({
      ml_order_id: -Date.now(),
      status: 'pendiente',
      destino_tipo: 'domicilio',
      destino_detalle: destinoDetalle,
      buyer_nickname: preventa.cliente_nombre,
      items: items.map((i) => ({ title: i.name, quantity: i.quantity, sku: i.sku })),
      total,
      payment_status: 'pendiente_pago',
      notes,
    })
    .select('id')
    .single();

  if (shipmentError) {
    return NextResponse.json({ error: 'No se pudo generar el envío' }, { status: 500 });
  }

  const { error } = await supabase
    .from('preventas')
    .update({
      status: 'aprobada',
      cobrador_foto_url: publicUrl.publicUrl,
      cobrador_notas: notas || null,
      reviewed_at: new Date().toISOString(),
      ml_shipment_id: shipment.id,
    })
    .eq('id', preventaId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const firstTitle = items[0]?.name || 'Producto';
  const extra = items.length > 1 ? ` + ${items.length - 1} más` : '';
  await notifyDrivers({
    title: '📦 Nuevo envío pendiente',
    body: `${firstTitle}${extra} — preventa aprobada`,
    url: '/envios',
  });

  return NextResponse.json({ ok: true, status: 'aprobada' });
}
