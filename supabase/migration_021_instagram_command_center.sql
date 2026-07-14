-- Migracion 021: Instagram Content Command Center.
-- Agrega herramientas internas de contenido (pipeline, calendario, banco de
-- fuentes) y la conexion real a Instagram vía la Instagram API de Meta
-- (Instagram API with Facebook Login for Business), solo lectura de
-- perfil/media/insights. No incluye publicacion de contenido ni gestion de
-- comentarios/DMs (fuera de alcance de esta fase).
--
-- IMPORTANTE (aprendido del incidente de fuga de tokens de MercadoLibre en
-- migration_018): instagram_connection es una tabla NUEVA y SEPARADA de
-- site_settings, sin ninguna policy de SELECT publica en absoluto. Solo se
-- lee/escribe via service role (server-side) o sesion de admin autenticada.

-- ── CONEXIÓN INSTAGRAM (singleton, id fijo 'main') ─────────
create table if not exists instagram_connection (
  id text primary key default 'main' check (id = 'main'),
  page_id text not null,
  page_name text,
  ig_user_id text not null unique,
  ig_username text,
  user_access_token text not null,
  user_token_expires_at timestamptz not null,
  page_access_token text not null,
  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── PIPELINE / CALENDARIO DE CONTENIDO ─────────────────────
create table if not exists content_sources (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('youtube','manychat','llamada','otro')),
  title text not null,
  url text,
  summary text,
  created_at timestamptz not null default now()
);

create table if not exists content_pieces (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  format text not null check (format in ('reel','carousel','story','ad')),
  stage text not null default 'idea'
    check (stage in ('idea','guion','grabado','editado','aprobado','programado')),
  objective text,
  hook text,
  diagnostico text,
  reframe text,
  cta text,
  script text,
  source_id uuid references content_sources(id) on delete set null,
  owner text,
  scheduled_at timestamptz,
  quality_score int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── HISTÓRICO DE MÉTRICAS REALES DE INSTAGRAM ──────────────
create table if not exists instagram_metrics_daily (
  id uuid primary key default uuid_generate_v4(),
  date date not null unique,
  followers_count int,
  media_count int,
  reach int,
  profile_views int,
  accounts_engaged int,
  total_interactions int,
  raw jsonb,
  created_at timestamptz not null default now()
);

-- ── CACHE DE ÚLTIMOS POSTS (se pisa en cada sync) ──────────
create table if not exists instagram_media_cache (
  id text primary key,
  caption text,
  media_type text,
  media_url text,
  thumbnail_url text,
  permalink text,
  like_count int,
  comments_count int,
  posted_at timestamptz,
  synced_at timestamptz not null default now()
);

-- ── LOG DE SINCRONIZACIÓN (mismo patrón que ml_sync_log) ───
create table if not exists content_sync_log (
  id uuid primary key default uuid_generate_v4(),
  status text not null check (status in ('ok','error')),
  items_synced int not null default 0,
  detail text,
  created_at timestamptz not null default now()
);

-- ── RLS: ninguna de estas tablas tiene policy de SELECT pública ──
alter table instagram_connection enable row level security;
alter table content_sources enable row level security;
alter table content_pieces enable row level security;
alter table instagram_metrics_daily enable row level security;
alter table instagram_media_cache enable row level security;
alter table content_sync_log enable row level security;

create policy "admin_all_instagram_connection" on instagram_connection for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_content_sources" on content_sources for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_content_pieces" on content_pieces for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_instagram_metrics_daily" on instagram_metrics_daily for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_instagram_media_cache" on instagram_media_cache for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_content_sync_log" on content_sync_log for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
