'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Email o contraseña incorrectos.');
      return;
    }
    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen grid place-items-center bg-steel-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl2 bg-white p-8 shadow-card"
      >
        <div className="mb-6 text-center">
          <div className="relative h-14 w-full mx-auto">
            <Image src="/images/logo-behmont.png" alt="BEHMONT" fill className="object-contain" />
          </div>
          <h1 className="font-display text-xl font-bold text-steel-950 mt-4">
            Panel de administración
          </h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-steel-900 py-2.5 text-sm font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>
    </div>
  );
}
