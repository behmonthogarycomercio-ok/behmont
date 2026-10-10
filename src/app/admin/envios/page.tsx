import AdminShell from '@/components/admin/AdminShell';
import AdminActionForm from '@/components/admin/AdminActionForm';
import PreventaDocReview from '@/components/admin/PreventaDocReview';
import PreventaVendedorFilter from '@/components/admin/PreventaVendedorFilter';
import CobradorStaffSecrets from '@/components/admin/CobradorStaffSecrets';
import { createServerSupabase } from '@/lib/supabase/server';
import { updateShipmentStatus, updateShipmentPayment, createManualShipment, updateShipmentTracking } from '@/lib/actions';
import { isRetrasado, getTrackingUrl, itemsSummary, STATUS_LABELS, PAYMENT_STATUS_LABELS, NEXT_DRIVER_STATUS, DRIVER_ACTION_LABELS, type ShipmentStatus, type PaymentStatus } from '@/lib/envios';
import { DEPOSITO_STAFF, canVenderPreventa, type DepositoPin } from '@/lib/deposito';
import { maybeNotifyOverdueCobradores } from '@/lib/preventas-sync';
import { formatPrice } from '@/lib/price';
import { Home, Package, Plus, FileCheck } from 'lucide-react';

type PreventaItem = { sku: string; name: string; quantity: number; precioLista: number; precioOfrecido: number };
type PreventaRow = {
  id: string;
  vendedor_nombre: string;
  cliente_nombre: string;
  cliente_ciudad: string;
  cliente_estado: string;
  items: PreventaItem[];
  cuotas_cantidad: number;
  cuotas_tipo: string;
  cuota_precio: number;
  cobrador_nombre: string;
  status: string;
  gabriel_motivo_rechazo: string | null;
  cobrador_motivo_rechazo: string | null;
  cobrador_foto_url: string | null;
  ml_shipment_id: string | null;
  created_at: string;
};

const PREVENTA_STATUS_LABELS: Record<string, string> = {
  pendiente_documentacion: 'Pendiente documentación',
  rechazada_gabriel: 'Rechazada (documentación)',
  pendiente_cobrador: 'Esperando cobrador',
  aprobada: 'Aprobada',
  rechazada_cobrador: 'Rechazada (cobrador)',
};

const PREVENTA_STATUS_COLORS: Record<string, string> = {
  pendiente_documentacion: 'bg-amber-100 text-amber-700',
  rechazada_gabriel: 'bg-red-100 text-red-600',
  pendiente_cobrador: 'bg-amber-100 text-amber-700',
  aprobada: 'bg-emerald-100 text-emerald-700',
  rechazada_cobrador: 'bg-red-100 text-red-600',
};

type ShipmentRow = {
  id: string;
  status: ShipmentStatus;
  payment_status: PaymentStatus;
  destino_tipo: 'domicilio' | 'sucursal_andreani' | 'otro';
  destino_detalle: string | null;
  buyer_nickname: string | null;
  items: { title: string; quantity: number; sku?: string | null }[];
  total: number | null;
  estimated_delivery_date: string | null;
  delivered_at: string | null;
  delivered_by: string | null;
  created_at: string;
  transportista: string | null;
  numeros_seguimiento: string[];
  precio_asegurado: number | null;
};

const DESTINO_ICON = { domicilio: Home, sucursal_andreani: Package, otro: Package } as const;
const DESTINO_LABEL = { domicilio: 'Domicilio', sucursal_andreani: 'Sucursal', otro: 'Otro' } as const;

