import AdminShell from '@/components/admin/AdminShell';
import AdminActionForm from '@/components/admin/AdminActionForm';
import DeleteButton from '@/components/admin/DeleteButton';
import PreventaDocReview from '@/components/admin/PreventaDocReview';
import PreventaVendedorFilter from '@/components/admin/PreventaVendedorFilter';
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase/server';
import {
  updateShipmentStatus,
  updateShipmentPayment,
  createManualShipment,
  updateShipmentTracking,
  updateOrderStatus,
  deleteOrder,
  deletePreventa,
} from '@/lib/actions';
import { isRetrasado, getTrackingUrl, itemsSummary, STATUS_LABELS, PAYMENT_STATUS_LABELS, NEXT_DRIVER_STATUS, DRIVER_ACTION_LABELS, type ShipmentStatus, type PaymentStatus } from '@/lib/envios';
import { DEPOSITO_STAFF, canVenderPreventa, type DepositoPin } from '@/lib/deposito';
import { maybeNotifyOverdueCobradores } from '@/lib/preventas-sync';
import { formatPrice } from '@/lib/price';
import { Home, Package, Plus, FileText } from 'lucide-react';

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
  cobrador_segunda_opinion_motivo: string | null;
  supervisor_motivo_rechazo: string | null;
  ml_shipment_id: string | null;
  created_at: string;
};

const PREVENTA_STATUS_LABELS: Record<string, string> = {
  pendiente_documentacion: 'Pendiente documentación',
  rechazada_gabriel: 'Rechazada (documentación)',
  pendiente_cobrador: 'Esperando cobrador',
  pendiente_supervisor: 'Esperando a Alejandro',
  aprobada: 'Aprobada',
  rechazada_cobrador: 'Rechazada (cobrador)',
  rechazada_supervisor: 'Rechazada (Alejandro)',
};

const PREVENTA_STATUS_COLORS: Record<string, string> = {
  pendiente_documentacion: 'bg-amber-100 text-amber-700',
  rechazada_gabriel: 'bg-red-100 text-red-600',
  pendiente_cobrador: 'bg-amber-100 text-amber-700',
  pendiente_supervisor: 'bg-amber-100 text-amber-700',
  aprobada: 'bg-emerald-100 text-emerald-700',
  rechazada_cobrador: 'bg-red-100 text-red-600',
  rechazada_supervisor: 'bg-red-100 text-red-600',
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

const ORDER_STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  pendiente:   { label: 'Pendiente',   classes: 'bg-yellow-100 text-yellow-700' },
  procesando:  { label: 'Procesando',  classes: 'bg-blue-100 text-blue-700' },
  completado:  { label: 'Completado',  classes: 'bg-emerald-100 text-emerald-700' },
  cancelado:   { label: 'Cancelado',   classes: 'bg-red-100 text-red-600' },
};

const ORDER_STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS).map(([value, { label }]) => ({ value, label }));

const SHIPPING_METHOD_LABELS: Record<string, string> = {
  sucursal: 'Envío a sucursal',
  domicilio: 'Envío a domicilio',
  retiro: 'Retiro en local',
};

const SHIPPING_METHOD_NOTES: Record<string, string> = {
  sucursal: 'lo abona el cliente al retirar en la sucursal',
  domicilio: 'lo abona el cliente por transferencia',
  retiro: 'coordinar retiro y pago por WhatsApp',
};

