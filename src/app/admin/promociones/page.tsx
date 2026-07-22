import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import DeleteButton from '@/components/admin/DeleteButton';
import AdminActionForm from '@/components/admin/AdminActionForm';
import { createServerSupabase } from '@/lib/supabase/server';
import { upsertPromotion, deletePromotion } from '@/lib/actions';

const PLACEMENTS = [
  { value: '', label: 'Todas' },
  { value: 'hero', label: 'Hero' },
  { value: 'banner', label: 'Banner' },
  { value: 'strip', label: 'Franja' },
  { value: 'financiacion', label: 'Promos en financiación' },
] as const;

export default async function PromocionesPage({
  searchParams,
}: {
  searchParams: { placement?: string };
}) {
  const activePlacement = searchParams.placement || '';
  const supabase = createServerSupabase();
  let query = supabase.from('promotions').select('*').order('sort_order');
  if (activePlacement) query = query.eq('placement', activePlacement);
  const { data: promotions } = await query;

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-6">Promociones y banners</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {PLACEMENTS.map((p) => (
          <Link
            key={p.value}
            href={p.value ? `/admin/promociones?placement=${p.value}` : '/admin/promociones'}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activePlacement === p.value
                ? 'bg-steel-900 text-white'
                : 'bg-plate-100 text-steel-600 hover:bg-plate-200'
            }`}
          >
            {p.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {(promotions || []).map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-xl2 border border-plate-200 bg-white p-4 shadow-card">
              {p.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt="" className="h-14 w-20 rounded-lg object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-steel-900 truncate">{p.title}</p>
                <p className="text-xs text-steel-500">
                  {p.placement} · orden {p.sort_order} · {p.active ? 'activa' : 'inactiva'}
                </p>
              </div>
              <DeleteButton id={p.id} action={deletePromotion} label="promoción" />
            </div>
          ))}
          {(!promotions || promotions.length === 0) && (
            <p className="text-sm text-steel-500">Todavía no creaste ninguna promoción.</p>
          )}
        </div>

        <AdminActionForm action={upsertPromotion} className="h-fit rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3">
          <h2 className="font-display font-semibold text-steel-900">Nueva promoción</h2>
          <input name="title" required placeholder="Título" className="input" />
          <input name="subtitle" placeholder="Subtítulo (opcional)" className="input" />
          <input name="image_url" placeholder="URL de imagen" className="input" />
          <input name="cta_link" placeholder="Link (ej: /categoria/frio)" className="input" />
          <input name="cta_text" placeholder="Texto del botón" defaultValue="Ver productos" className="input" />
          <select name="placement" className="input" defaultValue={activePlacement || 'hero'}>
            <option value="hero">Hero (portada principal)</option>
            <option value="banner">Banner destacado (2 columnas)</option>
            <option value="strip">Franja secundaria</option>
            <option value="financiacion">Promos en financiación (carrusel)</option>
          </select>
          <input type="number" name="sort_order" placeholder="Orden" defaultValue={0} className="input" />
          <label className="flex items-center gap-2 text-sm text-steel-700">
            <input type="checkbox" name="active" defaultChecked /> Activa
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
