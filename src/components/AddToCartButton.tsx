'use client'

import { useState } from 'react'
import { useCartStore, CartItem } from '@/store/cartStore'
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string | null
    category: string
    gender?: string | null
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const isClothing = product.category === 'Polos' || product.category === 'Polos y Poleras'
  const isKids = product.gender === 'Niños'

  const adultSizes = ['S', 'M', 'L', 'XL']
  const kidsSizes = ['4', '6', '8', '10', '12', '14', '16']
  
  const availableSizes = isClothing ? (isKids ? kidsSizes : adultSizes) : []
  
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0] || '')
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  const handleAdd = () => {
    const item: CartItem = {
      id: selectedSize ? `${product.id}-${selectedSize}` : product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      size: selectedSize || undefined
    }
    addItem(item)
    
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Tallas si es ropa */}
      {isClothing && (
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-zinc-700">Selecciona tu talla:</span>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                  selectedSize === size
                    ? 'bg-secondary text-white shadow-md shadow-secondary/30 scale-105'
                    : 'bg-white border-2 border-zinc-200 text-zinc-600 hover:border-secondary hover:text-secondary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        {/* Selector de cantidad */}
        <div className="flex items-center justify-between bg-zinc-100 border border-zinc-200 rounded-xl h-14 px-2 w-full sm:w-32">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-zinc-900 w-8 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Botón Agregar */}
        <button 
          onClick={handleAdd}
          className={`flex-1 w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl px-8 h-14 text-lg font-bold transition-all shadow-md
            ${isAdded 
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:-translate-y-1'
            }
          `}
        >
          {isAdded ? (
            <>
              <Check className="w-6 h-6" />
              ¡Agregado!
            </>
          ) : (
            <>
              <ShoppingCart className="w-6 h-6" />
              Agregar al Carrito
            </>
          )}
        </button>
      </div>
    </div>
  )
}
