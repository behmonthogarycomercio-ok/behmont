import type { SupabaseClient } from '@supabase/supabase-js';
import { notifyCobrador, notifyPreventaSupervisor } from './push';

// No hay cron nuevo para esto (Vercel Hobby ya tiene 1 ocupado con /api/ml/sync)
// -- mismo patron oportunista que maybeSyncShipments (envios-sync.ts): se
// cuelga, con su propio throttle, de las paginas que abren el admin y los
// cobradores. A las 24hs sin resolver reinsiste al cobrador; a las 48hs
// reinsiste de nuevo y ademas avisa a Alejandro (supervisor).
const THROTTLE_MS = 10 * 60 * 1000;
const LAST_CHECK_KEY = 'preventas_reminder_last_check_at';
const H24_MS = 24 * 60 * 60 * 1000;
const H48_MS = 48 * 60 * 60 * 1000;

type PendingRow = {
  id: string;
  cobrador_pin: number;
  cliente_nombre: string;
  gabriel_revisado_at: string;
  recordatorio_24h_at: string | null;
  recordatorio_48h_at: string | null;
};

export async function maybeNotifyOverdueCobradores(supabase: SupabaseClient): Promise<void> {
  try {
    const { data: row } = await supabase.from('site_settings').select('value').eq('key', LAST_CHECK_KEY).maybeSingle();
    const lastCheck = row?.value ? new Date(row.value).getTime() : 0;
    if (Date.now() - lastCheck < THROTTLE_MS) return;

    await supabase.from('site_settings').upsert({ key: LAST_CHECK_KEY, value: new Date().toISOString() });

    const { data: pending } = await supabase
      .from('preventas')
      .select('id, cobrador_pin, cliente_nombre, gabriel_revisado_at, recordatorio_24h_at, recordatorio_48h_at')
      .eq('status', 'pendiente_cobrador')
      .not('gabriel_revisado_at', 'is', null);

    const now = Date.now();
    for (const p of (pending || []) as PendingRow[]) {
      const elapsed = now - new Date(p.gabriel_revisado_at).getTime();

      if (elapsed >= H48_MS && !p.recordatorio_48h_at) {
        await notifyCobrador(p.cobrador_pin, {
          title: '⏰ Preventa vencida (48hs)',
          body: `${p.cliente_nombre} sigue sin control de local -- resolvela hoy`,
          url: '/ventas/cobrador',
        });
        await notifyPreventaSupervisor({
          title: '⏰ Preventa sin resolver (48hs)',
          body: `${p.cliente_nombre} lleva más de 48hs sin que el cobrador la controle`,
          url: '/admin/envios',
        });
        await supabase.from('preventas').update({ recordatorio_48h_at: new Date().toISOString() }).eq('id', p.id);
      } else if (elapsed >= H24_MS && !p.recordatorio_24h_at) {
        await notifyCobrador(p.cobrador_pin, {
          title: '⏰ Preventa pendiente (24hs)',
          body: `No te olvides de controlar el local de ${p.cliente_nombre}`,
          url: '/ventas/cobrador',
        });
        await supabase.from('preventas').update({ recordatorio_24h_at: new Date().toISOString() }).eq('id', p.id);
      }
    }
  } catch (err) {
    // Nunca debe tirar abajo la pagina que lo dispara -- best effort.
    console.error('[preventas-sync] fallo el chequeo de recordatorios:', err);
  }
}
