'use client';

import { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, Plane, Sun, Umbrella } from 'lucide-react';

export default function VacacionesAusencias() {
  const [saldoVacaciones] = useState({
    diasDisponibles: 15,
    diasUsados: 5,
    diasPendientes: 3, // En solicitudes pendientes
    diasVencen: 8, // Días que vencen pronto
    fechaVencimiento: '2025-03-15'
  });

  const [historialVacaciones] = useState([
    {
      id: 1,
      fechaInicio: '2024-12-28',
      fechaFin: '2025-01-05',
      diasTomados: 7,
      estado: 'Pendiente',
      tipo: 'Vacaciones',
      motivo: 'Vacaciones familiares de fin de año',
      aprobadoPor: null
    },
    {
      id: 2,
      fechaInicio: '2024-07-15',
      fechaFin: '2024-07-26',
      diasTomados: 10,
      estado: 'Aprobado',
      tipo: 'Vacaciones',
      motivo: 'Vacaciones de medio año',
      aprobadoPor: 'María González'
    },
    {
      id: 3,
      fechaInicio: '2024-12-18',
      fechaFin: '2024-12-18',
      diasTomados: 0.5,
      estado: 'Aprobado',
      tipo: 'Permiso Personal',
      motivo: 'Cita médica',
      aprobadoPor: 'María González'
    }
  ]);

  const [calendarioEquipo] = useState([
    { empleado: 'Ana Martínez', fechaInicio: '2024-12-23', fechaFin: '2024-12-30', estado: 'Confirmado' },
    { empleado: 'Carlos López', fechaInicio: '2025-01-08', fechaFin: '2025-01-19', estado: 'Pendiente' },
    { empleado: 'Luis García', fechaInicio: '2025-01-15', fechaFin: '2025-01-22', estado: 'Confirmado' }
  ]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
      case 'Confirmado':
        return 'bg-green-800/50 text-green-400 border-green-700';
      case 'Pendiente':
        return 'bg-yellow-800/50 text-yellow-400 border-yellow-700';
      case 'Rechazado':
        return 'bg-red-800/50 text-red-400 border-red-700';
      default:
        return 'bg-gray-800/50 text-gray-400 border-gray-700';
    }
  };

  const diasRestantes = saldoVacaciones.diasDisponibles - saldoVacaciones.diasUsados - saldoVacaciones.diasPendientes;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gestión de Vacaciones y Ausencias</h1>
            <p className="text-cyan-100">
              Planifica y gestiona tus descansos y permisos
            </p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Solicitar Vacaciones</span>
          </button>
        </div>
      </div>

      {/* Resumen de saldo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Días Disponibles</p>
              <p className="text-2xl font-bold text-green-400">{diasRestantes}</p>
            </div>
            <Sun className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Días Usados</p>
              <p className="text-2xl font-bold text-blue-400">{saldoVacaciones.diasUsados}</p>
            </div>
            <Plane className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-400">{saldoVacaciones.diasPendientes}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Por Vencer</p>
              <p className="text-2xl font-bold text-red-400">{saldoVacaciones.diasVencen}</p>
            </div>
            <Umbrella className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Alertas importantes */}
      {saldoVacaciones.diasVencen > 0 && (
        <div className="bg-red-800/50 border border-red-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Umbrella className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="text-red-300 font-medium text-sm mb-1">¡Días de vacaciones por vencer!</h4>
              <p className="text-red-200 text-sm">
                Tienes {saldoVacaciones.diasVencen} días de vacaciones que vencen el {saldoVacaciones.fechaVencimiento}. 
                Solicítalos pronto para no perderlos.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historial de vacaciones */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Mis Vacaciones y Permisos
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {historialVacaciones.map((vacacion) => (
                <div key={vacacion.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{vacacion.tipo}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getEstadoColor(vacacion.estado)}`}>
                          {vacacion.estado}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{vacacion.motivo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{vacacion.diasTomados} día(s)</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">
                      {vacacion.fechaInicio === vacacion.fechaFin 
                        ? vacacion.fechaInicio
                        : `${vacacion.fechaInicio} - ${vacacion.fechaFin}`}
                    </span>
                    {vacacion.aprobadoPor && (
                      <span className="text-gray-400">
                        Aprobado por: {vacacion.aprobadoPor}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendario del equipo */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Vacaciones del Equipo
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {calendarioEquipo.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.empleado}</h4>
                      <p className="text-gray-400 text-sm">
                        {item.fechaInicio} - {item.fechaFin}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getEstadoColor(item.estado)}`}>
                      {item.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas anuales */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Resumen Anual de Vacaciones</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${((saldoVacaciones.diasUsados / saldoVacaciones.diasDisponibles) * 100)}, 100`}
                    className="text-blue-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{Math.round((saldoVacaciones.diasUsados / saldoVacaciones.diasDisponibles) * 100)}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Días Utilizados</p>
              <p className="text-white font-semibold">{saldoVacaciones.diasUsados} de {saldoVacaciones.diasDisponibles}</p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${((diasRestantes / saldoVacaciones.diasDisponibles) * 100)}, 100`}
                    className="text-green-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{Math.round((diasRestantes / saldoVacaciones.diasDisponibles) * 100)}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Días Disponibles</p>
              <p className="text-white font-semibold">{diasRestantes} días restantes</p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${((saldoVacaciones.diasVencen / saldoVacaciones.diasDisponibles) * 100)}, 100`}
                    className="text-red-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{Math.round((saldoVacaciones.diasVencen / saldoVacaciones.diasDisponibles) * 100)}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Días por Vencer</p>
              <p className="text-white font-semibold">{saldoVacaciones.diasVencen} días</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips y recomendaciones */}
      <div className="bg-blue-800/50 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium text-sm mb-2">Tips para tus Vacaciones</h4>
        <ul className="text-blue-200 text-xs space-y-1">
          <li>• Planifica tus vacaciones con anticipación para asegurar aprobación</li>
          <li>• Coordina con tu equipo para evitar conflictos de fechas</li>
          <li>• Los días de vacaciones se acumulan pero tienen fecha de vencimiento</li>
          <li>• Considera tomar descansos cortos durante el año para mantener el balance</li>
          <li>• Recuerda que las vacaciones son un derecho y necesarias para tu bienestar</li>
        </ul>
      </div>
    </div>
  );
}
