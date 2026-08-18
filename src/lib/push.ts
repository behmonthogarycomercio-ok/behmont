import webpush from 'web-push';
import { createServiceSupabase } from './supabase/server';

let configured = false;
function ensureConfigured() {
  if (configured) return;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );
  configured = true;
}

/**
 * Manda una notificación push a todos los dispositivos suscriptos desde el
 * panel admin. Best-effort: si una suscripción ya no es válida (el navegador
 * la revocó, o expiró), se borra de la base en vez de reintentar.
 */
export async function notifyAdmins(payload: { title: string; body: string; url?: string }) {
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return;
  ensureConfigured();

  const supabase = createServiceSupabase();
  const { data: subs } = await supabase.from('push_subscriptions').select('id, endpoint, p256dh, auth');
  if (!subs || subs.length === 0) return;

  const body = JSON.stringify(payload);

  await Promise.all(
    subs.map(async (sub: { id: string; endpoint: string; p256dh: string; auth: string }) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          body
        );
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number })?.statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from('push_subscriptions').delete().eq('id', sub.id);
        } else {
          console.error('[push] envío falló:', err);
        }
      }
    })
  );
}
