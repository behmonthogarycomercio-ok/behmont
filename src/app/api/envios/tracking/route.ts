import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { trackingSchema } from '@/lib/envios';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: lo llama la página privada /envios para que el repartidor
// complete transportista + seguimiento + precio asegurado de una carga
// manual cuando el paquete se termina despachando como "encomienda en
// mostrador" y esos datos no se sabían al cargar la venta.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`envios-tracking:${ip}`, 60, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = trackingSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { id, transportista, numeroSeguimiento, precioAsegurado } = parsed.data;

  const supabase = createServiceSupabase();
  const { error } = await supabase
    .from('ml_shipments')
    .update({
      transportista: transportista || null,
      numero_seguimiento: numeroSeguimiento || null,
      precio_asegurado: precioAsegurado ?? null,
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'No se pudo guardar los datos de envío' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
