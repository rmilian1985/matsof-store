import { FloatingCart } from '@/components/FloatingCart'
import HeroSection from '@/components/HeroSection'
import CategoryGrid from '@/components/CategoryGrid'
import PrintingTechniques from '@/components/PrintingTechniques'
import FeaturesSection from '@/components/FeaturesSection'
import WholesaleSection from '@/components/WholesaleSection'
import Footer from '@/components/Footer'
import { CatalogClient } from '@/components/CatalogClient'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch products from database
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-8">
        <HeroSection />
        <CategoryGrid />
        
        {/* Catálogo de Productos (Manteniendo la funcionalidad anterior) */}
        <section id="productos" className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Catálogo de Productos
              </h2>
              <p className="text-lg text-gray-600">
                Añade los productos que necesites a tu cotizador.
              </p>
            </div>
            <CatalogClient products={products} />
          </div>
        </section>

        <PrintingTechniques />

        <WholesaleSection />

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  )
}
