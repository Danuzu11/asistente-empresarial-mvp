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
interface PeticionOferta {
  id: string
  numero: string
  fecha: string
  proveedor: string
  estado: 'Pendiente' | 'En Proceso' | 'Completada' | 'Cancelada'
  monto: number
  adjuntos: number
  detalles: string
  mensajes: number
}

// Datos de ejemplo
const initialData: PeticionOferta[] = [
  {
    id: '1',
    numero: 'PO-2024-001',
    fecha: '2024-01-15',
    proveedor: 'Empresa ABC S.A.S.',
    estado: 'Pendiente',
    monto: 1500000,
    adjuntos: 3,
    detalles: 'Cotización de equipos de oficina',
    mensajes: 2
  },
  {
    id: '2',
    numero: 'PO-2024-002',
    fecha: '2024-01-16',
    proveedor: 'Tecnología XYZ Ltda.',
    estado: 'En Proceso',
    monto: 2500000,
    adjuntos: 5,
    detalles: 'Servicios de consultoría IT',
    mensajes: 4
  },
  {
    id: '3',
    numero: 'PO-2024-003',
    fecha: '2024-01-17',
    proveedor: 'Suministros Generales S.A.',
    estado: 'Completada',
    monto: 800000,
    adjuntos: 2,
    detalles: 'Materiales de oficina',
    mensajes: 1
  },
  {
    id: '4',
    numero: 'PO-2024-004',
    fecha: '2024-01-18',
    proveedor: 'Construcciones Modernas',
    estado: 'Pendiente',
    monto: 5000000,
    adjuntos: 7,
    detalles: 'Obras de remodelación',
    mensajes: 3
  },
  {
    id: '5',
    numero: 'PO-2024-005',
    fecha: '2024-01-19',
    proveedor: 'Marketing Digital Pro',
    estado: 'En Proceso',
    monto: 1200000,
    adjuntos: 4,
    detalles: 'Campaña publicitaria',
    mensajes: 6
  }
]

export default function PeticionesOfertaPage() {
  const router = useRouter()
  const [data, setData] = useState<PeticionOferta[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<PeticionOferta[]>([])

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('peticiones-oferta')
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      setData(initialData)
      // Guardar datos iniciales en localStorage
      localStorage.setItem('peticiones-oferta', JSON.stringify(initialData))
    }
  }, [])

  // Filtrar datos basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter(item =>
        item.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.detalles.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [data, searchTerm])

  // Función para guardar datos en localStorage
  const saveData = (newData: PeticionOferta[]) => {
    setData(newData)
    localStorage.setItem('peticiones-oferta', JSON.stringify(newData))
  }

  // Función para agregar nueva petición
  const handleAddNew = () => {
    const newId = (data.length + 1).toString()
    const newPeticion: PeticionOferta = {
      id: newId,
      numero: `PO-2024-${String(data.length + 1).padStart(3, '0')}`,
      fecha: new Date().toISOString().split('T')[0],
      proveedor: 'Nuevo Proveedor',
      estado: 'Pendiente',
      monto: 0,
      adjuntos: 0,
      detalles: 'Nueva petición de oferta',
      mensajes: 0
    }
    saveData([...data, newPeticion])
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
      key: 'numero' as keyof PeticionOferta,
      header: 'Número',
      cell: (value: string) => (
        <span className="font-medium text-blue-600">{value}</span>
      )
    },
    {
      key: 'fecha' as keyof PeticionOferta,
      header: 'Fecha',
      cell: (value: string) => (
        <span>{new Date(value).toLocaleDateString('es-ES')}</span>
      )
    },
    {
      key: 'proveedor' as keyof PeticionOferta,
      header: 'Proveedor'
    },
    {
      key: 'estado' as keyof PeticionOferta,
      header: 'Estado',
      cell: (value: string) => {
        const colors = {
          'Pendiente': 'bg-yellow-100 text-yellow-800',
          'En Proceso': 'bg-blue-100 text-blue-800',
          'Completada': 'bg-green-100 text-green-800',
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
      key: 'monto' as keyof PeticionOferta,
      header: 'Monto',
      cell: (value: number) => (
        <span className="font-medium">
          ${value.toLocaleString('es-ES')}
        </span>
      )
    },
    {
      key: 'detalles' as keyof PeticionOferta,
      header: 'Detalles'
    },
    {
      key: 'adjuntos' as keyof PeticionOferta,
      header: 'Adjuntos',
      cell: (value: number, row: PeticionOferta) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdjuntos(row.id)}
          className="flex items-center space-x-1 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Paperclip className="w-4 h-4" />
          <span>{value}</span>
        </Button>
      )
    },
    {
      key: 'id' as keyof PeticionOferta,
      header: 'Ver Detalles',
      cell: (value: string, row: PeticionOferta) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDetalles(row.id)}
          className="flex items-center space-x-1 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Eye className="w-4 h-4" />
          <span>Ver</span>
        </Button>
      )
    },
    {
      key: 'mensajes' as keyof PeticionOferta,
      header: 'Mensajes',
      cell: (value: number, row: PeticionOferta) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMensajes(row.id)}
          className="flex items-center space-x-1 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{value}</span>
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
            <h2 className="text-3xl font-bold text-white mb-2">Peticiones de Oferta</h2>
            <p className="text-gray-400">Gestiona las peticiones de oferta de proveedores</p>
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
              Nueva Petición
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
                placeholder="Buscar por número, proveedor o detalles..."
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
