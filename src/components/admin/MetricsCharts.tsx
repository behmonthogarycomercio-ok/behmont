'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const BAR_COLOR = '#ED3237';
const LINE_COLOR = '#111C38';

export function TopProductsChart({ data }: { data: { name: string; qty: number }[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-steel-500">Todavía no hay ventas este mes.</p>;
  }
  const chartData = data.map((d) => ({
    ...d,
    shortName: d.name.length > 22 ? d.name.slice(0, 22) + '…' : d.name,
  }));
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EEF0F2" />
        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="shortName" width={160} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [`${value} unidades`, 'Vendidas']}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.name || ''}
        />
        <Bar dataKey="qty" radius={[0, 4, 4, 0]}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={BAR_COLOR} fillOpacity={1 - i * 0.06} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SalesTrendChart({ data }: { data: { month: string; total: number }[] }) {
  const chartData = data.map((d) => ({
    ...d,
    label: new Date(`${d.month}-01T00:00:00`).toLocaleDateString('es-AR', {
      month: 'short',
      year: '2-digit',
    }),
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F2" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={56}
        />
        <Tooltip formatter={(value: number) => [`$${value.toLocaleString('es-AR')}`, 'Ventas']} />
        <Line type="monotone" dataKey="total" stroke={LINE_COLOR} strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DailySalesChart({ data }: { data: { date: string; total: number }[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-steel-500">Todavía no hay ventas este mes.</p>;
  }
  const chartData = data.map((d) => ({
    ...d,
    day: new Date(`${d.date}T00:00:00`).getDate(),
  }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F2" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={56} />
        <Tooltip formatter={(value: number) => [`$${value.toLocaleString('es-AR')}`, 'Ventas']} />
        <Bar dataKey="total" fill={LINE_COLOR} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
