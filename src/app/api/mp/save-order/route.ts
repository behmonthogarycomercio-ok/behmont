import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';

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
    const messageText = [
      '*Pedido pagado por MercadoPago — BEHMONT*',
      '',
      `Cliente: ${payer?.name || ''}`,
      `Telefono: ${payer?.phone || ''}`,
      paymentId ? `Nro de operacion: ${paymentId}` : '',
      '',
      'Productos:',
      ...typedItems.map(i => `• ${i.name} — x${i.qty} — $${i.price.toLocaleString('es-AR')} c/u`),
      '',
      `Total: $${total.toLocaleString('es-AR')}`,
    ].filter(Boolean).join('\n');

    const supabase = createServiceSupabase();
    await supabase.from('whatsapp_orders').insert({
      customer_name: payer?.name || 'Cliente MP',
      customer_phone: payer?.phone || '',
      customer_note: note,
      items: typedItems,
      total,
      status: status === 'approved' ? 'completado' : 'pendiente',
      message_text: messageText,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
