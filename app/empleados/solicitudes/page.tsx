'use client';

import { useState } from 'react';
import { Plus, FileText, Clock, CheckCircle, X, AlertTriangle, Search, Filter } from 'lucide-react';

export default function PortalSolicitudes() {
  const [solicitudes] = useState([
    {
      id: 1,
      tipo: 'Vacaciones',
      fechaSolicitud: '2024-12-20',
      fechaInicio: '2024-12-28',
      fechaFin: '2024-01-05',
      diasSolicitados: 7,
      estado: 'Pendiente',
      motivo: 'Vacaciones familiares de fin de año',
      aprobadoPor: null,
      comentarios: 'Solicitud pendiente de aprobación del jefe inmediato'
    },
    {
      id: 2,
      tipo: 'Permiso Personal',
      fechaSolicitud: '2024-12-15',
      fechaInicio: '2024-12-18',
      fechaFin: '2024-12-18',
      diasSolicitados: 0.5,
      estado: 'Aprobado',
      motivo: 'Cita médica especializada',
      aprobadoPor: 'María González',
      comentarios: 'Aprobado. Recordar presentar incapacidad médica si aplica'
    },
    {
      id: 3,
      tipo: 'Cambio de Horario',
      fechaSolicitud: '2024-12-10',
      fechaInicio: '2024-12-16',
      fechaFin: '2024-12-31',
      diasSolicitados: null,
      estado: 'Rechazado',
      motivo: 'Solicitud de horario flexible por estudios',
      aprobadoPor: 'María González',
      comentarios: 'No es posible por requerimientos del proyecto actual'
    },
    {
      id: 4,
      tipo: 'Trabajo Remoto',
      fechaSolicitud: '2024-12-05',
      fechaInicio: '2024-12-09',
      fechaFin: '2024-12-20',
      diasSolicitados: 10,
      estado: 'Aprobado',
      motivo: 'Trabajo desde casa por mudanza',
      aprobadoPor: 'María González',
      comentarios: 'Aprobado con condición de disponibilidad total durante horario laboral'
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const tiposSolicitud = [
    { value: 'vacaciones', label: 'Vacaciones', icon: '🏖️' },
    { value: 'permiso', label: 'Permiso Personal', icon: '⏰' },
    { value: 'incapacidad', label: 'Incapacidad Médica', icon: '🏥' },
    { value: 'licencia', label: 'Licencia', icon: '📋' },
    { value: 'trabajo-remoto', label: 'Trabajo Remoto', icon: '🏠' },
    { value: 'cambio-horario', label: 'Cambio de Horario', icon: '🕐' },
    { value: 'capacitacion', label: 'Capacitación', icon: '📚' }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
        return 'bg-green-800/50 text-green-400 border-green-700';
      case 'Pendiente':
        return 'bg-yellow-800/50 text-yellow-400 border-yellow-700';
      case 'Rechazado':
        return 'bg-red-800/50 text-red-400 border-red-700';
      default:
        return 'bg-gray-800/50 text-gray-400 border-gray-700';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pendiente':
        return <Clock className="w-4 h-4" />;
      case 'Rechazado':
        return <X className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const solicitudesFiltradas = solicitudes.filter(sol => {
    const matchEstado = filtroEstado === 'Todos' || sol.estado === filtroEstado;
    const matchBusqueda = sol.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          sol.motivo.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  const estadisticas = {
    total: solicitudes.length,
    pendientes: solicitudes.filter(s => s.estado === 'Pendiente').length,
    aprobadas: solicitudes.filter(s => s.estado === 'Aprobado').length,
    rechazadas: solicitudes.filter(s => s.estado === 'Rechazado').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Portal de Solicitudes</h1>
            <p className="text-blue-100">
              Gestiona todas tus solicitudes de permisos, vacaciones y más
            </p>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Solicitud</span>
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Solicitudes</p>
              <p className="text-2xl font-bold text-white">{estadisticas.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-400">{estadisticas.pendientes}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Aprobadas</p>
              <p className="text-2xl font-bold text-green-400">{estadisticas.aprobadas}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rechazadas</p>
              <p className="text-2xl font-bold text-red-400">{estadisticas.rechazadas}</p>
            </div>
            <X className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar solicitudes..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Mis Solicitudes
          </h3>
        </div>
        <div className="divide-y divide-gray-700">
          {solicitudesFiltradas.map((solicitud) => (
            <div key={solicitud.id} className="p-6 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-white font-semibold">{solicitud.tipo}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs border flex items-center space-x-1 ${getEstadoColor(solicitud.estado)}`}>
                      {getEstadoIcon(solicitud.estado)}
                      <span>{solicitud.estado}</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-400">Fecha de solicitud</p>
                      <p className="text-white mt-1">{solicitud.fechaSolicitud}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Período solicitado</p>
                      <p className="text-white mt-1">
                        {solicitud.fechaInicio === solicitud.fechaFin 
                          ? solicitud.fechaInicio
                          : `${solicitud.fechaInicio} - ${solicitud.fechaFin}`}
                      </p>
                    </div>
                    {solicitud.diasSolicitados && (
                      <div>
                        <p className="text-gray-400">Días solicitados</p>
                        <p className="text-white mt-1">{solicitud.diasSolicitados} día(s)</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-700 rounded-lg p-3 mb-3">
                    <p className="text-gray-400 text-xs mb-1">Motivo:</p>
                    <p className="text-white text-sm">{solicitud.motivo}</p>
                  </div>

                  {solicitud.aprobadoPor && (
                    <div className="text-sm">
                      <span className="text-gray-400">Revisado por: </span>
                      <span className="text-white">{solicitud.aprobadoPor}</span>
                    </div>
                  )}

                  {solicitud.comentarios && (
                    <div className="bg-blue-800/30 border border-blue-700 rounded-lg p-3 mt-3">
                      <p className="text-blue-300 text-xs mb-1">Comentarios:</p>
                      <p className="text-blue-100 text-sm">{solicitud.comentarios}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Ver Detalles
                  </button>
                  {solicitud.estado === 'Pendiente' && (
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para nueva solicitud */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Nueva Solicitud</h3>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tiposSolicitud.map((tipo) => (
                  <button
                    key={tipo.value}
                    onClick={() => {
                      setTipoSolicitud(tipo.value);
                      // Aquí iría la lógica para abrir el formulario específico
                    }}
                    className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg p-4 text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">{tipo.icon}</div>
                    <p className="text-white text-sm font-medium">{tipo.label}</p>
                  </button>
                ))}
              </div>

              <div className="bg-blue-800/50 border border-blue-700 rounded-lg p-4 mt-6">
                <h4 className="text-blue-300 font-medium text-sm mb-2">Información Importante</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  <li>• Las solicitudes deben realizarse con mínimo 5 días de anticipación</li>
                  <li>• Los permisos médicos requieren soporte del profesional de salud</li>
                  <li>• Las vacaciones están sujetas a disponibilidad del equipo</li>
                  <li>• Recibirás notificación por email del estado de tu solicitud</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
