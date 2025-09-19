"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FileText, 
  Eye, 
  MessageSquare, 
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  DollarSign
} from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { CuentasCobrarForm } from '@/components/cuentas-cobrar-form'

// Tipos de datos
interface CuentaCobrar {
  id: string
  numeroId: string
  fechaExpedicion: string
  numeroDocumento: string
  valor: number
  tipoMoneda: 'COP' | 'USD' | 'EUR'
  documento: string
  creado: string
  status: 'Pendiente' | 'Enviada' | 'Pagada' | 'Vencida' | 'Cancelada'
}

// Datos de ejemplo
const initialData: CuentaCobrar[] = [
  {
    id: '1',
    numeroId: 'CC-2024-001',
    fechaExpedicion: '2024-01-15',
    numeroDocumento: 'FAC-001-2024',
    valor: 2500000,
    tipoMoneda: 'COP',
    documento: 'Factura de Venta',
    creado: '2024-01-15',
    status: 'Pendiente'
  },
  {
    id: '2',
    numeroId: 'CC-2024-002',
    fechaExpedicion: '2024-01-16',
    numeroDocumento: 'FAC-002-2024',
    valor: 1500,
    tipoMoneda: 'USD',
    documento: 'Factura de Servicios',
    creado: '2024-01-16',
    status: 'Enviada'
  },
  {
    id: '3',
    numeroId: 'CC-2024-003',
    fechaExpedicion: '2024-01-17',
    numeroDocumento: 'FAC-003-2024',
    valor: 3200000,
    tipoMoneda: 'COP',
    documento: 'Factura de Productos',
    creado: '2024-01-17',
    status: 'Pagada'
  },
  {
    id: '4',
    numeroId: 'CC-2024-004',
    fechaExpedicion: '2024-01-18',
    numeroDocumento: 'FAC-004-2024',
    valor: 800,
    tipoMoneda: 'EUR',
    documento: 'Factura de Consultoría',
    creado: '2024-01-18',
    status: 'Vencida'
  },
  {
    id: '5',
    numeroId: 'CC-2024-005',
    fechaExpedicion: '2024-01-19',
    numeroDocumento: 'FAC-005-2024',
    valor: 1800000,
    tipoMoneda: 'COP',
    documento: 'Factura de Mantenimiento',
    creado: '2024-01-19',
    status: 'Cancelada'
  },
  {
    id: '6',
    numeroId: 'CC-2024-006',
    fechaExpedicion: '2024-01-20',
    numeroDocumento: 'FAC-006-2024',
    valor: 2200,
    tipoMoneda: 'USD',
    documento: 'Factura de Licencias',
    creado: '2024-01-20',
    status: 'Pendiente'
  },
  {
    id: '7',
    numeroId: 'CC-2024-007',
    fechaExpedicion: '2024-01-21',
    numeroDocumento: 'FAC-007-2024',
    valor: 4500000,
    tipoMoneda: 'COP',
    documento: 'Factura de Equipos',
    creado: '2024-01-21',
    status: 'Enviada'
  },
  {
    id: '8',
    numeroId: 'CC-2024-008',
    fechaExpedicion: '2024-01-22',
    numeroDocumento: 'FAC-008-2024',
    valor: 1200,
    tipoMoneda: 'EUR',
    documento: 'Factura de Capacitación',
    creado: '2024-01-22',
    status: 'Pagada'
  },
  {
    id: '9',
    numeroId: 'CC-2024-009',
    fechaExpedicion: '2024-01-23',
    numeroDocumento: 'FAC-009-2024',
    valor: 2800000,
    tipoMoneda: 'COP',
    documento: 'Factura de Suministros',
    creado: '2024-01-23',
    status: 'Vencida'
  },
  {
    id: '10',
    numeroId: 'CC-2024-010',
    fechaExpedicion: '2024-01-24',
    numeroDocumento: 'FAC-010-2024',
    valor: 950,
    tipoMoneda: 'USD',
    documento: 'Factura de Soporte',
    creado: '2024-01-24',
    status: 'Pendiente'
  }
]

