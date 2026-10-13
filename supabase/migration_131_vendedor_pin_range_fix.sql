-- Al agregar Sebastian/Tiago/Fernando/Juani (PINs 6-9) a DEPOSITO_STAFF, dos
-- constraints quedaron desactualizados y bloqueaban los pines nuevos:
-- deposito_staff_secrets.pin seguia limitado a 0-5 (migration_122, cuando
-- el roster solo tenia hasta Lito), y preventas.vendedor_pin tenia la lista
-- vieja de vendedores hardcodeada (migration_128, cuando solo Gabriel/Lucas/
-- Luz/Lito podian cargar preventas).
alter table deposito_staff_secrets drop constraint if exists deposito_staff_secrets_pin_check;
alter table deposito_staff_secrets add constraint deposito_staff_secrets_pin_check check (pin between 0 and 9);

alter table preventas drop constraint if exists preventas_vendedor_pin_check;
alter table preventas add constraint preventas_vendedor_pin_check check (vendedor_pin between 0 and 9 and vendedor_pin not in (1, 2));
