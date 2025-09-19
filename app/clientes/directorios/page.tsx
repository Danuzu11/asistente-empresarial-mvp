"use client"

import { useState } from 'react'
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  Building2,
  UserCheck,
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react'

export default function ClientesDirectoriosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('Todos')
  const [showAddContact, setShowAddContact] = useState(false)

  const departments = ['Todos', 'Administración', 'Compras', 'IT', 'Recursos Humanos', 'Finanzas']
  
  const contacts = [
    {
      id: 1,
      name: "María González",
      position: "Gerente de Compras",
      department: "Compras",
      email: "maria.gonzalez@empresa.com",
      phone: "+57 301 234 5678",
      extension: "1001",
      status: "Activo",
      avatar: "MG"
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      position: "Director de IT",
      department: "IT",
      email: "carlos.ruiz@empresa.com",
      phone: "+57 302 345 6789",
      extension: "1002",
      status: "Activo",
      avatar: "CR"
    },
    {
      id: 3,
      name: "Ana López",
      position: "Coordinadora Administrativa",
      department: "Administración",
      email: "ana.lopez@empresa.com",
      phone: "+57 303 456 7890",
      extension: "1003",
      status: "Inactivo",
      avatar: "AL"
    },
    {
      id: 4,
      name: "Roberto Silva",
      position: "Analista Financiero",
      department: "Finanzas",
      email: "roberto.silva@empresa.com",
      phone: "+57 304 567 8901",
      extension: "1004",
      status: "Activo",
      avatar: "RS"
    },
    {
      id: 5,
      name: "Luisa Martínez",
      position: "Especialista en RRHH",
      department: "Recursos Humanos",
      email: "luisa.martinez@empresa.com",
      phone: "+57 305 678 9012",
      extension: "1005",
      status: "Activo",
      avatar: "LM"
    },
    {
      id: 6,
      name: "Diego Herrera",
      position: "Asistente de Compras",
      department: "Compras",
      email: "diego.herrera@empresa.com",
      phone: "+57 306 789 0123",
      extension: "1006",
      status: "Activo",
      avatar: "DH"
    }
  ]

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'Todos' || contact.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    return status === 'Activo' ? 'text-green-400 bg-green-900/50 border-green-700' : 'text-yellow-400 bg-yellow-900/50 border-yellow-700'
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Gestión de Directorios 📋
          </h2>
          <p className="text-gray-400">
            Administra los contactos de tu organización
          </p>
        </div>
        <button
          onClick={() => setShowAddContact(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Contacto</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">25</p>
              <p className="text-sm text-gray-400">Total Contactos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">23</p>
              <p className="text-sm text-gray-400">Activos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">6</p>
              <p className="text-sm text-gray-400">Departamentos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-sm text-gray-400">Con Email</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar contactos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Department Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                  <p className="text-sm text-gray-400">{contact.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
                <button className="p-1 text-gray-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>{contact.department}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{contact.phone}</span>
                <span className="text-xs text-gray-500">Ext. {contact.extension}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>Ver</span>
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                <Edit3 className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No se encontraron contactos</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedDepartment !== 'Todos' 
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza agregando tu primer contacto'
            }
          </p>
          <button
            onClick={() => setShowAddContact(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Agregar Contacto
          </button>
        </div>
      )}

      {/* Add Contact Modal (Placeholder) */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Agregar Nuevo Contacto</h3>
            <p className="text-gray-400 mb-6">
              Funcionalidad de agregar contacto en desarrollo...
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddContact(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cerrar
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Próximamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
