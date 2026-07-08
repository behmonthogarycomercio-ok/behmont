Retomá la investigación de specs/descripciones de productos de BEHMONT
(catálogo online, `C:\Users\BEHMONT\Desktop\BEHMONT WEB\behmont-imp`).

## Estado al 2026-07-08
- Migraciones **confirmadas corridas** en Supabase (verificado por lectura,
  specs ya no vacías): `migration_007` a `migration_016` (batches 1 a 9,
  ~211 productos con specs completas).
- `migration_017_specs_batch10.sql` (tanda 10, 30 productos, categoría
  **Electrodomésticos**) fue GENERADA pero el dueño **todavía no confirmó
  haberla corrido** en el SQL Editor de Supabase — preguntale antes de asumir
  nada y, si hace falta, verificá con el script Node de abajo.
- A partir de la tanda 10 se empezó a trabajar **por categoría** (pedido
  explícito del dueño, "para ser más ordenados") en vez de por orden de id.
  Orden de categorías pendientes (de mayor a menor volumen, relevado
  2026-07-07): Electrodomésticos (330, quedan 300 después de tanda 10),
  Electrónica (227), Gastronomía (195), Muebles (169), Peluquería y
  Barbería (162), Frío (116), Deportes y Aire Libre (79), Almacén (62),
  Climatización (62), Carnicería (50), Panadería (43), Herramientas (39),
  Hogar (31), Decoración (18), Oficina (17), Estética (16),
  Almacenamiento (16). Hay además 451 productos "(sin categoría)" — dejarlos
  para el final y antes preguntarle al dueño a qué categoría corresponden.
- Tamaño de tanda acordado con el dueño: **30 productos**.

## Contexto general (no cambia)
- Skill: `.claude/skills/product-specs-research/SKILL.md` (proceso completo:
  WebSearch/WebFetch sin APIs pagas, nunca inventar, entregar como
  `supabase/migration_0XX_specs_batchN.sql` + resumen en el chat).
- No hay acceso de escritura a Supabase desde esta sesión. Sí hay acceso de
  LECTURA vía `.env.local` (`NEXT_PUBLIC_SUPABASE_URL` +
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`) con un script Node chico +
  `@supabase/supabase-js` (ya es dependencia del proyecto).
- Catálogo del distribuidor (línea de importados propios Behmont) extraído a
  texto en `C:\Users\BEHMONT\Desktop\BEHMONT\CATALOGO\catalogo_full.txt`
  (con `pdftotext -layout`) — revisar ahí PRIMERO (grep/Bash) para productos
  marca "Behmont" antes de salir a la web. Patrón del catálogo: el código
  "COD. XXXX" aparece DESPUÉS de la descripción del producto al que
  corresponde (no antes) — ojo al leerlo.

## Cómo elegir la próxima tanda (30 productos, por categoría)
Script Node de ejemplo (ejecutar con `node`, luego borrarlo):
```js
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n')
    .filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const { data, count } = await supabase
  .from('products')
  .select('id,name,sku,brand:brands(name),category:categories(name)', { count: 'exact' })
  .or('specs.is.null,specs.eq.[]')
  .order('id')
  .range(0, 199) // traer un pool grande y despues filtrar por category.name en JS
console.log('total sin specs:', count)
```
Filtrar en JS por `category.name === 'Electrónica'` (o la que corresponda) y
tomar de ahí los primeros ~40-50 candidatos (para tener margen, porque no
todos van a tener fuente confiable — históricamente ronda 60-75% de
confirmación). Excluye automáticamente lo ya completado en tandas corridas.

## Reglas clave (de la skill, no las repitas de memoria — leé el archivo)
- Regla de oro: nunca inventar. Si no hay fuente confiable que confirme el
  modelo EXACTO, se deja afuera del batch y se reporta aparte.
- **Ojo con conflictos de datos**: cuando el código exacto arroja specs que
  CONTRADICEN el nombre cargado en la base (ejemplos ya encontrados: un
  horno "P/Visor" cuyo código real era "Ciego"; una cámara "2 Antenas" cuyo
  código real es de 3 antenas; un "Vaporizador casco" cuyo código real es
  "Humidificador Casco"; una exhibidora "1440L/5 estantes" cuyo código real
  es 1350L/12 estantes; una plancha "base aluminio" cuyo código real es
  base cerámica). Ante una contradicción así, EXCLUIR y reportar aparte.
- Variantes de sufijo menores (ej. código publicado "BLSTKAPWRD" vs SKU
  "BLSTKPWRD" en la base, o "PAS1217E" vs "PAS1217") NO son conflicto si
  todos los demás datos (potencia, capacidad, color, features) coinciden
  exactamente — se toman como el mismo producto.
- SKUs corruptos en notación científica (ej. `7,79801E+12`): se puede seguir
  completando specs igual si aparecen (el `where sku = '...'` matchea el
  string tal cual), pero no vale la pena investigarlos activamente porque
  suelen ser marcas chicas/genéricas sin ficha online.
- Trabajar en tandas de 30, entregar resumen en tabla (SKU | Marca |
  Producto) + lista de excluidos con motivo, y preguntar si seguir con la
  próxima tanda.

## Al terminar cada tanda
Recordá que el usuario tiene que correr el `.sql` en el SQL Editor de
Supabase para que los cambios se reflejen en el sitio — no asumas que ya lo
hizo salvo que te lo confirme. Si tenés dudas, verificá leyendo la tabla
`products` con el script Node (specs ya no debería ser `[]` para esos SKU).
