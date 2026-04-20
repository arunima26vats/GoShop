import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initial Load: Retrieve saved cart or start empty
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('procart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Synchronization: Update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('procart_cart', JSON.stringify(cart));
  }, [cart]);

  // Adds a product or increases quantity
  const addToCart = (product) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast.success(`${product.title.substring(0, 15)}... added to cart!`, {
      icon: "🛒",
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // Removes a specific item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from cart", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // Updates quantity (plus/minus) and prevents going below 1
  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  // Clear Entire Cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('procart_cart');
    
    toast.error("Cart cleared", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // --- LOCALIZED INR CALCULATION ---
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * 83) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);