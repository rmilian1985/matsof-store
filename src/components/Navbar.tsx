import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Redes Sociales y Contacto */}
      <div className="bg-gray-900 text-gray-200 py-1.5 border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center text-xs font-medium">
          <div className="hidden md:flex items-center gap-4">
            <span>📍 Lima, Perú - Envíos a todo el país</span>
            <span>📞 +51 944 761 889</span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
            <span className="hidden sm:inline text-gray-400">Síguenos en:</span>
            
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61568317736149" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] transition-colors flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              Facebook
            </a>
            
            {/* Instagram */}
            <a href="https://www.instagram.com/matsof" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition-colors flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a>
            
            {/* TikTok */}
            <a href="https://www.tiktok.com/@matsof" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.321 5.562a5.45 5.45 0 0 1-3.957-1.57A5.404 5.404 0 0 1 14.502.1c0-.029-.001-.065-.001-.101h-3.41v15.932a3.86 3.86 0 1 1-3.86-3.862c.319 0 .626.04.918.114V8.583a7.288 7.288 0 1 0 6.353 7.217V6.865a8.887 8.887 0 0 0 4.819 1.408v-2.711z"/></svg>
              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
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
    </header>
  )
}
