'use client';

import { useState } from 'react';
import { Receipt, Download, Eye, Search, Calendar, DollarSign, TrendingUp, Filter } from 'lucide-react';

export default function RecibosNomina() {
  const [recibos] = useState([
    {
      id: 1,
      periodo: 'Diciembre 2024',
      fechaPago: '2024-12-30',
      salarioBasico: 4500000,
      auxilioTransporte: 162000,
      horasExtras: 350000,
      bonificaciones: 200000,
      totalDevengado: 5212000,
      saludEmpleado: 180000,
      pensionEmpleado: 180000,
      retencionFuente: 85000,
      otrasDeduccionesSasas: 25000,
      totalDeducciones: 470000,
      netoRecibido: 4742000,
      estado: 'Pagado',
      archivo: 'nomina_dic_2024.pdf'
    },
    {
      id: 2,
      periodo: 'Noviembre 2024',
      fechaPago: '2024-11-30',
      salarioBasico: 4500000,
      auxilioTransporte: 162000,
      horasExtras: 280000,
      bonificaciones: 0,
      totalDevengado: 4942000,
      saludEmpleado: 180000,
      pensionEmpleado: 180000,
      retencionFuente: 75000,
      otrasDeduccionesSasas: 25000,
      totalDeducciones: 460000,
      netoRecibido: 4482000,
      estado: 'Pagado',
      archivo: 'nomina_nov_2024.pdf'
    },
    {
      id: 3,
      periodo: 'Octubre 2024',
      fechaPago: '2024-10-30',
      salarioBasico: 4500000,
      auxilioTransporte: 162000,
      horasExtras: 420000,
      bonificaciones: 150000,
      totalDevengado: 5232000,
      saludEmpleado: 180000,
      pensionEmpleado: 180000,
      retencionFuente: 90000,
      otrasDeduccionesSasas: 25000,
      totalDeducciones: 475000,
      netoRecibido: 4757000,
      estado: 'Pagado',
      archivo: 'nomina_oct_2024.pdf'
    },
    {
      id: 4,
      periodo: 'Septiembre 2024',
      fechaPago: '2024-09-30',
      salarioBasico: 4500000,
      auxilioTransporte: 162000,
      horasExtras: 210000,
      bonificaciones: 300000,
      totalDevengado: 5172000,
      saludEmpleado: 180000,
      pensionEmpleado: 180000,
      retencionFuente: 82000,
      otrasDeduccionesSasas: 25000,
      totalDeducciones: 467000,
      netoRecibido: 4705000,
      estado: 'Pagado',
      archivo: 'nomina_sep_2024.pdf'
    }
  ]);

  const [filtroAnio, setFiltroAnio] = useState('2024');
  const [busqueda, setBusqueda] = useState('');
  
  const recibosFiltrados = recibos.filter(recibo => 
    recibo.periodo.includes(filtroAnio) && 
    recibo.periodo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalAnual = recibos
    .filter(r => r.periodo.includes('2024'))
    .reduce((sum, r) => sum + r.netoRecibido, 0);

  const promedioMensual = totalAnual / recibos.filter(r => r.periodo.includes('2024')).length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Recibos de Nómina</h1>
            <p className="text-green-100">
              Consulta y descarga tus recibos de pago históricos
            </p>
          </div>
          <div className="text-right">
            <p className="text-green-200 text-sm">Total recibido {filtroAnio}</p>
            <p className="text-2xl font-bold">{formatCurrency(totalAnual)}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Último Pago</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(recibosFiltrados[0]?.netoRecibido || 0)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Promedio Mensual</p>
              <p className="text-2xl font-bold text-blue-400">{formatCurrency(promedioMensual)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Recibos Disponibles</p>
              <p className="text-2xl font-bold text-purple-400">{recibosFiltrados.length}</p>
            </div>
            <Receipt className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Deducciones</p>
              <p className="text-2xl font-bold text-red-400">
                {formatCurrency(recibosFiltrados.reduce((sum, r) => sum + r.totalDeducciones, 0))}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-400 rotate-180" />
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por periodo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={filtroAnio}
              onChange={(e) => setFiltroAnio(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista de recibos */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Historial de Recibos de Nómina
          </h3>
        </div>
        <div className="divide-y divide-gray-700">
          {recibosFiltrados.map((recibo) => (
            <div key={recibo.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 mb-4 lg:mb-0">
                  <div className="flex items-center space-x-4 mb-3">
                    <h4 className="text-white font-semibold text-lg">{recibo.periodo}</h4>
                    <span className="bg-green-800/50 text-green-400 px-3 py-1 rounded-full text-sm">
                      {recibo.estado}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Fecha de pago</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-white">{recibo.fechaPago}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Total devengado</p>
                      <p className="text-green-400 font-semibold mt-1">
                        {formatCurrency(recibo.totalDevengado)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Neto recibido</p>
                      <p className="text-white font-semibold text-lg mt-1">
                        {formatCurrency(recibo.netoRecibido)}
                      </p>
                    </div>
                  </div>

                  {/* Desglose detallado */}
                  <div className="mt-4 bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-gray-300 font-medium mb-2">Devengado</h5>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Salario básico:</span>
                            <span className="text-white">{formatCurrency(recibo.salarioBasico)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Auxilio transporte:</span>
                            <span className="text-white">{formatCurrency(recibo.auxilioTransporte)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Horas extras:</span>
                            <span className="text-white">{formatCurrency(recibo.horasExtras)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Bonificaciones:</span>
                            <span className="text-white">{formatCurrency(recibo.bonificaciones)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-gray-300 font-medium mb-2">Deducciones</h5>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Salud (4%):</span>
                            <span className="text-red-300">{formatCurrency(recibo.saludEmpleado)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Pensión (4%):</span>
                            <span className="text-red-300">{formatCurrency(recibo.pensionEmpleado)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Retención fuente:</span>
                            <span className="text-red-300">{formatCurrency(recibo.retencionFuente)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Otras deducciones:</span>
                            <span className="text-red-300">{formatCurrency(recibo.otrasDeduccionesSasas)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Ver</span>
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen anual */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Resumen Anual {filtroAnio}</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Devengado</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(recibosFiltrados.reduce((sum, r) => sum + r.totalDevengado, 0))}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Deducciones</p>
              <p className="text-2xl font-bold text-red-400">
                {formatCurrency(recibosFiltrados.reduce((sum, r) => sum + r.totalDeducciones, 0))}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Neto</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(totalAnual)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información importante */}
      <div className="bg-blue-800/50 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium text-sm mb-2">Información Importante</h4>
        <ul className="text-blue-200 text-xs space-y-1">
          <li>• Los recibos de nómina están disponibles el último día hábil de cada mes</li>
          <li>• Conserva tus recibos para efectos tributarios y de seguridad social</li>
          <li>• En caso de inconsistencias, contacta al área de nómina dentro de los 5 días siguientes</li>
          <li>• Los archivos PDF tienen firma electrónica para validar su autenticidad</li>
        </ul>
      </div>
    </div>
  );
}
