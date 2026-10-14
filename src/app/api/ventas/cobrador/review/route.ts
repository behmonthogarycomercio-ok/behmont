import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { cobradorPinSchema } from '@/lib/preventas';
import { verifyCobradorCode } from '@/lib/cobrador-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { notifyVendedor, notifyPreventaSupervisor } from '@/lib/push';
import { approvePreventaAndCreateShipment } from '@/lib/preventa-approve';

// Sin login: el cobrador aprueba, rechaza, o pide una segunda opinión a
// Alejandro (cuando algo del cliente le genera dudas) tras controlar el
// local. La foto del papel es obligatoria SOLO para clientes nuevos --
// a un cliente activo o pasivo ya se le conoce el local de antes, no hace
// falta volver a verificarlo cada vez. Al aprobar, genera el envío real en
// ml_shipments -- "pasa a producción" -- y notifica a los repartidores,
// igual que una carga manual de /envios.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-cobrador-review:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const formData = await request.formData();
  const pinResult = cobradorPinSchema.safeParse(formData.get('pin'));
  const code = formData.get('code');
  const preventaId = formData.get('preventaId');
  const decision = formData.get('decision');
  const notas = (formData.get('notas') as string) || '';
  const motivoRechazo = (formData.get('motivoRechazo') as string) || '';
  const motivoSegundaOpinion = (formData.get('motivoSegundaOpinion') as string) || '';
  const foto = formData.get('foto');

  if (
    !pinResult.success ||
    typeof code !== 'string' ||
    code.length < 4 ||
    typeof preventaId !== 'string' ||
    (decision !== 'aprobar' && decision !== 'rechazar' && decision !== 'segunda_opinion') ||
    (foto !== null && !(foto instanceof File))
  ) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  if (decision === 'rechazar' && !motivoRechazo.trim()) {
    return NextResponse.json({ error: 'El motivo de rechazo es obligatorio.' }, { status: 400 });
  }
  if (decision === 'segunda_opinion' && !motivoSegundaOpinion.trim()) {
    return NextResponse.json({ error: 'Contanos qué te genera dudas para avisarle a Alejandro.' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyCobradorCode(supabase, pinResult.data, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { data: preventa } = await supabase.from('preventas').select('*').eq('id', preventaId).maybeSingle();
  if (!preventa) {
    return NextResponse.json({ error: 'No se encontró la preventa.' }, { status: 404 });
  }
  if (preventa.cobrador_pin !== pinResult.data) {
    return NextResponse.json({ error: 'Esta preventa no te está asignada a vos.' }, { status: 403 });
  }
  if (preventa.status !== 'pendiente_cobrador') {
    return NextResponse.json({ error: 'Esta preventa ya fue revisada.' }, { status: 409 });
  }

  const fotoRequerida = preventa.cliente_estado === 'nuevo';
  if (fotoRequerida && !(foto instanceof File)) {
    return NextResponse.json({ error: 'Subí una foto del papel -- es obligatoria para clientes nuevos.' }, { status: 400 });
  }

  let fotoUrl: string | null = null;
  if (foto instanceof File) {
    const path = `preventas/${preventaId}-${Date.now()}.jpg`;
    const { error: uploadError } = await supabase.storage.from('product-images').upload(path, foto);
    if (uploadError) {
      return NextResponse.json({ error: 'No se pudo subir la foto' }, { status: 500 });
    }
    fotoUrl = supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
  }

  if (decision === 'rechazar') {
    const { error } = await supabase
      .from('preventas')
      .update({
        status: 'rechazada_cobrador',
        cobrador_foto_url: fotoUrl,
        cobrador_notas: notas || null,
        cobrador_motivo_rechazo: motivoRechazo.trim(),
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', preventaId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await notifyVendedor(preventa.vendedor_pin, {
      title: '❌ Preventa rechazada',
      body: `${preventa.cliente_nombre}: ${preventa.cobrador_nombre} rechazó tras controlar el local -- ${motivoRechazo.trim()}`,
    });
    return NextResponse.json({ ok: true, status: 'rechazada_cobrador' });
  }

  if (decision === 'segunda_opinion') {
    const { error } = await supabase
      .from('preventas')
      .update({
        status: 'pendiente_supervisor',
        cobrador_foto_url: fotoUrl,
        cobrador_notas: notas || null,
        cobrador_segunda_opinion_motivo: motivoSegundaOpinion.trim(),
      })
      .eq('id', preventaId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await notifyPreventaSupervisor({
      title: '🤔 Segunda opinión pedida',
      body: `${preventa.cliente_nombre}: ${preventa.cobrador_nombre} necesita tu opinión -- ${motivoSegundaOpinion.trim()}`,
      url: '/ventas/supervisor',
    });
    return NextResponse.json({ ok: true, status: 'pendiente_supervisor' });
  }

  // aprobar -> crea el envío real, "pasa a producción".
  const result = await approvePreventaAndCreateShipment(supabase, preventa, fotoUrl);
  if ('error' in result) return NextResponse.json({ error: result.error }, { status: 500 });

  await supabase.from('preventas').update({ cobrador_notas: notas || null }).eq('id', preventaId);

  return NextResponse.json({ ok: true, status: 'aprobada' });
}
