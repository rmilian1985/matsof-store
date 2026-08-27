import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Borrando datos antiguos...')
  await prisma.product.deleteMany()

  console.log('Creando nuevo catálogo MATSOF...')

  const productos = [
    {
      name: 'Polo Personalizado - Algodón',
      description: 'Polo 100% algodón jersey, personalizado con tu diseño.',
      price: 35.00,
      category: 'Ropa',
      technique: 'DTF',
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Taza Blanca 11oz',
      description: 'Taza de cerámica blanca brillante, diseño a todo color.',
      price: 15.00,
      category: 'Tazas',
      technique: 'Sublimación',
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Gorra Trucker Personalizada',
      description: 'Gorra con malla posterior, estampada en la parte frontal.',
      price: 20.00,
      category: 'Accesorios',
      technique: 'Vinil Textil',
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Termo Acero Inoxidable',
      description: 'Termo de 500ml que mantiene bebidas frías o calientes.',
      price: 45.00,
      category: 'Termos',
      technique: 'Sublimación',
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Cuadro Decorativo 20x30cm',
      description: 'Cuadro en MDF con impresión brillante de alta calidad.',
      price: 30.00,
      category: 'Hogar',
      technique: 'Sublimación',
      imageUrl: 'https://images.unsplash.com/photo-1579762715111-a6f1665e8615?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Polera con Capucha',
      description: 'Polera gruesa y abrigadora, ideal para invierno.',
      price: 65.00,
      category: 'Ropa',
      technique: 'DTF',
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Llavero Metálico',
      description: 'Llavero resistente con logo o foto por ambas caras.',
      price: 10.00,
      category: 'Accesorios',
      technique: 'Sublimación',
      imageUrl: 'https://images.unsplash.com/photo-1616782298642-0f15c724775d?q=80&w=400&auto=format&fit=crop'
    }
  ]

  for (const p of productos) {
    await prisma.product.create({
      data: p
    })
  }

  console.log('¡Datos reales insertados con éxito!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
