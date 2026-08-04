// Parseo de la lista de precios/stock del distribuidor (mismo formato que
// scripts/import-lista-csv.py: "Articulo;Nombre;Stock;Precio", separado por
// ";", codificado en latin-1). Se usa desde /admin/stock para actualizar
// precio y stock por SKU sin tener que correr un script a mano cada vez
// que llega una lista nueva.

export type PriceListRow = {
  sku: string;
  rawName: string;
  stock: number;
  price: number;
};

// La lista mas reciente del distribuidor agrega la categoria como tercer
// segmento para los productos "Behmont - IMP" (ej: "Behmont - IMP -
// Carniceria - Hamburguesera articulada 130 mm"). Se usa solo para sugerir
// categoria en productos NUEVOS -- nunca pisa la categoria de un producto
// que ya existe en el catalogo.
const CATEGORY_LABEL_TO_SLUG: Record<string, string> = {
  almacenamiento: 'almacenamiento',
  carniceria: 'carniceria',
  decoracion: 'decoracion',
  estetica: 'estetica',
  herramientas: 'herramientas',
  hogar: 'hogar',
  oficina: 'oficina',
  panaderia: 'panaderia',
  peluqueria: 'peluqueria-barberia',
  refrigeracion: 'frio',
};

function splitCsvLine(line: string, delim: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQuotes = !inQuotes; cur += c; continue; }
    if (c === delim && !inQuotes) { result.push(cur); cur = ''; continue; }
    cur += c;
  }
  result.push(cur);
  return result;
}

function parseArNumber(raw: string): number {
  const cleaned = raw.trim().replace(/"/g, '');
  if (!cleaned) return 0;
  const normalized = cleaned.replace(/\./g, '').replace(',', '.');
  const n = parseFloat(normalized);
  return isNaN(n) ? 0 : n;
}

/** Parsea el CSV crudo del distribuidor (";" delimitado, latin-1). */
export function parsePriceListCsv(buffer: Buffer): PriceListRow[] {
  const text = buffer.toString('latin1');
  const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
  const rows: PriceListRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const fields = splitCsvLine(lines[i], ';');
    if (fields.length !== 4) continue;
    const sku = fields[0].trim().replace(/^"+|"+$/g, '');
    const rawName = fields[1].trim().replace(/^"+|"+$/g, '');
    if (!sku || !rawName) continue;
    rows.push({
      sku,
      rawName,
      stock: Math.round(parseArNumber(fields[2])),
      price: parseArNumber(fields[3]),
    });
  }
  return rows;
}

