import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-32 h-12">
              <Image 
                src="/logo-matsof.png" 
                alt="MATSOF Logo" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/nosotros" className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors">
              Nosotros
            </Link>
            <Link href="/#categorias" className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors">
              Categorías
            </Link>
            <Link href="/#productos" className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors">
              Catálogo
            </Link>
            <a 
              href="https://wa.me/51944761889?text=Hola%20MATSOF,%20tengo%20una%20consulta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/login" 
              className="hidden md:inline-flex text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Admin
            </Link>
            <a 
              href="https://wa.me/51944761889?text=Hola%20MATSOF,%20vengo%20de%20su%20p%C3%A1gina%20web%20y%20me%20gustar%C3%ADa%20cotizar%20unos%20productos%20personalizados" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-cyan-600 transition-all shadow-md hover:shadow-cyan-500/30"
            >
              Cotizar
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
