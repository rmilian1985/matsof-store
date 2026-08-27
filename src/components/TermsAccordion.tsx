'use client'

import { useState } from 'react'

export function TermsAccordion() {
  const terms = [
    {
      title: 'Condiciones de Entrega',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-green-800">
          <li>Recojo en nuestras oficinas, previa coordinación.</li>
          <li>Entrega en Lima, único punto por pedido.</li>
          <li>Los precios no incluyen costo por traslado.</li>
        </ul>
      )
    },
    {
      title: 'Condiciones de Compra',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-green-800">
          <li>En caso de no disponibilidad de algún producto ofrecido, se realizará el cambio de otro de igual valor perteneciente a una marca distinta a la ofertada originalmente.</li>
          <li>Si deseas incluir tarjetas personales para acompañar las canastas, deberán ser informadas como mínimo 72 horas previo a la fecha de entrega.</li>
          <li>Los precios y descripciones de los productos se actualizarán y pueden variar según la disponibilidad real en almacén del proveedor.</li>
          <li>Es responsabilidad del cliente coordinar las facilidades necesarias para el ingreso del personal de entrega, especialmente en pedidos de mayor volumen con la finalidad de garantizar una distribución segura y oportuna.</li>
        </ul>
      )
    },
    {
      title: 'Condiciones de Pago',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-green-800">
          <li>Para confirmar su pedido, se debe realizar el 50% del valor total.</li>
          <li>Aceptamos Transferencia o Depósito bancario.</li>
          <li>Sustento de comprobantes de pago, factura o boleta, según corresponda.</li>
        </ul>
      )
    },
    {
      title: 'Garantía del Producto',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-green-800">
          <li>Todos los productos y envases cuentan con garantía ante cualquier defecto de fabricación.</li>
          <li>En caso de falla por deterioro o inconveniente durante el envío, las incidencias serán atendidas dentro de las 24 horas siguientes a la recepción del pedido.</li>
        </ul>
      )
    },
    {
      title: 'Recomendaciones y Contacto',
      content: (
        <div className="space-y-4 text-green-800">
          <p>
            <strong>Recomendación:</strong> Realizar la reserva del pedido con anticipación para coordinar la fecha de entrega con el debido tiempo y evitar retrasos a última hora.
          </p>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100 mt-4">
            <h4 className="text-red-600 font-semibold mb-2">Contacto de Pedidos</h4>
            <p>📱 <strong>Teléfono/WhatsApp:</strong> 981 936 418 – 986 126 212</p>
            <p>📧 <strong>Correo:</strong> amilian@multiservismyh.com</p>
          </div>
        </div>
      )
    }
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="w-full max-w-4xl mx-auto my-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold tracking-tight text-green-900 mb-2">Términos y Condiciones</h2>
        <p className="text-green-700">Información importante sobre pedidos y entregas</p>
      </div>

      <div className="space-y-4">
        {terms.map((term, index) => {
          const isOpen = openIndex === index
          return (
            <div 
              key={index} 
              className={`border border-red-100 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                isOpen ? 'bg-red-50/50' : 'bg-white/80 hover:bg-white'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-green-900">{term.title}</span>
                <span className={`text-red-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 border-t border-red-100/50 text-green-800">
                  {term.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
