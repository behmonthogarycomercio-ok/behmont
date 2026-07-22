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
  ],
  electronica: [
    { name: 'Celulares', keyword: 'celular', image: '/images/subcategorias/celulares.webp' },
  ],
  muebles: [
    { name: 'Colchones', keyword: 'colchon', image: '/images/subcategorias/colchones.webp' },
  ],
};
