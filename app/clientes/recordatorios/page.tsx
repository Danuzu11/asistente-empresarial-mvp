"use client"

import { useState } from 'react'
import { 
  Bell, 
  Plus, 
  Search, 
  Filter,
  Clock,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Settings,
  Edit3,
  Trash2,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function ClientesRecordatoriosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [showNewReminder, setShowNewReminder] = useState(false)

  const types = ['Todos', 'Cita', 'Pago', 'Reunión', 'Entrega', 'Renovación', 'Seguimiento']
  const statuses = ['Todos', 'Activo', 'Completado', 'Pausado', 'Vencido']

  const reminders = [
    {
      id: 1,
      title: "Recordatorio de Cita - Consultoría Técnica",
      type: "Cita",
      status: "Activo",
      description: "Reunión con Carlos Ruiz para revisión de arquitectura",
      triggerDate: new Date(2024, 8, 18, 9, 0),
      targetDate: new Date(2024, 8, 18, 10, 0),
      frequency: "Una vez",
      channels: ["email", "push"],
      isActive: true,
      lastSent: null,
      nextSend: new Date(2024, 8, 18, 9, 0),
      recipients: ["usuario@empresa.com"],
      template: "cita_recordatorio",
      advanceTime: 60 // minutos antes
    },
    {
      id: 2,
      title: "Recordatorio de Pago - Servicios de Consultoría",
      type: "Pago",
      status: "Activo",
      description: "Pago pendiente por servicios de consultoría del mes actual",
      triggerDate: new Date(2024, 8, 25, 8, 0),
      targetDate: new Date(2024, 8, 30, 23, 59),
      frequency: "Diario",
      channels: ["email", "sms"],
      isActive: true,
      lastSent: new Date(2024, 8, 14, 8, 0),
      nextSend: new Date(2024, 8, 15, 8, 0),
      recipients: ["facturacion@empresa.com", "usuario@empresa.com"],
      template: "pago_recordatorio",
      advanceTime: 5 * 24 * 60, // 5 días antes
      amount: 2500000
    },
    {
      id: 3,
      title: "Renovación de Contrato - Soporte Técnico",
      type: "Renovación", 
      status: "Activo",
      description: "El contrato de soporte técnico vence en 30 días",
      triggerDate: new Date(2024, 9, 1, 9, 0),
      targetDate: new Date(2024, 10, 1, 0, 0),
      frequency: "Semanal",
      channels: ["email", "push", "sms"],
      isActive: true,
      lastSent: null,
      nextSend: new Date(2024, 9, 1, 9, 0),
      recipients: ["usuario@empresa.com", "admin@empresa.com"],
      template: "renovacion_recordatorio",
      advanceTime: 30 * 24 * 60, // 30 días antes
      contractValue: 15000000
    },
    {
      id: 4,
      title: "Entrega de Proyecto - Desarrollo Web",
      type: "Entrega",
      status: "Completado",
      description: "Entrega final del proyecto de desarrollo web personalizado",
      triggerDate: new Date(2024, 7, 28, 10, 0),
      targetDate: new Date(2024, 7, 30, 17, 0),
      frequency: "Una vez",
      channels: ["email", "push"],
      isActive: false,
      lastSent: new Date(2024, 7, 28, 10, 0),
      nextSend: null,
      recipients: ["usuario@empresa.com", "proyecto@empresa.com"],
      template: "entrega_recordatorio",
      advanceTime: 48 * 60, // 2 días antes
      completedDate: new Date(2024, 7, 29, 16, 30)
    },
    {
      id: 5,
      title: "Seguimiento Post-Implementación",
      type: "Seguimiento",
      status: "Activo",
      description: "Revisión de rendimiento después de la implementación del nuevo sistema",
      triggerDate: new Date(2024, 8, 20, 14, 0),
      targetDate: new Date(2024, 8, 22, 15, 0),
      frequency: "Una vez",
      channels: ["email"],
      isActive: true,
      lastSent: null,
      nextSend: new Date(2024, 8, 20, 14, 0),
      recipients: ["usuario@empresa.com"],
      template: "seguimiento_recordatorio",
      advanceTime: 48 * 60 // 2 días antes
    },
    {
      id: 6,
      title: "Reunión Semanal de Avances",
      type: "Reunión",
      status: "Pausado",
      description: "Reunión semanal para revisar el progreso del proyecto de capacitación",
      triggerDate: new Date(2024, 8, 16, 8, 30),
      targetDate: new Date(2024, 8, 16, 14, 0),
      frequency: "Semanal",
      channels: ["email", "push"],
      isActive: false,
      lastSent: new Date(2024, 8, 9, 8, 30),
      nextSend: new Date(2024, 8, 23, 8, 30),
      recipients: ["usuario@empresa.com", "equipo@empresa.com"],
      template: "reunion_recordatorio",
      advanceTime: 24 * 60, // 1 día antes
      pausedReason: "Proyecto temporalmente suspendido"
    }
  ]

  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'Todos' || reminder.type === typeFilter
    const matchesStatus = statusFilter === 'Todos' || reminder.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Activo':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Completado':
        return { color: 'bg-blue-900/50 text-blue-400 border-blue-700', icon: CheckCircle }
      case 'Pausado':
        return { color: 'bg-yellow-900/50 text-yellow-400 border-yellow-700', icon: AlertCircle }
      case 'Vencido':
        return { color: 'bg-red-900/50 text-red-400 border-red-700', icon: AlertCircle }
      default:
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: Bell }
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Cita': return 'bg-blue-600'
      case 'Pago': return 'bg-green-600'
      case 'Reunión': return 'bg-purple-600'
      case 'Entrega': return 'bg-orange-600'
      case 'Renovación': return 'bg-red-600'
      case 'Seguimiento': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return Mail
      case 'sms': return MessageCircle
      case 'push': return Bell
      case 'phone': return Phone
      default: return Bell
    }
  }

  const toggleReminder = (id: number) => {
    // Lógica para activar/desactivar recordatorio
    console.log(`Toggle reminder ${id}`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getReminderStats = () => {
    return {
      total: reminders.length,
      active: reminders.filter(r => r.status === 'Activo').length,
      completed: reminders.filter(r => r.status === 'Completado').length,
      paused: reminders.filter(r => r.status === 'Pausado').length
    }
  }

  const stats = getReminderStats()

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Recordatorios Automáticos 🔔
          </h2>
          <p className="text-gray-400">
            Configura y gestiona todos tus recordatorios automáticos
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center space-x-2 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </button>
          <button
            onClick={() => setShowNewReminder(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Recordatorio</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Recordatorios</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
              <p className="text-sm text-gray-400">Activos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
              <p className="text-sm text-gray-400">Completados</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.paused}</p>
              <p className="text-sm text-gray-400">Pausados</p>
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
              placeholder="Buscar recordatorios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
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

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.map((reminder) => {
          const statusInfo = getStatusInfo(reminder.status)
          const StatusIcon = statusInfo.icon

          return (
            <div key={reminder.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{reminder.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${getTypeColor(reminder.type)}`}>
                      {reminder.type}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full border flex items-center space-x-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{reminder.status}</span>
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{reminder.description}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className="p-1"
                  >
                    {reminder.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Fecha Objetivo</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-white text-sm">
                      {reminder.targetDate.toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-white text-sm">
                      {reminder.targetDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Próximo Envío</p>
                  {reminder.nextSend ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">
                          {reminder.nextSend.toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">
                          {reminder.nextSend.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-500 text-sm">No programado</span>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Frecuencia</p>
                  <span className="text-white text-sm">{reminder.frequency}</span>
                  <p className="text-gray-400 text-xs">
                    {Math.floor(reminder.advanceTime / (24 * 60))} días antes
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Canales</p>
                  <div className="flex items-center space-x-2">
                    {reminder.channels.map((channel, index) => {
                      const ChannelIcon = getChannelIcon(channel)
                      return (
                        <div key={index} className="flex items-center space-x-1">
                          <ChannelIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400 capitalize">{channel}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {reminder.amount && (
                <div className="mb-3 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-green-300 text-sm">
                    💰 Monto: {formatPrice(reminder.amount)}
                  </p>
                </div>
              )}

              {reminder.contractValue && (
                <div className="mb-3 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <p className="text-red-300 text-sm">
                    📄 Valor del contrato: {formatPrice(reminder.contractValue)}
                  </p>
                </div>
              )}

              {reminder.pausedReason && (
                <div className="mb-3 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    ⏸️ Pausado: {reminder.pausedReason}
                  </p>
                </div>
              )}

              {reminder.completedDate && (
                <div className="mb-3 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    ✅ Completado el {reminder.completedDate.toLocaleDateString('es-ES')} 
                    {' '}a las {reminder.completedDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              )}

              <div className="text-xs text-gray-400">
                <p>Destinatarios: {reminder.recipients.join(', ')}</p>
                {reminder.lastSent && (
                  <p>Último envío: {reminder.lastSent.toLocaleString('es-ES')}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* New Reminder Modal */}
      {showNewReminder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Crear Nuevo Recordatorio</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Título del Recordatorio</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Recordatorio de reunión semanal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {types.slice(1).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe el propósito del recordatorio..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fecha Objetivo</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hora</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Frecuencia</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Una vez</option>
                  <option>Diario</option>
                  <option>Semanal</option>
                  <option>Mensual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Canales de Notificación</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300 text-sm">Email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300 text-sm">SMS</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300 text-sm">Push</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewReminder(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Crear Recordatorio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredReminders.length === 0 && (
        <div className="text-center py-16">
          <Bell className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron recordatorios</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm || typeFilter !== 'Todos' || statusFilter !== 'Todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primer recordatorio automático'
            }
          </p>
          <button
            onClick={() => setShowNewReminder(true)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Crear Primer Recordatorio
          </button>
        </div>
      )}
    </div>
  )
}
