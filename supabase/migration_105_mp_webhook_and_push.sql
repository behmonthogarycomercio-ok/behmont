-- Migracion 105: soporte para webhook de Mercado Pago + notificaciones push.
--
-- Contexto del bug que se esta arreglando: un cliente pago un pedido con
-- Mercado Pago y nunca impacto en el panel admin ni se genero el aviso por
-- WhatsApp. La causa: todo el guardado del pedido pasaba por el navegador
-- del cliente (sessionStorage + fetch fire-and-forget) despues de volver de
-- Mercado Pago -- si el cliente cerraba la pestana o el pago quedaba en
-- estado "pending" (Mercado Pago no hace auto_return en ese caso), nada se
-- guardaba. Esta migracion agrega lo necesario para que el pedido se
-- guarde ANTES de mandar al cliente a pagar, y el webhook de Mercado Pago
-- (server-to-server, no depende del navegador) lo actualice cuando el pago
-- se confirme.

-- 1) Columna para el numero de operacion de Mercado Pago. Unica para poder
--    deduplicar: tanto el webhook como el fallback client-side pueden
--    llegar a procesar el mismo pago, y no queremos dos filas por el mismo
--    pedido.
alter table whatsapp_orders
  add column if not exists mp_payment_id text unique;

-- 2) Suscripciones a notificaciones push del panel admin (Web Push nativo
--    del navegador, sin ningun servicio de terceros -- las claves VAPID se
--    generan localmente).
create table if not exists push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table push_subscriptions enable row level security;

-- Solo un admin autenticado puede registrar/borrar su propia suscripcion
-- desde el panel. La lectura para enviar el push la hace el webhook con la
-- service role, que bypassea RLS.
drop policy if exists "admin_manage_push_subscriptions" on push_subscriptions;
create policy "admin_manage_push_subscriptions" on push_subscriptions
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
