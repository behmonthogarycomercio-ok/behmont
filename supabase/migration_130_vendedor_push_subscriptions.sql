-- Avisos push por-vendedor (igual patron que cobrador_push_subscriptions):
-- el vendedor necesita enterarse cuando SU preventa es rechazada por Gabriel
-- o resuelta por el cobrador, asi que se filtra por pin, no broadcast.
create table if not exists vendedor_push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  pin int not null check (pin between 0 and 9),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_vendedor_push_pin on vendedor_push_subscriptions(pin);
alter table vendedor_push_subscriptions enable row level security;
create policy "admin_read_vendedor_push_subscriptions" on vendedor_push_subscriptions for select
  using (is_admin());
