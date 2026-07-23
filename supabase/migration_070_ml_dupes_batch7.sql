-- Migracion 070: 1 duplicado mas de MercadoLibre - segunda publicacion
-- de ML para el mismo producto HF-150 ya fusionado en migration_066
-- (codigo "Hf-150" y stock identicos entre ambas publicaciones).
-- Ya aplicado directamente con la service role key.

-- HF-150 "Hamburguesera articulada 150 mm" <- MLA2203653630 "Moldeador De Hamburguesas 150mm Articulado Hf-150 Behmont"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA2203653630';
