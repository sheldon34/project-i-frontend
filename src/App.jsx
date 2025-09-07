import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider ,useCart} from './context/CartContext';
import { Navigation } from './components/Navigation';
import { ShopPage } from './pages/ShopPage';
import { AdminDashboard } from './pages/AdminDashboard';
import CartDisplay from './components/CartDisplay'
import { useAuth } from './context/AuthContext';
import { CartModal } from './components/CartModal';

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Use auth context to check if user is authenticated
  const { isAuthenticated } = useAuth();

  // Handle cart icon click
  const handleCartClick = () => {
    console.log("Cart icon clicked!");
    if (!isAuthenticated) {
      setShowAuthModal(true); // Show login/signup modal
    } else {
      setCartOpen(true); // Show cart
    }
  };

  // After successful login, show cart if it was requested
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setCartOpen(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
            },
          }}
        />
        {/* <Navbar onCartClick={handleCartClick} /> */}
        <Navigation onCartClick={handleCartClick} />
        {/* <Navigation  /> */}
        {cartOpen && (
          <div style={{
            position: 'fixed',
            top: 60,
            right: 20,
            background: '#fff',
            border: '1px solid #ccc',
            padding: 20,
            zIndex: 1000
          }}>
            <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            {/* <button onClick={() => setCartOpen(false)}>Close</button>
            <CartDisplay /> */}
          </div>
        )}
        {/* Show auth modal if not authenticated and cart is clicked */}
        {showAuthModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            {/* Replace below with your actual AuthModal component */}
            <div style={{
              background: '#fff',
              padding: 32,
              borderRadius: 12,
              minWidth: 320
            }}>
              <h2>Please log in or sign up to view your cart</h2>
              {/* Simulate login success */}
              <button onClick={handleAuthSuccess} style={{ marginTop: 16 }}>Log In / Sign Up</button>
              <button onClick={() => setShowAuthModal(false)} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;