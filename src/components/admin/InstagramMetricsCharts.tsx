'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const LINE_COLOR = '#111C38';

export function FollowersTrendChart({ data }: { data: { date: string; followers_count: number | null }[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-steel-500">Todavía no hay historial sincronizado.</p>;
  }
  const chartData = data.map((d) => ({
    ...d,
    label: new Date(`${d.date}T00:00:00`).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }),
  }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={chartData} margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F2" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={48} allowDecimals={false} />
        <Tooltip formatter={(value: number) => [value, 'Seguidores']} />
        <Line type="monotone" dataKey="followers_count" stroke={LINE_COLOR} strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ReachTrendChart({ data }: { data: { date: string; reach: number | null }[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-steel-500">Todavía no hay historial sincronizado.</p>;
  }
  const chartData = data.map((d) => ({
    ...d,
    label: new Date(`${d.date}T00:00:00`).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }),
  }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={chartData} margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F2" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={48} allowDecimals={false} />
        <Tooltip formatter={(value: number) => [value, 'Alcance']} />
        <Line type="monotone" dataKey="reach" stroke="#ED3237" strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
