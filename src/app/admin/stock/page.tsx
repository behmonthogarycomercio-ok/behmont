import AdminShell from '@/components/admin/AdminShell';
import StockTable from '@/components/admin/StockTable';
import { createServerSupabase } from '@/lib/supabase/server';

export default async function StockPage() {
  const supabase = createServerSupabase();
  const { data: products } = await supabase
    .from('products')
    .select('id, sku, name, price, stock, ml_item_id')
    .order('name');

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-2">Stock y precios</h1>
      <p className="text-sm text-steel-500 mb-6">
        Editá directamente el precio y el stock. Los productos sincronizados desde MercadoLibre
        (marcados con 🛒) se actualizan solos cada 30 minutos — el valor manual se pisa en el
        próximo sync.
      </p>
      <StockTable products={products || []} />
    </AdminShell>
  );
}
