/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartSidebar.css';

export default function CartSidebar({ open, onClose }) {
  const { items, subtotal, tax, total, itemCount, setQty, remove, clear } = useCart();
  const nav = useNavigate();

  const placeOrder = () => { onClose(); nav('/receipt'); };

  return (
    <>
      <div className={`cart-veil ${open ? 'cart-veil--on' : ''}`} onClick={onClose} />
      <aside className={`cart ${open ? 'cart--open' : ''}`}>
        {/* Header */}
        <div className="cart__head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Your Order</div>
            <h2 className="cart__title t-display t-white">
              {itemCount === 0 ? 'Empty Cart' : `${itemCount} Item${itemCount !== 1 ? 's' : ''}`}
            </h2>
          </div>
          <button className="cart__close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cart__body">
          {items.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__empty-icon">🛒</div>
              <p className="t-ui t-white" style={{ fontWeight:700, marginBottom:6 }}>Nothing added yet</p>
              <p className="t-muted" style={{ fontSize:13 }}>Go explore the menu and add your favourites</p>
              <button className="btn btn-outline-red" style={{ marginTop:20 }} onClick={onClose}>
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="cart__list">
              {items.map(item => (
                <li key={item.id} className="ci">
                  <div className="ci__img">
                    <img src={item.image} alt={item.name}
                      onError={e => { e.target.src = 'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'; }} />
                  </div>
                  <div className="ci__info">
                    <div className="ci__name t-ui t-white">{item.name}</div>
                    {item.includes && <div className="ci__includes">+ {item.includes}</div>}
                    <div className="ci__price t-red t-ui">${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                  <div className="ci__ctrl">
                    <button className="ci__qty-btn" onClick={() => setQty(item.id, item.qty - 1)}>−</button>
                    <span className="ci__qty-val t-ui t-white">{item.qty}</span>
                    <button className="ci__qty-btn" onClick={() => setQty(item.id, item.qty + 1)}>+</button>
                    <button className="ci__del" onClick={() => remove(item.id)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart__foot">
            <div className="cart__totals">
              <div className="cart__row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="cart__row"><span>HST (13%)</span><span>${tax.toFixed(2)}</span></div>
              <hr className="rule" style={{ margin: '10px 0' }} />
              <div className="cart__row cart__row--big">
                <span className="t-ui t-white" style={{ fontWeight:700, letterSpacing:1 }}>TOTAL</span>
                <span className="t-ui t-red" style={{ fontSize:20, fontWeight:800 }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-red" style={{ width:'100%', justifyContent:'center' }} onClick={placeOrder}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Place Order
            </button>
            <button className="cart__clear" onClick={clear}>Clear order</button>
          </div>
        )}
      </aside>
    </>
  );
}
