'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User, Calendar, TrendingUp, Users, Building2, Bell, MessageSquare, ChevronDown, UserCheck, Shield, MessageCircle, Settings, UserCircle, Key, HelpCircle, Home, FileText, ShoppingCart, CreditCard, Receipt, Award, RefreshCw, MessageCircleQuestion, Database, Lock, Target, GraduationCap, DollarSign, Calculator, Warehouse, Package, Wrench, BarChart3, FileBarChart} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title = "Dashboard", subtitle = "Panel de control empresarial" }: DashboardLayoutProps) {
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setUserEmail(email || '');
    setIsLoading(false);
  }, [router]);

  // Cerrar dropdowns al hacer clic fuera (solo para el profile dropdown ahora)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const showDropdown = (dropdownName: string) => {
    // Cancelar cualquier timeout pendiente
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(dropdownName);
  };

  const hideDropdown = () => {
    // Agregar delay antes de cerrar el dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
      setCloseTimeout(null);
    }, 100); // 100ms de delay
    setCloseTimeout(timeout);
  };

  const keepDropdownOpen = () => {
    // Cancelar el cierre del dropdown si el mouse vuelve al área
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  const closeDropdown = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(null);
  };

  const toggleProfileDropdown = () => {
    // Abrir o cerrar el dropdown de perfil
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    // Cerrar otros dropdowns
    hideDropdown(); 
  };

  // Si está cargando, mostrar el spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">Asistente Empresarial</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/chat')}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Chat IA</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
               <div className="flex items-center space-x-3">
                 <div className="relative profile-dropdown">
                   <button
                     onClick={toggleProfileDropdown}
                     className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                   >
                     <User className="w-4 h-4 text-gray-300" />
                   </button>
                   
                   {isProfileDropdownOpen && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                       <div className="p-4">
                         <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700">
                           <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                             <User className="w-5 h-5 text-white" />
                           </div>
                           <div>
                             <p className="text-sm font-medium text-white">{userEmail}</p>
                             <p className="text-xs text-gray-400">Administrador</p>
                           </div>
                         </div>
                         
                         <div className="space-y-1">
                           <button className="w-full text-left flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                             <UserCircle className="w-4 h-4" />
                             <span className="text-sm">Mi Perfil</span>
                           </button>
                           
                           <button className="w-full text-left flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                             <Settings className="w-4 h-4" />
                             <span className="text-sm">Configuración</span>
                           </button>
                           
                           <button className="w-full text-left flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                             <Key className="w-4 h-4" />
                             <span className="text-sm">Cambiar Contraseña</span>
                           </button>
                           
                           <div className="border-t border-gray-700 my-2"></div>
                           
                           <button className="w-full text-left flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                             <HelpCircle className="w-4 h-4" />
                             <span className="text-sm">Ayuda y Soporte</span>
                           </button>
                           
                           <button 
                             onClick={handleLogout}
                             className="w-full text-left flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                           >
                             <LogOut className="w-4 h-4" />
                             <span className="text-sm">Cerrar Sesión</span>
                           </button>
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               </div>

            </div>
          </div>
        </div>
      </header>

      {/* Top Navigation Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <div className="flex items-center space-x-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Clientes */}
          <div className="relative" onMouseEnter={() => showDropdown('clientes')} onMouseLeave={hideDropdown}>
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Clientes</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {activeDropdown === 'clientes' && (
              <div 
                className="absolute top-full left-0 mt-2 w-[36rem] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={keepDropdownOpen}
                onMouseLeave={hideDropdown}
              >
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Portal Cliente</div>
                    <div
                      onClick={() => {router.push('/clientes/inicio'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Dashboard Principal
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/onboarding'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Proceso de Onboarding
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/actualizacion-datos'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Actualización de Datos
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/directorios'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Gestión de Directorios
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">E-Commerce</div>
                    <div
                      onClick={() => {router.push('/clientes/catalogo'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Catálogo de Productos
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/carrito'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Carrito de Compras
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/pedidos'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Seguimiento de Pedidos
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/devoluciones'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Gestión de Devoluciones
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Soporte & Servicios</div>
                    <div
                      onClick={() => {router.push('/clientes/servicios'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Catálogo de Servicios
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/citas'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Gestión de Citas
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/tickets'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Tickets de Soporte
                    </div>
                    <div
                      onClick={() => {router.push('/clientes/facturacion'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      Historial de Facturación
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Proveedores */}
          <div className="relative" onMouseEnter={() => showDropdown('proveedores')} onMouseLeave={hideDropdown}>
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>Proveedores</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {activeDropdown === 'proveedores' && (
              <div 
                className="absolute top-full left-0 mt-2 w-[36rem] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={keepDropdownOpen}
                onMouseLeave={hideDropdown}
              >
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Principal</div>
                    <div
                      onClick={() => {router.push('/proveedores/inicio'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Home className="w-3 h-3" />
                      <span>Inicio</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/peticiones-oferta'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Peticiones de Oferta</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/ordenes-compras'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Órdenes de Compras</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/cuentas-cobrar'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>Cuentas por Cobrar</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Gestión</div>
                    <div
                      onClick={() => {router.push('/proveedores/estado-cuenta'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Receipt className="w-3 h-3" />
                      <span>Estado de Cuenta</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/certificados'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Award className="w-3 h-3" />
                      <span>Certificados</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/actualizacion-datos'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Actualización de Datos</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/pqrs'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <MessageCircleQuestion className="w-3 h-3" />
                      <span>PQRS</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Administración</div>
                    <div
                      onClick={() => {router.push('/proveedores/usuarios'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Users className="w-3 h-3" />
                      <span>Usuarios</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/sociedades'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Database className="w-3 h-3" />
                      <span>Sociedades</span>
                    </div>
                    <div
                      onClick={() => {router.push('/proveedores/seguridad'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Seguridad</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Empleados */}
          <div className="relative" onMouseEnter={() => showDropdown('empleados')} onMouseLeave={hideDropdown}>
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Empleados</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {activeDropdown === 'empleados' && (
              <div 
                className="absolute top-full left-0 mt-2 w-[36rem] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={keepDropdownOpen}
                onMouseLeave={hideDropdown}
              >
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Cuenta Personal</div>
                    <div
                      onClick={() => {router.push('/empleados/dashboard'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Home className="w-3 h-3" />
                      <span>Dashboard Principal</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/perfil'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <UserCircle className="w-3 h-3" />
                      <span>Perfil del Empleado</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/actualizar-datos'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Actualización de Datos</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/hoja-vida'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Hoja de Vida Interna</span>
                    </div>
                    
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 mt-4">Documentos</div>
                    <div
                      onClick={() => {router.push('/empleados/certificados-laborales'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Award className="w-3 h-3" />
                      <span>Certificados Laborales</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/recibos-nomina'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Receipt className="w-3 h-3" />
                      <span>Recibos de Nómina</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Operaciones</div>
                    <div
                      onClick={() => {router.push('/empleados/solicitudes'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Portal de Solicitudes</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/vacaciones'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Vacaciones y Ausencias</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/gastos'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>Legalización de Gastos</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/pqrs'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <MessageCircleQuestion className="w-3 h-3" />
                      <span>PQRS</span>
                    </div>
                    
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 mt-4">Compras Internas</div>
                    <div
                      onClick={() => {router.push('/empleados/requisiciones'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Crear Requerimientos</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/aprobaciones'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>Flujo de Aprobación</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Talento y Desempeño</div>
                    <div
                      onClick={() => {router.push('/empleados/evaluaciones'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>Evaluaciones</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/objetivos'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Target className="w-3 h-3" />
                      <span>Objetivos y Metas (OKRs)</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/capacitacion'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <GraduationCap className="w-3 h-3" />
                      <span>Capacitación (LMS)</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/organigrama'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Users className="w-3 h-3" />
                      <span>Organigrama</span>
                    </div>
                    
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 mt-4">Comunicación</div>
                    <div
                      onClick={() => {router.push('/empleados/noticias'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Bell className="w-3 h-3" />
                      <span>Noticias y Comunicados</span>
                    </div>
                    <div
                      onClick={() => {router.push('/empleados/directorio'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Database className="w-3 h-3" />
                      <span>Directorio de Empleados</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Zona Admin */}
          <div className="relative" onMouseEnter={() => showDropdown('zona-admin')} onMouseLeave={hideDropdown}>
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Zona Admin</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {activeDropdown === 'zona-admin' && (
              <div 
                className="absolute top-full left-0 mt-2 w-[48rem] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={keepDropdownOpen}
                onMouseLeave={hideDropdown}
              >
                <div className="grid grid-cols-4 gap-4 p-4">
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Dashboard</div>
                    <div
                      onClick={() => {router.push('/admin/dashboard'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Home className="w-3 h-3" />
                      <span>Dashboard Principal</span>
                    </div>
                    
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 mt-4">Sistema Core</div>
                    <div
                      onClick={() => {router.push('/admin/gestion-usuarios'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Users className="w-3 h-3" />
                      <span>Usuarios y Roles</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/configuracion-sistema'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Settings className="w-3 h-3" />
                      <span>Configuración</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/configuracion-empresa'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Building2 className="w-3 h-3" />
                      <span>Empresa</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Compras</div>
                    <div
                      onClick={() => {router.push('/admin/compras-proveedores'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Database className="w-3 h-3" />
                      <span>Proveedores</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/adquisiciones'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Adquisiciones</span>
                    </div>
                    
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 mt-4">Ventas & CRM</div>
                    <div
                      onClick={() => {router.push('/admin/crm-clientes'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Users className="w-3 h-3" />
                      <span>CRM Clientes</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/ventas'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>Ventas</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/helpdesk'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <MessageCircleQuestion className="w-3 h-3" />
                      <span>Mesa de Ayuda</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Recursos Humanos</div>
                    <div
                      onClick={() => {router.push('/admin/empleados-rrhh'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>Empleados</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/nomina'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Receipt className="w-3 h-3" />
                      <span>Nómina</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/gestion-talento'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <GraduationCap className="w-3 h-3" />
                      <span>Talento</span>
                    </div>
                    
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 mt-4">Financiero</div>
                    <div
                      onClick={() => {router.push('/admin/cuentas-cobrar'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <DollarSign className="w-3 h-3" />
                      <span>Cuentas por Cobrar</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/contabilidad'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Calculator className="w-3 h-3" />
                      <span>Contabilidad</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Inventario</div>
                    <div
                      onClick={() => {router.push('/admin/inventario-almacenes'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Warehouse className="w-3 h-3" />
                      <span>Almacenes</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/gestion-productos'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Package className="w-3 h-3" />
                      <span>Productos</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/gestion-servicios'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <Wrench className="w-3 h-3" />
                      <span>Servicios</span>
                    </div>
                    
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 mt-4">Reportes & BI</div>
                    <div
                      onClick={() => {router.push('/admin/dashboards'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <BarChart3 className="w-3 h-3" />
                      <span>Dashboards</span>
                    </div>
                    <div
                      onClick={() => {router.push('/admin/reportes'); closeDropdown();}}
                      className="text-gray-300 hover:text-white cursor-pointer py-1 flex items-center space-x-2"
                    >
                      <FileBarChart className="w-3 h-3" />
                      <span>Reportes</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="relative" onMouseEnter={() => showDropdown('chat')} onMouseLeave={hideDropdown}>
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {activeDropdown === 'chat' && (
              <div 
                className="absolute top-full left-0 mt-2 w-[36rem] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={keepDropdownOpen}
                onMouseLeave={hideDropdown}
              >
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Conversaciones</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Chat Interno</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Soporte</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Historial</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Archivos</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">IA</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Asistente IA</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Consultas</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Respuestas</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Aprendizaje</div>
                  </div>
                  <div className="space-y-2">
                  <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Extras</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Ejemplo 1</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Ejemplo 2</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Ejemplo 3</div>
                    <div className="text-gray-300 hover:text-white cursor-pointer py-1">Ejemplo 4</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
