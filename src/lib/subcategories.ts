export type Subcategory = {
  name: string;
  keyword: string;
  image: string;
};

// Subcategorías que aparecen como tarjetas dentro de la página de cada categoría padre.
// Al tocar una, filtra los productos de esa página por "keyword" (coincide contra el nombre del producto).
// Las imágenes que empiezan con /images/subcategorias/ son fotos propias curadas; el resto son
// la foto real de un producto representativo de esa subcategoría (mismo criterio que "nunca
// inventar" del resto del sitio -- si ningún producto activo tenía foto, se dejó afuera en vez
// de mostrar algo incorrecto).
export const SUBCATEGORIES: Record<string, Subcategory[]> = {
  gastronomia: [
    { name: 'Cocinas', keyword: 'cocina', image: '/images/products/2220/1.jpg' },
    { name: 'Freidoras', keyword: 'freidora', image: '/images/subcategorias/freidoras.webp' },
    { name: 'Anafes', keyword: 'anafe', image: '/images/products/601400612/1.jpg' },
    { name: 'Carliteros', keyword: 'carlitero', image: '/images/products/196/1.jpg' },
    { name: 'Pancheras', keyword: 'panchera', image: '/images/products/SP-1000/1.jpg' },
    { name: 'Hornos Pizzeros', keyword: 'pizzero', image: '/images/subcategorias/hornos-pizzeros.webp' },
    { name: 'Asadores Criollos', keyword: 'asador', image: '/images/subcategorias/asadores-criollos.webp' },
  ],
  frio: [
    { name: 'Exhibidoras', keyword: 'exhibidora', image: '/images/subcategorias/exhibidoras.webp' },
  ],
  almacen: [
    { name: 'Cortadoras de Fiambre', keyword: 'fiambre', image: '/images/products/250ES-10/1.png' },
    { name: 'Balanzas', keyword: 'balanza', image: '/images/products/400AS-B/1.webp' },
    { name: 'Selladoras', keyword: 'sellador', image: '/images/products/SF-300/1.png' },
  ],
  carniceria: [
    { name: 'Picadoras de Carne', keyword: 'picadora', image: '/images/products/25-JAY04/1.webp' },
    { name: 'Hamburgueseras', keyword: 'hamburguesera', image: '/images/products/HF-100/1.webp' },
    { name: 'Embutidoras', keyword: 'embutidora', image: '/images/products/25-JAY03/1.webp' },
  ],
  panaderia: [
    { name: 'Amasadoras', keyword: 'amasadora', image: '/images/products/HS60/1.webp' },
    { name: 'Sobadoras', keyword: 'sobadora', image: '/images/products/RMJ-500/1.png' },
    { name: 'Ralladoras', keyword: 'ralladora', image: '/images/products/1315/1.jpg' },
  ],
  hogar: [
    { name: 'Cámaras de Seguridad', keyword: 'camara', image: '/images/products/TS-8854C/1.webp' },
  ],
  'peluqueria-barberia': [
    { name: 'Secadores de Pelo', keyword: 'secador', image: '/images/products/CFJ-KM-6832/1.png' },
    { name: 'Planchitas de Pelo', keyword: 'planchita', image: '/images/products/CFJB-KM-6910/1.png' },
    { name: 'Clippers', keyword: 'clipper', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714244593-1.jpg' },
    { name: 'Peines', keyword: 'peine', image: '/images/products/25-YXH112/1.png' },
    { name: 'Lavacabezas', keyword: 'lavacabeza', image: '/images/products/517-8/1.jpg' },
    { name: 'Rizadores', keyword: 'rizador', image: '/images/products/25-YXH110/1.png' },
    { name: 'Sillones y Sillas', keyword: 'sillon', image: '/images/subcategorias/sillones-peluqueria.webp' },
    { name: 'Carritos Ayudantes', keyword: 'ayudante', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2194305160-1.webp' },
  ],
  estetica: [
    { name: 'Camillas', keyword: 'camilla', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1706557905-1.webp' },
    { name: 'Mesas de Manicura', keyword: 'manicura', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3126101014-1.webp' },
  ],
  decoracion: [],
  almacenamiento: [
    { name: 'Racks', keyword: 'rack', image: 'https://http2.mlstatic.com/D_865078-MLA113833200048_072026-O.webp' },
    { name: 'Estanterías', keyword: 'estante', image: 'https://http2.mlstatic.com/D_857607-MLA113644743512_072026-O.webp' },
  ],
  oficina: [
    { name: 'Sillas de Oficina', keyword: 'silla', image: '/images/products/25-JA31/1.jpg' },
  ],
  herramientas: [
    { name: 'Taladros', keyword: 'taladro', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-1.jpg' },
    { name: 'Amoladoras', keyword: 'amoladora', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-1.jpg' },
    { name: 'Atornilladores', keyword: 'atornillador', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2211789840-1.jpg' },
  ],
  electronica: [
    { name: 'Celulares', keyword: 'celular', image: '/images/subcategorias/celulares.webp' },
  ],
  muebles: [
    { name: 'Colchones', keyword: 'colchon', image: '/images/subcategorias/colchones.webp' },
    { name: 'Sillas', keyword: 'silla', image: '/images/products/25-JA31/1.jpg' },
  ],
  electrodomesticos: [
    { name: 'Cocinas', keyword: 'cocina', image: '/images/products/2220/1.jpg' },
    { name: 'Licuadoras', keyword: 'licuadora', image: '/images/products/OTJ-010/1.jpg' },
    { name: 'Pavas Eléctricas', keyword: 'pava', image: '/images/products/42095/1.jpg' },
    { name: 'Cafeteras', keyword: 'cafetera', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-1.webp' },
    { name: 'Aspiradoras', keyword: 'aspiradora', image: '/images/products/517-7/1.png' },
  ],
  climatizacion: [],
  'deportes-aire-libre': [],
  'bebes-ninos': [],
};
