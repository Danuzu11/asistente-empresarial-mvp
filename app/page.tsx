'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar si ya está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative w-full max-w-4xl text-center">
        {/* Hero section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/20 rounded-3xl mb-8">
            <Building2 className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Asistente
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Empresarial
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Gestiona tu empresa de manera eficiente con nuestra plataforma integral de administración empresarial.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <button
            onClick={() => router.push('/login')}
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl"
          >
            <span>Acceder al Sistema</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Gestión Empresarial</h3>
            <p className="text-slate-400 text-sm">
              Administra todos los aspectos de tu empresa desde una sola plataforma.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Building2 className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Análisis en Tiempo Real</h3>
            <p className="text-slate-400 text-sm">
              Obtén insights valiosos con reportes y métricas actualizadas al instante.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Building2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Colaboración Eficiente</h3>
            <p className="text-slate-400 text-sm">
              Trabaja en equipo de manera coordinada y productiva.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Asistente Empresarial. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Efectos de luz */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-slate-500/20 rounded-full blur-3xl"></div>
    </div>
  );
}
