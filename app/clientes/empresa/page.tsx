"use client"

import { useState } from 'react'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Calendar, 
  Award,
  Star,
  ExternalLink,
  MessageSquare,
  Clock,
  CheckCircle,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react'

export default function ClientesEmpresaPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'Información General', icon: Building2 },
    { id: 'team', name: 'Nuestro Equipo', icon: Users },
    { id: 'services', name: 'Servicios', icon: Target },
    { id: 'contact', name: 'Contacto', icon: Phone }
  ]

  const companyInfo = {
    name: "TechSolutions Pro S.A.S.",
    tagline: "Transformando empresas a través de la tecnología",
    description: "Somos una empresa líder en consultoría tecnológica y desarrollo de software, con más de 10 años de experiencia ayudando a organizaciones a optimizar sus procesos y alcanzar sus objetivos digitales.",
    founded: "2014",
    employees: "150+",
    clients: "500+",
    projects: "1,000+",
    address: "Carrera 15 #123-45, Oficina 1201",
    city: "Bogotá, Colombia",
    phone: "+57 1 234-5678",
    email: "info@techsolutionspro.com",
    website: "www.techsolutionspro.com",
    socialMedia: {
      linkedin: "linkedin.com/company/techsolutionspro",
      twitter: "@TechSolutionsPro",
      facebook: "facebook.com/TechSolutionsPro"
    },
    certifications: [
      { name: "ISO 27001", description: "Gestión de Seguridad de la Información" },
      { name: "ISO 9001", description: "Gestión de Calidad" },
      { name: "CMMI Level 3", description: "Madurez en Procesos de Software" },
      { name: "Microsoft Gold Partner", description: "Partner certificado de Microsoft" },
      { name: "AWS Advanced Consulting Partner", description: "Partner avanzado de Amazon Web Services" }
    ]
  }

  const teamMembers = [
    {
      name: "Carlos Ruiz",
      position: "Director de IT",
      avatar: "CR",
      experience: "8+ años",
      specialties: ["Desarrollo de Software", "Arquitectura de Sistemas", "Cloud Computing"],
      education: "Ing. Sistemas - Universidad Nacional",
      certifications: ["AWS Solutions Architect", "Microsoft Azure Expert"]
    },
    {
      name: "María González",
      position: "Gerente de Consultoría",
      avatar: "MG",
      experience: "12+ años",
      specialties: ["Transformación Digital", "Gestión de Proyectos", "Consultoría Empresarial"],
      education: "Ing. Industrial - Universidad de los Andes",
      certifications: ["PMP", "Scrum Master", "ITIL Expert"]
    },
    {
      name: "Ana López",
      position: "Coordinadora de Soporte",
      avatar: "AL",
      experience: "6+ años",
      specialties: ["Soporte Técnico", "Infraestructura IT", "Seguridad Informática"],
      education: "Ing. Sistemas - Universidad Javeriana",
      certifications: ["CompTIA Security+", "CISSP"]
    },
    {
      name: "Luisa Martínez",
      position: "Coordinadora de Capacitación",
      avatar: "LM",
      experience: "10+ años",
      specialties: ["Capacitación Empresarial", "Gestión del Cambio", "Desarrollo Organizacional"],
      education: "Psicología Organizacional - Universidad del Rosario",
      certifications: ["Certified Training Manager", "Change Management"]
    },
    {
      name: "Roberto Silva",
      position: "Analista Senior",
      avatar: "RS",
      experience: "7+ años",
      specialties: ["Análisis de Datos", "Business Intelligence", "Automatización"],
      education: "Ing. Sistemas - Universidad Minuto de Dios",
      certifications: ["Microsoft Power BI", "Tableau Certified"]
    },
    {
      name: "Diego Herrera",
      position: "Desarrollador Senior",
      avatar: "DH",
      experience: "9+ años",
      specialties: ["Desarrollo Full Stack", "DevOps", "Metodologías Ágiles"],
      education: "Ing. Software - Universidad Católica",
      certifications: ["AWS DevOps", "Certified Kubernetes Administrator"]
    }
  ]

  const services = [
    {
      category: "Consultoría",
      icon: Building2,
      items: [
        "Transformación Digital",
        "Auditoría de Sistemas",
        "Planificación Estratégica IT",
        "Consultoría en Procesos"
      ]
    },
    {
      category: "Desarrollo",
      icon: Target,
      items: [
        "Aplicaciones Web y Móviles",
        "Sistemas a Medida",
        "Integración de Sistemas",
        "APIs y Microservicios"
      ]
    },
    {
      category: "Soporte",
      icon: Shield,
      items: [
        "Soporte Técnico 24/7",
        "Mantenimiento Preventivo",
        "Monitoreo de Sistemas",
        "Respaldos y Recuperación"
      ]
    },
    {
      category: "Capacitación",
      icon: Users,
      items: [
        "Cursos Personalizados",
        "Certificaciones Técnicas",
        "Workshops Empresariales",
        "Coaching Tecnológico"
      ]
    }
  ]

  const achievements = [
    {
      year: "2023",
      title: "Mejor Empresa de Tecnología",
      organization: "Cámara de Comercio de Bogotá",
      description: "Reconocimiento por innovación y excelencia en servicios tecnológicos"
    },
    {
      year: "2022",
      title: "Top 10 Empresas de Software",
      organization: "Colombia Tech Awards",
      description: "Posicionamiento entre las mejores empresas de desarrollo de software"
    },
    {
      year: "2021",
      title: "Certificación ISO 27001",
      organization: "ICONTEC",
      description: "Certificación en Gestión de Seguridad de la Información"
    },
    {
      year: "2020",
      title: "Partner del Año",
      organization: "Microsoft Colombia",
      description: "Reconocimiento como mejor partner de Microsoft en Colombia"
    }
  ]

  const stats = [
    { label: "Años de Experiencia", value: "10+", icon: Calendar },
    { label: "Empleados", value: "150+", icon: Users },
    { label: "Clientes Satisfechos", value: "500+", icon: Star },
    { label: "Proyectos Completados", value: "1,000+", icon: CheckCircle }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Información de la Empresa 🏢
        </h2>
        <p className="text-gray-400">
          Conoce más sobre TechSolutions Pro y nuestro compromiso contigo
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-gray-700 mb-8">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{companyInfo.name}</h1>
            <p className="text-xl text-blue-300 mb-4">{companyInfo.tagline}</p>
            <p className="text-gray-300 leading-relaxed">{companyInfo.description}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 mb-8">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-8">
              {/* Company Overview */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Sobre Nosotros</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">Nuestra Historia</h4>
                    <p className="text-gray-300 mb-4">
                      Fundada en {companyInfo.founded}, TechSolutions Pro nació de la visión de democratizar 
                      el acceso a tecnologías avanzadas para empresas de todos los tamaños. Comenzamos como 
                      un pequeño equipo de desarrolladores apasionados y hemos crecido hasta convertirnos en 
                      una empresa líder en el sector.
                    </p>
                    <p className="text-gray-300">
                      Nuestra filosofía se basa en la innovación continua, la excelencia en el servicio y 
                      el compromiso con el éxito de nuestros clientes. Cada proyecto es una oportunidad 
                      para superar expectativas y crear valor duradero.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">Nuestra Misión</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                          <Target className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h5 className="text-white font-medium">Misión</h5>
                          <p className="text-gray-300 text-sm">
                            Transformar organizaciones a través de soluciones tecnológicas innovadoras, 
                            impulsando su crecimiento y competitividad en el mercado digital.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h5 className="text-white font-medium">Visión</h5>
                          <p className="text-gray-300 text-sm">
                            Ser la empresa de referencia en consultoría tecnológica en Latinoamérica, 
                            reconocida por nuestra innovación, calidad y compromiso con el cliente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Certificaciones y Acreditaciones</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companyInfo.certifications.map((cert, index) => (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <h5 className="text-white font-medium">{cert.name}</h5>
                      </div>
                      <p className="text-gray-400 text-sm">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Logros y Reconocimientos</h4>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 font-bold text-sm">{achievement.year}</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-white font-medium mb-1">{achievement.title}</h5>
                        <p className="text-blue-400 text-sm mb-2">{achievement.organization}</p>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Nuestro Equipo</h3>
              <p className="text-gray-400">
                Conoce a los profesionales que hacen posible nuestro éxito y el de nuestros clientes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="p-6 bg-gray-700 rounded-lg">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{member.name}</h4>
                        <p className="text-blue-400">{member.position}</p>
                        <p className="text-gray-400 text-sm">{member.experience} de experiencia</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-white font-medium mb-2">Especialidades:</h5>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-white font-medium mb-1">Educación:</h5>
                        <p className="text-gray-300 text-sm">{member.education}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-white font-medium mb-1">Certificaciones:</h5>
                        <p className="text-gray-300 text-sm">{member.certifications.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Nuestros Servicios</h3>
              <p className="text-gray-400">
                Ofrecemos una gama completa de servicios tecnológicos diseñados para impulsar el crecimiento de tu empresa.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <div key={index} className="p-6 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <h4 className="text-white font-semibold text-lg">{service.category}</h4>
                      </div>
                      
                      <ul className="space-y-2">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              <div className="bg-blue-900/50 rounded-lg p-6 border border-blue-700">
                <h4 className="text-blue-300 font-semibold mb-3">¿Necesitas un servicio personalizado?</h4>
                <p className="text-blue-200 mb-4">
                  Nuestro equipo puede desarrollar soluciones a medida según las necesidades específicas de tu empresa.
                </p>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                  Solicitar Consulta
                </button>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Información de Contacto</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Datos de Contacto</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white">{companyInfo.address}</p>
                        <p className="text-gray-400">{companyInfo.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white">{companyInfo.phone}</p>
                        <p className="text-gray-400">Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white">{companyInfo.email}</p>
                        <p className="text-gray-400">Respuesta en menos de 24 horas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <a href={`https://${companyInfo.website}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                          {companyInfo.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Redes Sociales</h4>
                  <div className="space-y-3">
                    <a href={`https://${companyInfo.socialMedia.linkedin}`} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">LinkedIn</span>
                    </a>
                    
                    <a href={`https://twitter.com/${companyInfo.socialMedia.twitter.replace('@', '')}`} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">Twitter</span>
                    </a>
                    
                    <a href={`https://${companyInfo.socialMedia.facebook}`} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4">Horarios de Atención</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-medium mb-2">Oficina Principal</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Lunes - Viernes: 8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Sábados: 9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Domingos: Cerrado</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-medium mb-2">Soporte 24/7</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Disponible las 24 horas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">Chat en vivo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Línea de emergencias</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
