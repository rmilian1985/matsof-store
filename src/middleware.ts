import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Excluir la página de login
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  // Rutas protegidas: /admin y /api/upload
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/upload')) {
    const adminToken = request.cookies.get('admin_auth')?.value

    if (!adminToken) {
      if (pathname.startsWith('/api/upload')) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/upload/:path*'],
}
