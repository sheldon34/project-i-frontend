import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Settings, Store, User, LogIn, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import { AuthModal } from './AuthModal';
import { CartModal } from './CartModal';

export const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2 group">
                <ShoppingBag className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  TryShop
                </h1>
              </Link>
              
              <nav className="hidden md:flex space-x-1">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive('/') 
                      ? 'bg-blue-100 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Store size={18} />
                  <span>Shop</span>
                </Link>
                
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive('/admin') 
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={18} />
                  <span>Admin Panel</span>
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                <User size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {isActive('/admin') ? 'Admin' : 'Customer'}
                </span>
              </div>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsCartModalOpen(true)}
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ShoppingCart size={24} />
                    {getCartItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getCartItemCount()}
                      </span>
                    )}
                  </button>
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                    <User size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{user?.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
};