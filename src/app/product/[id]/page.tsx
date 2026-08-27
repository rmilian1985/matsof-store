import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/AddToCartButton'

export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = await db.product.findUnique({
    where: { id }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen font-sans text-zinc-900 pb-20 overflow-x-hidden relative selection:bg-secondary/30 bg-background">
      
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-zinc-200 bg-white/70 shadow-sm">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-48 hidden sm:block bg-white rounded-lg p-1 overflow-hidden transition-transform group-hover:scale-105 border border-zinc-100 shadow-sm">
               <Image src="/logo.png" alt="MATSOF" fill className="object-contain" />
            </div>
            <span className="sm:hidden text-xl font-bold tracking-tight text-secondary group-hover:text-accent transition-colors">Volver</span>
            <span className="hidden sm:block text-sm font-bold tracking-tight text-secondary group-hover:text-accent transition-colors mt-1">← Volver al Catálogo</span>
          </Link>
        </nav>

        <main className="px-6 pt-32 sm:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Imagen del Producto */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-zinc-200 shadow-xl bg-zinc-50 sticky top-32">
              {product.imageUrl ? (
                <Image 
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-400">
                  Sin Imagen
                </div>
              )}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-zinc-200 shadow-sm text-secondary">
                {product.category}
              </div>
              {product.technique && (
                <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold shadow-sm text-accent-foreground">
                  {product.technique}
                </div>
              )}
            </div>
          </div>

          {/* Detalles del Producto */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
                {product.name}
              </h1>
              <p className="text-zinc-600 mt-4 text-lg font-medium">
                {product.description || 'Producto personalizado con los mejores materiales.'}
              </p>
            </div>

            <div className="text-4xl font-bold text-zinc-900 drop-shadow-sm">
              S/ {product.price.toFixed(2)}
            </div>

            <div className="h-px w-full bg-zinc-200 my-2" />

            <div className="mt-4">
              <AddToCartButton product={product} />
              
              <p className="text-zinc-500 font-medium text-sm mt-4 text-center sm:text-left">
                Agrega los productos que desees y luego envía tu pedido por WhatsApp.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
