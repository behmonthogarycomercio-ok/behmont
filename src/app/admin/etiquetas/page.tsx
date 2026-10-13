import { redirect } from 'next/navigation';

// Etiquetas se unificó con Productos (/admin/productos) -- este redirect
// queda para que links/accesos directos viejos a /admin/etiquetas no rompan.
export default function EtiquetasRedirectPage() {
  redirect('/admin/productos?tab=etiquetas');
}
