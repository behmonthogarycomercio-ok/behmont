'use client';

import { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const { error } = await supabase.storage.from('product-images').upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
    }

    onChange([...value, ...uploaded]);
    setUploading(false);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {value.map((url, i) => (
          <div key={url} className="w-24">
            <div className="h-20 w-24 rounded-lg border border-plate-200 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-center gap-2 mt-1 text-[11px]">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-0.5 text-amber-600 underline"
              >
                <Download className="h-3 w-3" /> Bajar
              </a>
              {confirmDeleteIdx === i ? (
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      onChange(value.filter((_, idx) => idx !== i));
                      setConfirmDeleteIdx(null);
                    }}
                    className="text-red-600 underline font-semibold"
                  >
                    Sí, borrar
                  </button>
                  <button type="button" onClick={() => setConfirmDeleteIdx(null)} className="text-steel-400 underline">
                    No
                  </button>
                </span>
              ) : (
                <button type="button" onClick={() => setConfirmDeleteIdx(i)} className="text-red-600 underline">
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-plate-300 px-4 py-2 text-sm text-steel-600 hover:border-amber-500 hover:text-amber-600">
        <Upload className="h-4 w-4" />
        {uploading ? 'Subiendo...' : 'Subir imágenes'}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
    </div>
  );
}
