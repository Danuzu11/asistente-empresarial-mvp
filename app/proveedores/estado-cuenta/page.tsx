"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FileText,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download
} from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'

// Tipos de datos
interface EstadoCuenta {
  id: string
  documento: string
  fechaEmision: string
  valor: number
  saldo: number
  status: 'Pagado' | 'Pendiente' | 'Vencido' | 'Cancelado'
  tipoDocumento: 'Factura' | 'Nota Crédito' | 'Nota Débito' | 'Recibo'
}

// Datos de ejemplo
const initialData: EstadoCuenta[] = [
  {
    id: '1',
    documento: 'FAC-2024-001',
    fechaEmision: '2024-01-15',
    valor: 2500000,
    saldo: 0,
    status: 'Pagado',
    tipoDocumento: 'Factura'
  },
  {
    id: '2',
    documento: 'FAC-2024-002',
    fechaEmision: '2024-01-16',
    valor: 1800000,
    saldo: 1800000,
    status: 'Pendiente',
    tipoDocumento: 'Factura'
  },
  {
    id: '3',
    documento: 'NC-2024-001',
    fechaEmision: '2024-01-17',
    valor: 500000,
    saldo: 0,
    status: 'Pagado',
    tipoDocumento: 'Nota Crédito'
  },
  {
    id: '4',
    documento: 'FAC-2024-003',
    fechaEmision: '2024-01-18',
    valor: 3200000,
    saldo: 3200000,
    status: 'Vencido',
    tipoDocumento: 'Factura'
  },
  {
    id: '5',
    documento: 'ND-2024-001',
    fechaEmision: '2024-01-19',
    valor: 200000,
    saldo: 0,
    status: 'Pagado',
    tipoDocumento: 'Nota Débito'
  },
  {
    id: '6',
    documento: 'FAC-2024-004',
    fechaEmision: '2024-01-20',
    valor: 1500000,
    saldo: 1500000,
    status: 'Pendiente',
    tipoDocumento: 'Factura'
  },
  {
    id: '7',
    documento: 'REC-2024-001',
    fechaEmision: '2024-01-21',
    valor: 800000,
    saldo: 0,
    status: 'Pagado',
    tipoDocumento: 'Recibo'
  },
  {
    id: '8',
    documento: 'FAC-2024-005',
    fechaEmision: '2024-01-22',
    valor: 4500000,
    saldo: 4500000,
    status: 'Vencido',
    tipoDocumento: 'Factura'
  },
  {
    id: '9',
    documento: 'FAC-2024-006',
    fechaEmision: '2024-01-23',
    valor: 1200000,
    saldo: 0,
    status: 'Cancelado',
    tipoDocumento: 'Factura'
  },
  {
    id: '10',
    documento: 'FAC-2024-007',
    fechaEmision: '2024-01-24',
    valor: 2800000,
    saldo: 2800000,
    status: 'Pendiente',
    tipoDocumento: 'Factura'
  }
]

export default function EstadoCuentaPage() {
  const router = useRouter()
  const [data, setData] = useState<EstadoCuenta[]>([])

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('estado-cuenta-data')
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      setData(initialData)
      // Guardar datos iniciales en localStorage
      localStorage.setItem('estado-cuenta-data', JSON.stringify(initialData))
    }
  }, [])

  // Función para guardar datos en localStorage
  const saveData = (newData: EstadoCuenta[]) => {
    setData(newData)
    localStorage.setItem('estado-cuenta-data', JSON.stringify(newData))
  }

  // Función para manejar acciones
  const handleVerDocumento = (id: string) => {
    console.log('Ver documento:', id)
    // Aquí puedes implementar la lógica para ver el documento
  }

  const handleDescargarDocumento = (id: string) => {
    console.log('Descargar documento:', id)
    // Aquí puedes implementar la lógica para descargar el documento
  }

  // Función para formatear valores monetarios
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value)
  }

  // Función para obtener el color del status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pagado':
        return 'bg-green-100 text-green-800'
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'Vencido':
        return 'bg-red-100 text-red-800'
      case 'Cancelado':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Función para obtener el ícono del status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pagado':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'Pendiente':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'Vencido':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'Cancelado':
        return <XCircle className="w-4 h-4 text-gray-400" />
      default:
        return null
    }
  }

  // Función para obtener el color del tipo de documento
  const getTipoDocumentoColor = (tipo: string) => {
    switch (tipo) {
      case 'Factura':
        return 'bg-blue-100 text-blue-800'
      case 'Nota Crédito':
        return 'bg-green-100 text-green-800'
      case 'Nota Débito':
        return 'bg-orange-100 text-orange-800'
      case 'Recibo':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: 'documento' as keyof EstadoCuenta,
      header: 'Documento',
      cell: (value: string, row: EstadoCuenta) => (
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <div>
            <span className="font-medium text-white">{value}</span>
            <div className="text-xs">
              <span className={`px-1 py-0.5 rounded text-xs ${getTipoDocumentoColor(row.tipoDocumento)}`}>
                {row.tipoDocumento}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'fechaEmision' as keyof EstadoCuenta,
      header: 'Fecha de Emisión',
      cell: (value: string) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-200">{new Date(value).toLocaleDateString('es-ES')}</span>
        </div>
      )
    },
    {
      key: 'valor' as keyof EstadoCuenta,
      header: 'Valor',
      cell: (value: number) => (
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="font-medium text-green-400">{formatCurrency(value)}</span>
        </div>
      )
    },
    {
      key: 'saldo' as keyof EstadoCuenta,
      header: 'Saldo',
      cell: (value: number) => (
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className={`font-medium ${value === 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(value)}
          </span>
        </div>
      )
    },
    {
      key: 'status' as keyof EstadoCuenta,
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
      key: 'id' as keyof EstadoCuenta,
      header: 'Acciones',
      cell: (value: string, row: EstadoCuenta) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVerDocumento(row.id)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDescargarDocumento(row.id)}
            className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ]

  // Calcular totales
  const totalValor = data.reduce((sum, item) => sum + item.valor, 0)
  const totalSaldo = data.reduce((sum, item) => sum + item.saldo, 0)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Estado de Cuenta</h2>
            <p className="text-gray-400">Consulta el estado de tus documentos y saldos</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Total Valor</div>
            <div className="text-lg font-bold text-green-400">{formatCurrency(totalValor)}</div>
          </div>
        </div>
      </div>

      {/* Resumen de saldos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Saldo Total</p>
              <p className="text-2xl font-bold text-red-400">{formatCurrency(totalSaldo)}</p>
            </div>
            <CreditCard className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Documentos Pagados</p>
              <p className="text-2xl font-bold text-green-400">
                {data.filter(item => item.status === 'Pagado').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Documentos Pendientes</p>
              <p className="text-2xl font-bold text-yellow-400">
                {data.filter(item => item.status === 'Pendiente').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
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
          <FileText className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-300 mb-1">Información del Estado de Cuenta</h3>
            <p className="text-xs text-gray-400">
              El estado de cuenta muestra todos los documentos emitidos y su estado de pago. 
              Los saldos pendientes y vencidos requieren atención inmediata. 
              Para consultas específicas, contacta al área de facturación.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
