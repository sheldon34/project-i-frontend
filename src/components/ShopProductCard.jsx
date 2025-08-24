import React, { useState } from 'react';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';

export const ShopProductCard = ({ 
  product, 
  onView,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    try {
      setIsAddingToCart(true);
      await addToCart(product.id, 1);
      setTimeout(() => setIsAddingToCart(false), 1000);
    } catch (error) {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gray-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-blue-400 text-center">
              <ShoppingCart size={48} />
              <p className="mt-2 text-sm">No Image</p>
            </div>
          </div>
        )}
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            In Stock
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onView(product)}
            className="w-full bg-white/95 backdrop-blur-sm text-gray-900 py-3 rounded-xl font-medium hover:bg-white transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Eye size={18} />
            <span>Quick View</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 text-amber-400">
            <Star size={16} fill="currentColor" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-blue-600">
              ${typeof product.price === 'number' ? product.price.toLocaleString() : 'N/A'}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              {product.quantity} available
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
              isAddingToCart
                ? 'bg-emerald-500 text-white scale-95'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
            }`}
          >
            <ShoppingCart size={18} />
            <span>{isAddingToCart ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};