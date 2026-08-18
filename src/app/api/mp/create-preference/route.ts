import { NextRequest, NextResponse } from 'next/server';
import { roundPrice } from '@/lib/price';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buildMpOrderMessage } from '@/lib/whatsapp';

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

type Item = { name: string; price: number; qty: number };
type Payer = {
  name: string; phone: string; email?: string;
  address?: string; city?: string; province?: string; postalCode?: string;
  shippingMethod?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { items, payer } = (await req.json()) as { items: Item[]; payer: Payer };

    // El pedido se guarda ANTES de mandar al cliente a pagar -- server-side,
    // no depende de que despues vuelva a esta pestana. Asi, si el pago queda
    // "pending" (Mercado Pago no hace auto_return en ese caso) o el cliente
    // cierra el navegador en medio del pago, el pedido ya existe en el panel
    // admin. El webhook de MP lo va a actualizar cuando el pago se confirme.
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const messageText = buildMpOrderMessage({
      customerName: payer?.name || '',
      customerPhone: payer?.phone || '',
      customerAddress: payer?.address,
      customerCity: payer?.city,
      customerProvince: payer?.province,
      customerPostalCode: payer?.postalCode,
      shippingMethod: payer?.shippingMethod,
      items,
    });

    const supabase = createServiceSupabase();
    const { data: order, error: insertError } = await supabase
      .from('whatsapp_orders')
      .insert({
        customer_name: payer?.name || 'Cliente MP',
        customer_phone: payer?.phone || '',
        customer_email: payer?.email || null,
        customer_address: payer?.address || null,
        customer_city: payer?.city || null,
        customer_province: payer?.province || null,
        customer_postal_code: payer?.postalCode || null,
        shipping_method: payer?.shippingMethod || null,
        customer_note: '[MP] Esperando confirmación de pago',
        items,
        total,
        status: 'pendiente',
        message_text: messageText,
      })
      .select('id')
      .single();

    if (insertError || !order) {
      console.error('[mp/create-preference] insert falló:', insertError);
      return NextResponse.json({ error: 'No se pudo iniciar el pedido' }, { status: 500 });
    }

    const preference = {
      items: items.map((item) => ({
        title: item.name,
        unit_price: roundPrice(item.price),
        quantity: item.qty,
        currency_id: 'ARS',
      })),
      payer: {
        name: payer?.name ?? '',
        email: payer?.email || 'cliente@behmont.com',
        phone: payer?.phone ? { number: String(payer.phone) } : undefined,
      },
      back_urls: {
        success: `${siteUrl()}/pedido/confirmacion?status=approved`,
        failure: `${siteUrl()}/pedido/confirmacion?status=rejected`,
        pending: `${siteUrl()}/pedido/confirmacion?status=pending`,
      },
      auto_return: 'approved',
      statement_descriptor: 'BEHMONT',
      external_reference: order.id,
      notification_url: `${siteUrl()}/api/mp/webhook`,
    };

    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('MP error', err);
      // El pedido ya quedo guardado (status pendiente) aunque no se haya
      // podido crear la preferencia -- no se pierde, pero avisamos del error.
      return NextResponse.json({ error: 'No se pudo crear la preferencia de pago' }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ init_point: data.init_point, orderId: order.id });
  } catch (err) {
    console.error('[mp/create-preference] error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
