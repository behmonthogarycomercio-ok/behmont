-- Migracion 129: dos canales push nuevos para preventas.
--
-- 1) cobrador_push_subscriptions: a diferencia de todo otro canal push del
--    sistema (que siempre hacen broadcast a toda la tabla), una preventa se
--    asigna a UN cobrador puntual -- el aviso tiene que llegar solo a esa
--    persona. Por eso esta tabla tiene columna `pin` y se filtra por ella,
--    en vez de select * como notifyDrivers/notifyDepositoSupervisor/etc.
--
-- 2) preventa_supervisor_push_subscriptions: mismo patron (broadcast) que
--    deposito_push_subscriptions (migration_124), para Alejandro como
--    supervisor de cobradores (se lo avisa en la escalada de 48hs).

create table if not exists cobrador_push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  pin int not null check (pin between 0 and 9),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_cobrador_push_pin on cobrador_push_subscriptions(pin);

alter table cobrador_push_subscriptions enable row level security;
drop policy if exists "admin_read_cobrador_push_subscriptions" on cobrador_push_subscriptions;
create policy "admin_read_cobrador_push_subscriptions" on cobrador_push_subscriptions for select
  using (is_admin());

create table if not exists preventa_supervisor_push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table preventa_supervisor_push_subscriptions enable row level security;
drop policy if exists "admin_read_preventa_supervisor_push_subscriptions" on preventa_supervisor_push_subscriptions;
create policy "admin_read_preventa_supervisor_push_subscriptions" on preventa_supervisor_push_subscriptions for select
  using (is_admin());
-- Ambas sin politica publica de escritura: alta/baja via API route con
-- service role, verificando identidad (PIN+codigo) antes de upsert/delete.
