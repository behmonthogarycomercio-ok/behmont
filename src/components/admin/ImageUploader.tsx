'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

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
          <div key={url} className="relative h-20 w-20 rounded-lg border border-plate-200 overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="absolute inset-0 hidden group-hover:grid place-items-center bg-black/50"
            >
              <X className="h-4 w-4 text-white" />
            </button>
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
