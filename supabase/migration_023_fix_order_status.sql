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

-- Mapear el unico dato existente con el valor viejo a uno valido nuevo.
update whatsapp_orders set status = 'pendiente' where status = 'enviado';
update whatsapp_orders set status = 'completado' where status = 'cerrado';
update whatsapp_orders set status = 'procesando' where status = 'contactado';

alter table whatsapp_orders drop constraint if exists whatsapp_orders_status_check;
alter table whatsapp_orders add constraint whatsapp_orders_status_check
  check (status in ('pendiente','procesando','completado','cancelado'));
alter table whatsapp_orders alter column status set default 'pendiente';
