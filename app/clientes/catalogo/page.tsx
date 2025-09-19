"use client"

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  Grid3X3, 
  List,
  Eye,
  Heart,
  Package,
  Zap,
  Monitor,
  Laptop,
  Smartphone
} from 'lucide-react'

export default function ClientesCatalogoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')

  const categories = ['Todos', 'Tecnología', 'Mobiliario', 'Oficina', 'Equipos']
  
  const products = [
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      category: "Tecnología",
      price: 4500000,
      rating: 4.8,
      reviews: 124,
      image: "💻",
      inStock: true,
      description: "Laptop ultradelgada con procesador Intel Core i7, 16GB RAM, 512GB SSD",
      specs: ["Intel Core i7", "16GB RAM", "512GB SSD", "13.3\" Display"]
    },
    {
      id: 2,
      name: "Monitor LG 27'' 4K",
      category: "Tecnología",
      price: 1200000,
      rating: 4.6,
      reviews: 89,
      image: "🖥️",
      inStock: true,
      description: "Monitor 4K UltraHD de 27 pulgadas con tecnología IPS",
      specs: ["27 pulgadas", "4K UHD", "Tecnología IPS", "USB-C"]
    },
    {
      id: 3,
      name: "Silla Ergonómica Premium",
      category: "Mobiliario",
      price: 800000,
      rating: 4.9,
      reviews: 256,
      image: "🪑",
      inStock: true,
      description: "Silla ejecutiva con soporte lumbar y reposabrazos ajustables",
      specs: ["Soporte lumbar", "Reposabrazos ajustables", "Base de aluminio", "Malla transpirable"]
    },
    {
      id: 4,
      name: "Impresora Multifuncional HP",
      category: "Oficina",
      price: 650000,
      rating: 4.3,
      reviews: 78,
      image: "🖨️",
      inStock: false,
      description: "Impresora láser multifuncional con WiFi y escáner",
      specs: ["Impresión láser", "WiFi integrado", "Escáner", "30 ppm"]
    },
    {
      id: 5,
      name: "Mesa de Reuniones",
      category: "Mobiliario",
      price: 1500000,
      rating: 4.7,
      reviews: 45,
      image: "🪴",
      inStock: true,
      description: "Mesa de juntas para 8 personas en madera de roble",
      specs: ["Madera de roble", "Para 8 personas", "2.4m x 1.2m", "Acabado mate"]
    },
    {
      id: 6,
      name: "Tablet Samsung Galaxy Tab S8",
      category: "Tecnología",
      price: 2800000,
      rating: 4.5,
      reviews: 132,
      image: "📱",
      inStock: true,
      description: "Tablet profesional con S Pen incluido y pantalla de 11 pulgadas",
      specs: ["Pantalla 11\"", "S Pen incluido", "128GB", "5G Ready"]
    },
    {
      id: 7,
      name: "Proyector 4K Epson",
      category: "Equipos",
      price: 3200000,
      rating: 4.4,
      reviews: 67,
      image: "📽️",
      inStock: true,
      description: "Proyector 4K profesional para presentaciones y conferencias",
      specs: ["Resolución 4K", "3000 lúmenes", "WiFi", "Control remoto"]
    },
    {
      id: 8,
      name: "Sistema de Audio Bose",
      category: "Equipos",
      price: 1800000,
      rating: 4.8,
      reviews: 98,
      image: "🔊",
      inStock: true,
      description: "Sistema de audio profesional para salas de conferencias",
      specs: ["Audio 360°", "Cancelación de ruido", "Bluetooth 5.0", "Batería 12h"]
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return a.name.localeCompare(b.name)
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Catálogo de Productos 🛍️
        </h2>
        <p className="text-gray-400">
          Explora nuestro amplio catálogo de productos para tu empresa
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Ordenar por Nombre</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificación</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400">
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          viewMode === 'grid' ? (
            // Grid View
            <div key={product.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{product.image}</div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.inStock ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
                  }`}>
                    {product.inStock ? 'En Stock' : 'Agotado'}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-yellow-400">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews} reseñas)</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-2xl font-bold text-white">{formatPrice(product.price)}</div>
                <div className="flex space-x-2">
                  <button 
                    disabled={!product.inStock}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      product.inStock 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Añadir</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // List View
            <div key={product.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-6">
                <div className="text-4xl">{product.image}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
                      <p className="text-gray-400 mb-2">{product.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-700 rounded">{product.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-yellow-400">{product.rating}</span>
                          <span>({product.reviews} reseñas)</span>
                        </div>
                        <span className={product.inStock ? 'text-green-400' : 'text-red-400'}>
                          {product.inStock ? 'En Stock' : 'Agotado'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-3">{formatPrice(product.price)}</div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          disabled={!product.inStock}
                          className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                            product.inStock 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Añadir al Carrito</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No se encontraron productos</h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros de búsqueda para encontrar lo que necesitas
          </p>
        </div>
      )}
    </div>
  )
}
