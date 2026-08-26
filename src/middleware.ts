import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const isAdminRoute =
    request.nextUrl.pathname.startsWith('/admin') &&
    request.nextUrl.pathname !== '/admin';

  try {
    let response = NextResponse.next({ request: { headers: request.headers } });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Sin config de Supabase no hay forma de verificar sesión — no se puede
    // confirmar que el visitante es admin, así que las rutas /admin se
    // bloquean (fail closed) en vez de dejarlas pasar.
    if (!supabaseUrl || !supabaseKey) {
      if (isAdminRoute) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }
      return NextResponse.next({ request: { headers: request.headers } });
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (isAdminRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    return response;
  } catch {
    // Si algo falla al verificar la sesión (ej. Supabase caído), las rutas
    // /admin se bloquean en vez de dejarse pasar sin chequeo (antes esto
    // dejaba pasar cualquier request a /admin sin verificar login).
    if (isAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request: { headers: request.headers } });
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
