'use client';

import { useState, useRef } from 'react';
import { Paperclip, X, Loader2 } from 'lucide-react';
import {
  DAILY_PLANS, MONTHLY_PLANS, ALLOWED_ZONES,
  calcDaily, calcWeekly, calcMonthly, fmtARS,
  type DailyPlan, type MonthlyPlan,
} from '@/lib/financing';
import { useLocation } from '@/lib/location-context';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { createClient } from '@/lib/supabase/client';

type Freq = 'daily' | 'weekly' | 'monthly';
type AnyPlan = DailyPlan | MonthlyPlan;

const STEP_LABELS = ['Requisitos', 'Calculadora', 'Solicitud'];

const REQS = [
  { key: 'dni',     text: 'Foto de DNI — frente y dorso (2 fotos)',          fileLabel: 'Arrastrá o seleccioná las fotos del DNI',   maxFiles: 2 },
  { key: 'service', text: 'Servicio a tu nombre: luz, agua o internet',       fileLabel: 'Arrastrá o seleccioná la foto del servicio', maxFiles: 2 },
  { key: 'income',  text: 'Últimos 2 recibos de sueldo o garantía',          fileLabel: 'Arrastrá o seleccioná los comprobantes',    maxFiles: 2 },
];

const FREQ_OPTIONS: { key: Freq; label: string }[] = [
  { key: 'daily',   label: 'Por día' },
  { key: 'weekly',  label: 'Por semana' },
  { key: 'monthly', label: 'Por mes' },
];

