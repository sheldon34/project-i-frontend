import React, { createContext, useContext, useState, useCallback } from 'react';
import { cartService } from '../api/cartApi';

const CartContext = createContext({
  cart: { cartItems: [] },
  fetchCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });

  const fetchCart = useCallback(async () => {
    const data = await cartService.getCart();
    setCart(data);
  }, []);

  const addToCart = useCallback(async (productId, quantity) => {
    await cartService.addToCart(productId, quantity);
    await fetchCart(); // <-- fetch latest cart after add
  }, [fetchCart]);

  const removeFromCart = useCallback(async (productId) => {
    await cartService.removeFromCart(productId);
    await fetchCart(); // <-- fetch latest cart after remove
  }, [fetchCart]);

const getCartTotal = () => {
  if (!cart || !cart.cartItems) return 0;
  return cart.cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
};





  return (
    <CartContext.Provider value={{ cart, getCartTotal,fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );





};

export const useCart = () => useContext(CartContext);
