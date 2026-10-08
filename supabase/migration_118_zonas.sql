-- Migracion 118: estructura de zonas/ubicaciones fisicas (depositos, salon,
-- gondolas, estantes, divisiones). Modelo generico autoreferenciado para no
-- hardcodear "2 depositos": un nodo nivel 'area' puede ser "Deposito Chile",
-- "Deposito 4to Piso" o "Salon" (stock en exhibicion), y cualquiera puede
-- tener gondolas/estantes/divisiones debajo.

create table if not exists zonas (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid references zonas(id) on delete cascade,
  tipo text not null check (tipo in ('area', 'gondola', 'estante', 'division')),
  codigo text not null,              -- '1', 'a', 'A1', 'deposito-chile'
  nombre text not null,              -- 'Depósito Chile', 'Góndola 1', 'Estante A', 'División A1'
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_zonas_parent on zonas(parent_id);
create unique index if not exists idx_zonas_parent_codigo
  on zonas (coalesce(parent_id, '00000000-0000-0000-0000-000000000000'::uuid), codigo);

-- Valida la jerarquia: area sin padre; gondola bajo area; estante bajo
-- gondola; division bajo estante. Sin esto nada impide una "division"
-- colgada directo de un "area" por error de UI.
create or replace function enforce_zona_hierarchy()
returns trigger as $$
declare
  parent_tipo text;
begin
  if new.tipo = 'area' then
    if new.parent_id is not null then
      raise exception 'Una zona de tipo area no puede tener padre';
    end if;
    return new;
  end if;
  if new.parent_id is null then
    raise exception 'Las zonas de tipo % necesitan una zona padre', new.tipo;
  end if;
  select tipo into parent_tipo from zonas where id = new.parent_id;
  if (new.tipo = 'gondola' and parent_tipo <> 'area')
     or (new.tipo = 'estante' and parent_tipo <> 'gondola')
     or (new.tipo = 'division' and parent_tipo <> 'estante') then
    raise exception 'Jerarquia invalida: % no puede ir bajo %', new.tipo, parent_tipo;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_zonas_hierarchy on zonas;
create trigger trg_zonas_hierarchy before insert or update on zonas
  for each row execute procedure enforce_zona_hierarchy();

drop trigger if exists trg_zonas_updated_at on zonas;
create trigger trg_zonas_updated_at before update on zonas
  for each row execute procedure set_updated_at();

alter table zonas enable row level security;
drop policy if exists "admin_all_zonas" on zonas;
create policy "admin_all_zonas" on zonas for all
  using (is_admin()) with check (is_admin());
-- Sin politica publica: la terminal /deposito y la gestion de Gabriel leen/
-- escriben via API routes con service role (bypassea RLS), igual que /envios.

insert into zonas (tipo, codigo, nombre, sort_order) values
  ('area', 'deposito-chile', 'Depósito Chile', 0),
  ('area', 'deposito-4to-piso', 'Depósito 4to Piso', 1),
  ('area', 'salon', 'Salón (exhibición)', 2)
on conflict do nothing;
