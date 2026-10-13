import Image from 'next/image';
import AdminShell from '@/components/admin/AdminShell';
import DeleteButton from '@/components/admin/DeleteButton';
import SyncButton from '@/components/admin/SyncButton';
import SettingField from '@/components/admin/SettingField';
import AdminActionForm from '@/components/admin/AdminActionForm';
import InstagramSyncButton from '@/components/admin/InstagramSyncButton';
import DisconnectInstagramButton from '@/components/admin/DisconnectInstagramButton';
import ContentPieceForm from '@/components/admin/ContentPieceForm';
import ContentPieceStageSelect from '@/components/admin/ContentPieceStageSelect';
import ContentGenerator from '@/components/admin/ContentGenerator';
import { FollowersTrendChart, ReachTrendChart } from '@/components/admin/InstagramMetricsCharts';
import { createServerSupabase } from '@/lib/supabase/server';
import { upsertBrand, deleteBrand, upsertContentSource, deleteContentSource, deleteContentPiece } from '@/lib/actions';

const CONTENIDO_SUBTABS = [
  { key: 'resumen', label: 'Resumen' },
  { key: 'pipeline', label: 'Pipeline' },
  { key: 'calendario', label: 'Calendario' },
  { key: 'generador', label: 'Generador' },
  { key: 'fuentes', label: 'Fuentes' },
  { key: 'conexion', label: 'Conexión' },
];

const STAGE_LABELS: Record<string, string> = {
  idea: 'Idea',
  guion: 'Guion',
  grabado: 'Grabado',
  editado: 'Editado',
  aprobado: 'Aprobado',
  programado: 'Programado',
};
const STAGES = ['idea', 'guion', 'grabado', 'editado', 'aprobado', 'programado'];

const FORMAT_LABELS: Record<string, string> = {
  reel: 'Reel',
  carousel: 'Carrusel',
  story: 'Story',
  ad: 'Ad',
};

type SearchParams = {
  tab?: string;
  ml_connected?: string;
  ml_error?: string;
  view?: string;
  piece_edit?: string;
  piece_new?: string;
  source_edit?: string;
  ig_connected?: string;
  ig_error?: string;
};

