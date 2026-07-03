-- ============================================================
-- BEHMONT-IMP · Schema de base de datos (Supabase / Postgres)
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

create extension if not exists "uuid-ossp";

-- ── PERFILES / ROLES DE ADMIN ─────────────────────────────
-- Usa Supabase Auth para el login; esta tabla marca quién es admin.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- ── MARCAS ────────────────────────────────────────────────
create table if not exists brands (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  logo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── CATEGORÍAS ────────────────────────────────────────────
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  icon_url text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── PRODUCTOS ─────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  sku text not null unique,                    -- código interno
  name text not null,
  slug text not null unique,
  description text,
  category_id uuid references categories(id) on delete set null,
  brand_id uuid references brands(id) on delete set null,
  price numeric(12,2) not null default 0,
  compare_at_price numeric(12,2),               -- precio "antes de" -> calcula % off
  stock int not null default 0,
  images jsonb not null default '[]'::jsonb,    -- ["https://.../1.jpg", ...]
  active boolean not null default true,
  featured boolean not null default false,
  -- Integración MercadoLibre (se completa vía sync automático)
  ml_item_id text unique,
  ml_permalink text,
  ml_last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_active on products(active);
create index if not exists idx_products_ml_item on products(ml_item_id);

-- ── PROMOCIONES / BANNERS ─────────────────────────────────
create table if not exists promotions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text,
  image_url text,
  cta_text text default 'Ver productos',
  cta_link text,                                -- ej: /categoria/frio
  placement text not null default 'hero' check (placement in ('hero','banner','strip')),
  sort_order int not null default 0,
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

-- ── DESCUENTOS (aplicables a producto o categoría) ────────
create table if not exists discounts (
  id uuid primary key default uuid_generate_v4(),
  label text not null,                          -- ej: "25% OFF en un pago de contado"
  percent numeric(5,2) not null,
  category_id uuid references categories(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  constraint discount_target check (category_id is not null or product_id is not null)
);

-- ── PEDIDOS POR WHATSAPP (log) ────────────────────────────
create table if not exists whatsapp_orders (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  customer_address text,
  customer_note text,
  items jsonb not null,                         -- [{sku,name,qty,price}]
  total numeric(12,2),
  message_text text not null,
  status text not null default 'enviado' check (status in ('enviado','contactado','cerrado')),
  created_at timestamptz not null default now()
);

-- ── LOG DE SINCRONIZACIÓN MERCADOLIBRE ────────────────────
create table if not exists ml_sync_log (
  id uuid primary key default uuid_generate_v4(),
  status text not null check (status in ('ok','error')),
  items_synced int not null default 0,
  detail text,
  created_at timestamptz not null default now()
);

-- ── CONFIGURACIÓN DEL SITIO (clave/valor) ─────────────────
create table if not exists site_settings (
  key text primary key,
  value text
);
insert into site_settings (key, value) values
  ('whatsapp_number', ''),
  ('ml_store_url', ''),
  ('ml_seller_id', ''),
  ('site_name', 'BEHMONT — Comercio y Hogar'),
  ('contact_email', ''),
  ('contact_phone', ''),
  ('contact_address', ''),
  ('instagram_url', ''),
  ('business_hours', '')
on conflict (key) do nothing;

-- ── updated_at automático en products ─────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on products;
create trigger trg_products_updated_at
  before update on products
  for each row execute procedure set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table categories enable row level security;
alter table products enable row level security;
alter table brands enable row level security;
alter table promotions enable row level security;
alter table discounts enable row level security;
alter table whatsapp_orders enable row level security;
alter table ml_sync_log enable row level security;
alter table site_settings enable row level security;
alter table profiles enable row level security;

-- Lectura pública de catálogo (solo lo activo)
create policy "public_read_categories" on categories for select using (active = true);
create policy "public_read_products" on products for select using (active = true);
create policy "public_read_brands" on brands for select using (true);
create policy "public_read_promotions" on promotions for select using (active = true);
create policy "public_read_discounts" on discounts for select using (active = true);
create policy "public_read_settings" on site_settings for select using (true);

-- Cualquiera puede crear un pedido (formulario público), pero no leerlos
create policy "public_insert_orders" on whatsapp_orders for insert with check (true);

-- Administradores autenticados: control total
create policy "admin_all_categories" on categories for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_products" on products for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_brands" on brands for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_promotions" on promotions for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_all_discounts" on discounts for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_read_orders" on whatsapp_orders for select
  using (auth.uid() is not null);
create policy "admin_update_orders" on whatsapp_orders for update
  using (auth.uid() is not null);
create policy "admin_read_ml_log" on ml_sync_log for select
  using (auth.uid() is not null);
create policy "admin_write_settings" on site_settings for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_read_profiles" on profiles for select
  using (auth.uid() is not null);

-- ============================================================
-- Storage bucket para imágenes de productos (correr una sola vez)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "public_read_product_images" on storage.objects for select
  using (bucket_id = 'product-images');
create policy "admin_upload_product_images" on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.uid() is not null);
create policy "admin_manage_product_images" on storage.objects for update
  using (bucket_id = 'product-images' and auth.uid() is not null);
create policy "admin_delete_product_images" on storage.objects for delete
  using (bucket_id = 'product-images' and auth.uid() is not null);

-- ============================================================
-- Datos de categorías, marcas y productos: ver seed_categories.sql,
-- seed_brands.sql y seed_products.sql (se corren después de este schema).
-- ============================================================
