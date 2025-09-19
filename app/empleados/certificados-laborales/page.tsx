'use client';

import { useState } from 'react';
import { Award, Download, Eye, Plus, Calendar, CheckCircle, Clock, X } from 'lucide-react';

export default function CertificadosLaborales() {
  const [certificados] = useState([
    {
      id: 1,
      tipo: 'Certificado Laboral',
      fechaSolicitud: '2024-12-15',
      fechaEmision: '2024-12-16',
      estado: 'Disponible',
      descripcion: 'Certificado de vinculación laboral con salarios',
      archivo: 'certificado_laboral_001.pdf',
      solicitadoPor: 'Juan Carlos Rodríguez',
      motivoSolicitud: 'Trámite bancario - Solicitud de crédito hipotecario'
    },
    {
      id: 2,
      tipo: 'Certificado de Ingresos',
      fechaSolicitud: '2024-12-10',
      fechaEmision: '2024-12-11',
      estado: 'Disponible',
      descripcion: 'Certificado de ingresos sin salarios detallados',
      archivo: 'certificado_ingresos_002.pdf',
      solicitadoPor: 'Juan Carlos Rodríguez',
      motivoSolicitud: 'Verificación de ingresos para arriendos'
    },
    {
      id: 3,
      tipo: 'Certificado de Tiempo de Servicio',
      fechaSolicitud: '2024-12-05',
      fechaEmision: null,
      estado: 'En Proceso',
      descripcion: 'Certificado de tiempo de servicio y permanencia',
      archivo: null,
      solicitadoPor: 'Juan Carlos Rodríguez',
      motivoSolicitud: 'Solicitud de visa de trabajo'
    }
  ]);

  const [solicitudes] = useState([
    {
      id: 4,
      tipo: 'Certificado Laboral Completo',
      fechaSolicitud: '2024-12-20',
      estado: 'Pendiente',
      motivoSolicitud: 'Postulación a maestría en el exterior',
      observaciones: 'Requiere traducción oficial al inglés'
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [formData, setFormData] = useState({
    tipoCertificado: 'laboral',
    incluirSalarios: false,
    motivoSolicitud: '',
    observaciones: ''
  });

  const tiposCertificado = [
    { value: 'laboral', label: 'Certificado Laboral Completo', descripcion: 'Incluye cargo, fecha de ingreso y funciones' },
    { value: 'ingresos', label: 'Certificado de Ingresos', descripcion: 'Para verificación de capacidad económica' },
    { value: 'tiempo', label: 'Certificado de Tiempo de Servicio', descripcion: 'Únicamente tiempo laborado' },
    { value: 'disciplinario', label: 'Paz y Salvo Disciplinario', descripcion: 'Estado disciplinario del empleado' }
  ];

  const handleSolicitar = () => {
    // Lógica para enviar solicitud
    console.log('Solicitando certificado:', formData);
    setMostrarModal(false);
    // Reset form
    setFormData({
      tipoCertificado: 'laboral',
      incluirSalarios: false,
      motivoSolicitud: '',
      observaciones: ''
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-green-800/50 text-green-400 border-green-700';
      case 'En Proceso':
        return 'bg-yellow-800/50 text-yellow-400 border-yellow-700';
      case 'Pendiente':
        return 'bg-blue-800/50 text-blue-400 border-blue-700';
      default:
        return 'bg-gray-800/50 text-gray-400 border-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Certificados Laborales</h1>
            <p className="text-yellow-100">
              Solicita y descarga tus certificados laborales de manera rápida y segura
            </p>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Certificado</span>
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Emitidos</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Disponibles</p>
              <p className="text-2xl font-bold text-green-400">5</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">En Proceso</p>
              <p className="text-2xl font-bold text-yellow-400">2</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Este Mes</p>
              <p className="text-2xl font-bold text-blue-400">3</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Certificados Disponibles */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Certificados Disponibles
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {certificados.map((cert) => (
              <div key={cert.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-semibold">{cert.tipo}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getEstadoColor(cert.estado)}`}>
                        {cert.estado}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{cert.descripcion}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Fecha de solicitud:</span>
                        <span className="text-white ml-2">{cert.fechaSolicitud}</span>
                      </div>
                      {cert.fechaEmision && (
                        <div>
                          <span className="text-gray-400">Fecha de emisión:</span>
                          <span className="text-white ml-2">{cert.fechaEmision}</span>
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <span className="text-gray-400">Motivo:</span>
                        <span className="text-white ml-2">{cert.motivoSolicitud}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {cert.estado === 'Disponible' && (
                      <>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {cert.estado === 'En Proceso' && (
                      <div className="flex items-center text-yellow-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">Procesando...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solicitudes Pendientes */}
      {solicitudes.length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Solicitudes Pendientes
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {solicitudes.map((sol) => (
                <div key={sol.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-semibold">{sol.tipo}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs border ${getEstadoColor(sol.estado)}`}>
                          {sol.estado}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="text-gray-400">Solicitud:</span>
                          <span className="text-white ml-2">{sol.fechaSolicitud}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Motivo:</span>
                          <span className="text-white ml-2">{sol.motivoSolicitud}</span>
                        </div>
                        {sol.observaciones && (
                          <div>
                            <span className="text-gray-400">Observaciones:</span>
                            <span className="text-white ml-2">{sol.observaciones}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal para nueva solicitud */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Solicitar Certificado Laboral</h3>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Tipo de Certificado
                </label>
                <select
                  value={formData.tipoCertificado}
                  onChange={(e) => setFormData({...formData, tipoCertificado: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  {tiposCertificado.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                  ))}
                </select>
                <p className="text-gray-400 text-xs mt-1">
                  {tiposCertificado.find(t => t.value === formData.tipoCertificado)?.descripcion}
                </p>
              </div>

              {(formData.tipoCertificado === 'laboral' || formData.tipoCertificado === 'ingresos') && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="incluirSalarios"
                    checked={formData.incluirSalarios}
                    onChange={(e) => setFormData({...formData, incluirSalarios: e.target.checked})}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="incluirSalarios" className="text-gray-300 text-sm">
                    Incluir información salarial detallada
                  </label>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Motivo de la solicitud *
                </label>
                <input
                  type="text"
                  value={formData.motivoSolicitud}
                  onChange={(e) => setFormData({...formData, motivoSolicitud: e.target.value})}
                  placeholder="Ej: Trámite bancario, solicitud de visa, etc."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Observaciones adicionales
                </label>
                <textarea
                  value={formData.observaciones}
                  onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                  placeholder="Información adicional, requisitos especiales, etc."
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="bg-blue-800/50 border border-blue-700 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium text-sm mb-2">Información Importante</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  <li>• Tiempo de procesamiento: 2-3 días hábiles</li>
                  <li>• Los certificados tienen validez de 30 días</li>
                  <li>• Recibirás notificación cuando esté disponible</li>
                  <li>• Máximo 3 solicitudes por mes</li>
                </ul>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSolicitar}
                disabled={!formData.motivoSolicitud.trim()}
                className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Solicitar Certificado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
