'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { upsertContentPiece } from '@/lib/actions';

type Source = { id: string; title: string };
type Piece = {
  id: string;
  title: string;
  format: string;
  stage: string;
  objective: string | null;
  hook: string | null;
  diagnostico: string | null;
  reframe: string | null;
  cta: string | null;
  script: string | null;
  source_id: string | null;
  owner: string | null;
  scheduled_at: string | null;
  notes: string | null;
};

function toDatetimeLocal(value: string | null): string {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 16);
}

export default function ContentPieceForm({ piece, sources }: { piece?: Piece; sources: Source[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);
    const result = await upsertContentPiece(formData);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
      return;
    }
    router.push('/admin/contenido?view=pipeline');
  }

  return (
    <form action={handleSubmit} className="max-w-2xl rounded-xl2 border border-plate-200 bg-white p-6 shadow-card space-y-4">
      {piece?.id && <input type="hidden" name="id" value={piece.id} />}

      <Field label="Título interno">
        <input name="title" required defaultValue={piece?.title} className="input" />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Formato">
          <select name="format" defaultValue={piece?.format || 'reel'} className="input">
            <option value="reel">Reel</option>
            <option value="carousel">Carrusel</option>
            <option value="story">Story</option>
            <option value="ad">Ad</option>
          </select>
        </Field>
        <Field label="Etapa">
          <select name="stage" defaultValue={piece?.stage || 'idea'} className="input">
            <option value="idea">Idea</option>
            <option value="guion">Guion</option>
            <option value="grabado">Grabado</option>
            <option value="editado">Editado</option>
            <option value="aprobado">Aprobado</option>
            <option value="programado">Programado</option>
          </select>
        </Field>
        <Field label="Objetivo">
          <input name="objective" defaultValue={piece?.objective || ''} placeholder="DM, agenda, venta..." className="input" />
        </Field>
      </div>

      <Field label="Hook">
        <textarea name="hook" rows={2} defaultValue={piece?.hook || ''} className="input" />
      </Field>
      <Field label="Diagnóstico">
        <textarea name="diagnostico" rows={2} defaultValue={piece?.diagnostico || ''} className="input" />
      </Field>
      <Field label="Reframe">
        <textarea name="reframe" rows={2} defaultValue={piece?.reframe || ''} className="input" />
      </Field>
      <Field label="CTA">
        <input name="cta" defaultValue={piece?.cta || ''} className="input" />
      </Field>
      <Field label="Guion completo (opcional)">
        <textarea name="script" rows={4} defaultValue={piece?.script || ''} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Responsable">
          <input name="owner" defaultValue={piece?.owner || ''} className="input" />
        </Field>
        <Field label="Fecha programada">
          <input
            type="datetime-local"
            name="scheduled_at"
            defaultValue={toDatetimeLocal(piece?.scheduled_at ?? null)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Fuente">
        <select name="source_id" defaultValue={piece?.source_id || ''} className="input">
          <option value="">Sin fuente</option>
          {sources.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </Field>

      <Field label="Notas">
        <textarea name="notes" rows={2} defaultValue={piece?.notes || ''} className="input" />
      </Field>

      {error && <p role="alert" className="text-xs font-medium text-danger-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar pieza'}
        </button>
        <a href="/admin/contenido?view=pipeline" className="rounded-lg border border-plate-300 px-4 py-2.5 text-sm font-semibold text-steel-700 hover:bg-plate-50">
          Cancelar
        </a>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none}`}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-steel-500">{label}</span>
      {children}
    </label>
  );
}
