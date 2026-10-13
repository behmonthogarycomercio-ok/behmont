import { redirect } from 'next/navigation';

// Categorías se unificó con Productos (/admin/productos) -- este redirect
// queda para que links/accesos directos viejos a /admin/categorias no rompan.
export default function CategoriasRedirectPage() {
  redirect('/admin/productos?tab=categorias');
}
