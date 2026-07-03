import AdminShell from '@/components/admin/AdminShell';
import DeleteButton from '@/components/admin/DeleteButton';
import SyncButton from '@/components/admin/SyncButton';
import SettingField from '@/components/admin/SettingField';
import { createServerSupabase } from '@/lib/supabase/server';
import { upsertBrand, deleteBrand } from '@/lib/actions';

export default async function MarcasPage({
  searchParams,
}: {
  searchParams: { ml_connected?: string; ml_error?: string };
}) {
  const supabase = createServerSupabase();
  const [{ data: brands }, { data: settingsRows }, { data: syncLog }] = await Promise.all([
    supabase.from('brands').select('*').order('sort_order'),
    supabase.from('site_settings').select('key, value'),
    supabase.from('ml_sync_log').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const settings = Object.fromEntries((settingsRows || []).map((r) => [r.key, r.value]));
  const mlConnected = !!settings.ml_seller_id;

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-6">Marcas y MercadoLibre</h1>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* ── MercadoLibre ── */}
        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-1">MercadoLibre</h2>
          <p className="text-sm text-steel-500 mb-4">
            Sincronización automática de precio y stock de tus publicaciones cada 30 minutos.
          </p>

          {searchParams.ml_connected && (
            <p className="mb-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm px-3 py-2">
              ✓ Cuenta de MercadoLibre conectada correctamente.
            </p>
          )}
          {searchParams.ml_error && (
            <p className="mb-3 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
              Error al conectar: {searchParams.ml_error}
            </p>
          )}

          {mlConnected ? (
            <div className="space-y-3">
              <p className="text-sm text-steel-700">
                ✓ Conectado — seller ID <span className="font-mono">{settings.ml_seller_id}</span>
              </p>
              <SyncButton />
              <div>
                <p className="text-xs font-semibold text-steel-500 mb-1">Últimas sincronizaciones</p>
                <ul className="text-xs text-steel-600 space-y-1">
                  {(syncLog || []).map((log) => (
                    <li key={log.id}>
                      {log.status === 'ok' ? '✓' : '✗'} {new Date(log.created_at).toLocaleString('es-AR')} —{' '}
                      {log.status === 'ok' ? `${log.items_synced} productos` : log.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <a
              href="/api/ml/oauth/start"
              className="inline-block rounded-lg bg-[#3483FA] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Conectar con MercadoLibre
            </a>
          )}
        </div>

        {/* ── WhatsApp ── */}
        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-1">WhatsApp</h2>
          <p className="text-sm text-steel-500 mb-4">
            Número donde llegan todos los pedidos del sitio (formato internacional, sin +).
          </p>
          <SettingField settingKey="whatsapp_number" defaultValue={settings.whatsapp_number || ''} placeholder="5493416373092" />
        </div>
      </div>

      {/* ── Contacto y redes ── */}
      <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card mb-8">
        <h2 className="font-display font-semibold text-steel-900 mb-1">Contacto y redes</h2>
        <p className="text-sm text-steel-500 mb-4">
          Se muestran en el pie de página del sitio. Dejá vacío el campo que no quieras mostrar.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-steel-500 mb-1">Email de contacto</label>
            <SettingField settingKey="contact_email" defaultValue={settings.contact_email || ''} placeholder="behmont.equipamientos@gmail.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel-500 mb-1">Teléfono (formato libre)</label>
            <SettingField settingKey="contact_phone" defaultValue={settings.contact_phone || ''} placeholder="+54 9 3454 01-5358" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel-500 mb-1">Dirección</label>
            <SettingField settingKey="contact_address" defaultValue={settings.contact_address || ''} placeholder="San Lorenzo Oeste 380, Concordia, Entre Ríos" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel-500 mb-1">Instagram (URL completa)</label>
            <SettingField settingKey="instagram_url" defaultValue={settings.instagram_url || ''} placeholder="https://www.instagram.com/behmont_comercio/" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel-500 mb-1">Tienda en MercadoLibre (URL)</label>
            <SettingField settingKey="ml_store_url" defaultValue={settings.ml_store_url || ''} placeholder="https://listado.mercadolibre.com.ar/_CustId_..." />
          </div>
        </div>
      </div>

      {/* ── Marcas ── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-plate-200 text-left text-steel-500">
                <th className="p-3 font-medium">Marca</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {(brands || []).map((b) => (
                <tr key={b.id} className="border-b border-plate-100 last:border-0">
                  <td className="p-3 font-medium text-steel-900">{b.name}</td>
                  <td className="p-3 text-right">
                    <DeleteButton id={b.id} action={deleteBrand} label="marca" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form action={upsertBrand} className="h-fit rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3">
          <h2 className="font-display font-semibold text-steel-900">Nueva marca</h2>
          <input name="name" required placeholder="Nombre" className="input" />
          <input name="logo_url" placeholder="URL del logo (opcional)" className="input" />
          <button type="submit" className="w-full rounded-lg bg-steel-900 py-2.5 text-sm font-semibold text-white hover:bg-steel-800">
            Guardar
          </button>
        </form>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none;margin-bottom:0.25rem}`}</style>
    </AdminShell>
  );
}
