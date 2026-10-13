-- Al agregar Leo/Nacho/Cristian (PINs 10-12) a DEPOSITO_STAFF, los mismos dos
-- constraints que ya se habían ampliado en migration_131 (para Sebastian/
-- Tiago/Fernando/Juani, PINs 6-9) quedaron de nuevo desactualizados y
-- bloqueaban a los vendedores nuevos.
alter table deposito_staff_secrets drop constraint if exists deposito_staff_secrets_pin_check;
alter table deposito_staff_secrets add constraint deposito_staff_secrets_pin_check check (pin between 0 and 12);

alter table preventas drop constraint if exists preventas_vendedor_pin_check;
alter table preventas add constraint preventas_vendedor_pin_check check (vendedor_pin between 0 and 12 and vendedor_pin not in (1, 2));
