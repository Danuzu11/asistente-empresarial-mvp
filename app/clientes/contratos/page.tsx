"use client"

import { useState } from 'react'
import { 
  FileText, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  RefreshCw,
  Users,
  Settings
} from 'lucide-react'

export default function ClientesContratosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [typeFilter, setTypeFilter] = useState('Todos')

  const statuses = ['Todos', 'Activo', 'Por Vencer', 'Vencido', 'Renovado', 'Cancelado']
  const types = ['Todos', 'Servicio', 'Suscripción', 'Mantenimiento', 'Consultoría']

  const contracts = [
    {
      id: "CTR-2024-001",
      title: "Consultoría en Transformación Digital",
      type: "Consultoría",
      status: "Activo",
      startDate: "2024-01-15",
      endDate: "2024-07-15",
      value: 25000000,
      paymentFrequency: "Mensual",
      nextPayment: "2024-10-15",
      progress: 75,
      description: "Análisis completo y estrategia para la digitalización de procesos empresariales",
      responsibleManager: "María González",
      deliverables: [
        { name: "Diagnóstico empresarial", status: "Completado", date: "2024-03-01" },
        { name: "Hoja de ruta tecnológica", status: "Completado", date: "2024-04-15" },
        { name: "Plan de capacitación", status: "En progreso", date: "2024-06-01" },
        { name: "Documentación técnica", status: "Pendiente", date: "2024-07-01" }
      ]
    },
    {
      id: "CTR-2024-002",
      title: "Soporte Técnico 24/7",
      type: "Suscripción",
      status: "Activo",
      startDate: "2024-03-01",
      endDate: "2025-03-01",
      value: 3500000,
      paymentFrequency: "Mensual",
      nextPayment: "2024-10-01",
      progress: 100,
      description: "Soporte técnico especializado disponible las 24 horas del día",
      responsibleManager: "Carlos Ruiz",
      metrics: {
        tickets: 24,
        avgResponseTime: "1.5 horas",
        satisfaction: 4.8,
        uptime: "99.9%"
      }
    },
    {
      id: "CTR-2024-003",
      title: "Mantenimiento de Infraestructura IT",
      type: "Mantenimiento",
      status: "Por Vencer",
      startDate: "2023-10-01",
      endDate: "2024-10-01",
      value: 15000000,
      paymentFrequency: "Anual",
      nextPayment: "2024-10-01",
      progress: 95,
      description: "Mantenimiento preventivo y correctivo de equipos e infraestructura",
      responsibleManager: "Ana López",
      renewalOptions: {
        available: true,
        newValue: 16500000,
        discount: 10
      }
    },
    {
      id: "CTR-2023-008",
      title: "Desarrollo de Software Personalizado",
      type: "Servicio",
      status: "Completado",
      startDate: "2023-06-01",
      endDate: "2024-02-01",
      value: 45000000,
      paymentFrequency: "Por Hitos",
      progress: 100,
      description: "Desarrollo de aplicación web personalizada para gestión interna",
      responsibleManager: "Roberto Silva",
      finalDeliverables: [
        "Aplicación web completa",
        "Código fuente y documentación",
        "Manual de usuario",
        "Capacitación del equipo"
      ]
    },
    {
      id: "CTR-2024-004",
      title: "Capacitación Empresarial en Tecnología",
      type: "Servicio",
      status: "En Progreso",
      startDate: "2024-08-01",
      endDate: "2024-11-01",
      value: 8500000,
      paymentFrequency: "Por Hitos",
      nextPayment: "2024-10-01",
      progress: 40,
      description: "Programa de formación para mejorar las competencias digitales del equipo",
      responsibleManager: "Luisa Martínez",
      participants: 25,
      currentPhase: "Módulo 2: Herramientas Digitales"
    }
  ]

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || contract.status === statusFilter
    const matchesType = typeFilter === 'Todos' || contract.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
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
      case 'Activo':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Por Vencer':
        return { color: 'bg-yellow-900/50 text-yellow-400 border-yellow-700', icon: AlertCircle }
      case 'Vencido':
        return { color: 'bg-red-900/50 text-red-400 border-red-700', icon: AlertCircle }
      case 'En Progreso':
        return { color: 'bg-blue-900/50 text-blue-400 border-blue-700', icon: Clock }
      case 'Completado':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Cancelado':
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: AlertCircle }
      default:
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: FileText }
    }
  }

  const getContractStats = () => {
    const active = contracts.filter(c => c.status === 'Activo').length
    const expiringSoon = contracts.filter(c => c.status === 'Por Vencer').length
    const totalValue = contracts
      .filter(c => c.status === 'Activo' || c.status === 'Por Vencer')
      .reduce((sum, c) => sum + c.value, 0)
    
    return { active, expiringSoon, totalValue, total: contracts.length }
  }

  const stats = getContractStats()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Gestión de Contratos y Suscripciones 📄
        </h2>
        <p className="text-gray-400">
          Administra todos tus contratos de servicios y suscripciones
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
              <p className="text-sm text-gray-400">Contratos Activos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.expiringSoon}</p>
              <p className="text-sm text-gray-400">Por Vencer</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatPrice(stats.totalValue)}</p>
              <p className="text-sm text-gray-400">Valor Total</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Contratos</p>
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
              placeholder="Buscar contratos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
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

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="space-y-6">
        {filteredContracts.map((contract) => {
          const statusInfo = getStatusInfo(contract.status)
          const StatusIcon = statusInfo.icon

          return (
            <div key={contract.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              {/* Contract Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{contract.title}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full border flex items-center space-x-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{contract.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-400 mb-2">
                    <span>ID: {contract.id}</span>
                    <span>Tipo: {contract.type}</span>
                    <span>Gerente: {contract.responsibleManager}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{contract.description}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{formatPrice(contract.value)}</p>
                  <p className="text-sm text-gray-400">{contract.paymentFrequency}</p>
                </div>
              </div>

              {/* Contract Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Fechas</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        Inicio: {new Date(contract.startDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        Fin: {new Date(contract.endDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    {contract.nextPayment && (
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">
                          Próximo pago: {new Date(contract.nextPayment).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Progreso</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Completado</span>
                      <span className="text-white">{contract.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${contract.progress}%` }}
                      ></div>
                    </div>
                    {contract.currentPhase && (
                      <p className="text-sm text-gray-400">Fase actual: {contract.currentPhase}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Métricas</h4>
                  <div className="space-y-1 text-sm">
                    {contract.metrics && (
                      <>
                        <div className="text-gray-300">Tickets: {contract.metrics.tickets}</div>
                        <div className="text-gray-300">Respuesta: {contract.metrics.avgResponseTime}</div>
                        <div className="text-gray-300">Satisfacción: {contract.metrics.satisfaction}/5</div>
                      </>
                    )}
                    {contract.participants && (
                      <div className="text-gray-300">Participantes: {contract.participants}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Renewal Options */}
              {contract.renewalOptions?.available && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 font-medium">Renovación Disponible</p>
                      <p className="text-blue-200 text-sm">
                        Nuevo valor: {formatPrice(contract.renewalOptions.newValue)} 
                        ({contract.renewalOptions.discount}% descuento por renovación temprana)
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Renovar</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Ver Detalles</span>
                </button>
                
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Descargar Contrato</span>
                </button>
                
                {contract.status === 'Activo' && (
                  <button className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Configurar</span>
                  </button>
                )}
                
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Contactar Gerente</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron contratos</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm || statusFilter !== 'Todos' || typeFilter !== 'Todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Aún no tienes contratos registrados'
            }
          </p>
        </div>
      )}
    </div>
  )
}
