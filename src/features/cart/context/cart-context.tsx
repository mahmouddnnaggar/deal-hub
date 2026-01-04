'use client';

/**
 * Cart Context - Local storage cart for guests
 */

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';

// Types
export interface CartItem {
  productId: string;
  product: {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    priceAfterDiscount?: number;
  };
  count: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  isLoading: boolean;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem['product'] }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; count: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addToCart: (product: CartItem['product']) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, count: number) => void;
  clearCart: () => void;
}

// Helper
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.count, 0);
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.productId === product._id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.productId === product._id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            productId: product._id,
            product,
            count: 1,
            price: product.priceAfterDiscount || product.price,
          },
        ];
      }
      return { ...state, items: newItems, totalPrice: calculateTotal(newItems) };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter((item) => item.productId !== action.payload);
      return { ...state, items: newItems, totalPrice: calculateTotal(newItems) };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, count } = action.payload;
      if (count <= 0) {
        const newItems = state.items.filter((item) => item.productId !== productId);
        return { ...state, items: newItems, totalPrice: calculateTotal(newItems) };
      }
      const newItems = state.items.map((item) =>
        item.productId === productId ? { ...item, count } : item
      );
      return { ...state, items: newItems, totalPrice: calculateTotal(newItems) };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [], totalPrice: 0 };
    
    case 'SET_CART':
      return { ...state, items: action.payload, totalPrice: calculateTotal(action.payload) };
    
    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalPrice: 0,
    isLoading: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        dispatch({ type: 'SET_CART', payload: items });
      } catch {
        // Invalid data, ignore
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: CartItem['product']) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, count: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, count } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
