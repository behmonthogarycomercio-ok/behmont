-- Migracion 111: seguimiento de envios pendientes de MercadoLibre.
--
-- Contexto: toda venta de MercadoLibre la entrega el repartidor propio --
-- directo al domicilio del comprador (Flex / acordado) o hasta la sucursal
-- del transporte que haya elegido el comprador (ej. Andreani), nunca pasan
-- a buscarlo. Esta tabla guarda un pendiente por cada venta pagada, creado
-- automaticamente desde el webhook de ML (ver /api/ml/webhook), para que
-- el repartidor (sin cuenta de admin, via /envios) y el panel admin
-- (/admin/envios) vean lo mismo: que falta entregar, que esta entregado,
-- que esta retrasado.

create table if not exists ml_shipments (
  id uuid primary key default uuid_generate_v4(),
  ml_order_id bigint not null unique,
  ml_shipment_id text,
  status text not null default 'pendiente' check (status in ('pendiente', 'entregado', 'cancelado')),
  -- derivado del logistic_type que devuelve la API de Shipments de ML:
  --   self_service / custom     -> domicilio (Flex / acordado directo)
  --   drop_off / cross_docking  -> sucursal_andreani (repartidor deja en la sucursal del transporte)
  --   cualquier otro / desconocido -> otro
  destino_tipo text not null default 'otro' check (destino_tipo in ('domicilio', 'sucursal_andreani', 'otro')),
  destino_detalle text,              -- direccion + nombre/telefono del comprador, o sucursal + transporte
  buyer_nickname text,
  items jsonb not null default '[]', -- [{ title, quantity }]
  total numeric(12,2),
  logistic_type text,                -- valor crudo de ML, para debug
  ml_status text,                    -- status crudo del shipment en ML, para debug
  estimated_delivery_date date,      -- si ML la da; si no, se infiere "retrasado" por antiguedad
  notes text,
  delivered_at timestamptz,
  delivered_by text,
  created_at timestamptz not null default now()
);

alter table ml_shipments enable row level security;
drop policy if exists "admin_all_ml_shipments" on ml_shipments;
create policy "admin_all_ml_shipments" on ml_shipments for all
  using (is_admin()) with check (is_admin());

-- Suscripciones push de los repartidores -- compartida, no es por persona
-- (son 2 y cualquiera puede tomar cualquier entrega), mismo patron que
-- staff_push_subscriptions pero sin columna de "a quien pertenece".
create table if not exists driver_push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table driver_push_subscriptions enable row level security;
-- Sin politicas publicas a proposito: el alta/baja y el envio del push los
-- hacen las API routes con la service role (igual que staff_push_subscriptions).
