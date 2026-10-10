import Image from 'next/image';
import Link from 'next/link';
import { COBRADORES } from '@/lib/preventas';

export default function CobradorLandingPage() {
  const porCiudad = new Map<string, typeof COBRADORES[number][]>();
  for (const c of COBRADORES) {
    const list = porCiudad.get(c.ciudad) || [];
    list.push(c);
    porCiudad.set(c.ciudad, list);
  }

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Cobradores</h1>
        </div>
        <p className="text-sm text-white/60 mb-4">¿Quién sos?</p>
        <div className="flex flex-col gap-4">
          {Array.from(porCiudad.entries()).map(([ciudad, personas]) => (
            <div key={ciudad}>
              <p className="text-xs text-white/50 mb-2">{ciudad}</p>
              <div className="grid grid-cols-2 gap-3">
                {personas.map((c) => (
                  <Link
                    key={c.pin}
                    href={`/ventas/cobrador/${c.name.toLowerCase()}`}
                    className="rounded-xl2 bg-steel-900 border border-steel-800 py-5 text-center text-base font-bold hover:border-amber-500 hover:text-amber-400"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
