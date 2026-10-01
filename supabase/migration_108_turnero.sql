-- Migracion 108: turnero del salon (tablet en el local).
--
-- Contexto: en el local hay una tablet donde el cliente elige quien lo
-- atiende (Lucas, Luz o Lito). Al elegir, la persona elegida recibe un
-- aviso push en su celular, y queda un registro con hora + si el cliente
-- ya era de alguno de los tres o es primera vez en BEHMONT -- esto permite
-- despues ver en el panel admin cuanta gente entra por dia y cuantos son
-- nuevos vs fidelizados.

-- 1) Registro de cada turno pedido desde la tablet.
create table if not exists turnero_visits (
  id uuid primary key default uuid_generate_v4(),
  attended_by text not null check (attended_by in ('lucas', 'luz', 'lito')),
  -- de quien es cliente habitual (si lo es); null = primera vez en BEHMONT.
  -- puede ser distinto de attended_by (ej: es cliente de Lucas pero hoy lo
  -- atiende Luz porque Lucas esta ocupado).
  regular_of text check (regular_of in ('lucas', 'luz', 'lito')),
  created_at timestamptz not null default now()
);

alter table turnero_visits enable row level security;

-- El insert lo hace la API route con la service role (sin login, la tablet
-- no tiene sesion de admin) -- bypassea RLS. Solo un admin autenticado
-- puede leer el registro desde el panel.
drop policy if exists "admin_read_turnero_visits" on turnero_visits;
create policy "admin_read_turnero_visits" on turnero_visits for select
  using (is_admin());

-- 2) Suscripciones push de Lucas/Luz/Lito (una por persona, en su propio
--    celular -- activada una vez desde un link privado /turnero/<nombre>/activar,
--    sin necesitar cuenta de admin). Separada de `push_subscriptions`
--    (que es para el aviso de pedidos nuevos en el panel) porque el envio
--    tiene que filtrar por destinatario, no mandarse a todos los admins.
create table if not exists staff_push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  staff text not null check (staff in ('lucas', 'luz', 'lito')),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table staff_push_subscriptions enable row level security;
-- Sin politicas publicas a proposito: el alta/baja y el envio del push los
-- hacen las API routes con la service role (igual que `rate_limits`).
