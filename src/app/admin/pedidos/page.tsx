import AdminShell from '@/components/admin/AdminShell';
import AdminActionForm from '@/components/admin/AdminActionForm';
import { createServerSupabase } from '@/lib/supabase/server';
import { updateOrderStatus } from '@/lib/actions';

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  pendiente:   { label: 'Pendiente',   classes: 'bg-yellow-100 text-yellow-700' },
  procesando:  { label: 'Procesando',  classes: 'bg-blue-100 text-blue-700' },
  completado:  { label: 'Completado',  classes: 'bg-emerald-100 text-emerald-700' },
  cancelado:   { label: 'Cancelado',   classes: 'bg-red-100 text-red-600' },
};

const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, { label }]) => ({ value, label }));

export default async function PedidosPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const supabase = createServerSupabase();

  const filterStatus = searchParams.status || '';
  const q = searchParams.q?.trim() || '';

  let query = supabase
    .from('whatsapp_orders')
    .select('id, customer_name, customer_phone, customer_email, customer_address, customer_note, items, total, status, created_at')
    .order('created_at', { ascending: false });

  if (filterStatus) query = query.eq('status', filterStatus);
  if (q)            query = query.ilike('customer_name', `%${q}%`);

  const { data: orders } = await query.limit(100);

  // Summary counts
  const { data: counts } = await supabase
    .from('whatsapp_orders')
    .select('status');

  const countByStatus = (counts || []).reduce<Record<string, number>>((acc, o) => {
    const s = o.status || 'pendiente';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-steel-950">Pedidos</h1>
        <p className="text-sm text-steel-500">{(orders || []).length} pedidos cargados</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <a
          href="?"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
            !filterStatus
              ? 'bg-steel-950 text-white border-steel-950'
              : 'bg-white text-steel-600 border-plate-200 hover:border-steel-300'
          }`}
        >
          Todos ({counts?.length || 0})
        </a>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <a
            key={value}
            href={`?status=${value}`}
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

      {/* Search */}
      <form action="" className="mb-5">
        {filterStatus && <input type="hidden" name="status" value={filterStatus} />}
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre de cliente..."
          className="w-full max-w-xs rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
        />
      </form>

      {/* Orders list */}
      {(!orders || orders.length === 0) ? (
        <div className="rounded-xl border border-dashed border-plate-200 p-12 text-center">
          <p className="text-steel-500 text-sm">No hay pedidos con este filtro.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const items = (order.items as { name: string; qty: number; price: number; sku: string }[]) || [];
            const st = order.status || 'pendiente';
            const badge = STATUS_LABELS[st] || STATUS_LABELS.pendiente;
            const date = new Date(order.created_at).toLocaleString('es-AR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            });

            return (
              <details key={order.id} className="group rounded-xl border border-plate-200 bg-white shadow-sm overflow-hidden">
                <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none hover:bg-plate-50 transition-colors">
                  {/* Status badge */}
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.classes}`}>
                    {badge.label}
                  </span>
                  {/* Payment method badge */}
                  {order.customer_note?.startsWith('[MP]') && (
                    <span className="shrink-0 rounded-full bg-[#009EE3] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      MP
                    </span>
                  )}
                  {/* Name + date */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-steel-900 text-sm">{order.customer_name}</p>
                    <p className="text-xs text-steel-400 font-mono">{date}</p>
                  </div>
                  {/* Total */}
                  <span className="font-display font-bold text-steel-950 shrink-0">
                    ${Number(order.total || 0).toLocaleString('es-AR')}
                  </span>
                  {/* Arrow */}
                  <span className="text-steel-300 font-mono text-xs shrink-0 group-open:rotate-90 transition-transform">
                    ›
                  </span>
                </summary>

                {/* Detail */}
                <div className="border-t border-plate-100 px-5 py-5 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Contact */}
                    <div className="space-y-1.5 text-sm">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-steel-400 mb-2">Datos del cliente</p>
                      <p><span className="text-steel-400">Tel:</span> <span className="font-medium">{order.customer_phone || '—'}</span></p>
                      {order.customer_email && <p><span className="text-steel-400">Email:</span> <span className="font-medium">{order.customer_email}</span></p>}
                      {order.customer_address && <p><span className="text-steel-400">Dirección:</span> <span className="font-medium">{order.customer_address}</span></p>}
                      {order.customer_note && !order.customer_note.startsWith('[MP]') && (
                        <p><span className="text-steel-400">Nota:</span> <span className="font-medium italic">{order.customer_note}</span></p>
                      )}
                      {order.customer_note?.startsWith('[MP]') && (
                        <p><span className="text-steel-400">Pago:</span> <span className="font-medium text-[#009EE3]">MercadoPago — {order.customer_note.replace('[MP] ', '').replace('[MP]', '').trim()}</span></p>
                      )}
                    </div>

                    {/* Items */}
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-steel-400 mb-2">Productos</p>
                      <ul className="space-y-1 text-sm">
                        {items.map((item, i) => (
                          <li key={i} className="flex justify-between gap-3">
                            <span className="text-steel-700 line-clamp-1">{item.name}</span>
                            <span className="shrink-0 text-steel-500 font-mono text-xs">
                              x{item.qty} · ${Number(item.price).toLocaleString('es-AR')}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 pt-2 border-t border-plate-100 flex justify-between text-sm">
                        <span className="text-steel-500">Total</span>
                        <span className="font-bold text-steel-950">${Number(order.total || 0).toLocaleString('es-AR')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status changer */}
                  <div className="flex items-center gap-3 pt-2 border-t border-plate-100">
                    <span className="text-xs font-semibold text-steel-500 shrink-0">Cambiar estado:</span>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map(({ value, label }) => (
                        <AdminActionForm key={value} action={updateOrderStatus}>
                          <input type="hidden" name="id" value={order.id} />
                          <input type="hidden" name="status" value={value} />
                          <button
                            type="submit"
                            className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                              st === value
                                ? `${STATUS_LABELS[value].classes} border-transparent`
                                : 'bg-white text-steel-500 border-plate-200 hover:border-steel-300'
                            }`}
                          >
                            {label}
                          </button>
                        </AdminActionForm>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
