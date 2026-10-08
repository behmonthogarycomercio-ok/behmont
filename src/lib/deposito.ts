import { z } from 'zod';

export const DEPOSITO_STAFF = [
  { pin: 0, name: 'Javier' },
  { pin: 1, name: 'Gabriel' },
  { pin: 2, name: 'Alejandro' },
  { pin: 3, name: 'Facundo' },
] as const;

export type DepositoPin = (typeof DEPOSITO_STAFF)[number]['pin'];

export const DEPOSITO_STAFF_LABELS: Record<DepositoPin, string> = {
  0: 'Javier',
  1: 'Gabriel',
  2: 'Alejandro',
  3: 'Facundo',
};

const PIN_VALUES = DEPOSITO_STAFF.map((s) => s.pin) as [DepositoPin, ...DepositoPin[]];

export const pinSchema = z.coerce
  .number()
  .int()
  .refine((n): n is DepositoPin => PIN_VALUES.includes(n as DepositoPin), { message: 'PIN inválido' });

// PINs que, ademas de retirar/consultar, pueden registrar ingreso de
// mercaderia desde la terminal.
export const INGRESO_PINS: readonly DepositoPin[] = [0, 1];
// Unico PIN con acceso a gestion de zonas y carga de fotos de producto.
export const GESTION_PIN: DepositoPin = 1;

export const canIngreso = (pin: DepositoPin) => INGRESO_PINS.includes(pin);
export const canGestionZonas = (pin: DepositoPin) => pin === GESTION_PIN;

export const zonaTipoSchema = z.enum(['area', 'gondola', 'estante', 'division']);

export const retiroSchema = z.object({
  pin: pinSchema,
  productId: z.string().uuid(),
  zonaId: z.string().uuid(),
  quantity: z.coerce.number().int().positive(),
  note: z.string().max(280).optional(),
});

export const ingresoSchema = retiroSchema;

export const zonaWriteSchema = z.object({
  pin: pinSchema,
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
  id: z.string().uuid(),
});

export const fotoDeleteSchema = z.object({
  pin: pinSchema,
  productId: z.string().uuid(),
  imageUrl: z.string().url(),
});
