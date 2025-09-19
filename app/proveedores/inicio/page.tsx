"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function ProveedoresInicioPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const email = localStorage.getItem('userEmail')
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    setUserEmail(email || '')
  }, [router])

  return (
    <div>
      {/* Header de bienvenida */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          ¡Bienvenido al Portal de Proveedores! 👋
        </h2>
        <p className="text-gray-400">
          Aquí tienes un resumen de tu actividad como proveedor...
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Peticiones Activas</p>
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2 esta semana
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Órdenes de Compra</p>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                6 completadas
              </p>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Cuentas por Cobrar</p>
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-sm text-yellow-400 flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1" />
                3 pendientes
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Documentos</p>
              <p className="text-2xl font-bold text-white">15</p>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                Actualizados
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Actividad reciente</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Nueva petición de oferta</p>
                  <p className="text-xs text-gray-400">PO-2024-006 para equipos de oficina</p>
                </div>
                <span className="text-xs text-gray-500">Hace 2 horas</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Orden de compra aprobada</p>
                  <p className="text-xs text-gray-400">OC-2024-008 por $2.500.000</p>
                </div>
                <span className="text-xs text-gray-500">Hace 4 horas</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Pago recibido</p>
                  <p className="text-xs text-gray-400">Factura FAC-001-2024 pagada</p>
                </div>
                <span className="text-xs text-gray-500">Ayer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Acciones rápidas</h3>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/proveedores/peticiones-oferta')}
                className="w-full text-left p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Peticiones de Oferta</p>
                    <p className="text-xs text-gray-400">Ver peticiones activas</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => router.push('/proveedores/ordenes-compras')}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Órdenes de Compra</p>
                    <p className="text-xs text-gray-400">Gestionar órdenes</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => router.push('/proveedores/cuentas-cobrar')}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Cuentas por Cobrar</p>
                    <p className="text-xs text-gray-400">Ver estados de cuenta</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => router.push('/proveedores/pqrs')}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">PQRS</p>
                    <p className="text-xs text-gray-400">Peticiones y reclamos</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
