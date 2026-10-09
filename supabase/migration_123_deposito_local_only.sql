-- Migracion 123: amplia el roster de personal de deposito de 4 a 6 (se
-- saca a Javier, se agregan Lucas/Luz/Lito como personal del local que
-- solo puede retirar de la zona "salon", nunca de los depositos reales) --
-- y agrega una funcion para resolver el area raiz de una zona, usada para
-- validar ese limite server-side.

alter table stock_movements drop constraint if exists stock_movements_staff_pin_check;
alter table stock_movements add constraint stock_movements_staff_pin_check
  check (staff_pin between 0 and 5);

-- Sube por parent_id hasta la zona tipo 'area' y devuelve su codigo (ej.
-- 'deposito-chile', 'salon') -- como la jerarquia tiene a lo sumo 4 niveles
-- (area/gondola/estante/division), el loop nunca itera mas de un puñado de
-- veces.
create or replace function zona_root_codigo(p_zona_id uuid)
returns text
language plpgsql
stable
as $$
declare
  v_id uuid := p_zona_id;
  v_tipo text;
  v_parent uuid;
  v_codigo text;
begin
  loop
    select tipo, parent_id, codigo into v_tipo, v_parent, v_codigo
    from zonas where id = v_id;

    if v_tipo is null then
      return null; -- zona inexistente
    end if;
    if v_tipo = 'area' then
      return v_codigo;
    end if;

    v_id := v_parent;
  end loop;
end;
$$;
