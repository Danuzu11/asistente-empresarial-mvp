"use client"

import { useState } from 'react'
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

interface PqrsData {
  tipo: 'Petición' | 'Queja' | 'Reclamo' | 'Sugerencia' | 'Denuncia' | 'Felicitación'
  mensaje: string
  archivo: File | null
}

interface PqrsFormProps {
  onSubmit: (data: PqrsData) => void
  onCancel: () => void
}

export function PqrsForm({ onSubmit, onCancel }: PqrsFormProps) {
  const [formData, setFormData] = useState<PqrsData>({
    tipo: 'Petición',
    mensaje: '',
    archivo: null
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido'
    }

    if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFormData(prev => ({ ...prev, archivo: file || null }))
  }

  const tiposPqrs = [
    'Petición',
    'Queja', 
    'Reclamo',
    'Sugerencia',
    'Denuncia',
    'Felicitación'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Tipo de PQRS */}
        <div className="space-y-2">
          <Label htmlFor="tipo" className="text-gray-300">
            Tipo de PQRS *
          </Label>
          <Select value={formData.tipo} onValueChange={(value: string) => handleInputChange('tipo', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tiposPqrs.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <Label htmlFor="mensaje" className="text-gray-300">
            Mensaje *
          </Label>
          <textarea
            id="mensaje"
            value={formData.mensaje}
            onChange={(e) => handleInputChange('mensaje', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-vertical"
            placeholder="Describe tu petición, queja, reclamo, sugerencia, denuncia o felicitación..."
            rows={5}
          />
          {errors.mensaje && (
            <p className="text-red-400 text-sm">{errors.mensaje}</p>
          )}
        </div>

        {/* Archivo adjunto */}
        <div className="space-y-2">
          <Label htmlFor="archivo" className="text-gray-300">
            Archivo adjunto (opcional)
          </Label>
          <Input
            id="archivo"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
          />
          {formData.archivo && (
            <p className="text-green-400 text-sm">
              Archivo seleccionado: {formData.archivo.name}
            </p>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Enviar PQRS
        </Button>
      </div>
    </form>
  )
}
