import Image from 'next/image';
import AdminShell from '@/components/admin/AdminShell';
import DeleteButton from '@/components/admin/DeleteButton';
import AdminActionForm from '@/components/admin/AdminActionForm';
import InstagramSyncButton from '@/components/admin/InstagramSyncButton';
import DisconnectInstagramButton from '@/components/admin/DisconnectInstagramButton';
import ContentPieceForm from '@/components/admin/ContentPieceForm';
import ContentPieceStageSelect from '@/components/admin/ContentPieceStageSelect';
import ContentGenerator from '@/components/admin/ContentGenerator';
import { FollowersTrendChart, ReachTrendChart } from '@/components/admin/InstagramMetricsCharts';
import { createServerSupabase } from '@/lib/supabase/server';
import { upsertContentSource, deleteContentSource, deleteContentPiece } from '@/lib/actions';

const TABS = [
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

export default async function ContenidoPage({
  searchParams,
}: {
  searchParams: {
    view?: string;
    piece_edit?: string;
    piece_new?: string;
    source_edit?: string;
    ig_connected?: string;
    ig_error?: string;
  };
}) {
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
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-6">Contenido / Instagram</h1>

      <nav className="mb-6 flex flex-wrap gap-2 border-b border-plate-200 pb-3">
        {TABS.map((t) => (
          <a
            key={t.key}
            href={`?view=${t.key}`}
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
    </AdminShell>
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
          href="?view=conexion"
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
          href="?view=pipeline&piece_new=1"
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
                            <a href={`?view=pipeline&piece_edit=${p.id}`} className="text-xs font-semibold text-steel-600 hover:text-amber-600">
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
                  <a href={`?view=fuentes&source_edit=${s.id}`} className="text-xs font-semibold text-steel-600 hover:text-amber-600">
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
        Conexión real vía la Instagram API de Meta (Instagram API with Facebook Login for Business).
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
            ✓ Conectado — @{connection.ig_username} (página: {connection.page_name})
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
