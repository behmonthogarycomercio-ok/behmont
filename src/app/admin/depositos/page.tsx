import { redirect } from 'next/navigation';

// Tipos que siguen importando ZonasTree/ProductLocationsManager/StockMovementsHistory
// -- se quedan acá para no tener que tocar esos componentes, aunque el contenido
// de esta sección se mudó a /admin/productos?tab=depositos.
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

// Depósitos se unificó con Productos (/admin/productos) -- este redirect
// queda para que links/accesos directos viejos a /admin/depositos no rompan.
export default function DepositosRedirectPage() {
  redirect('/admin/productos?tab=depositos');
}
