'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit3,
  Eye,
  UserCheck,
  Calendar,
  DollarSign,
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  GraduationCap,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Star,
  MoreHorizontal
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  supervisor: string;
  employeeId: string;
  status: 'active' | 'inactive' | 'vacation' | 'leave';
  hireDate: string;
  salary: number;
  location: string;
  contract: 'permanent' | 'temporary' | 'contractor';
  performance: number;
  skills: string[];
  nextReview: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Carlos Alberto Méndez',
    email: 'carlos.mendez@empresa.com',
    phone: '+57 320 123 4567',
    position: 'Gerente de Ventas',
    department: 'Ventas',
    supervisor: 'Ana García',
    employeeId: 'EMP-001',
    status: 'active',
    hireDate: '2022-03-15',
    salary: 5500000,
    location: 'Bogotá',
    contract: 'permanent',
    performance: 4.8,
    skills: ['Ventas', 'Liderazgo', 'CRM', 'Negociación'],
    nextReview: '2024-03-15'
  },
  {
    id: '2',
    name: 'Laura Patricia Pérez',
    email: 'laura.perez@empresa.com',
    phone: '+57 315 987 6543',
    position: 'Desarrolladora Senior',
    department: 'Tecnología',
    supervisor: 'Roberto Silva',
    employeeId: 'EMP-002',
    status: 'active',
    hireDate: '2021-08-20',
    salary: 6200000,
    location: 'Medellín',
    contract: 'permanent',
    performance: 4.9,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    nextReview: '2024-08-20'
  },
  {
    id: '3',
    name: 'Juan Carlos Torres',
    email: 'juan.torres@empresa.com',
    phone: '+57 310 555 7890',
    position: 'Contador Senior',
    department: 'Finanzas',
    supervisor: 'María López',
    employeeId: 'EMP-003',
    status: 'vacation',
    hireDate: '2020-01-10',
    salary: 4800000,
    location: 'Bogotá',
    contract: 'permanent',
    performance: 4.6,
    skills: ['Contabilidad', 'Auditoría', 'SAP', 'Excel Avanzado'],
    nextReview: '2024-01-10'
  },
  {
    id: '4',
    name: 'María Elena Silva',
    email: 'maria.silva@empresa.com',
    phone: '+57 300 444 5678',
    position: 'Especialista Marketing',
    department: 'Marketing',
    supervisor: 'Pedro Ramírez',
    employeeId: 'EMP-004',
    status: 'active',
    hireDate: '2023-05-12',
    salary: 3800000,
    location: 'Cali',
    contract: 'temporary',
    performance: 4.3,
    skills: ['Marketing Digital', 'SEO', 'Google Ads', 'Analytics'],
    nextReview: '2024-05-12'
  },
  {
    id: '5',
    name: 'Andrés Felipe Vega',
    email: 'andres.vega@empresa.com',
    phone: '+57 318 222 3456',
    position: 'Consultor',
    department: 'Consultoría',
    supervisor: 'Carmen Ruiz',
    employeeId: 'EMP-005',
    status: 'inactive',
    hireDate: '2023-11-01',
    salary: 4500000,
    location: 'Barranquilla',
    contract: 'contractor',
    performance: 4.1,
    skills: ['Consultoría', 'Análisis', 'PowerBI', 'Proyectos'],
    nextReview: '2024-11-01'
  }
];

const departments = ['Todos', 'Ventas', 'Tecnología', 'Finanzas', 'Marketing', 'RH', 'Consultoría'];

export default function EmpleadosRRHH() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/30 text-green-400 border-green-700';
      case 'inactive':
        return 'bg-red-900/30 text-red-400 border-red-700';
      case 'vacation':
        return 'bg-blue-900/30 text-blue-400 border-blue-700';
      case 'leave':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-700';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 4.5) return 'text-green-400';
    if (performance >= 4.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment === '' || selectedDepartment === 'Todos' || employee.department === selectedDepartment) &&
      (selectedStatus === '' || employee.status === selectedStatus)
    );
  });

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <span>Gestión de Empleados (RRHH)</span>
          </h1>
          <p className="text-gray-400 mt-2">Administra empleados, nómina y recursos humanos</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nuevo Empleado</span>
        </button>
      </div>

      {/* Métricas de RRHH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Empleados</p>
              <p className="text-2xl font-bold text-white">{totalEmployees}</p>
              <p className="text-blue-400 text-sm">En la empresa</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Empleados Activos</p>
              <p className="text-2xl font-bold text-white">{activeEmployees}</p>
              <p className="text-green-400 text-sm">Trabajando</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Nómina Total</p>
              <p className="text-2xl font-bold text-white">
                ${totalSalary.toLocaleString()}
              </p>
              <p className="text-purple-400 text-sm">Mensual</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Desempeño Promedio</p>
              <p className="text-2xl font-bold text-white">{avgPerformance.toFixed(1)}</p>
              <p className="text-yellow-400 text-sm">De 5.0</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o ID de empleado..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept === 'Todos' ? '' : dept}>{dept}</option>
              ))}
            </select>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="vacation">Vacaciones</option>
              <option value="leave">Licencia</option>
            </select>
            <div className="flex bg-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 rounded-l-lg ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de Empleados */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{employee.name}</h3>
                    <p className="text-gray-400 text-sm">{employee.position}</p>
                    <p className="text-gray-500 text-xs">{employee.employeeId}</p>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Building className="w-3 h-3 text-gray-400" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span>{employee.phone}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
                  {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </span>
                <div className="flex items-center space-x-2">
                  <Star className={`w-4 h-4 ${getPerformanceColor(employee.performance)}`} />
                  <span className="text-white text-sm font-medium">{employee.performance}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Salario:</span>
                  <span className="text-white font-medium">${employee.salary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Contrato:</span>
                  <span className="text-white capitalize">{employee.contract}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Supervisor:</span>
                  <span className="text-white">{employee.supervisor}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {employee.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded bg-purple-900/30 text-purple-400 text-xs">
                    {skill}
                  </span>
                ))}
                {employee.skills.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-700 text-gray-400 text-xs">
                    +{employee.skills.length - 3}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                  <p>Próxima evaluación:</p>
                  <p>{new Date(employee.nextReview).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-purple-400 transition-colors">
                    <Award className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Empleado
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Departamento
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Estado
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Salario
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Desempeño
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Contrato
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{employee.name}</p>
                          <p className="text-gray-400 text-sm">{employee.position}</p>
                          <p className="text-gray-500 text-xs">{employee.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{employee.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">${employee.salary.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Star className={`w-4 h-4 ${getPerformanceColor(employee.performance)}`} />
                        <span className={`font-medium ${getPerformanceColor(employee.performance)}`}>
                          {employee.performance}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 capitalize">{employee.contract}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-purple-400 transition-colors">
                          <Award className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Departamentos */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Resumen por Departamentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.filter(d => d !== 'Todos').map((dept) => {
            const deptEmployees = employees.filter(e => e.department === dept);
            const deptSalary = deptEmployees.reduce((sum, e) => sum + e.salary, 0);
            const deptAvgPerformance = deptEmployees.length > 0 
              ? deptEmployees.reduce((sum, e) => sum + e.performance, 0) / deptEmployees.length 
              : 0;

            return (
              <div key={dept} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{dept}</h3>
                  <span className="text-2xl font-bold text-blue-400">{deptEmployees.length}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Nómina:</span>
                    <span>${deptSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Desempeño:</span>
                    <span className={getPerformanceColor(deptAvgPerformance)}>
                      {deptAvgPerformance.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
