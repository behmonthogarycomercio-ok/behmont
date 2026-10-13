'use client';

import { useState, useTransition } from 'react';
import { ImageOff } from 'lucide-react';
import { clearAllPromotionImages } from '@/lib/actions';

export default function ClearPromotionImagesButton() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (!confirm('¿Sacar la imagen de TODAS las promociones? No borra las promociones, solo la imagen de cada una. No se puede deshacer.')) return;
    setError(null);
    startTransition(async () => {
      const result = await clearAllPromotionImages();
      if (result?.error) setError(result.error);
    });
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        onClick={handleClick}
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-lg border border-plate-300 px-3 py-1.5 text-xs font-semibold text-steel-600 hover:border-danger-600 hover:text-danger-600 disabled:opacity-40"
      >
        <ImageOff className="h-3.5 w-3.5" /> {pending ? 'Eliminando imágenes...' : 'Eliminar todas las imágenes'}
      </button>
      {error && <span role="alert" className="text-xs font-medium text-danger-600">{error}</span>}
    </span>
  );
}
