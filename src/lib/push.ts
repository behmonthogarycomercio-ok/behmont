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

export type StaffName = 'lucas' | 'luz' | 'lito';

/**
 * Manda una notificación push a los dispositivos de UNA persona del staff
 * (Lucas, Luz o Lito), suscriptos desde su link privado /turnero/<nombre>/activar.
 * Mismo mecanismo que notifyAdmins pero filtrado por destinatario.
 */
export async function notifyStaff(staff: StaffName, payload: { title: string; body: string; url?: string; image?: string }) {
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return;
  ensureConfigured();

  const supabase = createServiceSupabase();
  const { data: subs } = await supabase
    .from('staff_push_subscriptions')
    .select('id, endpoint, p256dh, auth')
    .eq('staff', staff);
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
          await supabase.from('staff_push_subscriptions').delete().eq('id', sub.id);
        } else {
          console.error('[push] envío a staff falló:', err);
        }
      }
    })
  );
}

/**
 * Manda una notificación push a Gabriel (jefe de depósito) por cada retiro/
 * ingreso registrado en /deposito -- se suma a notifyAdmins() para que el
 * dueño también quede al tanto por el mismo canal que ya usa.
 */
export async function notifyDepositoSupervisor(payload: { title: string; body: string; url?: string }) {
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return;
  ensureConfigured();

  const supabase = createServiceSupabase();
  const { data: subs } = await supabase.from('deposito_push_subscriptions').select('id, endpoint, p256dh, auth');
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
          await supabase.from('deposito_push_subscriptions').delete().eq('id', sub.id);
        } else {
          console.error('[push] envío a supervisor de depósito falló:', err);
        }
      }
    })
  );
}

/**
 * Manda una notificación push a UN cobrador puntual (el asignado a esa
 * preventa) -- a diferencia de notifyDrivers/notifyDepositoSupervisor/etc,
 * que mandan a TODA la tabla, acá se filtra por `pin` porque cada preventa
 * tiene un solo cobrador responsable, no un pool compartido.
 */
export async function notifyCobrador(pin: number, payload: { title: string; body: string; url?: string }) {
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return;
  ensureConfigured();

  const supabase = createServiceSupabase();
  const { data: subs } = await supabase
    .from('cobrador_push_subscriptions')
    .select('id, endpoint, p256dh, auth')
    .eq('pin', pin);
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
          await supabase.from('cobrador_push_subscriptions').delete().eq('id', sub.id);
        } else {
          console.error('[push] envío a cobrador falló:', err);
        }
      }
    })
  );
}

/**
 * Manda una notificación push a Alejandro (supervisor de cobradores) --
 * escalada cuando una preventa queda 24/48hs sin que el cobrador la
 * resuelva. Mismo patrón broadcast que notifyDepositoSupervisor.
 */
export async function notifyPreventaSupervisor(payload: { title: string; body: string; url?: string }) {
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return;
  ensureConfigured();

  const supabase = createServiceSupabase();
  const { data: subs } = await supabase.from('preventa_supervisor_push_subscriptions').select('id, endpoint, p256dh, auth');
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
          await supabase.from('preventa_supervisor_push_subscriptions').delete().eq('id', sub.id);
        } else {
          console.error('[push] envío a supervisor de preventas falló:', err);
        }
      }
    })
  );
}

/**
 * Manda una notificación push a TODOS los repartidores suscriptos (son 2,
 * cualquiera puede tomar cualquier entrega, no hay filtro por destinatario
 * como en notifyStaff). Activada desde /envios, sin cuenta de admin.
 */
export async function notifyDrivers(payload: { title: string; body: string; url?: string; image?: string }) {
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return;
  ensureConfigured();

  const supabase = createServiceSupabase();
  const { data: subs } = await supabase.from('driver_push_subscriptions').select('id, endpoint, p256dh, auth');
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
          await supabase.from('driver_push_subscriptions').delete().eq('id', sub.id);
        } else {
          console.error('[push] envío a repartidores falló:', err);
        }
      }
    })
  );
}
