"use client"

import { useState } from 'react'
import { 
  CalendarCheck, 
  Clock, 
  User, 
  Video, 
  MapPin,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  Calendar,
  Star,
  Info
} from 'lucide-react'

export default function ClientesReservasPage() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedConsultant, setSelectedConsultant] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [step, setStep] = useState(1) // 1: Service, 2: Consultant, 3: Date/Time, 4: Confirmation

  const services = [
    {
      id: 'consultoria',
      name: 'Consultoría Técnica',
      description: 'Análisis y recomendaciones para optimización de procesos',
      duration: 60,
      price: 250000,
      category: 'Consultoría'
    },
    {
      id: 'desarrollo',
      name: 'Revisión de Desarrollo',
      description: 'Evaluación de proyectos de software y aplicaciones',
      duration: 90,
      price: 350000,
      category: 'Desarrollo'
    },
    {
      id: 'soporte',
      name: 'Soporte Técnico Especializado',
      description: 'Resolución de problemas técnicos complejos',
      duration: 45,
      price: 180000,
      category: 'Soporte'
    },
    {
      id: 'capacitacion',
      name: 'Sesión de Capacitación',
      description: 'Formación personalizada en tecnologías específicas',
      duration: 120,
      price: 450000,
      category: 'Capacitación'
    },
    {
      id: 'auditoria',
      name: 'Auditoría de Seguridad',
      description: 'Evaluación de vulnerabilidades y riesgos de seguridad',
      duration: 180,
      price: 800000,
      category: 'Consultoría'
    }
  ]

  const consultants = [
    {
      id: 'carlos-ruiz',
      name: 'Carlos Ruiz',
      role: 'Director de IT',
      specialties: ['Desarrollo', 'Consultoría'],
      rating: 4.9,
      reviews: 127,
      avatar: 'CR',
      experience: '8+ años',
      languages: ['Español', 'Inglés'],
      nextAvailable: '2024-09-16'
    },
    {
      id: 'maria-gonzalez',
      name: 'María González',
      role: 'Gerente de Consultoría',
      specialties: ['Consultoría', 'Capacitación'],
      rating: 4.8,
      reviews: 203,
      avatar: 'MG',
      experience: '12+ años',
      languages: ['Español', 'Inglés', 'Portugués'],
      nextAvailable: '2024-09-17'
    },
    {
      id: 'ana-lopez',
      name: 'Ana López',
      role: 'Especialista en Soporte',
      specialties: ['Soporte', 'Consultoría'],
      rating: 4.7,
      reviews: 156,
      avatar: 'AL',
      experience: '6+ años',
      languages: ['Español'],
      nextAvailable: '2024-09-18'
    },
    {
      id: 'luisa-martinez',
      name: 'Luisa Martínez',
      role: 'Coordinadora de Capacitación',
      specialties: ['Capacitación', 'Consultoría'],
      rating: 4.9,
      reviews: 89,
      avatar: 'LM',
      experience: '10+ años',
      languages: ['Español', 'Inglés'],
      nextAvailable: '2024-09-19'
    }
  ]

  const availableSlots: Record<string, string[]> = {
    '2024-09-16': ['09:00', '10:30', '14:00', '15:30'],
    '2024-09-17': ['08:30', '11:00', '13:30', '16:00'],
    '2024-09-18': ['09:30', '11:30', '14:30', '16:30'],
    '2024-09-19': ['08:00', '10:00', '15:00', '17:00'],
    '2024-09-20': ['09:00', '12:00', '14:00'],
    '2024-09-23': ['08:30', '10:30', '13:00', '15:30'],
    '2024-09-24': ['09:00', '11:00', '14:30', '16:00']
  }

  const getFilteredConsultants = () => {
    if (!selectedService) return consultants
    const service = services.find(s => s.id === selectedService)
    if (!service) return consultants
    
    return consultants.filter(consultant => 
      consultant.specialties.includes(service.category)
    )
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Solo días laborables
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    
    return dates
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return selectedService !== ''
      case 2: return selectedConsultant !== ''
      case 3: return selectedDate !== '' && selectedTime !== ''
      default: return false
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Reserva en Línea 📅
        </h2>
        <p className="text-gray-400">
          Agenda citas y reuniones de forma rápida y sencilla
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                step >= stepNum 
                  ? step > stepNum 
                    ? 'bg-green-600' 
                    : 'bg-blue-600' 
                  : 'bg-gray-700'
              }`}>
                {step > stepNum ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white font-semibold">{stepNum}</span>
                )}
              </div>
              <p className={`text-xs text-center ${
                step >= stepNum ? 'text-white' : 'text-gray-400'
              }`}>
                {stepNum === 1 && "Seleccionar Servicio"}
                {stepNum === 2 && "Elegir Consultor"}
                {stepNum === 3 && "Fecha y Hora"}
                {stepNum === 4 && "Confirmación"}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Selecciona un Servicio</h3>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-blue-600 bg-blue-900/20'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-white">{service.name}</h4>
                        <p className="text-sm text-gray-400">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">{formatPrice(service.price)}</p>
                        <p className="text-sm text-gray-400">{service.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs">
                        {service.category}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration} minutos</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Elige tu Consultor</h3>
              <div className="space-y-4">
                {getFilteredConsultants().map((consultant) => (
                  <div
                    key={consultant.id}
                    onClick={() => setSelectedConsultant(consultant.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedConsultant === consultant.id
                        ? 'border-blue-600 bg-blue-900/20'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {consultant.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-white">{consultant.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 text-sm">{consultant.rating}</span>
                            <span className="text-gray-400 text-sm">({consultant.reviews} reseñas)</span>
                          </div>
                        </div>
                        <p className="text-blue-400 text-sm mb-2">{consultant.role}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {consultant.specialties.map((specialty) => (
                            <span key={specialty} className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>Experiencia: {consultant.experience}</span>
                          <span>Idiomas: {consultant.languages.join(', ')}</span>
                          <span>Próxima fecha: {new Date(consultant.nextAvailable).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Selecciona Fecha y Hora</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <h4 className="text-white font-medium mb-3">Fecha</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {getAvailableDates().map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          selectedDate === date
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium">{formatDate(date)}</div>
                        <div className="text-sm opacity-75">
                          {availableSlots[date]?.length || 0} horarios disponibles
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h4 className="text-white font-medium mb-3">Hora</h4>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {(availableSlots[selectedDate] || []).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg text-center transition-colors ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">
                      Primero selecciona una fecha
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ¡Cita Reservada Exitosamente!
                </h3>
                <p className="text-gray-400">
                  Recibirás un email de confirmación con todos los detalles
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-white font-medium mb-4">Detalles de tu Cita</h4>
                <div className="space-y-3">
                  {(() => {
                    const service = services.find(s => s.id === selectedService)
                    const consultant = consultants.find(c => c.id === selectedConsultant)
                    
                    return (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Servicio:</span>
                          <span className="text-white">{service?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Consultor:</span>
                          <span className="text-white">{consultant?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fecha:</span>
                          <span className="text-white">{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Hora:</span>
                          <span className="text-white">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duración:</span>
                          <span className="text-white">{service?.duration} minutos</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Modalidad:</span>
                          <span className="text-white">Virtual - Se enviará enlace</span>
                        </div>
                        <div className="border-t border-gray-600 pt-3">
                          <div className="flex justify-between text-lg font-semibold">
                            <span className="text-gray-400">Total:</span>
                            <span className="text-white">{formatPrice(service?.price || 0)}</span>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => window.location.href = '/clientes/citas'}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                >
                  Ver mis Citas
                </button>
                <button
                  onClick={() => {
                    setStep(1)
                    setSelectedService('')
                    setSelectedConsultant('')
                    setSelectedDate('')
                    setSelectedTime('')
                  }}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                >
                  Reservar Otra Cita
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Resumen de Reserva</h3>
            <div className="space-y-3">
              {selectedService && (
                <div>
                  <p className="text-gray-400 text-sm">Servicio</p>
                  <p className="text-white font-medium">
                    {services.find(s => s.id === selectedService)?.name}
                  </p>
                </div>
              )}
              
              {selectedConsultant && (
                <div>
                  <p className="text-gray-400 text-sm">Consultor</p>
                  <p className="text-white font-medium">
                    {consultants.find(c => c.id === selectedConsultant)?.name}
                  </p>
                </div>
              )}
              
              {selectedDate && (
                <div>
                  <p className="text-gray-400 text-sm">Fecha</p>
                  <p className="text-white font-medium">{formatDate(selectedDate)}</p>
                </div>
              )}
              
              {selectedTime && (
                <div>
                  <p className="text-gray-400 text-sm">Hora</p>
                  <p className="text-white font-medium">{selectedTime}</p>
                </div>
              )}

              {selectedService && (
                <div className="pt-3 border-t border-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-bold text-lg">
                      {formatPrice(services.find(s => s.id === selectedService)?.price || 0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help */}
          <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-700">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-300 font-semibold mb-2">¿Necesitas ayuda?</h4>
                <p className="text-blue-200 text-sm mb-3">
                  Nuestro equipo está listo para ayudarte con tu reserva.
                </p>
                <button className="text-blue-300 text-sm underline hover:text-blue-200">
                  Contactar Soporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg transition-colors ${
              step === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            Anterior
          </button>
          
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`px-6 py-3 rounded-lg transition-colors ${
              canProceed()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {step === 3 ? 'Confirmar Reserva' : 'Continuar'}
          </button>
        </div>
      )}
    </div>
  )
}
