'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { DEPOSITO_STAFF, canVenderPreventa, type DepositoPin } from '@/lib/deposito';
import { COBRADORES } from '@/lib/preventas';
import { formatPrice } from '@/lib/price';

type ProductoApi = { id: string; sku: string; name: string; stock: number };
type CartItem = { sku: string; name: string; quantity: string; precioLista: string; precioOfrecido: string };
type ClienteEstado = 'activo' | 'nuevo' | 'pasivo';
type CuotasTipo = 'diaria' | 'semanal' | 'mensual' | 'tarjeta';

type Preventa = {
  id: string;
  cliente_nombre: string;
  cliente_ciudad: string;
  cobrador_nombre: string;
  status: string;
  items: { sku: string; name: string; quantity: number; precioLista: number; precioOfrecido: number }[];
  cuotas_cantidad: number;
  cuotas_tipo: string;
  cuota_precio: number;
  gabriel_motivo_rechazo: string | null;
  cobrador_motivo_rechazo: string | null;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  pendiente_documentacion: 'Esperando documentación',
  rechazada_gabriel: 'Rechazada (documentación)',
  pendiente_cobrador: 'Esperando al cobrador',
  aprobada: 'Aprobada',
  rechazada_cobrador: 'Rechazada (cobrador)',
};

const STATUS_COLORS: Record<string, string> = {
  pendiente_documentacion: 'bg-amber-500',
  rechazada_gabriel: 'bg-red-600',
  pendiente_cobrador: 'bg-amber-500',
  aprobada: 'bg-emerald-600',
  rechazada_cobrador: 'bg-red-600',
};

