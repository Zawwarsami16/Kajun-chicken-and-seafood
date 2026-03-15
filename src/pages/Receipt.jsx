/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Receipt.css';

const ORDER_NUM  = '#' + String(Math.floor(Math.random() * 9000) + 1000);
const ORDER_TIME = new Date().toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' });

export default function Receipt() {
  const { items, subtotal, tax, total, clear } = useCart();
  const nav = useNavigate();
  const newOrder = () => { clear(); nav('/menu'); };

  if (items.length === 0) return (
    <div className="page-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:64, marginBottom:24 }}>🧾</div>
        <h2 className="t-display t-white" style={{ fontSize:52, marginBottom:12 }}>No Order</h2>
        <p className="t-muted" style={{ marginBottom:24 }}>Add items to your cart first.</p>
        <Link to="/menu" className="btn btn-red">Go to Menu</Link>
      </div>
    </div>
  );

  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="rpage page-wrap">
      <div className="rpage__bg" />
      <div className="container rpage__layout">

        {/* ── COUNTER POS RECEIPT ─── */}
        <div className="pos-wrap">
          <div className="pos-topbar">
            <div className="eyebrow t-red">Counter Display</div>
            <span className="t-muted" style={{ fontSize:12 }}>Staff: Start preparing this order</span>
          </div>

          {/* ⚠️ NOT PLACED WARNING — main fix */}
          <div className="receipt-warning">
            <div className="receipt-warning__icon">⚠️</div>
            <div>
              <div className="receipt-warning__title">ORDER NOT PLACED ONLINE</div>
              <div className="receipt-warning__sub">
                Show this screen to the counter staff to place your order. Payment is made at the counter.
              </div>
            </div>
          </div>

          <div className="pos" id="pos-receipt">
            {/* Header */}
            <div className="pos__head">
              <div className="pos__brand">
                <img
                  src="https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png"
                  alt="Kajun Chicken"
                  className="pos__brand-logo"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="pos__brand-fallback" style={{ display:'none' }}>
                  <div className="pos__brand-k">K</div>
                  <div>
                    <div className="pos__brand-name">KAJUN CHICKEN</div>
                    <div className="pos__brand-sub">& SEAFOOD · ONTARIO</div>
                  </div>
                </div>
              </div>
              <div className="pos__meta">
                <div className="pos__num">{ORDER_NUM}</div>
                <div className="pos__time">{ORDER_TIME}</div>
                <div className="pos__type">DINE IN / TAKEOUT</div>
              </div>
            </div>

            <div className="pos__dots">{'- '.repeat(34)}</div>

            {/* ⚠️ Not placed stamp on receipt too */}
            <div className="pos__not-placed-stamp">
              ⚠️ BRING TO COUNTER TO ORDER · PAYMENT AT COUNTER
            </div>

            <div className="pos__dots pos__dots--sm">{'- '.repeat(34)}</div>

            {/* Items */}
            <div className="pos__items">
              <div className="pos__items-hdr">
                <span>QTY</span>
                <span style={{ flex:1 }}>ITEM</span>
                <span>PRICE</span>
              </div>
              <div className="pos__dots pos__dots--sm">{'- '.repeat(34)}</div>
              {items.map(item => (
                <div key={item.id} className="pos__item">
                  <span className="pos__item-qty">{item.qty}×</span>
                  <div className="pos__item-info">
                    <div className="pos__item-name">{item.fullName || item.name}</div>
                    {item.includes && <div className="pos__item-inc">+ {item.includes}</div>}
                  </div>
                  <span className="pos__item-price">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pos__dots pos__dots--sm">{'- '.repeat(34)}</div>

            {/* Totals */}
            <div className="pos__totals">
              <div className="pos__trow"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="pos__trow"><span>HST (13%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="pos__dots pos__dots--sm">{'= '.repeat(22)}</div>
              <div className="pos__trow pos__trow--grand"><span>TOTAL DUE</span><span>${total.toFixed(2)}</span></div>
            </div>

            <div className="pos__dots pos__dots--sm">{'* '.repeat(26)}</div>

            <div className="pos__footer">
              <p className="pos__footer-warning">⚠️ PAY AT COUNTER — NOT CHARGED ONLINE</p>
              <p>Thank you for choosing Kajun Chicken & Seafood!</p>
              <p>100% Halal · Fresh Daily · Bold Flavors</p>
              <p className="pos__web">kajunchicken.ca</p>
            </div>
          </div>

          <div className="pos-actions">
            <button className="btn btn-red" onClick={() => window.print()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print Receipt
            </button>
            <button className="btn btn-ghost" onClick={newOrder}>New Order</button>
          </div>
        </div>

        {/* ── PHONE RECEIPT ─── */}
        <div className="phone-wrap">
          <div className="pos-topbar">
            <div className="eyebrow t-gold">Customer View</div>
            <span className="t-muted" style={{ fontSize:12 }}>Show this to counter</span>
          </div>

          <div className="phone">
            <div className="phone__notch" />
            <div className="phone__screen">
              <div className="ph__status">
                <span>9:41</span>
                <div style={{ display:'flex', gap:5, alignItems:'center', fontSize:11 }}>
                  <span>●●●</span><span>🔋</span>
                </div>
              </div>
              <div className="ph__body">
                {/* Logo */}
                <div className="ph__brand">
                  <img
                    src="https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png"
                    alt="Kajun"
                    className="ph__brand-logo"
                    onError={e => { e.target.style.display='none'; }}
                  />
                </div>

                {/* ⚠️ NOT PLACED — phone version */}
                <div className="ph__not-placed">
                  <div className="ph__not-placed__icon">⚠️</div>
                  <div className="ph__not-placed__title">SHOW AT COUNTER</div>
                  <div className="ph__not-placed__sub">Order not placed — take to counter to start</div>
                </div>

                <div className="ph__order-num">{ORDER_NUM}</div>

                {/* Items */}
                <div className="ph__items">
                  {items.map(item => (
                    <div key={item.id} className="ph__item">
                      <div style={{ display:'flex', alignItems:'center', gap:6, minWidth:0 }}>
                        <span className="ph__qty">{item.qty}×</span>
                        <span className="ph__iname">{item.name}</span>
                      </div>
                      <span className="ph__iprice">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="ph__totals">
                  <div className="ph__trow"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="ph__trow"><span>HST 13%</span><span>${tax.toFixed(2)}</span></div>
                  <div className="ph__grand">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)} CAD</span>
                  </div>
                </div>

                <div className="ph__msg">
                  <div className="ph__pay-at-counter">💳 PAY AT COUNTER</div>
                  <div className="t-label t-muted" style={{ fontSize:8, textAlign:'center', marginTop:6 }}>
                    Authentic Cajun · 100% Halal · Made Fresh Daily
                  </div>
                  <div className="t-label t-gold" style={{ fontSize:8, letterSpacing:3, marginTop:3 }}>
                    kajunchicken.ca
                  </div>
                </div>
              </div>
            </div>
            <div className="phone__home-bar" />
          </div>

          {/* Summary */}
          <div className="summary-card">
            <div className="eyebrow t-gold" style={{ marginBottom:10 }}>Order Summary</div>
            {[
              { label:'Items', val: totalQty },
              { label:'Subtotal', val:`$${subtotal.toFixed(2)}` },
              { label:'HST (13%)', val:`$${tax.toFixed(2)}` },
            ].map(r => (
              <div key={r.label} className="summary-row">
                <span className="t-muted">{r.label}</span>
                <span className="t-ui t-white" style={{ fontWeight:600 }}>{r.val}</span>
              </div>
            ))}
            <hr className="rule" style={{ margin:'10px 0' }} />
            <div className="summary-row summary-row--total">
              <span className="t-ui t-white" style={{ fontWeight:700, letterSpacing:1 }}>TOTAL DUE</span>
              <span className="t-ui t-red" style={{ fontSize:20, fontWeight:800 }}>${total.toFixed(2)} CAD</span>
            </div>
            <div className="summary-card__disclaimer">
              ⚠️ Payment at counter only — not charged online
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
