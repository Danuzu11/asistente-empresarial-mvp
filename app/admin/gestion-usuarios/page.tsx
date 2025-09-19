'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit3,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  Settings,
  MoreHorizontal,
  Eye,
  KeyRound
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Carlos Pérez',
    email: 'juan.perez@empresa.com',
    role: 'Super Administrador',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    createdAt: '2023-06-15'
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria.gonzalez@empresa.com',
    role: 'Administrador RH',
    status: 'active',
    lastLogin: '2024-01-15 09:15',
    createdAt: '2023-07-20'
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@empresa.com',
    role: 'Supervisor Ventas',
    status: 'inactive',
    lastLogin: '2024-01-10 16:45',
    createdAt: '2023-08-10'
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana.martinez@empresa.com',
    role: 'Contador',
    status: 'active',
    lastLogin: '2024-01-15 11:20',
    createdAt: '2023-09-05'
  },
  {
    id: '5',
    name: 'Pedro López',
    email: 'pedro.lopez@empresa.com',
    role: 'Usuario Final',
    status: 'pending',
    lastLogin: 'Nunca',
    createdAt: '2024-01-14'
  }
];

const roles = [
  'Super Administrador',
  'Administrador RH',
  'Administrador Financiero',
  'Supervisor Ventas',
  'Supervisor Compras',
  'Contador',
  'Usuario Final'
];

export default function GestionUsuarios() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/30 text-green-400 border-green-700';
      case 'inactive':
        return 'bg-red-900/30 text-red-400 border-red-700';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <UserCheck className="w-3 h-3" />;
      case 'inactive':
        return <UserX className="w-3 h-3" />;
      case 'pending':
        return <Users className="w-3 h-3" />;
      default:
        return <Users className="w-3 h-3" />;
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole === '' || user.role === selectedRole) &&
      (selectedStatus === '' || user.status === selectedStatus)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <span>Gestión de Usuarios y Roles</span>
          </h1>
          <p className="text-gray-400 mt-2">Administra usuarios, roles y permisos del sistema</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-gray-400 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-gray-400 text-sm">Activos</p>
              <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <UserX className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-gray-400 text-sm">Inactivos</p>
              <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'inactive').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-gray-400 text-sm">Roles</p>
              <p className="text-2xl font-bold text-white">{roles.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios por nombre o email..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Todos los roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-40">
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                  Usuario
                </th>
                <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                  Rol
                </th>
                <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                  Estado
                </th>
                <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                  Último Acceso
                </th>
                <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                  Creado
                </th>
                <th className="text-center text-xs font-semibold text-gray-300 uppercase tracking-wider px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{user.createdAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-yellow-400 transition-colors">
                        <KeyRound className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No se encontraron usuarios que coincidan con los filtros</p>
          </div>
        )}
      </div>

      {/* Gestión de Roles */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Settings className="w-5 h-5 text-purple-500" />
          <span>Roles del Sistema</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, index) => (
            <div key={role} className="bg-gray-700 border border-gray-600 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{role}</p>
                  <p className="text-gray-400 text-sm">
                    {users.filter(u => u.role === role).length} usuarios
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
