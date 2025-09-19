"use client"

import { useState } from 'react'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Tag,
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ClientesCarritoPage() {
  const router = useRouter()
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      price: 4500000,
      quantity: 1,
      image: "💻",
      availability: "En stock",
      estimatedDelivery: "2-3 días hábiles"
    },
    {
      id: 2,
      name: "Monitor LG 27'' 4K",
      price: 1200000,
      quantity: 2,
      image: "🖥️",
      availability: "En stock",
      estimatedDelivery: "1-2 días hábiles"
    },
    {
      id: 3,
      name: "Silla Ergonómica Premium",
      price: 800000,
      quantity: 4,
      image: "🪑",
      availability: "Stock limitado",
      estimatedDelivery: "3-5 días hábiles"
    }
  ])

  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percentage: number;
    amount: number;
  } | null>(null)

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyDiscount = () => {
    if (discountCode === 'CLIENTE10') {
      setAppliedDiscount({ code: 'CLIENTE10', percentage: 10, amount: subtotal * 0.1 })
    } else if (discountCode === 'PRIMERA20') {
      setAppliedDiscount({ code: 'PRIMERA20', percentage: 20, amount: subtotal * 0.2 })
    } else {
      setAppliedDiscount(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 5000000 ? 0 : 50000
  const tax = subtotal * 0.19 // IVA 19%
  const discountAmount = appliedDiscount?.amount || 0
  const total = subtotal + shipping + tax - discountAmount

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Carrito de Compras 🛒
        </h2>
        <p className="text-gray-400">
          Revisa y confirma tus productos seleccionados
        </p>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">Tu carrito está vacío</h3>
          <p className="text-gray-500 mb-8">
            Explora nuestro catálogo y encuentra los productos que necesitas
          </p>
          <button
            onClick={() => router.push('/clientes/catalogo')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center space-x-2 mx-auto"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Ir al Catálogo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Productos en tu carrito ({cartItems.length})
                </h3>
                <button
                  onClick={() => router.push('/clientes/catalogo')}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Continuar comprando
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                    <div className="text-4xl">{item.image}</div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400 mb-1">{item.availability}</p>
                      <p className="text-xs text-gray-500 flex items-center space-x-1">
                        <Truck className="w-3 h-3" />
                        <span>{item.estimatedDelivery}</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-400">{formatPrice(item.price)} c/u</p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount Code */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Código de Descuento</h3>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Ingresa tu código"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={applyDiscount}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center space-x-2"
                >
                  <Tag className="w-4 h-4" />
                  <span>Aplicar</span>
                </button>
              </div>
              
              {appliedDiscount && (
                <div className="mt-3 p-3 bg-green-900/50 border border-green-700 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✅ Código aplicado: {appliedDiscount.percentage}% de descuento
                  </p>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-500">
                <p>💡 Códigos de prueba: CLIENTE10, PRIMERA20</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center space-x-1">
                    <Truck className="w-4 h-4" />
                    <span>Envío</span>
                  </span>
                  <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>IVA (19%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                {appliedDiscount && (
                  <div className="flex justify-between text-green-400">
                    <span>Descuento ({appliedDiscount.percentage}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <Shield className="w-4 h-4" />
                  <span>Compra segura y protegida</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-400">
                  <Truck className="w-4 h-4" />
                  <span>Envío gratis en compras superiores a $5,000,000</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/clientes/pago')}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceder al Pago</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                Al continuar, aceptas nuestros términos y condiciones
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Métodos de Pago</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Tarjeta de Crédito/Débito</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <span className="text-2xl">🏦</span>
                  <span className="text-gray-300">Transferencia Bancaria</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <span className="text-2xl">📄</span>
                  <span className="text-gray-300">Pago contra entrega</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-700">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-300 font-semibold mb-2">Información de Envío</h4>
                  <p className="text-blue-200 text-sm">
                    Los tiempos de entrega pueden variar según tu ubicación y la disponibilidad del producto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
