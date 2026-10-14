-- Migracion 135: /envios (terminal del repartidor) separa los envíos de
-- MercadoLibre de los que se cargan por ciudad (sobre todo los que vienen
-- de una preventa aprobada, donde ya se sabe la ciudad del cliente).
alter table ml_shipments add column if not exists ciudad text;
create index if not exists idx_ml_shipments_ciudad on ml_shipments(ciudad);
