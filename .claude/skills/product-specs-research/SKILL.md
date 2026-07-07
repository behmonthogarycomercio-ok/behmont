---
name: product-specs-research
description: Investiga en internet y redacta características técnicas (specs) y descripciones de productos del catálogo BEHMONT que no las tienen, con la calidad y estructura de una ficha de MercadoLibre. Usar cuando se pida "buscar características", "completar specs", "generar descripciones" o "ficha técnica" para productos sin descripción/specs.
---

# Investigación de características de producto

Este proyecto (BEHMONT) tiene ~2.000 productos cargados desde una lista de
distribuidor sin descripción ni características técnicas (specs), a
diferencia de los ~184 sincronizados desde MercadoLibre que sí las traen.
Esta skill define cómo completar esa información de forma gratuita
(investigación manual con WebSearch/WebFetch, sin APIs pagas) y con calidad
profesional.

## Regla de oro: nunca adivinar

Es preferible dejar un producto sin specs que completarlo con datos
incorrectos. Un dato técnico equivocado (potencia, capacidad, voltaje) genera
reclamos reales de clientes. Antes de extraer cualquier dato, hay que
confirmar que la página encontrada es *exactamente* ese modelo:

- Mismo modelo/código exacto (no "similar" ni "misma línea")
- Misma marca
- Si el producto tiene variantes (color, tamaño, capacidad) y el nombre no
  las especifica con claridad, no inventar cuál es — dejarlo pendiente.

Si no se encuentra una fuente confiable que confirme el modelo exacto, se
omite el producto (no se completa nada) y se lo reporta como "sin fuente
confiable" en vez de forzar un resultad.

## Proceso por producto

1. Tomar `name`, `sku` y `brand.name` de la base.
2. Buscar en internet: `"<marca> <modelo/nombre>" specs` o `ficha técnica`.
   Priorizar en este orden: sitio oficial del fabricante > tiendas grandes
   reconocidas (que citen specs del fabricante) > publicaciones de
   MercadoLibre de otros vendedores del mismo producto exacto.
3. Verificar que el resultado corresponde al modelo exacto (ver regla de oro).
4. Extraer solo **datos factuales** (medidas, potencia, capacidad, material,
   voltaje, garantía del fabricante, etc.) — nunca copiar párrafos
   descriptivos/de marketing textuales de otra página (son propiedad de
   quien los escribió). Los datos técnicos en sí (ej. "1500 W") no tienen
   derecho de autor, pero la redacción de la descripción sí debe ser propia.

## Formato de salida — specs (characteristics)

Igual al que ya usa la ficha de producto del sitio
(`src/app/(public)/producto/[slug]/page.tsx`, tipo `ProductSpec` en
`src/lib/types.ts`): un array de `{ label, value }`. Para que se vea con la
densidad de una ficha de MercadoLibre, apuntar a 6–12 filas cuando haya datos
reales disponibles, priorizando en este orden si aplica al producto:

1. Marca
2. Modelo
3. Color
4. Material
5. Dimensiones (alto x ancho x profundidad, o el subconjunto que aplique)
6. Peso
7. Potencia / Voltaje (para eléctricos)
8. Capacidad (litros, kg, etc. según corresponda)
9. Condición del ítem → siempre `"Nuevo"` salvo que la publicación original
   diga lo contrario
10. Otros datos técnicos relevantes específicos del rubro (ej. "Cantidad de
    velocidades", "Tipo de conexión", "RPM")

No repetir el label "SKU" (ya se resuelve aparte vía
`src/lib/product-display.ts`). No inventar filas sin dato real disponible —
mejor 5 filas reales que 10 con relleno.

## Formato de salida — descripción

2–4 oraciones, redacción propia (no traducida/copiada de otra ficha), en
español neutro rioplatense acorde al resto del sitio, orientada al uso
práctico del producto (para qué sirve, a quién le sirve, qué lo distingue).
Sin superlativos vacíos ("el mejor", "increíble") — concreto y directo, en
línea con el resto de las descripciones ya cargadas del sync de MercadoLibre
(ver ejemplos existentes en la tabla `products` para calibrar tono).

## Entrega del resultado

Como no hay acceso de escritura a la base de datos en este proyecto (ver
memoria del proyecto), el resultado de cada tanda se entrega como:

1. Un resumen por producto (para revisión rápida del dueño).
2. Un archivo SQL (`update products set specs = '...'::jsonb, description =
   '...' where sku = '...';`) listo para correr en el SQL Editor de Supabase,
   siguiendo el mismo patrón ya usado en las migraciones anteriores del
   proyecto (`supabase/migration_00X_*.sql`).

Trabajar en tandas chicas (10–20 productos) y confirmar calidad antes de
escalar a más, dado que cada producto requiere investigación real y no es
instantáneo.
