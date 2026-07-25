// Los precios y cuotas se muestran siempre redondeados hacia arriba al
// siguiente múltiplo de 100 (ej. $58.325 -> $58.400, $18.110 -> $18.200).
export function roundPrice(n: number): number {
  return Math.ceil(n / 100) * 100;
}

export function formatPrice(n: number): string {
  return roundPrice(n).toLocaleString('es-AR');
}
