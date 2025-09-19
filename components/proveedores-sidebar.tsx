"use client"

import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  Receipt, 
  Award, 
  RefreshCw, 
  MessageCircleQuestion, 
  Users, 
  Database, 
  Lock 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    title: 'Principal',
    items: [
      { name: 'Inicio', href: '/proveedores/inicio', icon: Home },
      { name: 'Peticiones de Oferta', href: '/proveedores/peticiones-oferta', icon: FileText },
      { name: 'Órdenes de Compras', href: '/proveedores/ordenes-compras', icon: ShoppingCart },
      { name: 'Cuentas por Cobrar', href: '/proveedores/cuentas-cobrar', icon: CreditCard },
    ]
  },
  {
    title: 'Gestión',
    items: [
      { name: 'Estado de Cuenta', href: '/proveedores/estado-cuenta', icon: Receipt },
      { name: 'Certificados', href: '/proveedores/certificados', icon: Award },
      { name: 'Actualización de Datos', href: '/proveedores/actualizacion-datos', icon: RefreshCw },
      { name: 'PQRS', href: '/proveedores/pqrs', icon: MessageCircleQuestion },
    ]
  },
  {
    title: 'Administración',
    items: [
      { name: 'Usuarios', href: '/proveedores/usuarios', icon: Users },
      { name: 'Sociedades', href: '/proveedores/sociedades', icon: Database },
      { name: 'Seguridad', href: '/proveedores/seguridad', icon: Lock },
    ]
  }
]

export function ProveedoresSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Proveedores</h2>
        
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
                        <span>{item.name}</span>
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
