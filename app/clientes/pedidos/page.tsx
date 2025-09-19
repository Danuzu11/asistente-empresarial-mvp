"use client"

import { useState } from 'react'
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  MessageCircle,
  MoreVertical,
  RefreshCw,
  Calendar
} from 'lucide-react'

export default function ClientesPedidosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('Últimos 3 meses')
  
  const statuses = ['Todos', 'Pendiente', 'En Proceso', 'Enviado', 'Entregado', 'Cancelado']
  const dateOptions = ['Última semana', 'Último mes', 'Últimos 3 meses', 'Último año', 'Todo el tiempo']

  const orders = [
    {
      id: "ORD-2024-008",
      date: "2024-09-10",
      status: "Entregado",
      total: 11009000,
      items: [
        { name: "Laptop Dell XPS 13", quantity: 1, price: 4500000 },
        { name: "Monitor LG 27'' 4K", quantity: 2, price: 2400000 },
        { name: "Silla Ergonómica Premium", quantity: 4, price: 3200000 }
      ],
      tracking: "TRK-2024-8801",
      deliveryDate: "2024-09-10",
      estimatedDelivery: "2024-09-12"
    },
    {
      id: "ORD-2024-007",
      date: "2024-09-05",
      status: "Enviado",
      total: 2850000,
      items: [
        { name: "Impresora Multifuncional HP", quantity: 1, price: 650000 },
        { name: "Tablet Samsung Galaxy Tab S8", quantity: 1, price: 2800000 }
      ],
      tracking: "TRK-2024-8802",
      estimatedDelivery: "2024-09-15"
    },
    {
      id: "ORD-2024-006",
      date: "2024-09-01",
      status: "En Proceso",
      total: 4700000,
      items: [
        { name: "Proyector 4K Epson", quantity: 1, price: 3200000 },
        { name: "Mesa de Reuniones", quantity: 1, price: 1500000 }
      ],
      estimatedDelivery: "2024-09-18"
    },
    {
      id: "ORD-2024-005",
      date: "2024-08-28",
      status: "Entregado",
      total: 1800000,
      items: [
        { name: "Sistema de Audio Bose", quantity: 1, price: 1800000 }
      ],
      tracking: "TRK-2024-8803",
      deliveryDate: "2024-09-02"
    },
    {
      id: "ORD-2024-004",
      date: "2024-08-25",
      status: "Cancelado",
      total: 3600000,
      items: [
        { name: "Monitor LG 27'' 4K", quantity: 3, price: 3600000 }
      ],
      cancelReason: "Solicitado por el cliente"
    },
    {
      id: "ORD-2024-003",
      date: "2024-08-20",
      status: "Entregado",
      total: 6400000,
      items: [
        { name: "Silla Ergonómica Premium", quantity: 8, price: 6400000 }
      ],
      tracking: "TRK-2024-8804",
      deliveryDate: "2024-08-25"
    }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Pendiente':
        return { color: 'bg-yellow-900/50 text-yellow-400 border-yellow-700', icon: Clock }
      case 'En Proceso':
        return { color: 'bg-blue-900/50 text-blue-400 border-blue-700', icon: RefreshCw }
      case 'Enviado':
        return { color: 'bg-purple-900/50 text-purple-400 border-purple-700', icon: Truck }
      case 'Entregado':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Cancelado':
        return { color: 'bg-red-900/50 text-red-400 border-red-700', icon: AlertCircle }
      default:
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: Package }
    }
  }

  const getOrderStats = () => {
    const total = orders.length
    const entregados = orders.filter(o => o.status === 'Entregado').length
    const enProceso = orders.filter(o => o.status === 'En Proceso' || o.status === 'Enviado').length
    const totalGastado = orders.filter(o => o.status === 'Entregado').reduce((sum, o) => sum + o.total, 0)
    
    return { total, entregados, enProceso, totalGastado }
  }

  const stats = getOrderStats()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Historia y Seguimiento de Pedidos 📦
        </h2>
        <p className="text-gray-400">
          Consulta el estado y detalle de todos tus pedidos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Pedidos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.entregados}</p>
              <p className="text-sm text-gray-400">Entregados</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.enProceso}</p>
              <p className="text-sm text-gray-400">En Proceso</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <span className="text-orange-400 text-lg font-bold">$</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatPrice(stats.totalGastado)}</p>
              <p className="text-sm text-gray-400">Total Gastado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusInfo = getStatusInfo(order.status)
          const StatusIcon = statusInfo.icon

          return (
            <div key={order.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                    <p className="text-sm text-gray-400">Pedido el {new Date(order.date).toLocaleDateString('es-ES')}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full border flex items-center space-x-1 ${statusInfo.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span>{order.status}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{formatPrice(order.total)}</p>
                    <p className="text-sm text-gray-400">{order.items.length} producto{order.items.length > 1 ? 's' : ''}</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className="text-2xl">📦</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Cantidad: {item.quantity} • {formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {order.tracking && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-400">Tracking:</span>
                    <span className="text-white font-medium">{order.tracking}</span>
                  </div>
                )}
                
                {order.deliveryDate && (
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400">Entregado:</span>
                    <span className="text-white">{new Date(order.deliveryDate).toLocaleDateString('es-ES')}</span>
                  </div>
                )}
                
                {order.estimatedDelivery && !order.deliveryDate && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-400">Entrega estimada:</span>
                    <span className="text-white">{new Date(order.estimatedDelivery).toLocaleDateString('es-ES')}</span>
                  </div>
                )}

                {order.cancelReason && (
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-gray-400">Motivo:</span>
                    <span className="text-white">{order.cancelReason}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Ver Detalles</span>
                </button>
                
                {order.status === 'Entregado' && (
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Descargar Factura</span>
                  </button>
                )}
                
                {(order.status === 'En Proceso' || order.status === 'Enviado') && (
                  <button className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Rastrear Pedido</span>
                  </button>
                )}
                
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Soporte</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron pedidos</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm || statusFilter !== 'Todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Aún no has realizado ningún pedido'
            }
          </p>
          <button
            onClick={() => window.location.href = '/clientes/catalogo'}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Explorar Catálogo
          </button>
        </div>
      )}
    </div>
  )
}
