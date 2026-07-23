-- Migracion 071: 8 duplicados mas de MercadoLibre. Familia completa de
-- amasadoras (HS20/HS30/HS60) resuelta por triple coincidencia exacta
-- (capacidad+HP+bowl), mas varios secadores Kemei por codigo de modelo
-- y una camilla por medidas+color exactos. Incluye una segunda
-- publicacion de ML para el secador KM-5810 (mismo modelo y stock, con
-- un typo de potencia en el titulo). Ya aplicado con la service role key.

-- 25-YXH119 "Pulverizador" <- MLA3473037916 "Pulverizador Peluquería Profesional 100ml Behmont"
-- Pulverizador peluqueria (stock exacto)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Profesional 100ml"}]'::jsonb,
  description = 'La pulverización uniforme es clave para un trabajo impecable. El Pulverizador Profesional de Behmont de 100ml entrega una niebla fina y pareja para humedecer el cabello con precisión. Resistente y fácil de limpiar para el uso diario en barbería y peluquería.

* Marca: Behmont
* Capacidad: 100 ml
* Niebla fina y uniforme
* Resistente y duradero
* Fácil de limpiar
* Para peluquería y barbería
* Ideal para humedecer durante el corte
* Alta disponibilidad de stock'
where sku = '25-YXH119';
update products set active = false, ml_item_id = null where sku = 'MLA3473037916';

-- AYM-500 "Sobadora de pie - 3 HP - Rodillos 120 x 500 mm - Apertura 0 a 25 mm" <- MLA3481777802 "Sobadora De Pie Panadería 3hp Rodillos 500mm Acero Behmont"
-- Sobadora de pie 3HP rodillos 500mm (HP+medida+precio casi exactos)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Gris"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Material de la máquina","value":"Acero"},{"label":"Modelo","value":"AYM-500"},{"label":"Largo de los rodillos","value":"50 cm"},{"label":"Material de los rodillos","value":"ACERO"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'La Sobadora de Pie AYM-500 de Behmont sobá la masa de forma pareja con sus rodillos de 120x500mm y motor de 3 HP. Apertura regulable de 0 a 25mm para distintos espesores. Construcción robusta de pie para panaderías y pastelerías de uso intensivo.

* Marca: Behmont
* Motor: 3 HP
* Rodillos: 120 x 500 mm
* Apertura regulable: 0 a 25 mm
* Construcción de pie robusta
* Sobado parejo y eficiente
* Para panaderías y pastelerías
* Uso intensivo profesional'
where sku = 'AYM-500';
update products set active = false, ml_item_id = null where sku = 'MLA3481777802';

-- HS30 "Amasadora c/mando 20 kg - 2 HP - Bowl de 35 L - Harina max. 12 kg - A engranaje" <- MLA3481764850 "Amasadora Panadería 20kg 2hp Bowl 35l A Engranaje Behmont"
-- Amasadora 20kg 2HP Bowl 35L (triple coincidencia exacta)
update products set
  specs = '[{"label":"Línea","value":"HS30"},{"label":"Marca","value":"BEHMONT"},{"label":"Incluye recipiente","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Capacidad máxima de harina","value":"12 kg"},{"label":"Modelo","value":"HS30"},{"label":"Tipos de transmisión","value":"Engranaje"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"35 L"}]'::jsonb,
  description = 'La Amasadora HS30 de Behmont amasa hasta 20 kg de masa en su bowl de 35 litros. Motor de 2 HP a engranaje para un trabajo continuo y parejo. La elección de panaderías y pizzerías con producción en crecimiento.

* Marca: Behmont
* Capacidad masa: 20 kg
* Bowl: 35 litros
* Motor: 2 HP
* Harina máx.: 12 kg
* Transmisión a engranaje
* Para producción media-alta
* Amasado continuo y parejo'
where sku = 'HS30';
update products set active = false, ml_item_id = null where sku = 'MLA3481764850';

-- HS60 "Amasadora c/mando 40 kg - 4 HP - Bowl de 64 L - Harina max. 25 kg - A engranaje" <- MLA3481777800 "Amasadora Panadería 40kg 4hp Bowl 64l A Engranaje Behmont"
-- Amasadora 40kg 4HP Bowl 64L (triple coincidencia exacta)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Incluye recipiente","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Amasadoras industriales"},{"label":"Capacidad máxima de harina","value":"25 kg"},{"label":"Modelo","value":"HS60"},{"label":"Tipos de transmisión","value":"Engranaje"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"64 L"}]'::jsonb,
  description = 'La Amasadora HS60 de Behmont es la máquina de mayor capacidad de la línea: amasa hasta 40 kg en su bowl de 64 litros con un potente motor de 4 HP. Sistema a engranaje de uso industrial intensivo. Para panaderías y fábricas de alto volumen de producción.

* Marca: Behmont
* Capacidad masa: 40 kg
* Bowl: 64 litros
* Motor: 4 HP
* Harina máx.: 25 kg
* Transmisión a engranaje industrial
* Para alto volumen de producción
* Uso industrial intensivo'
where sku = 'HS60';
update products set active = false, ml_item_id = null where sku = 'MLA3481777800';

-- HS20 "Amasadora c/mando 13 kg - 2 HP - Bowl de 21 L - Harina max. 8 kg - A engranaje" <- MLA3481752074 "Amasadora Panadería 13kg 2hp Bowl 21l A Engranaje Behmont"
-- Amasadora 13kg 2HP Bowl 21L (triple coincidencia exacta)
update products set
  specs = '[{"label":"Línea","value":"Amasadora industrial"},{"label":"Marca","value":"BEHMONT"},{"label":"Incluye recipiente","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Capacidad máxima de harina","value":"8 kg"},{"label":"Modelo","value":"HS20"},{"label":"Tipos de transmisión","value":"Engranaje"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"21 L"}]'::jsonb,
  description = 'La Amasadora HS20 de Behmont amasa hasta 13 kg de masa con su potente motor de 2 HP y bowl de 21 litros. Sistema a engranaje para un amasado parejo y sin sobrecalentar el motor. Ideal para panaderías, pizzerías y pastelerías de producción media.

* Marca: Behmont
* Capacidad masa: 13 kg
* Bowl: 21 litros
* Motor: 2 HP
* Harina máx.: 8 kg
* Transmisión a engranaje
* Amasado parejo y eficiente
* Para panaderías y pizzerías'
where sku = 'HS20';
update products set active = false, ml_item_id = null where sku = 'MLA3481752074';

-- DCF-KM-5810 "Secador de pelo 1500 W" <- MLA1835431483 "Secador De Pelo Kemei Km-5810 1500w Cerámico Prof. Behmont Negro" + MLA3472367170 "Secador De Pelo Kemei 5810, 3000w En Caja Color Negro"
-- Secador Kemei KM-5810 (modelo+watts+stock exactos; segunda publicacion con typo de watts pero mismo modelo y stock)
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"Secador"},{"label":"Altura","value":"28 cm"},{"label":"Es cerámico","value":"Sí"},{"label":"Es iónico","value":"No"},{"label":"Es profesional","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"24 cm"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"KM-5810"},{"label":"Potencia","value":"1500 W"},{"label":"Piezas del set","value":"Secador de pelo,Boquilla"},{"label":"Cantidad de velocidades","value":"2"},{"label":"Cantidad de niveles de temperatura","value":"3"},{"label":"Voltaje","value":"220V"},{"label":"Con aire frío","value":"Sí"}]'::jsonb,
  description = 'El Secador Kemei KM-5810 de 1500W con tecnología cerámica distribuye el calor uniformemente para un secado más rápido y menos dañino. Motor potente y silencioso para uso diario intensivo.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-5810 | Potencia: 1500W
* Tecnología cerámica
* Secado uniforme y menos dañino
* Motor silencioso de alta potencia
* 2 velocidades y función aire frío
* Para peluquería profesional
* Durabilidad garantizada'
where sku = 'DCF-KM-5810';
update products set active = false, ml_item_id = null where sku = 'MLA1835431483';
update products set active = false, ml_item_id = null where sku = 'MLA3472367170';

-- DCF-KM-6913 "Secador de pelo 2200 W" <- MLA3458937528 "Secador De Pelo Kemei Km-6913 2200w Alta Potencia I. Behmont Negro"
-- Secador Kemei KM-6913 2200W (modelo+watts+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Es cerámico","value":"Sí"},{"label":"Es iónico","value":"Sí"},{"label":"Es profesional","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"KM-6913"},{"label":"Potencia","value":"2200 W"},{"label":"Cantidad de velocidades","value":"3"},{"label":"Voltaje","value":"220V"},{"label":"Con aire frío","value":"Sí"}]'::jsonb,
  description = 'El Secador Kemei KM-6913 de 2200W es el más potente de la línea. 3 velocidades, tecnología iónica y cerámica que reduce el tiempo de secado a la mitad. Para peluquerías de alto volumen que priorizan velocidad y calidad.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-6913 | Potencia: 2200W
