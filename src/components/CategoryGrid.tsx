import Link from 'next/link'
import { Shirt, Coffee, Image as ImageIcon, Box, Tag, Star, PenTool, LayoutTemplate } from 'lucide-react'

const categories = [
  { id: 'polos', name: 'Polos y Poleras', icon: Shirt, color: 'text-cyan-500', bg: 'bg-cyan-50', link: '/categoria/polos' },
  { id: 'tazas', name: 'Tazas', icon: Coffee, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', link: '/categoria/tazas' },
  { id: 'termos', name: 'Termos', icon: Box, color: 'text-yellow-500', bg: 'bg-yellow-50', link: '/categoria/termos' },
  { id: 'cuadros', name: 'Cuadros', icon: ImageIcon, color: 'text-cyan-600', bg: 'bg-cyan-100', link: '/categoria/cuadros' },
  { id: 'gorras', name: 'Gorras', icon: Tag, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100', link: '/categoria/gorras' },
  { id: 'pines', name: 'Pines', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', link: '/categoria/pines' },
  { id: 'llaveros', name: 'Llaveros', icon: PenTool, color: 'text-gray-600', bg: 'bg-gray-100', link: '/categoria/llaveros' },
  { id: 'otros', name: 'Ver Todo', icon: LayoutTemplate, color: 'text-gray-900', bg: 'bg-white border-2 border-gray-200', link: '/productos' },
]

export default function CategoryGrid() {
  return (
    <section id="categorias" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explora nuestros productos
          </h2>
          <p className="text-lg text-gray-600">
            Elige el artículo perfecto y personalízalo con tus diseños, logotipos o fotografías. 
            Ideal para regalos, eventos o uniformes corporativos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link 
                key={cat.id} 
                href={cat.link}
                className="group flex flex-col items-center p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-100"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${cat.bg}`}>
                  <Icon className={`w-10 h-10 ${cat.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
