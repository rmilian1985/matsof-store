'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import Image from 'next/image'

export function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotal = useCartStore((state) => state.getTotal)
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleWhatsAppOrder = () => {
    // Aquí puedes poner el número real de MATSOF
    const phoneNumber = '51944761889'
    
    let message = 'Hola MATSOF, me gustaría hacer el siguiente pedido:\n\n'
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (S/ ${(item.price * item.quantity).toFixed(2)})\n`
    })
    
    message += `\n*Total a pagar: S/ ${getTotal().toFixed(2)}*`
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:scale-110 hover:shadow-secondary/50 transition-all duration-300 animate-in fade-in zoom-in duration-500"
        aria-label="Ver Carrito"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-3 -right-3 flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-md">
              {getTotalItems()}
            </span>
          )}
        </div>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-zinc-200 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 bg-zinc-50">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-secondary" />
            Tu Pedido
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
              <ShoppingCart className="w-16 h-16 text-zinc-400" />
              <p className="text-zinc-500 text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-zinc-200 shadow-sm">
                <div className="relative w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-zinc-400">Sin foto</div>
                  )}
                </div>
                
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-sm text-zinc-800 line-clamp-2 leading-tight">
                      <span className="text-secondary font-bold mr-1">{item.quantity}x</span> 
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 hover:text-accent transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-1 border border-zinc-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-zinc-200 rounded text-zinc-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center text-zinc-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-zinc-200 rounded text-zinc-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-zinc-900">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50/90 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-600 text-lg">Total a pagar:</span>
              <span className="text-2xl font-bold text-zinc-900">S/ {getTotal().toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.77.464 3.428 1.258 4.887l-1.347 4.914 5.034-1.32A9.972 9.972 0 0012.012 22c5.532 0 10.012-4.48 10.012-10.012C22.024 6.48 17.544 2 12.012 2zM17.15 14.86c-.244 1.156-1.378 1.944-2.58 2.156-.728.128-1.742.01-3.32-.64-2.164-.892-3.804-2.824-5.18-4.908-.328-.496-1.282-1.734-1.282-3.308 0-1.57.828-2.35 1.134-2.678.306-.328.666-.41.888-.41.222 0 .444 0 .638.01.218.01.512-.084.8.618.29.704.978 2.392 1.066 2.568.09.176.15.38.03.6-.118.222-.178.358-.356.568-.178.21-.372.464-.534.614-.176.166-.362.348-.158.704.204.356.91 1.51 1.954 2.44.138.122 1.252 1.036 2.502 1.58.334.146.53.12.728-.094.198-.214.846-.988 1.074-1.328.228-.34.456-.284.778-.162.322.122 2.036.96 2.38 1.132.344.172.574.256.658.4.084.144.084.836-.16 1.992z" clipRule="evenodd" />
              </svg>
              Enviar Pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  )
}
