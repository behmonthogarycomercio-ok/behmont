# BEHMONT-IMP — Catálogo online + Panel admin + Sync MercadoLibre

Sitio de catálogo para equipamiento comercial (gastronomía, panadería, carnicería,
frío, almacén, hogar), inspirado en el estilo de myacomercial.com, con:

- Catálogo público (categorías, buscador, ofertas, banners) — Next.js 14 (App Router) + Tailwind
- Pedido por WhatsApp: el cliente arma un carrito, completa sus datos y el pedido se
  envía formateado a tu WhatsApp (además queda guardado en la base de datos)
- Sincronización automática con **MercadoLibre** (API oficial): precio y stock de tus
  publicaciones se actualizan solos cada 30 minutos
- Panel de administración con login (`/admin`): categorías, productos, precios, stock,
  códigos, imágenes, promociones/banners y marcas — todo editable sin tocar código
- Base de datos y autenticación: **Supabase** (Postgres + Auth + Storage), mismo stack
  que usaste en BarberOS

## 1. Crear el proyecto en Supabase

1. Andá a [supabase.com](https://supabase.com) → **New project**.
2. Una vez creado, abrí **SQL Editor** → **New query**, pegá todo el contenido de
   `supabase/schema.sql` y ejecutalo. Esto crea todas las tablas, políticas de
   seguridad (RLS) y el bucket de imágenes.
3. En **Project Settings → API** copiá:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (¡nunca la expongas al cliente!)
4. Creá tu usuario admin: **Authentication → Users → Add user** (email + contraseña).
   Con eso ya podés entrar a `/admin`.

## 2. Cargar categorías, marcas y productos iniciales

En el **SQL Editor** de Supabase, después de `schema.sql`, corré en este orden:

1. `supabase/seed_categories.sql` — las 6 categorías de la web de referencia
   (Gastronomía, Almacén, Carnicería, Panadería, Frío, Hogar) + **Importados**.
2. `supabase/seed_brands.sql` — 200 marcas extraídas de tu lista de precios.
3. `supabase/seed_products.sql` — 2.251 productos importados de `Lista.csv`
   (código, nombre, marca, precio, stock).

**Importante sobre las categorías de los productos:** el excel no trae una columna de
categoría por producto. Los que aparecen como `Behmont - IMP - ...` quedaron
automáticamente en **Importados** (238 productos). El resto (Acer, Alcatel, Liliana,
Philco, Samsung, etc.) quedó **sin categoría asignada** — asignalos desde
`/admin/productos` a Gastronomía / Almacén / Carnicería / Panadería / Frío / Hogar
según corresponda, o pedime que te ayude a clasificarlos por lote si me das los criterios
(por palabra clave, por marca, etc.).

Si en el futuro actualizás tu lista de precios, podés regenerar estos 3 archivos con:

```bash
python3 scripts/import-lista-csv.py /ruta/a/tu/Lista.csv
```

y volver a correr los `.sql` generados (usan `on conflict` así que actualizan lo
existente sin duplicar).

> Nota de calidad de datos: el excel trae algunas marcas repetidas por error de tipeo
> (ej. "Behmont" / "Behmotn") y algunos renglones usan como "marca" en realidad una
> categoría genérica (Gastronomia, Blanqueria, Bebitos, Descansar). Quedan importadas
> tal cual para que decidas si las corregís/fusionás desde `/admin/marcas`.

## 3. Configurar variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número donde llegan los pedidos (también se puede
  cambiar después desde `/admin/marcas` sin redeployar).
- `CRON_SECRET`: cualquier string largo random — protege el endpoint de sync automático.

## 4. Conectar MercadoLibre (API oficial)

