import { redirect } from 'next/navigation';

// Cupones se unificó con Promociones (/admin/promociones) -- este redirect
// queda para que links/accesos directos viejos a /admin/cupones no rompan.
export default function CuponesRedirectPage() {
  redirect('/admin/promociones?tab=cupones');
}
