export type Subcategory = {
  name: string;
  keyword: string;
  image: string;
};

// Subcategorías que aparecen como tarjetas dentro de la página de cada categoría padre.
// Al tocar una, filtra los productos de esa página por "keyword" (coincide contra el nombre del producto).
// Las imágenes en /images/subcategorias/ son fotos curadas (subidas a mano). Las que apuntan a
// una URL son la foto real de un producto representativo, usada como respaldo para las
// subcategorías que todavía no tienen foto propia -- nunca se muestra nada para las que no
// tienen ninguna de las dos, en vez de mostrar algo incorrecto.
export const SUBCATEGORIES: Record<string, Subcategory[]> = {
  gastronomia: [
    { name: 'Cocinas', keyword: 'cocina', image: '/images/subcategorias/cocinas.webp' },
    { name: 'Freidoras', keyword: 'freidora', image: '/images/subcategorias/freidoras.webp' },
    { name: 'Anafes', keyword: 'anafe', image: '/images/products/601400612/1.jpg' },
    { name: 'Carliteros', keyword: 'carlitero', image: '/images/products/196/1.jpg' },
    { name: 'Pancheras', keyword: 'panchera', image: '/images/products/SP-1000/1.jpg' },
    { name: 'Hornos Pizzeros', keyword: 'pizzero', image: '/images/subcategorias/hornos-pizzeros.webp' },
    { name: 'Asadores Criollos', keyword: 'asador', image: '/images/subcategorias/asadores-criollos.webp' },
    { name: 'Ralladoras', keyword: 'rallador', image: '/images/products/1315/1.jpg' },
  ],
  frio: [
    { name: 'Heladeras', keyword: 'heladera', image: '/images/subcategorias/heladeras.webp' },
    { name: 'Exhibidoras', keyword: 'exhibidora', image: '/images/subcategorias/exhibidoras.webp' },
    { name: 'Freezers', keyword: 'freezer', image: '/images/subcategorias/freezers.webp' },
  ],
  almacen: [
    { name: 'Cortadoras de Fiambre', keyword: 'fiambre', image: '/images/subcategorias/cortadoras-fiambre.webp' },
    { name: 'Balanzas', keyword: 'balanza', image: '/images/subcategorias/balanzas.webp' },
    { name: 'Góndolas y Exhibidores', keyword: 'gondola', image: '/images/subcategorias/gondolas.webp' },
    { name: 'Gaveta de Dinero', keyword: 'gaveta', image: '/images/subcategorias/gaveta.webp' },
    { name: 'Selladoras', keyword: 'sellador', image: '/images/products/SF-300/1.png' },
  ],
  carniceria: [
    { name: 'Picadoras de Carne', keyword: 'picadora', image: '/images/subcategorias/picadoras.webp' },
    { name: 'Hamburgueseras', keyword: 'hamburguesera', image: '/images/subcategorias/hamburgueseras.webp' },
    { name: 'Sierras', keyword: 'sierra', image: '/images/subcategorias/sierras.webp' },
    { name: 'Embutidoras', keyword: 'embutidora', image: '/images/subcategorias/embutidoras.webp' },
  ],
  panaderia: [
    { name: 'Amasadoras', keyword: 'amasadora', image: '/images/subcategorias/amasadoras.webp' },
    { name: 'Hornos', keyword: 'horno', image: '/images/subcategorias/hornos-panaderia.webp' },
    { name: 'Sobadoras', keyword: 'sobadora', image: '/images/subcategorias/sobadoras.webp' },
  ],
  hogar: [
    { name: 'Cámaras de Seguridad', keyword: 'camara', image: '/images/products/TS-8854C/1.jpg' },
  ],
  'peluqueria-barberia': [
    { name: 'Secadores de Pelo', keyword: 'secador', image: '/images/subcategorias/secadores.webp' },
    { name: 'Planchitas de Pelo', keyword: 'planchita', image: '/images/products/CFJB-KM-6910/1.png' },
    { name: 'Clippers', keyword: 'clipper', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714244593-1.jpg' },
    { name: 'Trimmers y Patilleras', keyword: 'trimmer', image: '/images/subcategorias/trimmers.webp' },
    { name: 'Peines', keyword: 'peine', image: '/images/products/25-YXH112/1.png' },
    { name: 'Lavacabezas', keyword: 'lavacabeza', image: '/images/products/517-8/1.jpg' },
    { name: 'Rizadores', keyword: 'rizador', image: '/images/products/25-YXH110/1.png' },
    { name: 'Sillones y Sillas', keyword: 'sillon', image: '/images/subcategorias/sillones-peluqueria.webp' },
    { name: 'Carritos Ayudantes', keyword: 'ayudante', image: '/images/subcategorias/carritos-ayudantes.webp' },
  ],
  estetica: [
    { name: 'Camillas', keyword: 'camilla', image: '/images/subcategorias/camillas.webp' },
    { name: 'Mesas de Manicura', keyword: 'manicura', image: '/images/subcategorias/mesas-manicura.webp' },
    { name: 'Depiladoras', keyword: 'depiladora', image: '/images/subcategorias/depiladoras.webp' },
  ],
  decoracion: [
    { name: 'Espejos Ovalados', keyword: 'ovalado', image: '/images/subcategorias/espejos-ovalados.webp' },
    { name: 'Espejos Rectangulares', keyword: 'rectangular', image: '/images/subcategorias/espejos-rectangulares.webp' },
    { name: 'Espejos con Iluminación', keyword: 'led', image: '/images/subcategorias/espejos-iluminacion.webp' },
  ],
  almacenamiento: [
    { name: 'Racks', keyword: 'rack', image: '/images/subcategorias/racks.webp' },
    { name: 'Estanterías', keyword: 'estante', image: '/images/subcategorias/estanterias.webp' },
  ],
  oficina: [
    { name: 'Sillas de Oficina', keyword: 'silla', image: '/images/subcategorias/sillas-oficina.webp' },
  ],
  herramientas: [
    { name: 'Hidrolavadoras', keyword: 'hidrolavadora', image: '/images/subcategorias/hidrolavadoras.webp' },
    { name: 'Taladros', keyword: 'taladro', image: '/images/subcategorias/taladros.webp' },
    { name: 'Amoladoras', keyword: 'amoladora', image: '/images/subcategorias/amoladoras.webp' },
    { name: 'Atornilladores', keyword: 'atornillador', image: '/images/subcategorias/atornilladores.webp' },
  ],
  electronica: [
    { name: 'Televisores', keyword: 'smart', image: '/images/subcategorias/televisores.webp' },
    { name: 'Celulares', keyword: 'celular', image: '/images/subcategorias/celulares.webp' },
    { name: 'Parlantes', keyword: 'parlante', image: '/images/subcategorias/parlantes.webp' },
    { name: 'Tablets', keyword: 'tablet', image: '/images/subcategorias/tablets.webp' },
    { name: 'Notebooks', keyword: 'notebook', image: '/images/subcategorias/notebooks.webp' },
    { name: 'Auriculares', keyword: 'auricular', image: '/images/subcategorias/auriculares.webp' },
    { name: 'Mouse y Teclados', keyword: 'teclado', image: '/images/subcategorias/mouse-teclado.webp' },
  ],
  muebles: [
    { name: 'Colchones', keyword: 'colchon', image: '/images/subcategorias/colchones.webp' },
    { name: 'Sillas', keyword: 'silla', image: '/images/subcategorias/sillas-muebles.webp' },
    { name: 'Placares', keyword: 'placar', image: '/images/subcategorias/placares.webp' },
    { name: 'Vitrinas y Mostradores', keyword: 'vitrina', image: '/images/subcategorias/vitrinas.webp' },
  ],
  electrodomesticos: [
    { name: 'Cocinas', keyword: 'cocina', image: '/images/subcategorias/cocinas-electro.webp' },
    { name: 'Microondas', keyword: 'microondas', image: '/images/subcategorias/microondas.webp' },
    { name: 'Aspiradoras', keyword: 'aspiradora', image: '/images/subcategorias/aspiradoras.webp' },
    { name: 'Lavarropas', keyword: 'lavarropa', image: '/images/subcategorias/lavarropas.webp' },
    { name: 'Ventiladores', keyword: 'ventilador', image: '/images/subcategorias/ventiladores.webp' },
    { name: 'Licuadoras', keyword: 'licuadora', image: '/images/subcategorias/licuadoras.webp' },
    { name: 'Pavas Eléctricas', keyword: 'pava', image: '/images/products/42095/1.jpg' },
    { name: 'Cafeteras', keyword: 'cafetera', image: 'https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-1.webp' },
  ],
  climatizacion: [
    { name: 'Aires Acondicionados', keyword: 'acondicionador', image: '/images/subcategorias/aires-acondicionados.webp' },
    { name: 'Calefactores', keyword: 'calefactor', image: '/images/subcategorias/calefactores.webp' },
  ],
  'deportes-aire-libre': [
    { name: 'Bicicletas', keyword: 'bicicleta', image: '/images/subcategorias/bicicletas.webp' },
    { name: 'Carpas y Gazebos', keyword: 'carpa', image: '/images/subcategorias/carpas.webp' },
    { name: 'Parrillas', keyword: 'parrilla', image: '/images/subcategorias/parrillas.webp' },
    { name: 'Reposeras', keyword: 'reposera', image: '/images/subcategorias/reposeras.webp' },
  ],
  'bebes-ninos': [],
};
