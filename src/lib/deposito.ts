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

export const canIngreso = (pin: DepositoPin) => INGRESO_PINS.includes(pin);
export const canGestionZonas = (pin: DepositoPin) => pin === GESTION_PIN;

// PINs habilitados para cargar preventas (ver src/lib/preventas.ts):
// Gabriel/Lucas/Luz/Lito. NO Alejandro (supervisor de cobradores) ni Facundo.
export const PREVENTA_VENDEDOR_PINS: readonly DepositoPin[] = [0, 3, 4, 5];
export const canVenderPreventa = (pin: DepositoPin) => PREVENTA_VENDEDOR_PINS.includes(pin);

export const zonaTipoSchema = z.enum(['area', 'gondola', 'estante', 'division']);

// Código secreto personal (distinto del PIN público 0-3) que prueba que
// quien hace la acción realmente es esa persona -- se exige y se verifica
// server-side en cada escritura, no solo al entrar a la terminal.
export const secretCodeSchema = z.string().trim().min(4).max(20);

export const authSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
});

export const retiroSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
  productId: z.string().uuid(),
  // Ausente = producto sin ubicación cargada todavía -- descuenta el stock
  // general en vez de una zona puntual (ver registrar_retiro_sin_ubicacion).
  zonaId: z.string().uuid().optional(),
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

export const productLocationWriteSchema = z
  .object({
    pin: pinSchema,
    code: secretCodeSchema,
    id: z.string().uuid().optional(), // presente = edit cantidad, ausente = nueva ubicación
    productId: z.string().uuid().optional(),
    zonaId: z.string().uuid().optional(),
    quantity: z.coerce.number().int().min(0),
  })
  .refine((d) => d.id || (d.productId && d.zonaId), { message: 'Faltan datos de producto/zona' });

export const productLocationDeleteSchema = z.object({
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

// Avisos push de movimientos de depósito -- solo Gabriel (PIN de gestión)
// puede suscribir/desuscribir su propio dispositivo.
export const depositoSubscribeSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
  subscription: z.object({
    endpoint: z.string().url(),
    keys: z.object({ p256dh: z.string(), auth: z.string() }),
  }),
});

export const depositoUnsubscribeSchema = z.object({
  pin: pinSchema,
  code: secretCodeSchema,
  endpoint: z.string().url(),
});
