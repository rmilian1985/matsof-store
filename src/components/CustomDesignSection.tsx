'use client'

import { useState } from 'react'
import { Upload, Loader2, Image as ImageIcon, MessageCircle, Check } from 'lucide-react'

export default function CustomDesignSection() {
  const [designUrl, setDesignUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor sube una imagen válida (JPG, PNG)')
      return
    }
    
    setIsUploading(true)
    setUploadError('')
    
    try {
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

  const handleWhatsApp = () => {
    const phoneNumber = '51944761889'
    let message = 'Hola MATSOF, tengo mi propio diseño y me gustaría cotizarlo para aplicarlo en un producto.\n\n'
    if (designUrl) {
      message += `📎 Aquí te envío el diseño: ${designUrl}`
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="py-20 relative overflow-hidden bg-zinc-900 text-white">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-l from-magenta-500/20 to-purple-500/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Texto e Información */}
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold mb-2">
              ✨ Personalización Total
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              ¿Ya tienes tu diseño <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                listo para estampar?
              </span>
            </h2>
            <p className="text-lg text-zinc-300">
              Sube tu logotipo, foto o ilustración. Nosotros nos encargamos de adaptarlo a polos, tazas, gorras o cualquier producto que necesites. ¡Cotiza al instante!
            </p>
          </div>

          {/* Tarjeta de Subida */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-6">
              
              {!designUrl ? (
                <>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Sube tu archivo aquí</h3>
                    <p className="text-sm text-zinc-400">Soportamos JPG, PNG de alta calidad</p>
                  </div>

                  <label className={`
                    relative overflow-hidden flex flex-col items-center justify-center gap-4 w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all group
                    ${isUploading 
                      ? 'border-cyan-500/50 bg-cyan-500/5 cursor-not-allowed' 
                      : 'border-zinc-600 hover:border-cyan-400 hover:bg-cyan-400/5'}
                  `}>
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-3 text-cyan-400">
                        <Loader2 className="w-10 h-10 animate-spin" />
                        <span className="font-medium animate-pulse">Subiendo a la nube...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-zinc-400 group-hover:text-cyan-400 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors">
                          <Upload className="w-8 h-8" />
                        </div>
                        <span className="font-medium">Haz clic o arrastra tu imagen</span>
                        <div className="flex items-center gap-1 text-xs opacity-70">
                          <ImageIcon className="w-3 h-3" /> Max 5MB
                        </div>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                  {uploadError && <p className="text-red-400 text-sm text-center">{uploadError}</p>}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-6 py-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-semibold text-emerald-400">¡Diseño subido con éxito!</h3>
                    <p className="text-zinc-400">Tu archivo está seguro en nuestra nube.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                    <button 
                      onClick={() => setDesignUrl('')}
                      className="flex-1 py-3 px-4 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors text-sm font-medium"
                    >
                      Subir otro archivo
                    </button>
                    <button 
                      onClick={handleWhatsApp}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors text-sm font-bold shadow-lg shadow-[#25D366]/20"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Cotizar por WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
