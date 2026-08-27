'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from './actions'

export default function DeleteButton({ id, name }: { id: string, name: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"?\nEsta acción no se puede deshacer.`)) {
      setIsDeleting(true)
      const result = await deleteProduct(id)
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
      className={`p-2 rounded-lg transition-colors ${
        isDeleting 
          ? 'text-gray-300 cursor-not-allowed' 
          : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
      }`}
      title="Eliminar"
    >
      <Trash2 size={18} />
    </button>
  )
}
