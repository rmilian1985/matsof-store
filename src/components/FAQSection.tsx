'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

const faqs = [
  {
    question: '¿Cuánto tiempo demora la producción de un pedido personalizado?',
    answer: 'El tiempo de producción depende del producto y la cantidad. Generalmente, los pedidos de 1 a 10 unidades toman de 2 a 3 días hábiles. Para pedidos al por mayor (eventos, cumpleaños), el tiempo estimado es de 5 a 7 días hábiles tras confirmar el diseño.'
  },
  {
    question: '¿Hacen envíos a todo el Perú?',
    answer: 'Sí, realizamos envíos a todo Lima mediante motorizado (costo varía según distrito) y a todo el Perú a través de agencias como Shalom o Marvisur (pago en destino).'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencias bancarias (BCP, BBVA, Interbank), Yape, Plin. Para iniciar el trabajo solicitamos un adelanto del 50%, y el resto se cancela antes de la entrega o envío.'
  },
  {
    question: '¿Ustedes me pueden ayudar con el diseño?',
    answer: '¡Claro que sí! Contamos con un equipo de diseñadores que puede ayudarte a plasmar tu idea. Si ya tienes el diseño, puedes enviarlo en formato PNG de alta calidad o vector (PDF, AI).'
  },
  {
    question: '¿Hay pedido mínimo para productos personalizados?',
    answer: 'Para la mayoría de nuestros productos como tazas, polos y tomatodos no hay pedido mínimo (¡puedes pedir desde 1 unidad!). Solo algunos productos específicos para empresas pueden tener un mínimo.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white border-t border-zinc-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-zinc-600">
            Todo lo que necesitas saber antes de realizar tu pedido.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-zinc-200 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-secondary/30' : 'hover:border-zinc-300'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-zinc-50 transition-colors text-left"
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-secondary' : 'text-zinc-800'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'transform rotate-180 text-secondary' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-zinc-600 leading-relaxed bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
          <p className="text-zinc-600 mb-4 font-medium">¿Tienes alguna otra duda?</p>
          <a 
            href="https://wa.me/51944761889?text=Hola%20MATSOF,%20tengo%20una%20consulta" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
