"use client"

import { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  Video,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  Plus,
  MoreVertical,
  PlayCircle,
  FileText
} from 'lucide-react'

export default function ClientesCitasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [typeFilter, setTypeFilter] = useState('Todos')
  const [showReschedule, setShowReschedule] = useState<number | null>(null)

  const statuses = ['Todos', 'Confirmada', 'Pendiente', 'En Curso', 'Completada', 'Cancelada', 'Reprogramada']
  const types = ['Todos', 'Consultoría', 'Desarrollo', 'Soporte', 'Capacitación', 'Seguimiento']

  const appointments = [
    {
      id: 1,
      title: "Consulta Técnica - Arquitectura de Software",
      type: "Consultoría",
      status: "Confirmada",
      date: new Date(2024, 8, 18, 10, 0),
      duration: 60,
      consultant: {
        name: "Carlos Ruiz",
        role: "Director de IT",
        avatar: "CR",
        email: "carlos.ruiz@empresa.com",
        phone: "+57 302 345 6789"
      },
      location: {
        type: "virtual",
        details: "Zoom Meeting",
        link: "https://zoom.us/j/123456789"
      },
      description: "Revisión de la arquitectura propuesta para el nuevo sistema de gestión",
      notes: "Preparar diagramas de arquitectura y documentación técnica",
      attachments: ["Arquitectura_v2.pdf", "Requerimientos.docx"],
      canJoin: false
    },
    {
      id: 2,
      title: "Revisión de Avances del Proyecto",
      type: "Seguimiento",
      status: "En Curso",
      date: new Date(2024, 8, 15, 14, 30),
      duration: 90,
      consultant: {
        name: "María González",
        role: "Gerente de Proyectos",
        avatar: "MG",
        email: "maria.gonzalez@empresa.com",
        phone: "+57 301 234 5678"
      },
      location: {
        type: "presencial",
        details: "Oficina Principal - Sala de Juntas A",
        address: "Carrera 15 #123-45, Bogotá"
      },
      description: "Evaluación del progreso del desarrollo y planificación de próximas etapas",
      notes: "Revisar entregables de la semana y ajustar cronograma",
      attachments: ["Reporte_Semanal.pdf"],
      canJoin: true,
      joinLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 3,
      title: "Capacitación - Nuevas Tecnologías",
      type: "Capacitación",
      status: "Confirmada",
      date: new Date(2024, 8, 25, 9, 0),
      duration: 180,
      consultant: {
        name: "Luisa Martínez",
        role: "Coordinadora de Capacitación",
        avatar: "LM",
        email: "luisa.martinez@empresa.com",
        phone: "+57 305 678 9012"
      },
      location: {
        type: "virtual",
        details: "Microsoft Teams",
        link: "https://teams.microsoft.com/l/meetup-join/..."
      },
      description: "Sesión intensiva sobre las últimas tecnologías en desarrollo web",
      notes: "Instalar herramientas previas según la lista enviada",
      attachments: ["Agenda_Capacitacion.pdf", "Software_Requerido.txt"],
      prerequisites: ["Node.js v18+", "VS Code", "Git"],
      canJoin: false
    },
    {
      id: 4,
      title: "Soporte - Resolución de Incidencias",
      type: "Soporte",
      status: "Completada",
      date: new Date(2024, 8, 12, 16, 0),
      duration: 45,
      consultant: {
        name: "Ana López",
        role: "Especialista en Soporte",
        avatar: "AL",
        email: "ana.lopez@empresa.com",
        phone: "+57 303 456 7890"
      },
      location: {
        type: "virtual",
        details: "Google Meet",
        link: "https://meet.google.com/completed-session"
      },
      description: "Solución de problemas de conectividad y configuración del sistema",
      resolution: "Se configuró correctamente el firewall y se actualizaron los certificados SSL",
      rating: 5,
      feedback: "Excelente servicio, problema resuelto rápidamente",
      canJoin: false
    },
    {
      id: 5,
      title: "Consultoría - Estrategia Digital",
      type: "Consultoría", 
      status: "Pendiente",
      date: new Date(2024, 8, 30, 11, 0),
      duration: 120,
      consultant: {
        name: "Roberto Silva",
        role: "Consultor Senior",
        avatar: "RS",
        email: "roberto.silva@empresa.com",
        phone: "+57 304 567 8901"
      },
      location: {
        type: "presencial",
        details: "Oficina Cliente - Sala de Reuniones",
        address: "Calle 80 #45-67, Bogotá"
      },
      description: "Definición de estrategia de transformación digital para los próximos 2 años",
      notes: "Confirmar asistencia 24 horas antes",
      requiresConfirmation: true,
      canJoin: false
    },
    {
      id: 6,
      title: "Desarrollo - Revisión de Código",
      type: "Desarrollo",
      status: "Reprogramada",
      originalDate: new Date(2024, 8, 20, 15, 0),
      date: new Date(2024, 8, 22, 15, 0),
      duration: 75,
      consultant: {
        name: "Diego Herrera",
        role: "Desarrollador Senior",
        avatar: "DH",
        email: "diego.herrera@empresa.com",
        phone: "+57 306 789 0123"
      },
      location: {
        type: "virtual",
        details: "VS Code Live Share",
        link: "https://prod.liveshare.vsengsaas.visualstudio.com/join?..."
      },
      description: "Revisión de código del módulo de autenticación y autorización",
      rescheduleReason: "Conflicto de agenda del consultor",
      canJoin: false
    }
  ]

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || appointment.status === statusFilter
    const matchesType = typeFilter === 'Todos' || appointment.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Pendiente':
        return { color: 'bg-yellow-900/50 text-yellow-400 border-yellow-700', icon: Clock }
      case 'En Curso':
        return { color: 'bg-blue-900/50 text-blue-400 border-blue-700', icon: PlayCircle }
      case 'Completada':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Cancelada':
        return { color: 'bg-red-900/50 text-red-400 border-red-700', icon: AlertCircle }
      case 'Reprogramada':
        return { color: 'bg-purple-900/50 text-purple-400 border-purple-700', icon: Calendar }
      default:
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: MessageSquare }
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Consultoría': return 'bg-blue-600'
      case 'Desarrollo': return 'bg-green-600'
      case 'Soporte': return 'bg-purple-600'
      case 'Capacitación': return 'bg-orange-600'
      case 'Seguimiento': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const isUpcoming = (date: Date) => {
    return date > new Date()
  }

  const canJoinNow = (appointment: any) => {
    const now = new Date()
    const appointmentStart = new Date(appointment.date)
    const appointmentEnd = new Date(appointmentStart.getTime() + appointment.duration * 60000)
    
    return now >= appointmentStart && now <= appointmentEnd && appointment.location.type === 'virtual'
  }

  const getAppointmentStats = () => {
    return {
      total: appointments.length,
      upcoming: appointments.filter(apt => apt.status === 'Confirmada' || apt.status === 'Pendiente').length,
      completed: appointments.filter(apt => apt.status === 'Completada').length,
      inProgress: appointments.filter(apt => apt.status === 'En Curso').length
    }
  }

  const stats = getAppointmentStats()

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Gestión de Citas 📅
          </h2>
          <p className="text-gray-400">
            Administra todas tus citas y reuniones programadas
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/clientes/reservas'}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Cita</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Citas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.upcoming}</p>
              <p className="text-sm text-gray-400">Próximas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
              <p className="text-sm text-gray-400">Completadas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
              <p className="text-sm text-gray-400">En Curso</p>
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
              placeholder="Buscar citas..."
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

      {/* Appointments List */}
      <div className="space-y-6">
        {filteredAppointments.map((appointment) => {
          const statusInfo = getStatusInfo(appointment.status)
          const StatusIcon = statusInfo.icon
          const upcoming = isUpcoming(appointment.date)

          return (
            <div key={appointment.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{appointment.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${getTypeColor(appointment.type)}`}>
                      {appointment.type}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full border flex items-center space-x-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{appointment.status}</span>
                    </span>
                  </div>
                  <p className="text-gray-400 mb-2">{appointment.description}</p>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Fecha y Hora</p>
                  <div className="flex items-center space-x-2 text-white">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{appointment.date.toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>
                      {appointment.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      ({appointment.duration} min)
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Consultor</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {appointment.consultant.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium">{appointment.consultant.name}</p>
                      <p className="text-gray-400 text-xs">{appointment.consultant.role}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Ubicación</p>
                  <div className="flex items-center space-x-2 text-white">
                    {appointment.location.type === 'virtual' ? (
                      <Video className="w-4 h-4 text-gray-400" />
                    ) : (
                      <MapPin className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm">{appointment.location.details}</span>
                  </div>
                  {appointment.location.address && (
                    <p className="text-gray-400 text-xs mt-1">{appointment.location.address}</p>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Contacto</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-300">{appointment.consultant.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-300">{appointment.consultant.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {appointment.notes && (
                <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                  <p className="text-white font-medium text-sm mb-1">Notas:</p>
                  <p className="text-gray-300 text-sm">{appointment.notes}</p>
                </div>
              )}

              {appointment.prerequisites && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <p className="text-blue-300 font-medium text-sm mb-2">Requisitos previos:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {appointment.prerequisites.map((req, index) => (
                      <li key={index} className="text-blue-200 text-sm">{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {appointment.rescheduleReason && (
                <div className="mb-4 p-3 bg-purple-900/20 border border-purple-700 rounded-lg">
                  <p className="text-purple-300 font-medium text-sm mb-1">Reprogramada:</p>
                  <p className="text-purple-200 text-sm">{appointment.rescheduleReason}</p>
                  {appointment.originalDate && (
                    <p className="text-purple-200 text-xs mt-1">
                      Fecha original: {appointment.originalDate.toLocaleDateString('es-ES')} 
                      {' '}{appointment.originalDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              )}

              {appointment.resolution && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-green-300 font-medium text-sm mb-1">Resolución:</p>
                  <p className="text-green-200 text-sm">{appointment.resolution}</p>
                  {appointment.rating && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-yellow-400">{'★'.repeat(appointment.rating)}</span>
                      <span className="text-green-200 text-xs">Calificación: {appointment.rating}/5</span>
                    </div>
                  )}
                </div>
              )}

              {/* Attachments */}
              {appointment.attachments && appointment.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Archivos adjuntos:</p>
                  <div className="flex flex-wrap gap-2">
                    {appointment.attachments.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-lg">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {canJoinNow(appointment) && (
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>Unirse Ahora</span>
                  </button>
                )}

                {upcoming && appointment.status === 'Confirmada' && appointment.location.type === 'virtual' && !canJoinNow(appointment) && (
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>Enlace de Reunión</span>
                  </button>
                )}

                {upcoming && appointment.status !== 'Completada' && (
                  <>
                    <button className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                      <Edit3 className="w-4 h-4" />
                      <span>Reprogramar</span>
                    </button>
                    
                    <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors flex items-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </>
                )}

                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Contactar</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-16">
          <MessageSquare className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron citas</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm || statusFilter !== 'Todos' || typeFilter !== 'Todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Aún no tienes citas programadas'
            }
          </p>
          <button
            onClick={() => window.location.href = '/clientes/reservas'}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Reservar Primera Cita
          </button>
        </div>
      )}
    </div>
  )
}
