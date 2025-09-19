'use client';

import { 
  Users, 
  Building2, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
  UserCheck,
  Database
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Administrativo</h1>
        <p className="text-gray-400 mt-2">Panel de control integral para la administración del sistema empresarial</p>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-green-400 text-sm">+12% vs mes anterior</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Empresas Activas</p>
              <p className="text-2xl font-bold text-white">89</p>
              <p className="text-green-400 text-sm">+3% vs mes anterior</p>
            </div>
            <Building2 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ventas del Mes</p>
              <p className="text-2xl font-bold text-white">$485,230</p>
              <p className="text-green-400 text-sm">+18% vs mes anterior</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Órdenes Activas</p>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-red-400 text-sm">-5% vs mes anterior</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Alertas y Notificaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Alertas del Sistema</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <div className="flex-1">
                <p className="text-red-400 text-sm font-medium">Backup pendiente</p>
                <p className="text-gray-400 text-xs">Último backup hace 3 días</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-400" />
              <div className="flex-1">
                <p className="text-yellow-400 text-sm font-medium">15 solicitudes pendientes</p>
                <p className="text-gray-400 text-xs">Requieren aprobación</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
              <Activity className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                <p className="text-blue-400 text-sm font-medium">Sistema funcionando</p>
                <p className="text-gray-400 text-xs">Uptime: 99.8%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <span>Actividad Reciente</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <UserCheck className="w-4 h-4 text-green-400" />
              <div className="flex-1">
                <p className="text-white text-sm">Nuevo usuario registrado</p>
                <p className="text-gray-400 text-xs">Juan Pérez - hace 2 min</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <Package className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                <p className="text-white text-sm">Producto agregado al catálogo</p>
                <p className="text-gray-400 text-xs">Laptop Dell XPS - hace 15 min</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <div className="flex-1">
                <p className="text-white text-sm">Venta procesada</p>
                <p className="text-gray-400 text-xs">$1,250.00 - hace 1 hora</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos del Sistema */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
          <Database className="w-5 h-5 text-purple-500" />
          <span>Estado de Módulos del Sistema</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-white">Gestión de Usuarios</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5 text-purple-400" />
              <span className="text-white">Módulo de Compras</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-white">Ventas y CRM</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Recursos Humanos</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-white">Financiero</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-orange-400" />
              <span className="text-white">Inventario</span>
            </div>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Accesos Rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center space-y-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-white">Usuarios</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Database className="w-6 h-6 text-purple-400" />
            <span className="text-sm text-white">Respaldo</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <BarChart3 className="w-6 h-6 text-green-400" />
            <span className="text-sm text-white">Reportes</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-sm text-white">Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
