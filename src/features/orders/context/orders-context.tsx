'use client';

/**
 * Orders Context - Local storage orders for the session
 */

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem } from '@/features/cart/context';

// Types
export interface Order {
  _id: string;
  items: CartItem[];
  totalPrice: number;
  shippingAddress: {
    name: string;
    phone: string;
    city: string;
    details: string;
  };
  paymentMethod: 'cash' | 'card';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
}

type OrdersAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'SET_ORDERS'; payload: Order[] };

interface OrdersContextType extends OrdersState {
  addOrder: (order: Omit<Order, '_id' | 'status' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrder: (orderId: string) => Order | undefined;
}

// Reducer
function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    
    default:
      return state;
  }
}

// Context
const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Provider
export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, {
    orders: [],
    isLoading: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      try {
        const orders = JSON.parse(stored);
        dispatch({ type: 'SET_ORDERS', payload: orders });
      } catch {
        // Invalid data
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.orders]);

  const addOrder = (orderData: Omit<Order, '_id' | 'status' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      _id: `order_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  };

  const getOrder = (orderId: string) => {
    return state.orders.find((order) => order._id === orderId);
  };

  return (
    <OrdersContext.Provider
      value={{
        ...state,
        addOrder,
        updateOrderStatus,
        getOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

// Hook
export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
