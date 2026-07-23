-- Migracion 069: sincroniza el stock de los 26 productos fusionados en
-- las migraciones 066, 067 y 068 (mismo criterio que migration_065: el
-- stock de ML es mas confiable que el del distribuidor, que no se
-- descuenta con ventas de la web).
-- Ya aplicado directamente con la service role key.

update products set stock = 42 where sku = 'OTJ-010'; -- era 41
update products set stock = 291 where sku = '400AS'; -- era 287
update products set stock = 2 where sku = 'TC-22'; -- era 6
update products set stock = 45 where sku = '517-7'; -- era 46
