import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { preventaCreateSchema } from '@/lib/preventas';
import { COBRADOR_LABELS, type CobradorPin } from '@/lib/preventas';
import { DEPOSITO_STAFF_LABELS, canVenderPreventa, type DepositoPin } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { notifyAdmins } from '@/lib/push';

// Sin login: lo llama /ventas/[vendedor] -- el vendedor usa el mismo PIN+
// código que ya tiene para /deposito (Gabriel/Lucas/Luz/Lito). La preventa
// arranca en "pendiente_documentacion": todavía no se notifica al cobrador,
// eso pasa recién cuando Gabriel confirma la documentación física desde
// /admin/envios (reviewPreventaDocumentacion en actions.ts).
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-create:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = preventaCreateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const data = parsed.data;
  const vendedorPin = data.vendedorPin as DepositoPin;

  if (!canVenderPreventa(vendedorPin)) {
    return NextResponse.json({ error: 'No autorizado para cargar preventas.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, vendedorPin, data.vendedorCode))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const cobradorPin = data.cobradorPin as CobradorPin;
  const cobradorNombre = COBRADOR_LABELS[cobradorPin];
  const vendedorNombre = DEPOSITO_STAFF_LABELS[vendedorPin];

  const { data: inserted, error } = await supabase
    .from('preventas')
    .insert({
      vendedor_pin: vendedorPin,
      vendedor_nombre: vendedorNombre,
      cliente_nombre: data.clienteNombre,
      cliente_direccion: data.clienteDireccion,
      cliente_contacto: data.clienteContacto || null,
      cliente_dni_cuit: data.clienteDniCuit,
      cliente_ciudad: data.clienteCiudad,
      cliente_codigo_postal: data.clienteCodigoPostal || null,
      cliente_rubro: data.clienteRubro || null,
      cliente_estado: data.clienteEstado,
      items: data.items,
      cuotas_cantidad: data.cuotasCantidad,
      cuotas_tipo: data.cuotasTipo,
      cuota_precio: data.cuotaPrecio,
      interes_porcentaje: data.interesPorcentaje ?? null,
      observaciones: data.observaciones || null,
      cobrador_pin: cobradorPin,
      cobrador_nombre: cobradorNombre,
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await notifyAdmins({
    title: '📋 Nueva preventa',
    body: `${vendedorNombre} cargó una preventa de "${data.clienteNombre}" para ${cobradorNombre} -- falta confirmar documentación`,
    url: '/admin/envios',
  });

  return NextResponse.json({ ok: true, id: inserted.id });
}
