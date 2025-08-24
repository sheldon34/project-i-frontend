import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { ShopPage } from './pages/ShopPage';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
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
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;