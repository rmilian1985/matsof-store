import { Truck, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: CheckCircle2,
    title: 'Sin pedido mínimo',
    description: 'Personaliza desde 1 sola unidad hasta grandes volúmenes para tu empresa.'
  },
  {
    icon: ShieldCheck,
    title: 'Calidad Premium',
    description: 'Revisamos cada producto para garantizar que la impresión y el material sean perfectos.'
  },
  {
    icon: Truck,
    title: 'Envíos Rápidos',
    description: 'Procesamos tu pedido con rapidez para que lo tengas cuando lo necesites.'
  },
  {
    icon: MessageCircle,
    title: 'Asesoría Personalizada',
    description: '¿No sabes qué técnica usar? Te guiamos por WhatsApp en cada paso.'
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mb-6 text-cyan-600">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
