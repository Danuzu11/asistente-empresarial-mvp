"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Plus,
  FileText,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { PqrsForm } from '@/components/pqrs-form'

// Tipos de datos
interface Pqrs {
  id: string
  tipo: 'Petición' | 'Queja' | 'Reclamo' | 'Sugerencia' | 'Denuncia' | 'Felicitación'
  mensaje: string
  archivo: string | null
  status: 'Enviado' | 'En Proceso' | 'Respondido' | 'Cerrado'
  fecha: string
}

// Datos de ejemplo
const initialData: Pqrs[] = [
  {
    id: '1',
    tipo: 'Petición',
    mensaje: 'Solicito información sobre los requisitos para actualizar los datos de mi empresa en el sistema.',
    archivo: 'documento_requisitos.pdf',
    status: 'Respondido',
    fecha: '2024-01-15'
  },
  {
    id: '2',
    tipo: 'Queja',
    mensaje: 'El tiempo de respuesta para la aprobación de documentos es muy largo, necesitamos una mejora en este proceso.',
    archivo: null,
    status: 'En Proceso',
    fecha: '2024-01-16'
  },
  {
    id: '3',
    tipo: 'Reclamo',
    mensaje: 'Mi solicitud de actualización de datos fue rechazada sin una explicación clara de los motivos.',
    archivo: 'solicitud_rechazada.pdf',
    status: 'Enviado',
    fecha: '2024-01-17'
  },
  {
    id: '4',
    tipo: 'Sugerencia',
    mensaje: 'Sugiero implementar notificaciones por email cuando el estado de un documento cambie.',
    archivo: null,
    status: 'Cerrado',
    fecha: '2024-01-18'
  },
  {
    id: '5',
    tipo: 'Denuncia',
    mensaje: 'He detectado un posible error en el cálculo de retenciones en mi último certificado.',
    archivo: 'certificado_error.pdf',
    status: 'En Proceso',
    fecha: '2024-01-19'
  },
  {
    id: '6',
    tipo: 'Felicitación',
    mensaje: 'Quiero felicitar al equipo por la excelente atención y rapidez en la resolución de mi caso anterior.',
    archivo: null,
    status: 'Respondido',
    fecha: '2024-01-20'
  }
]

export default function PqrsPage() {
  const router = useRouter()
  const [data, setData] = useState<Pqrs[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('pqrs-data')
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      setData(initialData)
      // Guardar datos iniciales en localStorage
      localStorage.setItem('pqrs-data', JSON.stringify(initialData))
    }
  }, [])

  // Función para guardar datos en localStorage
  const saveData = (newData: Pqrs[]) => {
    setData(newData)
    localStorage.setItem('pqrs-data', JSON.stringify(newData))
  }

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Función para manejar el envío del formulario
  const handleFormSubmit = (formData: { tipo: string; mensaje: string; archivo: File | null }) => {
    const newId = (data.length + 1).toString()
    const newPqrs: Pqrs = {
      id: newId,
      tipo: formData.tipo as Pqrs['tipo'],
      mensaje: formData.mensaje,
      archivo: formData.archivo ? formData.archivo.name : null,
      status: 'Enviado',
      fecha: new Date().toISOString().split('T')[0]
    }
    saveData([...data, newPqrs])
    setIsModalOpen(false)
  }

  // Función para manejar acciones
  const handleVerDetalles = (id: string) => {
    console.log('Ver detalles del PQRS:', id)
    // Aquí puedes implementar la lógica para mostrar detalles
  }

  const handleDescargarArchivo = (id: string) => {
    console.log('Descargar archivo del PQRS:', id)
    // Aquí puedes implementar la lógica para descargar archivos
  }

  // Función para obtener el color del status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enviado':
        return 'bg-blue-100 text-blue-800'
      case 'En Proceso':
        return 'bg-yellow-100 text-yellow-800'
      case 'Respondido':
        return 'bg-green-100 text-green-800'
      case 'Cerrado':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Función para obtener el color del tipo
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Petición':
        return 'bg-blue-100 text-blue-800'
      case 'Queja':
        return 'bg-orange-100 text-orange-800'
      case 'Reclamo':
        return 'bg-red-100 text-red-800'
      case 'Sugerencia':
        return 'bg-purple-100 text-purple-800'
      case 'Denuncia':
        return 'bg-red-100 text-red-800'
      case 'Felicitación':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: 'tipo' as keyof Pqrs,
      header: 'Tipo de PQRS',
      cell: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(value)}`}>
          {value}
        </span>
      )
    },
    {
      key: 'mensaje' as keyof Pqrs,
      header: 'Mensaje',
      cell: (value: string) => (
        <span className="text-gray-200 max-w-xs truncate" title={value}>
          {value}
        </span>
      )
    },
    {
      key: 'archivo' as keyof Pqrs,
      header: 'Archivo',
      cell: (value: string | null, row: Pqrs) => (
        value ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDescargarArchivo(row.id)}
            className="flex items-center space-x-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
          >
            <Download className="w-4 h-4" />
            <span className="max-w-xs truncate">{value}</span>
          </Button>
        ) : (
          <span className="text-gray-400 text-sm">Sin archivo</span>
        )
      )
    },
    {
      key: 'status' as keyof Pqrs,
      header: 'Status',
      cell: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value}
        </span>
      )
    },
    {
      key: 'fecha' as keyof Pqrs,
      header: 'Fecha',
      cell: (value: string) => (
        <span className="text-gray-200">{new Date(value).toLocaleDateString('es-ES')}</span>
      )
    },
    {
      key: 'id' as keyof Pqrs,
      header: 'Acciones',
      cell: (value: string, row: Pqrs) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleVerDetalles(row.id)}
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
            <h2 className="text-3xl font-bold text-white mb-2">PQRS</h2>
            <p className="text-gray-400">Gestiona tus peticiones, quejas, reclamos y sugerencias</p>
          </div>
          <Button 
            onClick={handleOpenModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Enviar un nuevo PQRS
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
          <MessageSquare className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-300 mb-1">Información sobre PQRS</h3>
            <p className="text-xs text-gray-400">
              Los PQRS son procesados en un plazo máximo de 15 días hábiles. 
              Recibirás notificaciones por email sobre el estado de tu solicitud. 
              Para casos urgentes, contacta directamente al equipo de soporte.
            </p>
          </div>
        </div>
      </div>

      {/* Modal para enviar nuevo PQRS */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Enviar PQRS"
      >
        <PqrsForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  )
}
