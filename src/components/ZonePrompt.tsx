'use client';

import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { useLocation } from '@/lib/location-context';
import { ALLOWED_ZONES } from '@/lib/financing';

function searchZone(query: string): string | null {
  const q = query.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  if (q.length < 2) return null;

  // Postal code exact match
  const byCode = ALLOWED_ZONES.find((z) => z.codes.includes(q));
  if (byCode) return byCode.city;

  // City name partial match (accent-insensitive)
  const byName = ALLOWED_ZONES.find((z) =>
    z.city.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q)
  );
  return byName ? byName.city : null;
}

export default function ZonePrompt() {
  const { showPrompt, setZone, dismissPrompt } = useLocation();
  const [query, setQuery] = useState('');
  const [matched, setMatched] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showPrompt) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [showPrompt]);

  useEffect(() => {
    setMatched(searchZone(query));
  }, [query]);

  if (!showPrompt) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={dismissPrompt}
      />

      {/* Panel — bottom sheet en mobile, card centrada en desktop */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[61] transition-transform duration-300
          md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2
          md:w-full md:max-w-md md:rounded-2xl
          ${visible ? 'translate-y-0 md:-translate-y-1/2' : 'translate-y-full md:translate-y-8 md:opacity-0'}
        `}
      >
        <div className="rounded-t-2xl md:rounded-2xl bg-white p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50">
                <MapPin className="h-5 w-5 text-amber-600" />
              </span>
              <div>
                <p className="font-display font-bold text-steel-950 leading-tight">¿En qué zona estás?</p>
                <p className="text-xs text-steel-400 leading-snug mt-0.5">
                  Así te mostramos si tenés financiación disponible
                </p>
              </div>
            </div>
            <button
              onClick={dismissPrompt}
              className="p-1.5 rounded-lg hover:bg-plate-100 text-steel-400 transition-colors shrink-0"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribí tu ciudad o código postal..."
            className="w-full rounded-xl border border-plate-200 bg-plate-50 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            autoFocus
          />

          {/* Match found */}
          {matched && (
            <button
              onClick={() => setZone(matched, true)}
              className="mt-3 w-full flex items-center justify-between gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
            >
              <span>✓ {matched} — zona habilitada</span>
              <span className="font-mono text-xs">Confirmar →</span>
            </button>
          )}

          {/* No match */}
          {query.length >= 3 && !matched && (
            <p className="mt-3 text-xs text-steel-400 leading-snug">
              No encontramos esa zona. Por ahora financiamos en:{' '}
              <span className="font-medium text-steel-600">
                {ALLOWED_ZONES.map((z) => z.city).join(', ')}.
              </span>
            </p>
          )}

          {/* Zone pills */}
          <div className="mt-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-steel-300 mb-2.5">
              Zonas con financiación
            </p>
            <div className="flex flex-wrap gap-2">
              {ALLOWED_ZONES.map(({ city }) => (
                <button
                  key={city}
                  onClick={() => setZone(city, true)}
                  className="rounded-full border border-plate-200 bg-white px-3 py-1.5 text-xs font-medium text-steel-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Skip */}
          <button
            onClick={dismissPrompt}
            className="mt-5 w-full text-center font-mono text-[11px] text-steel-300 hover:text-steel-500 transition-colors"
          >
            No soy de ninguna de estas zonas
          </button>
        </div>
      </div>
    </>
  );
}