export default async function EnviosYPedidosPage({
  searchParams,
}: {
  searchParams: { tab?: string; status?: string; pstatus?: string; vendedor?: string; q?: string };
}) {
  const tab = searchParams.tab === 'pedidos' ? 'pedidos' : 'envios';

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-steel-950">Envíos y pedidos</h1>
      </div>

      <div className="flex gap-2 mb-6 border-b border-plate-200">
        {[
          { value: 'envios', label: 'Envíos y preventas' },
          { value: 'pedidos', label: 'Pedidos por WhatsApp' },
        ].map(({ value, label }) => (
          <a
            key={value}
            href={`?tab=${value}`}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === value
                ? 'border-steel-950 text-steel-950'
                : 'border-transparent text-steel-500 hover:text-steel-700'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {tab === 'pedidos' ? <PedidosTab searchParams={searchParams} /> : <EnviosTab searchParams={searchParams} />}
    </AdminShell>
  );
}

async function EnviosTab({
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
      .select('id, vendedor_nombre, cliente_nombre, cliente_ciudad, cliente_estado, items, cuotas_cantidad, cuotas_tipo, cuota_precio, cobrador_nombre, status, gabriel_motivo_rechazo, cobrador_motivo_rechazo, cobrador_foto_url, cobrador_segunda_opinion_motivo, supervisor_motivo_rechazo, ml_shipment_id, created_at')
      .order('created_at', { ascending: false })
      .limit(300),
  ]);

  const rows = (allRows || []) as ShipmentRow[];
  const preventas = (preventaRows || []) as PreventaRow[];
  const vendedoresConPreventa = DEPOSITO_STAFF.filter((s) => canVenderPreventa(s.pin as DepositoPin));
  const RECHAZADA_STATUSES = ['rechazada_gabriel', 'rechazada_cobrador', 'rechazada_supervisor'];
  const preventaCounts = {
    pendiente_documentacion: preventas.filter((p) => p.status === 'pendiente_documentacion').length,
    pendiente_cobrador: preventas.filter((p) => p.status === 'pendiente_cobrador').length,
    pendiente_supervisor: preventas.filter((p) => p.status === 'pendiente_supervisor').length,
    aprobada: preventas.filter((p) => p.status === 'aprobada').length,
    rechazada: preventas.filter((p) => RECHAZADA_STATUSES.includes(p.status)).length,
    todas: preventas.length,
  };
  const filteredPreventas = preventas.filter((p) => {
    if (vendedorFilter !== 'todos' && p.vendedor_nombre.toLowerCase() !== vendedorFilter) return false;
    if (pFilter === 'rechazada') return RECHAZADA_STATUSES.includes(p.status);
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
      tab: 'envios',
      status: overrides.status ?? filter,
      pstatus: overrides.pstatus ?? pFilter,
      vendedor: overrides.vendedor ?? vendedorFilter,
    });
    return `?${params.toString()}`;
  }

  return (
    <>
      <p className="text-sm text-steel-500 mb-5">{rows.length} envíos en total</p>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <h2 className="font-display text-xl font-bold text-steel-950">Preventas</h2>
          <PreventaVendedorFilter vendedores={vendedoresConPreventa.map((v) => ({ pin: v.pin, name: v.name }))} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { value: 'pendiente_documentacion', label: `Pendientes documentación (${preventaCounts.pendiente_documentacion})` },
            { value: 'pendiente_cobrador', label: `Esperando cobrador (${preventaCounts.pendiente_cobrador})` },
            { value: 'pendiente_supervisor', label: `Esperando a Alejandro (${preventaCounts.pendiente_supervisor})` },
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
                {p.cobrador_segunda_opinion_motivo && (
                  <p className="mt-1 text-xs text-amber-700">Pidió segunda opinión: {p.cobrador_segunda_opinion_motivo}</p>
                )}
                {p.supervisor_motivo_rechazo && <p className="mt-1 text-xs text-red-600">Motivo (Alejandro): {p.supervisor_motivo_rechazo}</p>}
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
                <div className="mt-2 flex justify-end">
                  <DeleteButton id={p.id} action={deletePreventa} label="preventa" />
                </div>
              </div>
            ))}
          </div>
        )}
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
            href={buildHref({ status: value })}
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
    </>
  );
}

