-- Migracion 127: codigo secreto por cobrador, igual patron que
-- deposito_staff_secrets (migration_122) pero para el roster nuevo de
-- cobradores (10 personas, no son staff de deposito). Prueba que quien
-- dice ser "Sergio" realmente lo es, server-side, en cada accion.

create table if not exists cobrador_staff_secrets (
  pin int primary key check (pin between 0 and 9),
  secret_hash text not null,
  secret_salt text not null,
  updated_at timestamptz not null default now()
);

alter table cobrador_staff_secrets enable row level security;
drop policy if exists "admin_all_cobrador_staff_secrets" on cobrador_staff_secrets;
create policy "admin_all_cobrador_staff_secrets" on cobrador_staff_secrets for all
  using (is_admin()) with check (is_admin());
-- Sin politica publica: se escribe desde /admin (service role) y se valida
-- desde /api/ventas/cobrador/* con service role, igual que /api/deposito/*.
