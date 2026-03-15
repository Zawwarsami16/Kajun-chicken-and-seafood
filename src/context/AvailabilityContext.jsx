/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
// ============================================================
//  KAJUN — Availability Store
//  Admin toggles items on/off — saved to localStorage
//  Default: seafood + premium sides = OFF (current reality)
// ============================================================
import { createContext, useContext, useState, useCallback } from 'react';

// Items that are currently OUT OF STOCK by default
// Admin can change these from the admin panel
const DEFAULT_UNAVAILABLE = new Set([
  'fish-tender-1',   // 1 Pc Fish Tender — ocean
  'shrimp-sandwich', // Shrimp Sandwich — ocean
  'fish-sandwich',   // Fish Sandwich Combo — ocean
  'chicken-fish',    // Chicken & Fish Combo — bone-in (has fish)
  'chipotle-bbq',    // Chipotle BBQ — out
  'onion-crunch',    // Onion Crunch — out
  'nuggets-9',       // 9 Pc Nuggets — out
  'tender-3',        // 3 Pc Tenders — out (only have boneless tenders 5pc)
]);

const STORAGE_KEY = 'kajun_unavailable_items';

function loadUnavailable() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return new Set(JSON.parse(saved));
  } catch {}
  return DEFAULT_UNAVAILABLE;
}

const AvailCtx = createContext(null);

export function AvailabilityProvider({ children }) {
  const [unavailable, setUnavailable] = useState(() => loadUnavailable());

  const isAvailable = useCallback((id) => !unavailable.has(id), [unavailable]);

  const toggle = useCallback((id) => {
    setUnavailable(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const markAvailable   = useCallback((id) => {
    setUnavailable(prev => {
      const next = new Set(prev);
      next.delete(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const markUnavailable = useCallback((id) => {
    setUnavailable(prev => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setUnavailable(DEFAULT_UNAVAILABLE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...DEFAULT_UNAVAILABLE]));
  }, []);

  return (
    <AvailCtx.Provider value={{ unavailable, isAvailable, toggle, markAvailable, markUnavailable, reset }}>
      {children}
    </AvailCtx.Provider>
  );
}

export const useAvailability = () => {
  const c = useContext(AvailCtx);
  if (!c) throw new Error('useAvailability must be inside AvailabilityProvider');
  return c;
};
