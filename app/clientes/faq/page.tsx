"use client"

import { useState } from 'react'
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ExternalLink,
  BookOpen,
  Users,
  Zap,
  Shield
} from 'lucide-react'

export default function ClientesFaqPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const categories = [
    { id: 'Todos', name: 'Todos', icon: BookOpen },
    { id: 'cuenta', name: 'Cuenta y Perfil', icon: Users },
    { id: 'servicios', name: 'Servicios', icon: Zap },
    { id: 'facturacion', name: 'Facturación', icon: HelpCircle },
    { id: 'tecnico', name: 'Soporte Técnico', icon: Shield },
    { id: 'general', name: 'General', icon: MessageSquare }
  ]

  const faqItems = [
    {
      id: 1,
      question: "¿Cómo puedo cambiar mi contraseña?",
      answer: "Para cambiar tu contraseña, ve a Configuración > Seguridad > Cambiar Contraseña. Ingresa tu contraseña actual y la nueva contraseña dos veces. La nueva contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y símbolos.",
      category: "cuenta",
      tags: ["contraseña", "seguridad", "cuenta"],
      helpful: 45,
      notHelpful: 3,
      lastUpdated: "2024-09-10",
      popularity: 98
    },
    {
      id: 2,
      question: "¿Qué servicios están incluidos en mi plan?",
      answer: "Tu plan actual incluye: Consultoría técnica (8 horas/mes), Soporte 24/7, Acceso a documentación técnica, Capacitaciones mensuales, y Respaldos automáticos. Para ver los detalles específicos de tu plan, puedes revisar la sección 'Mi Contrato' en tu dashboard.",
      category: "servicios",
      tags: ["plan", "servicios", "contrato"],
      helpful: 67,
      notHelpful: 8,
      lastUpdated: "2024-09-08",
      popularity: 89,
      relatedArticles: [
        { title: "Comparación de planes", url: "/faq/planes" },
        { title: "Servicios adicionales", url: "/faq/servicios-adicionales" }
      ]
    },
    {
      id: 3,
      question: "¿Cómo se generan mis facturas?",
      answer: "Las facturas se generan automáticamente el primer día de cada mes por los servicios del mes anterior. Recibirás una notificación por email cuando la factura esté lista. Puedes descargar tus facturas desde la sección 'Historial de Facturación' o configurar la entrega automática por correo.",
      category: "facturacion",
      tags: ["factura", "billing", "pagos"],
      helpful: 52,
      notHelpful: 5,
      lastUpdated: "2024-09-12",
      popularity: 76
    },
    {
      id: 4,
      question: "¿Qué hago si tengo problemas técnicos?",
      answer: "Si experimentas problemas técnicos, puedes: 1) Revisar esta sección de FAQ para soluciones comunes, 2) Crear un ticket de soporte desde tu dashboard, 3) Llamar a nuestra línea de soporte 24/7 al +57 1 234-5678, o 4) Usar nuestro chat en vivo durante horas laborables.",
      category: "tecnico",
      tags: ["soporte", "problemas", "ayuda"],
      helpful: 73,
      notHelpful: 2,
      lastUpdated: "2024-09-11",
      popularity: 92
    },
    {
      id: 5,
      question: "¿Puedo cancelar mi suscripción?",
      answer: "Puedes cancelar tu suscripción en cualquier momento. El servicio continuará hasta el final del período facturado. Para cancelar, ve a Configuración > Suscripción > Cancelar, o contacta a nuestro equipo de soporte. Ten en cuenta que algunas suscripciones tienen períodos mínimos de compromiso.",
      category: "general",
      tags: ["cancelar", "suscripción", "contrato"],
      helpful: 34,
      notHelpful: 12,
      lastUpdated: "2024-09-09",
      popularity: 65
    },
    {
      id: 6,
      question: "¿Cómo programo una cita de consultoría?",
      answer: "Para programar una cita de consultoría: 1) Ve a la sección 'Reservar Cita' en tu dashboard, 2) Selecciona el tipo de consultoría que necesitas, 3) Elige tu consultor preferido, 4) Selecciona fecha y hora disponibles, 5) Confirma la reserva. Recibirás una confirmación por email con el enlace de la reunión.",
      category: "servicios",
      tags: ["cita", "consultoría", "reservar"],
      helpful: 89,
      notHelpful: 4,
      lastUpdated: "2024-09-13",
      popularity: 87
    },
    {
      id: 7,
      question: "¿Mis datos están seguros?",
      answer: "Sí, la seguridad de tus datos es nuestra prioridad. Utilizamos encriptación SSL de 256 bits para todas las transmisiones, almacenamiento encriptado, autenticación de dos factores disponible, respaldos diarios automáticos, y cumplimos con estándares internacionales de seguridad como ISO 27001.",
      category: "tecnico",
      tags: ["seguridad", "datos", "privacidad"],
      helpful: 91,
      notHelpful: 1,
      lastUpdated: "2024-09-07",
      popularity: 94
    },
    {
      id: 8,
      question: "¿Cómo actualizo mi información de facturación?",
      answer: "Para actualizar tu información de facturación: 1) Ve a Configuración > Facturación, 2) Haz clic en 'Editar información', 3) Actualiza los campos necesarios (dirección, método de pago, etc.), 4) Guarda los cambios. Los cambios se aplicarán a partir de la siguiente facturación.",
      category: "facturacion",
      tags: ["facturación", "datos", "método de pago"],
      helpful: 41,
      notHelpful: 6,
      lastUpdated: "2024-09-06",
      popularity: 71
    },
    {
      id: 9,
      question: "¿Puedo agregar usuarios adicionales a mi cuenta?",
      answer: "Sí, dependiendo de tu plan puedes agregar usuarios adicionales. Ve a Configuración > Usuarios > Agregar Usuario. Los usuarios adicionales pueden tener diferentes niveles de acceso (Administrador, Editor, Solo lectura). Cada usuario adicional puede tener un costo mensual adicional según tu plan.",
      category: "cuenta",
      tags: ["usuarios", "acceso", "permisos"],
      helpful: 56,
      notHelpful: 9,
      lastUpdated: "2024-09-05",
      popularity: 68
    },
    {
      id: 10,
      question: "¿Qué navegadores son compatibles?",
      answer: "Nuestro sistema es compatible con las versiones recientes de: Chrome (versión 90+), Firefox (versión 88+), Safari (versión 14+), Edge (versión 90+). Recomendamos mantener tu navegador actualizado para la mejor experiencia. Internet Explorer no es compatible.",
      category: "tecnico",
      tags: ["navegador", "compatibilidad", "requisitos"],
      helpful: 28,
      notHelpful: 3,
      lastUpdated: "2024-09-04",
      popularity: 45
    }
  ]

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => b.popularity - a.popularity)

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const markHelpful = (id: number, helpful: boolean) => {
    // Lógica para marcar como útil/no útil
    console.log(`Marked ${id} as ${helpful ? 'helpful' : 'not helpful'}`)
  }

  const getFAQStats = () => {
    return {
      total: faqItems.length,
      categories: categories.length - 1, // Exclude "Todos"
      avgRating: faqItems.reduce((acc, item) => acc + (item.helpful / (item.helpful + item.notHelpful)), 0) / faqItems.length,
      mostPopular: faqItems.reduce((max, item) => item.popularity > max.popularity ? item : max, faqItems[0])
    }
  }

  const stats = getFAQStats()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Base de Conocimiento (FAQ) 📚
        </h2>
        <p className="text-gray-400">
          Encuentra respuestas rápidas a las preguntas más frecuentes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Artículos de Ayuda</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.categories}</p>
              <p className="text-sm text-gray-400">Categorías</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{(stats.avgRating * 100).toFixed(0)}%</p>
              <p className="text-sm text-gray-400">Satisfacción Promedio</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white truncate">{stats.mostPopular?.question.substring(0, 20)}...</p>
              <p className="text-sm text-gray-400">Más Popular</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 lg:max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Busca en la base de conocimiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="text-sm text-gray-400">
            {filteredFAQ.length} de {faqItems.length} artículos
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mt-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQ.map((item) => {
          const isExpanded = expandedItems.includes(item.id)
          const helpfulPercentage = ((item.helpful / (item.helpful + item.notHelpful)) * 100).toFixed(0)

          return (
            <div key={item.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div
                onClick={() => toggleExpanded(item.id)}
                className="p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-white">{item.question}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-green-400">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{helpfulPercentage}%</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Star className="w-3 h-3" />
                          <span>{item.popularity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-700">
                  <div className="pt-4">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>

                    {item.relatedArticles && (
                      <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                        <h5 className="text-white font-medium mb-2">Artículos relacionados:</h5>
                        <ul className="space-y-1">
                          {item.relatedArticles.map((article, index) => (
                            <li key={index}>
                              <a href={article.url} className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
                                <ExternalLink className="w-3 h-3" />
                                <span>{article.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">¿Te fue útil este artículo?</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => markHelpful(item.id, true)}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">{item.helpful}</span>
                          </button>
                          <button
                            onClick={() => markHelpful(item.id, false)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span className="text-sm">{item.notHelpful}</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Actualizado: {new Date(item.lastUpdated).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredFAQ.length === 0 && (
        <div className="text-center py-16">
          <HelpCircle className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron resultados</h3>
          <p className="text-gray-500 mb-8">
            No encontramos artículos que coincidan con tu búsqueda. 
            {searchTerm && ' Intenta con términos diferentes o '}
            {selectedCategory !== 'Todos' && ' selecciona una categoría diferente o '}
            revisa todas las categorías.
          </p>
          <div className="flex justify-center space-x-4">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
              >
                Limpiar búsqueda
              </button>
            )}
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Todos')
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              Ver todos los artículos
            </button>
          </div>
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-12 bg-blue-900/50 rounded-xl p-6 border border-blue-700">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-blue-200 mb-4">
              Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta específica.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.href = '/clientes/tickets'}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                Crear Ticket de Soporte
              </button>
              <button className="px-6 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600 rounded-lg text-blue-300 transition-colors">
                Chat en Vivo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
