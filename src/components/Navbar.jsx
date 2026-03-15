/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'Our Story' },
  { to: '/locations', label: 'Locations' },
  { to: '/games', label: '🎮 Arcade' },
];

export default function Navbar({ onCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { store } = useAdmin();
  const logo = store.logoUrl || 'https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png';
  const loc = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setOpen(false), [loc]);

  return (
    <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="nav__inner container">
        {/* Logo — uses admin-controlled URL */}
        <Link to="/" className="nav__logo">
          <img
            src={logo}
            alt="Kajun Chicken & Seafood"
            className="nav__logo-img"
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
          <span className="nav__logo-fallback t-display t-red" style={{display:'none'}}>KAJUN</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav__links">
          {LINKS.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={`nav__link ${loc.pathname === l.to ? 'nav__link--active' : ''}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="nav__right">
          <Link to="/menu" className="btn btn-red nav__cta">Order Now</Link>

          <button className="nav__cart" onClick={onCart} aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && <span className="nav__cart-badge">{itemCount}</span>}
          </button>

          <button
            className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
            onClick={() => setOpen(v => !v)}
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`}>
        {LINKS.map(l => (
          <Link key={l.to} to={l.to} className={`nav__mobile-link ${loc.pathname === l.to ? 'nav__mobile-link--active' : ''}`}>
            {l.label}
          </Link>
        ))}
        <Link to="/menu" className="btn btn-red" style={{ textAlign: 'center', justifyContent: 'center', marginTop: 8 }}>
          Order Now
        </Link>
      </div>
    </nav>
  );
}