export default function CuentasCobrarPage() {
  const router = useRouter()
  const [data, setData] = useState<CuentaCobrar[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<CuentaCobrar[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('cuentas-cobrar')
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      setData(initialData)
      // Guardar datos iniciales en localStorage
      localStorage.setItem('cuentas-cobrar', JSON.stringify(initialData))
    }
  }, [])

  // Filtrar datos basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter(item =>
        item.numeroId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipoMoneda.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [data, searchTerm])

  // Función para guardar datos en localStorage
  const saveData = (newData: CuentaCobrar[]) => {
    setData(newData)
    localStorage.setItem('cuentas-cobrar', JSON.stringify(newData))
  }

  // Función para abrir el modal
  const handleAddNew = () => {
    setIsModalOpen(true)
  }

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Función para manejar el envío del formulario
  const handleFormSubmit = (formData: Omit<CuentaCobrar, 'id' | 'numeroId' | 'creado'>) => {
    const newId = (data.length + 1).toString()
    const newCuenta: CuentaCobrar = {
      id: newId,
      numeroId: `CC-2024-${String(data.length + 1).padStart(3, '0')}`,
      creado: new Date().toISOString().split('T')[0],
      ...formData
    }
    saveData([...data, newCuenta])
    setIsModalOpen(false)
  }

  // Función para manejar acciones de botones
  const handleVerDocumento = (id: string) => {
    console.log('Ver documento para:', id)
    // Aquí puedes implementar la lógica para mostrar el documento
  }

  const handleVerDetalles = (id: string) => {
    console.log('Ver detalles para:', id)
    // Aquí puedes implementar la lógica para mostrar detalles
  }

  const handleVerMensajes = (id: string) => {
    console.log('Ver mensajes para:', id)
    // Aquí puedes implementar la lógica para mostrar mensajes
  }

  // Función para formatear valores según la moneda
  const formatValue = (valor: number, tipoMoneda: string) => {
    const formatters = {
      'COP': (val: number) => `$${val.toLocaleString('es-ES')}`,
      'USD': (val: number) => `$${val.toLocaleString('en-US')}`,
      'EUR': (val: number) => `€${val.toLocaleString('es-ES')}`
    }
    return formatters[tipoMoneda as keyof typeof formatters]?.(valor) || valor.toString()
  }

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: 'numeroId' as keyof CuentaCobrar,
      header: 'Nro ID',
      cell: (value: string) => (
        <span className="font-medium text-blue-400">{value}</span>
      )
    },
    {
      key: 'fechaExpedicion' as keyof CuentaCobrar,
      header: 'Fecha Expedición',
      cell: (value: string) => (
        <span className="text-gray-200">{new Date(value).toLocaleDateString('es-ES')}</span>
      )
    },
    {
      key: 'numeroDocumento' as keyof CuentaCobrar,
      header: 'Nro de Documento',
      cell: (value: string) => (
        <span className="text-gray-200 font-medium">{value}</span>
      )
    },
    {
      key: 'valor' as keyof CuentaCobrar,
      header: 'Valor',
      cell: (value: number, row: CuentaCobrar) => (
        <span className="font-medium text-green-400">
          {formatValue(value, row.tipoMoneda)}
        </span>
      )
    },
    {
      key: 'tipoMoneda' as keyof CuentaCobrar,
      header: 'Tipo de Moneda',
      cell: (value: string) => {
        const colors = {
          'COP': 'bg-green-100 text-green-800',
          'USD': 'bg-blue-100 text-blue-800',
          'EUR': 'bg-purple-100 text-purple-800'
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        )
      }
    },
    {
      key: 'documento' as keyof CuentaCobrar,
      header: 'Documento',
      cell: (value: string, row: CuentaCobrar) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleVerDocumento(row.id)}
          className="flex items-center space-x-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
        >
          <FileText className="w-4 h-4" />
          <span className="max-w-xs truncate">{value}</span>
        </Button>
      )
    },
    {
      key: 'creado' as keyof CuentaCobrar,
      header: 'Creado',
      cell: (value: string) => (
        <span className="text-gray-200">{new Date(value).toLocaleDateString('es-ES')}</span>
      )
    },
    {
      key: 'status' as keyof CuentaCobrar,
      header: 'Status/Respuesta',
      cell: (value: string) => {
        const colors = {
          'Pendiente': 'bg-yellow-100 text-yellow-800',
          'Enviada': 'bg-blue-100 text-blue-800',
          'Pagada': 'bg-green-100 text-green-800',
          'Vencida': 'bg-red-100 text-red-800',
          'Cancelada': 'bg-gray-100 text-gray-800'
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        )
      }
    },
    {
      key: 'id' as keyof CuentaCobrar,
      header: 'Acciones',
      cell: (value: string, row: CuentaCobrar) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVerDetalles(row.id)}
            className="flex items-center space-x-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
          >
            <Eye className="w-4 h-4" />
            <span>Ver</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVerMensajes(row.id)}
            className="flex items-center space-x-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
          >
            <MessageSquare className="w-4 h-4" />
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
            <h2 className="text-3xl font-bold text-white mb-2">Cuentas por Cobrar</h2>
            <p className="text-gray-400">Gestiona las cuentas por cobrar de proveedores</p>
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
              Agregar Cuentas por Cobrar
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
                placeholder="Buscar por ID, documento, tipo de moneda o status..."
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

      {/* Modal para agregar nueva cuenta por cobrar */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Agregar Nueva Cuenta por Cobrar"
      >
        <CuentasCobrarForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  )
}
