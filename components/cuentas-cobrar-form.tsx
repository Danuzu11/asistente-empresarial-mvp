"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

interface CuentasCobrarFormProps {
  onSubmit: (data: Omit<CuentaCobrar, 'id' | 'numeroId' | 'creado'>) => void
  onCancel: () => void
}

export function CuentasCobrarForm({ onSubmit, onCancel }: CuentasCobrarFormProps) {
  const [formData, setFormData] = useState({
    fechaExpedicion: new Date().toISOString().split('T')[0],
    numeroDocumento: '',
    valor: '',
    tipoMoneda: 'COP' as 'COP' | 'USD' | 'EUR',
    documento: '',
    status: 'Pendiente' as 'Pendiente' | 'Enviada' | 'Pagada' | 'Vencida' | 'Cancelada'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.numeroDocumento.trim()) {
      newErrors.numeroDocumento = 'El número de documento es requerido'
    }

    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      newErrors.valor = 'El valor debe ser mayor a 0'
    }

    if (!formData.documento.trim()) {
      newErrors.documento = 'El tipo de documento es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({
        fechaExpedicion: formData.fechaExpedicion,
        numeroDocumento: formData.numeroDocumento,
        valor: parseFloat(formData.valor),
        tipoMoneda: formData.tipoMoneda,
        documento: formData.documento,
        status: formData.status
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha Expedición */}
        <div className="space-y-2">
          <Label htmlFor="fechaExpedicion" className="text-gray-300">
            Fecha de Expedición
          </Label>
          <Input
            id="fechaExpedicion"
            type="date"
            value={formData.fechaExpedicion}
            onChange={(e) => handleInputChange('fechaExpedicion', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>

        {/* Número de Documento */}
        <div className="space-y-2">
          <Label htmlFor="numeroDocumento" className="text-gray-300">
            Número de Documento *
          </Label>
          <Input
            id="numeroDocumento"
            type="text"
            placeholder="Ej: FAC-001-2024"
            value={formData.numeroDocumento}
            onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
          {errors.numeroDocumento && (
            <p className="text-red-400 text-sm">{errors.numeroDocumento}</p>
          )}
        </div>

        {/* Valor */}
        <div className="space-y-2">
          <Label htmlFor="valor" className="text-gray-300">
            Valor *
          </Label>
          <Input
            id="valor"
            type="number"
            placeholder="0"
            value={formData.valor}
            onChange={(e) => handleInputChange('valor', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            min="0"
            step="0.01"
          />
          {errors.valor && (
            <p className="text-red-400 text-sm">{errors.valor}</p>
          )}
        </div>

        {/* Tipo de Moneda */}
        <div className="space-y-2">
          <Label htmlFor="tipoMoneda" className="text-gray-300">
            Tipo de Moneda
          </Label>
          <select
            id="tipoMoneda"
            value={formData.tipoMoneda}
            onChange={(e) => handleInputChange('tipoMoneda', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="COP">COP - Pesos Colombianos</option>
            <option value="USD">USD - Dólares Estadounidenses</option>
            <option value="EUR">EUR - Euros</option>
          </select>
        </div>

        {/* Documento */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="documento" className="text-gray-300">
            Tipo de Documento *
          </Label>
          <Input
            id="documento"
            type="text"
            placeholder="Ej: Factura de Venta, Factura de Servicios"
            value={formData.documento}
            onChange={(e) => handleInputChange('documento', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
          {errors.documento && (
            <p className="text-red-400 text-sm">{errors.documento}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="status" className="text-gray-300">
            Estado
          </Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Enviada">Enviada</option>
            <option value="Pagada">Pagada</option>
            <option value="Vencida">Vencida</option>
            <option value="Cancelada">Cancelada</option>
          </select>
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
          Agregar Cuenta por Cobrar
        </Button>
      </div>
    </form>
  )
}
