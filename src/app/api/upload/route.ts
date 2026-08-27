import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request): Promise<NextResponse> {
  // El middleware ya verifica la autenticación, pero por seguridad extra:
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');

  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Nombre de archivo requerido' }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Cuerpo de petición requerido' }, { status: 400 });
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error('Error subiendo a Vercel Blob:', error);
    return NextResponse.json({ error: `Error de Blob: ${error.message || 'Desconocido'}` }, { status: 500 });
  }
}
