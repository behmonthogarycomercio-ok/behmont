-- Migracion 068: 15 duplicados mas de MercadoLibre, encontrados
-- bajando el umbral de similitud del escaneo. Incluye una familia
-- completa de "Puf 32x28cm" por color (amarillo/celeste/negro), un par
-- de cortapapas verticales (compacto/reforzado) y un caso de dos
-- publicaciones de ML para el mismo producto (Planchita KM-6910, misma
-- publicacion re-listada con precio y stock identicos a la ya fusionada
-- en migration_062). Ya aplicado directamente con la service role key.

-- 25-JAY10 "Equipamientos - Cortapapas Horizontal" <- MLA3481764846 "Cortapapas Horizontal Manual Acero Gastronomía Behmont Plateado"
-- Cortapapas Horizontal (stock exacto)
update products set
  specs = '[{"label":"Material de la hoja","value":"Acero inoxidable"},{"label":"Material del cuerpo","value":"Acero"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Plateado"},{"label":"Es apto para lavavajillas","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Horizontal"},{"label":"Con cuchillas intercambiables","value":"Sí"}]'::jsonb,
  description = 'El Cortapapas Horizontal de Behmont corta papas en bastones perfectos para freír con un solo movimiento de palanca. Sistema horizontal robusto que requiere mínimo esfuerzo. Ideal para rotiserías, restaurantes y casas de comida rápida.

* Marca: Behmont
* Sistema horizontal de palanca
* Corta papas en bastones uniformes
* Mínimo esfuerzo de operación
* Construcción robusta de acero
* Cuchillas intercambiables
* Para rotiserías y restaurantes
* Fácil de limpiar'
where sku = '25-JAY10';
update products set active = false, ml_item_id = null where sku = 'MLA3481764846';

-- HF-150 "Hamburguesera articulada 150 mm" <- MLA3481770048 "Hamburguesera Articulada 150mm Acero Gastronomía Behmont"
-- Hamburguesera articulada 150mm (medida+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Diámetro de la hamburguesa","value":"15 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"HF-150"},{"label":"Tipo de operación","value":"Manual"}]'::jsonb,
  description = 'La Hamburguesera Articulada de 150mm de Behmont produce los medallones más grandes para hamburguesas gourmet y de gran porte. Sistema articulado de presión uniforme para resultados profesionales. La elección de las hamburgueserías especializadas.

* Marca: Behmont
* Diámetro: 150 mm
* Sistema articulado de prensado
* Medallones gourmet de gran porte
* Presión uniforme y pareja
* Acero resistente de fácil limpieza
* Para hamburgueserías especializadas
* Resultado profesional garantizado'
where sku = 'HF-150';
update products set active = false, ml_item_id = null where sku = 'MLA3481770048';

-- DCF-KM-6906 "Secador de pelo 2000 W - Con difusor" <- MLA1835443897 "Secador Pelo Kemei Km-6906 2000w Con Difusor Iónico Behmont Negro"
-- Secador Kemei KM-6906 2000W con difusor (modelo+watts+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Es cerámico","value":"Sí"},{"label":"Es iónico","value":"Sí"},{"label":"Es profesional","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"KM-6906"},{"label":"Potencia","value":"2000 W"},{"label":"Cantidad de velocidades","value":"2"},{"label":"Voltaje","value":"220V"},{"label":"Con aire frío","value":"Sí"}]'::jsonb,
  description = 'El Secador Kemei KM-6906 de 2000W incluye difusor para definir rizos y ondas. Tecnología iónica + cerámica que elimina el frizz y potencia el brillo. Para estilistas que trabajan con todo tipo de textura capilar.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-6906 | Potencia: 2000W
* Incluye difusor para rizos
* Tecnología iónica + cerámica
* Elimina el frizz, potencia el brillo
* 2 velocidades y aire frío
* Para todo tipo de cabello
* Para estilistas profesionales'
where sku = 'DCF-KM-6906';
update products set active = false, ml_item_id = null where sku = 'MLA1835443897';

