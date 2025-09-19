"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Plus,
  User,
  Mail,
  Shield,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'

// Tipos de datos
interface Usuario {
  id: string
  nombreUsuario: string
  tipoUsuario: 'Administrador' | 'Editor' | 'Visualizador' | 'Auditor'
  email: string
  status: 'Activo' | 'Inactivo' | 'Pendiente'
  fechaCreacion: string
}

// Datos de ejemplo
const initialData: Usuario[] = [
  {
    id: '1',
    nombreUsuario: 'admin.principal',
    tipoUsuario: 'Administrador',
    email: 'admin@empresa.com',
    status: 'Activo',
    fechaCreacion: '2024-01-10'
  },
  {
    id: '2',
    nombreUsuario: 'editor.documentos',
    tipoUsuario: 'Editor',
    email: 'editor@empresa.com',
    status: 'Activo',
    fechaCreacion: '2024-01-12'
  },
  {
    id: '3',
    nombreUsuario: 'visualizador.reportes',
    tipoUsuario: 'Visualizador',
    email: 'reportes@empresa.com',
    status: 'Activo',
    fechaCreacion: '2024-01-15'
  },
  {
    id: '4',
    nombreUsuario: 'auditor.sistema',
    tipoUsuario: 'Auditor',
    email: 'auditor@empresa.com',
    status: 'Inactivo',
    fechaCreacion: '2024-01-18'
  },
  {
    id: '5',
    nombreUsuario: 'nuevo.usuario',
    tipoUsuario: 'Editor',
    email: 'nuevo@empresa.com',
    status: 'Pendiente',
    fechaCreacion: '2024-01-20'
  },
  {
    id: '6',
    nombreUsuario: 'supervisor.area',
    tipoUsuario: 'Administrador',
    email: 'supervisor@empresa.com',
    status: 'Activo',
    fechaCreacion: '2024-01-22'
  },
  {
    id: '7',
    nombreUsuario: 'analista.datos',
    tipoUsuario: 'Visualizador',
    email: 'analista@empresa.com',
    status: 'Activo',
    fechaCreacion: '2024-01-25'
  },
  {
    id: '8',
    nombreUsuario: 'consultor.externo',
    tipoUsuario: 'Auditor',
    email: 'consultor@empresa.com',
    status: 'Pendiente',
    fechaCreacion: '2024-01-28'
  }
]

export default function UsuariosPage() {
  const router = useRouter()
  const [data, setData] = useState<Usuario[]>([])

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('usuarios-data')
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      setData(initialData)
      // Guardar datos iniciales en localStorage
      localStorage.setItem('usuarios-data', JSON.stringify(initialData))
    }
  }, [])

  // Función para guardar datos en localStorage
  const saveData = (newData: Usuario[]) => {
    setData(newData)
    localStorage.setItem('usuarios-data', JSON.stringify(newData))
  }

  // Función para manejar acciones
  const handleVerUsuario = (id: string) => {
    console.log('Ver usuario:', id)
    // Aquí puedes implementar la lógica para ver detalles del usuario
  }

  const handleEditarUsuario = (id: string) => {
    console.log('Editar usuario:', id)
    // Aquí puedes implementar la lógica para editar el usuario
  }

  const handleEliminarUsuario = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const newData = data.filter(usuario => usuario.id !== id)
      saveData(newData)
    }
  }

  const handleNuevoUsuario = () => {
    console.log('Crear nuevo usuario')
    // Aquí puedes implementar la lógica para crear un nuevo usuario
    alert('Funcionalidad de nuevo usuario implementada')
  }

  // Función para obtener el color del tipo de usuario
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Administrador':
        return 'bg-red-100 text-red-800'
      case 'Editor':
        return 'bg-blue-100 text-blue-800'
      case 'Visualizador':
        return 'bg-green-100 text-green-800'
      case 'Auditor':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Función para obtener el color del status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800'
      case 'Inactivo':
        return 'bg-red-100 text-red-800'
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Función para obtener el ícono del status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Activo':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'Inactivo':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'Pendiente':
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return null
    }
  }

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: 'nombreUsuario' as keyof Usuario,
      header: 'Nombre de Usuario',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-blue-400" />
          <span className="font-medium text-white">{value}</span>
        </div>
      )
    },
    {
      key: 'tipoUsuario' as keyof Usuario,
      header: 'Tipo de Usuario',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(value)}`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'email' as keyof Usuario,
      header: 'E-mail',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-200">{value}</span>
        </div>
      )
    },
    {
      key: 'status' as keyof Usuario,
      header: 'Status',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(value)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'id' as keyof Usuario,
      header: 'Acciones',
      cell: (value: string, row: Usuario) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVerUsuario(row.id)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditarUsuario(row.id)}
            className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEliminarUsuario(row.id)}
            className="border-red-500 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Usuarios</h2>
            <p className="text-gray-400">Gestiona los usuarios del sistema</p>
          </div>
          <Button 
            onClick={handleNuevoUsuario}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
        <DataTable
          columns={columns}
          data={data}
          pageSize={10}
        />
      </div>

      {/* Información adicional */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-300 mb-1">Tipos de Usuario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
              <div><span className="text-red-400">• Administrador:</span> Acceso completo al sistema</div>
              <div><span className="text-blue-400">• Editor:</span> Puede crear y modificar contenido</div>
              <div><span className="text-green-400">• Visualizador:</span> Solo lectura de datos</div>
              <div><span className="text-purple-400">• Auditor:</span> Acceso de solo lectura para auditorías</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
