import { createServiceSupabase } from '@/lib/supabase/server';

/**
 * Límite de intentos por ventana fija, respaldado por la tabla `rate_limits`
 * (en vez de memoria del proceso, que no sirve entre invocaciones serverless).
 * Devuelve `true` si la request debe bloquearse por exceder el límite.
 */
export async function isRateLimited(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const supabase = createServiceSupabase();
  const windowStart = new Date(
    Math.floor(Date.now() / (windowSeconds * 1000)) * windowSeconds * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from('rate_limits')
    .select('count')
    .eq('key', key)
    .eq('window_start', windowStart)
    .maybeSingle();

  if (error) {
    // Si la tabla falla por algún motivo, no se bloquea al usuario legítimo
    // por un problema nuestro -- se deja pasar.
    return false;
  }

  if (!data) {
    await supabase.from('rate_limits').insert({ key, window_start: windowStart, count: 1 });
    return false;
  }

  if (data.count >= limit) return true;

  await supabase
    .from('rate_limits')
    .update({ count: data.count + 1 })
    .eq('key', key)
    .eq('window_start', windowStart);
  return false;
}

/** IP del cliente detrás del proxy de Vercel. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
