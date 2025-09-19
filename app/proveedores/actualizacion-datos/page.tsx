"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Upload,
  FileText,
  Eye,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Tipos de datos
interface Documento {
  id: string
  nombre: string
  archivo: File | null
  ultimaActualizacion: string
  estado: 'actualizado' | 'pendiente' | 'error'
}

// Datos iniciales
const documentosIniciales: Documento[] = [
  {
    id: '1',
    nombre: 'RUT',
    archivo: null,
    ultimaActualizacion: '2024-01-15',
    estado: 'actualizado'
  },
  {
    id: '2',
    nombre: 'Cámara de Comercio',
    archivo: null,
    ultimaActualizacion: '2024-01-10',
    estado: 'actualizado'
  },
  {
    id: '3',
    nombre: 'Certificado Bancario',
    archivo: null,
    ultimaActualizacion: '2024-01-05',
    estado: 'pendiente'
  },
  {
    id: '4',
    nombre: 'Certificado de Existencia',
    archivo: null,
    ultimaActualizacion: '2023-12-20',
    estado: 'error'
  },
  {
    id: '5',
    nombre: 'Certificado de Representación Legal',
    archivo: null,
    ultimaActualizacion: '2024-01-12',
    estado: 'actualizado'
  },
  {
    id: '6',
    nombre: 'Estados Financieros',
    archivo: null,
    ultimaActualizacion: '2023-11-30',
    estado: 'pendiente'
  }
]

export default function ActualizacionDatosPage() {
  const router = useRouter()
  const [documentos, setDocumentos] = useState<Documento[]>(documentosIniciales)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const handleFileSelect = (documentoId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setDocumentos(prev => prev.map(doc => 
        doc.id === documentoId 
          ? { ...doc, archivo: file, estado: 'pendiente' as const }
          : doc
      ))
    }
  }

  const handleActualizar = (documentoId: string) => {
    const documento = documentos.find(doc => doc.id === documentoId)
    if (documento?.archivo) {
      // Simular actualización
      setDocumentos(prev => prev.map(doc => 
        doc.id === documentoId 
          ? { 
              ...doc, 
              ultimaActualizacion: new Date().toISOString().split('T')[0],
              estado: 'actualizado' as const,
              archivo: null
            }
          : doc
      ))
      
      // Limpiar el input de archivo
      if (fileInputRefs.current[documentoId]) {
        fileInputRefs.current[documentoId]!.value = ''
      }
      
      console.log(`Actualizando ${documento.nombre} con archivo:`, documento.archivo.name)
    }
  }

  const handleVerDocumento = (documentoId: string) => {
    const documento = documentos.find(doc => doc.id === documentoId)
    console.log(`Ver documento: ${documento?.nombre}`)
    // Aquí puedes implementar la lógica para ver el documento
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'actualizado':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'pendiente':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'actualizado':
        return 'text-green-400'
      case 'pendiente':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Actualización de Datos</h2>
            <p className="text-gray-400">Gestiona y actualiza los documentos de tu empresa</p>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        {/* Tabla de documentos */}
        <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Documento</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Actualizar</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Ver</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Última Actualización</th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map((documento) => (
                    <tr key={documento.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      {/* Columna Documento */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-medium">{documento.nombre}</span>
                        </div>
                      </td>

                      {/* Columna Actualizar */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <Input
                              ref={(el) => { fileInputRefs.current[documento.id] = el }}
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileSelect(documento.id, e)}
                              className="hidden"
                              id={`file-${documento.id}`}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRefs.current[documento.id]?.click()}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Seleccionar
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleActualizar(documento.id)}
                            disabled={!documento.archivo}
                            className="border-blue-500 text-blue-400 hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Actualizar
                          </Button>
                        </div>
                        {documento.archivo && (
                          <p className="text-xs text-green-400 mt-1">
                            Archivo seleccionado: {documento.archivo.name}
                          </p>
                        )}
                      </td>

                      {/* Columna Ver */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerDocumento(documento.id)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <div className="flex items-center space-x-1">
                            {getEstadoIcon(documento.estado)}
                            <span className={`text-xs ${getEstadoColor(documento.estado)}`}>
                              {documento.estado === 'actualizado' ? 'Actualizado' : 
                               documento.estado === 'pendiente' ? 'Pendiente' : 'Error'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Columna Última Actualización */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">
                            {new Date(documento.ultimaActualizacion).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-300 mb-1">Información sobre la Actualización</h3>
                  <p className="text-xs text-gray-400">
                    Los documentos deben estar en formato PDF, DOC, DOCX, JPG, JPEG o PNG. 
                    El tamaño máximo por archivo es de 10MB. Una vez actualizado, el documento 
                    será revisado y aprobado por el equipo correspondiente.
                  </p>
                </div>
              </div>
        </div>
      </div>
    </div>
  )
}
