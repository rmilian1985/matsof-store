'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from './ProductCard'
// import { Search } from 'lucide-react'

import { ScrollReveal } from './ScrollReveal'

type Product = {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  gender?: string | null
  technique: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

function CatalogContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const urlCategory = searchParams.get('categoria')
  const searchQuery = searchParams.get('q') || ''

  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  // Efecto para sincronizar la URL con el estado local de categoría
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory)
    } else {
      setActiveCategory('Todos')
    }
  }, [urlCategory])

  // Aplicar filtros y búsqueda
  const filteredProducts = products.filter((p) => {
    // 1. Filtro de búsqueda
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // 2. Filtro de categoría
    const matchCategory = activeCategory === 'Todos' || p.category === activeCategory

    return matchesSearch && matchCategory
  })

  return (
    <section className="w-full max-w-7xl">
      {searchQuery && (
        <div className="mb-8">
          <p className="text-zinc-500">
            Resultados de búsqueda para: <span className="font-bold text-zinc-900">"{searchQuery}"</span>
          </p>
        </div>
      )}
      
      {activeCategory !== 'Todos' && (
        <div className="mb-8 flex items-center justify-between bg-zinc-50 p-4 rounded-xl border border-zinc-100">
          <h3 className="text-xl font-medium text-zinc-800">
            Categoría: <span className="font-bold text-cyan-600">{activeCategory}</span>
          </h3>
          <a 
            href="/#productos"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm transition-all"
          >
            Ver todos los productos
          </a>
        </div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
          <p className="text-zinc-500 text-lg">No encontramos productos con estos filtros o búsqueda.</p>
          <a 
            href="/#productos"
            className="mt-4 text-[var(--cmyk-cian)] hover:underline font-medium"
          >
            Quitar todos los filtros
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={Math.min(index * 0.1, 0.5)}>
              <div className="h-full">
                <ProductCard product={product as any} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  )
}

export function CatalogClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<div className="py-24 text-center">Cargando catálogo...</div>}>
      <CatalogContent products={products} />
    </Suspense>
  )
}
