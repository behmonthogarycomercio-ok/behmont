-- Migracion 065: sincroniza el stock de los 99 productos del
-- distribuidor que recibieron fotos/specs de un duplicado de
-- MercadoLibre (migraciones 057 a 064), usando el stock de la
-- publicacion de ML como fuente real: el stock del distribuidor nunca
-- se descuenta con las ventas de la web, mientras que el de ML si se
-- actualiza. Se toma el stock de ML tal cual (para los 5 casos con dos
-- publicaciones de ML apuntando al mismo producto, ambas coincidian en
-- el mismo numero de stock).
-- Ya aplicado directamente con la service role key.

update products set stock = 25 where sku = 'BX-3043'; -- era 14
update products set stock = 25 where sku = 'BX-1091B'; -- era 13
update products set stock = 10 where sku = 'W-AF051'; -- era 15
update products set stock = 10 where sku = 'BX-2687B'; -- era 19
update products set stock = 35 where sku = 'BX-3077'; -- era 15
update products set stock = 30 where sku = 'JA25-179'; -- era 25
update products set stock = 25 where sku = 'BX-2063'; -- era 15
update products set stock = 25 where sku = 'JA25-180'; -- era 27
update products set stock = 2 where sku = 'BX-2947-2'; -- era 1
update products set stock = 50 where sku = 'JA25-182'; -- era 36
update products set stock = 19 where sku = '517-3'; -- era 20
update products set stock = 19 where sku = '517-1'; -- era 21
update products set stock = 37 where sku = '25-YXH104'; -- era 40
update products set stock = 4 where sku = 'BC-10'; -- era 3
update products set stock = 41 where sku = 'XC-16'; -- era 42
update products set stock = 25 where sku = '25-YJ02'; -- era 24
update products set stock = 6 where sku = 'TC-22'; -- era 0
update products set stock = 2 where sku = 'BX-31205'; -- era 1
update products set stock = 2 where sku = '25-JAY02'; -- era 0
update products set stock = 26 where sku = 'NB-210-N'; -- era 31
update products set stock = 4 where sku = 'FC-850-12'; -- era 5
update products set stock = 5 where sku = 'KJT-VLKITATRD'; -- era 4
update products set stock = 1 where sku = 'C10'; -- era 2
update products set stock = 39 where sku = 'SF-200'; -- era 49
update products set stock = 25 where sku = 'JA25-183'; -- era 24
update products set stock = 24 where sku = 'JA25-185'; -- era 22
update products set stock = 42 where sku = 'LF-910'; -- era 45
update products set stock = 2 where sku = 'LF-1440'; -- era 4
update products set stock = 3 where sku = '4300FG'; -- era 1
