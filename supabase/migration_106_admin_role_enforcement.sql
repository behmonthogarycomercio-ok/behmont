-- Migracion 106: hace cumplir el rol de admin de verdad en RLS.
--
-- PROBLEMA ENCONTRADO (critico): la tabla profiles existe desde el schema
-- inicial con una columna "role" pensada para distinguir admins, pero
-- NINGUNA politica RLS la usa. Todas las politicas "admin_*" de products,
-- categories, brands, promotions, discounts, whatsapp_orders, site_settings,
-- ml_sync_log, instagram_*, content_*, push_subscriptions y el storage de
-- product-images usan "auth.uid() is not null" -- es decir, CUALQUIER
-- usuario autenticado (no necesariamente admin) tiene control total.
--
-- Combinado con que en Supabase Auth > Sign In / Providers estaba activado
-- "Allow new users to sign up" (y el codigo del sitio no usa signUp() en
-- ningun lado, confirmado por busqueda -- no hay flujo legitimo que lo
-- necesite), cualquiera podia:
--   1. Crear una cuenta llamando directo a la API de Supabase Auth con la
--      anon key (publica, esta en el JS del sitio) -- sin pasar por ningun
--      formulario del sitio.
--   2. Con esa sesion, tener CRUD total sobre productos, ver todos los
--      pedidos (nombre/telefono/direccion de clientes), y escribir en
--      site_settings (que guarda tokens de ML/MP).
--
-- Esta migracion:
--   1. Da de alta en profiles al unico usuario existente hoy (confirmado
--      por conteo: 1 fila en auth.users) para no perder acceso al aplicar
--      las politicas nuevas.
--   2. Crea is_admin(), funcion SECURITY DEFINER que chequea membresia real
--      en profiles (bypassea RLS de profiles internamente para evitar
--      recursion).
--   3. Reemplaza TODAS las politicas "admin_*"/similares para usar
--      is_admin() en vez de "auth.uid() is not null".
--   4. Activa RLS en "coupons" (estaba con RLS deshabilitado por completo:
--      cualquiera con la anon key podia crear/editar/borrar cupones de
--      descuento via la API REST de Supabase) y agrega politica de admin
--      en "newsletter_subscribers" (RLS ya estaba activo ahi pero sin
--      ninguna politica -- lo que de paso bloqueaba al propio admin).
--
-- IMPORTANTE despues de correr esto: en Supabase Dashboard > Authentication
-- > Sign In / Providers, desactivar "Allow new users to sign up" (no hay
-- ningun flujo del sitio que lo necesite). Para agregar un admin nuevo en el
-- futuro, crearlo desde Authentication > Users y despues insertar su fila
-- en profiles a mano (ver ejemplo al final de este archivo, comentado).

-- 1) Alta del/los admin(es) ya existentes -----------------------------
insert into profiles (id, role)
select id, 'admin' from auth.users
on conflict (id) do nothing;

-- 2) Funcion is_admin() ------------------------------------------------
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from profiles where id = auth.uid());
$$;

-- 3) Reemplazo de politicas ---------------------------------------------

-- categories / products / brands / promotions / discounts
drop policy if exists "admin_all_categories" on categories;
create policy "admin_all_categories" on categories for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_products" on products;
create policy "admin_all_products" on products for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_brands" on brands;
create policy "admin_all_brands" on brands for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_promotions" on promotions;
create policy "admin_all_promotions" on promotions for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_discounts" on discounts;
create policy "admin_all_discounts" on discounts for all
  using (is_admin()) with check (is_admin());

-- whatsapp_orders (select / update / delete -- insert sigue publico)
drop policy if exists "admin_read_orders" on whatsapp_orders;
create policy "admin_read_orders" on whatsapp_orders for select
  using (is_admin());

drop policy if exists "admin_update_orders" on whatsapp_orders;
create policy "admin_update_orders" on whatsapp_orders for update
  using (is_admin());

drop policy if exists "admin_delete_orders" on whatsapp_orders;
create policy "admin_delete_orders" on whatsapp_orders for delete
  using (is_admin());

-- ml_sync_log
drop policy if exists "admin_read_ml_log" on ml_sync_log;
create policy "admin_read_ml_log" on ml_sync_log for select
  using (is_admin());

drop policy if exists "admin_write_ml_log" on ml_sync_log;
create policy "admin_write_ml_log" on ml_sync_log for insert
  with check (is_admin());

-- site_settings (la lectura publica restringida de migration_018 no se toca)
drop policy if exists "admin_write_settings" on site_settings;
create policy "admin_write_settings" on site_settings for all
  using (is_admin()) with check (is_admin());

-- profiles
drop policy if exists "admin_read_profiles" on profiles;
create policy "admin_read_profiles" on profiles for select
  using (is_admin());

-- storage: product-images
drop policy if exists "admin_upload_product_images" on storage.objects;
create policy "admin_upload_product_images" on storage.objects for insert
  with check (bucket_id = 'product-images' and is_admin());

drop policy if exists "admin_manage_product_images" on storage.objects;
create policy "admin_manage_product_images" on storage.objects for update
  using (bucket_id = 'product-images' and is_admin());

drop policy if exists "admin_delete_product_images" on storage.objects;
create policy "admin_delete_product_images" on storage.objects for delete
  using (bucket_id = 'product-images' and is_admin());

-- instagram / contenido (migration_021 y 022)
drop policy if exists "admin_all_instagram_connection" on instagram_connection;
create policy "admin_all_instagram_connection" on instagram_connection for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_content_sources" on content_sources;
create policy "admin_all_content_sources" on content_sources for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_content_pieces" on content_pieces;
create policy "admin_all_content_pieces" on content_pieces for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_instagram_metrics_daily" on instagram_metrics_daily;
create policy "admin_all_instagram_metrics_daily" on instagram_metrics_daily for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_instagram_media_cache" on instagram_media_cache;
create policy "admin_all_instagram_media_cache" on instagram_media_cache for all
  using (is_admin()) with check (is_admin());

drop policy if exists "admin_all_content_sync_log" on content_sync_log;
create policy "admin_all_content_sync_log" on content_sync_log for all
  using (is_admin()) with check (is_admin());

-- push_subscriptions (migration_105)
drop policy if exists "admin_manage_push_subscriptions" on push_subscriptions;
create policy "admin_manage_push_subscriptions" on push_subscriptions for all
  using (is_admin()) with check (is_admin());

-- 4) coupons: RLS estaba completamente deshabilitado ---------------------
alter table coupons enable row level security;

drop policy if exists "public_read_coupons" on coupons;
create policy "public_read_coupons" on coupons for select
  using (active = true);

drop policy if exists "admin_all_coupons" on coupons;
create policy "admin_all_coupons" on coupons for all
  using (is_admin()) with check (is_admin());

-- newsletter_subscribers: RLS ya estaba activo pero sin ninguna politica
-- (el insert publico funciona igual porque la API route usa service role,
-- que bypassea RLS -- pero esto tambien bloqueaba a un admin real que
-- quisiera consultarlos desde el panel con su propia sesion).
drop policy if exists "admin_all_newsletter_subscribers" on newsletter_subscribers;
create policy "admin_all_newsletter_subscribers" on newsletter_subscribers for all
  using (is_admin()) with check (is_admin());

-- ============================================================
-- Para agregar un admin nuevo en el futuro (despues de crearlo en
-- Authentication > Users con email/password):
--
--   insert into profiles (id, role)
--   values ('<uuid-del-nuevo-usuario>', 'admin');
-- ============================================================
