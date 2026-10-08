import AdminShell from '@/components/admin/AdminShell';
import ProductForm from '@/components/admin/ProductForm';
import ProductsTable from '@/components/admin/ProductsTable';
import PriceListImport from '@/components/admin/PriceListImport';
import { createServerSupabase } from '@/lib/supabase/server';

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { edit?: string; new?: string; q?: string };
}) {
  const supabase = createServerSupabase();
  const q = searchParams.q?.trim() || '';

  let productsQuery = supabase
    .from('products')
    .select('*, category:categories(name), brand:brands(name)')
    .order('created_at', { ascending: false })
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

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-steel-950">Productos</h1>
        {!showForm && (
          <a
            href="?new=1"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
          >
            + Nuevo producto
          </a>
        )}
      </div>

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
          <ProductsTable key={q || 'all'} products={products || []} />
        </>
      )}
    </AdminShell>
  );
}
