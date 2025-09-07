import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

function CartDisplay() {
  const { cart, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items = cart && cart.cartItems ? cart.cartItems : [];

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                minWidth: '180px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <span style={{ fontWeight: 'bold', marginBottom: 8 }}>{item.productName}</span>
              <span>Qty: {item.quantity}</span>
              <span>Price: {item.unitPrice !== null ? item.unitPrice : 'N/A'}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          Your cart is empty<br />
          Add some products to get started!
        </div>
      )}
    </div>
  );
}

export default CartDisplay;