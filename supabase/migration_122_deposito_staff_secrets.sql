-- Migracion 122: codigo secreto por persona para la terminal /deposito.
-- El numero 0-3 (Javier/Gabriel/Alejandro/Facundo) identifica QUIEN dice
-- ser, pero hasta ahora no habia nada que probara que es esa persona --
-- cualquiera podia tocar "2 - Alejandro" y actuar en su nombre. Este codigo
-- (hash + salt, nunca texto plano) se valida server-side en cada accion
-- (retiro, ingreso, zonas, fotos), no solo al entrar.

create table if not exists deposito_staff_secrets (
  pin int primary key check (pin between 0 and 5),
  secret_hash text not null,
  secret_salt text not null,
  updated_at timestamptz not null default now()
);

alter table deposito_staff_secrets enable row level security;
drop policy if exists "admin_all_deposito_staff_secrets" on deposito_staff_secrets;
create policy "admin_all_deposito_staff_secrets" on deposito_staff_secrets for all
  using (is_admin()) with check (is_admin());
-- Sin politica publica: la terminal valida el codigo via API route con
-- service role (igual que el resto de /api/deposito/*); nunca se lee esta
-- tabla con la anon key.
