"use client"

import { useState } from 'react'
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  Edit3,
  CheckCircle,
  AlertCircle,
  CreditCard,
  FileText
} from 'lucide-react'

export default function ClientesActualizacionDatosPage() {
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = (section: string) => {
    setIsEditing(null)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Actualización de Datos (Autogestión) ⚙️
        </h2>
        <p className="text-gray-400">
          Mantén tu información actualizada para una mejor experiencia
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-300">¡Datos actualizados correctamente!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información Personal */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Información Personal</h3>
              </div>
              <button
                onClick={() => setIsEditing(isEditing === 'personal' ? null : 'personal')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                {isEditing === 'personal' ? (
                  <input
                    type="text"
                    defaultValue="Carlos Andrés Rodríguez"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">Carlos Andrés Rodríguez</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Documento de Identidad</label>
                {isEditing === 'personal' ? (
                  <input
                    type="text"
                    defaultValue="CC 1234567890"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">CC 1234567890</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Principal</label>
                {isEditing === 'personal' ? (
                  <input
                    type="email"
                    defaultValue="carlos.rodriguez@empresa.com"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">carlos.rodriguez@empresa.com</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                {isEditing === 'personal' ? (
                  <input
                    type="tel"
                    defaultValue="+57 301 234 5678"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">+57 301 234 5678</p>
                )}
              </div>
            </div>

            {isEditing === 'personal' && (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleSave('personal')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Información de Empresa */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Información de Empresa</h3>
              </div>
              <button
                onClick={() => setIsEditing(isEditing === 'empresa' ? null : 'empresa')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Razón Social</label>
                {isEditing === 'empresa' ? (
                  <input
                    type="text"
                    defaultValue="Tecnología y Soluciones Avanzadas S.A.S."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">Tecnología y Soluciones Avanzadas S.A.S.</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">NIT</label>
                {isEditing === 'empresa' ? (
                  <input
                    type="text"
                    defaultValue="900123456-7"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">900123456-7</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sector Económico</label>
                {isEditing === 'empresa' ? (
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Tecnología</option>
                    <option>Manufactura</option>
                    <option>Servicios</option>
                    <option>Comercio</option>
                  </select>
                ) : (
                  <p className="text-white">Tecnología</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
                {isEditing === 'empresa' ? (
                  <input
                    type="text"
                    defaultValue="Carrera 15 #123-45, Oficina 801, Bogotá, Colombia"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">Carrera 15 #123-45, Oficina 801, Bogotá, Colombia</p>
                )}
              </div>
            </div>

            {isEditing === 'empresa' && (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleSave('empresa')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Configuración de Facturación */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Configuración de Facturación</h3>
              </div>
              <button
                onClick={() => setIsEditing(isEditing === 'facturacion' ? null : 'facturacion')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Método de Pago Preferido</label>
                {isEditing === 'facturacion' ? (
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Transferencia Bancaria</option>
                    <option>Tarjeta de Crédito</option>
                    <option>Cheque</option>
                  </select>
                ) : (
                  <p className="text-white">Transferencia Bancaria</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Términos de Pago</label>
                {isEditing === 'facturacion' ? (
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>30 días</option>
                    <option>15 días</option>
                    <option>60 días</option>
                    <option>Inmediato</option>
                  </select>
                ) : (
                  <p className="text-white">30 días</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Límite de Crédito</label>
                <p className="text-white">$15,000,000 COP</p>
                <p className="text-xs text-gray-400">Disponible: $12,500,000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado de Cuenta</label>
                <p className="text-green-400 flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Al día</span>
                </p>
              </div>
            </div>

            {isEditing === 'facturacion' && (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleSave('facturacion')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Status */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Estado del Perfil</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Información Personal</span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Datos de Empresa</span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Configuración Billing</span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Documentos</span>
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Completado</span>
                <span className="text-white">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white">Subir Documentos</span>
                </div>
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white">Cambiar Email</span>
                </div>
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white">Verificar Teléfono</span>
                </div>
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-700">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">
              💡 ¿Necesitas ayuda?
            </h4>
            <p className="text-sm text-blue-200 mb-4">
              Si tienes problemas actualizando tu información, nuestro equipo está listo para ayudarte.
            </p>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
