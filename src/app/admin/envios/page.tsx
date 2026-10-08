import AdminShell from '@/components/admin/AdminShell';
import AdminActionForm from '@/components/admin/AdminActionForm';
import { createServerSupabase } from '@/lib/supabase/server';
import { updateShipmentStatus, updateShipmentPayment, createManualShipment, updateShipmentTracking } from '@/lib/actions';
import { isRetrasado, getTrackingUrl, STATUS_LABELS, PAYMENT_STATUS_LABELS, NEXT_DRIVER_STATUS, DRIVER_ACTION_LABELS, type ShipmentStatus, type PaymentStatus } from '@/lib/envios';
import { formatPrice } from '@/lib/price';
import { Home, Package, Plus } from 'lucide-react';

type ShipmentRow = {
  id: string;
  status: ShipmentStatus;
  payment_status: PaymentStatus;
  destino_tipo: 'domicilio' | 'sucursal_andreani' | 'otro';
  destino_detalle: string | null;
  buyer_nickname: string | null;
  items: { title: string; quantity: number }[];
  total: number | null;
  estimated_delivery_date: string | null;
  delivered_at: string | null;
  delivered_by: string | null;
  created_at: string;
  transportista: string | null;
  numero_seguimiento: string | null;
  precio_asegurado: number | null;
};

const DESTINO_ICON = { domicilio: Home, sucursal_andreani: Package, otro: Package } as const;
const DESTINO_LABEL = { domicilio: 'Domicilio', sucursal_andreani: 'Sucursal', otro: 'Otro' } as const;

export default async function EnviosPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const supabase = createServerSupabase();
  const filter = searchParams.status || 'pendientes';

  const { data: allRows } = await supabase
    .from('ml_shipments')
    .select('id, status, payment_status, destino_tipo, destino_detalle, buyer_nickname, items, total, estimated_delivery_date, delivered_at, delivered_by, created_at, transportista, numero_seguimiento, precio_asegurado')
    .order('created_at', { ascending: false })
    .limit(300);

  const rows = (allRows || []) as ShipmentRow[];
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

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-steel-950">Envíos</h1>
        <p className="text-sm text-steel-500">{rows.length} en total</p>
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
            <input name="numeroSeguimiento" placeholder="Nº de seguimiento (si ya se sabe)" className="rounded-lg border border-plate-200 px-3 py-2 text-sm" />
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
                const firstTitle = r.items[0]?.title || 'Producto';
                const extra = r.items.length > 1 ? ` + ${r.items.length - 1} más` : '';
                return (
                  <tr key={r.id}>
                    <td className="px-4 py-3 text-steel-900 max-w-xs">
                      <p className="line-clamp-1">{firstTitle}{extra}</p>
                      {r.total != null && <p className="text-xs text-steel-400">${formatPrice(r.total)}</p>}
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
                      {r.transportista || r.numero_seguimiento || r.precio_asegurado != null ? (
                        <div className="text-xs leading-relaxed">
                          {r.transportista && <p className="font-medium text-steel-700">{r.transportista}</p>}
                          {r.numero_seguimiento && <p className="text-steel-400">Seg: {r.numero_seguimiento}</p>}
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
                          <input name="numeroSeguimiento" placeholder="Nº de seguimiento" defaultValue={r.numero_seguimiento || ''} className="rounded border border-plate-200 px-2 py-1 text-xs" />
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
                        {NEXT_DRIVER_STATUS[r.status] && (
                          <AdminActionForm action={updateShipmentStatus}>
                            <input type="hidden" name="id" value={r.id} />
                            <input type="hidden" name="status" value={NEXT_DRIVER_STATUS[r.status]} />
                            <input type="hidden" name="by" value="Admin" />
                            <button type="submit" className="rounded-lg bg-steel-900 text-white hover:bg-steel-800 px-3 py-1.5 text-xs font-semibold">
                              {DRIVER_ACTION_LABELS[NEXT_DRIVER_STATUS[r.status]!]}
                            </button>
                          </AdminActionForm>
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
