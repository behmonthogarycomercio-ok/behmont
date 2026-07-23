-- Migracion 083: 2 tintoreros (Moscow, Miami) confirmados por nombre de
-- linea de producto exacto -unico candidato posible en cada caso-, pese
-- a que el campo Modelo de sus specs decia algo no relacionado ("Rio").
-- Es la fusion con mayor diferencia de stock aceptada hasta ahora, se
-- avisa por las dudas. Ya aplicado.

-- 517-4 "Tintorero portatil Moscow - C/recipientes - Plastico" <- MLA1511071051 "Tintorero Telescópico + 2 Recipientes Behmont Moscow Negro"
-- Tintorero Moscow (nombre de linea exacto, unico candidato; stock 36 vs 6, mayor diferencia de este batch)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Altura","value":"90 m"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"35 cm"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Vidrio"},{"label":"Modelo","value":"Río"},{"label":"Usos recomendados","value":"Barbearia,Carrito Tintorero,Peluquería,Salón de belleza,Tinta para pelo,Tintorero Acrílico"},{"label":"Ancho","value":"55 cm"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Tintorero Acrílico Behmont Moscow es la solución ideal para profesionales de la peluquería, barbería y salón de belleza. Con un diseño funcional que incluye dos recipientes de vidrio y 2 pinceles, facilita el proceso de tintura al mantener todos los productos organizados y al alcance de la mano. Su estructura robusta y base elegante de vidrio contribuye a un ambiente de trabajo ordenado y atractivo.

55 cm de ancho, 35 cm de largo y 90 cm de altura.
Equipado con ruedas, permite una movilidad fluida.
Optimizan el flujo de trabajo en cualquier salón. 
Armazón plástico de alta calidad.
Mesa base de Vidrio.
Los accesorios incluidos: 2 recipientes para preparaciones de tintorería, 2 pinceles y Alfombra Antideslizante.


El Tintorero Acrílico con accesorios Behmont Moscow combina durabilidad con un aspecto moderno que complementa la decoración de tu espacio de trabajo. Aumenta la eficiencia en tus servicios y mejora la experiencia de tus clientes con este carro tintorero excepcional.'
where sku = '517-4';
update products set active = false, ml_item_id = null where sku = 'MLA1511071051';

-- 517-6 "Tintorero portatil Miami - C/recipientes, alfombra, pinceles y recipientes p/limpieza - Acrilico" <- MLA1511096949 "Tintorero Acrílico 2 Recipientes Y Accesorios Behmont Miami Negro"
-- Tintorero Miami (nombre de linea exacto, unico candidato; stock 9 vs 6)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Altura","value":"96 m"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"34 cm"},{"label":"Material","value":"Vidrio"},{"label":"Modelo","value":"Río"},{"label":"Usos recomendados","value":"Barbearia,Carrito Tintorero,Peluquería,Salón de belleza,Tinta para pelo,Tintorero Acrílico"},{"label":"Ancho","value":"49 cm"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Tintorero Acrílico Behmont Miami es la herramienta ideal para profesionales de la peluquería y barbería que buscan eficiencia y estilo en su espacio de trabajo. Su estructura robusta y elegante no solo aporta funcionalidad, sino que también realza la estética de cualquier salón de belleza.

96 cm de altura, 34 cm de largo y 49 cm de ancho.
Las ruedas incorporadas ofrecen movilidad sin esfuerzo.
Versatilidad ya sea para aplicaciones de tinturas capilares o la organización de productos de belleza.
Mesa base de vidrio acrílico.
Accesorios: 2 recipientes para preparados, 2 recipientes para limpieza, 2 pinceles, alfombra antideslizante.

Este carrito permite una organización óptima de los productos de tintura, facilitando el acceso a lo que necesites en cada momento. 
Sentí la diferencia en tu día a día y mejora la experiencia de trabajo en tu salón con este elemento esencial y elegante.'
where sku = '517-6';
update products set active = false, ml_item_id = null where sku = 'MLA1511096949';

