'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ArrowLeft, LogOut, Image as ImageIcon } from 'lucide-react'
import { logout } from './actions'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <LayoutDashboard className="text-[var(--cmyk-magenta)]" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">MATSOF Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === '/admin' 
                ? 'bg-[var(--cmyk-cian)]/10 text-[var(--cmyk-cian)]' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package size={20} />
            Mis Productos
          </Link>
          <Link
            href="/admin/gallery"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === '/admin/gallery' 
                ? 'bg-[var(--cmyk-magenta)]/10 text-[var(--cmyk-magenta)]' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ImageIcon size={20} />
            Galería de Trabajos
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Ver Tienda
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors text-left"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  )
}
