import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (vehicle) => {
    setWishlist(prev => {
      const exists = prev.find(item => item._id === vehicle._id);
      if (exists) return prev;
      return [...prev, vehicle];
    });
  };

  const removeFromWishlist = (vehicleId) => {
    setWishlist(prev => prev.filter(item => item._id !== vehicleId));
  };

  const isInWishlist = (vehicleId) => {
    return wishlist.some(item => item._id === vehicleId);
  };

  const toggleWishlist = (vehicle) => {
    if (isInWishlist(vehicle._id)) {
      removeFromWishlist(vehicle._id);
    } else {
      addToWishlist(vehicle);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    wishlistCount: wishlist.length
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
