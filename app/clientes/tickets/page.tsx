"use client"

import { useState } from 'react'
import { 
  HeadphonesIcon, 
  Plus, 
  Search, 
  Filter,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Paperclip,
  Send,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
  MoreVertical
} from 'lucide-react'

export default function ClientesTicketsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [priorityFilter, setPriorityFilter] = useState('Todos')
  const [categoryFilter, setCategoryFilter] = useState('Todos')
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)

  const statuses = ['Todos', 'Abierto', 'En Progreso', 'Esperando Cliente', 'Resuelto', 'Cerrado']
  const priorities = ['Todos', 'Baja', 'Normal', 'Alta', 'Crítica']
  const categories = ['Todos', 'Técnico', 'Cuenta', 'Facturación', 'Producto', 'General']

  const tickets = [
    {
      id: "TCK-2024-015",
      title: "Error de conexión al sistema de respaldos",
      category: "Técnico",
      status: "En Progreso",
      priority: "Alta",
      description: "El sistema de respaldos automáticos no está funcionando correctamente desde ayer",
      createdDate: new Date(2024, 8, 14, 9, 30),
      updatedDate: new Date(2024, 8, 15, 14, 20),
      assignee: "Ana López",
      assigneeAvatar: "AL",
      customer: "Carlos Rodríguez",
      responses: 4,
      attachments: 2,
      tags: ["backup", "sistema", "urgente"],
      estimatedResolution: new Date(2024, 8, 16, 17, 0),
      conversation: [
        {
          id: 1,
          author: "Carlos Rodríguez",
          isCustomer: true,
          message: "Hola, desde ayer no funcionan los respaldos automáticos. Los archivos no se están sincronizando.",
          timestamp: new Date(2024, 8, 14, 9, 30),
          attachments: ["error_log.txt", "screenshot.png"]
        },
        {
          id: 2,
          author: "Ana López",
          isCustomer: false,
          message: "Hola Carlos, gracias por reportar este problema. Ya estoy revisando los logs del sistema. ¿Podrías confirmarme desde cuándo exactamente dejó de funcionar?",
          timestamp: new Date(2024, 8, 14, 11, 45)
        },
        {
          id: 3,
          author: "Carlos Rodríguez",
          isCustomer: true,
          message: "Creo que fue desde el martes en la tarde, después de las 15:00. Los archivos de esa hora no aparecen en el respaldo.",
          timestamp: new Date(2024, 8, 14, 16, 20)
        },
        {
          id: 4,
          author: "Ana López",
          isCustomer: false,
          message: "Perfecto, he identificado el problema. Hubo un error en la configuración después de la actualización del sistema. Estoy trabajando en la solución y debería estar listo mañana por la tarde.",
          timestamp: new Date(2024, 8, 15, 14, 20)
        }
      ]
    },
    {
      id: "TCK-2024-014",
      title: "Consulta sobre facturación de servicios adicionales",
      category: "Facturación",
      status: "Esperando Cliente",
      priority: "Normal",
      description: "Necesito aclaración sobre los costos de servicios adicionales en mi factura",
      createdDate: new Date(2024, 8, 12, 14, 15),
      updatedDate: new Date(2024, 8, 13, 10, 30),
      assignee: "María González",
      assigneeAvatar: "MG",
      customer: "Carlos Rodríguez",
      responses: 2,
      attachments: 1,
      tags: ["facturación", "costos"],
      conversation: [
        {
          id: 1,
          author: "Carlos Rodríguez",
          isCustomer: true,
          message: "Hola, en mi última factura aparecen servicios adicionales que no entiendo. ¿Podrían explicarme de qué se trata?",
          timestamp: new Date(2024, 8, 12, 14, 15),
          attachments: ["factura_septiembre.pdf"]
        },
        {
          id: 2,
          author: "María González",
          isCustomer: false,
          message: "Hola Carlos, he revisado tu factura. Los servicios adicionales corresponden a 3 horas de consultoría técnica que solicitaste el 5 de septiembre. ¿Podrías confirmar si recuerdas esta consulta?",
          timestamp: new Date(2024, 8, 13, 10, 30)
        }
      ]
    },
    {
      id: "TCK-2024-013",
      title: "Solicitud de capacitación adicional",
      category: "Producto",
      status: "Resuelto",
      priority: "Baja",
      description: "Solicitar capacitación adicional para el nuevo módulo de reportes",
      createdDate: new Date(2024, 8, 8, 11, 0),
      updatedDate: new Date(2024, 8, 11, 16, 45),
      resolvedDate: new Date(2024, 8, 11, 16, 45),
      assignee: "Luisa Martínez",
      assigneeAvatar: "LM",
      customer: "Carlos Rodríguez",
      responses: 3,
      attachments: 0,
      tags: ["capacitación", "reportes"],
      rating: 5,
      feedback: "Excelente servicio, la capacitación fue muy completa"
    },
    {
      id: "TCK-2024-012",
      title: "Error en la generación de reportes mensuales",
      category: "Técnico",
      status: "Cerrado",
      priority: "Alta",
      description: "Los reportes mensuales no se generan con los datos correctos",
      createdDate: new Date(2024, 8, 5, 8, 30),
      updatedDate: new Date(2024, 8, 7, 15, 20),
      resolvedDate: new Date(2024, 8, 6, 18, 30),
      closedDate: new Date(2024, 8, 7, 15, 20),
      assignee: "Roberto Silva",
      assigneeAvatar: "RS",
      customer: "Carlos Rodríguez",
      responses: 5,
      attachments: 3,
      tags: ["reportes", "bug", "crítico"],
      resolution: "Se corrigió el error en la consulta de base de datos y se reprocessaron los reportes afectados",
      rating: 4
    },
    {
      id: "TCK-2024-011",
      title: "Actualización de información de contacto",
      category: "Cuenta",
      status: "Abierto",
      priority: "Baja",
      description: "Necesito actualizar mi información de contacto en el sistema",
      createdDate: new Date(2024, 8, 15, 16, 45),
      updatedDate: new Date(2024, 8, 15, 16, 45),
      assignee: "Diego Herrera",
      assigneeAvatar: "DH",
      customer: "Carlos Rodríguez",
      responses: 0,
      attachments: 0,
      tags: ["perfil", "contacto"]
    }
  ]

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'Todos' || ticket.priority === priorityFilter
    const matchesCategory = categoryFilter === 'Todos' || ticket.category === categoryFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Abierto':
        return { color: 'bg-blue-900/50 text-blue-400 border-blue-700', icon: MessageSquare }
      case 'En Progreso':
        return { color: 'bg-yellow-900/50 text-yellow-400 border-yellow-700', icon: Clock }
      case 'Esperando Cliente':
        return { color: 'bg-purple-900/50 text-purple-400 border-purple-700', icon: User }
      case 'Resuelto':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Cerrado':
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: CheckCircle }
      default:
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: HeadphonesIcon }
    }
  }

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'Crítica':
        return { color: 'text-red-400', icon: ArrowUp }
      case 'Alta':
        return { color: 'text-orange-400', icon: ArrowUp }
      case 'Normal':
        return { color: 'text-yellow-400', icon: Minus }
      case 'Baja':
        return { color: 'text-green-400', icon: ArrowDown }
      default:
        return { color: 'text-gray-400', icon: Minus }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Técnico': return 'bg-red-600'
      case 'Cuenta': return 'bg-blue-600'
      case 'Facturación': return 'bg-green-600'
      case 'Producto': return 'bg-purple-600'
      case 'General': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  const getTicketStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'Abierto').length,
      inProgress: tickets.filter(t => t.status === 'En Progreso').length,
      resolved: tickets.filter(t => t.status === 'Resuelto' || t.status === 'Cerrado').length
    }
  }

  const stats = getTicketStats()

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Sistema de Tickets de Soporte 🎧
          </h2>
          <p className="text-gray-400">
            Gestiona tus solicitudes de soporte y seguimiento
          </p>
        </div>
        <button
          onClick={() => setShowNewTicket(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Ticket</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <HeadphonesIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Tickets</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.open}</p>
              <p className="text-sm text-gray-400">Abiertos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
              <p className="text-sm text-gray-400">En Progreso</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.resolved}</p>
              <p className="text-sm text-gray-400">Resueltos</p>
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
              placeholder="Buscar tickets..."
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
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => {
          const statusInfo = getStatusInfo(ticket.status)
          const priorityInfo = getPriorityInfo(ticket.priority)
          const StatusIcon = statusInfo.icon
          const PriorityIcon = priorityInfo.icon

          return (
            <div key={ticket.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
                    <span className="text-xs text-gray-400">{ticket.id}</span>
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${getCategoryColor(ticket.category)}`}>
                      {ticket.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{ticket.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>Creado: {ticket.createdDate.toLocaleDateString('es-ES')}</span>
                    <span>Actualizado: {ticket.updatedDate.toLocaleDateString('es-ES')}</span>
                    {ticket.resolvedDate && (
                      <span>Resuelto: {ticket.resolvedDate.toLocaleDateString('es-ES')}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className={`px-3 py-1 text-sm rounded-full border flex items-center space-x-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{ticket.status}</span>
                    </span>
                  </div>
                  
                  <div className={`flex items-center space-x-1 ${priorityInfo.color}`}>
                    <PriorityIcon className="w-4 h-4" />
                    <span className="text-xs">{ticket.priority}</span>
                  </div>
                  
                  <button className="p-1 text-gray-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Asignado a</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {ticket.assigneeAvatar}
                    </div>
                    <span className="text-white text-sm">{ticket.assignee}</span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Actividad</p>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{ticket.responses}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{ticket.attachments}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {ticket.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                    {ticket.tags.length > 2 && (
                      <span className="text-xs text-gray-400">+{ticket.tags.length - 2}</span>
                    )}
                  </div>
                </div>

                <div>
                  {ticket.estimatedResolution && (
                    <>
                      <p className="text-gray-400 text-sm mb-1">Resolución estimada</p>
                      <p className="text-yellow-400 text-sm">
                        {ticket.estimatedResolution.toLocaleDateString('es-ES')}
                      </p>
                    </>
                  )}
                  {ticket.rating && (
                    <>
                      <p className="text-gray-400 text-sm mb-1">Calificación</p>
                      <div className="flex items-center">
                        <span className="text-yellow-400">{'★'.repeat(ticket.rating)}</span>
                        <span className="text-gray-400 text-xs ml-1">({ticket.rating}/5)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {ticket.resolution && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-green-300 font-medium text-sm mb-1">Resolución:</p>
                  <p className="text-green-200 text-sm">{ticket.resolution}</p>
                </div>
              )}

              {ticket.feedback && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <p className="text-blue-300 font-medium text-sm mb-1">Feedback del cliente:</p>
                  <p className="text-blue-200 text-sm">{ticket.feedback}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedTicket(parseInt(ticket.id.split('-')[2]) === selectedTicket ? null : parseInt(ticket.id.split('-')[2]))}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Conversación</span>
                </button>
                
                {ticket.status !== 'Cerrado' && ticket.status !== 'Resuelto' && (
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Responder</span>
                  </button>
                )}
              </div>

              {/* Conversation View */}
              {selectedTicket === parseInt(ticket.id.split('-')[2]) && ticket.conversation && (
                <div className="mt-6 border-t border-gray-600 pt-6">
                  <h4 className="text-white font-medium mb-4">Conversación</h4>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {ticket.conversation.map((message) => (
                      <div key={message.id} className={`flex ${message.isCustomer ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-2xl p-3 rounded-lg ${
                          message.isCustomer ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{message.author}</span>
                            <span className="text-xs opacity-75">
                              {message.timestamp.toLocaleDateString('es-ES')} {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                          {message.attachments && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {message.attachments.map((file, index) => (
                                <span key={index} className="px-2 py-1 bg-black/20 rounded text-xs">
                                  📎 {file}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {ticket.status !== 'Cerrado' && (
                    <div className="mt-4 flex space-x-3">
                      <input
                        type="text"
                        placeholder="Escribe tu respuesta..."
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Enviar</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Crear Nuevo Ticket</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Título del problema</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe brevemente el problema"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {priorities.slice(1).map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción detallada</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explica el problema en detalle, incluyendo pasos para reproducirlo si aplica"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Archivos adjuntos</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Arrastra archivos aquí o haz clic para seleccionar</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewTicket(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Crear Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="text-center py-16">
          <HeadphonesIcon className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron tickets</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm || statusFilter !== 'Todos' || priorityFilter !== 'Todos' || categoryFilter !== 'Todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Aún no has creado ningún ticket de soporte'
            }
          </p>
          <button
            onClick={() => setShowNewTicket(true)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Crear Primer Ticket
          </button>
        </div>
      )}
    </div>
  )
}
