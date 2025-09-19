import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

export const ShopProductModal = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    try {
      setIsAddingToCart(true);
      await addToCart(product.id, quantity);
      setTimeout(() => setIsAddingToCart(false), 1000);
    } catch (error) {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <div className="text-blue-400 text-center">
                    <ShoppingCart size={64} />
                    <p className="mt-4 text-lg">No Image Available</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <Truck className="text-blue-600" size={20} />
                  <span className="text-sm text-blue-800 font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg">
                  <Shield className="text-emerald-600" size={20} />
                  <span className="text-sm text-emerald-800 font-medium">Warranty</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg">
                  <RotateCcw className="text-amber-600" size={20} />
                  <span className="text-sm text-amber-800 font-medium">30d Return</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.8) • 124 reviews</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div>
                    <span className="text-blue-800 font-medium text-lg">Price</span>
                    <div className="text-4xl font-bold text-blue-600">
                     Ksh {product.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-800 font-medium">In Stock</span>
                    <div className="text-emerald-600 font-semibold">
                      {product.quantity} available
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-3 ${
                      isAddingToCart
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    <span>{isAddingToCart ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </button>
                  
                  <button className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};