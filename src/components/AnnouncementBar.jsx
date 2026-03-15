/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const { store } = useAdmin();
  const [dismissed, setDismissed] = useState(false);

  if (!store.announcement || dismissed) return null;

  return (
    <div className="ann-bar">
      <span className="ann-bar__icon">📢</span>
      <span className="ann-bar__text">{store.announcement}</span>
      <button className="ann-bar__close" onClick={() => setDismissed(true)} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}
