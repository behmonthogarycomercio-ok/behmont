'use client';

import { useMemo, useState, useTransition } from 'react';
import { Plus } from 'lucide-react';
import { upsertZona, deleteZona } from '@/lib/actions';
import DeleteButton from './DeleteButton';
import type { Zona } from '@/app/admin/depositos/page';

const CHILD_TIPO: Record<Zona['tipo'], Zona['tipo'] | null> = {
  area: 'gondola',
  gondola: 'estante',
  estante: 'division',
  division: null,
};

const TIPO_LABEL: Record<Zona['tipo'], string> = {
  area: 'Área',
  gondola: 'Góndola',
  estante: 'Estante',
  division: 'División',
};

type FormState = { codigo: string; nombre: string; sort_order: string; active: boolean };
const EMPTY_FORM: FormState = { codigo: '', nombre: '', sort_order: '0', active: true };

export default function ZonasTree({ zonas }: { zonas: Zona[] }) {
  const [addingChildOf, setAddingChildOf] = useState<string | 'root' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const byParent = useMemo(() => {
    const map = new Map<string, Zona[]>();
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

  function startEdit(z: Zona) {
    setEditingId(z.id);
    setAddingChildOf(null);
    setForm({ codigo: z.codigo, nombre: z.nombre, sort_order: String(z.sort_order), active: z.active });
    setError(null);
  }

  function cancel() {
    setAddingChildOf(null);
    setEditingId(null);
    setError(null);
  }

  function submit(parentId: string | null, tipo: Zona['tipo'], id?: string) {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      if (id) fd.set('id', id);
      if (parentId) fd.set('parent_id', parentId);
      fd.set('tipo', tipo);
      fd.set('codigo', form.codigo);
      fd.set('nombre', form.nombre);
      fd.set('sort_order', form.sort_order);
      if (form.active) fd.set('active', 'on');
      const result = await upsertZona(fd);
      if (result?.error) {
        setError(result.error);
        return;
      }
      cancel();
    });
  }

  function renderForm(parentId: string | null, tipo: Zona['tipo'], id?: string) {
    return (
      <div className="mt-2 flex flex-wrap items-end gap-2 rounded-lg border border-plate-200 bg-plate-50 p-3">
        <div>
          <label className="block text-[11px] font-semibold text-steel-500">Código</label>
          <input
            value={form.codigo}
            onChange={(e) => setForm((f) => ({ ...f, codigo: e.target.value }))}
            placeholder="ej. 1, a, A1"
            className="w-28 rounded border border-plate-200 px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-steel-500">Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            placeholder={`ej. ${TIPO_LABEL[tipo]} 1`}
            className="w-48 rounded border border-plate-200 px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-steel-500">Orden</label>
          <input
            value={form.sort_order}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
            type="number"
            className="w-16 rounded border border-plate-200 px-2 py-1 text-sm"
          />
        </div>
        <label className="flex items-center gap-1.5 text-xs text-steel-600 pb-1.5">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
          />
          Activa
        </label>
        <button
          onClick={() => submit(parentId, tipo, id)}
          disabled={pending || !form.codigo.trim() || !form.nombre.trim()}
          className="rounded-lg bg-steel-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
        >
          {pending ? 'Guardando…' : 'Guardar'}
        </button>
        <button onClick={cancel} className="rounded-lg border border-plate-200 px-3 py-1.5 text-xs font-semibold text-steel-600">
          Cancelar
        </button>
        {error && <span className="w-full text-xs font-medium text-danger-600">{error}</span>}
      </div>
    );
  }

  function renderNode(z: Zona, depth: number) {
    const children = byParent.get(z.id) || [];
    const childTipo = CHILD_TIPO[z.tipo];
    return (
      <li key={z.id} className="mt-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-steel-400 w-16 shrink-0">{TIPO_LABEL[z.tipo]}</span>
          <span className={`font-medium text-steel-900 ${!z.active ? 'opacity-40 line-through' : ''}`}>{z.nombre}</span>
          <span className="text-xs text-steel-400 font-mono">({z.codigo})</span>
          <button onClick={() => startEdit(z)} className="text-xs font-semibold text-steel-500 hover:text-amber-700 underline">
            Editar
          </button>
          {childTipo && (
            <button
              onClick={() => startAdd(z.id)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:underline"
            >
              <Plus className="h-3 w-3" /> {TIPO_LABEL[childTipo]}
            </button>
          )}
          <DeleteButton id={z.id} action={deleteZona} label="zona" />
        </div>
        {editingId === z.id && renderForm(z.parent_id, z.tipo, z.id)}
        {addingChildOf === z.id && childTipo && renderForm(z.id, childTipo)}
        {children.length > 0 && (
          <ul className="ml-6 border-l border-plate-200 pl-4 mt-1">
            {children.sort((a, b) => a.sort_order - b.sort_order).map((c) => renderNode(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  }

  const areas = (byParent.get('root') || []).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="rounded-xl2 border border-plate-200 bg-white shadow-card p-5 mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg font-bold text-steel-950">Zonas</h2>
        <button
          onClick={() => startAdd('root')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:underline"
        >
          <Plus className="h-3 w-3" /> Nueva área
        </button>
      </div>
      {addingChildOf === 'root' && renderForm(null, 'area')}
      <ul>{areas.map((z) => renderNode(z, 0))}</ul>
      {areas.length === 0 && addingChildOf !== 'root' && (
        <p className="text-sm text-steel-500">Todavía no hay áreas cargadas.</p>
      )}
    </div>
  );
}
