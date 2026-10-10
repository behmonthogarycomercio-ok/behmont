import { z } from 'zod';
import { secretCodeSchema } from './deposito';

export const COBRADORES = [
  { pin: 0, name: 'Sergio', ciudad: 'Concordia' },
  { pin: 1, name: 'Diego', ciudad: 'Concordia' },
  { pin: 2, name: 'Agustín', ciudad: 'Concordia' },
  { pin: 3, name: 'Marcos', ciudad: 'Chajarí' },
  { pin: 4, name: 'Gonzalo', ciudad: 'Concepción del Uruguay' },
  { pin: 5, name: 'Milagros', ciudad: 'Concepción del Uruguay' },
  { pin: 6, name: 'Jorge', ciudad: 'Gualeguaychú' },
  { pin: 7, name: 'Walter', ciudad: 'Federal' },
  { pin: 8, name: 'Jeremías', ciudad: 'Federación' },
  { pin: 9, name: 'Valentín', ciudad: 'Villaguay' },
] as const;

export type CobradorPin = (typeof COBRADORES)[number]['pin'];

export const COBRADOR_LABELS: Record<CobradorPin, string> = Object.fromEntries(
  COBRADORES.map((c) => [c.pin, c.name])
) as Record<CobradorPin, string>;

const COBRADOR_PIN_VALUES = COBRADORES.map((c) => c.pin) as [CobradorPin, ...CobradorPin[]];

export const cobradorPinSchema = z.coerce
  .number()
  .int()
  .refine((n): n is CobradorPin => COBRADOR_PIN_VALUES.includes(n as CobradorPin), { message: 'Cobrador inválido' });

export const cobradorAuthSchema = z.object({
  pin: cobradorPinSchema,
  code: secretCodeSchema,
});

export const clienteEstadoSchema = z.enum(['activo', 'nuevo', 'pasivo']);
export const cuotasTipoSchema = z.enum(['diaria', 'semanal', 'mensual', 'tarjeta']);

export const preventaItemSchema = z.object({
  sku: z.string().trim().min(1).max(60),
  name: z.string().trim().min(1).max(300),
  quantity: z.coerce.number().int().positive(),
  precioLista: z.coerce.number().nonnegative(),
  precioOfrecido: z.coerce.number().nonnegative(),
});

export const preventaCreateSchema = z.object({
  vendedorPin: z.coerce.number().int(), // se valida con canVenderPreventa, no un enum propio (reusa roster de deposito)
  vendedorCode: secretCodeSchema,
  clienteNombre: z.string().trim().min(2).max(150),
  clienteDireccion: z.string().trim().min(2).max(300),
  clienteContacto: z.string().trim().max(50).optional(),
  clienteDniCuit: z.string().trim().min(6).max(20),
  clienteCiudad: z.string().trim().min(2).max(100),
  clienteCodigoPostal: z.string().trim().max(15).optional(),
  clienteRubro: z.string().trim().max(150).optional(),
  clienteEstado: clienteEstadoSchema,
  items: z.array(preventaItemSchema).min(1, 'Agregá al menos un producto'),
  cuotasCantidad: z.coerce.number().int().positive(),
  cuotasTipo: cuotasTipoSchema,
  cuotaPrecio: z.coerce.number().nonnegative(),
  interesPorcentaje: z.coerce.number().min(0).max(1000).optional(),
  observaciones: z.string().trim().max(2000).optional(),
  cobradorPin: cobradorPinSchema,
});

export const preventaMineSchema = z.object({
  vendedorPin: z.coerce.number().int(),
  vendedorCode: secretCodeSchema,
});

export const preventaReviewSchema = z
  .object({
    pin: cobradorPinSchema,
    code: secretCodeSchema,
    preventaId: z.string().uuid(),
    decision: z.enum(['aprobar', 'rechazar']),
    notas: z.string().trim().max(2000).optional(),
    motivoRechazo: z.string().trim().max(1000).optional(),
  })
  .refine((d) => d.decision !== 'rechazar' || !!d.motivoRechazo, {
    message: 'El motivo de rechazo es obligatorio',
    path: ['motivoRechazo'],
  });

export const preventaCobradorSubscribeSchema = z.object({
  pin: cobradorPinSchema,
  code: secretCodeSchema,
  subscription: z.object({
    endpoint: z.string().url(),
    keys: z.object({ p256dh: z.string(), auth: z.string() }),
  }),
});

export const preventaCobradorUnsubscribeSchema = z.object({
  pin: cobradorPinSchema,
  code: secretCodeSchema,
  endpoint: z.string().url(),
});

// El supervisor de preventas (Alejandro) ya es PIN 1 del roster de depósito
// -- reusa pinSchema/secretCodeSchema de deposito.ts, no un schema propio.
