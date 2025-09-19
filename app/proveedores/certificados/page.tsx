"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Download,
  FileText,
  Calendar,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function CertificadosPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    periodo: '',
    año: '2024',
    desde: '',
    hasta: '',
    ciudad: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDownload = () => {
    console.log('Descargando certificado con datos:', formData)
    // Aquí puedes implementar la lógica de descarga
    alert('Funcionalidad de descarga implementada. Datos: ' + JSON.stringify(formData))
  }

  // Generar opciones de años (últimos 5 años)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  // Generar opciones de meses
  const months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Certificados</h2>
            <p className="text-gray-400">Genera y descarga certificados tributarios</p>
          </div>
        </div>
      </div>
          {/* Tarjeta de Certificados Tributarios */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Tributarios</h2>
              <p className="text-gray-400">Genera certificados tributarios para tus operaciones</p>
            </div>

            {/* Fila de controles */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-4 flex-wrap gap-4">
                {/* Texto estático */}
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Certificado de Retención de IVA</span>
                </div>

                {/* Select de Periodo */}
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="periodo" className="text-xs text-gray-400">Periodo</Label>
                  <Select value={formData.periodo} onValueChange={(value: string) => handleInputChange('periodo', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="semestral">Semestral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Select de Año */}
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="año" className="text-xs text-gray-400">Año</Label>
                  <Select value={formData.año} onValueChange={(value: string) => handleInputChange('año', value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Input Desde */}
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="desde" className="text-xs text-gray-400">Desde</Label>
                  <Input
                    id="desde"
                    type="text"
                    placeholder="01"
                    value={formData.desde}
                    onChange={(e) => handleInputChange('desde', e.target.value)}
                    className="w-20 bg-gray-600 border-gray-500 text-white"
                  />
                </div>

                {/* Input Hasta */}
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="hasta" className="text-xs text-gray-400">Hasta</Label>
                  <Input
                    id="hasta"
                    type="text"
                    placeholder="31"
                    value={formData.hasta}
                    onChange={(e) => handleInputChange('hasta', e.target.value)}
                    className="w-20 bg-gray-600 border-gray-500 text-white"
                  />
                </div>

                {/* Input Ciudad */}
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="ciudad" className="text-xs text-gray-400">Ciudad</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="ciudad"
                      type="text"
                      placeholder="Bogotá"
                      value={formData.ciudad}
                      onChange={(e) => handleInputChange('ciudad', e.target.value)}
                      className="w-32 pl-10 bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                </div>

                {/* Botón de Descarga */}
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs text-transparent">Espacio</Label>
                  <Button 
                    onClick={handleDownload}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-300 mb-1">Información del Certificado</h3>
                  <p className="text-xs text-gray-400">
                    El certificado de retención de IVA se genera según los parámetros seleccionados. 
                    Asegúrate de que todos los campos estén completos antes de descargar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección adicional para otros tipos de certificados */}
          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Otros Certificados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-green-400" />
                  <div>
                    <h4 className="text-white font-medium">Certificado de Ingresos</h4>
                    <p className="text-gray-400 text-sm">Genera certificado de ingresos anuales</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-purple-400" />
                  <div>
                    <h4 className="text-white font-medium">Certificado de Retenciones</h4>
                    <p className="text-gray-400 text-sm">Certificado de retenciones en la fuente</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-orange-400" />
                  <div>
                    <h4 className="text-white font-medium">Certificado de Renta</h4>
                    <p className="text-gray-400 text-sm">Certificado de declaración de renta</p>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  )
}
