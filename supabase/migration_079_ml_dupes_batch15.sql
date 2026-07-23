-- Migracion 079: 15 duplicados mas, encontrados revisando el campo
-- "Modelo" de los specs de TODOS los productos de ML restantes (no solo
-- los Kemei) contra el codigo real de SKU del distribuidor. Resuelve
-- casi todo el cluster de Faros/Carteles giratorios, mas varios
-- carritos, un hamburguesera con doble publicacion, y otros. Se
-- descartaron 2 propuestas por codigo inexistente (HF-130, 25-JA13) y 3
-- por Modelo poco confiable (tres carros/carritos distintos que
-- indicaban el mismo codigo 25-YXH09 pese a tener stock diferente entre
-- si). Ya aplicado con la service role key.

-- 25-YXH02 "Cartel giratorio barberia Noel - LED - 80 x 23 cm" <- MLA1678842973 "Faro Giratorio Pole Barbería Led Grande 80x23cm Moderno Gris"
-- Faro Giratorio Moderno Gris (Modelo confirmado en specs)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678842973-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678842973-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678842973-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678842973-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678842973-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678842973-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Gris"},{"label":"Altura","value":"80 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Gris"},{"label":"Modelo","value":"25-YXH02"},{"label":"Requiere ensamblado","value":"No"},{"label":"Ancho","value":"23 cm"}]'::jsonb,
  description = 'Con una altura de 80 cm y un ancho de 23 cm, este faro moderno es ideal para cualquier barbería que busque destacar su ambiente clásico y acogedor. Su diseño giratorio permite una visibilidad óptima desde diferentes ángulos, atrayendo la atención de los clientes y creando un ambiente atractivo. No requiere ensamblado, lo que facilita su colocación en el espacio deseado. proporciona un brillo eficiente y duradero. Su estética no solo es un atractivo visual, sino que también evoca la tradición y el arte de la barbería.'
where sku = '25-YXH02';
update products set active = false, ml_item_id = null where sku = 'MLA1678842973';

-- 25-YXH03 "Cartel giratorio barberia Noise - LED - 80 x 23 cm" <- MLA1678906855 "Faro Giratorio Pole Barbería Led Grande 80x23cm Vintage Gris Oscuro"
-- Faro Giratorio Vintage Gris Oscuro (Modelo confirmado en specs)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678906855-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678906855-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678906855-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678906855-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678906855-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678906855-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Gris oscuro"},{"label":"Altura","value":"80 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"25-YXH03"},{"label":"Requiere ensamblado","value":"No"},{"label":"Ancho","value":"23 cm"}]'::jsonb,
  description = 'Con una altura de 80 cm y un ancho de 23 cm, este faro vintage es ideal para cualquier barbería que busque destacar su ambiente clásico y acogedor. Su diseño giratorio permite una visibilidad óptima desde diferentes ángulos, atrayendo la atención de los clientes y creando un ambiente atractivo. No requiere ensamblado, lo que facilita su colocación en el espacio deseado. proporciona un brillo eficiente y duradero. Su estética vintage no solo es un atractivo visual, sino que también evoca la tradición y el arte de la barbería.'
where sku = '25-YXH03';
update products set active = false, ml_item_id = null where sku = 'MLA1678906855';

-- 517-11 "Cartel giratorio barberia Bison - LED - 70 x 23 cm" <- MLA2245381790 "Cartel Faro Luz Led Giratorio Barbería 70x23cm Azul"
-- Cartel Faro Azul (Modelo confirmado en specs)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Azul"},{"label":"Altura","value":"70 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Azul"},{"label":"Modelo","value":"517-11"},{"label":"Requiere ensamblado","value":"No"},{"label":"Ancho","value":"23 cm"}]'::jsonb,
  description = 'El Faro Luz LED Giratorio de Barbería de Behmont combina estilo y funcionalidad en un solo producto. Con una altura de 70 cm y un ancho de 23 cm, se convierte en un elemento icónico para cualquier barbería o salón de belleza, ofreciendo una iluminación efectiva y un diseño atractivo que captará la atención de los clientes.

Este faro presenta un acabado elegante que complementa diversas decoraciones y ambientes, destacando en su lugar tanto de día como de noche. Su sistema de luz LED proporciona un brillo cálido y acogedor, ideal para crear un ambiente propicio para el cuidado personal y la relajación.

No requiere ensamblado, lo que facilita su uso inmediato en cualquier espacio. Además, su característica rotativa añade un toque dinámico, permitiendo que la luz se proyecte de manera versátil y creativa, adaptándose a las necesidades del momento.

