import { z } from 'zod';

export const DEPOSITO_STAFF = [
  { pin: 0, name: 'Gabriel' },
  { pin: 1, name: 'Alejandro' },
  { pin: 2, name: 'Facundo' },
  { pin: 3, name: 'Lucas' },
  { pin: 4, name: 'Luz' },
  { pin: 5, name: 'Lito' },
] as const;

export type DepositoPin = (typeof DEPOSITO_STAFF)[number]['pin'];

export const DEPOSITO_STAFF_LABELS: Record<DepositoPin, string> = {
  0: 'Gabriel',
  1: 'Alejandro',
  2: 'Facundo',
  3: 'Lucas',
  4: 'Luz',
  5: 'Lito',
};

const PIN_VALUES = DEPOSITO_STAFF.map((s) => s.pin) as [DepositoPin, ...DepositoPin[]];

export const pinSchema = z.coerce
  .number()
  .int()
  .refine((n): n is DepositoPin => PIN_VALUES.includes(n as DepositoPin), { message: 'PIN inválido' });

// PINs que, ademas de retirar/consultar, pueden registrar ingreso de
// mercaderia desde la terminal.
export const INGRESO_PINS: readonly DepositoPin[] = [0];
// Unico PIN con acceso a gestion de zonas y carga de fotos de producto.
export const GESTION_PIN: DepositoPin = 0;
// Lucas/Luz/Lito son del local (vendedores), no del depósito físico -- solo
// pueden retirar stock de la zona "salon" (exhibición), nunca de Depósito
// Chile ni 4to Piso.
export const LOCAL_ONLY_PINS: readonly DepositoPin[] = [3, 4, 5];
export const LOCAL_ZONA_CODIGO = 'salon';

export const canIngreso = (pin: DepositoPin) => INGRESO_PINS.includes(pin);
export const canGestionZonas = (pin: DepositoPin) => pin === GESTION_PIN;
export const isLocalOnly = (pin: DepositoPin) => LOCAL_ONLY_PINS.includes(pin);

export const zonaTipoSchema = z.enum(['area', 'gondola', 'estante', 'division']);

// Código secreto personal (distinto del PIN público 0-3) que prueba que
// quien hace la acción realmente es esa persona -- se exige y se verifica
// server-side en cada escritura, no solo al entrar a la terminal.
const secretCodeSchema = z.string().trim().min(4).max(20);

export const authSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
});

export const retiroSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
  productId: z.string().uuid(),
  zonaId: z.string().uuid(),
  quantity: z.coerce.number().int().positive(),
  note: z.string().max(280).optional(),
});

export const ingresoSchema = retiroSchema;

export const zonaWriteSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
  id: z.string().uuid().optional(), // presente = edit, ausente = create
  parentId: z.string().uuid().nullable(),
  tipo: zonaTipoSchema,
  codigo: z.string().trim().min(1).max(40),
  nombre: z.string().trim().min(1).max(120),
  sortOrder: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
});

export const zonaDeleteSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
  id: z.string().uuid(),
});

export const fotoDeleteSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
  productId: z.string().uuid(),
  imageUrl: z.string().url(),
});
