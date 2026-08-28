'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore, CartItem } from '@/store/cartStore'
import { useState } from 'react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string | null
    price: number
    imageUrl: string | null
    category: string
    technique: string | null
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault() 
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    }
    addItem(item)
    
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-secondary/20 p-4 transition-all hover:border-secondary shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400">
            Sin Imagen
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-lg">
          S/ {product.price.toFixed(2)}
        </div>
        {product.technique && (
          <div className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm">
            {product.technique}
          </div>
        )}
      </div>

      <div className="relative mt-5 flex flex-col gap-2 flex-1">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="line-clamp-2 text-sm text-zinc-600">
            {product.description}
          </p>
        )}
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-3">
        <Link href={`/product/${product.id}`} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-all shadow-md">
          <span>Detalles</span>
        </Link>
        <button 
          onClick={handleQuickAdd}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all shadow-md ${
            isAdded 
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
          aria-label="Agregar al carrito"
        >
          {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
