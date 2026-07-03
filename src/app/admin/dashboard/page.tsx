import AdminShell from '@/components/admin/AdminShell';
import { createServerSupabase } from '@/lib/supabase/server';
import { Package, FolderTree, MessageSquareText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createServerSupabase();

  const [{ count: productCount }, { count: categoryCount }, { count: orderCount }, { data: lowStock }, { data: recentOrders }] =
    await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('whatsapp_orders').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('id,name,sku,stock').lte('stock', 3).order('stock'),
      supabase
        .from('whatsapp_orders')
        .select('id,customer_name,total,status,created_at')
        .order('created_at', { ascending: false })
        .limit(6),
    ]);

  const stats = [
    { label: 'Productos', value: productCount || 0, icon: Package, href: '/admin/productos' },
    { label: 'Categorías', value: categoryCount || 0, icon: FolderTree, href: '/admin/categorias' },
    { label: 'Pedidos por WhatsApp', value: orderCount || 0, icon: MessageSquareText, href: '/admin/dashboard' },
  ];

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-6">Inicio</h1>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card hover:border-amber-500 transition-colors"
          >
            <Icon className="h-5 w-5 text-amber-500 mb-2" />
            <p className="text-2xl font-display font-bold text-steel-950">{value}</p>
            <p className="text-sm text-steel-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Stock bajo
          </h2>
          {lowStock && lowStock.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {lowStock.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span className="text-steel-800">{p.name}</span>
                  <span className="font-semibold text-red-600">{p.stock} u.</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-steel-500">Todo el stock está en niveles saludables.</p>
          )}
        </div>

        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-4">Últimos pedidos</h2>
          {recentOrders && recentOrders.length > 0 ? (
            <ul className="space-y-3 text-sm">
              {recentOrders.map((o) => (
                <li key={o.id} className="flex justify-between">
                  <span className="text-steel-800">{o.customer_name}</span>
                  <span className="font-semibold text-steel-950">
                    ${Number(o.total || 0).toLocaleString('es-AR')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-steel-500">Todavía no llegaron pedidos.</p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
