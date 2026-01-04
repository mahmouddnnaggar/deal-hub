'use client';

/**
 * Wishlist Context - Local storage wishlist for guests
 */

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';

// Types
export interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  priceAfterDiscount?: number;
}

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'TOGGLE_WISHLIST'; payload: WishlistItem }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] };

interface WishlistContextType extends WishlistState {
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

// Reducer
function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.items.some((item) => item._id === action.payload._id);
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    
    case 'TOGGLE_WISHLIST': {
      const exists = state.items.some((item) => item._id === action.payload._id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter((item) => item._id !== action.payload._id),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    
    case 'SET_WISHLIST':
      return { ...state, items: action.payload };
    
    default:
      return state;
  }
}

// Context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    isLoading: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        dispatch({ type: 'SET_WISHLIST', payload: items });
      } catch {
        // Invalid data, ignore
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const toggleWishlist = (item: WishlistItem) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: item });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId: string) => {
    return state.items.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Hook
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
