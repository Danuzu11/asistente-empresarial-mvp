"use client"

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Package, 
  Calendar, 
  DollarSign,
  Users,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function ClientesDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Este Mes')

  const periods = ['Esta Semana', 'Este Mes', 'Este Trimestre', 'Este Año']

  const metrics = [
    {
      title: "Total Gastado",
      value: "$4,250,000",
      change: "+12.5%",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-green-600"
    },
    {
      title: "Pedidos Realizados",
      value: "23",
      change: "+3",
      changeType: "increase", 
      icon: ShoppingCart,
      color: "bg-blue-600"
    },
    {
      title: "Productos Adquiridos",
      value: "156",
      change: "+8.2%",
      changeType: "increase",
      icon: Package,
      color: "bg-purple-600"
    },
    {
      title: "Citas Programadas",
      value: "8",
      change: "-2",
      changeType: "decrease",
      icon: Calendar,
      color: "bg-orange-600"
    }
  ]

  const recentOrders = [
    { id: "ORD-2024-015", date: "2024-09-10", status: "Entregado", amount: "$285,000", items: 3 },
    { id: "ORD-2024-014", date: "2024-09-08", status: "En Tránsito", amount: "$450,000", items: 5 },
    { id: "ORD-2024-013", date: "2024-09-05", status: "Procesando", amount: "$125,000", items: 2 },
    { id: "ORD-2024-012", date: "2024-09-03", status: "Entregado", amount: "$980,000", items: 8 },
    { id: "ORD-2024-011", date: "2024-09-01", status: "Entregado", amount: "$335,000", items: 4 }
  ]

  const topProducts = [
    { name: "Laptop Dell XPS 13", category: "Tecnología", quantity: 12, amount: "$1,500,000" },
    { name: "Silla Ergonómica Premium", category: "Mobiliario", quantity: 25, amount: "$875,000" },
    { name: "Monitor LG 27'' 4K", category: "Tecnología", quantity: 18, amount: "$720,000" },
    { name: "Impresora Multifuncional", category: "Oficina", quantity: 8, amount: "$480,000" },
    { name: "Mesa de Reuniones", category: "Mobiliario", quantity: 3, amount: "$450,000" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado": return "bg-green-600"
      case "En Tránsito": return "bg-blue-600"
      case "Procesando": return "bg-yellow-600"
      default: return "bg-gray-600"
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Panel Principal Dashboard 📊
          </h2>
          <p className="text-gray-400">
            Análisis completo de tu actividad comercial
          </p>
        </div>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {periods.map(period => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const isIncrease = metric.changeType === 'increase'
          
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.color}/20 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  isIncrease ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isIncrease ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Orders Chart */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Tendencia de Pedidos</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[40, 65, 30, 80, 55, 70, 45, 90, 35, 75, 60, 85].map((height, index) => (
                <div
                  key={index}
                  className="bg-blue-600 rounded-t-sm flex-1 transition-all hover:bg-blue-500"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Ene</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Ago</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dic</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Por Categoría</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-300">Tecnología</span>
                </div>
                <span className="text-sm text-white">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-gray-300">Mobiliario</span>
                </div>
                <span className="text-sm text-white">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-sm text-gray-300">Oficina</span>
                </div>
                <span className="text-sm text-white">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span className="text-sm text-gray-300">Otros</span>
                </div>
                <span className="text-sm text-white">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Pedidos Recientes</h3>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${getStatusColor(order.status)} rounded-full`}></div>
                  <div>
                    <p className="text-sm font-medium text-white">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.date} • {order.items} productos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{order.amount}</p>
                  <p className="text-xs text-gray-400">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Productos Más Comprados</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.category} • {product.quantity} unidades</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{product.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
