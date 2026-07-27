import AdminShell from '@/components/admin/AdminShell';
import DeleteButton from '@/components/admin/DeleteButton';
import AdminActionForm from '@/components/admin/AdminActionForm';
import { createServerSupabase } from '@/lib/supabase/server';
import { upsertCoupon, deleteCoupon } from '@/lib/actions';

export default async function CuponesPage() {
  const supabase = createServerSupabase();
  const { data: coupons } = await supabase.from('coupons').select('*').order('sort_order');

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-6">Cupones de descuento</h1>
      <p className="text-sm text-steel-500 mb-6 max-w-xl">
        Los cupones no se aplican solos en el pago — el cliente lo menciona al hacer su pedido
        (por WhatsApp o en la nota del carrito) y ahí se le hace el descuento manualmente.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {(coupons || []).map((c) => (
            <div key={c.id} className="flex items-center gap-4 rounded-xl2 border border-plate-200 bg-white p-4 shadow-card">
              <div className="flex-1 min-w-0">
                <p className="font-mono font-bold text-steel-900">{c.code}</p>
                <p className="text-sm text-steel-600 truncate">{c.description}</p>
                <p className="text-xs text-steel-500">
                  {c.discount_pct ? `${c.discount_pct}% OFF · ` : ''}
                  {c.valid_until ? `hasta ${c.valid_until} · ` : ''}
                  orden {c.sort_order} · {c.active ? 'activo' : 'inactivo'}
                </p>
              </div>
              <DeleteButton id={c.id} action={deleteCoupon} label="cupón" />
            </div>
          ))}
          {(!coupons || coupons.length === 0) && (
            <p className="text-sm text-steel-500">Todavía no creaste ningún cupón.</p>
          )}
        </div>

        <AdminActionForm action={upsertCoupon} className="h-fit rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3">
          <h2 className="font-display font-semibold text-steel-900">Nuevo cupón</h2>
          <input name="code" required placeholder="Código (ej: BEHMONT10)" className="input" />
          <input name="description" required placeholder="Descripción (ej: 10% en gastronomía)" className="input" />
          <input type="number" name="discount_pct" placeholder="% de descuento (opcional)" className="input" />
          <label className="block text-xs text-steel-500 -mt-1 mb-1">Válido hasta (opcional)</label>
          <input type="date" name="valid_until" className="input" />
          <input type="number" name="sort_order" placeholder="Orden" defaultValue={0} className="input" />
          <label className="flex items-center gap-2 text-sm text-steel-700">
            <input type="checkbox" name="active" defaultChecked /> Activo
          </label>
          <button type="submit" className="w-full rounded-lg bg-steel-900 py-2.5 text-sm font-semibold text-white hover:bg-steel-800">
            Guardar
          </button>
        </AdminActionForm>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none;margin-bottom:0.25rem}`}</style>
    </AdminShell>
  );
}
