import { NextResponse } from 'next/server';
import { createServiceSupabase, createServerSupabase } from '@/lib/supabase/server';
import { getValidIgConnection, fetchIgProfile, fetchIgInsights, fetchIgMedia } from '@/lib/instagram';

export const maxDuration = 30;

/**
 * Sincroniza perfil, insights y últimos posts reales de Instagram hacia
 * instagram_metrics_daily / instagram_media_cache.
 *
 * Se puede llamar:
 *  - manualmente desde /admin/contenido (botón "Sincronizar ahora")
 *  - automáticamente vía Vercel Cron (ver vercel.json), header Authorization: Bearer <CRON_SECRET>
 */
export async function GET(request: Request) {
  return runSync(request, true);
}

export async function POST(request: Request) {
  return runSync(request, false);
}

async function runSync(request: Request, fromCron: boolean) {
  const authHeader = request.headers.get('authorization');
  const isCron = fromCron && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (fromCron && !isCron) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  if (!fromCron) {
    const sessionSupabase = createServerSupabase();
    const { data: { user } } = await sessionSupabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = createServiceSupabase();

  try {
    const conn = await getValidIgConnection();
    if (!conn) {
      return NextResponse.json(
        { error: 'Instagram no está conectado. Conectá la cuenta desde /admin/contenido.' },
        { status: 400 }
      );
    }

    const [profile, insights, media] = await Promise.all([
      fetchIgProfile(conn.igUserId, conn.pageAccessToken),
      fetchIgInsights(conn.igUserId, conn.pageAccessToken, [
        'reach',
        'profile_views',
        'accounts_engaged',
        'total_interactions',
      ]),
      fetchIgMedia(conn.igUserId, conn.pageAccessToken, 25),
    ]);

    const today = new Date().toISOString().slice(0, 10);
    await supabase.from('instagram_metrics_daily').upsert(
      {
        date: today,
        followers_count: profile.followers_count ?? null,
        media_count: profile.media_count ?? null,
        reach: insights.reach ?? null,
        profile_views: insights.profile_views ?? null,
        accounts_engaged: insights.accounts_engaged ?? null,
        total_interactions: insights.total_interactions ?? null,
        raw: insights,
      },
      { onConflict: 'date' }
    );

    if (media.length > 0) {
      await supabase.from('instagram_media_cache').upsert(
        media.map((m) => ({
          id: m.id,
          caption: m.caption ?? null,
          media_type: m.media_type,
          media_url: m.media_url ?? null,
          thumbnail_url: m.thumbnail_url ?? null,
          permalink: m.permalink,
          like_count: m.like_count ?? null,
          comments_count: m.comments_count ?? null,
          posted_at: m.timestamp,
          synced_at: new Date().toISOString(),
        })),
        { onConflict: 'id' }
      );
    }

    await supabase.from('content_sync_log').insert({
      status: 'ok',
      items_synced: media.length,
      detail: `Perfil @${profile.username}, ${media.length} posts`,
    });

    return NextResponse.json({ synced: media.length, username: profile.username });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Error desconocido';
    await supabase.from('content_sync_log').insert({ status: 'error', items_synced: 0, detail });
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}
