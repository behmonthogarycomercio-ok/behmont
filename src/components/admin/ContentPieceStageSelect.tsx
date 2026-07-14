'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateContentPieceStage } from '@/lib/actions';

const STAGES = ['idea', 'guion', 'grabado', 'editado', 'aprobado', 'programado'];
const STAGE_LABELS: Record<string, string> = {
  idea: 'Idea',
  guion: 'Guion',
  grabado: 'Grabado',
  editado: 'Editado',
  aprobado: 'Aprobado',
  programado: 'Programado',
};

export default function ContentPieceStageSelect({ id, stage }: { id: string; stage: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleChange(next: string) {
    startTransition(async () => {
      await updateContentPieceStage(id, next);
      router.refresh();
    });
  }

  return (
    <select
      value={stage}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-plate-200 px-2 py-1 text-xs font-semibold text-steel-700 disabled:opacity-50"
    >
      {STAGES.map((s) => (
        <option key={s} value={s}>
          {STAGE_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
