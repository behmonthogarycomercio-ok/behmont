// Adivina la categoría a partir del título del producto.
// Se usa para productos recién sincronizados desde MercadoLibre que todavía
// no tienen categoría asignada — nunca pisa una categoría ya asignada a mano.

const RULES: { slug: string; keywords: string[] }[] = [
  {
    slug: 'peluqueria-barberia',
    keywords: [
      'peluqueria', 'peluquería', 'barberia', 'barbería', 'sillon barbero', 'sillon peluquero',
      'lavacabeza', 'ayudante de peluqueria', 'clipper', 'maquina de corte', 'máquina de corte',
      'navaja de acero', 'capa de corte', 'tijera de corte', 'tijera de entresacar',
      'secador casco', 'vaporizador casco', 'tintorero', 'planchita de pelo', 'peine guia',
      'peine pua', 'peines guia', 'secador capilar', 'secador de pelo', 'cortacabello',
      'trimmer', 'shaver', 'rizador',
    ],
  },
  {
    slug: 'estetica',
    keywords: [
      'camilla', 'esterilizador', 'climazon', 'gorro termico', 'cabina uv',
      'torno electrico para unas', 'depiladora',
    ],
  },
  {
    slug: 'decoracion',
    keywords: ['espejo con iluminacion', 'espejo led', 'cartel giratorio'],
  },
  {
    slug: 'almacenamiento',
    keywords: ['estante modulo', 'rack ', 'estanteria', 'estantería'],
  },
  {
    slug: 'oficina',
    keywords: ['silla de oficina', 'silla fija apilable'],
  },
  {
    slug: 'herramientas',
    keywords: [
      'atornillador', 'taladro percutor', 'amoladora', 'cargador para baterias',
      'motosierra', 'cortadora de cesped', 'cortacésped', 'hidrolavadora', 'compresor',
      'bordeadora',
    ],
  },
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
      'leudadora', 'pastelero', 'panadero', 'rebanadora de pan', 'ralladora de pan',
    ],
  },
  {
    slug: 'carniceria',
    keywords: [
      'carnicera', 'picadora de carne', 'embutidora', 'sierra cinta', 'sierra carnicera',
      'moledora', 'ablandador de carne', 'gancho carnicero', 'hamburguesera', 'chaira',
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
      'horno convector', 'horno pizzero', 'anafe', 'cocina industrial', 'cocina profesional',
      'freidora', 'licuadora industrial', 'batidora planetaria', 'mesada', 'campana extractora',
      'salamandra', 'plancha industrial', 'olla', 'marmita', 'cortapapas', 'churrera',
      'fabrica de pastas', 'fábrica de pastas', 'asador criollo',
    ],
  },
  {
    slug: 'electronica',
    keywords: [
      'celular', 'smartphone', 'tablet', 'smart tv', 'televisor', 'auricular', 'parlante',
      'notebook', 'impresora', 'camara', 'cámara', 'auto estereo', 'autoestereo', 'car stereo',
      'consola', 'joystick', 'router', 'pendrive', 'home theater', 'torre de sonido',
      'sound tower', 'teclado gaming', 'mouse gaming',
    ],
  },
  {
    slug: 'muebles',
    keywords: [
      'escritorio', 'comoda', 'cómoda', 'futon', 'ropero', 'placard', 'mostrador', 'vitrina',
      'biblioteca', 'librero', 'perchero', 'sommier', 'colchon', 'colchón',
    ],
  },
  {
    slug: 'electrodomesticos',
    keywords: [
      'licuadora', 'cafetera', 'ventilador', 'caloventor', 'procesadora', 'minipimer',
      'aspiradora', 'lavarropas', 'microondas', 'pava electrica', 'pava eléctrica',
      'tostadora', 'sanguichera', 'exprimidor', 'batidora', 'termotanque', 'calefon',
    ],
  },
  {
    slug: 'climatizacion',
    keywords: ['aire acondicionado', 'aire compacto', 'calefactor'],
  },
  {
    slug: 'deportes-aire-libre',
    keywords: [
      'bicicleta', 'parrilla', 'reposera', 'carpa', 'pileta', 'inflable', 'gimnasio',
      'mancuerna', 'cinta de correr', 'gazebo',
    ],
  },
];

const DIACRITICS = new RegExp(`[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`, 'g');

export function guessCategorySlug(title: string): string | null {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '');

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.slug;
    }
  }
  // Sin match claro: se deja para clasificación manual (mejor que adivinar mal).
  return null;
}