1. Entrá a [developers.mercadolibre.com.ar](https://developers.mercadolibre.com.ar/devcenter)
   y creá una aplicación nueva.
2. Como **Redirect URI** poné: `https://tu-dominio.com/api/ml/oauth/callback`
   (mientras probás en local: `http://localhost:3000/api/ml/oauth/callback`).
3. Copiá el `Client ID` y `Client Secret` a `.env.local` (`ML_CLIENT_ID`, `ML_CLIENT_SECRET`)
   y poné la misma redirect URI en `ML_REDIRECT_URI`.
4. Corré el proyecto, entrá a `/admin/marcas` y hacé clic en **"Conectar con MercadoLibre"**.
   Vas a autorizar la app con tu cuenta vendedora y quedará todo guardado.
5. Desde ahí podés usar **"Sincronizar ahora"** en cualquier momento, o dejar que el
   cron automático (cada 30 min, configurado en `vercel.json`) lo haga solo.

> Nota: el sync trae **todas** tus publicaciones activas de MercadoLibre y las crea/actualiza
> como productos (match por `ml_item_id`). Si querés productos que NO estén en MercadoLibre,
> cargalos manualmente desde `/admin/productos` — no se van a tocar por el sync.

## 5. Correr en local

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000` (catálogo) y `http://localhost:3000/admin` (panel).

## 6. Deploy (mismo flujo que usaste en BarberOS)

1. Subí el repo a GitHub (podés usar el mismo patrón de remote con token que ya usás).
2. Importá el repo en [vercel.com](https://vercel.com) → **New Project**.
3. Cargá las mismas variables de entorno de `.env.local` en **Settings → Environment Variables**.
4. Deploy. Vercel va a detectar automáticamente `vercel.json` y activar el cron de
   sincronización con MercadoLibre.
5. Actualizá `ML_REDIRECT_URI` (y la redirect URI en developers.mercadolibre.com.ar)
   al dominio final de producción.

## Estructura del proyecto

```
src/
  app/
    page.tsx                    → home (hero, categorías, destacados, ofertas, marcas)
    categoria/[slug]/page.tsx   → listado por categoría
    producto/[slug]/page.tsx    → ficha de producto
    pedido/page.tsx             → carrito + formulario → WhatsApp
    buscar/page.tsx             → resultados de búsqueda
    admin/
      page.tsx                  → login
      dashboard/                → resumen (stock bajo, últimos pedidos)
      productos/                → CRUD de productos + imágenes
      categorias/                → CRUD de categorías
      promociones/                → banners del home (hero / banner / strip)
      stock/                     → edición rápida de precio y stock
      marcas/                     → marcas + conexión y sync de MercadoLibre + Nº de WhatsApp
    api/
      whatsapp/order/route.ts   → registra el pedido y arma el link de WhatsApp
      ml/sync/route.ts          → sincroniza productos desde MercadoLibre
      ml/oauth/callback/route.ts → completa la autorización de MercadoLibre
      ml/webhook/route.ts       → recibe notificaciones en tiempo real de MercadoLibre
  components/                   → UI del catálogo + panel admin
  lib/
    supabase/                   → clientes de Supabase (browser / server / service role)
    actions.ts                  → server actions (CRUD del admin)
    data.ts                     → queries del catálogo público
    mercadolibre.ts             → cliente de la API oficial de MercadoLibre
    whatsapp.ts                 → armado del mensaje y link de WhatsApp
    cart-context.tsx            → carrito (persistido en localStorage)
supabase/schema.sql              → base de datos completa (tablas + RLS + storage)
```

## Identidad visual

Paleta "steel + amber" (acero industrial + acento ámbar de señalización), pensada para
transmitir robustez y profesionalismo de equipamiento comercial — definida como tokens
en `tailwind.config.js` (`steel`, `amber`, `plate`) para que sea fácil de ajustar.

## Próximos pasos sugeridos

- Cargar categorías, marcas y las primeras promociones desde `/admin` (o directo por SQL).
- Si preferís seguir iterando con Claude Code (como con BarberOS), este proyecto ya
  está listo para clonar y continuar ahí — misma estructura Next.js + Supabase.
- Agregar métodos de pago / checkout online es un paso natural más adelante si en algún
  momento querés ir más allá del modelo "consulta por WhatsApp".
