'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function PreventaVendedorFilter({ vendedores }: { vendedores: { pin: number; name: string }[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('vendedor', value);
    router.push(`?${params.toString()}`);
  }

  return (
    <select
      defaultValue={searchParams.get('vendedor') || 'todos'}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-plate-200 px-3 py-1.5 text-sm"
    >
      <option value="todos">Vendedor: Todos</option>
      {vendedores.map((v) => (
        <option key={v.pin} value={v.name.toLowerCase()}>
          Vendedor: {v.name}
        </option>
      ))}
    </select>
  );
}