async function PedidosTab({ searchParams }: { searchParams: { status?: string; q?: string } }) {
  const supabase = createServerSupabase();

  const filterStatus = searchParams.status || '';
  const q = searchParams.q?.trim() || '';

  let query = supabase
    .from('whatsapp_orders')
    .select('id, customer_name, customer_phone, customer_email, customer_address, customer_city, customer_province, customer_postal_code, shipping_method, customer_note, items, total, status, created_at, financing_documents')
    .order('created_at', { ascending: false });

  if (filterStatus) query = query.eq('status', filterStatus);
  if (q)            query = query.ilike('customer_name', `%${q}%`);

  const { data: orders } = await query.limit(100);

  // Los documentos de financiacion viven en un bucket privado -- hace
  // falta la service role para generar el link firmado de descarga,
  // sin importar quien este autenticado como admin.
  const serviceSupabase = createServiceSupabase();
  const ordersWithDocs = await Promise.all(
    (orders || []).map(async (order) => {
      const docs = (order.financing_documents as { label: string; path: string }[] | null) || [];
      if (docs.length === 0) return { ...order, financingDocsWithUrl: [] as { label: string; url: string }[] };
      const withUrl = await Promise.all(
        docs.map(async (doc) => {
          const { data } = await serviceSupabase.storage
            .from('financing-documents')
            .createSignedUrl(doc.path, 60 * 10); // 10 min, se genera al abrir la pagina
          return { label: doc.label, url: data?.signedUrl || '' };
        })
      );
      return { ...order, financingDocsWithUrl: withUrl.filter((d) => d.url) };
    })
  );

  const { data: counts } = await supabase.from('whatsapp_orders').select('status');

  const countByStatus = (counts || []).reduce<Record<string, number>>((acc, o) => {
    const s = o.status || 'pendiente';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p className="text-sm text-steel-500">{(orders || []).length} pedidos cargados</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <a
          href="?tab=pedidos"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
            !filterStatus
              ? 'bg-steel-950 text-white border-steel-950'
              : 'bg-white text-steel-600 border-plate-200 hover:border-steel-300'
          }`}
        >
          Todos ({counts?.length || 0})
        </a>
        {ORDER_STATUS_OPTIONS.map(({ value, label }) => (
          <a
            key={value}
            href={`?tab=pedidos&status=${value}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
              filterStatus === value
                ? 'bg-steel-950 text-white border-steel-950'
                : 'bg-white text-steel-600 border-plate-200 hover:border-steel-300'
            }`}
          >
            {label} ({countByStatus[value] || 0})
          </a>
        ))}
      </div>

      <form action="" className="mb-5">
        <input type="hidden" name="tab" value="pedidos" />
        {filterStatus && <input type="hidden" name="status" value={filterStatus} />}
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre de cliente..."
          className="w-full max-w-xs rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
        />
      </form>

      {ordersWithDocs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-plate-200 p-12 text-center">
          <p className="text-steel-500 text-sm">No hay pedidos con este filtro.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ordersWithDocs.map((order) => {
            const items = (order.items as { name: string; qty: number; price: number; sku: string }[]) || [];
            const st = order.status || 'pendiente';
            const badge = ORDER_STATUS_LABELS[st] || ORDER_STATUS_LABELS.pendiente;
            const date = new Date(order.created_at).toLocaleString('es-AR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            });

            const noteLines: string[] = order.customer_note ? order.customer_note.split('\n') : [];
            const financingLine = noteLines.find((l) => l.startsWith('[FINANCIACION]'));
            const installments3Line = noteLines.find((l) => l.startsWith('[3CUOTAS]'));
            const plainNote = noteLines
              .filter((l) => !l.startsWith('[FINANCIACION]') && !l.startsWith('[MP]') && !l.startsWith('[3CUOTAS]'))
              .join('\n');

            return (
              <details key={order.id} className="group rounded-xl border border-plate-200 bg-white shadow-sm overflow-hidden">
                <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none hover:bg-plate-50 transition-colors">
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.classes}`}>
                    {badge.label}
                  </span>
                  {order.customer_note?.startsWith('[MP]') && (
                    <span className="shrink-0 rounded-full bg-[#009EE3] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      MP
                    </span>
                  )}
                  {financingLine && (
                    <span className="shrink-0 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Financia
                    </span>
                  )}
                  {installments3Line && (
                    <span className="shrink-0 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      3 cuotas
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-steel-900 text-sm">{order.customer_name}</p>
                    <p className="text-xs text-steel-400 font-mono">{date}</p>
                  </div>
                  <span className="font-display font-bold text-steel-950 shrink-0">
                    ${formatPrice(order.total || 0)}
                  </span>
                  <span className="text-steel-300 font-mono text-xs shrink-0 group-open:rotate-90 transition-transform">
                    ›
                  </span>
                </summary>

                <div className="border-t border-plate-100 px-5 py-5 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 text-sm">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-steel-400 mb-2">Datos del cliente</p>
                      <p><span className="text-steel-400">Tel:</span> <span className="font-medium">{order.customer_phone || '—'}</span></p>
                      {order.customer_email && <p><span className="text-steel-400">Email:</span> <span className="font-medium">{order.customer_email}</span></p>}
                      {order.customer_address && <p><span className="text-steel-400">Dirección:</span> <span className="font-medium">{order.customer_address}</span></p>}
                      {order.customer_city && <p><span className="text-steel-400">Ciudad:</span> <span className="font-medium">{order.customer_city}</span></p>}
                      {order.customer_province && <p><span className="text-steel-400">Provincia:</span> <span className="font-medium">{order.customer_province}</span></p>}
                      {order.customer_postal_code && <p><span className="text-steel-400">CP:</span> <span className="font-medium">{order.customer_postal_code}</span></p>}
                      {order.shipping_method && (
                        <p>
                          <span className="text-steel-400">Envío:</span>{' '}
                          <span className="font-medium">{SHIPPING_METHOD_LABELS[order.shipping_method] || order.shipping_method}</span>{' '}
                          <span className="text-steel-400 italic">
                            ({SHIPPING_METHOD_NOTES[order.shipping_method] || ''})
                          </span>
                        </p>
                      )}
                      {plainNote && (
                        <p><span className="text-steel-400">Nota:</span> <span className="font-medium italic">{plainNote}</span></p>
                      )}
                      {order.customer_note?.startsWith('[MP]') && (
                        <p><span className="text-steel-400">Pago:</span> <span className="font-medium text-[#009EE3]">MercadoPago — {order.customer_note.replace('[MP] ', '').replace('[MP]', '').trim()}</span></p>
                      )}
                      {financingLine && (
                        <p><span className="text-steel-400">Financiación:</span> <span className="font-medium text-amber-600">{financingLine.replace('[FINANCIACION] ', '').replace('[FINANCIACION]', '').trim()}</span></p>
                      )}
                      {installments3Line && (
                        <p><span className="text-steel-400">Pago:</span> <span className="font-medium text-emerald-600">Quiere 3 cuotas sin interés — coordinar link de pago</span></p>
                      )}
                      {order.financingDocsWithUrl.length > 0 && (
                        <div>
                          <span className="text-steel-400">Documentos:</span>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {order.financingDocsWithUrl.map((doc, i) => (
                              <a
                                key={i}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-plate-200 px-2.5 py-1 text-xs font-medium text-steel-700 hover:border-amber-400 hover:text-amber-700 transition-colors"
                              >
                                <FileText className="h-3.5 w-3.5" /> {doc.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-steel-400 mb-2">Productos</p>
                      <ul className="space-y-1 text-sm">
                        {items.map((item, i) => (
                          <li key={i} className="flex justify-between gap-3">
                            <span className="text-steel-700 line-clamp-1">{item.name}</span>
                            <span className="shrink-0 text-steel-500 font-mono text-xs">
                              x{item.qty} · ${formatPrice(item.price)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 pt-2 border-t border-plate-100 flex justify-between text-sm">
                        <span className="text-steel-500">Total</span>
                        <span className="font-bold text-steel-950">${formatPrice(order.total || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-plate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-steel-500 shrink-0">Cambiar estado:</span>
                      <div className="flex flex-wrap gap-2">
                        {ORDER_STATUS_OPTIONS.map(({ value, label }) => (
                          <AdminActionForm key={value} action={updateOrderStatus}>
                            <input type="hidden" name="id" value={order.id} />
                            <input type="hidden" name="status" value={value} />
                            <button
                              type="submit"
                              className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                                st === value
                                  ? `${ORDER_STATUS_LABELS[value].classes} border-transparent`
                                  : 'bg-white text-steel-500 border-plate-200 hover:border-steel-300'
                              }`}
                            >
                              {label}
                            </button>
                          </AdminActionForm>
                        ))}
                      </div>
                    </div>
                    <DeleteButton id={order.id} action={deleteOrder} label="pedido" />
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </>
  );
}
