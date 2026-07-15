# BEHMONT — Handoff de rediseño visual para Claude Code

Este documento resume el rediseño hecho en `BEHMONT Rediseño.dc.html` (mockup) para implementarlo en el
código real (`behmont-imp`, Next.js + Tailwind). No es código productivo — es la referencia de diseño.

## Qué cambia respecto al sitio actual
- Layout más espacioso: paddings de sección 72–96px (antes ~40–56px), grid de categorías/productos con
  gap 20–22px.
- Hero editorial full-bleed con foto real del local en vez de fondo sólido + texto centrado.
- Tarjetas de categoría y producto con foto real, hover con elevación (`translateY(-3/4px)` + sombra
  difusa `rgba(10,18,38,.18-.2)`), sin bordes ni "recuadros" duros.
- Botones con look "táctil/físico": gradiente vertical sutil (ej. `#182548 → #111C38` para navy,
  `#F15458 → #ED3237` para rojo), sombra interior superior (`inset 0 1px 0 rgba(255,255,255,.15-.25)`)
  + sombra de elevación exterior, `translateY(-1/2px)` en hover, `translateY(1px) scale(.96-.98)` en active.
- Sección "Beneficios" nueva (Financiación / Horarios / Métodos de pago / Promociones) con las piezas
  gráficas de marca ya existentes.
- Ubicación: foto de fachada + mapa de Google Maps embebido lado a lado (antes: un solo placeholder).

## Tipografía
- Display: **Manrope** (600/700/800) — reemplaza a Space Grotesk.
- Body / labels: **Inter** (400–700) — reemplaza también las etiquetas que antes usaban IBM Plex Mono
  (se mantiene el tracking amplio + uppercase para labels, pero con Inter).
- Google Fonts import: `family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700`

## Colores (sin cambios de marca, mismos tokens de `tailwind.config.js`)
- Navy: `#0A1226` (steel-950) / `#111C38` (steel-900) / `#182548` / `#213262`
- Rojo/ámbar: `#ED3237` (amber-500) / `#F15458` (amber-400) / `#D62A2F` (amber-600)
- Neutros: `#F5F6F9` (plate-50) / `#EEF0F2` (plate-100) / `#E8EAF1` (steel-100)
- Texto secundario: `#52649C` (steel-500) / `#9DA7C4` (steel-300) / `#7886AD` (steel-400)

## Imágenes reales ya usadas (están en `uploads/` de este proyecto — copiarlas al repo real, ej. `public/images/`)
- Hero: `WhatsApp Image 2026-05-30 at 12.02.50.jpeg` (pasillo de electrodomésticos)
- Categoría Gastronomía: `IMG_0226.jpg` (cocinas/hornos)
- Categoría Almacén: `IMG_0224.jpg` (pequeños electro)
- Categoría Frío: `Sistemas De Conservación & Diseño Para Comercios Modernos.jpg`
- Categoría Hogar: `IMG_0218.jpg` (sofás/muebles)
- Categoría Decoración: `IMG_0225.jpg` (TVs/audio)
- Categoría Herramientas: `IMG_0219.jpg`
- Ubicación (fachada): `UBICACION.png`
- Beneficios: `FINCIA.png`, `HORARIOS.png`, `METODOS DE PAGO.png`, `PROMOS.png`
- Carnicería, Panadería, Peluquería y Barbería, Estética, Almacenamiento, Oficina: **sin foto todavía**
  (quedaron con placeholder rayado) — pedirle al usuario fotos de esas categorías.

## Estructura de pantallas cubiertas en el mockup
1. **Home**: Hero → Trust stats → Beneficios (4 imágenes) → Categorías (mosaico 12 tiles) → Ofertas
   flash (fondo navy) → Destacados → Ubicación (foto + mapa embebido).
2. **Categoría**: header con foto+nombre+contador, grid de productos.
3. **Producto**: galería (foto principal + 4 miniaturas) + panel de compra + specs + relacionados.

## Próximos pasos sugeridos
1. Implementar estos estilos como componentes Tailwind reales en `src/components/*.tsx`
   (Hero.tsx, CategoryGrid.tsx, ProductCard.tsx, ProductGrid.tsx, Footer.tsx, página de categoría y
   producto) manteniendo la lógica de datos existente (Supabase, WhatsApp, carrito).
2. Agregar la sección "Beneficios" como nuevo componente en el home.
3. Subir las fotos reales a `public/images/` (o Supabase Storage si ya se gestionan ahí) y actualizar
   las referencias.
4. Commitear a GitHub y dejar que el deploy de Vercel corra como siempre.
