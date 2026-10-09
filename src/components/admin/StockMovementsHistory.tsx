import type { Zona } from '@/app/admin/depositos/page';

type MovementRow = {
  id: string;
  tipo: 'ingreso' | 'retiro' | 'ajuste';
  quantity: number;
  staff_name: string;
  note: string | null;
  created_at: string;
  zona_id: string | null;
  product: { name: string; sku: string } | { name: string; sku: string }[] | null;
};

function zonaPath(zonaId: string | null, zonasById: Map<string, Zona>): string {
  if (!zonaId) return '—';
  const parts: string[] = [];
  let current = zonasById.get(zonaId);
  while (current) {
    parts.unshift(current.nombre);
    current = current.parent_id ? zonasById.get(current.parent_id) : undefined;
  }
  return parts.join(' › ') || 'Zona eliminada';
}

const TIPO_LABEL: Record<MovementRow['tipo'], string> = {
  ingreso: 'Ingreso',
  retiro: 'Retiro',
  ajuste: 'Ajuste',
};

const TIPO_COLOR: Record<MovementRow['tipo'], string> = {
  ingreso: 'bg-emerald-100 text-emerald-700',
  retiro: 'bg-amber-100 text-amber-700',
  ajuste: 'bg-plate-100 text-steel-600',
};

export default function StockMovementsHistory({ movements, zonas }: { movements: MovementRow[]; zonas: Zona[] }) {
  const zonasById = new Map(zonas.map((z) => [z.id, z]));

  return (
    <div className="rounded-xl2 border border-plate-200 bg-white shadow-card p-5">
      <h2 className="font-display text-lg font-bold text-steel-950 mb-1">Historial de movimientos</h2>
      <p className="text-sm text-steel-500 mb-3">
        Quién retiró o ingresó cada producto, de qué ubicación, día y horario.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-plate-200 text-left text-steel-500">
              <th className="p-2 font-medium">Fecha y hora</th>
              <th className="p-2 font-medium">Quién</th>
              <th className="p-2 font-medium">Tipo</th>
              <th className="p-2 font-medium">Producto</th>
              <th className="p-2 font-medium">Ubicación</th>
              <th className="p-2 font-medium">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => {
              const product = Array.isArray(m.product) ? m.product[0] : m.product;
              return (
                <tr key={m.id} className="border-b border-plate-100 last:border-0">
                  <td className="p-2 text-steel-600 whitespace-nowrap">
                    {new Date(m.created_at).toLocaleString('es-AR')}
                  </td>
                  <td className="p-2 font-medium text-steel-900">{m.staff_name}</td>
                  <td className="p-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TIPO_COLOR[m.tipo]}`}>
                      {TIPO_LABEL[m.tipo]}
                    </span>
                  </td>
                  <td className="p-2 text-steel-700">
                    {product?.name || '—'}
                    {product?.sku && <span className="text-xs text-steel-400 font-mono"> ({product.sku})</span>}
                  </td>
                  <td className="p-2 text-steel-600">{zonaPath(m.zona_id, zonasById)}</td>
                  <td className="p-2 font-semibold text-steel-900">{m.quantity}</td>
                </tr>
              );
            })}
            {movements.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-steel-400">
                  Todavía no hay movimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