export default async function EnviosPage({
  searchParams,
}: {
  searchParams: { status?: string; pstatus?: string; vendedor?: string };
}) {
  const supabase = createServerSupabase();
  const filter = searchParams.status || 'pendientes';
  const pFilter = searchParams.pstatus || 'pendiente_documentacion';
  const vendedorFilter = searchParams.vendedor || 'todos';

  await maybeNotifyOverdueCobradores(supabase);

  const [{ data: allRows }, { data: preventaRows }] = await Promise.all([
    supabase
      .from('ml_shipments')
      .select('id, status, payment_status, destino_tipo, destino_detalle, buyer_nickname, items, total, estimated_delivery_date, delivered_at, delivered_by, created_at, transportista, numeros_seguimiento, precio_asegurado')
      .order('created_at', { ascending: false })
      .limit(300),
    supabase
      .from('preventas')
      .select('id, vendedor_nombre, cliente_nombre, cliente_ciudad, cliente_estado, items, cuotas_cantidad, cuotas_tipo, cuota_precio, cobrador_nombre, status, gabriel_motivo_rechazo, cobrador_motivo_rechazo, cobrador_foto_url, ml_shipment_id, created_at')
      .order('created_at', { ascending: false })
      .limit(300),
  ]);

  const rows = (allRows || []) as ShipmentRow[];
  const preventas = (preventaRows || []) as PreventaRow[];
  const vendedoresConPreventa = DEPOSITO_STAFF.filter((s) => canVenderPreventa(s.pin as DepositoPin));
  const preventaCounts = {
    pendiente_documentacion: preventas.filter((p) => p.status === 'pendiente_documentacion').length,
    pendiente_cobrador: preventas.filter((p) => p.status === 'pendiente_cobrador').length,
    aprobada: preventas.filter((p) => p.status === 'aprobada').length,
    rechazada: preventas.filter((p) => p.status === 'rechazada_gabriel' || p.status === 'rechazada_cobrador').length,
    todas: preventas.length,
  };
  const filteredPreventas = preventas.filter((p) => {
    if (vendedorFilter !== 'todos' && p.vendedor_nombre.toLowerCase() !== vendedorFilter) return false;
    if (pFilter === 'rechazada') return p.status === 'rechazada_gabriel' || p.status === 'rechazada_cobrador';
    if (pFilter === 'todas') return true;
    return p.status === pFilter;
  });
  const withRetraso = rows.map((r) => ({
    ...r,
    retrasado: isRetrasado({ status: r.status, created_at: r.created_at, estimated_delivery_date: r.estimated_delivery_date }),
  }));

  const enCurso = (r: ShipmentRow) => r.status === 'pendiente' || r.status === 'retirado' || r.status === 'en_camino';

  const counts = {
    pendientes: withRetraso.filter(enCurso).length,
    retrasados: withRetraso.filter((r) => r.retrasado).length,
    entregados: withRetraso.filter((r) => r.status === 'entregado').length,
  };

  const filtered = withRetraso.filter((r) => {
    if (filter === 'pendientes') return enCurso(r);
    if (filter === 'retrasados') return r.retrasado;
    if (filter === 'entregados') return r.status === 'entregado';
    return true;
  });

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  function buildHref(overrides: Partial<{ status: string; pstatus: string; vendedor: string }>) {
    const params = new URLSearchParams({
      status: overrides.status ?? filter,
      pstatus: overrides.pstatus ?? pFilter,
      vendedor: overrides.vendedor ?? vendedorFilter,
    });
    return `?${params.toString()}`;
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-steel-950">Envíos</h1>
        <p className="text-sm text-steel-500">{rows.length} en total</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <h2 className="font-display text-xl font-bold text-steel-950">Preventas</h2>
          <PreventaVendedorFilter vendedores={vendedoresConPreventa.map((v) => ({ pin: v.pin, name: v.name }))} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { value: 'pendiente_documentacion', label: `Pendientes documentación (${preventaCounts.pendiente_documentacion})` },
            { value: 'pendiente_cobrador', label: `Esperando cobrador (${preventaCounts.pendiente_cobrador})` },
            { value: 'aprobada', label: `Aprobadas (${preventaCounts.aprobada})` },
            { value: 'rechazada', label: `Rechazadas (${preventaCounts.rechazada})` },
            { value: 'todas', label: `Todas (${preventaCounts.todas})` },
          ].map(({ value, label }) => (
            <a
              key={value}
              href={buildHref({ pstatus: value })}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
                pFilter === value
                  ? 'bg-steel-950 text-white border-steel-950'
                  : 'bg-white text-steel-600 border-plate-200 hover:border-steel-300'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {filteredPreventas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-plate-200 p-8 text-center mb-4">
            <p className="text-steel-500 text-sm">No hay preventas con este filtro.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-4">
            {filteredPreventas.map((p) => (
              <div key={p.id} className="rounded-xl border border-plate-200 bg-white shadow-card p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-semibold text-steel-900">{p.cliente_nombre} — {p.cliente_ciudad}</p>
                    <p className="text-xs text-steel-500">
                      Vendedor: {p.vendedor_nombre} · Cobrador: {p.cobrador_nombre} · Cliente {p.cliente_estado}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${PREVENTA_STATUS_COLORS[p.status]}`}>
                    {PREVENTA_STATUS_LABELS[p.status]}
                  </span>
                </div>
                <div className="mt-2 text-xs text-steel-600">
                  {p.items.map((i) => (
                    <span key={i.sku} className="mr-3">
                      {i.quantity}x {i.name} (${formatPrice(i.precioOfrecido)})
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-xs text-steel-400">
                  {p.cuotas_cantidad} cuotas {p.cuotas_tipo} de ${formatPrice(p.cuota_precio)}
                </p>
                {p.gabriel_motivo_rechazo && <p className="mt-1 text-xs text-red-600">Motivo (documentación): {p.gabriel_motivo_rechazo}</p>}
                {p.cobrador_motivo_rechazo && <p className="mt-1 text-xs text-red-600">Motivo (cobrador): {p.cobrador_motivo_rechazo}</p>}
                {p.cobrador_foto_url && (
                  <a href={p.cobrador_foto_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-amber-600 underline">
                    Ver foto del cobrador
                  </a>
                )}
                {p.status === 'pendiente_documentacion' && (
                  <div className="mt-3">
                    <PreventaDocReview id={p.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <details className="rounded-xl border border-plate-200 bg-white shadow-sm">
          <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm font-semibold text-steel-700">
            <FileCheck className="h-4 w-4" /> Códigos de cobradores
          </summary>
          <div className="border-t border-plate-100 p-4">
            <CobradorStaffSecrets />
          </div>
        </details>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {[
          { value: 'pendientes', label: `Pendientes (${counts.pendientes})` },
          { value: 'retrasados', label: `Retrasados (${counts.retrasados})` },
          { value: 'entregados', label: `Entregados (${counts.entregados})` },
          { value: 'todos', label: `Todos (${rows.length})` },
        ].map(({ value, label }) => (
          <a
            key={value}
            href={`?status=${value}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
              filter === value
                ? 'bg-steel-950 text-white border-steel-950'
                : 'bg-white text-steel-600 border-plate-200 hover:border-steel-300'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      <details className="mb-5 rounded-xl border border-plate-200 bg-white shadow-sm">
        <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm font-semibold text-steel-700">
          <Plus className="h-4 w-4" /> Agregar pendiente manual
        </summary>
        <div className="border-t border-plate-100 p-4">
          <AdminActionForm action={createManualShipment} className="grid gap-3 sm:grid-cols-2">
            <input name="productTitle" placeholder="Producto" required className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
            <input name="sku" placeholder="SKU (opcional, para buscarlo en depósito)" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
            <input name="buyerNickname" placeholder="Comprador (opcional)" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
            <select name="destino_tipo" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" defaultValue="domicilio">
              <option value="domicilio">Domicilio</option>
              <option value="sucursal_andreani">Sucursal</option>
              <option value="otro">Otro</option>
            </select>
            <input name="destino_detalle" placeholder="Dirección / detalle" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
            <select name="paymentStatus" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" defaultValue="abonado">
              <option value="abonado">Abonado</option>
              <option value="pendiente_pago">Pendiente de abonar</option>
            </select>
            <input name="transportista" placeholder="Transportista (si ya se sabe)" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
            <input name="numerosSeguimiento" placeholder="Nº de seguimiento (si hay más de uno, separalos con coma)" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
            <input name="precioAsegurado" type="number" min="0" step="0.01" placeholder="Precio asegurado (si ya se sabe)" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
            <button type="submit" className="sm:col-span-2 rounded-lg bg-steel-900 text-white hover:bg-steel-800 py-2 text-sm font-semibold">
              Agregar
            </button>
          </AdminActionForm>
        </div>
      </details>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-plate-200 p-12 text-center">
          <p className="text-steel-500 text-sm">No hay envíos con este filtro.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-plate-200 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-plate-50 text-left text-steel-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Producto</th>
                <th className="px-4 py-3 font-semibold">Destino</th>
                <th className="px-4 py-3 font-semibold">Comprador</th>
                <th className="px-4 py-3 font-semibold">Envío</th>
                <th className="px-4 py-3 font-semibold">Fecha</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold">Pago</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-plate-100">
              {filtered.map((r) => {
                const Icon = DESTINO_ICON[r.destino_tipo];
                const productsLine = itemsSummary(r.items);
                return (
                  <tr key={r.id}>
                    <td className="px-4 py-3 text-steel-900 max-w-xs">
                      <p className="line-clamp-1">{productsLine}</p>
                      {r.total != null && <p className="text-xs text-steel-400">${formatPrice(r.total)}</p>}
                      {r.items[0]?.sku && <p className="text-xs text-steel-400 font-mono">SKU: {r.items[0].sku}</p>}
                    </td>
                    <td className="px-4 py-3 text-steel-600 max-w-xs">
                      <div className="flex items-start gap-1.5">
                        <Icon className="h-4 w-4 mt-0.5 shrink-0 text-steel-400" />
                        <div>
                          <p className="font-medium">{DESTINO_LABEL[r.destino_tipo]}</p>
                          {r.destino_detalle && <p className="text-xs text-steel-400 line-clamp-2">{r.destino_detalle}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-steel-500">{r.buyer_nickname || '—'}</td>
                    <td className="px-4 py-3 text-steel-600 max-w-[14rem]">
                      {r.transportista || r.numeros_seguimiento.length > 0 || r.precio_asegurado != null ? (
                        <div className="text-xs leading-relaxed">
                          {r.transportista && <p className="font-medium text-steel-700">{r.transportista}</p>}
                          {r.numeros_seguimiento.length > 0 && (
                            <p className="text-steel-400">Seg: {r.numeros_seguimiento.join(', ')}</p>
                          )}
                          {r.precio_asegurado != null && <p className="text-steel-400">Asegurado: ${formatPrice(r.precio_asegurado)}</p>}
                          {getTrackingUrl(r.transportista) && (
                            <a
                              href={getTrackingUrl(r.transportista)!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-600 hover:underline"
                            >
                              Ver estado →
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-steel-400">Sin datos</span>
                      )}
                      <details className="mt-1">
                        <summary className="cursor-pointer text-xs font-semibold text-steel-500 hover:text-steel-700">Editar</summary>
                        <AdminActionForm action={updateShipmentTracking} className="mt-2 flex flex-col gap-1.5">
                          <input type="hidden" name="id" value={r.id} />
                          <input name="transportista" placeholder="Transportista" defaultValue={r.transportista || ''} className="rounded border border-plate-200 px-2 py-1 text-xs" />
                          <input name="numerosSeguimiento" placeholder="Nº de seguimiento (varios, separados por coma)" defaultValue={r.numeros_seguimiento.join(', ')} className="rounded border border-plate-200 px-2 py-1 text-xs" />
                          <input name="precioAsegurado" type="number" min="0" step="0.01" placeholder="Precio asegurado" defaultValue={r.precio_asegurado ?? ''} className="rounded border border-plate-200 px-2 py-1 text-xs" />
                          <button type="submit" className="rounded bg-steel-900 text-white hover:bg-steel-800 px-2 py-1 text-xs font-semibold">Guardar</button>
                        </AdminActionForm>
                      </details>
                    </td>
                    <td className="px-4 py-3 text-steel-400 font-mono text-xs">{dateFmt(r.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {r.retrasado && (
                          <span className="rounded-full bg-red-100 text-red-600 px-2.5 py-0.5 text-xs font-semibold">Retrasado</span>
                        )}
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          r.status === 'entregado' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {STATUS_LABELS[r.status]}{r.status === 'entregado' && r.delivered_by ? ` — ${r.delivered_by}` : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        r.payment_status === 'abonado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {PAYMENT_STATUS_LABELS[r.payment_status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5 items-start">
                        {NEXT_DRIVER_STATUS[r.status] &&
                          (NEXT_DRIVER_STATUS[r.status] !== 'entregado' || r.payment_status === 'abonado') && (
                            <AdminActionForm action={updateShipmentStatus}>
                              <input type="hidden" name="id" value={r.id} />
                              <input type="hidden" name="status" value={NEXT_DRIVER_STATUS[r.status]} />
                              <input type="hidden" name="by" value="Admin" />
                              <button type="submit" className="rounded-lg bg-steel-900 text-white hover:bg-steel-800 px-3 py-1.5 text-xs font-semibold">
                                {DRIVER_ACTION_LABELS[NEXT_DRIVER_STATUS[r.status]!]}
                              </button>
                            </AdminActionForm>
                          )}
                        {NEXT_DRIVER_STATUS[r.status] === 'entregado' && r.payment_status !== 'abonado' && (
                          <p className="text-xs text-amber-600">Falta cobrar para poder entregar</p>
                        )}
                        {r.payment_status === 'pendiente_pago' && (
                          <AdminActionForm action={updateShipmentPayment}>
                            <input type="hidden" name="id" value={r.id} />
                            <input type="hidden" name="paymentStatus" value="abonado" />
                            <button type="submit" className="rounded-lg border border-amber-500 text-amber-700 hover:bg-amber-50 px-3 py-1.5 text-xs font-semibold">
                              Marcar cobrado
                            </button>
                          </AdminActionForm>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
