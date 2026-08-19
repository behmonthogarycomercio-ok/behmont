import AdminShell from '@/components/admin/AdminShell';
import EtiquetasClient from '@/components/admin/EtiquetasClient';
import { createServerSupabase } from '@/lib/supabase/server';

const PAGE_SIZE = 1000; // limite maximo por request que impone Supabase (db-max-rows), no se puede pedir mas de una

async function fetchAllActiveProducts(supabase: ReturnType<typeof createServerSupabase>) {
  const pages = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data } = await supabase
      .from('products')
      .select('id, sku, name, description, price, ml_item_id, specs, active, category:categories(name, cash_discount_pct)')
      .eq('active', true)
      .order('name')
      .range(from, from + PAGE_SIZE - 1);
    pages.push(...(data || []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return pages;
}

export default async function EtiquetasPage() {
  const supabase = createServerSupabase();

  const products = await fetchAllActiveProducts(supabase);

  // El join a categories viene tipado como array por defecto (aunque la
  // relacion es de a uno) -- se normaliza aca para que el cliente reciba
  // siempre un objeto o null.
  const normalized = products.map((p) => ({
    ...p,
    category: Array.isArray(p.category) ? p.category[0] ?? null : p.category,
  }));

  return (
    <AdminShell>
      <EtiquetasClient products={normalized} />
    </AdminShell>
  );
}
