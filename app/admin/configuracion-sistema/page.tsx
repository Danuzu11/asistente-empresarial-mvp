'use client';

import { useState } from 'react';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell,
  Globe,
  Mail,
  Server,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Key,
  Lock,
  Zap,
  HardDrive
} from 'lucide-react';

interface SystemConfig {
  general: {
    siteName: string;
    siteDescription: string;
    adminEmail: string;
    timezone: string;
    language: string;
    dateFormat: string;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
    requireTwoFactor: boolean;
    allowedFileTypes: string[];
    maxFileSize: number;
  };
  email: {
    provider: string;
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
    fromName: string;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: string;
    retentionDays: number;
    backupLocation: string;
  };
}

const initialConfig: SystemConfig = {
  general: {
    siteName: 'Asistente Empresarial',
    siteDescription: 'Sistema integral de gestión empresarial',
    adminEmail: 'admin@empresa.com',
    timezone: 'America/Bogota',
    language: 'es',
    dateFormat: 'DD/MM/YYYY'
  },
  security: {
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png'],
    maxFileSize: 50
  },
  email: {
    provider: 'smtp',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPass: '',
    fromEmail: 'noreply@empresa.com',
    fromName: 'Asistente Empresarial'
  },
  backup: {
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    backupLocation: '/backups'
  }
};

export default function ConfiguracionSistema() {
  const [config, setConfig] = useState<SystemConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Seguridad', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'backup', name: 'Respaldos', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Settings className="w-8 h-8 text-blue-500" />
            <span>Configuración del Sistema</span>
          </h1>
          <p className="text-gray-400 mt-2">Configura los parámetros generales del sistema</p>
          {lastSaved && (
            <p className="text-green-400 text-sm mt-1 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Última actualización: {lastSaved.toLocaleTimeString()}</span>
            </p>
          )}
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </div>

      {/* Estado del Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Server className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-gray-400 text-sm">Estado del Servidor</p>
              <p className="text-lg font-bold text-green-400">En Línea</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <HardDrive className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-gray-400 text-sm">Espacio en Disco</p>
              <p className="text-lg font-bold text-white">75% (45GB)</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-gray-400 text-sm">Rendimiento</p>
              <p className="text-lg font-bold text-white">Excelente</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-gray-400 text-sm">Último Backup</p>
              <p className="text-lg font-bold text-white">Hace 2h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Configuración General</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del Sitio
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.general.siteName}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      general: { ...prev.general, siteName: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email del Administrador
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.general.adminEmail}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      general: { ...prev.general, adminEmail: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zona Horaria
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.general.timezone}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      general: { ...prev.general, timezone: e.target.value }
                    }))}
                  >
                    <option value="America/Bogota">Colombia (UTC-5)</option>
                    <option value="America/Mexico_City">México (UTC-6)</option>
                    <option value="America/New_York">Nueva York (UTC-5)</option>
                    <option value="Europe/Madrid">Madrid (UTC+1)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Idioma
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.general.language}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      general: { ...prev.general, language: e.target.value }
                    }))}
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción del Sitio
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.general.siteDescription}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    general: { ...prev.general, siteDescription: e.target.value }
                  }))}
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Configuración de Seguridad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tiempo de Sesión (minutos)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.security.sessionTimeout}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Máximos Intentos de Login
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.security.maxLoginAttempts}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Longitud Mínima de Contraseña
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.security.passwordMinLength}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tamaño Máximo de Archivo (MB)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.security.maxFileSize}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      security: { ...prev.security, maxFileSize: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  checked={config.security.requireTwoFactor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    security: { ...prev.security, requireTwoFactor: e.target.checked }
                  }))}
                />
                <label htmlFor="twoFactor" className="text-gray-300">
                  Requerir Autenticación de Dos Factores
                </label>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Configuración de Email</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Servidor SMTP
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.email.smtpHost}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      email: { ...prev.email, smtpHost: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Puerto SMTP
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.email.smtpPort}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      email: { ...prev.email, smtpPort: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Envío
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.email.fromEmail}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      email: { ...prev.email, fromEmail: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del Remitente
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.email.fromName}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      email: { ...prev.email, fromName: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 font-medium">Configuración Sensible</p>
                    <p className="text-yellow-300 text-sm mt-1">
                      Las credenciales SMTP son información sensible. Asegúrate de usar credenciales seguras y no compartirlas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Configuración de Respaldos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Frecuencia de Respaldo
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.backup.backupFrequency}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      backup: { ...prev.backup, backupFrequency: e.target.value }
                    }))}
                  >
                    <option value="hourly">Cada Hora</option>
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Días de Retención
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={config.backup.retentionDays}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      backup: { ...prev.backup, retentionDays: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoBackup"
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  checked={config.backup.autoBackup}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    backup: { ...prev.backup, autoBackup: e.target.checked }
                  }))}
                />
                <label htmlFor="autoBackup" className="text-gray-300">
                  Habilitar Respaldo Automático
                </label>
              </div>
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-400 font-medium">Estado del Respaldo</p>
                    <p className="text-blue-300 text-sm mt-1">
                      Último respaldo exitoso: Hoy a las 02:00 AM
                    </p>
                    <p className="text-blue-300 text-sm">
                      Próximo respaldo programado: Mañana a las 02:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
