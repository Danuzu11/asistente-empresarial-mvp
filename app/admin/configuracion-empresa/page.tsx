'use client';

import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  FileText,
  Upload,
  Save,
  RefreshCw,
  CheckCircle,
  Edit3,
  Trash2,
  Plus,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';

interface CompanyInfo {
  basicInfo: {
    name: string;
    legalName: string;
    taxId: string;
    industry: string;
    foundedDate: string;
    website: string;
    description: string;
    logo: string;
  };
  contact: {
    mainPhone: string;
    fax: string;
    email: string;
    supportEmail: string;
    salesEmail: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  branches: Array<{
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    manager: string;
  }>;
  financial: {
    currency: string;
    fiscalYearStart: string;
    taxRegime: string;
    bankAccount: string;
    bankName: string;
  };
}

const initialCompanyInfo: CompanyInfo = {
  basicInfo: {
    name: 'Empresa Ejemplo S.A.S.',
    legalName: 'Empresa Ejemplo Sociedad por Acciones Simplificada',
    taxId: '900.123.456-7',
    industry: 'Tecnología y Software',
    foundedDate: '2020-01-15',
    website: 'https://www.empresaejemplo.com',
    description: 'Empresa especializada en desarrollo de software empresarial y soluciones tecnológicas innovadoras.',
    logo: ''
  },
  contact: {
    mainPhone: '+57 (1) 234-5678',
    fax: '+57 (1) 234-5679',
    email: 'contacto@empresaejemplo.com',
    supportEmail: 'soporte@empresaejemplo.com',
    salesEmail: 'ventas@empresaejemplo.com'
  },
  address: {
    street: 'Carrera 7 # 71-21, Torre B, Oficina 501',
    city: 'Bogotá',
    state: 'Cundinamarca',
    postalCode: '110231',
    country: 'Colombia'
  },
  branches: [
    {
      id: '1',
      name: 'Sede Principal - Bogotá',
      phone: '+57 (1) 234-5678',
      email: 'bogota@empresaejemplo.com',
      address: 'Carrera 7 # 71-21, Torre B, Oficina 501, Bogotá',
      manager: 'Juan Carlos Pérez'
    },
    {
      id: '2',
      name: 'Sucursal Medellín',
      phone: '+57 (4) 321-6789',
      email: 'medellin@empresaejemplo.com',
      address: 'Carrera 43A # 14-20, Medellín',
      manager: 'María González'
    }
  ],
  financial: {
    currency: 'COP',
    fiscalYearStart: '01-01',
    taxRegime: 'Régimen Ordinario',
    bankAccount: '1234-5678-9012',
    bankName: 'Banco de Bogotá'
  }
};

export default function ConfiguracionEmpresa() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(initialCompanyInfo);
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showAddBranch, setShowAddBranch] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const tabs = [
    { id: 'basic', name: 'Información Básica', icon: Building2 },
    { id: 'contact', name: 'Contacto', icon: Phone },
    { id: 'address', name: 'Dirección', icon: MapPin },
    { id: 'branches', name: 'Sucursales', icon: Users },
    { id: 'financial', name: 'Información Financiera', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-500" />
            <span>Configuración de la Empresa</span>
          </h1>
          <p className="text-gray-400 mt-2">Gestiona la información corporativa y datos de la empresa</p>
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

      {/* Resumen Ejecutivo */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{companyInfo.basicInfo.name}</h2>
            <p className="text-gray-400">{companyInfo.basicInfo.legalName}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
              <span>NIT: {companyInfo.basicInfo.taxId}</span>
              <span>•</span>
              <span>{companyInfo.basicInfo.industry}</span>
              <span>•</span>
              <span>Fundada: {new Date(companyInfo.basicInfo.foundedDate).getFullYear()}</span>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{companyInfo.address.city}, {companyInfo.address.country}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4 text-gray-400" />
                <a href={companyInfo.basicInfo.website} className="text-sm text-blue-400 hover:text-blue-300">
                  {companyInfo.basicInfo.website}
                </a>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{companyInfo.branches.length}</p>
            <p className="text-gray-400 text-sm">Sucursales</p>
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
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Información Básica</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Comercial
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.basicInfo.name}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, name: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Razón Social
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.basicInfo.legalName}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, legalName: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    NIT / RUT
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.basicInfo.taxId}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, taxId: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industria / Sector
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.basicInfo.industry}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, industry: e.target.value }
                    }))}
                  >
                    <option value="Tecnología y Software">Tecnología y Software</option>
                    <option value="Manufactura">Manufactura</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Comercio">Comercio</option>
                    <option value="Salud">Salud</option>
                    <option value="Educación">Educación</option>
                    <option value="Construcción">Construcción</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fecha de Fundación
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.basicInfo.foundedDate}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, foundedDate: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sitio Web
                  </label>
                  <input
                    type="url"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.basicInfo.website}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, website: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción de la Empresa
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={companyInfo.basicInfo.description}
                  onChange={(e) => setCompanyInfo(prev => ({
                    ...prev,
                    basicInfo: { ...prev.basicInfo, description: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Logo de la Empresa
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                      Subir Logo
                    </button>
                    <p className="text-gray-400 text-xs mt-1">PNG, JPG hasta 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Información de Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono Principal
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.contact.mainPhone}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      contact: { ...prev.contact, mainPhone: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fax
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.contact.fax}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      contact: { ...prev.contact, fax: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Principal
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.contact.email}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Soporte
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.contact.supportEmail}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      contact: { ...prev.contact, supportEmail: e.target.value }
                    }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Ventas
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.contact.salesEmail}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      contact: { ...prev.contact, salesEmail: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Dirección Principal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dirección Completa
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.address.street}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.address.city}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, city: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Departamento/Estado
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.address.state}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, state: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.address.postalCode}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, postalCode: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    País
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.address.country}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, country: e.target.value }
                    }))}
                  >
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="España">España</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Sucursales y Oficinas</h2>
                <button 
                  onClick={() => setShowAddBranch(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Sucursal</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyInfo.branches.map((branch) => (
                  <div key={branch.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-medium">{branch.name}</h3>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{branch.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span>Gerente: {branch.manager}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Información Financiera</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Moneda Principal
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.financial.currency}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      financial: { ...prev.financial, currency: e.target.value }
                    }))}
                  >
                    <option value="COP">Peso Colombiano (COP)</option>
                    <option value="USD">Dólar Americano (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="MXN">Peso Mexicano (MXN)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Inicio Año Fiscal
                  </label>
                  <input
                    type="text"
                    placeholder="DD-MM"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.financial.fiscalYearStart}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      financial: { ...prev.financial, fiscalYearStart: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Régimen Tributario
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.financial.taxRegime}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      financial: { ...prev.financial, taxRegime: e.target.value }
                    }))}
                  >
                    <option value="Régimen Ordinario">Régimen Ordinario</option>
                    <option value="Régimen Simplificado">Régimen Simplificado</option>
                    <option value="Gran Contribuyente">Gran Contribuyente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Banco Principal
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.financial.bankName}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      financial: { ...prev.financial, bankName: e.target.value }
                    }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Cuenta Principal
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={companyInfo.financial.bankAccount}
                    onChange={(e) => setCompanyInfo(prev => ({
                      ...prev,
                      financial: { ...prev.financial, bankAccount: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
