import React from 'react';
import { X, Edit3, Trash2, ShoppingCart } from 'lucide-react';

export const ProductModal = ({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <ShoppingCart size={64} />
                    <p className="mt-4 text-lg">No Image Available</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:w-1/2 space-y-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="text-blue-800 font-medium">Price</span>
                  <span className="text-3xl font-bold text-blue-600">
                    Ksh{product.price.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <span className="text-emerald-800 font-medium">Quantity</span>
                  <span className="text-xl font-semibold text-emerald-600">
                    {product.quantity}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <span className="text-amber-800 font-medium">Product ID</span>
                  <span className="text-amber-600 font-mono">#{product.id}</span>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    onEdit(product);
                    onClose();
                  }}
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Edit3 size={20} />
                  <span>Edit Product</span>
                </button>
                
                <button
                  onClick={() => {
                    onDelete(product.id);
                    onClose();
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};