Este faro es perfecto para barberos y estilistas que buscan elevar la experiencia de sus clientes y mejorar la atmósfera de su local. Al agregar este elemento distintivo, se invita a los clientes a disfrutar de un servicio excepcional en un entorno visualmente atractivo.'
where sku = '517-11';
update products set active = false, ml_item_id = null where sku = 'MLA2245381790';

-- NB-209 "Estante modulo 180 x 90 x 40 - 5 estantes - 100 kg por estante - Galvanizado" <- MLA1541550173 "Estanteria A Encastre 40x90x180mts 5 Estantes 100kg Por Est. Beige"
-- Tercera publicacion de ML (Modelo "NB-209" confirmado en specs)
update products set active = false, ml_item_id = null where sku = 'MLA1541550173';

-- FHGOLD "Ayudante de peluqueria Gold - 5 cajones" <- MLA2898574214 "Carrito Auxiliar Dorado Con Rueditas 4 Cajones Versátil Dorado"
-- Carrito Auxiliar Dorado (Modelo "FH-Gold" confirmado en specs)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898574214-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898574214-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898574214-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898574214-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898574214-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898574214-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Dorado"},{"label":"Cantidad de cajones","value":"4"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Dorado"},{"label":"Material","value":"Plástico"},{"label":"Modelo","value":"FH-Gold"},{"label":"Usos recomendados","value":"uso auxiliar para tintorería o almacenamiento móvil"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Carrito Auxiliar Dorado con Rueditas de Behmont es la solución perfecta para quienes buscan funcionalidad y estilo en su espacio. Con un diseño elegante y moderno, este carrito se adapta a diversas necesidades, ya sea en una tintorería o como un sistema de almacenamiento móvil en el hogar.

Equipado con cuatro cajones, ofrece un amplio espacio para organizar y acceder fácilmente a tus artículos. Las ruedas permiten un desplazamiento sencillo, lo que lo convierte en un aliado ideal para cualquier tarea que requiera movilidad y eficiencia. Su acabado dorado no solo aporta un toque de sofisticación, sino que también se integra perfectamente en diferentes ambientes, desde el más clásico hasta el más contemporáneo. Este carrito es una opción versátil que combina estética y practicidad, facilitando la organización sin sacrificar el estilo.'
where sku = 'FHGOLD';
update products set active = false, ml_item_id = null where sku = 'MLA2898574214';

-- FHBLUE "Ayudante de peluqueria Blue - 5 cajones" <- MLA2898677990 "Carrito Auxiliar Azul Con Rueditas 4 Cajones Versátil Azul"
-- Carrito Auxiliar Azul (el Modelo de la publicacion decia por error "FH-Gold", pero el color del titulo -Azul- coincide con FHBLUE, no con FHGOLD que ya se uso para el dorado)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898677990-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898677990-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898677990-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898677990-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898677990-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898677990-6.webp"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Azul"},{"label":"Cantidad de cajones","value":"4"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Azul"},{"label":"Material","value":"Plástico"},{"label":"Modelo","value":"FH-Gold"},{"label":"Usos recomendados","value":"uso auxiliar para tintorería o almacenamiento móvil"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Carrito Auxiliar Azul con Rueditas de Behmont es la solución perfecta para quienes buscan funcionalidad y estilo en su espacio. Con un diseño elegante y moderno, este carrito se adapta a diversas necesidades, ya sea en una tintorería o como un sistema de almacenamiento móvil en el hogar.

Equipado con cuatro cajones, ofrece un amplio espacio para organizar y acceder fácilmente a tus artículos. Las ruedas permiten un desplazamiento sencillo, lo que lo convierte en un aliado ideal para cualquier tarea que requiera movilidad y eficiencia. Su acabado dorado no solo aporta un toque de sofisticación, sino que también se integra perfectamente en diferentes ambientes, desde el más clásico hasta el más contemporáneo. Este carrito es una opción versátil que combina estética y practicidad, facilitando la organización sin sacrificar el estilo.'
where sku = 'FHBLUE';
update products set active = false, ml_item_id = null where sku = 'MLA2898677990';

-- 25-YXH12 "Ayudante de peluqueria Slim - 6 cajones - Puertas y cerradura" <- MLA2898703560 "Carrito Auxiliar Reforzado Con Llave, Rueditas Y 6 Cajones Negro"
-- Carrito con llave 6 cajones (Modelo confirmado + "puertas y cerradura" = "con llave")
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898703560-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898703560-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898703560-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898703560-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898703560-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898703560-6.webp"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Cantidad de cajones","value":"6"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Metal"},{"label":"Modelo","value":"25-YXH12"},{"label":"Usos recomendados","value":"uso auxiliar para tintorería o almacenamiento móvil"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Carrito Auxiliar Reforzado con Llave de Behmont es la solución ideal para quienes buscan un almacenamiento móvil eficiente y seguro. Fabricado en metal de alta calidad, este carrito es perfecto para tintorerías y otros entornos que requieren organización y movilidad. Con un diseño robusto, garantiza durabilidad y resistencia en el uso diario.

Este modelo 25-YXH12 cuenta con seis cajones amplios, permitiendo una clasificación óptima de herramientas y materiales. Las ruedas incorporadas facilitan su desplazamiento, haciendo que sea sencillo moverlo de un lugar a otro sin esfuerzo. Además, la inclusión de una llave proporciona un nivel adicional de seguridad para tus pertenencias.'
where sku = '25-YXH12';
update products set active = false, ml_item_id = null where sku = 'MLA2898703560';

-- HF-100 "Hamburguesera articulada 100 mm" <- MLA2203858794 "Moldeador De Hamburguesas 100mm Articulado Hf-100 Behmont" + MLA3481742642 "Hamburguesera Articulada 100mm Acero Gastronomía Behmont"
-- Hamburguesera 100mm - dos publicaciones de ML, ambas confirman Modelo "HF-100" en sus specs
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Diámetro de la hamburguesa","value":"10 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"HF-100"},{"label":"Tipo de operación","value":"Manual"}]'::jsonb,
  description = 'La Hamburguesera Articulada de 100mm de Behmont arma hamburguesas perfectas y uniformes en segundos. Su sistema articulado prensa la carne con presión pareja para lograr medallones del mismo grosor y diámetro. Ideal para rotiserías, restaurantes y casas de comida.

