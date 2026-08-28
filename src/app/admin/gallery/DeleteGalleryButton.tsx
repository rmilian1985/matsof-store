'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteGalleryImage } from '../actions'

export default function DeleteGalleryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que deseas eliminar esta imagen de la galería?')) {
      setIsDeleting(true)
      const result = await deleteGalleryImage(id)
      if (!result.success) {
        alert(result.error)
        setIsDeleting(false)
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 rounded-lg transition-colors bg-white/80 hover:bg-red-500 hover:text-white backdrop-blur-sm shadow-sm ${
        isDeleting ? 'opacity-50 cursor-not-allowed' : 'text-red-500'
      }`}
      title="Eliminar imagen"
    >
      <Trash2 size={18} />
    </button>
  )
}
