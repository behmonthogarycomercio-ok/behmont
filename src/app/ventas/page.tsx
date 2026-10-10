import Image from 'next/image';
import Link from 'next/link';
import { DEPOSITO_STAFF, canVenderPreventa, type DepositoPin } from '@/lib/deposito';

export default function VentasLandingPage() {
  const vendedores = DEPOSITO_STAFF.filter((s) => canVenderPreventa(s.pin as DepositoPin));

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Ventas</h1>
        </div>
        <p className="text-sm text-white/60 mb-4">¿Quién sos?</p>
        <div className="grid grid-cols-2 gap-3">
          {vendedores.map((v) => (
            <Link
              key={v.pin}
              href={`/ventas/${v.name.toLowerCase()}`}
              className="rounded-xl2 bg-steel-900 border border-steel-800 py-6 text-center text-lg font-bold hover:border-amber-500 hover:text-amber-400"
            >
              {v.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
