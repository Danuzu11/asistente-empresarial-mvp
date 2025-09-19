"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Plus,
  Building2,
  FileText,
  User,
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
interface Sociedad {
  id: string
  razonSocial: string
  rut: string
  tipoSociedad: 'S.A.S.' | 'S.A.' | 'Ltda.' | 'S.C.S.' | 'S.C.A.' | 'E.U.'
  representanteLegal: string
  status: 'Activa' | 'Inactiva' | 'En Proceso'
  fechaCreacion: string
}

// Datos de ejemplo
const initialData: Sociedad[] = [
  {
    id: '1',
    razonSocial: 'Tecnología Innovadora S.A.S.',
    rut: '900.123.456-7',
    tipoSociedad: 'S.A.S.',
    representanteLegal: 'Juan Carlos Pérez',
    status: 'Activa',
    fechaCreacion: '2024-01-10'
  },
  {
    id: '2',
    razonSocial: 'Construcciones del Norte S.A.',
    rut: '800.234.567-8',
    tipoSociedad: 'S.A.',
    representanteLegal: 'María Elena Rodríguez',
    status: 'Activa',
    fechaCreacion: '2024-01-12'
  },
  {
    id: '3',
    razonSocial: 'Servicios Generales Ltda.',
    rut: '700.345.678-9',
    tipoSociedad: 'Ltda.',
    representanteLegal: 'Carlos Alberto González',
    status: 'Inactiva',
    fechaCreacion: '2024-01-15'
  },
  {
    id: '4',
    razonSocial: 'Consultoría Empresarial S.C.S.',
    rut: '600.456.789-0',
    tipoSociedad: 'S.C.S.',
    representanteLegal: 'Ana Lucía Martínez',
    status: 'En Proceso',
    fechaCreacion: '2024-01-18'
  },
  {
    id: '5',
    razonSocial: 'Inversiones del Sur S.C.A.',
    rut: '500.567.890-1',
    tipoSociedad: 'S.C.A.',
    representanteLegal: 'Roberto Silva',
    status: 'Activa',
    fechaCreacion: '2024-01-20'
  },
  {
    id: '6',
    razonSocial: 'Comercializadora E.U.',
    rut: '400.678.901-2',
    tipoSociedad: 'E.U.',
    representanteLegal: 'Patricia Morales',
    status: 'Activa',
    fechaCreacion: '2024-01-22'
  },
  {
    id: '7',
    razonSocial: 'Desarrollo de Software S.A.S.',
    rut: '300.789.012-3',
    tipoSociedad: 'S.A.S.',
    representanteLegal: 'Diego Fernando López',
    status: 'En Proceso',
    fechaCreacion: '2024-01-25'
  },
  {
    id: '8',
    razonSocial: 'Transportes Rápidos Ltda.',
    rut: '200.890.123-4',
    tipoSociedad: 'Ltda.',
    representanteLegal: 'Sandra Milena Torres',
    status: 'Activa',
    fechaCreacion: '2024-01-28'
  }
]

export default function SociedadesPage() {
  const router = useRouter()
  const [data, setData] = useState<Sociedad[]>([])

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('sociedades-data')
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      setData(initialData)
      // Guardar datos iniciales en localStorage
      localStorage.setItem('sociedades-data', JSON.stringify(initialData))
    }
  }, [])

  // Función para guardar datos en localStorage
  const saveData = (newData: Sociedad[]) => {
    setData(newData)
    localStorage.setItem('sociedades-data', JSON.stringify(newData))
  }

  // Función para manejar acciones
  const handleVerSociedad = (id: string) => {
    console.log('Ver sociedad:', id)
    // Aquí puedes implementar la lógica para ver detalles de la sociedad
  }

  const handleEditarSociedad = (id: string) => {
    console.log('Editar sociedad:', id)
    // Aquí puedes implementar la lógica para editar la sociedad
  }

  const handleEliminarSociedad = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta sociedad?')) {
      const newData = data.filter(sociedad => sociedad.id !== id)
      saveData(newData)
    }
  }

  const handleNuevaSociedad = () => {
    console.log('Crear nueva sociedad')
    // Aquí puedes implementar la lógica para crear una nueva sociedad
    alert('Funcionalidad de nueva sociedad implementada')
  }

  // Función para obtener el color del tipo de sociedad
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'S.A.S.':
        return 'bg-blue-100 text-blue-800'
      case 'S.A.':
        return 'bg-green-100 text-green-800'
      case 'Ltda.':
        return 'bg-purple-100 text-purple-800'
      case 'S.C.S.':
        return 'bg-orange-100 text-orange-800'
      case 'S.C.A.':
        return 'bg-pink-100 text-pink-800'
      case 'E.U.':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Función para obtener el color del status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa':
        return 'bg-green-100 text-green-800'
      case 'Inactiva':
        return 'bg-red-100 text-red-800'
      case 'En Proceso':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Función para obtener el ícono del status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Activa':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'Inactiva':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'En Proceso':
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return null
    }
  }

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: 'razonSocial' as keyof Sociedad,
      header: 'Razón Social',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          <span className="font-medium text-white">{value}</span>
        </div>
      )
    },
    {
      key: 'rut' as keyof Sociedad,
      header: 'RUT',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-gray-200 font-mono">{value}</span>
        </div>
      )
    },
    {
      key: 'tipoSociedad' as keyof Sociedad,
      header: 'Tipo de Sociedad',
      cell: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(value)}`}>
          {value}
        </span>
      )
    },
    {
      key: 'representanteLegal' as keyof Sociedad,
      header: 'Representante Legal',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-200">{value}</span>
        </div>
      )
    },
    {
      key: 'status' as keyof Sociedad,
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
      key: 'id' as keyof Sociedad,
      header: 'Acciones',
      cell: (value: string, row: Sociedad) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVerSociedad(row.id)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditarSociedad(row.id)}
            className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEliminarSociedad(row.id)}
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
            <h2 className="text-3xl font-bold text-white mb-2">Sociedades</h2>
            <p className="text-gray-400">Gestiona las sociedades registradas</p>
          </div>
          <Button 
            onClick={handleNuevaSociedad}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Sociedad
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
          <Building2 className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-300 mb-1">Tipos de Sociedad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
              <div><span className="text-blue-400">• S.A.S.:</span> Sociedad por Acciones Simplificada</div>
              <div><span className="text-green-400">• S.A.:</span> Sociedad Anónima</div>
              <div><span className="text-purple-400">• Ltda.:</span> Sociedad de Responsabilidad Limitada</div>
              <div><span className="text-orange-400">• S.C.S.:</span> Sociedad en Comandita Simple</div>
              <div><span className="text-pink-400">• S.C.A.:</span> Sociedad en Comandita por Acciones</div>
              <div><span className="text-gray-400">• E.U.:</span> Empresa Unipersonal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
