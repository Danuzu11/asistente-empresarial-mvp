'use client';

import { useState } from 'react';
import { MessageCircleQuestion, Plus, Clock, CheckCircle, AlertTriangle, X, Search, Filter } from 'lucide-react';

export default function PQRS() {
  const [pqrs] = useState([
    {
      id: 1,
      tipo: 'Sugerencia',
      asunto: 'Mejora en el sistema de gestión de horarios',
      descripcion: 'Propongo implementar un sistema más flexible para el registro de entrada y salida que permita a los empleados remotos registrar sus horas de forma más eficiente.',
      fechaCreacion: '2024-12-20',
      estado: 'En Revisión',
      categoria: 'Tecnología',
      prioridad: 'Media',
      respuesta: null,
      fechaRespuesta: null,
      responsable: 'Área de Sistemas'
    },
    {
      id: 2,
      tipo: 'Queja',
      asunto: 'Temperatura inadecuada en oficina',
      descripcion: 'La temperatura del aire acondicionado en el área de desarrollo está muy baja, causando malestar a varios compañeros. Hemos reportado esto verbalmente pero no se ha solucionado.',
      fechaCreacion: '2024-12-18',
      estado: 'Resuelto',
      categoria: 'Infraestructura',
      prioridad: 'Alta',
      respuesta: 'Se ha ajustado la temperatura del aire acondicionado y se instaló un termostato programable. Se realizará mantenimiento preventivo mensual.',
      fechaRespuesta: '2024-12-19',
      responsable: 'Servicios Generales'
    },
    {
      id: 3,
      tipo: 'Petición',
      asunto: 'Solicitud de capacitación en nuevas tecnologías',
      descripcion: 'Solicito capacitación en tecnologías cloud como AWS y Azure para mejorar mis competencias y aportar más valor al equipo.',
      fechaCreacion: '2024-12-15',
      estado: 'Aprobado',
      categoria: 'Recursos Humanos',
      prioridad: 'Media',
      respuesta: 'Aprobada la capacitación. Se ha programado curso para el Q1 2025. Recibirás información detallada próximamente.',
      fechaRespuesta: '2024-12-17',
      responsable: 'Desarrollo y Capacitación'
    },
    {
      id: 4,
      tipo: 'Reclamo',
      asunto: 'Demora en procesamiento de legalización de gastos',
      descripcion: 'He enviado mi legalización de gastos hace 3 semanas y aún no ha sido procesada. Esto está afectando mi flujo de caja personal.',
      fechaCreacion: '2024-12-10',
      estado: 'En Proceso',
      categoria: 'Finanzas',
      prioridad: 'Alta',
      respuesta: 'Se está revisando el caso. Se ha escalado a finanzas para procesamiento prioritario.',
      fechaRespuesta: '2024-12-12',
      responsable: 'Área Financiera'
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const [formData, setFormData] = useState({
    tipo: 'Sugerencia',
    categoria: 'Tecnología',
    asunto: '',
    descripcion: '',
    prioridad: 'Media',
    anonimo: false
  });

  const tiposPQRS = ['Petición', 'Queja', 'Reclamo', 'Sugerencia'];
  const categorias = ['Tecnología', 'Recursos Humanos', 'Infraestructura', 'Finanzas', 'Servicios Generales', 'Seguridad', 'Otros'];
  const prioridades = ['Baja', 'Media', 'Alta', 'Urgente'];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Resuelto':
      case 'Aprobado':
        return 'bg-green-800/50 text-green-400 border-green-700';
      case 'En Revisión':
      case 'En Proceso':
        return 'bg-yellow-800/50 text-yellow-400 border-yellow-700';
      case 'Rechazado':
        return 'bg-red-800/50 text-red-400 border-red-700';
      default:
        return 'bg-blue-800/50 text-blue-400 border-blue-700';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Urgente':
        return 'bg-red-800/50 text-red-400';
      case 'Alta':
        return 'bg-orange-800/50 text-orange-400';
      case 'Media':
        return 'bg-yellow-800/50 text-yellow-400';
      default:
        return 'bg-green-800/50 text-green-400';
    }
  };

  const pqrsFiltrados = pqrs.filter(item => {
    const matchTipo = filtroTipo === 'Todos' || item.tipo === filtroTipo;
    const matchEstado = filtroEstado === 'Todos' || item.estado === filtroEstado;
    const matchBusqueda = item.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
                          item.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchTipo && matchEstado && matchBusqueda;
  });

  const estadisticas = {
    total: pqrs.length,
    pendientes: pqrs.filter(p => p.estado === 'En Revisión' || p.estado === 'En Proceso').length,
    resueltos: pqrs.filter(p => p.estado === 'Resuelto' || p.estado === 'Aprobado').length,
    rechazados: pqrs.filter(p => p.estado === 'Rechazado').length
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar PQRS
    console.log('Enviando PQRS:', formData);
    setMostrarModal(false);
    // Reset form
    setFormData({
      tipo: 'Sugerencia',
      categoria: 'Tecnología',
      asunto: '',
      descripcion: '',
      prioridad: 'Media',
      anonimo: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">PQRS - Peticiones, Quejas, Reclamos y Sugerencias</h1>
            <p className="text-purple-100">
              Tu voz es importante. Comparte tus inquietudes y contribuye a mejorar nuestro ambiente laboral
            </p>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva PQRS</span>
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total PQRS</p>
              <p className="text-2xl font-bold text-white">{estadisticas.total}</p>
            </div>
            <MessageCircleQuestion className="w-8 h-8 text-purple-400" />
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
              <p className="text-gray-400 text-sm">Resueltos</p>
              <p className="text-2xl font-bold text-green-400">{estadisticas.resueltos}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tasa de Resolución</p>
              <p className="text-2xl font-bold text-blue-400">
                {Math.round((estadisticas.resueltos / estadisticas.total) * 100)}%
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar PQRS..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="Todos">Todos los tipos</option>
              {tiposPQRS.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="Todos">Todos los estados</option>
              <option value="En Revisión">En Revisión</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Resuelto">Resuelto</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de PQRS */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <MessageCircleQuestion className="w-5 h-5 mr-2" />
            Mis PQRS
          </h3>
        </div>
        <div className="divide-y divide-gray-700">
          {pqrsFiltrados.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{item.asunto}</h4>
                    <span className="bg-purple-800/50 text-purple-400 px-2 py-1 rounded-full text-xs">
                      {item.tipo}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPrioridadColor(item.prioridad)}`}>
                      {item.prioridad}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{item.descripcion}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>Creado: {item.fechaCreacion}</span>
                    <span>Categoría: {item.categoria}</span>
                    <span>Responsable: {item.responsable}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getEstadoColor(item.estado)}`}>
                    {item.estado}
                  </span>
                </div>
              </div>

              {item.respuesta && (
                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-gray-300 font-medium text-sm">Respuesta Oficial</h5>
                    <span className="text-gray-400 text-xs">{item.fechaRespuesta}</span>
                  </div>
                  <p className="text-gray-200 text-sm">{item.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal para nueva PQRS */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Nueva PQRS</h3>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Tipo de PQRS *
                  </label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  >
                    {tiposPQRS.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Categoría *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  >
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  value={formData.asunto}
                  onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                  placeholder="Resumen breve del tema"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Descripción detallada *
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Describe detalladamente tu petición, queja, reclamo o sugerencia..."
                  rows={5}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Prioridad
                  </label>
                  <select
                    value={formData.prioridad}
                    onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    {prioridades.map(pri => (
                      <option key={pri} value={pri}>{pri}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2 mt-8">
                  <input
                    type="checkbox"
                    id="anonimo"
                    checked={formData.anonimo}
                    onChange={(e) => setFormData({...formData, anonimo: e.target.checked})}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="anonimo" className="text-gray-300 text-sm">
                    Enviar de forma anónima
                  </label>
                </div>
              </div>

              <div className="bg-blue-800/50 border border-blue-700 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium text-sm mb-2">Información Importante</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  <li>• Tu PQRS será tratada con total confidencialidad</li>
                  <li>• Recibirás una respuesta dentro de 5 días hábiles</li>
                  <li>• Si es anónima, no podremos contactarte para aclaraciones</li>
                  <li>• Todas las PQRS son revisadas por el área correspondiente</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Enviar PQRS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