* Marca: Behmont
* Diámetro: 100 mm
* Sistema articulado de prensado
* Hamburguesas uniformes y parejas
* Operación manual rápida
* Acero resistente de fácil limpieza
* Para gastronomía profesional
* Alta disponibilidad de stock'
where sku = 'HF-100';
update products set active = false, ml_item_id = null where sku = 'MLA2203858794';
update products set active = false, ml_item_id = null where sku = 'MLA3481742642';

-- JSPCC-03 "Equipamientos - Cortapapas Vertical" <- MLA2205160038 "Cortador De Papas Súper Filoso De Mesa Con Palanca Behmont Plateado"
-- Segunda publicacion de ML para JSPCC-03 (Modelo confirmado en specs)
update products set active = false, ml_item_id = null where sku = 'MLA2205160038';

-- CFJ-KM-6832 "Secador de pelo 1000 W" <- MLA1835431485 "Secador De Pelo Kemei Km-6832 1000w Profesional Behmont Negro"
-- Secador Kemei KM-6832 1000W (Modelo+watts confirmados)
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Es cerámico","value":"No"},{"label":"Es iónico","value":"No"},{"label":"Es profesional","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"km-6832"},{"label":"Potencia","value":"1000 W"},{"label":"Cantidad de velocidades","value":"2"},{"label":"Voltaje","value":"220V"},{"label":"Con aire frío","value":"Sí"}]'::jsonb,
  description = 'El Secador Kemei KM-6832 de 1000W es la opción compacta para peluquerías que equipan múltiples puestos. 2 velocidades, aire frío y motor de calidad. Liviano, económico y confiable.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-6832 | Potencia: 1000W
* 2 velocidades + función aire frío
* Liviano y compacto
* Para peluquería y uso personal
* Excelente relación precio-calidad
* Ideal para equipar varios puestos
* Alta disponibilidad de stock'
where sku = 'CFJ-KM-6832';
update products set active = false, ml_item_id = null where sku = 'MLA1835431485';

-- 25-JAY07 "Kit Atornillador, Taladro Percutor y Amoladora Inalambricos - C/2 baterias de 1500 mAh" <- MLA2211789840 "Kit Atornillador +at. Impacto +amoladora Inalambrico Bat Rec"
-- Kit Atornillador+Taladro+Amoladora (Modelo confirmado en specs)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-6.jpg"]'::jsonb,
  specs = '[{"label":"Accesorios incluidos","value":"2 baterías recargables,Batería,Cargador de batería"},{"label":"Tipo de batería","value":"Batería recargable"},{"label":"Color","value":"Amarillo"},{"label":"Modelo detallado","value":"25-JAY07"},{"label":"Tipo de destornillador eléctrico","value":"Inalámbrico"},{"label":"Es inalámbrico","value":"Sí"},{"label":"Línea","value":"Profesional"},{"label":"Color principal","value":"Amarillo"},{"label":"Tamaño del mandril","value":"10 mm"},{"label":"Velocidad máxima de rotación","value":"4500 rpm"},{"label":"Potencia","value":"98 W"},{"label":"Tipo de alimentación","value":"Batería recargable"},{"label":"Tipo de producto","value":"Destornillador"},{"label":"Voltaje","value":"98"},{"label":"Marca","value":"Behmont"},{"label":"Incluye estuche","value":"Sí"},{"label":"Es un kit de fábrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"25-JAY07"},{"label":"Piezas incluidas","value":"Amoladora,Atornillador,Atornillador de Impacto"},{"label":"Cantidad de piezas","value":"3"}]'::jsonb,
  description = 'El kit de Atornillador, Atornillador de Impacto y Amoladora Inalámbricos es una herramienta profesional diseñada para satisfacer las demandas de los más exigentes.

