"use client"

import { useState } from 'react'
import { 
  ClipboardList, 
  Search, 
  Filter,
  Plus,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Flag,
  MessageSquare,
  Paperclip,
  MoreVertical
} from 'lucide-react'

export default function ClientesTareasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [priorityFilter, setPriorityFilter] = useState('Todos')
  const [projectFilter, setProjectFilter] = useState('Todos')
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  const statuses = ['Todos', 'Por Hacer', 'En Progreso', 'En Revisión', 'Completado', 'Bloqueado']
  const priorities = ['Todos', 'Baja', 'Media', 'Alta', 'Crítica']
  const projects = ['Todos', 'Transformación Digital', 'Desarrollo Software', 'Soporte Técnico', 'Capacitación']

  const tasks = [
    {
      id: "TSK-001",
      title: "Análisis de Procesos Actuales",
      description: "Revisar y documentar todos los procesos empresariales existentes",
      project: "Transformación Digital",
      status: "Completado",
      priority: "Alta",
      assignee: "María González",
      assigneeAvatar: "MG",
      dueDate: "2024-09-15",
      completedDate: "2024-09-14",
      progress: 100,
      comments: 3,
      attachments: 2,
      tags: ["Análisis", "Documentación"]
    },
    {
      id: "TSK-002", 
      title: "Desarrollo del Módulo de Usuarios",
      description: "Crear el sistema de gestión de usuarios con roles y permisos",
      project: "Desarrollo Software",
      status: "En Progreso",
      priority: "Alta",
      assignee: "Carlos Ruiz",
      assigneeAvatar: "CR",
      dueDate: "2024-10-20",
      progress: 65,
      comments: 8,
      attachments: 5,
      tags: ["Desarrollo", "Backend"],
      subtasks: [
        { name: "Diseño de base de datos", completed: true },
        { name: "API de autenticación", completed: true },
        { name: "Interfaz de usuario", completed: false },
        { name: "Testing", completed: false }
      ]
    },
    {
      id: "TSK-003",
      title: "Configuración del Servidor de Respaldos",
      description: "Implementar sistema automatizado de respaldos para la infraestructura",
      project: "Soporte Técnico",
      status: "Por Hacer",
      priority: "Media",
      assignee: "Ana López",
      assigneeAvatar: "AL",
      dueDate: "2024-10-25",
      progress: 0,
      comments: 1,
      attachments: 0,
      tags: ["Infraestructura", "Seguridad"]
    },
    {
      id: "TSK-004",
      title: "Preparación Material de Capacitación",
      description: "Crear presentaciones y ejercicios prácticos para el programa de formación",
      project: "Capacitación",
      status: "En Revisión",
      priority: "Media",
      assignee: "Luisa Martínez",
      assigneeAvatar: "LM",
      dueDate: "2024-10-15",
      progress: 85,
      comments: 4,
      attachments: 12,
      tags: ["Educación", "Contenido"],
      pendingApproval: true
    },
    {
      id: "TSK-005",
      title: "Integración con API de Terceros",
      description: "Conectar el sistema con servicios externos de facturación",
      project: "Desarrollo Software",
      status: "Bloqueado",
      priority: "Crítica",
      assignee: "Roberto Silva",
      assigneeAvatar: "RS",
      dueDate: "2024-10-10",
      progress: 30,
      comments: 6,
      attachments: 3,
      tags: ["Integración", "API"],
      blockedReason: "Esperando credenciales de la API externa"
    },
    {
      id: "TSK-006",
      title: "Estrategia de Migración de Datos",
      description: "Planificar la migración de datos del sistema legacy al nuevo sistema",
      project: "Transformación Digital",
      status: "En Progreso",
      priority: "Alta",
      assignee: "Diego Herrera",
      assigneeAvatar: "DH",
      dueDate: "2024-11-01",
      progress: 45,
      comments: 5,
      attachments: 7,
      tags: ["Migración", "Datos"]
    }
  ]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'Todos' || task.priority === priorityFilter
    const matchesProject = projectFilter === 'Todos' || task.project === projectFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesProject
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica': return 'text-red-400 bg-red-900/50'
      case 'Alta': return 'text-orange-400 bg-orange-900/50'
      case 'Media': return 'text-yellow-400 bg-yellow-900/50'
      case 'Baja': return 'text-green-400 bg-green-900/50'
      default: return 'text-gray-400 bg-gray-900/50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Por Hacer': return 'bg-gray-700 text-gray-300'
      case 'En Progreso': return 'bg-blue-700 text-blue-300'
      case 'En Revisión': return 'bg-yellow-700 text-yellow-300'
      case 'Completado': return 'bg-green-700 text-green-300'
      case 'Bloqueado': return 'bg-red-700 text-red-300'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  const getTaskStats = () => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'Completado').length,
      inProgress: tasks.filter(t => t.status === 'En Progreso').length,
      blocked: tasks.filter(t => t.status === 'Bloqueado').length
    }
  }

  const stats = getTaskStats()

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs text-gray-400">{task.id}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          <h4 className="text-white font-medium mb-2">{task.title}</h4>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-white">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {task.subtasks && (
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">
            Subtareas: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
          </div>
          <div className="w-full bg-gray-600 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full"
              style={{ width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {task.progress > 0 && !task.subtasks && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Progreso</span>
            <span className="text-white">{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map(tag => (
          <span key={tag} className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded">
            {tag}
          </span>
        ))}
      </div>

      {task.blockedReason && (
        <div className="mb-3 p-2 bg-red-900/20 border border-red-700 rounded text-xs text-red-400">
          🚫 {task.blockedReason}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
              {task.assigneeAvatar}
            </div>
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(task.dueDate).toLocaleDateString('es-ES')}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {task.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="w-3 h-3" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Seguimiento de Tareas o Proyectos 📋
          </h2>
          <p className="text-gray-400">
            Gestiona y da seguimiento a todas las tareas de tus proyectos
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nueva Tarea</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Tareas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
              <p className="text-sm text-gray-400">En Progreso</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
              <p className="text-sm text-gray-400">Completadas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.blocked}</p>
              <p className="text-sm text-gray-400">Bloqueadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>

            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {statuses.slice(1).map((status) => (
          <div key={status} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(status)}`}>
                {status}
              </h3>
              <span className="text-xs text-gray-400">
                {filteredTasks.filter(task => task.status === status).length}
              </span>
            </div>
            
            <div className="space-y-3">
              {filteredTasks
                .filter(task => task.status === status)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
            
            {filteredTasks.filter(task => task.status === status).length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No hay tareas en este estado
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-16">
          <ClipboardList className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No se encontraron tareas</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm || statusFilter !== 'Todos' || priorityFilter !== 'Todos' || projectFilter !== 'Todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primera tarea'
            }
          </p>
        </div>
      )}
    </div>
  )
}
