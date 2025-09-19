'use client';

import { useState } from 'react';
import { Users, Search, Phone, Mail, MapPin, Building, User, Filter, UserCircle } from 'lucide-react';

export default function DirectorioEmpleados() {
  const [empleados] = useState([
    {
      id: 1,
      nombre: 'María González',
      cargo: 'Gerente de Desarrollo',
      departamento: 'Tecnología',
      email: 'maria.gonzalez@empresa.com',
      telefono: '+57 301 234 5678',
      extension: '1001',
      ubicacion: 'Oficina Principal - Piso 3',
      fechaIngreso: '2020-05-15',
      avatar: null,
      reporta: null,
      equipo: 'Frontend Team'
    },
    {
      id: 2,
      nombre: 'Juan Carlos Rodríguez',
      cargo: 'Desarrollador Senior',
      departamento: 'Tecnología',
      email: 'juan.rodriguez@empresa.com',
      telefono: '+57 300 123 4567',
      extension: '1234',
      ubicacion: 'Oficina Principal - Piso 3',
      fechaIngreso: '2022-03-15',
      avatar: null,
      reporta: 'María González',
      equipo: 'Frontend Team'
    },
    {
      id: 3,
      nombre: 'Ana María Castillo',
      cargo: 'Diseñadora UX/UI',
      departamento: 'Diseño',
      email: 'ana.castillo@empresa.com',
      telefono: '+57 302 987 6543',
      extension: '2001',
      ubicacion: 'Oficina Principal - Piso 2',
      fechaIngreso: '2021-08-10',
      avatar: null,
      reporta: 'Carlos López',
      equipo: 'Design Team'
    },
    {
      id: 4,
      nombre: 'Carlos López',
      cargo: 'Director de Producto',
      departamento: 'Producto',
      email: 'carlos.lopez@empresa.com',
      telefono: '+57 303 456 7890',
      extension: '2000',
      ubicacion: 'Oficina Principal - Piso 2',
      fechaIngreso: '2019-11-20',
      avatar: null,
      reporta: null,
      equipo: 'Product Team'
    },
    {
      id: 5,
      nombre: 'Luis García',
      cargo: 'Desarrollador Backend',
      departamento: 'Tecnología',
      email: 'luis.garcia@empresa.com',
      telefono: '+57 304 567 8901',
      extension: '1235',
      ubicacion: 'Oficina Principal - Piso 3',
      fechaIngreso: '2021-02-28',
      avatar: null,
      reporta: 'María González',
      equipo: 'Backend Team'
    },
    {
      id: 6,
      nombre: 'Patricia Moreno',
      cargo: 'Especialista en RRHH',
      departamento: 'Recursos Humanos',
      email: 'patricia.moreno@empresa.com',
      telefono: '+57 305 678 9012',
      extension: '3001',
      ubicacion: 'Oficina Principal - Piso 1',
      fechaIngreso: '2020-09-14',
      avatar: null,
      reporta: 'Roberto Silva',
      equipo: 'HR Team'
    },
    {
      id: 7,
      nombre: 'Roberto Silva',
      cargo: 'Gerente de RRHH',
      departamento: 'Recursos Humanos',
      email: 'roberto.silva@empresa.com',
      telefono: '+57 306 789 0123',
      extension: '3000',
      ubicacion: 'Oficina Principal - Piso 1',
      fechaIngreso: '2018-03-05',
      avatar: null,
      reporta: null,
      equipo: 'HR Team'
    },
    {
      id: 8,
      nombre: 'Sandra Hernández',
      cargo: 'Analista Financiera',
      departamento: 'Finanzas',
      email: 'sandra.hernandez@empresa.com',
      telefono: '+57 307 890 1234',
      extension: '4001',
      ubicacion: 'Oficina Principal - Piso 4',
      fechaIngreso: '2021-06-30',
      avatar: null,
      reporta: 'Miguel Torres',
      equipo: 'Finance Team'
    }
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [filtroDepartamento, setFiltroDepartamento] = useState('Todos');
  const [vistaActual, setVistaActual] = useState('tarjetas');

  const departamentos = [...new Set(empleados.map(emp => emp.departamento))];
  
  const empleadosFiltrados = empleados.filter(emp => {
    const matchBusqueda = emp.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          emp.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          emp.email.toLowerCase().includes(busqueda.toLowerCase());
    const matchDepartamento = filtroDepartamento === 'Todos' || emp.departamento === filtroDepartamento;
    return matchBusqueda && matchDepartamento;
  });

  const estadisticas = {
    total: empleados.length,
    departamentos: departamentos.length,
    gerentes: empleados.filter(emp => emp.cargo.toLowerCase().includes('gerente') || emp.cargo.toLowerCase().includes('director')).length,
    nuevos: empleados.filter(emp => new Date(emp.fechaIngreso) >= new Date('2024-01-01')).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Directorio de Empleados</h1>
            <p className="text-indigo-100">
              Encuentra y conecta con tus compañeros de trabajo
            </p>
          </div>
          <div className="text-right">
            <p className="text-indigo-200 text-sm">Total de empleados</p>
            <p className="text-3xl font-bold">{estadisticas.total}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Empleados</p>
              <p className="text-2xl font-bold text-white">{estadisticas.total}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Departamentos</p>
              <p className="text-2xl font-bold text-blue-400">{estadisticas.departamentos}</p>
            </div>
            <Building className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Líderes</p>
              <p className="text-2xl font-bold text-purple-400">{estadisticas.gerentes}</p>
            </div>
            <UserCircle className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Nuevos (2024)</p>
              <p className="text-2xl font-bold text-green-400">{estadisticas.nuevos}</p>
            </div>
            <User className="w-8 h-8 text-green-400" />
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
                placeholder="Buscar por nombre, cargo o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={filtroDepartamento}
              onChange={(e) => setFiltroDepartamento(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="Todos">Todos los departamentos</option>
              {departamentos.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setVistaActual('tarjetas')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  vistaActual === 'tarjetas' ? 'bg-blue-600 text-white' : 'text-gray-400'
                }`}
              >
                Tarjetas
              </button>
              <button
                onClick={() => setVistaActual('lista')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  vistaActual === 'lista' ? 'bg-blue-600 text-white' : 'text-gray-400'
                }`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de tarjetas */}
      {vistaActual === 'tarjetas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {empleadosFiltrados.map((empleado) => (
            <div key={empleado.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-indigo-500 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{empleado.nombre}</h3>
                <p className="text-indigo-400 text-sm font-medium">{empleado.cargo}</p>
                <p className="text-gray-400 text-xs">{empleado.departamento}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300 truncate">{empleado.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{empleado.telefono}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300 text-xs">Ext: {empleado.extension}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300 text-xs">{empleado.ubicacion}</span>
                </div>
                {empleado.reporta && (
                  <div className="flex items-center space-x-2">
                    <UserCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-xs">Reporta a: {empleado.reporta}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="bg-indigo-800/50 text-indigo-400 px-2 py-1 rounded-full text-xs">
                    {empleado.equipo}
                  </span>
                  <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                    Ver perfil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista de lista */}
      {vistaActual === 'lista' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left text-gray-400 text-sm font-medium p-4">Empleado</th>
                  <th className="text-left text-gray-400 text-sm font-medium p-4">Cargo</th>
                  <th className="text-left text-gray-400 text-sm font-medium p-4">Departamento</th>
                  <th className="text-left text-gray-400 text-sm font-medium p-4">Contacto</th>
                  <th className="text-left text-gray-400 text-sm font-medium p-4">Ubicación</th>
                  <th className="text-left text-gray-400 text-sm font-medium p-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {empleadosFiltrados.map((empleado) => (
                  <tr key={empleado.id} className="hover:bg-gray-700/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{empleado.nombre}</p>
                          <p className="text-gray-400 text-sm">{empleado.equipo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{empleado.cargo}</p>
                      {empleado.reporta && (
                        <p className="text-gray-400 text-sm">↳ {empleado.reporta}</p>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                        {empleado.departamento}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-gray-300 text-sm">{empleado.email}</p>
                        <p className="text-gray-400 text-xs">{empleado.telefono} • Ext: {empleado.extension}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300 text-sm">{empleado.ubicacion}</p>
                    </td>
                    <td className="p-4">
                      <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Información útil */}
      <div className="bg-blue-800/50 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium text-sm mb-2">Directorio Empresarial</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-200 text-xs">
          <div>
            <h5 className="font-medium mb-1">Contactos de Emergencia:</h5>
            <ul className="space-y-1">
              <li>• Seguridad: Ext. 911</li>
              <li>• Primeros Auxilios: Ext. 912</li>
              <li>• Mantenimiento: Ext. 913</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-1">Servicios Internos:</h5>
            <ul className="space-y-1">
              <li>• Mesa de Ayuda IT: Ext. 500</li>
              <li>• Recursos Humanos: Ext. 300</li>
              <li>• Recepción: Ext. 100</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
