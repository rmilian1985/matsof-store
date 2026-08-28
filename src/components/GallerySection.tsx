import Image from 'next/image'
import { db } from '@/lib/db'

export default async function GallerySection() {
  const images = await db.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 12, // Mostrar máximo 12 fotos recientes
  })

  // Si no hay imágenes en la galería, no mostrar la sección
  if (images.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            📸 Trabajos Reales
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resultados que hablan por sí solos
          </h2>
          <p className="text-lg text-gray-600">
            Descubre algunos de los proyectos personalizados que hemos creado para nuestros clientes.
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="relative rounded-2xl overflow-hidden break-inside-avoid group cursor-pointer"
            >
              <Image
                src={img.imageUrl}
                alt={img.title || 'Trabajo realizado por MATSOF'}
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {img.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">¿Te gusta lo que ves? ¡Hagamos realidad tu idea!</p>
          <a 
            href="https://wa.me/51944761889?text=Hola%20MATSOF,%20quiero%20cotizar%20un%20trabajo%20personalizado." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-gray-900/20"
          >
            Cotizar mi proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
