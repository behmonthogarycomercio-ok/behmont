import AdminShell from '@/components/admin/AdminShell';
import { TopProductsChart, SalesTrendChart, DailySalesChart } from '@/components/admin/MetricsCharts';
import ExportButton from '@/components/admin/ExportButton';
import {
  getOrdersForMonth,
  getOrdersLastNMonths,
  computeMonthlyMetrics,
  computeMonthlyTrend,
} from '@/lib/metrics';
import { TrendingUp, ShoppingBag, Receipt, MapPin } from 'lucide-react';

export default async function MetricasPage() {
  const [monthOrders, trendOrders] = await Promise.all([
    getOrdersForMonth(),
    getOrdersLastNMonths(6),
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
