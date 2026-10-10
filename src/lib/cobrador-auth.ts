import type { SupabaseClient } from '@supabase/supabase-js';
import { matchesHash } from './deposito-auth';
import type { CobradorPin } from './preventas';

/**
 * Confirma que el código recibido realmente corresponde a ese cobrador --
 * mismo mecanismo que verifyDepositoCode (deposito-auth.ts), tabla distinta
 * porque los cobradores no son staff de depósito.
 */
export async function verifyCobradorCode(
  supabase: SupabaseClient,
  pin: CobradorPin,
  code: string
): Promise<boolean> {
  const { data } = await supabase
    .from('cobrador_staff_secrets')
    .select('secret_hash, secret_salt')
    .eq('pin', pin)
    .maybeSingle();
  if (!data) return false;
  return matchesHash(code, data.secret_hash, data.secret_salt);
}
