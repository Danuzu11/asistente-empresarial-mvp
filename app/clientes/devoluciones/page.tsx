"use client"

import { useState } from 'react'
import { 
  RotateCcw, 
  Plus, 
  Search, 
  Filter,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Eye,
  MessageSquare
} from 'lucide-react'

export default function ClientesDevolucionesPage() {
  const [showNewReturn, setShowNewReturn] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  
  const statuses = ['Todos', 'Solicitada', 'En Revisión', 'Aprobada', 'En Proceso', 'Completada', 'Rechazada']
  
  const returns = [
    {
      id: "RMA-2024-003",
      orderNumber: "ORD-2024-007",
      date: "2024-09-12",
      status: "En Revisión",
      reason: "Producto defectuoso",
      item: "Tablet Samsung Galaxy Tab S8",
      quantity: 1,
      refundAmount: 2800000,
      description: "La tablet presenta problemas en la pantalla táctil"
    },
    {
      id: "RMA-2024-002", 
      orderNumber: "ORD-2024-005",
      date: "2024-09-08",
      status: "Completada",
      reason: "No cumple expectativas",
      item: "Sistema de Audio Bose",
      quantity: 1,
      refundAmount: 1800000,
      refundDate: "2024-09-10",
      description: "El producto no tiene la calidad de audio esperada"
    },
    {
      id: "RMA-2024-001",
      orderNumber: "ORD-2024-003",
      date: "2024-08-30",
      status: "Rechazada",
      reason: "Producto dañado",
      item: "Monitor LG 27'' 4K",
      quantity: 1,
      rejectionReason: "Producto fuera del período de garantía",
      description: "Monitor con píxeles muertos"
    }
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Solicitada':
        return { color: 'bg-blue-900/50 text-blue-400 border-blue-700', icon: FileText }
      case 'En Revisión':
        return { color: 'bg-yellow-900/50 text-yellow-400 border-yellow-700', icon: Clock }
      case 'Aprobada':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'En Proceso':
        return { color: 'bg-purple-900/50 text-purple-400 border-purple-700', icon: RotateCcw }
      case 'Completada':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Rechazada':
        return { color: 'bg-red-900/50 text-red-400 border-red-700', icon: AlertCircle }
      default:
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: FileText }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const filteredReturns = returns.filter(ret => {
    const matchesSearch = ret.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ret.item.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || ret.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Gestión de Devoluciones (RMA) 🔄
          </h2>
          <p className="text-gray-400">
            Gestiona tus solicitudes de devolución y garantías
          </p>
        </div>
        <button
          onClick={() => setShowNewReturn(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Devolución</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{returns.length}</p>
              <p className="text-sm text-gray-400">Total RMAs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-sm text-gray-400">En Proceso</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-sm text-gray-400">Completadas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 text-lg font-bold">$</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatPrice(1800000)}</p>
              <p className="text-sm text-gray-400">Reembolsado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar devoluciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
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
        </div>
      </div>

      {/* Returns List */}
      <div className="space-y-4">
        {filteredReturns.map((returnItem) => {
          const statusInfo = getStatusInfo(returnItem.status)
          const StatusIcon = statusInfo.icon

          return (
            <div key={returnItem.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{returnItem.id}</h3>
                    <p className="text-sm text-gray-400">Pedido: {returnItem.orderNumber}</p>
                    <p className="text-sm text-gray-500">Solicitado el {new Date(returnItem.date).toLocaleDateString('es-ES')}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full border flex items-center space-x-1 ${statusInfo.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span>{returnItem.status}</span>
                  </span>
                </div>
                
                <div className="text-right">
                  {returnItem.refundAmount ? (
                    <>
                      <p className="text-lg font-bold text-white">{formatPrice(returnItem.refundAmount)}</p>
                      <p className="text-sm text-gray-400">Valor reembolso</p>
                    </>
                  ) : (
                    <p className="text-sm text-red-400">No aplica reembolso</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Detalles del Producto</h4>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-white font-medium">{returnItem.item}</p>
                    <p className="text-sm text-gray-400">Cantidad: {returnItem.quantity}</p>
                    <p className="text-sm text-gray-400">Motivo: {returnItem.reason}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Descripción</h4>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">{returnItem.description}</p>
                  </div>
                </div>
              </div>

              {returnItem.refundDate && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✅ Reembolso procesado el {new Date(returnItem.refundDate).toLocaleDateString('es-ES')}
                  </p>
                </div>
              )}

              {returnItem.rejectionReason && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <p className="text-red-400 text-sm">
                    ❌ Rechazada: {returnItem.rejectionReason}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Ver Detalles</span>
                </button>
                
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar Soporte</span>
                </button>
                
                {returnItem.status === 'En Revisión' && (
                  <button className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Subir Documentos</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* New Return Modal */}
      {showNewReturn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Solicitar Nueva Devolución</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Número de Pedido</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Selecciona un pedido</option>
                  <option value="ORD-2024-008">ORD-2024-008 - Laptop Dell XPS 13</option>
                  <option value="ORD-2024-007">ORD-2024-007 - Monitor LG 27'' 4K</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Motivo de Devolución</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Selecciona un motivo</option>
                  <option value="defective">Producto defectuoso</option>
                  <option value="damaged">Producto dañado</option>
                  <option value="wrong-item">Producto incorrecto</option>
                  <option value="not-as-described">No como se describe</option>
                  <option value="not-needed">Ya no lo necesito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción Detallada</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe en detalle el problema con el producto..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Adjuntar Imágenes (Opcional)</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Arrastra archivos aquí o haz clic para seleccionar</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewReturn(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Enviar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredReturns.length === 0 && (
        <div className="text-center py-16">
          <RotateCcw className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No hay devoluciones</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm || statusFilter !== 'Todos'
              ? 'No se encontraron devoluciones con los filtros aplicados'
              : 'Aún no has solicitado ninguna devolución'
            }
          </p>
        </div>
      )}
    </div>
  )
}