Atornillador.
Atornillador de Impacto.
Amoladora.
Alimentación a batería recargable.
Libertad de movimiento.
Velocidad máxima de rotación de 4500 rpm.
Incluye dos baterías recargables.
Tamaño de mandril de 10 mm.

Ideal para proyectos en casa, reparaciones y trabajos más complejos, este destornillador se convierte en un aliado imprescindible.'
where sku = '25-JAY07';
update products set active = false, ml_item_id = null where sku = 'MLA2211789840';

-- G1 "Camilla portatil plegable 185 x 60 x 60 - Soporta 150 kg - Negro" <- MLA1706557905 "Camilla De Masaje Profesional Y Portátil Con Accesorios Negro"
-- Camilla portatil plegable Negro (Modelo confirmado en specs)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1706557905-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1706557905-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1706557905-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1706557905-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1706557905-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1706557905-6.jpg"]'::jsonb,
  specs = '[{"label":"Tipo de producto","value":"Camilla"},{"label":"Usos recomendados","value":"Masajes profesionales y terapéuticos"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Altura","value":"70 cm"},{"label":"Es plegable","value":"Sí"},{"label":"Es portátil","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"1.8 m"},{"label":"Tipo de camilla de masajes","value":"Portátil"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"G1"},{"label":"Ancho","value":"60 cm"},{"label":"Con orificio para la cara","value":"Sí"}]'::jsonb
where sku = 'G1';
update products set active = false, ml_item_id = null where sku = 'MLA1706557905';

-- 517-5 "Tintorero portatil Cuba - C/recipientes, alfombra, pinceles - Acrilico" <- MLA3618436388 "Carro Ayudante Tintorero Peluquería Con Ruedas Y Accesorios Negro"
-- Tintorero Cuba (Modelo confirmado + stock exacto)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Plástico"},{"label":"Modelo","value":"517-5"},{"label":"Usos recomendados","value":"Peluquería"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'Este carrito ayudante es ideal para salones de peluquería y estética, facilitando la organización y el acceso rápido a herramientas y productos.

CARACTERÍSTICAS PRINCIPALES
Cuenta con una base con ruedas que permite movilidad y estabilidad durante su uso. Incluye recipientes para bowls y pinceles, optimizando el espacio y la funcionalidad.

USOS RECOMENDADOS
Perfecto para profesionales de la peluquería que necesitan un soporte práctico y móvil para sus herramientas y productos durante el trabajo.

MANTENIMIENTO
Fácil de limpiar y mantener, asegurando durabilidad y buen estado con un uso adecuado.'
where sku = '517-5';
update products set active = false, ml_item_id = null where sku = 'MLA3618436388';

-- 25-YXH118 "Pulverizador acero" <- MLA3489203486 "Atomizador Acero Inoxidable Peluquería Profesional Behmont Azul"
-- Atomizador acero (Modelo confirmado + stock exacto)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Azul"},{"label":"Incluye tapa","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Azul"},{"label":"Fabricante","value":"behmont"},{"label":"Material","value":"Acero inoxidable"},{"label":"Modelo","value":"25-YXH118"},{"label":"Formato del envase","value":"Atomizador"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Unidades por envase","value":"1"},{"label":"Capacidad en volumen","value":"100 mL"}]'::jsonb,
  description = 'El Pulverizador de Acero Inoxidable de Behmont es la opción premium para barberos y peluqueros exigentes. Material metálico de alta resistencia que no se deforma ni decolora. Pulverización precisa y duradera para toda la jornada de trabajo.

* Marca: Behmont
* Cuerpo de acero inoxidable
* Alta resistencia y durabilidad
* No se deforma ni decolora
* Pulverización precisa
* Aspecto profesional premium
* Para peluquería y barbería de alto nivel
* Alta disponibilidad de stock'
where sku = '25-YXH118';
update products set active = false, ml_item_id = null where sku = 'MLA3489203486';

-- 25-JAY01 "Equipamientos - Exprimidor de citricos manual" <- MLA3481764844 "Exprimidor Cítricos Manual Industrial Palanca Acero Behmont Plateado"
-- Segunda publicacion de ML para 25-JAY01 (Modelo confirmado en specs)
update products set active = false, ml_item_id = null where sku = 'MLA3481764844';

