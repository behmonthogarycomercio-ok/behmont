# BEHMONT — Comercio y Hogar — Contexto del proyecto (actualizado)

Pegá este documento al inicio de tu sesión en Claude Code (modo plan) para que tenga contexto
completo sin repetir el historial del chat. Reemplaza la versión anterior de este archivo.

## Qué es

Sitio de catálogo online para BEHMONT — Comercio y Hogar (Concordia, Entre Ríos): equipamiento
comercial, mueblería, hogar, electrónica y barbería. Pedidos por WhatsApp (no hay checkout con
pago online). Repo: `github.com/behmonthogarycomercio-ok/behmont`. Deploy: Vercel
(`https://behmontweb.vercel.app`). Base de datos: Supabase (proyecto `pobfcnezbxrprtymyivi`).

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS · Supabase (Postgres + Auth + Storage) ·
MercadoLibre API oficial (OAuth2 + PKCE) · Vercel Cron (plan Hobby, 1x/día) · recharts (gráficos
del admin) · xlsx / SheetJS (export a Excel).

## ⚠️ Antes de tocar nada de diseño: correr estas migraciones pendientes en Supabase

Si todavía no se corrieron (revisar en el SQL Editor de Supabase), faltan:

1. `supabase/migration_002_customer_address.sql` — dirección del cliente en los pedidos
2. `supabase/migration_003_split_importados.sql` — desglosa "Importados" en 6 categorías reales
   (Peluquería y Barbería, Estética, Decoración, Almacenamiento, Oficina, Herramientas) +
   reubica productos mal categorizados a Carnicería/Panadería/Frío/Hogar + corrige marca Kemei
3. `supabase/migration_004_product_specs.sql` — columna `specs` (características técnicas)

Sin estas, partes del sitio (dirección en pedidos, categorías nuevas, características de
producto) no van a funcionar aunque el código ya esté deployado.

## Identidad de marca

- **Logo**: `public/images/logo-behmont.png` (fondo transparente, para fondos claros) y
  `public/images/logo-behmont-dark.png` (fondo navy incluido, para el sidebar oscuro del admin)
- **Colores** (reales, extraídos del logo — tokens `steel`/`amber` en `tailwind.config.js`):
  Navy `#111C38` (`steel-900`), Rojo `#ED3237` (`amber-500`)
- Tipografías: Space Grotesk (display/títulos), Inter (body), IBM Plex Mono

## Categorías (después de correr migration_003)

Gastronomía, Almacén, Carnicería, Panadería, Frío, Hogar, **Peluquería y Barbería**, **Estética**,
**Decoración**, **Almacenamiento**, **Oficina**, **Herramientas**. ("Importados" queda
desactivada, ya no se muestra — todo su contenido se reubicó en las categorías de arriba.)

## Productos y datos

- ~2.251 productos totales: 184 sincronizados en vivo desde MercadoLibre (con `ml_item_id`),
  el resto cargados una vez desde la lista de precios del distribuidor (`Lista.csv`, script
  `scripts/import-lista-csv.py`, reproducible si se actualiza la lista)
- **~2.000 productos siguen sin categoría asignada** (la lista del distribuidor no traía esa
  columna) — el usuario decidió NO categorizarlos automáticamente por ahora; queda pendiente
  categorizar a mano desde `/admin/productos` o pedir ayuda para armar reglas más adelante
- **Descripciones y características**: los productos de MercadoLibre traen descripción y specs
  reales desde ML en cada sync. Los ~2.000 restantes no tienen — el usuario va a generarlas
  aparte (evaluando más adelante usar la API de Claude con un botón "Generar con IA" en el
  admin; no se construyó todavía, queda como posible próximo paso si lo pide)

## Sincronización con MercadoLibre — cómo funciona exactamente

- **Web → ML**: instantánea. Al editar precio/stock de un producto vinculado (con `ml_item_id`)
  desde `/admin/productos` o `/admin/stock`, se empuja el cambio a la publicación de ML al
  momento de guardar (best-effort: si falla, no bloquea el guardado local, queda en
  `ml_sync_log`)
- **ML → Web**: NO instantánea. Corre 1 vez por día por cron (9am UTC, límite del plan Hobby de
  Vercel) o manualmente con el botón "Sincronizar ahora" en `/admin/marcas`