* La mayor potencia de la línea
* Tecnología iónica + cerámica
* 3 velocidades + función aire frío
* Secado 50% más rápido
* Para peluquerías de alto volumen
* Alta eficiencia energética'
where sku = 'DCF-KM-6913';
update products set active = false, ml_item_id = null where sku = 'MLA3458937528';

-- 3015BLACK "Camilla fija 2 cuerpos 182 x 61 x 60 - Negro" <- MLA3101100520 "Camilla De Masaje Profesional Hierro 182x61x60 Ajustable Negro"
-- Camilla 182x61x60 Negro (medidas+color+stock exactos)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100520-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100520-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100520-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100520-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100520-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100520-6.webp"]'::jsonb,
  specs = '[{"label":"Tipo de producto","value":"Camilla"},{"label":"Usos recomendados","value":"Masajes profesionales y tratamientos estéticos"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Altura","value":"61 cm"},{"label":"Es plegable","value":"Sí"},{"label":"Es portátil","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Tipo de camilla de masajes","value":"Portátil"},{"label":"Peso máximo soportado","value":"250 kg"},{"label":"Modelo","value":"3015"},{"label":"Ancho","value":"60 cm"},{"label":"Con orificio para la cara","value":"Sí"}]'::jsonb,
  description = 'La Camilla de Masaje Profesional Behmont 3015 es la elección ideal para terapeutas y esteticistas que buscan calidad y comodidad en sus tratamientos. Con unas dimensiones de 182x61x60 cm, esta camilla ajustable se adapta a las necesidades de cada cliente, garantizando una experiencia placentera y efectiva.

Diseñada para ser portátil y plegable, es perfecta para quienes realizan masajes en diferentes ubicaciones. Su estructura de hierro proporciona una robustez excepcional, soportando hasta 250 kg, lo que la convierte en una opción confiable para todo tipo de usuarios.

El orificio para la cara añade un nivel extra de confort, permitiendo que los clientes se relajen completamente durante el tratamiento. Su diseño práctico y funcional asegura que puedas llevarla contigo a cualquier lugar, sin sacrificar la calidad del servicio que ofreces.

La Camilla Behmont es más que un simple mueble; es una herramienta esencial para profesionales que valoran la ergonomía y la durabilidad. Mejora tu práctica y ofrece a tus clientes la atención que merecen con esta camilla de masaje de alta calidad.'
where sku = '3015BLACK';
update products set active = false, ml_item_id = null where sku = 'MLA3101100520';

