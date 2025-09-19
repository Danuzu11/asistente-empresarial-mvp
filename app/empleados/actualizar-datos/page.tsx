'use client';

import { useState } from 'react';
import { Save, Phone, Mail, MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function ActualizarDatos() {
  const [formData, setFormData] = useState({
    telefono: '+57 300 123 4567',
    email: 'juan.rodriguez@empresa.com',
    direccion: 'Calle 45 #23-67, Bogotá D.C.',
    emergenciaContacto: 'Ana María Rodríguez',
    emergenciaTelefono: '300 987 6543',
    emergenciaRelacion: 'Esposa',
    cuentaBanco: 'Bancolombia',
    numeroCuenta: '****-****-****-5678',
    tipoCuenta: 'Ahorros'
  });

  const [cambiosPendientes, setCambiosPendientes] = useState([
    { campo: 'Teléfono', valorAnterior: '+57 300 123 4567', valorNuevo: '+57 301 555 9876', estado: 'pendiente' },
    { campo: 'Dirección', valorAnterior: 'Calle 45 #23-67', valorNuevo: 'Carrera 15 #67-89', estado: 'aprobado' }
  ]);

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    
    // Simular envío
    setTimeout(() => {
      setGuardando(false);
      setMensaje('Datos actualizados correctamente. Los cambios están pendientes de aprobación.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Actualización de Datos Personales</h1>
        <p className="text-green-100">
          Mantén tu información actualizada. Los cambios requerirán aprobación del área de Recursos Humanos.
        </p>
      </div>

      {/* Mensaje de respuesta */}
      {mensaje && (
        <div className="bg-green-800/50 border border-green-700 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-200">{mensaje}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario de actualización */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información de Contacto */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Información de Contacto
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Teléfono Personal
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Correo Personal (Opcional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Dirección Residencial
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Contacto de Emergencia */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Contacto de Emergencia
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="emergenciaContacto"
                    value={formData.emergenciaContacto}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="emergenciaTelefono"
                      value={formData.emergenciaTelefono}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Relación
                    </label>
                    <select
                      name="emergenciaRelacion"
                      value={formData.emergenciaRelacion}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Esposa">Esposa</option>
                      <option value="Esposo">Esposo</option>
                      <option value="Madre">Madre</option>
                      <option value="Padre">Padre</option>
                      <option value="Hermana">Hermana</option>
                      <option value="Hermano">Hermano</option>
                      <option value="Hija">Hija</option>
                      <option value="Hijo">Hijo</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Información Bancaria */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Información Bancaria
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Esta información es sensible y requiere verificación adicional
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Banco
                  </label>
                  <select
                    name="cuentaBanco"
                    value={formData.cuentaBanco}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Bancolombia">Bancolombia</option>
                    <option value="Banco de Bogotá">Banco de Bogotá</option>
                    <option value="Davivienda">Davivienda</option>
                    <option value="BBVA">BBVA</option>
                    <option value="Banco Popular">Banco Popular</option>
                    <option value="Banco Caja Social">Banco Caja Social</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Número de Cuenta
                    </label>
                    <input
                      type="text"
                      name="numeroCuenta"
                      value={formData.numeroCuenta}
                      onChange={handleInputChange}
                      placeholder="Ingrese el número completo"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Tipo de Cuenta
                    </label>
                    <select
                      name="tipoCuenta"
                      value={formData.tipoCuenta}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Ahorros">Ahorros</option>
                      <option value="Corriente">Corriente</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={guardando}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
              >
                {guardando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Panel lateral - Cambios pendientes */}
        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Cambios Pendientes
              </h3>
            </div>
            <div className="p-6">
              {cambiosPendientes.length === 0 ? (
                <p className="text-gray-400 text-sm">No tienes cambios pendientes</p>
              ) : (
                <div className="space-y-4">
                  {cambiosPendientes.map((cambio, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{cambio.campo}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          cambio.estado === 'pendiente' 
                            ? 'bg-yellow-800/50 text-yellow-400' 
                            : 'bg-green-800/50 text-green-400'
                        }`}>
                          {cambio.estado === 'pendiente' ? 'Pendiente' : 'Aprobado'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 text-xs">Anterior: {cambio.valorAnterior}</p>
                        <p className="text-gray-300 text-xs">Nuevo: {cambio.valorNuevo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Información importante */}
          <div className="bg-blue-800/50 border border-blue-700 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-300 font-medium text-sm mb-2">Información Importante</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  <li>• Los cambios requieren aprobación de RRHH</li>
                  <li>• Tiempo de aprobación: 2-3 días hábiles</li>
                  <li>• Recibirás notificación por email</li>
                  <li>• Los cambios bancarios requieren documentación adicional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
