import type { Product } from './types';

export type ProductFilterParams = {
  marca?: string;
  precioMin?: string;
  precioMax?: string;
  oferta?: string;
  stock?: string;
  orden?: string;
};

export type BrandOption = { id: string; name: string; count: number };

export function getAvailableBrands(products: Product[]): BrandOption[] {
  const map = new Map<string, BrandOption>();
  for (const p of products) {
    if (!p.brand) continue;
    const existing = map.get(p.brand.id);
    if (existing) existing.count += 1;
    else map.set(p.brand.id, { id: p.brand.id, name: p.brand.name, count: 1 });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function applyProductFilters(products: Product[], params: ProductFilterParams): Product[] {
  let result = products;

  const brandIds = params.marca ? params.marca.split(',').filter(Boolean) : [];
  if (brandIds.length) {
    result = result.filter((p) => p.brand_id && brandIds.includes(p.brand_id));
  }

  const min = params.precioMin ? Number(params.precioMin) : null;
  if (min !== null && !Number.isNaN(min)) {
    result = result.filter((p) => p.price >= min);
  }

  const max = params.precioMax ? Number(params.precioMax) : null;
  if (max !== null && !Number.isNaN(max)) {
    result = result.filter((p) => p.price <= max);
  }

  if (params.oferta === '1') {
    result = result.filter((p) => p.compare_at_price && p.compare_at_price > p.price);
  }

  if (params.stock === '1') {
    result = result.filter((p) => p.stock > 0);
  }

  if (params.orden === 'precio-asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (params.orden === 'precio-desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  } else if (params.orden === 'nombre') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export function hasActiveFilters(params: ProductFilterParams): boolean {
  return Boolean(
    params.marca || params.precioMin || params.precioMax || params.oferta === '1' || params.stock === '1'
  );
}
