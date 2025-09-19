"use client"

import { useState } from 'react'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  Video,
  MapPin,
  Plus,
  Filter,
  Eye,
  Edit3,
  MoreVertical
} from 'lucide-react'

export default function ClientesCalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 15)) // Septiembre 15, 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [showAvailable, setShowAvailable] = useState(true)

  const appointments = [
    {
      id: 1,
      title: "Consulta Técnica - Desarrollo",
      type: "Consultoría",
      date: new Date(2024, 8, 18, 10, 0),
      duration: 60,
      consultant: "Carlos Ruiz",
      location: "Virtual - Zoom",
      status: "Confirmada"
    },
    {
      id: 2,
      title: "Revisión de Proyecto",
      type: "Seguimiento",
      date: new Date(2024, 8, 20, 14, 30),
      duration: 90,
      consultant: "María González", 
      location: "Oficina Principal",
      status: "Confirmada"
    },
    {
      id: 3,
      title: "Capacitación - Nuevas Herramientas",
      type: "Capacitación",
      date: new Date(2024, 8, 25, 9, 0),
      duration: 180,
      consultant: "Luisa Martínez",
      location: "Virtual - Teams",
      status: "Pendiente"
    },
    {
      id: 4,
      title: "Soporte Técnico Especializado",
      type: "Soporte",
      date: new Date(2024, 8, 27, 16, 0),
      duration: 45,
      consultant: "Ana López",
      location: "Virtual - Meet",
      status: "Confirmada"
    }
  ]

  const availableSlots = [
    { date: new Date(2024, 8, 16), time: "09:00", consultant: "Roberto Silva", type: "Consultoría" },
    { date: new Date(2024, 8, 16), time: "14:00", consultant: "Diego Herrera", type: "Soporte" },
    { date: new Date(2024, 8, 17), time: "10:30", consultant: "Carlos Ruiz", type: "Desarrollo" },
    { date: new Date(2024, 8, 19), time: "11:00", consultant: "María González", type: "Consultoría" },
    { date: new Date(2024, 8, 19), time: "15:30", consultant: "Luisa Martínez", type: "Capacitación" },
    { date: new Date(2024, 8, 22), time: "13:00", consultant: "Ana López", type: "Soporte" },
    { date: new Date(2024, 8, 23), time: "09:30", consultant: "Roberto Silva", type: "Consultoría" },
    { date: new Date(2024, 8, 24), time: "16:30", consultant: "Diego Herrera", type: "Desarrollo" },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.date.getDate() === date.getDate() &&
      apt.date.getMonth() === date.getMonth() &&
      apt.date.getFullYear() === date.getFullYear()
    )
  }

  const getAvailableSlotsForDate = (date: Date) => {
    return availableSlots.filter(slot =>
      slot.date.getDate() === date.getDate() &&
      slot.date.getMonth() === date.getMonth() &&
      slot.date.getFullYear() === date.getFullYear()
    )
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

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Días vacíos del mes anterior
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-700"></div>)
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayAppointments = getAppointmentsForDate(date)
      const availableSlots = getAvailableSlotsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 border border-gray-700 p-1 cursor-pointer hover:bg-gray-700 transition-colors ${
            isToday ? 'bg-blue-900/30 border-blue-600' : ''
          } ${isSelected ? 'bg-blue-700/50' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-400' : 'text-white'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayAppointments.slice(0, 2).map((apt, index) => (
              <div
                key={index}
                className={`text-xs px-1 py-0.5 rounded text-white truncate ${getTypeColor(apt.type)}`}
              >
                {apt.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} {apt.title}
              </div>
            ))}
            {showAvailable && availableSlots.slice(0, 1).map((slot, index) => (
              <div
                key={`slot-${index}`}
                className="text-xs px-1 py-0.5 rounded bg-gray-600 text-gray-300 truncate border border-dashed border-gray-500"
              >
                {slot.time} Disponible
              </div>
            ))}
            {dayAppointments.length > 2 && (
              <div className="text-xs text-gray-400">+{dayAppointments.length - 2} más</div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Calendario de Disponibilidad 📅
        </h2>
        <p className="text-gray-400">
          Visualiza y gestiona la disponibilidad de citas y reuniones
        </p>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-semibold text-white min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showAvailable"
                checked={showAvailable}
                onChange={(e) => setShowAvailable(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="showAvailable" className="text-sm text-gray-300">
                Mostrar disponibilidad
              </label>
            </div>

            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nueva Cita</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Days header */}
            <div className="grid grid-cols-7 bg-gray-700">
              {dayNames.map(day => (
                <div key={day} className="p-4 text-center text-sm font-medium text-gray-300 border-r border-gray-600 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {renderCalendar()}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's appointments */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Citas de Hoy</h3>
            <div className="space-y-3">
              {appointments
                .filter(apt => apt.date.toDateString() === new Date().toDateString())
                .map(apt => (
                  <div key={apt.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${getTypeColor(apt.type)}`}>
                        {apt.type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {apt.status}
                      </span>
                    </div>
                    <h4 className="text-white font-medium text-sm mb-1">{apt.title}</h4>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{apt.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} ({apt.duration} min)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{apt.consultant}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {apt.location.includes('Virtual') ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        <span>{apt.location}</span>
                      </div>
                    </div>
                  </div>
                ))
              }
              {appointments.filter(apt => apt.date.toDateString() === new Date().toDateString()).length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No tienes citas programadas para hoy</p>
              )}
            </div>
          </div>

          {/* Selected date details */}
          {selectedDate && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              {/* Appointments for selected date */}
              <div className="space-y-3 mb-4">
                {getAppointmentsForDate(selectedDate).map(apt => (
                  <div key={apt.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${getTypeColor(apt.type)}`}>
                        {apt.type}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </div>
                    <h4 className="text-white font-medium text-sm mb-1">{apt.title}</h4>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{apt.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} ({apt.duration} min)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{apt.consultant}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Available slots for selected date */}
              {showAvailable && (
                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm">Horarios Disponibles</h4>
                  {getAvailableSlotsForDate(selectedDate).map((slot, index) => (
                    <div key={index} className="p-2 bg-gray-700 border border-dashed border-gray-600 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-300">
                          {slot.time} - {slot.consultant}
                        </div>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                          Reservar
                        </button>
                      </div>
                    </div>
                  ))}
                  {getAvailableSlotsForDate(selectedDate).length === 0 && (
                    <p className="text-gray-500 text-sm">No hay horarios disponibles</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Citas este mes</span>
                <span className="text-white font-medium">
                  {appointments.filter(apt => 
                    apt.date.getMonth() === currentDate.getMonth() &&
                    apt.date.getFullYear() === currentDate.getFullYear()
                  ).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Slots disponibles</span>
                <span className="text-white font-medium">
                  {availableSlots.filter(slot =>
                    slot.date.getMonth() === currentDate.getMonth() &&
                    slot.date.getFullYear() === currentDate.getFullYear()
                  ).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tasa ocupación</span>
                <span className="text-white font-medium">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
