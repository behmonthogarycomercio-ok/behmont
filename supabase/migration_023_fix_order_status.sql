-- Migracion 023: corrige un bug real en el estado de los pedidos.
--
-- La tabla whatsapp_orders tenia un check constraint que solo permitia
-- status en ('enviado','contactado','cerrado'), pero:
--  - el panel de admin (/admin/pedidos) usa 'pendiente'/'procesando'/
--    'completado'/'cancelado' en los botones de "Cambiar estado" y en los
--    badges/filtros.
--  - el guardado de pedidos pagados por Mercado Pago (api/mp/save-order)
--    inserta status 'completado' o 'pendiente'.
-- Ninguno de esos valores pasaba el check constraint viejo, asi que TODOS
-- los pedidos pagados por Mercado Pago fallaban al guardarse en la base
-- (el insert nunca se verificaba por error en el codigo, asi que fallaba en
-- silencio) y el boton "Cambiar estado" del panel tampoco funcionaba nunca
-- para ningun pedido.
--
-- Nota sobre los intentos anteriores de esta misma migracion: el primero
-- asumia mal el nombre del constraint viejo. El segundo lo buscaba bien por
-- definicion, pero borraba el constraint DESPUES de intentar actualizar los
-- datos -- y esa misma actualizacion (enviado -> pendiente) ya violaba el
-- constraint viejo, todavia activo en ese momento. Esta version borra el
-- constraint viejo PRIMERO, antes de tocar ningun dato.

-- 1) Borrar primero cualquier check constraint existente sobre
--    whatsapp_orders que mencione los valores viejos (sin depender de
--    adivinar su nombre).
do $$
declare
  r record;
begin
  for r in
    select conname
    from pg_constraint
    where conrelid = 'whatsapp_orders'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%enviado%'
  loop
    execute format('alter table whatsapp_orders drop constraint %I', r.conname);
  end loop;
end $$;

-- 2) Recien ahora, con el constraint viejo afuera, migrar los datos existentes.
update whatsapp_orders set status = 'pendiente' where status = 'enviado';
update whatsapp_orders set status = 'completado' where status = 'cerrado';
update whatsapp_orders set status = 'procesando' where status = 'contactado';

-- 3) Agregar el constraint nuevo y el default correcto.
alter table whatsapp_orders add constraint whatsapp_orders_status_check_v2
  check (status in ('pendiente','procesando','completado','cancelado'));
alter table whatsapp_orders alter column status set default 'pendiente';
