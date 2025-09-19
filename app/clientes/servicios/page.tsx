"use client"

import { useState } from 'react'
import { 
  Briefcase, 
  Search, 
  Filter,
  Star,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  Play,
  Eye,
  MessageSquare,
  Tag
} from 'lucide-react'

export default function ClientesServiciosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Todos')
  const [selectedService, setSelectedService] = useState<number | null>(null)

  const categories = ['Todos', 'Consultoría', 'Desarrollo', 'Soporte', 'Capacitación', 'Mantenimiento']

  const services = [
    {
      id: 1,
      title: "Consultoría en Transformación Digital",
      category: "Consultoría",
      description: "Análisis completo y estrategia para la digitalización de procesos empresariales",
      duration: "3-6 meses",
      rating: 4.9,
      reviews: 45,
      price: 25000000,
      features: [
        "Análisis de procesos actuales",
        "Estrategia de digitalización",
        "Plan de implementación",
        "Capacitación del equipo",
        "Soporte post-implementación"
      ],
      deliverables: [
        "Diagnóstico empresarial",
        "Hoja de ruta tecnológica",
        "Plan de capacitación",
        "Documentación técnica"
      ]
    },
    {
      id: 2,
      title: "Desarrollo de Software Personalizado",
      category: "Desarrollo",
      description: "Desarrollo de aplicaciones web y móviles adaptadas a las necesidades específicas",
      duration: "2-8 meses",
      rating: 4.8,
      reviews: 67,
      price: 45000000,
      features: [
        "Análisis de requerimientos",
        "Diseño UI/UX personalizado",
        "Desarrollo completo",
        "Testing y aseguramiento",
        "Despliegue y configuración"
      ],
      deliverables: [
        "Aplicación web/móvil",
        "Código fuente",
        "Manual de usuario",
        "Documentación técnica"
      ]
    },
    {
      id: 3,
      title: "Soporte Técnico 24/7",
      category: "Soporte",
      description: "Soporte técnico especializado disponible las 24 horas del día",
      duration: "Contrato mensual",
      rating: 4.7,
      reviews: 128,
      price: 3500000,
      features: [
        "Soporte 24/7",
        "Tiempo de respuesta < 2 horas",
        "Acceso remoto autorizado",
        "Reportes mensuales",
        "Gestor de cuenta dedicado"
      ],
      deliverables: [
        "Acceso a portal de soporte",
        "Reportes de incidencias",
        "Recomendaciones mensuales"
      ]
    },
    {
      id: 4,
      title: "Capacitación Empresarial en Tecnología",
      category: "Capacitación",
      description: "Programas de formación para mejorar las competencias digitales del equipo",
      duration: "1-3 meses",
      rating: 4.6,
      reviews: 89,
      price: 8500000,
      features: [
        "Evaluación inicial",
        "Cursos personalizados",
        "Material didáctico",
        "Certificación",
        "Seguimiento post-curso"
      ],
      deliverables: [
        "Plan de capacitación",
        "Material educativo",
        "Certificados",
        "Evaluación de resultados"
      ]
    },
    {
      id: 5,
      title: "Mantenimiento de Infraestructura IT",
      category: "Mantenimiento",
      description: "Mantenimiento preventivo y correctivo de equipos e infraestructura",
      duration: "Contrato anual",
      rating: 4.5,
      reviews: 156,
      price: 15000000,
      features: [
        "Mantenimiento preventivo",
        "Monitoreo 24/7",
        "Actualizaciones programadas",
        "Respaldo automático",
        "Plan de contingencia"
      ],
      deliverables: [
        "Cronograma de mantenimiento",
        "Reportes de estado",
        "Plan de contingencia",
        "Documentación técnica"
      ]
    },
    {
      id: 6,
      title: "Auditoría de Seguridad Informática",
      category: "Consultoría",
      description: "Evaluación completa de la seguridad informática y recomendaciones",
      duration: "4-6 semanas",
      rating: 4.8,
      reviews: 34,
      price: 18000000,
      features: [
        "Análisis de vulnerabilidades",
        "Pruebas de penetración",
        "Evaluación de políticas",
        "Plan de mejoras",
        "Capacitación en seguridad"
      ],
      deliverables: [
        "Reporte de auditoría",
        "Plan de seguridad",
        "Políticas actualizadas",
        "Recomendaciones técnicas"
      ]
    }
  ]

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'Todos' || service.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Consultoría': 'bg-blue-600',
      'Desarrollo': 'bg-green-600',
      'Soporte': 'bg-purple-600',
      'Capacitación': 'bg-orange-600',
      'Mantenimiento': 'bg-red-600'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-600'
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Catálogo de Servicios 🛠️
        </h2>
        <p className="text-gray-400">
          Descubre nuestros servicios profesionales especializados
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{services.length}</p>
              <p className="text-sm text-gray-400">Servicios Disponibles</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-sm text-gray-400">Servicios Activos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.7</p>
              <p className="text-sm text-gray-400">Calificación Promedio</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">15+</p>
              <p className="text-sm text-gray-400">Especialistas</p>
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
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full text-white ${getCategoryColor(service.category)}`}>
                    {service.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-yellow-400">{service.rating}</span>
                    <span className="text-xs text-gray-400">({service.reviews} reseñas)</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{formatPrice(service.price)}</p>
                <p className="text-sm text-gray-400">Desde</p>
              </div>
            </div>

            {/* Features Preview */}
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Incluye:</h4>
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-blue-400 cursor-pointer">
                    +{service.features.length - 3} características más
                  </li>
                )}
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedService(service.id)}
                className="flex-1 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Detalles</span>
              </button>
              
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Contratar</span>
              </button>
              
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {(() => {
              const service = services.find(s => s.id === selectedService)!
              return (
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{service.title}</h3>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-sm rounded-full text-white ${getCategoryColor(service.category)}`}>
                          {service.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-yellow-400">{service.rating}</span>
                          <span className="text-gray-400">({service.reviews} reseñas)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">{formatPrice(service.price)}</p>
                      <p className="text-gray-400">Duración: {service.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Características del Servicio</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Entregables</h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-300">
                            <Tag className="w-4 h-4 text-blue-400" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <h4 className="text-white font-medium mb-2">Descripción Completa</h4>
                    <p className="text-gray-300">{service.description}</p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cerrar
                    </button>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Agendar Consulta</span>
                    </button>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Solicitar Propuesta
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <Briefcase className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron servicios</h3>
          <p className="text-gray-500 mb-8">
            Intenta ajustar los filtros de búsqueda para encontrar el servicio que necesitas
          </p>
        </div>
      )}
    </div>
  )
}
