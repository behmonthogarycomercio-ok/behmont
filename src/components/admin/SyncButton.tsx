'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

export default function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleSync() {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/ml/sync', { method: 'POST' });
    const data = await res.json();
    setLoading(false);
    setMessage(res.ok ? `✓ ${data.synced} productos sincronizados` : `✗ ${data.error}`);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleSync}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-steel-900 px-4 py-2 text-sm font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Sincronizando...' : 'Sincronizar ahora'}
      </button>
      {message && <p className="text-xs text-steel-600">{message}</p>}
    </div>
  );
}