export default function VentasVendedorPage() {
  const params = useParams();
  const slug = String(params.vendedor || '').toLowerCase();
  const vendedor = DEPOSITO_STAFF.find(
    (s) => s.name.toLowerCase() === slug && canVenderPreventa(s.pin as DepositoPin)
  );

  const [codeInput, setCodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authing, setAuthing] = useState(false);
  const [code, setCode] = useState('');
  const [authed, setAuthed] = useState(false);

  const [products, setProducts] = useState<ProductoApi[] | null>(null);
  const [q, setQ] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteDireccion, setClienteDireccion] = useState('');
  const [clienteContacto, setClienteContacto] = useState('');
  const [clienteDniCuit, setClienteDniCuit] = useState('');
  const [clienteCiudad, setClienteCiudad] = useState('');
  const [clienteCodigoPostal, setClienteCodigoPostal] = useState('');
  const [clienteRubro, setClienteRubro] = useState('');
  const [clienteEstado, setClienteEstado] = useState<ClienteEstado>('nuevo');

  const [cuotasCantidad, setCuotasCantidad] = useState('1');
  const [cuotasTipo, setCuotasTipo] = useState<CuotasTipo>('mensual');
  const [cuotaPrecio, setCuotaPrecio] = useState('');
  const [interesPorcentaje, setInteresPorcentaje] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [cobradorPin, setCobradorPin] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const [misVentas, setMisVentas] = useState<Preventa[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function loadProducts() {
    try {
      const res = await fetch('/api/deposito/productos');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data.products);
    } catch {
      setProducts([]);
    }
  }

  async function loadMine(pin: number, c: string) {
    try {
      const res = await fetch('/api/ventas/mine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendedorPin: pin, vendedorCode: c }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMisVentas(data.preventas);
    } catch {
      setMisVentas([]);
    }
  }

  useEffect(() => {
    if (authed && vendedor) {
      loadProducts();
      loadMine(vendedor.pin, code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function confirmCode() {
    if (!vendedor || codeInput.trim().length < 4) return;
    setAuthing(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/deposito/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: vendedor.pin, code: codeInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Código incorrecto.');
        return;
      }
      setCode(codeInput.trim());
      setAuthed(true);
    } catch {
      setAuthError('No se pudo validar. Probá de nuevo.');
    } finally {
      setAuthing(false);
    }
  }

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter((p) => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)).slice(0, 10);
  }, [q, products]);

  function addToCart(p: ProductoApi) {
    if (cart.some((i) => i.sku === p.sku)) return;
    setCart((prev) => [...prev, { sku: p.sku, name: p.name, quantity: '1', precioLista: '', precioOfrecido: '' }]);
    setQ('');
  }

  function updateCartItem(sku: string, field: keyof CartItem, value: string) {
    setCart((prev) => prev.map((i) => (i.sku === sku ? { ...i, [field]: value } : i)));
  }

  function removeFromCart(sku: string) {
    setCart((prev) => prev.filter((i) => i.sku !== sku));
  }

  const cobradoresPorCiudad = useMemo(() => {
    const map = new Map<string, typeof COBRADORES[number][]>();
    for (const c of COBRADORES) {
      const list = map.get(c.ciudad) || [];
      list.push(c);
      map.set(c.ciudad, list);
    }
    return map;
  }, []);

  async function submit() {
    if (!vendedor) return;
    setFormError(null);
    if (cart.length === 0) return setFormError('Agregá al menos un producto.');
    if (!clienteNombre.trim() || !clienteDireccion.trim() || !clienteDniCuit.trim() || !clienteCiudad.trim()) {
      return setFormError('Completá los datos del cliente.');
    }
    if (!cobradorPin) return setFormError('Elegí un cobrador.');
    if (!cuotaPrecio) return setFormError('Completá el precio de la cuota.');

    setSubmitting(true);
    try {
      const res = await fetch('/api/ventas/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendedorPin: vendedor.pin,
          vendedorCode: code,
          clienteNombre,
          clienteDireccion,
          clienteContacto: clienteContacto || undefined,
          clienteDniCuit,
          clienteCiudad,
          clienteCodigoPostal: clienteCodigoPostal || undefined,
          clienteRubro: clienteRubro || undefined,
          clienteEstado,
          items: cart.map((i) => ({
            sku: i.sku,
            name: i.name,
            quantity: Number(i.quantity) || 1,
            precioLista: Number(i.precioLista) || 0,
            precioOfrecido: Number(i.precioOfrecido) || 0,
          })),
          cuotasCantidad: Number(cuotasCantidad) || 1,
          cuotasTipo,
          cuotaPrecio: Number(cuotaPrecio) || 0,
          interesPorcentaje: interesPorcentaje ? Number(interesPorcentaje) : undefined,
          observaciones: observaciones || undefined,
          cobradorPin: Number(cobradorPin),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'No se pudo cargar la preventa.');
        return;
      }
      setSuccessId(data.id);
      setCart([]);
      setClienteNombre('');
      setClienteDireccion('');
      setClienteContacto('');
      setClienteDniCuit('');
      setClienteCiudad('');
      setClienteCodigoPostal('');
      setClienteRubro('');
      setClienteEstado('nuevo');
      setCuotasCantidad('1');
      setCuotaPrecio('');
      setInteresPorcentaje('');
      setObservaciones('');
      setCobradorPin('');
      await loadMine(vendedor.pin, code);
      setTimeout(() => setSuccessId(null), 4000);
    } catch {
      setFormError('No se pudo cargar. Probá de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!vendedor) {
    return (
      <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
        <p className="text-white/60">Página no encontrada.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Ventas</h1>
        </div>

        {!authed ? (
          <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-6">
            <p className="text-sm text-white/60 mb-1">
              Hola <span className="font-semibold text-white">{vendedor.name}</span>, ingresá tu código secreto
            </p>
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmCode()}
              placeholder="Código"
              className="w-full rounded-lg px-3 py-3 text-steel-900 mb-3 mt-3"
              autoFocus
            />
            {authError && <p className="text-sm text-red-400 mb-3">{authError}</p>}
            <button
              onClick={confirmCode}
              disabled={authing || codeInput.trim().length < 4}
              className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white"
            >
              {authing ? 'Verificando…' : 'Entrar'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-4">
              <h2 className="font-display text-lg font-bold mb-3">Nueva preventa</h2>

              <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Productos</p>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar producto por código o nombre..."
                className="w-full rounded-lg px-3 py-2 text-sm text-steel-900 mb-2"
              />
              {filteredProducts.length > 0 && (
                <ul className="flex flex-col gap-1 mb-3">
                  {filteredProducts.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => addToCart(p)}
                        className="text-left text-sm text-white/80 hover:text-amber-400"
                      >
                        + {p.name} <span className="text-white/40 font-mono text-xs">({p.sku})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {cart.length > 0 && (
                <div className="flex flex-col gap-2 mb-4">
                  {cart.map((item) => (
                    <div key={item.sku} className="rounded-lg bg-steel-800 p-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-sm font-semibold">{item.name}</span>
                        <button onClick={() => removeFromCart(item.sku)} className="text-xs text-red-400 underline shrink-0">
                          Quitar
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] text-white/50">Cantidad</label>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateCartItem(item.sku, 'quantity', e.target.value)}
                            className="w-full rounded px-2 py-1 text-steel-900 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/50">Precio lista</label>
                          <input
                            type="number"
                            min={0}
                            value={item.precioLista}
                            onChange={(e) => updateCartItem(item.sku, 'precioLista', e.target.value)}
                            className="w-full rounded px-2 py-1 text-steel-900 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/50">Precio ofrecido</label>
                          <input
                            type="number"
                            min={0}
                            value={item.precioOfrecido}
                            onChange={(e) => updateCartItem(item.sku, 'precioOfrecido', e.target.value)}
                            className="w-full rounded px-2 py-1 text-steel-900 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Cliente</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <input placeholder="Nombre" value={clienteNombre} onChange={(e) => setClienteNombre(e.target.value)} className="col-span-2 rounded-lg px-3 py-2 text-steel-900 text-sm" />
                <input placeholder="Dirección" value={clienteDireccion} onChange={(e) => setClienteDireccion(e.target.value)} className="col-span-2 rounded-lg px-3 py-2 text-steel-900 text-sm" />
                <input placeholder="Teléfono / contacto" value={clienteContacto} onChange={(e) => setClienteContacto(e.target.value)} className="rounded-lg px-3 py-2 text-steel-900 text-sm" />
                <input placeholder="DNI o CUIT" value={clienteDniCuit} onChange={(e) => setClienteDniCuit(e.target.value)} className="rounded-lg px-3 py-2 text-steel-900 text-sm" />
                <input placeholder="Ciudad" value={clienteCiudad} onChange={(e) => setClienteCiudad(e.target.value)} className="rounded-lg px-3 py-2 text-steel-900 text-sm" />
                <input placeholder="Código postal (opcional)" value={clienteCodigoPostal} onChange={(e) => setClienteCodigoPostal(e.target.value)} className="rounded-lg px-3 py-2 text-steel-900 text-sm" />
                <input placeholder="Rubro (opcional)" value={clienteRubro} onChange={(e) => setClienteRubro(e.target.value)} className="rounded-lg px-3 py-2 text-steel-900 text-sm" />
                <select value={clienteEstado} onChange={(e) => setClienteEstado(e.target.value as ClienteEstado)} className="rounded-lg px-3 py-2 text-steel-900 text-sm">
                  <option value="nuevo">Cliente nuevo</option>
                  <option value="activo">Cliente activo</option>
                  <option value="pasivo">Cliente pasivo</option>
                </select>
              </div>

              <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Financiación</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <label className="block text-[10px] text-white/50">Cantidad de cuotas</label>
                  <input type="number" min={1} value={cuotasCantidad} onChange={(e) => setCuotasCantidad(e.target.value)} className="w-full rounded-lg px-3 py-2 text-steel-900 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50">Tipo</label>
                  <select value={cuotasTipo} onChange={(e) => setCuotasTipo(e.target.value as CuotasTipo)} className="w-full rounded-lg px-3 py-2 text-steel-900 text-sm">
                    <option value="diaria">Diaria</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                    <option value="tarjeta">Tarjeta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-white/50">Precio de la cuota</label>
                  <input type="number" min={0} value={cuotaPrecio} onChange={(e) => setCuotaPrecio(e.target.value)} className="w-full rounded-lg px-3 py-2 text-steel-900 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50">Interés % (opcional)</label>
                  <input type="number" min={0} value={interesPorcentaje} onChange={(e) => setInteresPorcentaje(e.target.value)} className="w-full rounded-lg px-3 py-2 text-steel-900 text-sm" />
                </div>
              </div>

              <textarea
                placeholder="Observaciones para el cobrador/supervisor (opcional)"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={2}
                className="w-full rounded-lg px-3 py-2 text-steel-900 text-sm mb-4"
              />

              <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Cobrador</p>
              <div className="flex flex-col gap-3 mb-4">
                {Array.from(cobradoresPorCiudad.entries()).map(([ciudad, personas]) => (
                  <div key={ciudad}>
                    <p className="text-xs text-white/50 mb-1">{ciudad}</p>
                    <div className="flex flex-wrap gap-2">
                      {personas.map((c) => (
                        <button
                          key={c.pin}
                          onClick={() => setCobradorPin(String(c.pin))}
                          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                            cobradorPin === String(c.pin) ? 'bg-amber-500 text-white' : 'bg-steel-800 text-white/60'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {formError && <p className="text-sm text-red-400 mb-3">{formError}</p>}
              {successId && <p className="text-sm text-emerald-400 mb-3">Preventa cargada. Queda esperando que Gabriel confirme la documentación.</p>}

              <button
                onClick={submit}
                disabled={submitting}
                className="w-full rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 py-3 text-sm font-semibold text-white"
              >
                {submitting ? 'Cargando…' : 'Cargar preventa'}
              </button>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold mb-3">Mis ventas</h2>
              {misVentas === null && <p className="text-white/60 text-sm">Cargando…</p>}
              {misVentas && misVentas.length === 0 && <p className="text-white/40 text-sm">Todavía no cargaste ninguna.</p>}
              <div className="flex flex-col gap-2">
                {misVentas?.map((p) => {
                  const expanded = expandedId === p.id;
                  return (
                    <div key={p.id} className="rounded-xl2 bg-steel-900 border border-steel-800 overflow-hidden">
                      <button
                        onClick={() => setExpandedId(expanded ? null : p.id)}
                        className="w-full flex items-center justify-between gap-2 p-4 text-left"
                      >
                        <div>
                          <p className="font-semibold">{p.cliente_nombre}</p>
                          <p className="text-xs text-white/40">{p.cliente_ciudad} — {p.cobrador_nombre}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${STATUS_COLORS[p.status]}`}>
                          {STATUS_LABELS[p.status] || p.status}
                        </span>
                      </button>
                      {expanded && (
                        <div className="border-t border-steel-800 p-4 text-sm text-white/70 space-y-1">
                          {p.items.map((i) => (
                            <p key={i.sku}>
                              {i.quantity}x {i.name} — ${formatPrice(i.precioOfrecido)} c/u
                            </p>
                          ))}
                          <p className="text-white/50">
                            {p.cuotas_cantidad} cuotas {p.cuotas_tipo} de ${formatPrice(p.cuota_precio)}
                          </p>
                          {p.gabriel_motivo_rechazo && (
                            <p className="text-red-400">Motivo (documentación): {p.gabriel_motivo_rechazo}</p>
                          )}
                          {p.cobrador_motivo_rechazo && (
                            <p className="text-red-400">Motivo (cobrador): {p.cobrador_motivo_rechazo}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
