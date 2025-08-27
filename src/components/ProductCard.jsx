import React from 'react';
import { Edit3, Trash2, ShoppingCart, Eye } from 'lucide-react';

export const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete,
  onView 
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gray-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-gray-400 text-center">
              <ShoppingCart size={48} />
              <p className="mt-2 text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex space-x-2">
              <button
                onClick={() => onView(product)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <Eye size={16} />
              </button>
              {onEdit && (
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  <Edit3 size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">
              Ksh{typeof product.price === 'number' ? product.price.toLocaleString() : 'N/A'}
            </span>
            <span className="text-xs text-gray-500">
              Qty: {product.quantity}
            </span>
          </div>
          
          <button
            onClick={() => onView(product)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};