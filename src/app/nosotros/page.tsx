import Image from 'next/image'

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre MATSOF
          </h1>
          <p className="text-xl text-gray-600">
            Somos especialistas en dar vida a tus ideas a través de productos personalizados de la más alta calidad.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              En MATSOF, nacimos con la pasión de transformar artículos cotidianos en piezas únicas. Empezamos experimentando con pequeñas impresiones y hoy dominamos técnicas avanzadas como el DTF, la sublimación y el vinil textil.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nuestro objetivo es brindarte soluciones de personalización tanto para regalos memorables como para potenciar la identidad de tu empresa con uniformes corporativos y merchandising de primer nivel.
            </p>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/hero_image.jpg" 
                alt="Equipo MATSOF trabajando" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-cyan-900/10 mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros Pilares</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Calidad</h3>
              <p className="text-gray-600">Usamos insumos de primera para que tus diseños duren y destaquen.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-fuchsia-50 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Puntualidad</h3>
              <p className="text-gray-600">Sabemos que tu tiempo vale. Cumplimos con las fechas de entrega acordadas.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Creatividad</h3>
              <p className="text-gray-600">Te asesoramos para elegir la mejor técnica y hacer que tu idea luzca increíble.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
