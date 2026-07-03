// Adivina la categoría (una de las 7 del sitio) a partir del título del producto.
// Se usa SOLO para productos recién sincronizados desde MercadoLibre que todavía
// no tienen categoría asignada — nunca pisa una categoría ya asignada a mano.

const RULES: { slug: string; keywords: string[] }[] = [
  {
    slug: 'frio',
    keywords: [
      'heladera', 'freezer', 'conservadora', 'exhibidora', 'frigorifico', 'frigorífico',
      'refrigerador', 'cava',
    ],
  },
  {
    slug: 'panaderia',
    keywords: [
      'amasadora', 'sobadora', 'horno pastelero', 'horno panadero', 'divisora', 'boleadora',
      'leudadora', 'sobadora', 'pastelero', 'panadero',
    ],
  },
  {
    slug: 'carniceria',
    keywords: [
      'carnicera', 'picadora de carne', 'embutidora', 'sierra cinta', 'sierra carnicera',
      'moledora', 'ablandador de carne', 'gancho carnicero',
    ],
  },
  {
    slug: 'almacen',
    keywords: [
      'balanza', 'cortadora de fiambre', 'fiambrera', 'caja registradora', 'exhibidor',
      'gondola', 'góndola', 'carro de compras', 'selladora',
    ],
  },
  {
    slug: 'gastronomia',
    keywords: [
      'horno convector', 'horno pizzero', 'anafe', 'cocina industrial', 'freidora',
      'licuadora industrial', 'batidora planetaria', 'mesada', 'campana extractora',
      'salamandra', 'plancha industrial', 'olla', 'marmita',
    ],
  },
];

export function guessCategorySlug(title: string): string | null {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.slug;
    }
  }
  // Sin match claro: se deja para clasificación manual (mejor que adivinar mal).
  return null;
}
