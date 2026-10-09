import AdminShell from '@/components/admin/AdminShell';
import ZonasTree from '@/components/admin/ZonasTree';
import ProductLocationsManager from '@/components/admin/ProductLocationsManager';
import DepositoStaffSecrets from '@/components/admin/DepositoStaffSecrets';
import StockMovementsHistory from '@/components/admin/StockMovementsHistory';
import { createServerSupabase } from '@/lib/supabase/server';

export type Zona = {
  id: string;
  parent_id: string | null;
  tipo: 'area' | 'gondola' | 'estante' | 'division';
  codigo: string;
  nombre: string;
  sort_order: number;
  active: boolean;
};

export type ProductoDeposito = {
  id: string;
  sku: string;
  name: string;
  stock: number;
};

export type ProductLocationRow = {
  id: string;
  product_id: string;
  zona_id: string;
  quantity: number;
};

export default async function DepositosPage() {
  const supabase = createServerSupabase();

  const { data: zonas } = await supabase
    .from('zonas')
    .select('id, parent_id, tipo, codigo, nombre, sort_order, active')
    .order('sort_order');

  const { data: products } = await supabase
    .from('products')
    .select('id, sku, name, stock')
    .eq('active', true)
    .order('name');

  const { data: locations } = await supabase
    .from('product_locations')
    .select('id, product_id, zona_id, quantity');

  const { data: movements } = await supabase
    .from('stock_movements')
    .select('id, tipo, quantity, staff_name, note, created_at, zona_id, product:products(name, sku)')
    .order('created_at', { ascending: false })
    .limit(200);

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-2">Depósitos y zonas</h1>
      <p className="text-sm text-steel-500 mb-6">
        Armá la estructura de góndolas/estantes/divisiones de cada depósito y asignale a cada
        producto dónde está ubicado. Lo mismo lo puede gestionar Gabriel desde la terminal del
        depósito (sin login), en <span className="font-mono">/deposito/gestion</span>.
      </p>
      <DepositoStaffSecrets />
      <ZonasTree zonas={(zonas as Zona[]) || []} />
      <ProductLocationsManager
        products={(products as ProductoDeposito[]) || []}
        zonas={(zonas as Zona[]) || []}
        locations={(locations as ProductLocationRow[]) || []}
      />
      <div className="mt-8">
        <StockMovementsHistory movements={movements || []} zonas={(zonas as Zona[]) || []} />
      </div>
    </AdminShell>
  );
}
