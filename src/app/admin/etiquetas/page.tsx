import AdminShell from '@/components/admin/AdminShell';
import EtiquetasClient from '@/components/admin/EtiquetasClient';
import { createServerSupabase } from '@/lib/supabase/server';

export default async function EtiquetasPage() {
  const supabase = createServerSupabase();

  const { data: products } = await supabase
    .from('products')
    .select('id, sku, name, description, price, ml_item_id, specs, active, category:categories(name, cash_discount_pct)')
    .eq('active', true)
    .order('name')
    .range(0, 4999);

  // El join a categories viene tipado como array por defecto (aunque la
  // relacion es de a uno) -- se normaliza aca para que el cliente reciba
  // siempre un objeto o null.
  const normalized = (products || []).map((p) => ({
    ...p,
    category: Array.isArray(p.category) ? p.category[0] ?? null : p.category,
  }));

  return (
    <AdminShell>
      <EtiquetasClient products={normalized} />
    </AdminShell>
  );
}