-- MP-21 "Sillon peluquero hidraulico para niño autito" <- MLA1830036413 "Sillón Barbero Hidráulico Infantil Autito Niños Behmont Varios Tapizado Especial Niños"
-- Sillon barbero infantil "autito" (frase exacta + stock)
update products set
  specs = '[{"label":"Tipo de respaldo","value":"Tapizado"},{"label":"Forma de la base","value":"Especial niños"},{"label":"Marca","value":"Behmont"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Varios"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Fabricante","value":"Behmont"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"Autito"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb,
  description = 'El Sillón Peluquero Infantil Autito de Behmont convierte el corte de pelo en una aventura para los más chicos. Diseñado en forma de auto, el niño se mantiene entretenido y tranquilo durante el servicio. Sistema hidráulico para ajustar la altura al profesional.

* Marca: Behmont
* Diseño: Autito infantil
* Hidráulico de altura regulable
* Ideal para peluquerías infantiles
* Mantiene al niño entretenido
* Tapizado fácil de limpiar
* Estructura resistente y segura
* Gran diferenciador para tu peluquería'
where sku = 'MP-21';
update products set active = false, ml_item_id = null where sku = 'MLA1830036413';

-- FC-400-105 "Exhibidora vertical 420 L - Con cenefa - 4 estantes" <- MLA3640759318 "Heladera Exhibidora Vertical 1 Puerta Con Cenefa Blanca Blanco"
-- Heladera 1 puerta con cenefa (stock exacto)
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3640759318';

-- JB-KM-3115-Y "Rizador para ondas rotas ceramica" <- MLA3458937530 "Rizadora Ondas Rotas Kemei Km-3115 Cerámica Beach Waves Amarillo/negro"
-- Rizadora ondas rotas Kemei KM-3115 (modelo+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Modelo alfanumérico","value":"KM-3115"},{"label":"Color","value":"Amarillo/Negro"},{"label":"Diámetro del cabezal","value":"3.2 cm"},{"label":"Materiales del cabezal","value":"Cerámica"},{"label":"Tipo de rizadora","value":"Rizadora de ondas"},{"label":"Es inalámbrico","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Rizadora de ondas"},{"label":"Temperatura máxima","value":"210 °C"},{"label":"Temperatura mínima","value":"150 °C"},{"label":"Modelo","value":"KM-3115"},{"label":"Tipo de alimentación","value":"Corriente doméstica"},{"label":"Voltaje","value":"220V"},{"label":"Con apagado automático","value":"No"},{"label":"Con cable giratorio","value":"Sí"},{"label":"Con control de temperatura","value":"Sí"}]'::jsonb,
  description = 'La Rizadora Ondas Rotas Kemei KM-3115 crea ondas beach waves y texturas naturales en minutos. Su placa cerámica especial genera un efecto natural y descontracturado muy buscado. Temperatura regulable para todos los cabellos.

* Marca: Kemei | Distribuidor: Behmont
*Modelo: KM-3115
* Para ondas rotas y beach waves
* Placa cerámica de 32mm
* Temperatura regulable: 150°C a 210°C
* Efecto natural y descontracturado
* Cable giratorio
* Para todo tipo de cabello'
where sku = 'JB-KM-3115-Y';
update products set active = false, ml_item_id = null where sku = 'MLA3458937530';

-- 25-YXH108 "Navaja de acero" <- MLA3471173104 "Navaja Barberia Acero Inoxidable Prof. Peluquería Behmont Plateado"
-- Navaja de acero (stock exacto)
update products set
  specs = '[{"label":"Material de la hoja","value":"Acero inoxidable"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Plateado"},{"label":"Incluye cuchillas","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Navajas de afeitar"},{"label":"Color principal","value":"Plateado"},{"label":"Modelo","value":"Navaja acero"},{"label":"Material del mango ","value":"Acero/Plástico"}]'::jsonb,
  description = 'La Navaja de Barbería de Acero Inoxidable de Behmont es la herramienta clásica del barbero tradicional. Hoja de acero inoxidable de alta dureza para un afeitado limpio, preciso y al ras. Compatible con cuchillas estándar de doble filo.

* Marca: Behmont
* Acero inoxidable de alta dureza
* Afeitado limpio y preciso al ras
* Compatible con cuchillas estándar
* Para barbería profesional
* Diseño clásico de navaja
* Alta durabilidad
* Alta disponibilidad de stock'
where sku = '25-YXH108';
update products set active = false, ml_item_id = null where sku = 'MLA3471173104';

-- TR-31 "Rebanadora de pan 12 mm - Tamaño pan 37 x 28 x 10 cm - Fundicion" <- MLA1846049119 "Rebanadora De Pan 12mm Fundición Panadería Behmont"
-- Rebanadora de pan 12mm fundicion (medida+material+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"TR-31"}]'::jsonb,
  description = '"La Rebanadora de Pan TR-31 de Behmont con cuerpo de fundición ofrece máxima estabilidad y durabilidad. Corta rebanadas de 12mm en panes de hasta 37x28x10 cm. La opción robusta para panaderías que buscan una máquina de larga vida útil.

