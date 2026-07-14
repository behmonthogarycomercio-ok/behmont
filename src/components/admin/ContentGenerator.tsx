'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { buildContentScript } from '@/lib/content-template';
import { upsertContentPiece } from '@/lib/actions';

type Source = { id: string; title: string };

export default function ContentGenerator({ sources }: { sources: Source[] }) {
  const router = useRouter();
  const [format, setFormat] = useState('reel');
  const [objective, setObjective] = useState('DM');
  const [sourceId, setSourceId] = useState('');
  const [hook, setHook] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [reframe, setReframe] = useState('');
  const [cta, setCta] = useState('');
  const [saving, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const script = buildContentScript({ format, objective, hook, diagnostico, reframe, cta });

  function handleSave() {
    setSaved(false);
    const formData = new FormData();
    formData.set('title', hook || 'Pieza sin título');
    formData.set('format', format);
    formData.set('stage', 'idea');
    formData.set('objective', objective);
    formData.set('hook', hook);
    formData.set('diagnostico', diagnostico);
    formData.set('reframe', reframe);
    formData.set('cta', cta);
    formData.set('script', script);
    formData.set('source_id', sourceId);
    startTransition(async () => {
      const result = await upsertContentPiece(formData);
      if (!result?.error) {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3">
        <h2 className="font-display font-semibold text-steel-900">Datos de la pieza</h2>
        <Field label="Fuente">
          <select value={sourceId} onChange={(e) => setSourceId(e.target.value)} className="input">
            <option value="">Sin fuente</option>
            {sources.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Formato">
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="input">
              <option value="reel">Reel</option>
              <option value="carousel">Carrusel</option>
              <option value="story">Story</option>
              <option value="ad">Ad</option>
            </select>
          </Field>
          <Field label="Objetivo">
            <select value={objective} onChange={(e) => setObjective(e.target.value)} className="input">
              <option>DM</option>
              <option>Agenda</option>
              <option>Registro</option>
              <option>Venta</option>
              <option>Tráfico a perfil</option>
            </select>
          </Field>
        </div>
        <Field label="Hook">
          <textarea rows={2} value={hook} onChange={(e) => setHook(e.target.value)} className="input" />
        </Field>
        <Field label="Diagnóstico">
          <textarea rows={2} value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} className="input" />
        </Field>
        <Field label="Reframe">
          <textarea rows={2} value={reframe} onChange={(e) => setReframe(e.target.value)} className="input" />
        </Field>
        <Field label="CTA">
          <input value={cta} onChange={(e) => setCta(e.target.value)} className="input" />
        </Field>
      </div>

      <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
        <h2 className="font-display font-semibold text-steel-900 mb-3">Guion</h2>
        <pre className="whitespace-pre-wrap rounded-lg bg-plate-50 p-4 text-sm text-steel-800 min-h-[200px]">{script}</pre>
        <button
          onClick={handleSave}
          disabled={saving || !hook}
          className="mt-4 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
        >
          {saving ? 'Guardando...' : saved ? 'Guardado ✓' : 'Guardar como pieza'}
        </button>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none}`}</style>
    </div>
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