/** Parsea un Excel (.xlsx/.xls) con las mismas 4 columnas, en cualquier orden de header. */
export async function parsePriceListExcel(buffer: Buffer): Promise<PriceListRow[]> {
  const XLSX = await import('xlsx');
  const wb = XLSX.read(buffer, { type: 'buffer' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const raw: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  const rows: PriceListRow[] = [];
  for (const r of raw) {
    const keys = Object.keys(r);
    const find = (...names: string[]) =>
      keys.find((k) => names.includes(k.trim().toLowerCase()));

    const skuKey = find('articulo', 'artículo', 'sku', 'codigo', 'código');
    const nameKey = find('nombre', 'descripcion', 'descripción', 'producto');
    const stockKey = find('stock', 'cantidad');
    const priceKey = find('precio', 'nt.minorista', 'precio minorista');
    if (!skuKey || !nameKey) continue;

    const sku = String(r[skuKey] ?? '').trim();
    const rawName = String(r[nameKey] ?? '').trim();
    if (!sku || !rawName) continue;

    const stockRaw = stockKey ? r[stockKey] : 0;
    const priceRaw = priceKey ? r[priceKey] : 0;
    const stock = typeof stockRaw === 'number' ? Math.round(stockRaw) : Math.round(parseArNumber(String(stockRaw ?? '')));
    const price = typeof priceRaw === 'number' ? priceRaw : parseArNumber(String(priceRaw ?? ''));

    rows.push({ sku, rawName, stock, price });
  }
  return rows;
}

export type ParsedProductName = {
  brand: string | null;
  isImported: boolean;
  categorySlug: string | null;
  displayName: string;
};

/** Descompone "Marca - IMP - Categoria - Descripcion..." (o variantes mas cortas). */
export function parseProductName(rawName: string): ParsedProductName {
  const parts = rawName.split(' - ').map((p) => p.trim()).filter((p) => p.length > 0);
  const brand = parts[0] || null;
  const isImported = parts.length > 1 && parts[1].toUpperCase() === 'IMP';

  let categorySlug: string | null = null;
  let descParts: string[];

  if (isImported && parts.length > 2) {
    const maybeCategory = parts[2].toLowerCase();
    if (CATEGORY_LABEL_TO_SLUG[maybeCategory]) {
      categorySlug = CATEGORY_LABEL_TO_SLUG[maybeCategory];
      descParts = parts.slice(3);
    } else {
      descParts = parts.slice(2);
    }
  } else if (parts.length > 1) {
    descParts = parts.slice(1);
  } else {
    descParts = parts;
  }

  const displayName = descParts.join(' - ').trim() || rawName;
  return { brand, isImported, categorySlug, displayName };
}

export type ExistingProduct = {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  active: boolean;
};

export type PriceListDiff = {
  toUpdate: { id: string; sku: string; name: string; oldPrice: number; newPrice: number; oldStock: number; newStock: number }[];
  toCreate: { sku: string; rawName: string; displayName: string; brand: string | null; categorySlug: string | null; price: number; stock: number }[];
  toDeactivate: { id: string; sku: string; name: string }[];
  unchanged: number;
};

/**
 * Compara la lista parseada contra el catalogo actual.
 * - Match por SKU: si cambio precio o stock, va a toUpdate (nunca toca nombre/categoria/marca).
 * - SKU nuevo: va a toCreate.
 * - Producto activo, SKU no-MLA (no viene de MercadoLibre), ausente de la lista nueva: va a
 *   toDeactivate. Los SKU "MLA..." nunca se tocan aca -- no forman parte de la lista del
 *   distribuidor y desactivarlos por "ausencia" seria un falso positivo siempre.
 */
export function diffPriceList(rows: PriceListRow[], existing: ExistingProduct[]): PriceListDiff {
  const bySku = new Map(existing.map((p) => [p.sku, p]));
  const listSkus = new Set(rows.map((r) => r.sku));

  // Map por id (no array) porque la lista del distribuidor a veces trae el
  // mismo SKU repetido dos veces (típico en los codigos que Excel mostro en
  // notacion cientifica, ej. "7,8965E+12") -- si hubiera dos filas para el
  // mismo producto, se queda con la ultima (mismo criterio que aplicar los
  // updates en orden terminaria dejando igual).
  const toUpdateById = new Map<string, PriceListDiff['toUpdate'][number]>();
  const toCreateBySku = new Map<string, PriceListDiff['toCreate'][number]>();
  const unchangedIds = new Set<string>();

  for (const row of rows) {
    const db = bySku.get(row.sku);
    if (!db) {
      const { brand, categorySlug, displayName } = parseProductName(row.rawName);
      toCreateBySku.set(row.sku, {
        sku: row.sku,
        rawName: row.rawName,
        displayName,
        brand,
        categorySlug,
        price: row.price,
        stock: row.stock,
      });
      continue;
    }
    const priceChanged = Math.round(db.price) !== Math.round(row.price);
    const stockChanged = db.stock !== row.stock;
    if (priceChanged || stockChanged) {
      toUpdateById.set(db.id, {
        id: db.id,
        sku: db.sku,
        name: db.name,
        oldPrice: db.price,
        newPrice: row.price,
        oldStock: db.stock,
        newStock: row.stock,
      });
      unchangedIds.delete(db.id);
    } else if (!toUpdateById.has(db.id)) {
      unchangedIds.add(db.id);
    }
  }
  const toUpdate = Array.from(toUpdateById.values());
  const toCreate = Array.from(toCreateBySku.values());
  const unchanged = unchangedIds.size;

  const toDeactivate = existing
    .filter((p) => p.active && !/^MLA/i.test(p.sku) && !listSkus.has(p.sku))
    .map((p) => ({ id: p.id, sku: p.sku, name: p.name }));

  return { toUpdate, toCreate, toDeactivate, unchanged };
}
