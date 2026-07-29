import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase/server';
import { crearEnvio, type AndreaniDeliveryMode } from '@/lib/andreani';

const bodySchema = z.object({
  orderId: z.string().uuid(),
  deliveryMode: z.enum(['llega hoy', 'estándar', 'sucursal', 'bigger']),
  codigoSucursal: z.string().optional(),
  paquete: z.object({
    pesoKg: z.number().positive(),
    anchoCm: z.number().positive(),
    altoCm: z.number().positive(),
    profundidadCm: z.number().positive(),
  }),
});

function splitNombreApellido(nombreCompleto: string) {
  const partes = nombreCompleto.trim().split(/\s+/);
  const nombre = partes[0] || nombreCompleto;
  const apellido = partes.slice(1).join(' ') || nombre;
  return { nombre, apellido };
}

function parseCalleNumero(direccion: string) {
  const match = direccion.trim().match(/^(.+?)\s+(\d+[A-Za-z]?)\s*$/);
  if (match) return { calle: match[1].trim(), numero: match[2].trim() };
  return { calle: direccion.trim(), numero: 'S/N' };
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { orderId, deliveryMode, codigoSucursal, paquete } = parsed.data;

  const supabase = createServiceSupabase();
  const { data: order, error: fetchError } = await supabase
    .from('whatsapp_orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (fetchError || !order) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
  }

  if (deliveryMode === 'sucursal' && !codigoSucursal) {
    return NextResponse.json({ error: 'Falta el código de sucursal' }, { status: 400 });
  }

  const { nombre, apellido } = splitNombreApellido(order.customer_name || '');
  const { calle, numero } = parseCalleNumero(order.customer_address || '');

  try {
    const resultado = await crearEnvio({
      deliveryMode: deliveryMode as AndreaniDeliveryMode,
      paquete,
      destinatario: {
        nombre,
        apellido,
        telefono: order.customer_phone || '',
        email: order.customer_email || '',
      },
      destino: {
        calle,
        numero,
        codigoPostal: order.customer_postal_code || '',
        localidad: order.customer_city || '',
        codigoSucursal: codigoSucursal || '',
      },
      precioEnvio: 0,
      remito: orderId,
      emailComercio: 'behmonthogarycomercio@gmail.com',
    });

    await supabase
      .from('whatsapp_orders')
      .update({
        andreani_numero_interno: resultado.numeroInterno || null,
        andreani_contract_id: resultado.contractId,
        andreani_delivery_mode: deliveryMode,
        andreani_created_at: new Date().toISOString(),
        andreani_last_error: null,
      })
      .eq('id', orderId);

    return NextResponse.json({ ok: true, pedidoId: resultado.pedidoId });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido al crear el envío';
    await supabase.from('whatsapp_orders').update({ andreani_last_error: message }).eq('id', orderId);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
