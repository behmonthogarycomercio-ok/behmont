import { NextResponse } from 'next/server';

// Configurar en developers.mercadolibre.com.ar > Notificaciones:
//   https://tu-dominio.com/api/ml/webhook
// ML espera un 200 rápido (<500ms); por eso NO sincronizamos acá adentro,
// solo confirmamos recepción. La sincronización real corre por cron cada X minutos
// contra /api/ml/sync, que sí trae precio/stock actualizado de todos los items.
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('[ML webhook]', payload.topic, payload.resource);
  } catch {
    // payload vacío o inválido — igual respondemos 200 para que ML no reintente en loop
  }
  return NextResponse.json({ received: true });
}
