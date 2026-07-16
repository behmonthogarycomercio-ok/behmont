-- Migracion 027: "MT" era una marca genérica de un distribuidor (no una marca
-- de fábrica real) usada como comodín en 37 productos variados (bandejas,
-- mesas de trabajo, cajas fuertes, exhibidores, picadoras, etc.). Por decisión
-- del dueño, todos esos productos pasan a la marca propia "Behmont" y se
-- elimina la marca "MT".
--
-- Nota: varios de esos 37 productos tienen el nombre de fábrica real como
-- prefijo (ej. "Nativa- Exprimidor...", "Zeiler - Batidora...", "Tecnobull -
-- Carro de cliente...", "RD - Sobadora...") que se dejó intacto en el nombre;
-- solo se movió el brand_id, no se tocaron los nombres.

update products set brand_id = (select id from brands where name = 'Behmont')
where brand_id = (select id from brands where name = 'MT');

delete from brands where name = 'MT';
