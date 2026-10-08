-- Migracion 120: auditoria de retiros/ingresos de mercaderia desde la
-- terminal del deposito -- responde "quien saco/ingreso el producto X y
-- cuando". staff_name queda duplicado (no solo staff_pin) para que el
-- historial no se rompa si el dia de mañana se reasigna un numero de PIN
-- a otra persona.

create table if not exists stock_movements (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  zona_id uuid references zonas(id) on delete set null, -- se mantiene el registro aunque la zona se borre despues
  tipo text not null check (tipo in ('ingreso', 'retiro', 'ajuste')),
  quantity int not null check (quantity > 0),
  staff_pin int not null check (staff_pin between 0 and 3),
  staff_name text not null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists idx_stock_movements_product on stock_movements(product_id, created_at desc);
create index if not exists idx_stock_movements_zona on stock_movements(zona_id);

alter table stock_movements enable row level security;
-- Mismo patron que turnero_visits (migration_108): el insert lo hace la API
-- route con service role (sin login) -- solo el panel admin autenticado
-- puede leer el historial.
drop policy if exists "admin_read_stock_movements" on stock_movements;
create policy "admin_read_stock_movements" on stock_movements for select
  using (is_admin());
