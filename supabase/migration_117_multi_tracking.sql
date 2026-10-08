-- Migracion 117: un envio puede tener mas de un numero de seguimiento --
-- las ventas por fuera de MercadoLibre que se mandan a todo el pais por
-- Andreani a veces se despachan en mas de un paquete, cada uno con su
-- propio codigo. "numero_seguimiento" (texto unico) pasa a ser
-- "numeros_seguimiento" (array).

alter table ml_shipments add column if not exists numeros_seguimiento text[] not null default '{}';

update ml_shipments
set numeros_seguimiento = array[numero_seguimiento]
where numero_seguimiento is not null and numero_seguimiento <> '';

alter table ml_shipments drop column if exists numero_seguimiento;