export default async function MarcasYContenidoPage({ searchParams }: { searchParams: SearchParams }) {
  const tab = searchParams.tab === 'contenido' ? 'contenido' : 'marcas';

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-steel-950">Marcas y contenido</h1>
      </div>

      <div className="flex gap-2 mb-6 border-b border-plate-200">
        {[
          { value: 'marcas', label: 'Marcas y MercadoLibre' },
          { value: 'contenido', label: 'Contenido / Instagram' },
        ].map(({ value, label }) => (
          <a
            key={value}
            href={`?tab=${value}`}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === value
                ? 'border-steel-950 text-steel-950'
                : 'border-transparent text-steel-500 hover:text-steel-700'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {tab === 'contenido' ? <ContenidoTab searchParams={searchParams} /> : <MarcasTab searchParams={searchParams} />}
    </AdminShell>
  );
}

async function MarcasTab({ searchParams }: { searchParams: { ml_connected?: string; ml_error?: string } }) {
  const supabase = createServerSupabase();
  const [{ data: brands }, { data: settingsRows }, { data: syncLog }] = await Promise.all([
    supabase.from('brands').select('*').order('sort_order'),
    supabase.from('site_settings').select('key, value'),
    supabase.from('ml_sync_log').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const settings = Object.fromEntries((settingsRows || []).map((r) => [r.key, r.value]));
  const mlConnected = !!settings.ml_seller_id;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* ── MercadoLibre ── */}
        <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
          <h2 className="font-display font-semibold text-steel-900 mb-1">MercadoLibre</h2>
          <p className="text-sm text-steel-500 mb-4">
            Sincronización automática de precio, stock e imágenes de tus publicaciones una vez por día
            (además, podés forzarla en cualquier momento con el botón de abajo).
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
              <div className="flex flex-wrap gap-2">
                <SyncButton />
                <a
                  href="/api/ml/oauth/start"
                  className="inline-block rounded-lg border border-plate-300 px-4 py-2.5 text-sm font-semibold text-steel-700 hover:bg-plate-50"
                >
                  Reconectar (genera un token nuevo)
                </a>
              </div>
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
            Número principal (Lucas) — donde llegan todos los pedidos del sitio (formato internacional, sin +).
          </p>
          <SettingField settingKey="whatsapp_number" defaultValue={settings.whatsapp_number || ''} placeholder="5493416373092" />

          <p className="text-xs font-semibold text-steel-500 mt-4 mb-1">Número secundario (Luz)</p>
          <p className="text-sm text-steel-500 mb-4">
            Aparece como segunda opción junto al principal en los botones de consulta. Dejalo vacío para ocultarlo.
          </p>
          <SettingField settingKey="whatsapp_number_2" defaultValue={settings.whatsapp_number_2 || ''} placeholder="5493454015358" />
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
            <label className="block text-xs font-semibold text-steel-500 mb-1">Facebook (URL completa)</label>
            <SettingField settingKey="facebook_url" defaultValue={settings.facebook_url || ''} placeholder="https://www.facebook.com/behmont.equipamientoscomerciales/" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel-500 mb-1">Tienda en MercadoLibre (URL)</label>
            <SettingField settingKey="ml_store_url" defaultValue={settings.ml_store_url || ''} placeholder="https://listado.mercadolibre.com.ar/_CustId_..." />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-steel-500 mb-1">Horarios de atención (se muestra junto al mapa)</label>
            <SettingField settingKey="business_hours" defaultValue={settings.business_hours || ''} placeholder="Lun a Vie 09:00-13:00 / 17:00-21:00 · Sáb 09:00-13:00" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-steel-500 mb-1">Link para dejar reseña en Google (banner de opiniones)</label>
            <SettingField settingKey="google_review_url" defaultValue={settings.google_review_url || ''} placeholder="https://g.page/r/XXXXXXXXXXXXX/review" />
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

        <AdminActionForm action={upsertBrand} className="h-fit rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3">
          <h2 className="font-display font-semibold text-steel-900">Nueva marca</h2>
          <input name="name" required placeholder="Nombre" className="input" />
          <input name="logo_url" placeholder="URL del logo (opcional)" className="input" />
          <button type="submit" className="w-full rounded-lg bg-steel-900 py-2.5 text-sm font-semibold text-white hover:bg-steel-800">
            Guardar
          </button>
        </AdminActionForm>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none;margin-bottom:0.25rem}`}</style>
    </>
  );
}

async function ContenidoTab({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createServerSupabase();
  const view = searchParams.view || 'resumen';

  const [
    { data: connection },
    { data: sources },
    { data: pieces },
    { data: metrics },
    { data: media },
    { data: syncLog },
  ] = await Promise.all([
    supabase.from('instagram_connection').select('*').eq('id', 'main').maybeSingle(),
    supabase.from('content_sources').select('*').order('created_at', { ascending: false }),
    supabase.from('content_pieces').select('*').order('created_at', { ascending: false }),
    supabase.from('instagram_metrics_daily').select('*').order('date', { ascending: true }).limit(30),
    supabase.from('instagram_media_cache').select('*').order('posted_at', { ascending: false }).limit(8),
    supabase.from('content_sync_log').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const sourceList = sources || [];
  const pieceList = pieces || [];
  const editingPiece = searchParams.piece_edit
    ? pieceList.find((p) => p.id === searchParams.piece_edit)
    : undefined;
  const showPieceForm = searchParams.piece_new === '1' || !!editingPiece;

  const editingSource = searchParams.source_edit
    ? sourceList.find((s) => s.id === searchParams.source_edit)
    : undefined;

  return (
    <>
      <nav className="mb-6 flex flex-wrap gap-2 border-b border-plate-200 pb-3">
        {CONTENIDO_SUBTABS.map((t) => (
          <a
            key={t.key}
            href={`?tab=contenido&view=${t.key}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              view === t.key ? 'bg-amber-500 text-white' : 'text-steel-600 hover:bg-plate-50'
            }`}
          >
            {t.label}
          </a>
        ))}
      </nav>

      {view === 'resumen' && (
        <ResumenView connection={connection} metrics={metrics || []} media={media || []} />
      )}

      {view === 'pipeline' && (
        showPieceForm ? (
          <ContentPieceForm piece={editingPiece} sources={sourceList} />
        ) : (
          <PipelineView pieces={pieceList} />
        )
      )}

      {view === 'calendario' && <CalendarioView pieces={pieceList} />}

      {view === 'generador' && <ContentGenerator sources={sourceList} />}

      {view === 'fuentes' && (
        <FuentesView sources={sourceList} editingSource={editingSource} />
      )}

      {view === 'conexion' && (
        <ConexionView
          connection={connection}
          syncLog={syncLog || []}
          connected={searchParams.ig_connected}
          error={searchParams.ig_error}
        />
      )}
    </>
  );
}

function ResumenView({
  connection,
  metrics,
  media,
}: {
  connection: any;
  metrics: any[];
  media: any[];
}) {
  if (!connection) {
    return (
      <div className="rounded-xl2 border border-plate-200 bg-white p-8 text-center shadow-card">
        <p className="text-steel-600 mb-4">Todavía no conectaste una cuenta de Instagram.</p>
        <a
          href="?tab=contenido&view=conexion"
          className="inline-block rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Ir a Conexión
        </a>
      </div>
    );
  }

  const latest = metrics[metrics.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Seguidores" value={latest?.followers_count} />
        <MetricCard label="Alcance (último sync)" value={latest?.reach} />
        <MetricCard label="Visitas al perfil" value={latest?.profile_views} />
        <MetricCard label="Interacciones" value={latest?.total_interactions} />
      </div>

      {metrics.length === 0 ? (
        <p className="rounded-xl2 border border-plate-200 bg-white p-5 text-sm text-steel-500 shadow-card">
          Todavía no hay historial. Andá a Conexión y usá &quot;Sincronizar ahora&quot; para traer los primeros datos reales.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
            <h2 className="font-display font-semibold text-steel-900 mb-3">Seguidores (histórico sincronizado)</h2>
            <FollowersTrendChart data={metrics} />
          </div>
          <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
            <h2 className="font-display font-semibold text-steel-900 mb-3">Alcance (histórico sincronizado)</h2>
            <ReachTrendChart data={metrics} />
          </div>
        </div>
      )}

      <div className="rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
        <h2 className="font-display font-semibold text-steel-900 mb-3">Últimos posts</h2>
        {media.length === 0 ? (
          <p className="text-sm text-steel-500">Sin posts sincronizados todavía.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {media.map((m) => (
              <a
                key={m.id}
                href={m.permalink}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg overflow-hidden border border-plate-200 hover:opacity-80"
              >
                <div className="relative aspect-square bg-plate-50">
                  {(m.thumbnail_url || m.media_url) && (
                    <Image src={m.thumbnail_url || m.media_url} alt="" fill sizes="150px" className="object-cover" />
                  )}
                </div>
                <div className="p-2 text-xs text-steel-600">
                  ❤ {m.like_count ?? 0} · 💬 {m.comments_count ?? 0}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number | null | undefined }) {
  return (
    <div className="rounded-xl2 border border-plate-200 bg-white p-4 shadow-card">
      <p className="text-xs font-semibold uppercase text-steel-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-steel-950">
        {value === null || value === undefined ? '—' : value.toLocaleString('es-AR')}
      </p>
    </div>
  );
}

function PipelineView({ pieces }: { pieces: any[] }) {
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <a
          href="?tab=contenido&view=pipeline&piece_new=1"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          + Nueva pieza
        </a>
      </div>
      <div className="space-y-6">
        {STAGES.map((stage) => {
          const items = pieces.filter((p) => p.stage === stage);
          return (
            <div key={stage}>
              <h3 className="mb-2 text-sm font-bold uppercase text-steel-500">
                {STAGE_LABELS[stage]} <span className="text-steel-400">({items.length})</span>
              </h3>
              {items.length === 0 ? (
                <p className="text-xs text-steel-400">Sin piezas en esta etapa.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card">
                  <table className="w-full text-sm">
                    <tbody>
                      {items.map((p) => (
                        <tr key={p.id} className="border-b border-plate-100 last:border-0">
                          <td className="p-3">
                            <p className="font-medium text-steel-900">{p.title}</p>
                            <p className="text-xs text-steel-500">
                              {FORMAT_LABELS[p.format] || p.format}
                              {p.owner ? ` · ${p.owner}` : ''}
                              {p.scheduled_at ? ` · ${new Date(p.scheduled_at).toLocaleString('es-AR')}` : ''}
                            </p>
                          </td>
                          <td className="p-3">
                            <ContentPieceStageSelect id={p.id} stage={p.stage} />
                          </td>
                          <td className="p-3 text-right space-x-3 whitespace-nowrap">
                            <a href={`?tab=contenido&view=pipeline&piece_edit=${p.id}`} className="text-xs font-semibold text-steel-600 hover:text-amber-600">
                              Editar
                            </a>
                            <DeleteButton id={p.id} action={deleteContentPiece} label="pieza" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarioView({ pieces }: { pieces: any[] }) {
  const scheduled = pieces
    .filter((p) => p.scheduled_at)
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

  if (scheduled.length === 0) {
    return (
      <p className="rounded-xl2 border border-plate-200 bg-white p-5 text-sm text-steel-500 shadow-card">
        No hay piezas con fecha programada todavía. Cargá una fecha en Pipeline para que aparezca acá.
      </p>
    );
  }

  const byDay = new Map<string, any[]>();
  for (const piece of scheduled) {
    const day = new Date(piece.scheduled_at).toLocaleDateString('es-AR', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
    });
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day)!.push(piece);
  }

  return (
    <div className="space-y-4">
      {[...byDay.entries()].map(([day, items]) => (
        <div key={day} className="rounded-xl2 border border-plate-200 bg-white p-4 shadow-card">
          <h3 className="mb-2 text-sm font-bold capitalize text-steel-900">{day}</h3>
          <ul className="space-y-2">
            {items.map((p) => (
              <li key={p.id} className="text-sm text-steel-700">
                <span className="font-mono text-xs text-steel-500">
                  {new Date(p.scheduled_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                </span>{' '}
                · {FORMAT_LABELS[p.format] || p.format} · {p.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function FuentesView({ sources, editingSource }: { sources: any[]; editingSource: any }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-plate-200 text-left text-steel-500">
              <th className="p-3 font-medium">Fuente</th>
              <th className="p-3 font-medium">Tipo</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.id} className="border-b border-plate-100 last:border-0">
                <td className="p-3">
                  <p className="font-medium text-steel-900">{s.title}</p>
                  {s.summary && <p className="text-xs text-steel-500 line-clamp-1">{s.summary}</p>}
                </td>
                <td className="p-3 text-steel-600 capitalize">{s.type}</td>
                <td className="p-3 text-right space-x-3 whitespace-nowrap">
                  <a href={`?tab=contenido&view=fuentes&source_edit=${s.id}`} className="text-xs font-semibold text-steel-600 hover:text-amber-600">
                    Editar
                  </a>
                  <DeleteButton id={s.id} action={deleteContentSource} label="fuente" />
                </td>
              </tr>
            ))}
            {sources.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-sm text-steel-400">
                  Sin fuentes cargadas todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminActionForm action={upsertContentSource} className="h-fit rounded-xl2 border border-plate-200 bg-white p-5 shadow-card space-y-3">
        <h2 className="font-display font-semibold text-steel-900">
          {editingSource ? 'Editar fuente' : 'Nueva fuente'}
        </h2>
        {editingSource && <input type="hidden" name="id" value={editingSource.id} />}
        <select name="type" defaultValue={editingSource?.type || 'otro'} className="input">
          <option value="youtube">YouTube</option>
          <option value="manychat">ManyChat</option>
          <option value="llamada">Llamada de venta</option>
          <option value="otro">Otro</option>
        </select>
        <input name="title" required defaultValue={editingSource?.title} placeholder="Nombre" className="input" />
        <input name="url" defaultValue={editingSource?.url || ''} placeholder="URL (opcional)" className="input" />
        <textarea name="summary" rows={3} defaultValue={editingSource?.summary || ''} placeholder="Resumen" className="input" />
        <button type="submit" className="w-full rounded-lg bg-steel-900 py-2.5 text-sm font-semibold text-white hover:bg-steel-800">
          Guardar
        </button>
      </AdminActionForm>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid #dfe3e8;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none;margin-bottom:0.25rem}`}</style>
    </div>
  );
}

