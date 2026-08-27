'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from './ProductCard'
import { Users, User, UserPlus, Baby } from 'lucide-react'

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

  const [activeCategory, setActiveCategory] = useState<string>('Todos')
  const [activeGender, setActiveGender] = useState<string>('Todos')

  // Efecto para sincronizar la URL con el estado local
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory)
    }
  }, [urlCategory])

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))]
  
  // Opciones del filtro de género
  const genderFilters = [
    { id: 'Todos', label: 'Cualquiera', icon: Users },
    { id: 'Hombre', label: 'Hombres', icon: User },
    { id: 'Mujer', label: 'Mujeres', icon: UserPlus },
    { id: 'Niños', label: 'Niños', icon: Baby },
  ]

  // Aplicar ambos filtros
  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === 'Todos' || p.category === activeCategory
    const productGender = p.gender || 'Unisex' // Si no tiene, asume Unisex
    const matchGender = activeGender === 'Todos' || 
                        productGender === activeGender || 
                        productGender === 'Unisex' // Unisex se muestra en todo menos niños
    return matchCategory && matchGender
  })

  return (
    <section className="w-full max-w-7xl">
      <div className="flex flex-col mb-12 gap-8">
        
        {/* Cabecera y Filtro de Categoría */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Catálogo MATSOF
          </h2>

          <div className="flex flex-wrap justify-center p-1.5 bg-zinc-100/80 border border-zinc-200/50 shadow-inner rounded-full backdrop-blur-md">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/50 scale-105'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro Innovador de Género */}
        <div className="flex justify-center w-full">
          <div className="inline-flex flex-wrap justify-center gap-3 sm:gap-4 p-2 bg-white/50 backdrop-blur-lg border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
            {genderFilters.map(filter => {
              const Icon = filter.icon
              const isActive = activeGender === filter.id
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveGender(filter.id)}
                  className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-500 ${
                    isActive 
                      ? 'bg-[var(--cmyk-cian)] text-white shadow-lg shadow-cyan-500/30 scale-105' 
                      : 'bg-white text-zinc-600 hover:bg-cyan-50 hover:text-cyan-700'
                  }`}
                >
                  <Icon 
                    size={18} 
                    className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                  />
                  <span>{filter.label}</span>
                  {/* Animación de destello al estar activo */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
          <p className="text-zinc-500 text-lg">No encontramos productos con estos filtros.</p>
          <button 
            onClick={() => { setActiveCategory('Todos'); setActiveGender('Todos'); }}
            className="mt-4 text-[var(--cmyk-cian)] hover:underline font-medium"
          >
            Quitar todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-in fade-in zoom-in-95 duration-500 fill-mode-both">
              <ProductCard product={product as any} />
            </div>
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