* Marca: Behmont
* Espesor de rebanada: 12 mm
* Cuerpo de fundición resistente
* Tamaño de pan: 37x28x10 cm
* Máxima estabilidad y durabilidad
* Rebanadas uniformes
* Para panaderías profesionales
* Larga vida útil"'
where sku = 'TR-31';
update products set active = false, ml_item_id = null where sku = 'MLA1846049119';

-- 25-YJ05YELLOW "Puf amarillo 32 x 28 cm" <- MLA1827632259 "Puf Estética Barbería 32x28cm Amarillo Behmont Amarillo"
-- Puf 32x28cm Amarillo (color+medida+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Amarillo"},{"label":"Diseño de la tela","value":"Liso"},{"label":"Altura","value":"28 cm"},{"label":"Es plegable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"32 cm"},{"label":"Color principal","value":"Amarillo"},{"label":"Materiales","value":"Ecocuero"},{"label":"Modelo","value":"Amarillo"},{"label":"Tipo de puf","value":"Puf estético"},{"label":"Forma","value":"Redondo"},{"label":"Ancho","value":"32 cm"},{"label":"Con patas","value":"No"}]'::jsonb,
  description = 'El Puf de Estética Amarillo de Behmont es el asiento auxiliar perfecto para cualquier puesto de trabajo en barbería, peluquería o centro estético. Compacto, liviano y de fácil limpieza. Aporta un toque de color y diseño a tu espacio.

* Marca: Behmont
* Color: Amarillo
* Dimensiones: 32 x 28 cm
* Tapizado ecocuero fácil de limpiar
* Asiento auxiliar para clientes
* Compacto y liviano
* Para barbería, peluquería y estética
* Diseño colorido y moderno'
where sku = '25-YJ05YELLOW';
update products set active = false, ml_item_id = null where sku = 'MLA1827632259';

-- JSPCC-03 "Equipamientos - Cortapapas Vertical" <- MLA3481764866 "Cortapapas Vertical Manual Compacto Acero Gastronomía Beh. Plateado"
-- Cortapapas Vertical Compacto (stock exacto)
update products set
  specs = '[{"label":"Material de la hoja","value":"Acero inoxidable"},{"label":"Material del cuerpo","value":"Acero"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Plateado"},{"label":"Es apto para lavavajillas","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Vertical Compacto"},{"label":"Con cuchillas intercambiables","value":"Sí"}]'::jsonb,
  description = 'El Cortapapas Vertical Compacto de Behmont es la opción accesible para cortar papas en bastones de forma rápida y uniforme. Sistema vertical de palanca, cuchillas de acero intercambiables y diseño que ocupa poco espacio. Ideal para comercios chicos.

* Marca: Behmont
* Sistema vertical de palanca
* Diseño compacto
* Corte uniforme en bastones
* Cuchillas intercambiables de acero
* Ocupa poco espacio
* Para comercios chicos y medianos
* Excelente relación precio-calidad'
where sku = 'JSPCC-03';
update products set active = false, ml_item_id = null where sku = 'MLA3481764866';

-- JSPCC-06 "Equipamientos - Cortapapas Vertical" <- MLA3481752056 "Cortapapas Vertical Manual Reforzado Acero Gastronomía Beh. Plateado"
-- Cortapapas Vertical Reforzado (stock exacto)
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3481752056';