function ConexionView({
  connection,
  syncLog,
  connected,
  error,
}: {
  connection: any;
  syncLog: any[];
  connected?: string;
  error?: string;
}) {
  return (
    <div className="max-w-xl rounded-xl2 border border-plate-200 bg-white p-5 shadow-card">
      <h2 className="font-display font-semibold text-steel-900 mb-1">Instagram</h2>
      <p className="text-sm text-steel-500 mb-4">
        Conexión real vía la Instagram API de Meta (Instagram API with Instagram Login).
        Solo lectura de perfil, media e insights — no publica contenido ni gestiona comentarios/DMs.
      </p>

      {connected && (
        <p className="mb-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm px-3 py-2">
          ✓ Cuenta de Instagram conectada correctamente.
        </p>
      )}
      {error && (
        <p className="mb-3 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
          Error al conectar: {error}
        </p>
      )}

      {connection ? (
        <div className="space-y-3">
          <p className="text-sm text-steel-700">
            ✓ Conectado — @{connection.ig_username}
          </p>
          <div className="flex flex-wrap gap-2">
            <InstagramSyncButton />
            <DisconnectInstagramButton />
          </div>
          <div>
            <p className="text-xs font-semibold text-steel-500 mb-1">Últimas sincronizaciones</p>
            <ul className="text-xs text-steel-600 space-y-1">
              {syncLog.map((log) => (
                <li key={log.id}>
                  {log.status === 'ok' ? '✓' : '✗'} {new Date(log.created_at).toLocaleString('es-AR')} — {log.detail}
                </li>
              ))}
              {syncLog.length === 0 && <li>Todavía no se sincronizó nada.</li>}
            </ul>
          </div>
        </div>
      ) : (
        <a
          href="/api/instagram/oauth/start"
          className="inline-block rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Conectar con Instagram
        </a>
      )}
    </div>
  );
}
