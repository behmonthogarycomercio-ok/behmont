import { NextResponse } from 'next/server';
import { getSucursales } from '@/lib/andreani';

export async function GET(request: Request) {
  const cp = new URL(request.url).searchParams.get('cp');
  if (!cp) {
    return NextResponse.json({ error: 'Falta el código postal' }, { status: 400 });
  }

  try {
    const sucursales = await getSucursales(cp);
    return NextResponse.json({ sucursales });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al buscar sucursales';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
