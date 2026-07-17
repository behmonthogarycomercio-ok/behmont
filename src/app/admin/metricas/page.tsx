import AdminShell from '@/components/admin/AdminShell';
import { TopProductsChart, SalesTrendChart, DailySalesChart } from '@/components/admin/MetricsCharts';
import ExportButton from '@/components/admin/ExportButton';
import {
  getOrdersForMonth,
  getOrdersLastNMonths,
  computeMonthlyMetrics,
  computeMonthlyTrend,
} from '@/lib/metrics';
import { getMLMetricsSummary } from '@/lib/mercadolibre';
import { TrendingUp, ShoppingBag, Receipt, MapPin, Award, MessageCircleQuestion, Eye, ShieldAlert } from 'lucide-react';

const ML_REPUTATION_LABELS: Record<string, string> = {
  '5_green': 'Excelente (verde)',
  '4_light_green': 'Muy buena (verde claro)',
  '3_yellow': 'Buena (amarilla)',
  '2_orange': 'Regular (naranja)',
  '1_red': 'Mala (roja)',
};

export default async function MetricasPage() {
  const [monthOrders, trendOrders, mlMetrics] = await Promise.all([
    getOrdersForMonth(),
    getOrdersLastNMonths(6),
    getMLMetricsSummary(30),
  ]);

  const metrics = computeMonthlyMetrics(monthOrders);
  const trend = computeMonthlyTrend(trendOrders, 6);

  const monthLabel = new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-steel-950">Métricas</h1>
          <p className="text-sm text-steel-500 capitalize">{monthLabel}</p>
        </div>
        <ExportButton />
      </div>

      {/* ── Tarjetas resumen ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          icon={Receipt}
          label="Ventas del mes"
          value={`$${metrics.totalSales.toLocaleString('es-AR')}`}
        />
        <StatCard icon={ShoppingBag} label="Pedidos del mes" value={String(metrics.orderCount)} />
        <StatCard
          icon={TrendingUp}
          label="Ticket promedio"
          value={`$${Math.round(metrics.avgTicket).toLocaleString('es-AR')}`}
        />
        <StatCard
          icon={MapPin}
          label="Pedidos con dirección"
          value={`${metrics.ordersWithAddress} / ${metrics.orderCount}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-1">Productos más vendidos</h2>
          <p className="text-xs text-steel-500 mb-4">Por cantidad, este mes — para saber dónde reforzar promociones</p>
          <TopProductsChart data={metrics.topProducts} />
        </div>

        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-1">Tendencia (últimos 6 meses)</h2>
          <p className="text-xs text-steel-500 mb-4">Ventas totales por mes</p>
          <SalesTrendChart data={trend} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-1">Ventas por día (este mes)</h2>
          <p className="text-xs text-steel-500 mb-4">Detecta picos y días flojos</p>
          <DailySalesChart data={metrics.dailySales} />
        </div>

        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-1">De dónde son tus clientes</h2>
          <p className="text-xs text-steel-500 mb-4">
            Direcciones cargadas en el pedido, este mes
          </p>
          {metrics.topLocations.length === 0 ? (
            <p className="text-sm text-steel-500">
              Todavía no hay direcciones cargadas — se completan cuando el cliente las escribe
              en el formulario de pedido.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {metrics.topLocations.map((loc) => (
                <li key={loc.address} className="flex items-start justify-between gap-3">
                  <span className="text-steel-700 line-clamp-1">{loc.address}</span>
                  <span className="shrink-0 rounded-full bg-plate-100 px-2 py-0.5 text-xs font-semibold text-steel-600">
                    {loc.count} pedido{loc.count > 1 ? 's' : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── MercadoLibre ── */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-bold text-steel-950 mb-1">MercadoLibre</h2>
        <p className="text-sm text-steel-500 mb-4">Últimos 30 días</p>

        {!mlMetrics.connected ? (
          <div className="rounded-xl2 border border-dashed border-plate-200 bg-white p-6 text-sm text-steel-500">
            Todavía no conectaste tu cuenta de MercadoLibre. Hacelo desde{' '}
            <a href="/admin/marcas" className="font-semibold text-amber-600 hover:underline">
              Marcas y MercadoLibre
            </a>{' '}
            para ver acá las ventas, reputación y preguntas.
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <StatCard
                icon={Receipt}
                label="Ventas ML (30 días)"
                value={
                  mlMetrics.orders
                    ? `$${mlMetrics.orders.orders
                        .reduce((sum, o) => sum + Number(o.total_amount || 0), 0)
                        .toLocaleString('es-AR')}`
                    : '—'
                }
              />
              <StatCard
                icon={ShoppingBag}
                label="Pedidos ML (30 días)"
                value={mlMetrics.orders ? String(mlMetrics.orders.total) : '—'}
              />
              <StatCard
                icon={Eye}
                label="Visitas (30 días)"
                value={mlMetrics.visits !== undefined ? mlMetrics.visits.toLocaleString('es-AR') : '—'}
              />
              <StatCard
                icon={MessageCircleQuestion}
                label="Preguntas sin responder"
                value={mlMetrics.unansweredQuestions !== undefined ? String(mlMetrics.unansweredQuestions) : '—'}
              />
            </div>

            {mlMetrics.reputation && (
              <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card mb-6">
                <h3 className="font-display font-semibold text-steel-900 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" /> Reputación del vendedor
                </h3>
                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                  <div>
                    <p className="text-steel-400 text-xs mb-1">Nivel</p>
                    <p className="font-semibold text-steel-900">
                      {mlMetrics.reputation.levelId
                        ? ML_REPUTATION_LABELS[mlMetrics.reputation.levelId] || mlMetrics.reputation.levelId
                        : 'Sin datos todavía'}
                    </p>
                  </div>
                  <div>
                    <p className="text-steel-400 text-xs mb-1">Ventas completadas / canceladas</p>
                    <p className="font-semibold text-steel-900">
                      {mlMetrics.reputation.transactions.completed} / {mlMetrics.reputation.transactions.canceled}
                    </p>
                  </div>
                  <div>
                    <p className="text-steel-400 text-xs mb-1 flex items-center gap-1">
                      <ShieldAlert className="h-3.5 w-3.5" /> Reclamos / cancelaciones
                    </p>
                    <p className="font-semibold text-steel-900">
                      {(mlMetrics.reputation.claimsRate * 100).toFixed(1)}% / {(mlMetrics.reputation.cancellationsRate * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {mlMetrics.orders && mlMetrics.orders.orders.length > 0 && (
              <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
                <h3 className="font-display font-semibold text-steel-900 mb-3">Últimas ventas de ML</h3>
                <ul className="space-y-2 text-sm">
                  {mlMetrics.orders.orders.slice(0, 8).map((o) => (
                    <li key={o.id} className="flex items-center justify-between gap-3 border-b border-plate-100 pb-2 last:border-0">
                      <span className="text-steel-700 line-clamp-1">
                        {o.order_items?.[0]?.item.title || `Pedido #${o.id}`}
                        {o.buyer?.nickname ? ` — ${o.buyer.nickname}` : ''}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-steel-500">
                        {new Date(o.date_created).toLocaleDateString('es-AR')} · ${Number(o.total_amount).toLocaleString('es-AR')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </AdminShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
      <Icon className="h-5 w-5 text-amber-500 mb-2" />
      <p className="text-2xl font-display font-bold text-steel-950">{value}</p>
      <p className="text-sm text-steel-500">{label}</p>
    </div>
  );
}
