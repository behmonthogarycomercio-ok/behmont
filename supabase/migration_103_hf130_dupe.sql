-- Migracion 103: unifica el duplicado de "Hamburguesera articulada 130mm"
-- en Carnicería. A diferencia de sus hermanas HF-100 y HF-150 (que tienen
-- SKU propio del distribuidor y una publicacion de ML ya desactivada),
-- para 130mm nunca existio una fila "HF-130" del distribuidor: quedaron
-- dos filas de origen ML activas al mismo tiempo, ambas con
-- "Modelo: HF-130" en sus specs (mismo producto fisico).
--
-- Se eligio conservar MLA2203756154 (precio $323.000, coherente con la
-- progresion HF-100 $222.920 / HF-150 $381.390, marca cargada
-- correctamente) renombrandola a "HF-130" para seguir el mismo patron de
-- SKU que sus hermanas. Se desactivo MLA3481742598 (precio $361.000,
-- tenia un dato erroneo propio: specs decia "Voltaje: 220V" para un
-- producto manual a palanca sin motor).
--
-- Ya aplicado directamente con la service role key.

update products set sku = 'HF-130' where sku = 'MLA2203756154';
update products set active = false where sku = 'MLA3481742598';