-- 25-YJ05LBLUE "Puf celeste 32 x 28 cm" <- MLA1827710029 "Puf Estética Barbería 32x28cm Celeste Behmont Celeste"
-- Puf 32x28cm Celeste (color+medida+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Celeste"},{"label":"Diseño de la tela","value":"Liso"},{"label":"Altura","value":"28 cm"},{"label":"Es plegable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"32 cm"},{"label":"Color principal","value":"Celeste"},{"label":"Materiales","value":"Ecocuero"},{"label":"Modelo","value":"Celeste"},{"label":"Tipo de puf","value":"Puf estético"},{"label":"Forma","value":"Redondo"},{"label":"Ancho","value":"32 cm"},{"label":"Con patas","value":"No"}]'::jsonb,
  description = 'El Puf de Estética Celeste de Behmont es el asiento auxiliar ideal para peluquerías, barberías y centros estéticos que buscan un toque fresco y moderno. Fácil de limpiar, resistente y compacto.

* Marca: Behmont
* Color: Celeste
* Dimensiones: 32 x 28 cm
* Tapizado ecocuero
* Asiento auxiliar compacto
* Para sala de espera o puesto de trabajo
* Fácil limpieza
* Diseño fresco y moderno'
where sku = '25-YJ05LBLUE';
update products set active = false, ml_item_id = null where sku = 'MLA1827710029';

-- CFJB-KM-6910 "Planchita de pelo ceramica 120 °C" <- MLA3472367118 "Planchita De Pelo Kemei Km-6910 Negra Negro"
-- Segunda publicacion de ML para el mismo producto ya fusionado (Planchita KM-6910, mismo precio y stock que la otra publicacion)
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3472367118';

-- 25-YJ05BLACK "Puf negro 32 x 28 cm" <- MLA1827710031 "Puf Estética Barbería 32x28cm Negro Behmont Negro"
-- Puf 32x28cm Negro (color+medida+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Diseño de la tela","value":"Liso"},{"label":"Altura","value":"28 cm"},{"label":"Es plegable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"32 cm"},{"label":"Color principal","value":"Negro"},{"label":"Materiales","value":"Ecocuero"},{"label":"Modelo","value":"Negro"},{"label":"Tipo de puf","value":"Puf estético"},{"label":"Forma","value":"Redondo"},{"label":"Ancho","value":"32 cm"},{"label":"Con patas","value":"No"}]'::jsonb,
  description = 'El Puf de Estética Negro de Behmont es el más versátil de la línea. Su color negro combina con cualquier decoración de barbería o peluquería. Compacto, resistente y fácil de limpiar. El accesorio que no puede faltar en tu salón.

* Marca: Behmont
* Color: Negro
* Dimensiones: 32 x 28 cm
* Tapizado ecocuero negro
* Combina con cualquier estilo
* Resistente al uso intensivo
* Fácil limpieza
* Para barbería, peluquería y estética'
where sku = '25-YJ05BLACK';
update products set active = false, ml_item_id = null where sku = 'MLA1827710031';

-- 517-7 "Aspiradora de cabello" <- MLA1827736225 "Aspiradora De Cabello Profesional Peluquería Behmont 517-7 Negro"
-- Aspiradora de cabello (SKU "517-7" literal en el titulo de ML; stock 46 vs 45)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Frecuencia","value":"50Hz"},{"label":"Es industrial","value":"No"},{"label":"Es inalámbrico","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Aspiradoras"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"Aspiradora Capilar 517-7"},{"label":"Tipos de aspiradora y limpiadora a vapor","value":"Aspiradora de cabello"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"2.5 L"}]'::jsonb,
  description = 'La Aspiradora de Cabello Profesional de Behmont es el accesorio indispensable para cualquier barbería o peluquería que quiera ofrecer un servicio de limpieza de nivel superior. Aspira el cabello cortado del suelo, de la ropa y del cliente con potencia y precisión.

* Marca: Behmont
* Aspiración potente de cabello
* Para barbería y peluquería profesional
* Reduce tiempo de limpieza
* Fácil de manejar y limpiar
* Alta disponibilidad de stock
* El complemento perfecto del barbero moderno
* Experiencia de servicio superior para el cliente'
where sku = '517-7';
update products set active = false, ml_item_id = null where sku = 'MLA1827736225';

