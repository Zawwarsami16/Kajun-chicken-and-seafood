/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { createContext, useContext, useReducer, useCallback } from 'react';
import { TAX_RATE } from '../data/menu';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const ex = state.items.find(i => i.id === action.item.id);
      if (ex) return { ...state, items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) };
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE': return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'QTY': {
      if (action.qty <= 0) return { ...state, items: state.items.filter(i => i.id !== action.id) };
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i) };
    }
    case 'CLEAR': return { ...state, items: [] };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const add    = useCallback(item => dispatch({ type: 'ADD', item }), []);
  const remove = useCallback(id   => dispatch({ type: 'REMOVE', id }), []);
  const setQty = useCallback((id, qty) => dispatch({ type: 'QTY', id, qty }), []);
  const clear  = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const subtotal  = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax       = subtotal * TAX_RATE;
  const total     = subtotal + tax;
  const itemCount = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, subtotal, tax, total, itemCount, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be inside CartProvider');
  return c;
};
