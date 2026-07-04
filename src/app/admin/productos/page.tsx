import AdminShell from '@/components/admin/AdminShell';
import ProductForm from '@/components/admin/ProductForm';
import DeleteButton from '@/components/admin/DeleteButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { deleteProduct } from '@/lib/actions';
import Image from 'next/image';

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
    .order('created_at', { ascending: false });

  if (q) {
    productsQuery = productsQuery.or(`name.ilike.%${q}%,sku.ilike.%${q}%`);
  }

  const [{ data: products }, { data: categories }, { data: brands }] = await Promise.all([
    productsQuery,
    supabase.from('categories').select('id,name').order('name'),
    supabase.from('brands').select('id,name').order('name'),
  ]);

  const editing = searchParams.edit
    ? products?.find((p) => p.id === searchParams.edit)
    : undefined;
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
          <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-plate-200 text-left text-steel-500">
                <th className="p-3 font-medium">Producto</th>
                <th className="p-3 font-medium">Código</th>
                <th className="p-3 font-medium">Categoría</th>
                <th className="p-3 font-medium">Precio</th>
                <th className="p-3 font-medium">Stock</th>
                <th className="p-3 font-medium">Estado</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {(products || []).map((p) => (
                <tr key={p.id} className="border-b border-plate-100 last:border-0">
                  <td className="p-3 flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-md bg-plate-50 overflow-hidden shrink-0">
                      {p.images?.[0] && (
                        <Image src={p.images[0]} alt={p.name} fill className="object-contain" />
                      )}
                    </div>
                    <span className="font-medium text-steel-900 line-clamp-1">{p.name}</span>
                  </td>
                  <td className="p-3 font-mono text-xs text-steel-500">{p.sku}</td>
                  <td className="p-3 text-steel-600">{p.category?.name || '—'}</td>
                  <td className="p-3 font-semibold text-steel-900">
                    ${Number(p.price).toLocaleString('es-AR')}
                  </td>
                  <td className={`p-3 font-medium ${p.stock <= 3 ? 'text-red-600' : 'text-steel-700'}`}>
                    {p.stock}
                  </td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.active ? 'bg-emerald-100 text-emerald-700' : 'bg-plate-100 text-steel-500'
                      }`}
                    >
                      {p.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3 whitespace-nowrap">
                    <a href={`?edit=${p.id}`} className="text-steel-600 hover:text-amber-600 text-xs font-semibold">
                      Editar
                    </a>
                    <DeleteButton id={p.id} action={deleteProduct} label="producto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}
    </AdminShell>
  );
}
