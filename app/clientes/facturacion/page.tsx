"use client"

import { useState } from 'react'
import { 
  Receipt, 
  Search, 
  Filter,
  Calendar,
  Download,
  Eye,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  FileText,
  TrendingUp,
  BarChart3
} from 'lucide-react'

export default function ClientesFacturacionPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [yearFilter, setYearFilter] = useState('2024')
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

  const statuses = ['Todos', 'Pagada', 'Pendiente', 'Vencida', 'Cancelada']
  const years = ['2024', '2023', '2022']

  const invoices = [
    {
      id: "FAC-2024-009",
      number: "000009",
      date: "2024-09-01",
      dueDate: "2024-09-30",
      paidDate: "2024-09-28",
      status: "Pagada",
      period: "Agosto 2024",
      amount: 3500000,
      tax: 665000,
      total: 4165000,
      services: [
        { name: "Soporte Técnico 24/7", amount: 3500000, quantity: 1, unit: "mes" }
      ],
      paymentMethod: "Transferencia Bancaria",
      reference: "TRF-2024-0928-001"
    },
    {
      id: "FAC-2024-008",
      number: "000008",
      date: "2024-08-01",
      dueDate: "2024-08-30",
      paidDate: "2024-08-25",
      status: "Pagada",
      period: "Julio 2024",
      amount: 25000000,
      tax: 4750000,
      total: 29750000,
      services: [
        { name: "Consultoría en Transformación Digital", amount: 25000000, quantity: 1, unit: "proyecto" }
      ],
      paymentMethod: "Transferencia Bancaria",
      reference: "TRF-2024-0825-001"
    },
    {
      id: "FAC-2024-007",
      number: "000007",
      date: "2024-07-01",
      dueDate: "2024-07-30",
      paidDate: "2024-07-28",
      status: "Pagada",
      period: "Junio 2024",
      amount: 8500000,
      tax: 1615000,
      total: 10115000,
      services: [
        { name: "Capacitación Empresarial en Tecnología", amount: 8500000, quantity: 1, unit: "programa" }
      ],
      paymentMethod: "Cheque",
      reference: "CHQ-789123"
    },
    {
      id: "FAC-2024-006",
      number: "000006",
      date: "2024-06-01",
      dueDate: "2024-06-30",
      status: "Pendiente",
      period: "Mayo 2024",
      amount: 15000000,
      tax: 2850000,
      total: 17850000,
      services: [
        { name: "Mantenimiento de Infraestructura IT", amount: 15000000, quantity: 1, unit: "anual" }
      ],
      overdueBy: 76 // días de vencimiento
    },
    {
      id: "FAC-2024-005",
      number: "000005",
      date: "2024-05-01",
      dueDate: "2024-05-30",
      paidDate: "2024-05-29",
      status: "Pagada",
      period: "Abril 2024",
      amount: 18000000,
      tax: 3420000,
      total: 21420000,
      services: [
        { name: "Auditoría de Seguridad Informática", amount: 18000000, quantity: 1, unit: "auditoría" }
      ],
      paymentMethod: "Tarjeta de Crédito",
      reference: "CC-****-1234"
    },
    {
      id: "FAC-2024-004",
      number: "000004",
      date: "2024-04-01",
      dueDate: "2024-04-30",
      paidDate: "2024-04-28",
      status: "Pagada",
      period: "Marzo 2024",
      amount: 45000000,
      tax: 8550000,
      total: 53550000,
      services: [
        { name: "Desarrollo de Software Personalizado", amount: 35000000, quantity: 1, unit: "proyecto" },
        { name: "Horas de consultoría adicionales", amount: 10000000, quantity: 20, unit: "horas" }
      ],
      paymentMethod: "Transferencia Bancaria",
      reference: "TRF-2024-0428-001"
    }
  ]

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.services.some(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'Todos' || invoice.status === statusFilter
    const matchesYear = invoice.date.startsWith(yearFilter)
    return matchesSearch && matchesStatus && matchesYear
  })

  const getStatusInfo = (status: string, overdueBy?: number) => {
    switch (status) {
      case 'Pagada':
        return { color: 'bg-green-900/50 text-green-400 border-green-700', icon: CheckCircle }
      case 'Pendiente':
        return { 
          color: overdueBy ? 'bg-red-900/50 text-red-400 border-red-700' : 'bg-yellow-900/50 text-yellow-400 border-yellow-700', 
          icon: overdueBy ? AlertCircle : Clock 
        }
      case 'Vencida':
        return { color: 'bg-red-900/50 text-red-400 border-red-700', icon: AlertCircle }
      case 'Cancelada':
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: AlertCircle }
      default:
        return { color: 'bg-gray-900/50 text-gray-400 border-gray-700', icon: Receipt }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getFinancialStats = () => {
    const currentYear = parseInt(yearFilter)
    const yearInvoices = invoices.filter(inv => inv.date.startsWith(yearFilter))
    
    const totalPaid = yearInvoices
      .filter(inv => inv.status === 'Pagada')
      .reduce((sum, inv) => sum + inv.total, 0)
    
    const totalPending = yearInvoices
      .filter(inv => inv.status === 'Pendiente')
      .reduce((sum, inv) => sum + inv.total, 0)
    
    const totalOverdue = yearInvoices
      .filter(inv => inv.status === 'Pendiente' && inv.overdueBy)
      .reduce((sum, inv) => sum + inv.total, 0)

    return {
      totalInvoices: yearInvoices.length,
      totalPaid,
      totalPending,
      totalOverdue,
      averageInvoice: totalPaid / yearInvoices.filter(inv => inv.status === 'Pagada').length || 0
    }
  }

  const getMonthlyData = () => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return months.map((month, index) => {
      const monthInvoices = invoices.filter(inv => {
        const invDate = new Date(inv.date)
        return invDate.getFullYear() === parseInt(yearFilter) && invDate.getMonth() === index && inv.status === 'Pagada'
      })
      return {
        month,
        amount: monthInvoices.reduce((sum, inv) => sum + inv.total, 0)
      }
    })
  }

  const stats = getFinancialStats()
  const monthlyData = getMonthlyData()
  const maxAmount = Math.max(...monthlyData.map(d => d.amount))

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Historial de Facturación 💰
        </h2>
        <p className="text-gray-400">
          Consulta y gestiona todas tus facturas y pagos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatPrice(stats.totalPaid)}</p>
              <p className="text-sm text-gray-400">Total Pagado {yearFilter}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatPrice(stats.totalPending)}</p>
              <p className="text-sm text-gray-400">Pendiente de Pago</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatPrice(stats.totalOverdue)}</p>
              <p className="text-sm text-gray-400">Facturas Vencidas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatPrice(stats.averageInvoice)}</p>
              <p className="text-sm text-gray-400">Promedio por Factura</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Facturación Mensual {yearFilter}</h3>
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        <div className="h-48 flex items-end justify-between space-x-2">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="bg-blue-600 rounded-t-sm w-full transition-all hover:bg-blue-500"
                style={{ height: `${maxAmount > 0 ? (data.amount / maxAmount) * 100 : 0}%` }}
                title={`${data.month}: ${formatPrice(data.amount)}`}
              ></div>
              <span className="text-xs text-gray-400 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar facturas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Factura</th>
                <th className="text-left p-4 text-gray-300 font-medium">Período</th>
                <th className="text-left p-4 text-gray-300 font-medium">Fecha</th>
                <th className="text-left p-4 text-gray-300 font-medium">Estado</th>
                <th className="text-right p-4 text-gray-300 font-medium">Monto</th>
                <th className="text-center p-4 text-gray-300 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => {
                const statusInfo = getStatusInfo(invoice.status, invoice.overdueBy)
                const StatusIcon = statusInfo.icon
                const isOverdue = invoice.overdueBy && invoice.overdueBy > 0

                return (
                  <tr key={invoice.id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{invoice.id}</p>
                        <p className="text-gray-400 text-sm">#{invoice.number}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{invoice.period}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white">{new Date(invoice.date).toLocaleDateString('es-ES')}</p>
                        <p className="text-gray-400 text-sm">
                          Vence: {new Date(invoice.dueDate).toLocaleDateString('es-ES')}
                        </p>
                        {invoice.paidDate && (
                          <p className="text-green-400 text-sm">
                            Pagado: {new Date(invoice.paidDate).toLocaleDateString('es-ES')}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className={`px-3 py-1 text-sm rounded-full border flex items-center space-x-1 w-fit ${statusInfo.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span>{invoice.status}</span>
                        </span>
                        {isOverdue && (
                          <p className="text-red-400 text-xs mt-1">
                            Vencida hace {invoice.overdueBy} días
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div>
                        <p className="text-white font-semibold">{formatPrice(invoice.total)}</p>
                        <p className="text-gray-400 text-sm">
                          + IVA {formatPrice(invoice.tax)}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setSelectedInvoice(selectedInvoice === invoice.id ? null : invoice.id)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-900/20 rounded transition-colors"
                          title="Descargar PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {invoice.status === 'Pendiente' && (
                          <button
                            className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/20 rounded transition-colors"
                            title="Pagar ahora"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {(() => {
              const invoice = invoices.find(inv => inv.id === selectedInvoice)!
              return (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Detalle de Factura</h3>
                    <button
                      onClick={() => setSelectedInvoice(null)}
                      className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Información de Factura</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-300">ID: {invoice.id}</p>
                          <p className="text-gray-300">Número: #{invoice.number}</p>
                          <p className="text-gray-300">Período: {invoice.period}</p>
                          <p className="text-gray-300">Fecha: {new Date(invoice.date).toLocaleDateString('es-ES')}</p>
                          <p className="text-gray-300">Vencimiento: {new Date(invoice.dueDate).toLocaleDateString('es-ES')}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Información de Pago</h4>
                        <div className="space-y-1 text-sm">
                          {invoice.paidDate && (
                            <p className="text-green-400">Pagado: {new Date(invoice.paidDate).toLocaleDateString('es-ES')}</p>
                          )}
                          {invoice.paymentMethod && (
                            <p className="text-gray-300">Método: {invoice.paymentMethod}</p>
                          )}
                          {invoice.reference && (
                            <p className="text-gray-300">Referencia: {invoice.reference}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-4">Servicios Facturados</h4>
                    <div className="space-y-2">
                      {invoice.services.map((service, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                          <div>
                            <p className="text-white">{service.name}</p>
                            <p className="text-gray-400 text-sm">{service.quantity} {service.unit}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white">{formatPrice(service.amount)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Subtotal:</span>
                        <span className="text-white">{formatPrice(invoice.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">IVA (19%):</span>
                        <span className="text-white">{formatPrice(invoice.tax)}</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-white">Total:</span>
                          <span className="text-white">{formatPrice(invoice.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Descargar PDF</span>
                    </button>
                    {invoice.status === 'Pendiente' && (
                      <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Pagar Ahora</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredInvoices.length === 0 && (
        <div className="text-center py-16">
          <Receipt className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron facturas</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'Todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : `No tienes facturas para el año ${yearFilter}`
            }
          </p>
        </div>
      )}
    </div>
  )
}
