"use client"

import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Shield,
  Users,
  Settings,
  Building2,
  Bell,
  ShoppingCart,
  FileText,
  Database,
  CheckSquare,
  Package,
  TrendingUp,
  CreditCard,
  DollarSign,
  Receipt,
  Calculator,
  Warehouse,
  Boxes,
  Wrench,
  BarChart3,
  PieChart,
  FileBarChart,
  Target,
  UserCheck,
  Calendar,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Phone,
  HelpCircle,
  Clipboard,
  Truck,
  ShoppingBag,
  Star,
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    title: 'ADMIN',
    items: [
      { name: 'Dashboard Principal', href: '/admin/dashboard', icon: Home },
    ]
  },
  {
    title: 'Configuración General y del Sistema (Core Admin)',
    items: [
      { name: 'Gestión de Usuarios y Roles', href: '/admin/gestion-usuarios', icon: Users },
      { name: 'Configuración de la Compañía', href: '/admin/configuracion-empresa', icon: Building2 },
      { name: 'Gestor de Plantillas y Notificaciones', href: '/admin/plantillas-notificaciones', icon: Bell },
      { name: 'Configuración del Sistema', href: '/admin/configuracion-sistema', icon: Settings },
    ]
  },
  {
    title: 'Módulo de Compras (Procurement)',
    items: [
      { name: 'Base de Datos de Proveedores', href: '/admin/compras-proveedores', icon: Database },
      { name: 'Gestión de Adquisiciones', href: '/admin/adquisiciones', icon: ShoppingCart },
      { name: 'Validación de Documentos', href: '/admin/validacion-documentos', icon: CheckSquare },
    ]
  },
  {
    title: 'Módulo de Ventas y CRM',
    items: [
      { name: 'Gestión de Clientes (CRM)', href: '/admin/crm-clientes', icon: Users },
      { name: 'Gestión de Ventas', href: '/admin/ventas', icon: TrendingUp },
      { name: 'Configuración del Catálogo', href: '/admin/catalogo-productos', icon: Package },
      { name: 'Gestión de Citas y Agendas', href: '/admin/citas-agendas', icon: Calendar },
      { name: 'Mesa de Ayuda (Helpdesk)', href: '/admin/helpdesk', icon: HeartHandshake },
    ]
  },
  {
    title: 'Módulo de Recursos Humanos (HRM)',
    items: [
      { name: 'Base de Datos de Empleados', href: '/admin/empleados-rrhh', icon: UserCheck },
      { name: 'Gestión de Solicitudes', href: '/admin/solicitudes-rrhh', icon: FileText },
      { name: 'Administración de Nómina', href: '/admin/nomina', icon: Receipt },
      { name: 'Gestión del Talento', href: '/admin/gestion-talento', icon: GraduationCap },
    ]
  },
  {
    title: 'Módulo Financiero y Contable',
    items: [
      { name: 'Cuentas por Pagar', href: '/admin/cuentas-pagar', icon: CreditCard },
      { name: 'Cuentas por Cobrar', href: '/admin/cuentas-cobrar', icon: DollarSign },
      { name: 'Contabilidad General', href: '/admin/contabilidad', icon: Calculator },
      { name: 'Gestión de Impuestos', href: '/admin/impuestos', icon: Receipt },
    ]
  },
  {
    title: 'Módulo de Inventario y Logística',
    items: [
      { name: 'Gestión de Almacenes', href: '/admin/inventario-almacenes', icon: Warehouse },
      { name: 'Gestión de Productos', href: '/admin/gestion-productos', icon: Boxes },
      { name: 'Gestión de Servicios', href: '/admin/gestion-servicios', icon: Wrench },
      { name: 'Operaciones de Inventario', href: '/admin/operaciones-inventario', icon: Truck },
    ]
  },
  {
    title: 'Módulo de Reportes e Inteligencia de Negocio (BI)',
    items: [
      { name: 'Dashboards Personalizables', href: '/admin/dashboards', icon: BarChart3 },
      { name: 'Generador de Reportes', href: '/admin/reportes', icon: FileBarChart },
    ]
  }
]

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <span>Administración</span>
        </h2>
        
        <nav className="space-y-6">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => router.push(item.href)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors",
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:text-white hover:bg-gray-700"
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
