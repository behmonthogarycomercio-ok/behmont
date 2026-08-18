import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buildMpOrderMessage } from '@/lib/whatsapp';
import { notifyAdmins } from '@/lib/push';

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;

// Notificación server-to-server de Mercado Pago. A diferencia del flujo
// anterior (que dependía de que el cliente volviera al navegador después de
// pagar), esto lo llama Mercado Pago directamente desde sus servidores en
// cuanto el estado de un pago cambia -- no importa si el cliente cerró la
// pestaña o el pago quedó "pending" sin auto_return. Siempre respondemos 200
// salvo que haya un error real que valga la pena reintentar, para no generar
// una tormenta de reintentos de Mercado Pago sobre notificaciones que no
// vamos a poder procesar de todos modos (ej: IDs de prueba del botón
// "Simular" del panel de Mercado Pago).
function extractPaymentId(req: NextRequest, body: unknown): { id: string | null; type: string | null } {
  const { searchParams } = new URL(req.url);
  const queryType = searchParams.get('type') || searchParams.get('topic');
  const queryId = searchParams.get('data.id') || searchParams.get('id');

  const b = (body || {}) as { type?: string; topic?: string; data?: { id?: string }; resource?: string };
  const bodyType = b.type || b.topic || null;
  const bodyId = b.data?.id || null;

  return { id: queryId || bodyId || null, type: queryType || bodyType || null };
}

export async function POST(req: NextRequest) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // algunas notificaciones vienen sin body (todo por query string)
  }

  const { id: paymentId, type } = extractPaymentId(req, body);

  if (!paymentId || (type && type !== 'payment')) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });

    if (!mpRes.ok) {
      // Puede ser un ID de prueba (ej: "Simular notificación" desde el panel
      // de MP manda id=123456, que no existe). No hay nada que reintentar.
      return NextResponse.json({ ok: true, ignored: true });
    }

    const payment = await mpRes.json();
    const orderId = payment.external_reference as string | undefined;
    const mpStatus = payment.status as string;

    if (!orderId) {
      console.error('[mp/webhook] pago sin external_reference:', paymentId);
      return NextResponse.json({ ok: true, ignored: true });
    }

    const supabase = createServiceSupabase();
    const { data: order } = await supabase
      .from('whatsapp_orders')
      .select('id, mp_payment_id, customer_name, customer_phone, customer_address, customer_city, customer_province, customer_postal_code, shipping_method, items, total')
      .eq('id', orderId)
      .maybeSingle();

    if (!order) {
      console.error('[mp/webhook] no se encontró el pedido pre-creado:', orderId);
      return NextResponse.json({ ok: true, ignored: true });
    }

    const status =
      mpStatus === 'approved' ? 'completado' :
      (mpStatus === 'pending' || mpStatus === 'in_process' || mpStatus === 'authorized') ? 'pendiente' :
      'cancelado';

    const isFirstConfirmation = !order.mp_payment_id;

    const items = (order.items as { name: string; price: number; qty: number }[]) || [];
    const messageText = buildMpOrderMessage({
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address || undefined,
      customerCity: order.customer_city || undefined,
      customerProvince: order.customer_province || undefined,
      customerPostalCode: order.customer_postal_code || undefined,
      shippingMethod: order.shipping_method || undefined,
      paymentId: String(paymentId),
      items,
    });

    const { error: updateError } = await supabase
      .from('whatsapp_orders')
      .update({
        mp_payment_id: String(paymentId),
        status,
        customer_note: `[MP] Nro: ${paymentId} | Estado: ${mpStatus}`,
        message_text: messageText,
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('[mp/webhook] update falló:', updateError);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    if (isFirstConfirmation && status !== 'cancelado') {
      await notifyAdmins({
        title: status === 'completado' ? '✅ Pedido pagado — BEHMONT' : '⏳ Pedido en proceso — BEHMONT',
        body: `${order.customer_name} — $${order.total}`,
        url: '/admin/pedidos',
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[mp/webhook] error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
