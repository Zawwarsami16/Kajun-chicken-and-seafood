/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState, useCallback, useEffect, createContext, useContext } from 'react';

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, icon = '🍗') => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p.slice(-2), { id, msg, icon }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 2800);
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="toasts-wrap">
        {toasts.map(t => (
          <div key={t.id} className="toast-pill">
            <span className="toast-icon">{t.icon}</span>
            <span className="toast-text">{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
