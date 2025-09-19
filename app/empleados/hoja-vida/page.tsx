'use client';

import { useState } from 'react';
import { User, GraduationCap, Briefcase, Award, Plus, Edit3, Download, Calendar, MapPin } from 'lucide-react';

export default function HojaVidaInterna() {
  const [empleado] = useState({
    nombre: 'Juan Carlos Rodríguez Martínez',
    codigo: 'EMP-2024-001',
    cargo: 'Desarrollador Senior',
    departamento: 'Tecnología',
    fechaIngreso: '15/03/2022'
  });

  const [experienciaLaboral] = useState([
    {
      id: 1,
      empresa: 'TechCorp S.A.',
      cargo: 'Desarrollador Senior',
      fechaInicio: 'Mar 2022',
      fechaFin: 'Actual',
      ubicacion: 'Bogotá, Colombia',
      logros: [
        'Lideré el desarrollo de 3 aplicaciones web críticas',
        'Implementé arquitectura de microservicios que redujo costos en 30%',
        'Mentoré a 5 desarrolladores junior'
      ]
    },
    {
      id: 2,
      empresa: 'Innovate Solutions',
      cargo: 'Desarrollador Full Stack',
      fechaInicio: 'Jun 2019',
      fechaFin: 'Feb 2022',
      ubicacion: 'Medellín, Colombia',
      logros: [
        'Desarrollé sistema de gestión de inventarios',
        'Optimicé base de datos mejorando rendimiento en 40%',
        'Participé en migración a la nube (AWS)'
      ]
    },
    {
      id: 3,
      empresa: 'StartupTech',
      cargo: 'Desarrollador Junior',
      fechaInicio: 'Ene 2018',
      fechaFin: 'May 2019',
      ubicacion: 'Bogotá, Colombia',
      logros: [
        'Desarrollé módulos para sistema ERP',
        'Implementé pruebas unitarias aumentando cobertura al 85%'
      ]
    }
  ]);

  const [educacion] = useState([
    {
      id: 1,
      institucion: 'Universidad Nacional de Colombia',
      titulo: 'Ingeniería de Sistemas',
      fechaInicio: 'Feb 2013',
      fechaFin: 'Dic 2017',
      ubicacion: 'Bogotá, Colombia',
      promedio: '4.2/5.0',
      descripcion: 'Enfoque en desarrollo de software y arquitectura de sistemas'
    },
    {
      id: 2,
      institucion: 'Platzi',
      titulo: 'Especialización en React y Node.js',
      fechaInicio: 'Jun 2020',
      fechaFin: 'Dic 2020',
      ubicacion: 'Online',
      promedio: 'Certificado',
      descripcion: 'Desarrollo avanzado de aplicaciones web modernas'
    }
  ]);

  const [certificaciones] = useState([
    {
      id: 1,
      nombre: 'AWS Certified Solutions Architect',
      emisor: 'Amazon Web Services',
      fecha: 'Sep 2021',
      vigencia: 'Sep 2024',
      estado: 'Vigente'
    },
    {
      id: 2,
      nombre: 'Scrum Master Certified',
      emisor: 'Scrum Alliance',
      fecha: 'Mar 2020',
      vigencia: 'Mar 2025',
      estado: 'Vigente'
    },
    {
      id: 3,
      nombre: 'Google Analytics Certified',
      emisor: 'Google',
      fecha: 'Jul 2019',
      vigencia: 'Jul 2024',
      estado: 'Por renovar'
    }
  ]);

  const [habilidades] = useState({
    tecnicas: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'MongoDB', 'Docker', 'AWS', 'Git'],
    blandas: ['Liderazgo', 'Trabajo en equipo', 'Comunicación efectiva', 'Resolución de problemas', 'Mentoring'],
    idiomas: [
      { idioma: 'Español', nivel: 'Nativo' },
      { idioma: 'Inglés', nivel: 'Avanzado (C1)' },
      { idioma: 'Francés', nivel: 'Básico (A2)' }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{empleado.nombre}</h1>
            <p className="text-purple-100 text-lg">{empleado.cargo} • {empleado.departamento}</p>
            <p className="text-purple-200">Empleado desde: {empleado.fechaIngreso} • ID: {empleado.codigo}</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Editar</span>
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contenido principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experiencia Laboral */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Experiencia Laboral
              </h3>
              <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {experienciaLaboral.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-blue-600 pl-6 pb-6 last:pb-0 relative">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold text-lg">{exp.cargo}</h4>
                        <p className="text-blue-400 font-medium">{exp.empresa}</p>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.fechaInicio} - {exp.fechaFin}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.ubicacion}</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm font-medium mb-2">Logros principales:</p>
                      <ul className="space-y-1">
                        {exp.logros.map((logro, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{logro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Educación */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Educación
              </h3>
              <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {educacion.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-green-600 pl-6 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{edu.titulo}</h4>
                        <p className="text-green-400 font-medium">{edu.institucion}</p>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm mb-2">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.fechaInicio} - {edu.fechaFin}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{edu.ubicacion}</span>
                      </span>
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs">{edu.promedio}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{edu.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Habilidades Técnicas */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Habilidades Técnicas</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {habilidades.tecnicas.map((habilidad, index) => (
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

          {/* Habilidades Blandas */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Habilidades Blandas</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {habilidades.blandas.map((habilidad, index) => (
                  <span
                    key={index}
                    className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-600/30"
                  >
                    {habilidad}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Idiomas */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Idiomas</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {habilidades.idiomas.map((idioma, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white">{idioma.idioma}</span>
                    <span className="text-gray-400 text-sm">{idioma.nivel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certificaciones */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Certificaciones
              </h3>
              <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {certificaciones.map((cert) => (
                  <div key={cert.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium text-sm">{cert.nombre}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        cert.estado === 'Vigente' 
                          ? 'bg-green-800/50 text-green-400' 
                          : 'bg-yellow-800/50 text-yellow-400'
                      }`}>
                        {cert.estado}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-1">{cert.emisor}</p>
                    <div className="flex justify-between text-gray-500 text-xs">
                      <span>Emitido: {cert.fecha}</span>
                      <span>Vigencia: {cert.vigencia}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
