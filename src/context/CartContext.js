import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (cartItem) =>
          cartItem.name === item.name && cartItem.details === item.details
      );
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === existing.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [
        ...prev,
        { ...item, id: `${Date.now()}-${Math.random()}`, quantity: 1 },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
  };

  const applyPromoCode = (code) => {
    if (code.trim().toUpperCase() === 'FIRE20') {
      setDiscount(0.2);
      return true;
    }
    return false;
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const cartTotal = Math.round(subtotal - subtotal * discount);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        cartTotal,
        subtotal,
        discount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
