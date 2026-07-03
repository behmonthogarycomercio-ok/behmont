import { createServerSupabase } from './supabase/server';
import type { WhatsAppOrderItem } from './types';

export type OrderRow = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_address: string | null;
  customer_note: string | null;
  items: WhatsAppOrderItem[];
  total: number | null;
  status: string;
  created_at: string;
};

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/** Pedidos del mes actual (o el mes que se pase). */
export async function getOrdersForMonth(reference: Date = new Date()): Promise<OrderRow[]> {
  const supabase = createServerSupabase();
  const from = startOfMonth(reference).toISOString();
  const to = new Date(reference.getFullYear(), reference.getMonth() + 1, 1).toISOString();

  const { data } = await supabase
    .from('whatsapp_orders')
    .select('*')
    .gte('created_at', from)
    .lt('created_at', to)
    .order('created_at', { ascending: false });

  return (data as OrderRow[]) || [];
}

/** Todos los pedidos de los últimos N meses (para el gráfico de tendencia). */
export async function getOrdersLastNMonths(n = 6): Promise<OrderRow[]> {
  const supabase = createServerSupabase();
  const from = new Date();
  from.setMonth(from.getMonth() - (n - 1));
  from.setDate(1);
  from.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from('whatsapp_orders')
    .select('*')
    .gte('created_at', from.toISOString())
    .order('created_at', { ascending: true });

  return (data as OrderRow[]) || [];
}

export function computeMonthlyMetrics(orders: OrderRow[]) {
  const totalSales = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const orderCount = orders.length;
  const avgTicket = orderCount > 0 ? totalSales / orderCount : 0;

  // Top productos por cantidad vendida
  const productMap = new Map<string, { sku: string; name: string; qty: number; revenue: number }>();
  for (const order of orders) {
    for (const item of order.items || []) {
      const key = item.sku || item.name;
      const existing = productMap.get(key);
      if (existing) {
        existing.qty += item.qty;
        existing.revenue += item.qty * item.price;
      } else {
        productMap.set(key, { sku: item.sku, name: item.name, qty: item.qty, revenue: item.qty * item.price });
      }
    }
  }
  const topProducts = Array.from(productMap.values())
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 10);

  // Ventas por día del mes
  const dayMap = new Map<string, number>();
  for (const order of orders) {
    const day = order.created_at.slice(0, 10);
    dayMap.set(day, (dayMap.get(day) || 0) + Number(order.total || 0));
  }
  const dailySales = Array.from(dayMap.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Ubicaciones de clientes (agrupa por dirección tal cual la cargaron)
  const locationMap = new Map<string, number>();
  for (const order of orders) {
    const addr = (order.customer_address || '').trim();
    if (!addr) continue;
    locationMap.set(addr, (locationMap.get(addr) || 0) + 1);
  }
  const topLocations = Array.from(locationMap.entries())
    .map(([address, count]) => ({ address, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const ordersWithAddress = orders.filter((o) => o.customer_address?.trim()).length;

  return { totalSales, orderCount, avgTicket, topProducts, dailySales, topLocations, ordersWithAddress };
}

export function computeMonthlyTrend(orders: OrderRow[], months = 6) {
  const monthMap = new Map<string, number>();
  for (const order of orders) {
    const key = order.created_at.slice(0, 7); // YYYY-MM
    monthMap.set(key, (monthMap.get(key) || 0) + Number(order.total || 0));
  }
  // Asegura que los últimos `months` meses aparezcan aunque tengan 0 ventas
  const result: { month: string; total: number }[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    result.push({ month: key, total: monthMap.get(key) || 0 });
  }
  return result;
}
