import AdminShell from '@/components/admin/AdminShell';
import ProductForm from '@/components/admin/ProductForm';
import ProductsTable from '@/components/admin/ProductsTable';
import PriceListImport from '@/components/admin/PriceListImport';
import ExportButton from '@/components/admin/ExportButton';
import DeleteButton from '@/components/admin/DeleteButton';
import AdminActionForm from '@/components/admin/AdminActionForm';
import { createServerSupabase } from '@/lib/supabase/server';
import { upsertCategory, deleteCategory } from '@/lib/actions';

export default async function ProductosYCategoriasPage({
  searchParams,
}: {
  searchParams: { tab?: string; edit?: string; new?: string; q?: string };
}) {
  const tab = searchParams.tab === 'categorias' ? 'categorias' : 'productos';

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-steel-950">Productos y categorías</h1>
      </div>

      <div className="flex gap-2 mb-6 border-b border-plate-200">
        {[
          { value: 'productos', label: 'Productos' },
          { value: 'categorias', label: 'Categorías' },
        ].map(({ value, label }) => (
          <a
            key={value}
            href={`?tab=${value}`}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === value
                ? 'border-steel-950 text-steel-950'
                : 'border-transparent text-steel-500 hover:text-steel-700'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {tab === 'categorias' ? <CategoriasTab searchParams={searchParams} /> : <ProductosTab searchParams={searchParams} />}
    </AdminShell>
  );
}

async function ProductosTab({
  searchParams,
}: {
  searchParams: { edit?: string; new?: string; q?: string };
}) {
  const supabase = createServerSupabase();
  const q = searchParams.q?.trim() || '';

  let productsQuery = supabase
    .from('products')
    .select('*, category:categories(name), brand:brands(name)')
    .order('name')
    .range(0, 4999);

  if (q) {
    const safeQ = q.replace(/[,()%]/g, ' ').trim();

    const { data: matchingBrands } = await supabase
      .from('brands')
      .select('id')
      .ilike('name', `%${safeQ}%`);
    const brandIds = (matchingBrands || []).map((b) => b.id);

    const filters = [
      `name.ilike.%${safeQ}%`,
      `sku.ilike.%${safeQ}%`,
      `specs_text.ilike.%${safeQ}%`,
    ];
    if (brandIds.length) filters.push(`brand_id.in.(${brandIds.join(',')})`);

    productsQuery = productsQuery.or(filters.join(','));
  }

  const [{ data: products }, { data: categories }, { data: brands }, { data: editing }] = await Promise.all([
    productsQuery,
    supabase.from('categories').select('id,name').order('name'),
    supabase.from('brands').select('id,name').order('name'),
    searchParams.edit
      ? supabase.from('products').select('*, category:categories(name), brand:brands(name)').eq('id', searchParams.edit).maybeSingle()
      : Promise.resolve({ data: undefined }),
  ]);
  const showForm = searchParams.new === '1' || !!editing;

  // Orden por marca y, dentro de cada marca, por nombre -- los sin marca
  // quedan al final en vez de mezclados alfabeticamente antes que "A...".
  const sortedProducts = (products || []).slice().sort((a, b) => {
    const brandA = (Array.isArray(a.brand) ? a.brand[0]?.name : a.brand?.name) || '';
    const brandB = (Array.isArray(b.brand) ? b.brand[0]?.name : b.brand?.name) || '';
    if (!brandA && brandB) return 1;
    if (brandA && !brandB) return -1;
    if (brandA !== brandB) return brandA.localeCompare(brandB, 'es');
    return (a.name || '').localeCompare(b.name || '', 'es');
  });

  return (
    <>
      {!showForm && (
        <div className="flex items-center justify-end gap-3 mb-4">
          <ExportButton
            endpoint="/api/admin/export-products"
            filenamePrefix="behmont-productos"
            label="Descargar Excel"
          />
          <ExportButton
            endpoint="/api/admin/export-products-pdf"
            filenamePrefix="behmont-productos"
            extension="pdf"
            label="Descargar PDF"
          />
          <a
            href="?new=1"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
          >
            + Nuevo producto
          </a>
        </div>
      )}

      {showForm ? (
        <ProductForm
          product={editing}
          categories={categories || []}
          brands={brands || []}
        />
      ) : (
        <>
          <form action="" className="mb-4">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Buscar por nombre o código (SKU)..."
              className="w-full max-w-md rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </form>
          {q && (
            <p className="text-sm text-steel-500 mb-3">
              {(products || []).length} resultado{(products || []).length === 1 ? '' : 's'} para
              &quot;{q}&quot; — <a href="?" className="text-amber-600 hover:underline">limpiar búsqueda</a>
            </p>
          )}
          <PriceListImport />
          <ProductsTable key={q || 'all'} products={sortedProducts} />
        </>
      )}
    </>
  );
}

async function CategoriasTab({ searchParams }: { searchParams: { edit?: string } }) {
  const supabase = createServerSupabase();
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order');

  const editing = searchParams.edit
    ? categories?.find((c) => c.id === searchParams.edit)
    : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-plate-200 text-left text-steel-500">
              <th className="p-3 font-medium">Nombre</th>
              <th className="p-3 font-medium">Slug</th>
              <th className="p-3 font-medium">Orden</th>
              <th className="p-3 font-medium">Desc. efectivo</th>
              <th className="p-3 font-medium">Estado</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {(categories || []).map((c) => (
              <tr key={c.id} className={`border-b border-plate-100 last:border-0 ${editing?.id === c.id ? 'bg-amber-50' : ''}`}>
                <td className="p-3 font-medium text-steel-900">{c.name}</td>
                <td className="p-3 font-mono text-xs text-steel-500">/{c.slug}</td>
                <td className="p-3 text-steel-600">{c.sort_order}</td>
                <td className="p-3 text-steel-600">
                  {c.cash_discount_pct != null ? `${c.cash_discount_pct}%` : '—'}
                </td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-plate-100 text-steel-500'}`}>
                    {c.active ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td className="p-3 text-right space-x-3 whitespace-nowrap">
                  <a href={`?tab=categorias&edit=${c.id}`} className="text-steel-600 hover:text-amber-600 text-xs font-semibold">
                    Editar
                  </a>
                  <DeleteButton id={c.id} action={deleteCategory} label="categoría" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminActionForm
        key={editing?.id || 'new'}
        action={upsertCategory}
        redirectTo={editing ? '/admin/productos?tab=categorias' : undefined}
        className="h-fit rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-steel-900">
            {editing ? 'Editar categoría' : 'Nueva categoría'}
          </h2>
          {editing && (
            <a href="/admin/productos?tab=categorias" className="text-xs font-semibold text-steel-500 hover:text-steel-800">
              Cancelar
            </a>
          )}
        </div>
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <input name="name" required placeholder="Nombre (ej: Panadería)" defaultValue={editing?.name} className="input" />
        <input name="icon_url" placeholder="URL del ícono (opcional)" defaultValue={editing?.icon_url || ''} className="input" />
        <input type="number" name="sort_order" placeholder="Orden" defaultValue={editing?.sort_order ?? 0} className="input" />
        <div>
          <input
            type="number"
            name="cash_discount_pct"
            placeholder="Descuento efectivo % (ej: 15)"
            defaultValue={editing?.cash_discount_pct ?? ''}
            min={0}
            max={100}
            className="input"
          />
          <p className="text-xs text-steel-400 -mt-1 mb-2">
            % que se descuenta pagando en efectivo al retirar en el local. Dejalo vacío para no mostrar descuento en esta categoría.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-steel-700">
          <input type="checkbox" name="active" defaultChecked={editing ? editing.active : true} /> Activa
        </label>
        <button type="submit" className="w-full rounded-lg bg-steel-900 py-2.5 text-sm font-semibold text-white hover:bg-steel-800">
          {editing ? 'Guardar cambios' : 'Guardar'}
        </button>
      </AdminActionForm>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none;margin-bottom:0.25rem}`}</style>
    </div>
  );
}
