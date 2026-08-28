'use server'

import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    return { success: false, error: 'Contraseña incorrecta' }
  }

  // En un entorno de producción, es preferible firmar esta cookie (JWT)
  const cookieStore = await cookies()
  cookieStore.set('admin_auth', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: '/',
  })

  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
}

export async function createProduct(data: {
  name: string
  description?: string
  price: number
  category: string
  gender?: string | null
  technique?: string
  imageUrl?: string
}) {
  try {
    await db.product.create({ data })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error al crear producto:', error)
    return { success: false, error: 'Error al crear producto' }
  }
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    description?: string
    price: number
    category: string
    gender?: string | null
    technique?: string
    imageUrl?: string
  }
) {
  try {
    await db.product.update({
      where: { id },
      data,
    })
    revalidatePath('/')
    revalidatePath('/admin')
    revalidatePath(`/product/${id}`)
    return { success: true }
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    return { success: false, error: 'Error al actualizar producto' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.product.delete({
      where: { id },
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    return { success: false, error: 'Error al eliminar producto' }
  }
}

export async function createGalleryImage(data: { imageUrl: string; title?: string }) {
  try {
    await db.galleryImage.create({ data })
    revalidatePath('/')
    revalidatePath('/admin/gallery')
    return { success: true }
  } catch (error) {
    console.error('Error al crear imagen de galería:', error)
    return { success: false, error: 'Error al guardar la imagen' }
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await db.galleryImage.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/gallery')
    return { success: true }
  } catch (error) {
    console.error('Error al eliminar imagen de galería:', error)
    return { success: false, error: 'Error al eliminar la imagen' }
  }
}
