'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, TrendingUp, Users, Building2, MessageSquare } from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Panel de control empresarial"
    >
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          ¡Bienvenido de vuelta! 👋
        </h2>
        <p className="text-gray-400">
          Aquí tienes un resumen de tu actividad empresarial...
        </p>
      </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Ventas del mes</p>
                <p className="text-2xl font-bold text-white">$24,580</p>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5%
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Clientes activos</p>
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Proyectos activos</p>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-sm text-gray-400 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  En progreso
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Equipo</p>
                <p className="text-2xl font-bold text-white">45</p>
                <p className="text-sm text-gray-400 flex items-center mt-1">
                  <Users className="w-4 h-4 mr-1" />
                  Miembros
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent activity */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Actividad reciente</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Nuevo cliente registrado</p>
                    <p className="text-xs text-gray-400">Empresa ABC se unió al sistema</p>
                  </div>
                  <span className="text-xs text-gray-500">Hace 2 horas</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Proyecto completado</p>
                    <p className="text-xs text-gray-400">Desarrollo web para Cliente XYZ</p>
                  </div>
                  <span className="text-xs text-gray-500">Hace 4 horas</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Reunión programada</p>
                    <p className="text-xs text-gray-400">Revisión mensual con el equipo</p>
                  </div>
                  <span className="text-xs text-gray-500">Mañana 10:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Acciones rápidas</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/chat')}
                  className="w-full text-left p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Chat con IA</p>
                      <p className="text-xs text-gray-400">Asistente empresarial</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Agregar cliente</p>
                      <p className="text-xs text-gray-400">Registrar nueva empresa</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Nuevo proyecto</p>
                      <p className="text-xs text-gray-400">Crear proyecto</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Ver reportes</p>
                      <p className="text-xs text-gray-400">Análisis de datos</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
}