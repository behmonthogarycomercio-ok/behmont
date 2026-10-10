import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { DepositoPin } from './deposito';

/** Hashea un código secreto nuevo (al definirlo/resetearlo desde el admin). */
export function hashSecretCode(code: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(code, salt, 64).toString('hex');
  return { hash, salt };
}

export function matchesHash(code: string, hash: string, salt: string): boolean {
  const candidate = scryptSync(code, salt, 64);
  const stored = Buffer.from(hash, 'hex');
  if (candidate.length !== stored.length) return false;
  return timingSafeEqual(candidate, stored);
}

/**
 * Confirma que el código recibido en la request realmente corresponde a ese
 * PIN -- se llama en CADA acción (no solo al entrar) porque la terminal no
 * tiene sesión/token: sin esto, cualquiera podía mandar `pin: 2` y actuar
 * como Alejandro sin que nada lo verificara.
 */
export async function verifyDepositoCode(
  supabase: SupabaseClient,
  pin: DepositoPin,
  code: string
): Promise<boolean> {
  const { data } = await supabase
    .from('deposito_staff_secrets')
    .select('secret_hash, secret_salt')
    .eq('pin', pin)
    .maybeSingle();
  if (!data) return false;
  return matchesHash(code, data.secret_hash, data.secret_salt);
}
