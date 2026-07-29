import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { getEtiqueta } from '@/lib/andreani';

export async function GET(request: Request) {
  const orderId = new URL(request.url).searchParams.get('orderId');
  if (!orderId) {
    return NextResponse.json({ error: 'Falta orderId' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  const { data: order } = await supabase
    .from('whatsapp_orders')
    .select('andreani_tracking_number')
    .eq('id', orderId)
    .single();

  if (!order?.andreani_tracking_number) {
    return NextResponse.json({ error: 'Este pedido todavía no tiene número de seguimiento' }, { status: 400 });
  }

  try {
    const pdf = await getEtiqueta([order.andreani_tracking_number]);
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="etiqueta-${order.andreani_tracking_number}.pdf"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al descargar la etiqueta';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
