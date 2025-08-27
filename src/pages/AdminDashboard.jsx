import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductForm } from '../components/ProductForm';
import { ProductModal } from '../components/ProductModal';
import { LoadingGrid } from '../components/LoadingSkeleton';
import { Plus, Search, Settings, BarChart3, Users, Package, TrendingUp } from 'lucide-react';

export const AdminDashboard = () => {
  const {
    products,
    loading,
    searchTerm,
    setSearchTerm,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateProduct = async (productData) => {
    setFormLoading(true);
    try {
      await createProduct(productData);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProduct = async (productData) => {
    if (editProduct) {
      setFormLoading(true);
      try {
        await updateProduct(editProduct.id, productData);
      } finally {
        setFormLoading(false);
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditProduct(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = products.length > 0 ? totalValue / products.length : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Settings className="text-emerald-600" />
                <span>Admin Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage your products and inventory</p>
            </div>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold flex items-center space-x-2 hover:scale-105 active:scale-95"
            >
              <Plus size={20} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">Ksh{totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <TrendingUp className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Price</p>
                <p className="text-3xl font-bold text-gray-900">Ksh{averagePrice.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <BarChart3 className="text-amber-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home & Garden</option>
                </select>
                
                <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                  <option>Sort by Date</option>
                  <option>Sort by Price</option>
                  <option>Sort by Name</option>
                </select>
              </div>
            </div>
            
            {searchTerm && (
              <div className="mt-4 text-sm text-gray-600">
                Showing {products.length} results for "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
            <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
              {products.length} Products
            </span>
          </div>

          {loading ? (
            <LoadingGrid />
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No products found' : 'No products yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Get started by adding your first product to the inventory'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold flex items-center space-x-2 mx-auto"
                >
                  <Plus size={20} />
                  <span>Add Your First Product</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editProduct ? handleUpdateProduct : handleCreateProduct}
        editProduct={editProduct}
        loading={formLoading}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};