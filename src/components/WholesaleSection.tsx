import Link from 'next/link'
import Image from 'next/image'
import { Building2, ArrowRight } from 'lucide-react'

const benefits = [
  {
    title: 'Eventos y Cumpleaños',
    description: 'Sorprende a tus invitados con recuerdos personalizados únicos para tu celebración.',
    image: '/images/wholesale/eventos.jpg'
  },
  {
    title: 'Uniformes Corporativos',
    description: 'Viste a tu equipo con polos y accesorios que reflejen la identidad de tu empresa.',
    image: '/images/wholesale/uniformes.jpg'
  },
  {
    title: 'Merchandising',
    description: 'Fideliza a tus clientes con artículos promocionales de alta calidad con tu logo.',
    image: '/images/wholesale/merchandising.jpg'
  },
  {
    title: 'Descuentos por Volumen',
    description: 'Obtén tarifas especiales a partir de docenas, cientos o miles de unidades.',
    image: '/images/wholesale/volumen.jpg'
  }
]

export default function WholesaleSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-cyan-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
              <Building2 size={16} />
              ATENCIÓN PARA EMPRESAS Y EVENTOS
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Lleva tu marca o evento al <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-fuchsia-600">siguiente nivel</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              En MATSOF no solo atendemos pedidos individuales, también somos especialistas en producciones al por mayor. Ya sea para el cumpleaños de tus hijos, el aniversario de tu empresa o una campaña publicitaria masiva, tenemos la capacidad y la calidad que buscas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://wa.me/51944761889?text=Hola,%20quisiera%20una%20cotizaci%C3%B3n%20al%20por%20mayor%20para%20un%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                Cotizar al por mayor
                <ArrowRight size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61568317736149"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-200 hover:border-[#1877F2] hover:text-[#1877F2] text-gray-700 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                Ver trabajos en Facebook
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {benefits.map((benefit, idx) => {
              return (
                <div key={idx} className="bg-white overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image src={benefit.image} alt={benefit.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
