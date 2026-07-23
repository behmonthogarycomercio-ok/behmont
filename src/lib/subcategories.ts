export type Subcategory = {
  name: string;
  keyword: string;
  image: string;
};

// Subcategorías que aparecen como tarjetas dentro de la página de cada categoría padre.
// Al tocar una, filtra los productos de esa página por "keyword" (coincide contra el nombre del producto).
export const SUBCATEGORIES: Record<string, Subcategory[]> = {
  gastronomia: [
    { name: 'Cocinas', keyword: 'cocina', image: '/images/subcategorias/cocinas.webp' },
    { name: 'Freidoras', keyword: 'freidora', image: '/images/subcategorias/freidoras.webp' },
    { name: 'Hornos Pizzeros', keyword: 'pizzero', image: '/images/subcategorias/hornos-pizzeros.webp' },
    { name: 'Asadores Criollos', keyword: 'asador', image: '/images/subcategorias/asadores-criollos.webp' },
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
    { name: 'Cajas Registradoras', keyword: 'registradora', image: '/images/subcategorias/cajas-registradoras.webp' },
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
  'peluqueria-barberia': [
    { name: 'Secadores de Pelo', keyword: 'secador', image: '/images/subcategorias/secadores.webp' },
    { name: 'Trimmers y Patilleras', keyword: 'trimmer', image: '/images/subcategorias/trimmers.webp' },
    { name: 'Sillones y Sillas', keyword: 'sillon', image: '/images/subcategorias/sillones-peluqueria.webp' },
    { name: 'Carritos Ayudantes', keyword: 'ayudante', image: '/images/subcategorias/carritos-ayudantes.webp' },
  ],
  estetica: [
    { name: 'Camillas', keyword: 'camilla', image: '/images/subcategorias/camillas.webp' },
    { name: 'Mesas de Manicura', keyword: 'manicura', image: '/images/subcategorias/mesas-manicura.webp' },
    { name: 'Depiladoras', keyword: 'depilad', image: '/images/subcategorias/depiladoras.webp' },
  ],
  decoracion: [
    { name: 'Espejos Ovalados', keyword: 'ovalado', image: '/images/subcategorias/espejos-ovalados.webp' },
    { name: 'Espejos Rectangulares', keyword: 'rectangular', image: '/images/subcategorias/espejos-rectangulares.webp' },
    { name: 'Espejos con Iluminación', keyword: 'iluminacion', image: '/images/subcategorias/espejos-iluminacion.webp' },
  ],
  almacenamiento: [
    { name: 'Racks', keyword: 'rack', image: '/images/subcategorias/racks.webp' },
    { name: 'Estanterías', keyword: 'estante', image: '/images/subcategorias/estanterias.webp' },
  ],
  oficina: [
    { name: 'Sillas de Oficina', keyword: 'silla', image: '/images/subcategorias/sillas-oficina.webp' },
  ],
  herramientas: [
    { name: 'Taladros', keyword: 'taladro', image: '/images/subcategorias/taladros.webp' },
    { name: 'Amoladoras', keyword: 'amoladora', image: '/images/subcategorias/amoladoras.webp' },
    { name: 'Atornilladores', keyword: 'atornillador', image: '/images/subcategorias/atornilladores.webp' },
    { name: 'Hidrolavadoras', keyword: 'hidrolavadora', image: '/images/subcategorias/hidrolavadoras.webp' },
  ],
  electronica: [
    { name: 'Celulares', keyword: 'celular', image: '/images/subcategorias/celulares.webp' },
    { name: 'Parlantes', keyword: 'parlante', image: '/images/subcategorias/parlantes.webp' },
    { name: 'Tablets', keyword: 'tablet', image: '/images/subcategorias/tablets.webp' },
    { name: 'Notebooks', keyword: 'notebook', image: '/images/subcategorias/notebooks.webp' },
    { name: 'Auriculares', keyword: 'auricular', image: '/images/subcategorias/auriculares.webp' },
  ],
  muebles: [
    { name: 'Colchones', keyword: 'colchon', image: '/images/subcategorias/colchones.webp' },
    { name: 'Sillas', keyword: 'silla', image: '/images/subcategorias/sillas-muebles.webp' },
    { name: 'Vitrinas y Mostradores', keyword: 'vitrina', image: '/images/subcategorias/vitrinas.webp' },
    { name: 'Placares', keyword: 'placard', image: '/images/subcategorias/placares.webp' },
  ],
  electrodomesticos: [
    { name: 'Cocinas', keyword: 'cocina', image: '/images/subcategorias/cocinas-electro.webp' },
    { name: 'Lavarropas', keyword: 'lavarropa', image: '/images/subcategorias/lavarropas.webp' },
    { name: 'Ventiladores', keyword: 'ventilador', image: '/images/subcategorias/ventiladores.webp' },
    { name: 'Licuadoras', keyword: 'licuadora', image: '/images/subcategorias/licuadoras.webp' },
    { name: 'Microondas', keyword: 'microondas', image: '/images/subcategorias/microondas.webp' },
  ],
  climatizacion: [
    { name: 'Aires Acondicionados', keyword: 'acondicionador', image: '/images/subcategorias/aires-acondicionados.webp' },
    { name: 'Calefactores', keyword: 'calefactor', image: '/images/subcategorias/calefactores.webp' },
  ],
  'deportes-aire-libre': [
    { name: 'Bicicletas', keyword: 'bicicleta', image: '/images/subcategorias/bicicletas.webp' },
    { name: 'Reposeras', keyword: 'reposera', image: '/images/subcategorias/reposeras.webp' },
    { name: 'Carpas y Gazebos', keyword: 'carpa', image: '/images/subcategorias/carpas.webp' },
  ],
};
