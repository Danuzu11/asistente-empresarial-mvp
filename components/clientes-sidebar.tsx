"use client"

import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  UserCheck,
  LayoutDashboard,
  RefreshCw,
  BookOpen,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Package,
  RotateCcw,
  Briefcase,
  FileText,
  ClipboardList,
  Calendar,
  CalendarCheck,
  MessageSquare,
  Bell,
  HeadphonesIcon,
  HelpCircle,
  Receipt,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    title: 'Gestión de Cuenta',
    items: [
      { name: 'Inicio / Dashboard Principal', href: '/clientes/inicio', icon: Home },
      { name: 'Proceso de Onboarding', href: '/clientes/onboarding', icon: UserCheck },
      { name: 'Panel Principal (Dashboard)', href: '/clientes/dashboard', icon: LayoutDashboard },
      { name: 'Actualización de Datos', href: '/clientes/actualizacion-datos', icon: RefreshCw },
      { name: 'Gestión de Directorios', href: '/clientes/directorios', icon: BookOpen },
    ]
  },
  {
    title: 'Comercio Electrónico',
    items: [
      { name: 'Catálogo de Productos', href: '/clientes/catalogo', icon: ShoppingBag },
      { name: 'Carrito de Compras', href: '/clientes/carrito', icon: ShoppingCart },
      { name: 'Proceso de Pago', href: '/clientes/pago', icon: CreditCard },
      { name: 'Historia y Seguimiento de Pedidos', href: '/clientes/pedidos', icon: Package },
      { name: 'Gestión de Devoluciones (RMA)', href: '/clientes/devoluciones', icon: RotateCcw },
    ]
  },
  {
    title: 'Servicios y Proyectos',
    items: [
      { name: 'Catálogo de Servicios', href: '/clientes/servicios', icon: Briefcase },
      { name: 'Gestión de Contratos y Suscripciones', href: '/clientes/contratos', icon: FileText },
      { name: 'Seguimiento de Tareas o Proyectos', href: '/clientes/tareas', icon: ClipboardList },
    ]
  },
  {
    title: 'Agendamiento',
    items: [
      { name: 'Calendario de Disponibilidad', href: '/clientes/calendario', icon: Calendar },
      { name: 'Reserva en Línea', href: '/clientes/reservas', icon: CalendarCheck },
      { name: 'Gestión de Citas', href: '/clientes/citas', icon: MessageSquare },
      { name: 'Recordatorios Automáticos', href: '/clientes/recordatorios', icon: Bell },
    ]
  },
  {
    title: 'Soporte y Facturación',
    items: [
      { name: 'Sistema de Tickets de Soporte', href: '/clientes/tickets', icon: HeadphonesIcon },
      { name: 'Base de Conocimiento (FAQ)', href: '/clientes/faq', icon: HelpCircle },
      { name: 'Historial de Facturación', href: '/clientes/facturacion', icon: Receipt },
      { name: 'Información de la Empresa', href: '/clientes/empresa', icon: Building2 },
    ]
  }
]

export function ClientesSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Clientes</h2>
        
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
                        <Icon className="w-4 h-4" />
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
