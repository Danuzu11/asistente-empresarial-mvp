"use client"

import { useState } from 'react'
import { CheckCircle, Circle, User, Building2, CreditCard, Bell } from 'lucide-react'

export default function ClientesOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    {
      title: "Información Personal",
      description: "Completa tus datos básicos",
      icon: User,
      completed: true
    },
    {
      title: "Información de Empresa",
      description: "Detalles de tu organización",
      icon: Building2,
      completed: true
    },
    {
      title: "Configuración de Facturación",
      description: "Métodos de pago y facturación",
      icon: CreditCard,
      completed: false
    },
    {
      title: "Preferencias de Notificación",
      description: "Configura cómo recibir notificaciones",
      icon: Bell,
      completed: false
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Proceso de Onboarding 🚀
        </h2>
        <p className="text-gray-400">
          Completa tu configuración inicial para aprovechar al máximo nuestros servicios
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`flex flex-col items-center flex-1 ${
                  index < steps.length - 1 ? 'border-r border-gray-700' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  step.completed 
                    ? 'bg-green-600' 
                    : index === currentStep 
                      ? 'bg-blue-600' 
                      : 'bg-gray-700'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className="w-6 h-6 text-white" />
                  )}
                </div>
                <p className={`text-sm font-medium ${
                  step.completed || index === currentStep ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 text-center px-2">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">
            {steps[currentStep]?.title || "Configuración de Facturación"}
          </h3>
          
          {/* Step 3: Billing Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Método de Pago Preferido
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Transferencia Bancaria</option>
                <option>Tarjeta de Crédito</option>
                <option>Cheque</option>
                <option>Pago Contra Entrega</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Términos de Pago
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>30 días</option>
                <option>15 días</option>
                <option>60 días</option>
                <option>Inmediato</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Moneda de Facturación
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>COP - Peso Colombiano</option>
                <option>USD - Dólar Americano</option>
                <option>EUR - Euro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Límite de Crédito Solicitado
              </label>
              <input
                type="number"
                placeholder="Ej: 10000000"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="autoInvoice"
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="autoInvoice" className="text-sm text-gray-300">
                Activar facturación automática para pedidos recurrentes
              </label>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Anterior
            </button>
            <button 
              onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continuar
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">
              ¿Por qué completar el onboarding?
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Acceso completo a todos nuestros servicios</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Proceso de compra más rápido</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Notificaciones personalizadas</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Límites de crédito establecidos</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Soporte prioritario</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-700">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">
              💡 Consejo
            </h4>
            <p className="text-sm text-blue-200">
              Completa toda la información requerida para obtener los mejores términos de crédito 
              y acceso a descuentos exclusivos por volumen.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-3">
              Progreso General
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Completado</span>
                <span className="text-white">50%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
