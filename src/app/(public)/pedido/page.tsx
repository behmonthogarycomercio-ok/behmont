import OrderForm from '@/components/OrderForm';

export default function PedidoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-1">Tu pedido</h1>
      <p className="text-steel-500 text-sm mb-8">
        Revisá los productos, completá tus datos y lo enviamos directo a nuestro WhatsApp.
      </p>
      <OrderForm />
    </main>
  );
}
