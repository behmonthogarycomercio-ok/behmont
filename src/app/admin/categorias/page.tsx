import AdminShell from '@/components/admin/AdminShell';
import DeleteButton from '@/components/admin/DeleteButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { upsertCategory, deleteCategory } from '@/lib/actions';

export default async function CategoriasPage() {
  const supabase = createServerSupabase();
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order');

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-6">Categorías</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-plate-200 text-left text-steel-500">
                <th className="p-3 font-medium">Nombre</th>
                <th className="p-3 font-medium">Slug</th>
                <th className="p-3 font-medium">Orden</th>
                <th className="p-3 font-medium">Estado</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {(categories || []).map((c) => (
                <tr key={c.id} className="border-b border-plate-100 last:border-0">
                  <td className="p-3 font-medium text-steel-900">{c.name}</td>
                  <td className="p-3 font-mono text-xs text-steel-500">/{c.slug}</td>
                  <td className="p-3 text-steel-600">{c.sort_order}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-plate-100 text-steel-500'}`}>
                      {c.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <DeleteButton id={c.id} action={deleteCategory} label="categoría" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form action={upsertCategory} className="h-fit rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3">
          <h2 className="font-display font-semibold text-steel-900">Nueva categoría</h2>
          <input name="name" required placeholder="Nombre (ej: Panadería)" className="input" />
          <input name="icon_url" placeholder="URL del ícono (opcional)" className="input" />
          <input type="number" name="sort_order" placeholder="Orden" defaultValue={0} className="input" />
          <label className="flex items-center gap-2 text-sm text-steel-700">
            <input type="checkbox" name="active" defaultChecked /> Activa
          </label>
          <button type="submit" className="w-full rounded-lg bg-steel-900 py-2.5 text-sm font-semibold text-white hover:bg-steel-800">
            Guardar
          </button>
        </form>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none;margin-bottom:0.25rem}`}</style>
    </AdminShell>
  );
}
