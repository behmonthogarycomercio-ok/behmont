import { redirect } from 'next/navigation';

// Pedidos se unificó con Envíos (/admin/envios) -- este redirect queda
// para que links/accesos directos viejos a /admin/pedidos no rompan.
export default function PedidosRedirectPage() {
  redirect('/admin/envios?tab=pedidos');
}