export default function FinancingCalculator({
  initialAmount,
  productsSummary,
  whatsappNumber,
}: {
  initialAmount?: number;
  productsSummary?: string;
  whatsappNumber: string;
}) {
  const { city } = useLocation();
  const [step, setStep] = useState(1);

  // Step 1
  const [reqs, setReqs] = useState({ dni: false, service: false, income: false });
  const [files, setFiles]       = useState<Record<string, File[]>>({ dni: [], service: [], income: [] });
  const [fileUrls, setFileUrls] = useState<Record<string, string[]>>({});
  const [dragActive, setDragActive] = useState<Record<string, boolean>>({ dni: false, service: false, income: false });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRefs = { dni: useRef<HTMLInputElement>(null), service: useRef<HTMLInputElement>(null), income: useRef<HTMLInputElement>(null) };

  function addFiles(key: string, incoming: FileList | File[], maxFiles: number) {
    const allowed = [...incoming].filter(f => f.type.startsWith('image/') || f.type === 'application/pdf');
    setFiles(prev => ({ ...prev, [key]: [...prev[key], ...allowed].slice(0, maxFiles) }));
  }

  function removeFile(key: string, idx: number) {
    setFiles(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== idx) }));
  }

  // Step 2
  const [amount, setAmount] = useState(initialAmount ? String(initialAmount) : '');
  const [freq, setFreq] = useState<Freq>('daily');
  const [planIdx, setPlanIdx] = useState(0);

  // Step 3
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const allReqsMet = reqs.dni && reqs.service && reqs.income;
  const principal = parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 0;

  const activePlans: AnyPlan[] = freq === 'monthly' ? MONTHLY_PLANS : DAILY_PLANS;
  const safeIdx = Math.min(planIdx, activePlans.length - 1);
  const currentPlan = activePlans[safeIdx];

  function getPlanAmount(plan: AnyPlan): number {
    if ('months' in plan) return calcMonthly(principal, plan.surcharge, plan.months);
    if (freq === 'weekly')  return calcWeekly(principal, plan.surcharge, plan.days);
    return calcDaily(principal, plan.surcharge, plan.days);
  }

  function getPlanLabel(plan: AnyPlan): string {
    if ('months' in plan) return `${plan.months} meses`;
    if (freq === 'weekly')  return `${plan.weeks} semanas`;
    return `${plan.days} días`;
  }

  const cuota = principal > 0 ? getPlanAmount(currentPlan) : 0;
  const totalDevolver = principal * (1 + currentPlan.surcharge);
  const freqLabel = freq === 'daily' ? 'día' : freq === 'weekly' ? 'semana' : 'mes';

  async function uploadFiles(): Promise<Record<string, string[]>> {
    const supabase = createClient();
    const sessionId = crypto.randomUUID();
    const urls: Record<string, string[]> = {};
    for (const key of ['dni', 'service', 'income'] as const) {
      const keyFiles = files[key];
      if (!keyFiles.length) continue;
      urls[key] = [];
      for (let i = 0; i < keyFiles.length; i++) {
        const file = keyFiles[i];
        const ext = file.name.split('.').pop() ?? 'jpg';
        const path = `${sessionId}/${key}_${i + 1}.${ext}`;
        const { error } = await supabase.storage.from('financing-docs').upload(path, file, { upsert: true });
        if (!error) {
          const { data } = supabase.storage.from('financing-docs').getPublicUrl(path);
          urls[key].push(data.publicUrl);
        }
      }
    }
    return urls;
  }

  function buildMessage(): string {
    const lines: string[] = [
      '*Solicitud de Financiacion — BEHMONT*',
      '',
      `Nombre: ${form.name}`,
      `Telefono: ${form.phone}`,
      `Direccion: ${form.address || 'No indico direccion'}`,
      ...(city ? [`Ciudad: ${city}`] : []),
      '',
      ...(productsSummary ? [`Productos: ${productsSummary}`, ''] : []),
      ...(Object.keys(fileUrls).length > 0 ? (() => {
        const docLines: string[] = ['Documentacion adjunta:'];
        const labels: Record<string, string> = { dni: 'DNI', service: 'Servicio', income: 'Comprobante' };
        for (const key of ['dni', 'service', 'income']) {
          const urls = fileUrls[key] ?? [];
          if (urls.length === 1) docLines.push(`• ${labels[key]}: ${urls[0]}`);
          else urls.forEach((url, i) => docLines.push(`• ${labels[key]} ${i + 1}: ${url}`));
        }
        return [...docLines, ''];
      })() : []),
      `Monto: $${fmtARS(principal)}`,
      `Plan: ${getPlanLabel(currentPlan)} (+${Math.round(currentPlan.surcharge * 100)}%)`,
      `Total a devolver: $${fmtARS(totalDevolver)}`,
      `Cuota por ${freqLabel}: $${fmtARS(cuota)}`,
      '',
      '_Solicitud desde behmont.com.ar_',
    ];
    return buildWhatsAppLink(whatsappNumber, lines.join('\n'));
  }

  return (
    <div className="space-y-5">
      {/* Step indicator */}
      <div className="flex items-center font-mono text-[11px] uppercase tracking-wide">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          return (
            <span key={n} className="flex items-center">
              {i > 0 && <span className="mx-2.5 text-steel-200">/</span>}
              <span className={
                step === n ? 'text-steel-900 font-bold' :
                step > n  ? 'text-amber-600 font-semibold' :
                'text-steel-300'
              }>
                {n}. {label}
              </span>
            </span>
          );
        })}
      </div>

      {/* ── STEP 1: Requirements ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-plate-200 bg-white p-6 space-y-4">
            <div>
              <h2 className="font-display text-lg font-bold text-steel-950">Requisitos necesarios</h2>
              <p className="mt-1 text-sm text-steel-400">Confirmá que tenés toda la documentación antes de continuar.</p>
            </div>
            {REQS.map(({ key, text, fileLabel, maxFiles }) => {
              const k = key as keyof typeof reqs;
              const checked = reqs[k];
              const keyFiles = files[k];
              const isDrag = dragActive[k];
              const canAddMore = keyFiles.length < maxFiles;
              return (
                <div key={key} className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setReqs((r) => ({ ...r, [key]: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded accent-amber-500 shrink-0"
                    />
                    <span className={`text-sm leading-snug transition-colors ${checked ? 'text-steel-900 font-medium' : 'text-steel-500'}`}>
                      {text}
                    </span>
                  </label>
                  {checked && (
                    <div className="ml-7 space-y-1.5">
                      {/* Files already selected */}
                      {keyFiles.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                          <Paperclip className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span className="text-xs text-amber-800 font-medium truncate flex-1">{f.name}</span>
                          <button type="button" onClick={() => removeFile(key, idx)} className="text-amber-400 hover:text-amber-700">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {/* Drop zone — shown while under the limit */}
                      {canAddMore && (
                        <>
                          <input
                            ref={fileRefs[k]}
                            type="file"
                            accept="image/*,application/pdf"
                            multiple
                            className="hidden"
                            onChange={(e) => { if (e.target.files) addFiles(key, e.target.files, maxFiles); e.target.value = ''; }}
                          />
                          <button
                            type="button"
                            onClick={() => fileRefs[k]?.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(d => ({ ...d, [key]: true })); }}
                            onDragLeave={() => setDragActive(d => ({ ...d, [key]: false }))}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragActive(d => ({ ...d, [key]: false }));
                              addFiles(key, e.dataTransfer.files, maxFiles);
                            }}
                            className={`w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed px-3 py-2.5 text-xs font-medium transition-colors ${
                              isDrag
                                ? 'border-amber-400 bg-amber-50 text-amber-700'
                                : 'border-plate-300 bg-plate-50 text-steel-500 hover:border-amber-400 hover:text-amber-700'
                            }`}
                          >
                            <Paperclip className="h-3.5 w-3.5" />
                            {keyFiles.length === 0 ? fileLabel : `Agregar otra (${keyFiles.length}/${maxFiles})`}
                            {keyFiles.length === 0 && <span className="text-steel-300 ml-1">(opcional)</span>}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Zone info */}
          <div className="rounded-xl border border-plate-100 bg-plate-50 px-5 py-4">
            <p className="text-xs text-steel-500 leading-snug">
              {city ? (
                <>
                  <span className="font-semibold text-green-700">✓ Zona habilitada — {city}.</span>{' '}
                  Entregamos sin cargo y financiamos en tu zona.
                </>
              ) : (
                <>
                  Financiamos y entregamos sin cargo en:{' '}
                  <span className="font-medium text-steel-700">
                    {ALLOWED_ZONES.map((z) => z.city).join(', ')}.
                  </span>
                </>
              )}
            </p>
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 leading-snug">{uploadError}</p>
          )}
          <button
            disabled={!allReqsMet || uploading}
            onClick={async () => {
              setUploadError('');
              const hasFiles = Object.values(files).some(arr => arr.length > 0);
              if (hasFiles) {
                setUploading(true);
                try {
                  const urls = await uploadFiles();
                  setFileUrls(urls);
                } catch {
                  setUploadError('No se pudieron subir los archivos. Podés continuar sin ellos.');
                } finally {
                  setUploading(false);
                }
              }
              setStep(2);
            }}
            className="w-full rounded-xl bg-steel-950 py-3.5 text-sm font-bold text-white transition-colors hover:bg-steel-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Subiendo archivos...</> : 'Ver opciones de financiación →'}
          </button>
        </div>
      )}

      {/* ── STEP 2: Calculator ── */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Amount input */}
          <div className="rounded-xl border border-plate-200 bg-white p-5 space-y-2">
            <label className="font-mono text-[11px] font-semibold uppercase tracking-wide text-steel-400 block">
              Monto del pedido
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-steel-400 pointer-events-none">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.,]/g, '')); setPlanIdx(0); }}
                placeholder="50000"
                className="w-full rounded-lg border border-plate-200 pl-8 pr-4 py-3 font-mono text-xl font-bold text-steel-950 focus:outline-none focus:border-steel-400 placeholder:text-steel-200 placeholder:font-normal placeholder:text-base"
              />
            </div>
          </div>

          {/* Frequency tabs */}
          <div className="grid grid-cols-3 gap-2">
            {FREQ_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setFreq(key); setPlanIdx(0); }}
                className={`rounded-lg py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide border transition-colors ${
                  freq === key
                    ? 'bg-steel-950 text-white border-steel-950'
                    : 'bg-white text-steel-500 border-plate-200 hover:border-steel-300 hover:text-steel-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Plans table */}
          <div className="rounded-xl border border-plate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-plate-50 border-b border-plate-200">
              {['Plazo', 'Recargo', 'Cuota'].map((h, i) => (
                <div key={h} className={`px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-steel-400 ${i === 2 ? 'text-right' : ''}`}>
                  {h}
                </div>
              ))}
            </div>
            {activePlans.map((plan, i) => {
              const result = principal > 0 ? getPlanAmount(plan) : null;
              const selected = safeIdx === i;
              return (
                <button
                  key={i}
                  onClick={() => setPlanIdx(i)}
                  className={`w-full grid grid-cols-3 border-t border-plate-200 transition-colors text-left ${
                    selected ? 'bg-amber-50' : 'bg-white hover:bg-plate-50'
                  }`}
                >
                  <div className={`px-4 py-3 font-mono text-sm font-bold ${selected ? 'text-amber-700' : 'text-steel-900'}`}>
                    {getPlanLabel(plan)}
                  </div>
                  <div className="px-4 py-3 font-mono text-sm text-steel-500">
                    +{Math.round(plan.surcharge * 100)}%
                  </div>
                  <div className={`px-4 py-3 font-mono text-sm font-bold text-right ${selected ? 'text-amber-700' : 'text-steel-900'}`}>
                    {result !== null ? `$${fmtARS(result)}` : '—'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live summary */}
          {principal > 0 && (
            <div className="rounded-xl bg-steel-950 text-white p-5 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Resumen del plan</p>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Monto</span>
                <span className="font-mono text-sm font-semibold">${fmtARS(principal)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Total a devolver</span>
                <span className="font-mono text-sm font-semibold text-amber-400">${fmtARS(totalDevolver)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/10 pt-2 mt-1">
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Cuota por {freqLabel}</span>
                <span className="font-display text-2xl font-bold">${fmtARS(cuota)}</span>
              </div>
              <p className="font-mono text-[10px] text-white/30 mt-1">
                Primera cuota ("de bajada") al recibir el producto. Podés adelantar cuotas cuando quieras.
              </p>
            </div>
          )}

          <button
            disabled={!principal}
            onClick={() => setStep(3)}
            className="w-full rounded-xl bg-steel-950 py-3.5 text-sm font-bold text-white transition-colors hover:bg-steel-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuar con este plan →
          </button>

          <button onClick={() => setStep(1)} className="w-full text-sm font-mono text-steel-400 hover:text-steel-700 transition-colors">
            ← Volver
          </button>
        </div>
      )}

      {/* ── STEP 3: Contact + Submit ── */}
      {step === 3 && (
        <div className="space-y-4">
          {/* Plan reminder */}
          <div className="rounded-xl bg-steel-950 text-white p-5 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Plan seleccionado</p>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-white/50 uppercase">Plazo</span>
              <span className="font-mono text-sm font-bold">{getPlanLabel(currentPlan)}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-white/50 uppercase">Total a devolver</span>
              <span className="font-mono text-sm font-bold text-amber-400">${fmtARS(totalDevolver)}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-white/50 uppercase">Cuota por {freqLabel}</span>
              <span className="font-display text-2xl font-bold">${fmtARS(cuota)}</span>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-xl border border-plate-200 bg-white p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-steel-950">Tus datos</h2>
            {[
              { key: 'name',    label: 'Nombre y apellido *',      type: 'text', placeholder: 'Juan Pérez',              required: true  },
              { key: 'phone',   label: 'Teléfono / WhatsApp *',    type: 'tel',  placeholder: '+54 9 3454...',            required: true  },
              { key: 'address', label: 'Dirección de entrega',     type: 'text', placeholder: 'Calle, número, localidad', required: false },
            ].map(({ key, label, type, placeholder, required }) => (
              <div key={key} className="space-y-1.5">
                <label className="font-mono text-[11px] font-semibold uppercase tracking-wide text-steel-400 block">
                  {label}
                </label>
                <input
                  type={type}
                  required={required}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-plate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-steel-400"
                />
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={form.name && form.phone ? buildMessage() : undefined}
            onClick={(e) => { if (!form.name || !form.phone) e.preventDefault(); }}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold transition-colors ${
              form.name && form.phone
                ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a]'
                : 'bg-plate-200 text-steel-400 cursor-not-allowed'
            }`}
          >
            <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar solicitud por WhatsApp
          </a>

          <button onClick={() => setStep(2)} className="w-full text-sm font-mono text-steel-400 hover:text-steel-700 transition-colors">
            ← Cambiar plan
          </button>
        </div>
      )}
    </div>
  );
}
