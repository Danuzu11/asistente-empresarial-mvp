'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, FileText, Bell, TrendingUp, Users, Award, CheckCircle, AlertTriangle } from 'lucide-react';

export default function EmpleadosDashboard() {
  const [empleado] = useState({
    nombre: 'Juan Carlos Rodríguez',
    codigo: 'EMP-2024-001',
    departamento: 'Tecnología',
    cargo: 'Desarrollador Senior',
    fechaIngreso: '15/03/2022',
    jefe: 'María González',
    extension: '1234'
  });

  const [estadisticas] = useState({
    vacacionesDisponibles: 15,
    vacacionesUsadas: 5,
    horasExtras: 8,
    evaluacionDesempeno: 4.2,
    cursosCompletados: 12,
    solicitudesPendientes: 3
  });

  const [notificaciones] = useState([
    { id: 1, tipo: 'info', mensaje: 'Tu evaluación de desempeño del Q4 está disponible', fecha: '2024-12-20' },
    { id: 2, tipo: 'warning', mensaje: 'Recuerda completar el curso de Seguridad Informática antes del 31/12', fecha: '2024-12-18' },
    { id: 3, tipo: 'success', mensaje: 'Tu solicitud de vacaciones ha sido aprobada', fecha: '2024-12-15' }
  ]);

  const [proximosEventos] = useState([
    { id: 1, titulo: 'Reunión de equipo', fecha: '2024-12-22', hora: '10:00' },
    { id: 2, titulo: 'Capacitación en React', fecha: '2024-12-23', hora: '14:00' },
    { id: 3, titulo: 'Evaluación trimestral', fecha: '2024-12-27', hora: '09:00' }
  ]);

  const [horasSemanales] = useState([
    { dia: 'Lun', horas: 8 },
    { dia: 'Mar', horas: 8 },
    { dia: 'Mié', horas: 7.5 },
    { dia: 'Jue', horas: 8 },
    { dia: 'Vie', horas: 6 },
    { dia: 'Sáb', horas: 0 },
    { dia: 'Dom', horas: 0 }
  ]);

  return (
    <div className="space-y-6">
      {/* Header de bienvenida */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">¡Bienvenido, {empleado.nombre}!</h1>
        <p className="text-blue-100">
          {empleado.cargo} • {empleado.departamento} • Código: {empleado.codigo}
        </p>
        <div className="flex items-center space-x-4 mt-4 text-sm">
          <span>📧 Extensión: {empleado.extension}</span>
          <span>👤 Jefe: {empleado.jefe}</span>
          <span>📅 En la empresa desde: {empleado.fechaIngreso}</span>
        </div>
      </div>

      {/* Cards de estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Vacaciones Disponibles</p>
              <p className="text-2xl font-bold text-green-400">{estadisticas.vacacionesDisponibles}</p>
              <p className="text-gray-500 text-xs">({estadisticas.vacacionesUsadas} usadas)</p>
            </div>
            <Calendar className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Horas Extras</p>
              <p className="text-2xl font-bold text-blue-400">{estadisticas.horasExtras}h</p>
              <p className="text-gray-500 text-xs">Este mes</p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Evaluación</p>
              <p className="text-2xl font-bold text-yellow-400">{estadisticas.evaluacionDesempeno}/5</p>
              <p className="text-gray-500 text-xs">Última evaluación</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Cursos Completados</p>
              <p className="text-2xl font-bold text-purple-400">{estadisticas.cursosCompletados}</p>
              <p className="text-gray-500 text-xs">Este año</p>
            </div>
            <Award className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notificaciones */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notificaciones Recientes
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {notificaciones.map((notif) => (
                  <div key={notif.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                    {notif.tipo === 'success' && <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />}
                    {notif.tipo === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />}
                    {notif.tipo === 'info' && <Bell className="w-5 h-5 text-blue-400 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-white text-sm">{notif.mensaje}</p>
                      <p className="text-gray-400 text-xs mt-1">{notif.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Próximos eventos */}
        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Próximos Eventos
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {proximosEventos.map((evento) => (
                  <div key={evento.id} className="p-3 bg-gray-700 rounded-lg">
                    <h4 className="text-white font-medium text-sm">{evento.titulo}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-400 text-xs">{evento.fecha}</span>
                      <span className="text-blue-400 text-xs">{evento.hora}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de horas semanales */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Registro de Horas - Semana Actual
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4">
            {horasSemanales.map((dia) => (
              <div key={dia.dia} className="text-center">
                <div className="text-gray-400 text-sm mb-2">{dia.dia}</div>
                <div className="bg-gray-700 h-24 rounded-lg flex items-end justify-center p-2">
                  <div 
                    className="bg-blue-500 w-full rounded"
                    style={{ height: `${(dia.horas / 8) * 100}%`, minHeight: dia.horas > 0 ? '8px' : '0' }}
                  ></div>
                </div>
                <div className="text-white text-sm mt-2">{dia.horas}h</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <span className="text-gray-400">Total semanal: 37.5 horas</span>
            <span className="text-green-400">✓ Objetivo cumplido</span>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Acciones Rápidas</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Solicitar Vacaciones</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Legalizar Gastos</span>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Ver Directorio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
