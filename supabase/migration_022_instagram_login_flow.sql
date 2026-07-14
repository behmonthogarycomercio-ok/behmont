-- Migracion 022: ajusta instagram_connection al flujo REAL de la app de Meta.
--
-- En migration_021 se asumio el flujo "Instagram API with Facebook Login for
-- Business" (login vinculado a una Pagina de Facebook, con page_id/page_name/
-- page_access_token). Al configurar la app en developers.facebook.com se
-- descubrio que quedo armada como "Instagram API with Instagram Login"
-- (Business Login for Instagram): login directo contra instagram.com, con
-- credenciales de app propias de Instagram (IG_APP_ID/IG_APP_SECRET, distintas
-- del App ID/Secret de Facebook) y un unico access_token por cuenta, sin pasar
-- por Facebook Pages en ningun momento.
--
-- Como todavia no se habia conectado ninguna cuenta real (la tabla estaba
-- vacia), se recrea directamente en vez de migrar datos.

drop table if exists instagram_connection;

create table instagram_connection (
  id text primary key default 'main' check (id = 'main'),
  ig_user_id text not null unique,
  ig_username text,
  access_token text not null,
  token_expires_at timestamptz not null,
  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table instagram_connection enable row level security;

-- Misma politica que las demas tablas de este modulo: sin SELECT publico,
-- solo admin autenticado o service role.
create policy "admin_all_instagram_connection" on instagram_connection for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
