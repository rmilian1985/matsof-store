'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, Save, ArrowLeft } from 'lucide-react'
import { createProduct, updateProduct } from '@/app/admin/actions'
import { Product } from '@prisma/client'
import Link from 'next/link'

export default function ProductForm({
  product,
}: {
  product?: Product | null
}) {
  const router = useRouter()
  const isEditing = !!product

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    category: product?.category || 'Polos',
    gender: (product as any)?.gender || 'Unisex', // using as any since Product type might not be updated yet
    technique: product?.technique || '',
    imageUrl: product?.imageUrl || '',
  })

  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.imageUrl || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ['Polos', 'Tazas', 'Gorras', 'Termos', 'Cuadros', 'Llaveros', 'Pines', 'Accesorios']
  const techniques = ['DTF', 'Sublimación', 'Vinil Textil', 'Grabado Láser', 'Impresión 3D', 'Sin técnica']

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      // Crear vista previa
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUploadImage = async (file: File): Promise<string> => {
    // Para simplificar, le pedimos a nuestro endpoint /api/upload
    const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
      method: 'POST',
      body: file,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error subiendo la imagen')
    }

    const blob = await response.json()
    return blob.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let uploadedImageUrl = formData.imageUrl

      if (file) {
        uploadedImageUrl = await handleUploadImage(file)
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        gender: formData.gender,
        technique: formData.technique === 'Sin técnica' ? '' : formData.technique,
        imageUrl: uploadedImageUrl,
      }

      let result
      if (isEditing && product) {
        result = await updateProduct(product.id, productData)
      } else {
        result = await createProduct(productData)
      }

      if (result.success) {
        router.push('/admin')
      } else {
        setError(result.error || 'Error guardando producto')
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
        
        {/* Imagen */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Fotografía del Producto</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div 
              className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden relative cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="text-center text-gray-400">
                  <Upload size={24} className="mx-auto mb-1" />
                  <span className="text-xs">Subir foto</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Elegir archivo...
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Recomendamos fotos cuadradas para una mejor visualización en el catálogo.
              </p>
              
              {file && (
                <div className="mt-3 flex items-center gap-2 text-sm text-[var(--cmyk-cian)] bg-cyan-50 p-2 rounded-lg">
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button type="button" onClick={() => { setFile(null); setPreviewUrl(product?.imageUrl || null) }}>
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detalles principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cmyk-cian)]"
              placeholder="Ej: Polo Personalizado de Algodón"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cmyk-cian)]"
              placeholder="Detalles sobre el producto, material, tallas..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/) *</label>
            <input
              type="number"
              required
              min="0"
              step="0.10"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cmyk-cian)]"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cmyk-cian)]"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
              {/* Si tiene una categoria que no esta en la lista, mostrarla tmb */}
              {!categories.includes(formData.category) && formData.category && (
                 <option value={formData.category}>{formData.category}</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Género / Público *</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cmyk-cian)]"
            >
              <option value="Unisex">Unisex</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niños">Niños</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Técnica de Personalización</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {techniques.map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setFormData({ ...formData, technique: tech })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.technique === tech || (tech === 'Sin técnica' && !formData.technique)
                      ? 'bg-[var(--cmyk-magenta)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--cmyk-cian)] hover:bg-cyan-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span>Guardando...</span>
            ) : (
              <>
                <Save size={20} />
                Guardar Producto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
