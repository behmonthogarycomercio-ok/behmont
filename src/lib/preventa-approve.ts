import type { SupabaseClient } from '@supabase/supabase-js';
import { notifyDrivers, notifyVendedor } from './push';
import { formatPrice } from './price';

type PreventaItem = { sku: string; name: string; quantity: number; precioLista: number; precioOfrecido: number };
type PreventaRow = {
  id: string;
  vendedor_pin: number;
  cliente_nombre: string;
  cliente_direccion: string;
  cliente_ciudad: string;
  cliente_codigo_postal: string | null;
  cliente_contacto: string | null;
  cliente_dni_cuit: string;
  cobrador_nombre: string;
  cuotas_cantidad: number;
  cuotas_tipo: string;
  cuota_precio: number;
  interes_porcentaje: number | null;
  observaciones: string | null;
  items: PreventaItem[] | null;
};

/** Aprueba definitivamente una preventa: genera el envío real en
 * ml_shipments ("pasa a producción", igual que una carga manual de
 * /envios), marca la preventa como aprobada y avisa a repartidores +
 * vendedor. Lo usa tanto el cobrador (aprobación directa) como Alejandro
 * (cuando el cobrador le pidió una segunda opinión y él da el OK final) --
 * mismo resultado final en ambos casos. */
export async function approvePreventaAndCreateShipment(
  supabase: SupabaseClient,
  preventa: PreventaRow,
  cobradorFotoUrl: string | null
): Promise<{ error: string } | { ok: true }> {
  const items = preventa.items || [];
  const destinoDetalle = [
    preventa.cliente_direccion,
    preventa.cliente_ciudad,
    preventa.cliente_codigo_postal ? `CP: ${preventa.cliente_codigo_postal}` : null,
    preventa.cliente_contacto ? `Tel: ${preventa.cliente_contacto}` : null,
    `DNI/CUIT: ${preventa.cliente_dni_cuit}`,
  ]
    .filter(Boolean)
    .join(' — ');
  const total = items.reduce((sum, i) => sum + i.precioOfrecido * i.quantity, 0);
  const notes = [
    `Preventa aprobada por ${preventa.cobrador_nombre}`,
    `${preventa.cuotas_cantidad} cuotas ${preventa.cuotas_tipo} de $${formatPrice(preventa.cuota_precio)}`,
    preventa.interes_porcentaje ? `${preventa.interes_porcentaje}% interés` : null,
    preventa.observaciones ? `Obs: ${preventa.observaciones}` : null,
  ]
    .filter(Boolean)
    .join(' — ');

  const { data: shipment, error: shipmentError } = await supabase
    .from('ml_shipments')
    .insert({
      ml_order_id: -Date.now(),
      status: 'pendiente',
      destino_tipo: 'domicilio',
      destino_detalle: destinoDetalle,
      buyer_nickname: preventa.cliente_nombre,
      items: items.map((i) => ({ title: i.name, quantity: i.quantity, sku: i.sku })),
      total,
      payment_status: 'pendiente_pago',
      notes,
    })
    .select('id')
    .single();

  if (shipmentError) return { error: 'No se pudo generar el envío' };

  const { error } = await supabase
    .from('preventas')
    .update({
      status: 'aprobada',
      cobrador_foto_url: cobradorFotoUrl,
      reviewed_at: new Date().toISOString(),
      ml_shipment_id: shipment.id,
    })
    .eq('id', preventa.id);
  if (error) return { error: error.message };

  const firstTitle = items[0]?.name || 'Producto';
  const extra = items.length > 1 ? ` + ${items.length - 1} más` : '';
  await notifyDrivers({
    title: '📦 Nuevo envío pendiente',
    body: `${firstTitle}${extra} — preventa aprobada`,
    url: '/envios',
  });
  await notifyVendedor(preventa.vendedor_pin, {
    title: '✅ Preventa aprobada',
    body: `${preventa.cliente_nombre}: ${preventa.cobrador_nombre} controló el local y aprobó -- pasa a reparto`,
  });

  return { ok: true };
}
