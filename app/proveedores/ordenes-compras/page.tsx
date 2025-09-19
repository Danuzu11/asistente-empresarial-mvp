"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Paperclip, 
  Eye, 
  MessageSquare, 
  Plus,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Tipos de datos
interface OrdenCompra {
  id: string
  numero: string
  fecha: string
  tipo: 'Bienes' | 'Servicios' | 'Obras' | 'Consultoría'
  adjuntos: number
  detalles: string
  mensajes: number
  status: 'Pendiente' | 'Aprobada' | 'En Proceso' | 'Completada' | 'Cancelada'
}

// Datos de ejemplo
const initialData: OrdenCompra[] = [
  {
    id: '1',
    numero: 'OC-2024-001',
    fecha: '2024-01-15',
    tipo: 'Bienes',
    adjuntos: 4,
    detalles: 'Compra de equipos de computación',
    mensajes: 3,
    status: 'Aprobada'
  },
  {
    id: '2',
    numero: 'OC-2024-002',
    fecha: '2024-01-16',
    tipo: 'Servicios',
    adjuntos: 2,
    detalles: 'Servicios de mantenimiento IT',
    mensajes: 5,
    status: 'En Proceso'
  },
  {
    id: '3',
    numero: 'OC-2024-003',
    fecha: '2024-01-17',
    tipo: 'Obras',
    adjuntos: 6,
    detalles: 'Remodelación de oficinas',
    mensajes: 2,
    status: 'Pendiente'
  },
  {
    id: '4',
    numero: 'OC-2024-004',
    fecha: '2024-01-18',
    tipo: 'Consultoría',
    adjuntos: 3,
    detalles: 'Consultoría en procesos empresariales',
    mensajes: 4,
    status: 'Completada'
  },
  {
    id: '5',
    numero: 'OC-2024-005',
    fecha: '2024-01-19',
    tipo: 'Bienes',
    adjuntos: 1,
    detalles: 'Suministros de oficina',
    mensajes: 1,
    status: 'Cancelada'
  },
  {
    id: '6',
    numero: 'OC-2024-006',
    fecha: '2024-01-20',
    tipo: 'Servicios',
    adjuntos: 5,
    detalles: 'Servicios de limpieza',
    mensajes: 3,
    status: 'Aprobada'
  },
  {
    id: '7',
    numero: 'OC-2024-007',
    fecha: '2024-01-21',
    tipo: 'Obras',
    adjuntos: 8,
    detalles: 'Construcción de almacén',
    mensajes: 6,
    status: 'En Proceso'
  },
  {
    id: '8',
    numero: 'OC-2024-008',
    fecha: '2024-01-22',
    tipo: 'Consultoría',
    adjuntos: 2,
    detalles: 'Auditoría financiera',
    mensajes: 2,
    status: 'Pendiente'
  }
]

export default function OrdenesComprasPage() {
  const router = useRouter()
  const [data, setData] = useState<OrdenCompra[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<OrdenCompra[]>([])

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('ordenes-compras')
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      setData(initialData)
      // Guardar datos iniciales en localStorage
      localStorage.setItem('ordenes-compras', JSON.stringify(initialData))
    }
  }, [])

  // Filtrar datos basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter(item =>
        item.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.detalles.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [data, searchTerm])

  // Función para guardar datos en localStorage
  const saveData = (newData: OrdenCompra[]) => {
    setData(newData)
    localStorage.setItem('ordenes-compras', JSON.stringify(newData))
  }

  // Función para agregar nueva orden
  const handleAddNew = () => {
    const newId = (data.length + 1).toString()
    const newOrden: OrdenCompra = {
      id: newId,
      numero: `OC-2024-${String(data.length + 1).padStart(3, '0')}`,
      fecha: new Date().toISOString().split('T')[0],
      tipo: 'Bienes',
      adjuntos: 0,
      detalles: 'Nueva orden de compra',
      mensajes: 0,
      status: 'Pendiente'
    }
    saveData([...data, newOrden])
  }

  // Función para manejar acciones de botones
  const handleAdjuntos = (id: string) => {
    console.log('Ver adjuntos para:', id)
    // Aquí puedes implementar la lógica para mostrar adjuntos
  }

  const handleDetalles = (id: string) => {
    console.log('Ver detalles para:', id)
    // Aquí puedes implementar la lógica para mostrar detalles
  }

  const handleMensajes = (id: string) => {
    console.log('Ver mensajes para:', id)
    // Aquí puedes implementar la lógica para mostrar mensajes
  }

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: 'numero' as keyof OrdenCompra,
      header: 'Nro Orden de Compra',
      cell: (value: string) => (
        <span className="font-medium text-blue-400">{value}</span>
      )
    },
    {
      key: 'fecha' as keyof OrdenCompra,
      header: 'Fecha',
      cell: (value: string) => (
        <span className="text-gray-200">{new Date(value).toLocaleDateString('es-ES')}</span>
      )
    },
    {
      key: 'tipo' as keyof OrdenCompra,
      header: 'Tipo de Orden',
      cell: (value: string) => {
        const colors = {
          'Bienes': 'bg-green-100 text-green-800',
          'Servicios': 'bg-blue-100 text-blue-800',
          'Obras': 'bg-orange-100 text-orange-800',
          'Consultoría': 'bg-purple-100 text-purple-800'
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        )
      }
    },
    {
      key: 'adjuntos' as keyof OrdenCompra,
      header: 'Adjuntos',
      cell: (value: number, row: OrdenCompra) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdjuntos(row.id)}
          className="flex items-center space-x-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
        >
          <Paperclip className="w-4 h-4" />
          <span>{value}</span>
        </Button>
      )
    },
    {
      key: 'detalles' as keyof OrdenCompra,
      header: 'Detalles',
      cell: (value: string) => (
        <span className="text-gray-200 max-w-xs truncate" title={value}>
          {value}
        </span>
      )
    },
    {
      key: 'mensajes' as keyof OrdenCompra,
      header: 'Mensajes',
      cell: (value: number, row: OrdenCompra) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMensajes(row.id)}
          className="flex items-center space-x-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{value}</span>
        </Button>
      )
    },
    {
      key: 'status' as keyof OrdenCompra,
      header: 'Status',
      cell: (value: string) => {
        const colors = {
          'Pendiente': 'bg-yellow-100 text-yellow-800',
          'Aprobada': 'bg-green-100 text-green-800',
          'En Proceso': 'bg-blue-100 text-blue-800',
          'Completada': 'bg-gray-100 text-gray-800',
          'Cancelada': 'bg-red-100 text-red-800'
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        )
      }
    },
    {
      key: 'id' as keyof OrdenCompra,
      header: 'Ver Detalles',
      cell: (value: string, row: OrdenCompra) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDetalles(row.id)}
          className="flex items-center space-x-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
        >
          <Eye className="w-4 h-4" />
          <span>Ver</span>
        </Button>
      )
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Órdenes de Compras</h2>
            <p className="text-gray-400">Gestiona las órdenes de compra de proveedores</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Button onClick={handleAddNew} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Orden
            </Button>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por número, tipo, detalles o status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={10}
        />
      </div>
    </div>
  )
}
