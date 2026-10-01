'use client';

import { useRouter } from 'next/navigation';

export default function TurneroDateFilter({ date }: { date: string }) {
  const router = useRouter();
  return (
    <input
      type="date"
      defaultValue={date}
      onChange={(e) => router.push(`/admin/turnero?date=${e.target.value}`)}
      className="rounded-lg border border-plate-200 px-3 py-2 text-sm text-steel-950"
    />
  );
}
