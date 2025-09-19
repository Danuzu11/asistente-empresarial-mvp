'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit3,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Star,
  Building,
  UserCheck,
  Clock,
  Tag,
  MoreHorizontal
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  priority: 'high' | 'medium' | 'low';
  lastContact: string;
  totalValue: number;
  source: string;
  assignedTo: string;
  tags: string[];
  address: string;
  createdAt: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Ana María González',
    company: 'TechnoSoft S.A.S.',
    email: 'ana.gonzalez@technosoft.com',
    phone: '+57 300 123 4567',
    status: 'customer',
    priority: 'high',
    lastContact: '2024-01-15',
    totalValue: 25000000,
    source: 'Referido',
    assignedTo: 'Carlos Méndez',
    tags: ['VIP', 'Software'],
    address: 'Bogotá, Colombia',
    createdAt: '2023-08-15'
  },
  {
    id: '2',
    name: 'Miguel Rodríguez',
    company: 'Constructora del Caribe',
    email: 'miguel.rodriguez@construcciones.com',
    phone: '+57 315 987 6543',
    status: 'prospect',
    priority: 'medium',
    lastContact: '2024-01-12',
    totalValue: 15000000,
    source: 'Website',
    assignedTo: 'Laura Pérez',
    tags: ['Construcción', 'Nuevo'],
    address: 'Cartagena, Colombia',
    createdAt: '2024-01-05'
  },
  {
    id: '3',
    name: 'Patricia López',
    company: 'Clínica San Rafael',
    email: 'patricia.lopez@clinica.com',
    phone: '+57 310 555 7890',
    status: 'lead',
    priority: 'high',
    lastContact: '2024-01-14',
    totalValue: 8000000,
    source: 'LinkedIn',
    assignedTo: 'Juan Torres',
    tags: ['Salud', 'Urgente'],
    address: 'Medellín, Colombia',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Roberto Martínez',
    company: 'Innovación Digital',
    email: 'roberto@innovacion.com',
    phone: '+57 320 444 5678',
    status: 'inactive',
    priority: 'low',
    lastContact: '2023-11-20',
    totalValue: 5000000,
    source: 'Email Marketing',
    assignedTo: 'María Silva',
    tags: ['Digital', 'Pausado'],
    address: 'Cali, Colombia',
    createdAt: '2023-07-20'
  }
];

export default function CRMClientes() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
      case 'prospect':
        return 'bg-blue-900/30 text-blue-400 border-blue-700';
      case 'customer':
        return 'bg-green-900/30 text-green-400 border-green-700';
      case 'inactive':
        return 'bg-gray-900/30 text-gray-400 border-gray-700';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    return (
      (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
       customer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === '' || customer.status === selectedStatus) &&
      (selectedPriority === '' || customer.priority === selectedPriority)
    );
  });

  const totalValue = customers.reduce((sum, customer) => sum + customer.totalValue, 0);
  const activeCustomers = customers.filter(c => c.status === 'customer').length;
  const prospects = customers.filter(c => c.status === 'prospect').length;
  const leads = customers.filter(c => c.status === 'lead').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <span>Gestión de Clientes (CRM)</span>
          </h1>
          <p className="text-gray-400 mt-2">Gestiona clientes, prospectos y oportunidades de venta</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Métricas del CRM */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Clientes Activos</p>
              <p className="text-2xl font-bold text-white">{activeCustomers}</p>
              <p className="text-green-400 text-sm">+12% vs mes anterior</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Prospectos</p>
              <p className="text-2xl font-bold text-white">{prospects}</p>
              <p className="text-blue-400 text-sm">En seguimiento</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Leads</p>
              <p className="text-2xl font-bold text-white">{leads}</p>
              <p className="text-yellow-400 text-sm">Nuevos contactos</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Valor Total</p>
              <p className="text-2xl font-bold text-white">
                ${totalValue.toLocaleString()}
              </p>
              <p className="text-green-400 text-sm">+18% vs mes anterior</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
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
              placeholder="Buscar clientes por nombre, empresa o email..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="lead">Lead</option>
              <option value="prospect">Prospecto</option>
              <option value="customer">Cliente</option>
              <option value="inactive">Inactivo</option>
            </select>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">Todas las prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
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

      {/* Vista de Clientes */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{customer.name}</h3>
                    <p className="text-gray-400 text-sm">{customer.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className={`w-4 h-4 ${getPriorityColor(customer.priority)}`} />
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{customer.address}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </span>
                <div className="text-right">
                  <p className="text-white font-medium">${customer.totalValue.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Valor total</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {customer.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded bg-blue-900/30 text-blue-400 text-xs">
                    <Tag className="w-2 h-2 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Último contacto: {new Date(customer.lastContact).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                <span className="text-sm text-gray-400">Asignado a: {customer.assignedTo}</span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <Phone className="w-4 h-4" />
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
                    Cliente
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Estado
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Prioridad
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Valor
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Último Contacto
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Asignado a
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{customer.name}</p>
                          <p className="text-gray-400 text-sm">{customer.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Star className={`w-4 h-4 ${getPriorityColor(customer.priority)}`} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">${customer.totalValue.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{new Date(customer.lastContact).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{customer.assignedTo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Phone className="w-4 h-4" />
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
    </div>
  );
}
