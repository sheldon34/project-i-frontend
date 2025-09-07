import React from 'react';

function Navbar({ onCartClick, isAdmin, username, onLogin }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', background: '#eee' }}>
      {/* Logo or Home */}
      <span style={{ fontWeight: 'bold', fontSize: 18 }}>MyShop</span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        {/* Role indicator */}
        <span style={{ marginRight: 16 }}>
          {isAdmin ? 'Admin' : 'Customer'}
        </span>
        {/* Username */}
        <span style={{ marginRight: 16 }}>{username}</span>
        {/* Cart Button */}
        <button onClick={onCartClick} style={{ marginRight: 16 }}>Cart</button>
        {/* Login Button */}
        <button onClick={onLogin}>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;