import React, { useEffect } from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, getCartTotal, fetchCart,loading } = useCart();

  if (!isOpen) return null;


 useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen, fetchCart]);

  if (!isOpen) return null;


  // CORRECTED: Use cartItems
  const cartItems = cart?.cartItems || [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ShoppingCart className="text-blue-600" />
            <span>Shopping Cart</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  {/* Placeholder image */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-gray-400" size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                    <p className="text-gray-600">Ksh{item.unitPrice}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg">
                      Ksh{(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total: Ksh{getCartTotal().toFixed(2)}</span>
                </div>
                
                <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};