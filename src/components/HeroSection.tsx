'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const slides = [
  {
    image: '/hero_image.jpg',
    title: 'Expertos en Personalización',
    subtitle: 'Creamos productos únicos con la más alta calidad y dedicación.'
  },
  {
    image: '/hero_polos.jpg',
    title: 'Textiles Personalizados',
    subtitle: 'Polos y Poleras con acabados perfectos en DTF y Vinil Textil.'
  },
  {
    image: '/hero_mugs.jpg',
    title: 'Tazas y Termos Únicos',
    subtitle: 'Sublimación de alta calidad que nunca pierde su color vibrante.'
  },
  {
    image: '/hero_caps.jpg',
    title: 'Merchandising Premium',
    subtitle: 'Gorras, pines y llaveros para potenciar tu marca o evento.'
  }
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image 
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-4 md:px-8 max-w-4xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold mb-6 border border-cyan-500/30">
          Personalización de Alta Calidad
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {slides[current].title}
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md">
          {slides[current].subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="#productos" 
            className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/40 text-lg"
          >
            Ver Catálogo
          </Link>
          <a 
            href="https://wa.me/51944761889?text=Hola%20MATSOF,%20vengo%20de%20su%20p%C3%A1gina%20web%20y%20me%20gustar%C3%ADa%20cotizar%20unos%20productos%20personalizados" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-md border border-white/20 text-lg"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-cyan-500 w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
