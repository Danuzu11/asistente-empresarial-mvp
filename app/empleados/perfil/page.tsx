'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Building, Edit3, Camera } from 'lucide-react';

export default function PerfilEmpleado() {
  const [empleado] = useState({
    nombre: 'Juan Carlos Rodríguez',
    apellidos: 'Rodríguez Martínez',
    codigo: 'EMP-2024-001',
    email: 'juan.rodriguez@empresa.com',
    telefono: '+57 300 123 4567',
    extension: '1234',
    direccion: 'Calle 45 #23-67, Bogotá D.C.',
    fechaNacimiento: '15/08/1988',
    fechaIngreso: '15/03/2022',
    cargo: 'Desarrollador Senior',
    departamento: 'Tecnología',
    jefe: 'María González',
    estadoCivil: 'Casado',
    tipoContrato: 'Indefinido',
    salario: '$4,500,000',
    nivelEducativo: 'Profesional',
    profesion: 'Ingeniería de Sistemas',
    emergenciaContacto: 'Ana María Rodríguez - 300 987 6543'
  });

  const [habilidades] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Docker', 'Git', 'Metodologías Ágiles'
  ]);

  const [historialLaboral] = useState([
    {
      empresa: 'TechCorp S.A.',
      cargo: 'Desarrollador Senior',
      fechaInicio: 'Mar 2022',
      fechaFin: 'Actual',
      descripcion: 'Desarrollo de aplicaciones web y móviles'
    },
    {
      empresa: 'Innovate Solutions',
      cargo: 'Desarrollador Jr.',
      fechaInicio: 'Jun 2019',
      fechaFin: 'Feb 2022',
      descripcion: 'Desarrollo frontend y soporte técnico'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-blue-800" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{empleado.nombre} {empleado.apellidos}</h1>
            <p className="text-blue-100 text-lg">{empleado.cargo}</p>
            <p className="text-blue-200">{empleado.departamento} • {empleado.codigo}</p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <span>Editar Perfil</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Personal */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Información Personal
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Correo Electrónico</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-white">{empleado.email}</span>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Teléfono</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-white">{empleado.telefono}</span>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Extensión</label>
                  <span className="text-white block mt-1">{empleado.extension}</span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Fecha de Nacimiento</label>
                  <span className="text-white block mt-1">{empleado.fechaNacimiento}</span>
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-400 text-sm">Dirección</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-white">{empleado.direccion}</span>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Estado Civil</label>
                  <span className="text-white block mt-1">{empleado.estadoCivil}</span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Contacto de Emergencia</label>
                  <span className="text-white block mt-1">{empleado.emergenciaContacto}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Información Laboral */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 mt-6">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Información Laboral
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Fecha de Ingreso</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-white">{empleado.fechaIngreso}</span>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Jefe Directo</label>
                  <span className="text-white block mt-1">{empleado.jefe}</span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Tipo de Contrato</label>
                  <span className="text-white block mt-1">{empleado.tipoContrato}</span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Salario</label>
                  <span className="text-white block mt-1">{empleado.salario}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Educación */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Educación</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Nivel Educativo</span>
                  <p className="text-white">{empleado.nivelEducativo}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Profesión</span>
                  <p className="text-white">{empleado.profesion}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Habilidades */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Habilidades</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {habilidades.map((habilidad, index) => (
                  <span
                    key={index}
                    className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-600/30"
                  >
                    {habilidad}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historial Laboral */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Historial Laboral
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {historialLaboral.map((trabajo, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold">{trabajo.cargo}</h4>
                  <span className="text-gray-400 text-sm">{trabajo.fechaInicio} - {trabajo.fechaFin}</span>
                </div>
                <p className="text-blue-400 font-medium mb-2">{trabajo.empresa}</p>
                <p className="text-gray-300 text-sm">{trabajo.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
