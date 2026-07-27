import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buildMpOrderMessage } from '@/lib/whatsapp';

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const { paymentId, status, items, payer } = await req.json();

    // Verify payment with MP when we have an ID
    if (paymentId) {
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      if (mpRes.ok) {
        const payment = await mpRes.json();
        if (payment.status !== 'approved' && payment.status !== 'in_process') {
          return NextResponse.json({ ok: false, reason: 'payment_not_confirmed' });
        }
      }
    }

    const typedItems = (items as { name: string; price: number; qty: number; sku?: string }[]) || [];
    const total = typedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    const note = `[MP]${paymentId ? ` Nro: ${paymentId}` : ''} | Estado: ${status}`;
    const messageText = buildMpOrderMessage({
      customerName: payer?.name || '',
      customerPhone: payer?.phone || '',
      customerAddress: payer?.address,
      customerCity: payer?.city,
      customerPostalCode: payer?.postalCode,
      shippingMethod: payer?.shippingMethod,
      paymentId,
      items: typedItems,
    });

    const supabase = createServiceSupabase();
    const { error } = await supabase.from('whatsapp_orders').insert({
      customer_name: payer?.name || 'Cliente MP',
      customer_phone: payer?.phone || '',
      customer_address: payer?.address || null,
      customer_city: payer?.city || null,
      customer_postal_code: payer?.postalCode || null,
      shipping_method: payer?.shippingMethod || null,
      customer_note: note,
      items: typedItems,
      total,
      status: status === 'approved' ? 'completado' : 'pendiente',
      message_text: messageText,
    });

    if (error) {
      console.error('[mp/save-order] insert falló:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
