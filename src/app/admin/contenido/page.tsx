import { redirect } from 'next/navigation';

// Contenido se unificó con Marcas (/admin/marcas) -- este redirect queda
// para que links/accesos directos viejos a /admin/contenido no rompan.
export default function ContenidoRedirectPage() {
  redirect('/admin/marcas?tab=contenido');
}
