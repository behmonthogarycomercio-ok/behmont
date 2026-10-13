import { redirect } from 'next/navigation';

// Métricas se unificó con Inicio (/admin/dashboard) -- este redirect queda
// para que links/accesos directos viejos a /admin/metricas no rompan.
export default function MetricasRedirectPage() {
  redirect('/admin/dashboard');
}
