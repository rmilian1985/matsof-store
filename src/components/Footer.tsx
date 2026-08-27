import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">MATSOF</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Especialistas en productos personalizados de alta calidad. Transformamos tus ideas en artículos memorables usando técnicas de DTF, sublimación y vinil textil.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-cyan-600 transition-colors text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-fuchsia-600 transition-colors text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Productos</h3>
            <ul className="space-y-4">
              <li><Link href="/categoria/polos" className="hover:text-cyan-400 transition-colors">Polos y Poleras</Link></li>
              <li><Link href="/categoria/tazas" className="hover:text-cyan-400 transition-colors">Tazas</Link></li>
              <li><Link href="/categoria/gorras" className="hover:text-cyan-400 transition-colors">Gorras</Link></li>
              <li><Link href="/productos" className="hover:text-cyan-400 transition-colors">Ver catálogo completo</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Información</h3>
            <ul className="space-y-4">
              <li><Link href="/nosotros" className="hover:text-cyan-400 transition-colors">Quiénes Somos</Link></li>
              <li><Link href="/tecnicas" className="hover:text-cyan-400 transition-colors">Nuestras Técnicas</Link></li>
              <li><Link href="/faq" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/terminos" className="hover:text-cyan-400 transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>+51 999 999 999</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-fuchsia-500 flex-shrink-0 mt-0.5" />
                <span>ventas@matsof.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>Lima, Perú (Atención online y envíos a todo el país)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MATSOF Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
