-- Migracion 113: datos de envio para las cargas manuales (venta por fuera de
-- MercadoLibre). A veces se saben al cargar la venta, pero muchas veces el
-- paquete se termina despachando como "encomienda en mostrador" (se decide
-- en la agencia del transportista) y recien ahi se sabe el transportista,
-- el numero de seguimiento y el precio asegurado (valor declarado para el
-- seguro) -- por eso tienen que poder completarse despues, no solo al crear
-- el pendiente.

alter table ml_shipments add column if not exists transportista text;
alter table ml_shipments add column if not exists numero_seguimiento text;
alter table ml_shipments add column if not exists precio_asegurado numeric(12,2);
