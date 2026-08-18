import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buildMpOrderMessage } from '@/lib/whatsapp';

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;

// Fallback client-side: el webhook (/api/mp/webhook) ya deja el pedido
// guardado y actualizado de forma confiable en cuanto Mercado Pago confirma
// el pago, sin depender del navegador. Esto solo existe para el caso en que
// el cliente SÍ vuelve a la pestaña -- ahí aprovechamos para armar el link
// de WhatsApp. Actualiza el pedido que ya se pre-creó en /api/mp/create-preference
// (por orderId) en vez de insertar uno nuevo, para no duplicar filas.
export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, status } = await req.json();

    if (!orderId) {
      return NextResponse.json({ ok: false, reason: 'missing_order_id' }, { status: 400 });
    }

    const supabase = createServiceSupabase();
    const { data: order } = await supabase
      .from('whatsapp_orders')
      .select('id, mp_payment_id, customer_name, customer_phone, customer_address, customer_city, customer_province, customer_postal_code, shipping_method, items')
      .eq('id', orderId)
      .maybeSingle();

    if (!order) {
      return NextResponse.json({ ok: false, reason: 'order_not_found' });
    }

    // Ya lo actualizó el webhook (o esta misma ruta en un llamado anterior) -- no hay nada que hacer.
    if (order.mp_payment_id) {
      return NextResponse.json({ ok: true, already: true });
    }

    if (paymentId) {
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      if (mpRes.ok) {
        const payment = await mpRes.json();
        if (payment.status !== 'approved' && payment.status !== 'in_process' && payment.status !== 'pending') {
          return NextResponse.json({ ok: false, reason: 'payment_not_confirmed' });
        }
      }
    }

    const items = (order.items as { name: string; price: number; qty: number }[]) || [];
    const messageText = buildMpOrderMessage({
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address || undefined,
      customerCity: order.customer_city || undefined,
      customerProvince: order.customer_province || undefined,
      customerPostalCode: order.customer_postal_code || undefined,
      shippingMethod: order.shipping_method || undefined,
      paymentId,
      items,
    });

    const { error } = await supabase
      .from('whatsapp_orders')
      .update({
        mp_payment_id: paymentId ? String(paymentId) : null,
        status: status === 'approved' ? 'completado' : 'pendiente',
        customer_note: `[MP]${paymentId ? ` Nro: ${paymentId}` : ''} | Estado: ${status}`,
        message_text: messageText,
      })
      .eq('id', orderId);

    if (error) {
      console.error('[mp/save-order] update falló:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, messageText });
  } catch (err) {
    console.error('[mp/save-order] error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
