import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { secretCodeSchema } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { notifyVendedor } from '@/lib/push';
import { approvePreventaAndCreateShipment } from '@/lib/preventa-approve';
import { z } from 'zod';

const SUPERVISOR_PIN = 1; // Alejandro -- único PIN con acceso a /ventas/supervisor

const schema = z.object({
  code: secretCodeSchema,
  preventaId: z.string().uuid(),
  decision: z.enum(['aprobar', 'rechazar']),
  motivoRechazo: z.string().trim().max(500).optional(),
});

// Sin login: veredicto final de Alejandro cuando el cobrador le pidió una
// segunda opinión -- usa la misma foto que ya subió el cobrador (no vuelve
// a pedir nada físico, Alejandro decide a distancia con lo que ya hay).
// Al aprobar, genera el envío real igual que si lo hubiera aprobado el
// cobrador directamente.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-supervisor-review:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { code, preventaId, decision, motivoRechazo } = parsed.data;
  if (decision === 'rechazar' && !motivoRechazo?.trim()) {
    return NextResponse.json({ error: 'El motivo de rechazo es obligatorio.' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, SUPERVISOR_PIN, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { data: preventa } = await supabase.from('preventas').select('*').eq('id', preventaId).maybeSingle();
  if (!preventa) {
    return NextResponse.json({ error: 'No se encontró la preventa.' }, { status: 404 });
  }
  if (preventa.status !== 'pendiente_supervisor') {
    return NextResponse.json({ error: 'Esta preventa ya fue revisada.' }, { status: 409 });
  }

  if (decision === 'rechazar') {
    const { error } = await supabase
      .from('preventas')
      .update({
        status: 'rechazada_supervisor',
        supervisor_motivo_rechazo: motivoRechazo!.trim(),
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', preventaId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await notifyVendedor(preventa.vendedor_pin, {
      title: '❌ Preventa rechazada',
      body: `${preventa.cliente_nombre}: Alejandro rechazó tras la segunda opinión -- ${motivoRechazo!.trim()}`,
    });
    return NextResponse.json({ ok: true, status: 'rechazada_supervisor' });
  }

  const result = await approvePreventaAndCreateShipment(supabase, preventa, preventa.cobrador_foto_url);
  if ('error' in result) return NextResponse.json({ error: result.error }, { status: 500 });

  return NextResponse.json({ ok: true, status: 'aprobada' });
}
