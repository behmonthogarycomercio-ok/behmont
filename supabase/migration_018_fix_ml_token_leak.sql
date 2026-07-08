-- Migracion 018: cierra una fuga de seguridad y corrige bugs del sync de
-- MercadoLibre.
--
-- PROBLEMA ENCONTRADO (grave): la politica RLS "public_read_settings" en
-- site_settings usaba "using (true)", es decir CUALQUIERA con la clave
-- publica anon (NEXT_PUBLIC_SUPABASE_ANON_KEY, que por diseno es publica y
-- esta en el codigo del sitio) podia leer TODAS las filas de site_settings,
-- incluidas ml_access_token y ml_refresh_token en texto plano. Se confirmo
-- en esta sesion: se pudieron leer ambos tokens reales con un simple query
-- anonimo. Esto es la causa mas probable de que el sync de ML "deje de
-- funcionar de golpe": si alguien (un bot, un scanner, cualquiera que
-- inspeccione el trafico del sitio) uso ese refresh_token filtrado para
-- pedir un token nuevo, MercadoLibre invalida el refresh_token anterior
-- (son de un solo uso), y el proximo intento de sync desde el sitio real
-- falla con "invalid_grant" sin ningun aviso claro.
--
-- Esta migracion restringe la lectura publica de site_settings a solo las
-- claves que en efecto necesita el sitio publico (whatsapp, redes, horarios,
-- link de la tienda ML, nombre del sitio) y bloquea ml_access_token,
-- ml_refresh_token y ml_seller_id del acceso anonimo. El admin autenticado
-- sigue teniendo acceso total via la policy "admin_write_settings" ya
-- existente (no se toca).

drop policy if exists "public_read_settings" on site_settings;

create policy "public_read_settings" on site_settings for select
  using (key not in ('ml_access_token', 'ml_refresh_token', 'ml_seller_id'));

-- Tambien faltaba una policy de INSERT/UPDATE explicita para que el cron
-- (que usa la service role key, no afectada por RLS) pueda escribir en
-- ml_sync_log — la service role ya bypassea RLS igual, pero se deja
-- documentado por si en el futuro se llama a ml_sync_log desde un contexto
-- autenticado por sesion en vez de service role.
drop policy if exists "admin_write_ml_log" on ml_sync_log;
create policy "admin_write_ml_log" on ml_sync_log for insert
  with check (auth.uid() is not null);

-- IMPORTANTE despues de correr esto: como el refresh_token pudo haber sido
-- usado por un tercero mientras estuvo expuesto, conviene re-autorizar la
-- app desde cero (no alcanza con que el token "parezca" valido ahora):
--   1. Ir a /admin/marcas
--   2. Click en "Conectar con MercadoLibre" de nuevo (aunque ya figure
--      conectado) para generar un par de tokens totalmente nuevo.
--   3. Probar "Sincronizar ahora".
