create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text not null,
  discount_pct integer,
  valid_until date,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
