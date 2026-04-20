import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // 1. Initial Load: Check if a wishlist already exists in the browser storage
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('procart_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // 2. Synchronization: Update the browser storage every time the wishlist state changes
  useEffect(() => {
    localStorage.setItem('procart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggles the product: adds if missing, removes if already present
  const toggleWishlist = (product) => {
    const isExist = wishlist.find((item) => item.id === product.id);
    
    if (isExist) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.info("Removed from wishlist", {
        position: "bottom-right",
        autoClose: 1500,
      });
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Added to wishlist", { 
        icon: "❤️",
        position: "bottom-right",
        autoClose: 1500,
      });
    }
  };

  
  const clearWishlist = () => {
    setWishlist([]);
    
    localStorage.removeItem('procart_wishlist');
    
    toast.error("Wishlist cleared", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // Helper function to check if a specific product ID is liked
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      toggleWishlist, 
      isInWishlist, 
      clearWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook for easy access to Wishlist state
export const useWishlist = () => useContext(WishlistContext);