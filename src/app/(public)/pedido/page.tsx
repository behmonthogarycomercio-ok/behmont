import type { Metadata } from 'next';
import Link from 'next/link';
import OrderForm from '@/components/OrderForm';

export const metadata: Metadata = {
  title: 'Tu pedido | BEHMONT',
  description: 'Revisá y enviá tu pedido directamente por WhatsApp. BEHMONT, Concordia.',
};

export default function PedidoPage() {
  return (
    <main>
      {/* Header */}
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <nav className="font-mono text-[11px] text-steel-400 mb-4">
            <Link href="/" className="hover:text-steel-700 transition-colors">Inicio</Link>
            <span className="mx-2 text-steel-300">/</span>
            <span className="font-semibold text-steel-700">Tu pedido</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight">
            Tu pedido
          </h1>
          <p className="mt-2 text-sm text-steel-400 leading-relaxed">
            Revisá los productos, completá tus datos y lo enviamos directo a nuestro WhatsApp.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <OrderForm />
      </div>

      {/* Trust strip */}
      <div className="border-t border-plate-200 bg-plate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-3 gap-px bg-plate-200 rounded-xl overflow-hidden text-center">
            <div className="bg-white px-4 py-4">
              <p className="font-mono text-[10px] font-semibold text-steel-700">Envíos</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">por Andreani</p>
            </div>
            <div className="bg-white px-4 py-4">
              <p className="font-mono text-[10px] font-semibold text-steel-700">Retirá</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">en local</p>
            </div>
            <div className="bg-white px-4 py-4">
              <p className="font-mono text-[10px] font-semibold text-steel-700">Factura</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">A y B</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
