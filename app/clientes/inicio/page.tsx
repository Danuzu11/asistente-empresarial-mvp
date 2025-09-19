"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ShoppingBag, 
  Package, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  HeadphonesIcon
} from 'lucide-react'

export default function ClientesInicioPage() {
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
          ¡Bienvenido al Portal de Clientes! 🌟
        </h2>
        <p className="text-gray-400">
          Aquí puedes gestionar tus compras, servicios, citas y mucho más...
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Pedidos Activos</p>
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +1 esta semana
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Productos Favoritos</p>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-sm text-yellow-400 flex items-center mt-1">
                <Star className="w-4 h-4 mr-1" />
                En tu lista
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Próximas Citas</p>
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-sm text-blue-400 flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                Esta semana
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Tickets Soporte</p>
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                Resuelto
              </p>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <HeadphonesIcon className="w-6 h-6 text-green-400" />
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
                  <p className="text-sm font-medium text-white">Pedido realizado</p>
                  <p className="text-xs text-gray-400">Pedido #2024-CLT-001 por $350.000</p>
                </div>
                <span className="text-xs text-gray-500">Hace 2 horas</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Cita confirmada</p>
                  <p className="text-xs text-gray-400">Reunión de consultoría - 15 Sep 10:00 AM</p>
                </div>
                <span className="text-xs text-gray-500">Hace 4 horas</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Factura disponible</p>
                  <p className="text-xs text-gray-400">Factura #FAC-2024-008 lista para descarga</p>
                </div>
                <span className="text-xs text-gray-500">Ayer</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Producto agregado a favoritos</p>
                  <p className="text-xs text-gray-400">Laptop Dell XPS 13 añadida a tu lista</p>
                </div>
                <span className="text-xs text-gray-500">Hace 2 días</span>
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
                onClick={() => router.push('/clientes/catalogo')}
                className="w-full text-left p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Ver Catálogo</p>
                    <p className="text-xs text-gray-400">Explora nuestros productos</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => router.push('/clientes/pedidos')}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Mis Pedidos</p>
                    <p className="text-xs text-gray-400">Seguimiento de órdenes</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => router.push('/clientes/citas')}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Mis Citas</p>
                    <p className="text-xs text-gray-400">Agendar reuniones</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => router.push('/clientes/tickets')}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <HeadphonesIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Soporte</p>
                    <p className="text-xs text-gray-400">Crear ticket de ayuda</p>
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
