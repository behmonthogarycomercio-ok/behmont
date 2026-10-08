-- Migracion 119: ubicacion(es) de cada producto, con cantidad por ubicacion
-- -- el mismo producto puede tener stock repartido en varias zonas a la vez
-- (ej. 1 unidad en el Salon + el resto en Deposito Chile).
--
-- products.stock se mantiene por trigger como la suma de sus ubicaciones en
-- cuanto el producto tiene al menos una fila en product_locations -- no
-- puede ser una "generated column" porque Postgres no permite que una
-- generated column dependa de otra tabla.

create table if not exists product_locations (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  zona_id uuid not null references zonas(id) on delete restrict, -- no se puede borrar una zona con stock asignado
  quantity int not null default 0 check (quantity >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, zona_id)
);

create index if not exists idx_product_locations_product on product_locations(product_id);
create index if not exists idx_product_locations_zona on product_locations(zona_id);

drop trigger if exists trg_product_locations_updated_at on product_locations;
create trigger trg_product_locations_updated_at before update on product_locations
  for each row execute procedure set_updated_at();

create or replace function recompute_product_stock()
returns trigger as $$
declare
  pid uuid;
begin
  pid := coalesce(new.product_id, old.product_id);
  update products
     set stock = (select coalesce(sum(quantity), 0) from product_locations where product_id = pid)
   where id = pid;
  return null;
end;
$$ language plpgsql;

drop trigger if exists trg_product_locations_sync_stock on product_locations;
create trigger trg_product_locations_sync_stock
  after insert or update or delete on product_locations
  for each row execute procedure recompute_product_stock();

alter table product_locations enable row level security;
drop policy if exists "admin_all_product_locations" on product_locations;
create policy "admin_all_product_locations" on product_locations for all
  using (is_admin()) with check (is_admin());
