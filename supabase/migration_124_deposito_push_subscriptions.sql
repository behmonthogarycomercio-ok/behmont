-- Migracion 124: suscripciones push de Gabriel (jefe de deposito) para
-- enterarse de cada retiro/ingreso sin tener que entrar al panel. El admin
-- reusa el canal de avisos que ya existe (push_subscriptions / notifyAdmins).

create table if not exists deposito_push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table deposito_push_subscriptions enable row level security;
drop policy if exists "admin_read_deposito_push_subscriptions" on deposito_push_subscriptions;
create policy "admin_read_deposito_push_subscriptions" on deposito_push_subscriptions for select
  using (is_admin());
-- Sin politica de escritura publica: el alta/baja la hace la API route con
-- service role, verificando que quien pide suscribirse es realmente Gabriel
-- (PIN + codigo secreto), igual que el resto de /api/deposito/*.
