-- Migracion 073: 4 duplicados mas. Incluye 2 segundas publicaciones de
-- ML para termoselladoras ya fusionadas (SF-300/SF-400), un estante
-- (NB-209) con 2 publicaciones de ML, y una silla hidraulica "Nexus"
-- que estaba mal categorizada en Muebles en vez de Peluqueria y
-- Barberia (por eso no habia aparecido en escaneos anteriores, que
-- comparan solo dentro del catalogo general). Ya aplicado con la
-- service role key.

-- SF-300 "Equipamientos - Selladora manual 30 cm 280 W - Hierro" <- MLA2489291724 "Termoselladoras Behmont Sf-300 Cuerpo De Hierro 30cm 280w"
-- Segunda publicacion de ML (codigo+30cm+280w exactos, ya fusionado en migration_058 desde otra publicacion)
-- (sin cambios de datos)
update products set active = false, ml_item_id = null where sku = 'MLA2489291724';

-- SF-400 "Equipamientos - Selladora manual 40 cm 480 W - Hierro" <- MLA2489356906 "Termoselladoras Behmont Sf-400 Cuerpo De Hierro 40cm 480w"
-- Segunda publicacion de ML (codigo+40cm+480w exactos, ya fusionado en migration_058 desde otra publicacion)
-- (sin cambios de datos)
update products set active = false, ml_item_id = null where sku = 'MLA2489356906';

-- NB-209 "Estante modulo 180 x 90 x 40 - 5 estantes - 100 kg por estante - Galvanizado" <- MLA1911342343 "Estanteria De Metal 5 Estantes Mdf 100kg Por Estantes Galvanizado" + MLA1911342345 "Estanteria De Metal 5 Estantes Altura Ajustable Mdf Sin Tornillos 90x40x180 175kg Total Para Hogar Comercial Galvanizado"
-- Dos publicaciones de ML del mismo estante (dimensiones 90x40x180 = 180x90x40 + galvanizado exactos)
update products set
  images = '["https://http2.mlstatic.com/D_753947-MLA111232213729_052026-O.webp","https://http2.mlstatic.com/D_699065-MLA110302569130_052026-O.webp","https://http2.mlstatic.com/D_714466-MLA110554231865_042026-O.jpg","https://http2.mlstatic.com/D_645422-MLA109668550066_042026-O.jpg","https://http2.mlstatic.com/D_798692-MLA111232393059_052026-O.jpg"]'::jsonb,
  specs = '[{"label":"Altura del paquete del seller","value":"59 cm"},{"label":"Largo del paquete del seller","value":"14 cm"},{"label":"Peso del paquete del seller","value":"2865 g"},{"label":"Ancho del paquete del seller","value":"35 cm"},{"label":"Color","value":"Galvanizado"},{"label":"Profundidad","value":"40 cm"},{"label":"Acabado","value":"Galvanizado"},{"label":"Altura","value":"180 cm"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"Sí"},{"label":"Incluye kit de instalación","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"90 cm"},{"label":"Fabricante","value":"CL Circle Line"},{"label":"Material","value":"Metal/MDF"},{"label":"Peso máximo soportado","value":"175 kg"},{"label":"Modelo","value":"50020 / 50021"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"SKU","value":"NB-209"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"},{"label":"Unidades por pack","value":"1"},{"label":"IVA","value":"21 %"},{"label":"Peso","value":"10 kg"}]'::jsonb,
  description = 'MATERIALES RESISTENTES
• MDF : MATERIAL RESISTENTE, FÁCIL DE LIMPIAR Y CON UNA SUPERFICIE LISA IDEAL PARA CUALQUIER AMBIENTE.
• ACERO GALVANIZADO: ESTRUCTURA ROBUSTA CON UNA ACABADO ELEGANTE Y PROTECCIÓN CONTRA RAYONES Y CORROSIÓN.

ARMALA COMO QUIERAS
• ESTANTES AJUSTABLES: DISEÑADOS PARA ADAPTARSE A TUS NECESIDADES. PUEDES AJUSTAR CADA ESTANTE A LA ALTURA QUE DESEES, PERMITIENDO MAYOR FLEXIBILIDAD PARA ALMACENAR OBJETOS DE DIFERENTES TAMAÑOS, DESDE PEQUEÑOS ADORNOS HASTA CAJAS GRANDES.

VERSATILIDAD PARA MÚLTIPLES AMBIENTES
• INFINIDAD DE USOS PARA UNA ESTANTERIA COMPACTA Y UTIL.
o ALMACÉN
o GARAJE
o COCINA
o OFICINA
o TIENDA
o DORMITORIO
o LAVADERO
o JARDÍN O EXTERIOR CUBIERTO

DATOS TECNICOS
• ALTO : 180 CM
• LARGO : 90 CM
• PROFUNIDAD : 40 CM
• SUPERFICIE DE APOYO : 90 X 40 CM
• MATERIAL : ACERO PINTADO AL POLVO / MDF
• NUMERO DE ESTANTES : 5
• CAPACIDAD DE CARGA : 175 KG'
where sku = 'NB-209';
update products set active = false, ml_item_id = null where sku = 'MLA1911342343';
update products set active = false, ml_item_id = null where sku = 'MLA1911342345';

-- 25-JA17 "Sillon peluquero hidraulico Nexus - C/reposapies - Cromado - Negro" <- MLA2192968218 "Silla Hidráulica Ajustable Behmont Nexus Con Reposapiés Negro Fijo Redonda"
-- Sillon peluquero hidraulico Nexus - estaba mal categorizado en Muebles en vez de Peluqueria, por eso no aparecia en comparaciones anteriores
update products set
  specs = '[{"label":"Tipo de respaldo","value":"Fijo"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"Behmont"},{"label":"Usos recomendados de la silla","value":"Peluquería,Barbería"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Fabricante","value":"Behmont"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"25-JA17 Nexus"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb,
  description = 'Silla de Peluquería Barbería Nexus.
Hidráulica altura Ajustable.
Reposapiés en T.

Material de construcción: Base de Acero y cuerpo de Eco-Cuero.
Características especiales Ergonómico, Altura Ajustable.
Instrucciones de cuidado del producto: Limpiar con un Paño.
Máximo peso recomendado: 150 kg.
Estilo trasero: Respaldo sólido.

Tamaño del bulto: 59 x 58 x 37 cm (19.5kg)'
where sku = '25-JA17';
update products set active = false, ml_item_id = null where sku = 'MLA2192968218';

