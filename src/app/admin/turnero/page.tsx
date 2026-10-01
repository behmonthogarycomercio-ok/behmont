import AdminShell from '@/components/admin/AdminShell';
import TurneroDateFilter from '@/components/admin/TurneroDateFilter';
import { createServerSupabase } from '@/lib/supabase/server';
import { STAFF, STAFF_LABELS, RELATION_LABELS, type Relation } from '@/lib/turnero';
import type { StaffName } from '@/lib/push';
import { Users, UserPlus, UserCheck, Share2, Clock } from 'lucide-react';

// Argentina no tiene horario de verano desde 2009 -- UTC-3 fijo todo el año.
const AR_OFFSET = '-03:00';

function todayAR(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
}

type Visit = { id: string; attended_by: StaffName; relation: Relation; created_at: string };

export default async function TurneroPage({ searchParams }: { searchParams: { date?: string } }) {
  const date = searchParams.date || todayAR();
  const start = new Date(`${date}T00:00:00${AR_OFFSET}`);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('turnero_visits')
    .select('id, attended_by, relation, created_at')
    .gte('created_at', start.toISOString())
    .lt('created_at', end.toISOString())
    .order('created_at', { ascending: false });

  const visits = (data || []) as Visit[];
  const total = visits.length;
  const nuevos = visits.filter((v) => v.relation === 'new').length;
  const fidelizados = visits.filter((v) => v.relation === 'same' || v.relation === 'other').length;
  const porRedes = visits.filter((v) => v.relation === 'social').length;

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-steel-950">Turnero del salón</h1>
          <p className="text-sm text-steel-500">Registro de la tablet — quién atendió a quién y cuándo</p>
        </div>
        <TurneroDateFilter date={date} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={Users} label="Personas hoy" value={String(total)} />
        <StatCard icon={UserCheck} label="Ya eran clientes" value={String(fidelizados)} />
        <StatCard icon={Share2} label="Consultaron por redes" value={String(porRedes)} />
        <StatCard icon={UserPlus} label="Primera vez" value={String(nuevos)} />
        {STAFF.map((staff) => (
          <StatCard
            key={staff}
            icon={Clock}
            label={`Atendió ${STAFF_LABELS[staff]}`}
            value={String(visits.filter((v) => v.attended_by === staff).length)}
          />
        ))}
      </div>

      <div className="rounded-xl2 border border-plate-200 bg-white shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-plate-50 text-left text-steel-500">
            <tr>
              <th className="px-4 py-3 font-medium">Hora</th>
              <th className="px-4 py-3 font-medium">Atendido por</th>
              <th className="px-4 py-3 font-medium">Relación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-plate-100">
            {visits.map((v) => (
              <tr key={v.id}>
                <td className="px-4 py-3 text-steel-950">
                  {new Date(v.created_at).toLocaleTimeString('es-AR', {
                    timeZone: 'America/Argentina/Buenos_Aires',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-4 py-3 text-steel-950">{STAFF_LABELS[v.attended_by]}</td>
                <td className="px-4 py-3 text-steel-500">{RELATION_LABELS[v.relation]}</td>
              </tr>
            ))}
            {visits.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-steel-400">
                  Sin turnos registrados este día.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
      <Icon className="h-5 w-5 text-amber-500 mb-2" />
      <p className="text-2xl font-display font-bold text-steel-950">{value}</p>
      <p className="text-sm text-steel-500">{label}</p>
    </div>
  );
}
