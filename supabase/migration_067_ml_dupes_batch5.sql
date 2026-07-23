-- Migracion 067: 4 duplicados mas de MercadoLibre resueltos tras una
-- segunda revision de los casos que habian quedado sin resolver. El par
-- de licuadoras (2.5L y 5L, ambas Rojo) se resolvio limpio por
-- capacidad+color exactos. La gaveta de dinero por cantidad de
-- divisiones exacta. La picadora electrica por doble coincidencia
-- numerica exacta (1.5HP y 200kg/h a la vez), pese a que el stock no
-- calza tan bien como el resto (6 vs 2) -- es la mas floja de este
-- batch, se avisa por las dudas.
-- Ya aplicado directamente con la service role key.

-- OTJ-010 "Equipamientos - Licuadora Industrial 2.5 L - Rojo" <- MLA3481739042 "Licuadora Industrial 2.5 Litros Rojo Gastronomía Behmont Rojo"
-- Licuadora Industrial 2.5L Rojo (capacidad+color exactos, stock 41 vs 42)
update products set
  specs = '[{"label":"Cantidad de accesorios","value":"1"},{"label":"Material de la jarra","value":"Policarbonato"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Rojo"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Licuadora eléctrica de 2.5L"},{"label":"Color principal","value":"Rojo"},{"label":"Modelo","value":"2.5L Rojo"},{"label":"Tipo de alimentación","value":"Eléctrica"},{"label":"Usos recomendados","value":"Jugos,licuados y preparaciones"},{"label":"Capacidad total","value":"2.5 L"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'La Licuadora Industrial de 2.5 Litros de Behmont está diseñada para el uso intensivo en bares, restaurantes y casas de jugos. Motor potente que procesa hielo, frutas y verduras sin esfuerzo. Vaso de gran capacidad y construcción robusta.

* Marca: Behmont
* Capacidad: 2.5 litros
* Color: Rojo
* Motor industrial potente
* Procesa hielo, frutas y verduras
* Construcción robusta para uso intensivo
* Para bares, restaurantes y jugueras
* Alta disponibilidad de stock'
where sku = 'OTJ-010';
update products set active = false, ml_item_id = null where sku = 'MLA3481739042';

-- K80-5L "Equipamientos - Licuadora Industrial 5 L - Rojo" <- MLA3481752062 "Licuadora Industrial 5 Litros Rojo Gastronomía Behmont Rojo"
-- Licuadora Industrial 5L Rojo (capacidad+color+stock exactos)
update products set
  specs = '[{"label":"Cantidad de accesorios","value":"1"},{"label":"Material de la jarra","value":"Policarbonato"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Rojo"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Licuadora"},{"label":"Color principal","value":"Rojo"},{"label":"Modelo","value":"5L Rojo"},{"label":"Tipo de alimentación","value":"Eléctrica"},{"label":"Usos recomendados","value":"Jugos,licuados y preparaciones"},{"label":"Capacidad total","value":"5 L"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'La Licuadora Industrial de 5 Litros de Behmont es la máquina de mayor capacidad para producción de alto volumen. Motor de gran potencia y vaso de 5 litros para procesar grandes cantidades de jugos, licuados y preparaciones en restaurantes y catering.

* Marca: Behmont
* Capacidad: 5 litros
* Color: Rojo
* Motor de gran potencia
* Para producción de alto volumen
* Procesa grandes cantidades
* Para restaurantes y catering
* Construcción industrial resistente'
where sku = 'K80-5L';
update products set active = false, ml_item_id = null where sku = 'MLA3481752062';

-- 400AS "Equipamientos - Gaveta de dinero - C/monedero y 5 divisiones - Negro" <- MLA3481739040 "Gaveta De Dinero Caja Registradora 5 Divisiones Neg. Behmont Negro"
-- Gaveta de dinero 5 divisiones Negro (cantidad de divisiones exacta, stock 287 vs 291)
update products set
  specs = '[{"label":"Cantidad de compartimentos para billetes","value":"4"},{"label":"Marca","value":"BEHMONT"},{"label":"Material de la caja","value":"Acero inoxidáble"},{"label":"Tipo de cierre","value":"Llave"},{"label":"Cantidad de compartimentos para monedas","value":"5"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"400AS"},{"label":"Con bandeja extraíble","value":"Sí"}]'::jsonb,
  description = 'La Gaveta de Dinero de Behmont organiza billetes y monedas de forma segura y ordenada en tu comercio. Con monedero de 5 divisiones y bandeja extraíble, facilita el manejo de efectivo y el arqueo de caja. Compatible con impresoras y sistemas de punto de venta.

* Marca: Behmont
* Color: Negro
* Monedero con 5 divisiones
* Bandeja extraíble
* Compartimentos para billetes y monedas
* Compatible con impresora y POS
* Para comercios y puntos de venta
* Alta disponibilidad de stock'
where sku = '400AS';
update products set active = false, ml_item_id = null where sku = 'MLA3481739040';

-- TC-22 "Picadora de carne electrica 2 en 1 - 22 y 12" - 1.5 HP - 200 kg/h - Acero inox." <- MLA3481770042 "Picadora Carne Eléctrica 1.5hp 200kg/h Acero Inox Behmont"
-- Picadora electrica (1.5HP y 200kg/h coinciden exacto en ambos numeros; stock 6 vs 2, la diferencia mas floja de este batch)
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3481770042';

