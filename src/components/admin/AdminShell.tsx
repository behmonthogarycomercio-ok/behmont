'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Megaphone,
  Boxes,
  Tag,
  BarChart3,
  LogOut,
  ExternalLink,
  ShoppingBag,
  Instagram,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/admin/dashboard',   label: 'Inicio',               icon: LayoutDashboard },
  { href: '/admin/pedidos',     label: 'Pedidos',               icon: ShoppingBag },
  { href: '/admin/metricas',    label: 'Métricas',              icon: BarChart3 },
  { href: '/admin/productos',   label: 'Productos',             icon: Package },
  { href: '/admin/categorias',  label: 'Categorías',            icon: FolderTree },
  { href: '/admin/promociones', label: 'Promociones',           icon: Megaphone },
  { href: '/admin/stock',       label: 'Stock y precios',       icon: Boxes },
  { href: '/admin/marcas',      label: 'Marcas y MercadoLibre', icon: Tag },
  { href: '/admin/contenido',   label: 'Contenido',             icon: Instagram },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase
      .from('whatsapp_orders')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pendiente')
      .then(({ count }) => {
        if (!cancelled) setPendingOrders(count ?? 0);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-plate-50">
      <aside className="w-64 shrink-0 bg-steel-950 text-plate-100 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="relative h-12 w-28 mx-auto sm:mx-0">
            <Image src="/images/logo-behmont-oval.png" alt="BEHMONT" fill className="object-contain object-left" />
          </div>
          <p className="text-xs text-plate-100/50 mt-1.5">Panel de administración</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-amber-500 text-white'
                    : 'text-plate-100/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
                {href === '/admin/pedidos' && pendingOrders > 0 && (
                  <span className="ml-auto rounded-full bg-danger-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                    {pendingOrders}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-plate-100/80 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" /> Ver sitio público
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-plate-100/80 hover:bg-white/5 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 sm:p-8">{children}</main>
    </div>
  );
}
