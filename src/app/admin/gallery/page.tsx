import { db } from '@/lib/db'
import GalleryUpload from './GalleryUpload'
import DeleteGalleryButton from './DeleteGalleryButton'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminGalleryPage() {
  const images = await db.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Galería de Trabajos</h1>
        <p className="text-gray-600">Sube fotos de tus trabajos terminados para mostrarlos en la página principal y generar confianza en tus clientes.</p>
      </div>

      <GalleryUpload />

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Imágenes subidas ({images.length})</h2>
        
        {images.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Aún no has subido ninguna foto a la galería.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src={image.imageUrl}
                  alt={image.title || 'Foto de galería'}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <DeleteGalleryButton id={image.id} />
                  </div>
                  {image.title && (
                    <div className="bg-black/60 text-white text-xs p-2 rounded-lg backdrop-blur-sm line-clamp-2">
                      {image.title}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
