'use client';

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import type { DepositoPin } from '@/lib/deposito';

type ZonaApi = { id: string; parent_id: string | null; tipo: string; codigo: string; nombre: string; active: boolean };

const CHILD_TIPO: Record<string, string | null> = { area: 'gondola', gondola: 'estante', estante: 'division', division: null };
const TIPO_LABEL: Record<string, string> = { area: 'Área', gondola: 'Góndola', estante: 'Estante', division: 'División' };

type FormState = { codigo: string; nombre: string; sort_order: string; active: boolean };
const EMPTY_FORM: FormState = { codigo: '', nombre: '', sort_order: '0', active: true };

export default function ZonasGestionClient({ pin, zonas, onChanged }: { pin: DepositoPin; zonas: ZonaApi[]; onChanged: () => void }) {
  const [addingChildOf, setAddingChildOf] = useState<string | 'root' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const byParent = useMemo(() => {
    const map = new Map<string, ZonaApi[]>();
    for (const z of zonas) {
      const key = z.parent_id ?? 'root';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(z);
    }
    return map;
  }, [zonas]);

  function startAdd(parentId: string | 'root') {
    setAddingChildOf(parentId);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
  }

  function startEdit(z: ZonaApi) {
    setEditingId(z.id);
    setAddingChildOf(null);
    setForm({ codigo: z.codigo, nombre: z.nombre, sort_order: '0', active: z.active });
    setError(null);
  }

  function cancel() {
    setAddingChildOf(null);
    setEditingId(null);
    setError(null);
  }

  async function submit(parentId: string | null, tipo: string, id?: string) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch('/api/deposito/zonas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          id,
          parentId,
          tipo,
          codigo: form.codigo,
          nombre: form.nombre,
          sortOrder: Number(form.sort_order || 0),
          active: form.active,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo guardar');
        return;
      }
      cancel();
      onChanged();
    } catch {
      setError('No se pudo guardar. Probá de nuevo.');
    } finally {
      setPending(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar esta zona? Esta acción no se puede deshacer.')) return;
    setError(null);
    const res = await fetch('/api/deposito/zonas/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin, id }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'No se pudo eliminar');
      return;
    }
    onChanged();
  }

  function renderForm(parentId: string | null, tipo: string, id?: string) {
    return (
      <div className="mt-2 flex flex-wrap items-end gap-2 rounded-lg bg-steel-800 p-3">
        <div>
          <label className="block text-[11px] font-semibold text-white/50">Código</label>
          <input
            value={form.codigo}
            onChange={(e) => setForm((f) => ({ ...f, codigo: e.target.value }))}
            placeholder="ej. 1, a, A1"
            className="w-24 rounded px-2 py-1 text-sm text-steel-900"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-white/50">Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            placeholder={`ej. ${TIPO_LABEL[tipo]} 1`}
            className="w-44 rounded px-2 py-1 text-sm text-steel-900"
          />
        </div>
        <button
          onClick={() => submit(parentId, tipo, id)}
          disabled={pending || !form.codigo.trim() || !form.nombre.trim()}
          className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold text-white"
        >
          {pending ? 'Guardando…' : 'Guardar'}
        </button>
        <button onClick={cancel} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/70">
          Cancelar
        </button>
        {error && <span className="w-full text-xs font-medium text-red-400">{error}</span>}
      </div>
    );
  }

  function renderNode(z: ZonaApi) {
    const children = byParent.get(z.id) || [];
    const childTipo = CHILD_TIPO[z.tipo];
    return (
      <li key={z.id} className="mt-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/40 w-16 shrink-0">{TIPO_LABEL[z.tipo]}</span>
          <span className={`font-medium ${!z.active ? 'opacity-40 line-through' : ''}`}>{z.nombre}</span>
          <span className="text-xs text-white/40 font-mono">({z.codigo})</span>
          <button onClick={() => startEdit(z)} className="text-xs font-semibold text-amber-400 underline">
            Editar
          </button>
          {childTipo && (
            <button onClick={() => startAdd(z.id)} className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline">
              <Plus className="h-3 w-3" /> {TIPO_LABEL[childTipo]}
            </button>
          )}
          <button onClick={() => remove(z.id)} className="text-xs font-semibold text-white/40 hover:text-red-400">
            Eliminar
          </button>
        </div>
        {editingId === z.id && renderForm(z.parent_id, z.tipo, z.id)}
        {addingChildOf === z.id && childTipo && renderForm(z.id, childTipo)}
        {children.length > 0 && (
          <ul className="ml-6 border-l border-white/10 pl-4 mt-1">{children.map((c) => renderNode(c))}</ul>
        )}
      </li>
    );
  }

  const areas = byParent.get('root') || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-white/40">Zonas</p>
        <button onClick={() => startAdd('root')} className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline">
          <Plus className="h-3 w-3" /> Nueva área
        </button>
      </div>
      {addingChildOf === 'root' && renderForm(null, 'area')}
      <ul>{areas.map((z) => renderNode(z))}</ul>
      {areas.length === 0 && addingChildOf !== 'root' && <p className="text-sm text-white/40">Todavía no hay áreas cargadas.</p>}
    </div>
  );
}
