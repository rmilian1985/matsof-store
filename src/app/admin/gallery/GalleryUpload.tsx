'use client'

import { useState } from 'react'
import { Upload, Loader2, Image as ImageIcon, Check } from 'lucide-react'
import { createGalleryImage } from '../actions'

export default function GalleryUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [title, setTitle] = useState('')

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
      const filename = `gallery-${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const response = await fetch(`/api/upload-public?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: file,
      })
      
      if (!response.ok) {
        throw new Error('Error al subir imagen a Vercel Blob')
      }
      
      const blob = await response.json()
      
      // Guardar en base de datos
      const res = await createGalleryImage({ imageUrl: blob.url, title: title || undefined })
      if (!res.success) {
        throw new Error(res.error)
      }
      
      setTitle('')
    } catch (error) {
      console.error(error)
      setUploadError('Ocurrió un error al subir la imagen. Intenta de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4">Añadir nueva foto a la galería</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título o descripción (Opcional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Polos estampados para empresa"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            disabled={isUploading}
          />
        </div>
        
        <label className={`
          flex items-center justify-center gap-3 w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all
          ${isUploading 
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-70' 
            : 'border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 text-gray-600'}
        `}>
          {isUploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
              <span className="font-medium">Subiendo y guardando...</span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6" />
              <span className="font-medium">Seleccionar foto para la galería</span>
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
        {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
      </div>
    </div>
  )
}
