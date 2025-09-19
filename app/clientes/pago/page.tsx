"use client"

import { useState } from 'react'
import { 
  CreditCard, 
  Shield, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Building2,
  ArrowLeft,
  CheckCircle,
  Lock,
  Calendar,
  AlertCircle,
  Truck
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ClientesPagoPage() {
  const router = useRouter()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [formData, setFormData] = useState({
    // Billing Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    // Address Info
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const orderSummary = {
    items: [
      { name: "Laptop Dell XPS 13", quantity: 1, price: 4500000 },
      { name: "Monitor LG 27'' 4K", quantity: 2, price: 2400000 },
      { name: "Silla Ergonómica Premium", quantity: 4, price: 3200000 }
    ],
    subtotal: 10100000,
    shipping: 0,
    tax: 1919000,
    discount: 1010000,
    total: 11009000
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.address && formData.city && formData.state && formData.zipCode
      case 3:
        if (paymentMethod === 'credit-card') {
          return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardName
        }
        return true
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1))
  }

  const processPayment = () => {
    // Simulate payment processing
    setCurrentStep(4)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/clientes/carrito')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-white">
              Proceso de Pago 💳
            </h2>
            <p className="text-gray-400">
              Completa tu compra de forma segura
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-green-400">
          <Shield className="w-5 h-5" />
          <span className="text-sm">Pago Seguro SSL</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                currentStep >= step 
                  ? currentStep > step 
                    ? 'bg-green-600' 
                    : 'bg-blue-600' 
                  : 'bg-gray-700'
              }`}>
                {currentStep > step ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white font-semibold">{step}</span>
                )}
              </div>
              <p className={`text-xs text-center ${
                currentStep >= step ? 'text-white' : 'text-gray-400'
              }`}>
                {step === 1 && "Información"}
                {step === 2 && "Dirección"}
                {step === 3 && "Pago"}
                {step === 4 && "Confirmación"}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Empresa (Opcional)</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Dirección de Envío</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Calle, Carrera, Avenida..."
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ciudad</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Departamento</label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecciona</option>
                      <option value="Cundinamarca">Cundinamarca</option>
                      <option value="Antioquia">Antioquia</option>
                      <option value="Valle del Cauca">Valle del Cauca</option>
                      <option value="Atlántico">Atlántico</option>
                      <option value="Santander">Santander</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Código Postal</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Método de Pago</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-600"
                    />
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Tarjeta de Crédito/Débito</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-2xl">🏦</span>
                    <span className="text-white">Transferencia Bancaria</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-2xl">📄</span>
                    <span className="text-white">Pago contra entrega</span>
                  </label>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit-card' && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Detalles de la Tarjeta</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Número de Tarjeta</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Fecha de Vencimiento</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre en la Tarjeta</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                ¡Pago Procesado Exitosamente!
              </h3>
              <p className="text-gray-400 mb-6">
                Tu pedido ha sido confirmado y pronto recibirás un email con los detalles.
              </p>
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-white font-semibold">Número de Orden: #2024-CLT-008</p>
                <p className="text-gray-400 text-sm">Fecha estimada de entrega: 15-18 Septiembre 2024</p>
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => router.push('/clientes/pedidos')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                >
                  Ver mis Pedidos
                </button>
                <button
                  onClick={() => router.push('/clientes/catalogo')}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                  currentStep === 1 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
              
              <button
                onClick={currentStep === 3 ? processPayment : nextStep}
                disabled={!validateStep(currentStep)}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                  validateStep(currentStep)
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === 3 ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Procesar Pago</span>
                  </>
                ) : (
                  <span>Continuar</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Resumen del Pedido</h3>
            
            <div className="space-y-3 mb-4">
              {orderSummary.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-white">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-600 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{formatPrice(orderSummary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Envío</span>
                <span>{orderSummary.shipping === 0 ? 'Gratis' : formatPrice(orderSummary.shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>IVA</span>
                <span>{formatPrice(orderSummary.tax)}</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Descuento</span>
                <span>-{formatPrice(orderSummary.discount)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-gray-600">
                <span>Total</span>
                <span>{formatPrice(orderSummary.total)}</span>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-700">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-300 font-semibold mb-2">Pago Seguro</h4>
                <p className="text-blue-200 text-sm">
                  Tu información está protegida con encriptación SSL de 256 bits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
