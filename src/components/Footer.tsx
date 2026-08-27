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
              <a href="https://www.facebook.com/profile.php?id=61568317736149" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors text-white" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://wa.me/51944761889" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#25D366] transition-colors text-white" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Productos</h3>
            <ul className="space-y-4">
              <li><Link href="/?categoria=Polos#productos" className="hover:text-cyan-400 transition-colors">Polos y Poleras</Link></li>
              <li><Link href="/?categoria=Tazas#productos" className="hover:text-cyan-400 transition-colors">Tazas</Link></li>
              <li><Link href="/?categoria=Gorras#productos" className="hover:text-cyan-400 transition-colors">Gorras</Link></li>
              <li><Link href="/?categoria=Todos#productos" className="hover:text-cyan-400 transition-colors">Ver catálogo completo</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Especiales</h3>
            <ul className="space-y-4">
              <li><Link href="/#tecnicas" className="hover:text-cyan-400 transition-colors">Nuestras Técnicas</Link></li>
              <li><Link href="https://wa.me/51944761889?text=Hola,%20quisiera%20una%20cotizaci%C3%B3n%20al%20por%20mayor" target="_blank" className="hover:text-cyan-400 transition-colors">Ventas Corporativas</Link></li>
              <li><Link href="https://wa.me/51944761889?text=Hola,%20tengo%20una%20duda%20sobre%20un%20producto" target="_blank" className="hover:text-cyan-400 transition-colors">Preguntas y Soporte</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>+51 944 761 889</span>
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
