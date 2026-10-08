import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { vendorManualShipmentSchema, formatManualDestino, STAFF_LABELS } from '@/lib/envios';
import { notifyDrivers } from '@/lib/push';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: lo llama la página privada /envios/vendedor que abren Lucas/Luz/Lito
// cuando venden algo fuera de MercadoLibre (en el local, por WhatsApp directo,
// etc.) y necesitan que quede en la cola del repartidor igual.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`envios-manual:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = vendorManualShipmentSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const {
    productTitle,
    buyerNickname,
    destinoTipo,
    destinoDetalle,
    addedBy,
    dni,
    contacto,
    email,
    codigoPostal,
    paymentStatus,
    transportista,
    numeroSeguimiento,
    precioAsegurado,
  } = parsed.data;

  const supabase = createServiceSupabase();
  const { error } = await supabase.from('ml_shipments').insert({
    ml_order_id: -Date.now(), // negativo para no chocar nunca con un id real de ML
    status: 'pendiente',
    destino_tipo: destinoTipo,
    destino_detalle: formatManualDestino({ destinoDetalle, dni, contacto, email, codigoPostal }),
    buyer_nickname: buyerNickname || null,
    items: [{ title: productTitle, quantity: 1 }],
    payment_status: paymentStatus,
    transportista: transportista || null,
    numero_seguimiento: numeroSeguimiento || null,
    precio_asegurado: precioAsegurado ?? null,
    notes: `Agregado por ${STAFF_LABELS[addedBy]} (venta fuera de MercadoLibre)`,
  });

  if (error) {
    return NextResponse.json({ error: 'No se pudo guardar el pendiente' }, { status: 500 });
  }

  await notifyDrivers({
    title: '📦 Nuevo envío pendiente',
    body: `${productTitle} — cargado por ${STAFF_LABELS[addedBy]}`,
    url: '/envios',
  });

  return NextResponse.json({ ok: true });
}
