import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Nombre de archivo requerido' }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Cuerpo de petición requerido' }, { status: 400 });
  }

  try {
    // Agregamos un prefijo para identificar los diseños de los clientes
    const blob = await put(`customer-designs/${filename}`, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error('Error subiendo a Vercel Blob:', error);
    return NextResponse.json({ error: `Error de Blob: ${error.message || 'Desconocido'}` }, { status: 500 });
  }
}
