'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/export-orders');
      if (!res.ok) {
        alert('No se pudo generar el Excel. Probá de nuevo.');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `behmont-ventas-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg bg-steel-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      {loading ? 'Generando...' : 'Descargar Excel de ventas'}
    </button>
  );
}
