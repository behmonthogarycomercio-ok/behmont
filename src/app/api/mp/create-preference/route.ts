import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export async function POST(req: NextRequest) {
  try {
    const { items, payer } = await req.json();

    const preference = {
      items: items.map((item: { name: string; price: number; qty: number }) => ({
        title: item.name,
        unit_price: Math.round(item.price),
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
      return NextResponse.json({ error: 'No se pudo crear la preferencia de pago' }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ init_point: data.init_point });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