- Solo sincroniza precio, stock, nombre, imagen principal, descripción y características —
  NO categoría manual (nunca la pisa) ni otros campos
- SKU: usa el código propio cargado en MercadoLibre (`seller_custom_field`); si el producto no
  tiene uno, usa el ID interno de ML como fallback
- Categorización automática (solo para productos SIN categoría, nunca pisa una ya asignada):
  reglas por palabra clave en `src/lib/categorize.ts`

## Panel admin (`/admin`, protegido con Supabase Auth, sin link visible desde el sitio público)

- `/admin/dashboard` — resumen general
- `/admin/metricas` — **CRM/métricas**: ventas del mes, ticket promedio, productos más vendidos
  (gráfico), tendencia 6 meses (gráfico), ventas por día (gráfico), ranking de ubicaciones de
  clientes (a partir de la dirección cargada en el pedido), botón para exportar todo a `.xlsx`
- `/admin/productos` — CRUD + imágenes + características (specs) + push automático a ML
- `/admin/categorias`, `/admin/promociones`, `/admin/stock`
- `/admin/marcas` — marcas, conexión/sync de MercadoLibre, y **Contacto y redes**: email,
  teléfono, dirección, horarios de atención, Instagram, Facebook, URL de tienda ML

## Páginas públicas

`/` (home con hero, categorías, destacados, banners, marcas, mapa de ubicación con horarios),
`/categoria/[slug]`, `/producto/[slug]` (con sección de características), `/buscar`, `/pedido`
(carrito → WhatsApp, con dirección de entrega opcional), `/mayorista` (formulario B2B → mismo
mecanismo de WhatsApp), `/faq` (acordeón con preguntas frecuentes reales del negocio).

## Contacto / redes reales (cargados en `site_settings` vía `/admin/marcas`)

- Email: `behmont.equipamientos@gmail.com`
- Teléfono/WhatsApp: `+54 345 401-5358` (pedidos llegan a este número)
- Dirección: San Lorenzo Oeste 380, Concordia, Entre Ríos
- Horarios: Lun a Vie 08:00-12:30 y 16:00-20:00 · Sáb 08:00-13:00
- Instagram: `instagram.com/behmont_comercio`
- Facebook: `facebook.com/behmont.equipamientoscomerciales`
- Seguimiento de pedidos: redirige a `andreani.com` (despacho por Andreani)

## Mensajes de WhatsApp — texto exacto ya definido, no cambiar sin pedirlo

- Botones de "Consultar" (flotante, producto, ubicación): *"¡Hola Lucas! 👋 Me comunico desde la
  página web porque quiero hacer una consulta sobre un producto. Muchas gracias."*
- Pedido del carrito: mensaje estructurado con datos del cliente + lista de productos + total
  (se arma en `src/lib/whatsapp.ts`, función `buildOrderMessage`)

## Lo que pidió explícitamente seguir en Claude Code

**Parte estética / diseño** — el usuario quiere profundizar acá. La base de colores/tipografía
real de marca ya está aplicada (ver "Identidad de marca" arriba), pero el resto del diseño
(layout, composición, detalles visuales, posibles animaciones, mejoras de UX) se armó con
buenas prácticas genéricas — hay margen real para mejorar y personalizar mucho más.

## Pendientes que quedaron abiertos (no urgentes, mencionar si preguntan)

1. Categorización de los ~2.000 productos sin categoría (decisión pendiente del usuario)
2. Generación de descripciones/características para esos mismos productos (el usuario lo va a
   hacer aparte, "después")
3. Feed de Instagram embebido en el sitio (mencionado como pendiente, no se llegó a construir)
4. Evaluar checkout con pago online más adelante (hoy 100% consulta por WhatsApp)

## Convenciones de trabajo con el usuario

- Windows + Git Bash (MINGW64). Ruta: `C:\Users\BEHMONT\Desktop\BEHMONT WEB\behmont-imp`
- Push a GitHub vía token embebido en la URL del remote
- El usuario no es programador — explicaciones paso a paso, sin asumir conocimiento previo
- Preferencia por planificar antes de ejecutar (de ahí el "modo plan" de Claude Code)
