'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../actions'
import { ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(password)

    if (result.success) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(result.error || 'Error desconocido')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 border-t-4 border-[var(--cmyk-magenta)]">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[var(--cmyk-cian)]/10 p-4 rounded-full mb-4 text-[var(--cmyk-cian)]">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Administración</h2>
          <p className="text-gray-500 mt-2">MATSOF - Productos Personalizados</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña Maestra
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cmyk-cian)] transition-colors"
              placeholder="Ingresa la contraseña"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--cmyk-cian)] text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Entrar al Panel'}
          </button>
        </form>
      </div>
    </div>
  )
}
