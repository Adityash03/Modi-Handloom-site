import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'modiHandloomCart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1, color = null) => {
    setItems((prev) => {
      const key = `${product._id}-${color || 'default'}`;
      const existing = prev.find(
        (i) => `${i.product}-${i.color || 'default'}` === key
      );
      if (existing) {
        return prev.map((i) =>
          `${i.product}-${i.color || 'default'}` === key
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          product: product._id,
          name: product.name,
          slug: product.slug,
          image: product.images?.[0],
          price: product.price,
          unit: product.unit,
          color,
          quantity,
          stock: product.stock,
        },
      ];
    });
  };

  const updateQuantity = (product, color, quantity) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product === product && i.color === color ? { ...i, quantity } : i
      )
    );
  };

  const removeItem = (product, color) => {
    setItems((prev) => prev.filter((i) => !(i.product === product && i.color === color)));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const itemsPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, itemCount, itemsPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
