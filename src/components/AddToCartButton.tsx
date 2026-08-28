'use client'

import { useState } from 'react'
import { useCartStore, CartItem } from '@/store/cartStore'
import { Plus, Minus, ShoppingCart, Check, Upload, Loader2, Image as ImageIcon } from 'lucide-react'

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
  const hasColors = isClothing || product.category === 'Gorras'

  const adultSizes = ['S', 'M', 'L', 'XL']
  const kidsSizes = ['4', '6', '8', '10', '12', '14', '16']

  const availableSizes = isClothing ? (isKids ? kidsSizes : adultSizes) : []

  const basicColors = [
    { id: 'Blanco', bg: 'bg-white', border: 'border-zinc-200' },
    { id: 'Negro', bg: 'bg-zinc-900', border: 'border-zinc-900' },
    { id: 'Gris', bg: 'bg-zinc-400', border: 'border-zinc-400' },
    { id: 'Rojo', bg: 'bg-red-600', border: 'border-red-600' },
    { id: 'Azul Marino', bg: 'bg-blue-900', border: 'border-blue-900' },
    { id: 'Azul', bg: 'bg-blue-500', border: 'border-blue-500' },
  ]

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0] || '')
  const [selectedColor, setSelectedColor] = useState<string>(hasColors ? basicColors[0].id : '')
  const [isAdded, setIsAdded] = useState(false)
  const [designUrl, setDesignUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const addItem = useCartStore(state => state.addItem)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor sube una imagen válida (JPG, PNG)')
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      // Create a unique filename
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const response = await fetch(`/api/upload-public?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: file,
      })

      if (!response.ok) {
        throw new Error('Error al subir imagen')
      }

      const blob = await response.json()
      setDesignUrl(blob.url)
    } catch (error) {
      console.error(error)
      setUploadError('Ocurrió un error al subir la imagen. Intenta de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleAdd = () => {
    const item: CartItem = {
      id: `${product.id}${selectedSize ? `-${selectedSize}` : ''}${selectedColor ? `-${selectedColor}` : ''}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      designUrl: designUrl || undefined
    }
    addItem(item)

    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Selector de Color */}
      {hasColors && (
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-zinc-700">Selecciona el color:</span>
          <div className="flex flex-wrap gap-3">
            {basicColors.map(color => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                title={color.id}
                className={`w-10 h-10 rounded-full transition-all duration-300 border-2 flex items-center justify-center ${selectedColor === color.id
                    ? 'ring-2 ring-offset-2 ring-secondary border-transparent scale-110 shadow-md'
                    : `${color.border} hover:scale-105 hover:shadow-sm`
                  }`}
              >
                <div className={`w-full h-full rounded-full ${color.bg}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selector de Tallas si es ropa */}
      {isClothing && (
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-zinc-700">Selecciona tu talla:</span>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${selectedSize === size
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

      {/* Subir Diseño */}
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-zinc-700">Sube tu diseño o logo (Opcional):</span>

        {designUrl ? (
          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <Check className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 text-sm font-medium">¡Diseño subido con éxito!</span>
            <button
              onClick={() => setDesignUrl('')}
              className="ml-auto text-xs text-emerald-600 hover:underline"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <div>
            <label className={`
              flex items-center justify-center gap-3 w-full h-14 border-2 border-dashed rounded-xl cursor-pointer transition-all
              ${isUploading
                ? 'border-zinc-300 bg-zinc-50 cursor-not-allowed opacity-70'
                : 'border-zinc-300 hover:border-secondary hover:bg-zinc-50 text-zinc-600'}
            `}>
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-secondary" />
                  <span className="font-medium">Subiendo imagen...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Seleccionar imagen</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
            <p className="text-zinc-500 text-xs mt-2 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> JPG, PNG (Max 5MB)
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-2">
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
