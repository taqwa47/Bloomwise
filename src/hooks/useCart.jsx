import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user && user.role === 'customer') {
      const savedCart = localStorage.getItem(`bloomwise_cart_${user.id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user]);

  const saveCart = (newCart) => {
    setCart(newCart);
    if (user) {
      localStorage.setItem(`bloomwise_cart_${user.id}`, JSON.stringify(newCart));
    }
  };

  const addToCart = (item) => {
    const newCart = [...cart, { ...item, cartItemId: `item-${Date.now()}` }];
    saveCart(newCart);
  };

  const removeFromCart = (cartItemId) => {
    const newCart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart(newCart);
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;
    const newCart = cart.map(item => item.cartItemId === cartItemId ? { ...item, quantity } : item);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
