import Image from 'next/image'
import { Layers, Droplet, Scissors } from 'lucide-react'

const techniques = [
  {
    title: 'Impresión DTF',
    description: 'Direct to Film. Ideal para diseños a todo color y detalles finos. Altísima durabilidad y resistencia a los lavados en cualquier tipo de tela.',
    icon: Layers,
    color: 'text-cyan-500'
  },
  {
    title: 'Sublimación',
    description: 'Colores vibrantes que se integran a la superficie. Perfecto para tazas, termos y prendas de poliéster. El diseño nunca se borra ni se siente al tacto.',
    icon: Droplet,
    color: 'text-fuchsia-500'
  },
  {
    title: 'Vinil Textil',
    description: 'Acabados precisos, mates o brillantes para diseños de colores sólidos. Excelente para logotipos, números o frases en polos y gorras.',
    icon: Scissors,
    color: 'text-yellow-500'
  }
]

export default function PrintingTechniques() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <Image 
                src="/printing_techniques.jpg" 
                alt="Proceso de personalización en MATSOF" 
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative background elements using CMYK colors */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              La mejor tecnología para dar vida a tus ideas
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              En MATSOF combinamos la habilidad artesanal con maquinaria de última generación para garantizar acabados perfectos. Seleccionamos la técnica ideal según el producto y tu diseño.
            </p>

            <div className="space-y-8">
              {techniques.map((tech, index) => {
                const Icon = tech.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${tech.color}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
