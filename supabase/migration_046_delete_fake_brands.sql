-- Migracion 046: borra 2 "marcas" mal cargadas (en realidad son el nombre
-- del producto, no una marca real). Cada una tiene 1 solo producto asociado
-- (SLB-97 y SK-TV); products.brand_id tiene "on delete set null", asi que
-- esos productos quedan sin marca asignada (correcto, no tenian marca real).

delete from brands where name = 'Soporte de Tv 13 a 37 Movimiento 90º Inclinacion 5 a 15º hasta 25 Kg';
delete from brands where name = 'Tender Vertical de Ropa 3 Niveles con Ruedas';
