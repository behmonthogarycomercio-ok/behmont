import { notFound } from 'next/navigation';
import Image from 'next/image';
import ActivarAvisosStaff from '@/components/turnero/ActivarAvisosStaff';
import { STAFF, STAFF_LABELS } from '@/lib/turnero';
import type { StaffName } from '@/lib/push';

export default function ActivarTurneroPage({ params }: { params: { staff: string } }) {
  const staff = params.staff as StaffName;
  if (!STAFF.includes(staff)) notFound();

  const label = STAFF_LABELS[staff];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-steel-950 px-6 py-12 text-center">
      <div className="relative h-20 w-48 mb-10">
        <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
        Avisos del turnero — {label}
      </h1>
      <p className="text-white/70 max-w-md mb-8">
        Activá esto una sola vez en tu celular. A partir de ahora, cuando un cliente te elija en
        la tablet del salón, te va a llegar una notificación acá.
      </p>
      <ActivarAvisosStaff staff={staff} label={label} />
    </main>
  );
}
