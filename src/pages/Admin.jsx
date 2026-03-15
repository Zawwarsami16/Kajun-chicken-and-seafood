/**
 * KAJUN CHICKEN & SEAFOOD — Admin Panel
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { MENU, CATEGORIES } from '../data/menu';
import { COUPONS as BASE_COUPONS, DAILY_SPECIALS as BASE_SPECIALS } from '../data/specials';
import './Admin.css';

const Toggle = ({ on, onChange }) => (
  <button className={`adm-toggle ${on?'adm-toggle--on':'adm-toggle--off'}`} onClick={onChange}>
    <span className="adm-toggle__knob"/>
  </button>
);

const Field = ({ label, children, full }) => (
  <div className={`adm-field${full?' adm-field--full':''}`}>
    <label className="adm-label">{label}</label>
    {children}
  </div>
);

// ── Login ──────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [pass, setPass] = useState('');
  const [err, setErr]   = useState('');
  const [shake, setShake] = useState(false);
  const { store } = useAdmin();
  const logo = store.logoUrl;

  const try_ = () => {
    if (onLogin(pass)) return;
    setErr('Wrong password'); setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="adm-login">
      <div className="adm-login__bg"/>
      <div className={`adm-login__box${shake?' adm-login__box--shake':''}`}>
        <div className="adm-login__logo-wrap">
          <img src={logo} alt="Logo" className="adm-login__logo"
            onError={e=>e.target.style.display='none'}/>
        </div>
        <div className="t-display adm-login__title">ADMIN<br/><span className="t-red">PANEL</span></div>
        <p className="adm-login__sub">Staff access only</p>
        <input type="password" value={pass} autoFocus
          onChange={e=>{setPass(e.target.value);setErr('');}}
          onKeyDown={e=>e.key==='Enter'&&try_()}
          placeholder="Enter password..." className="adm-login__input"/>
        {err && <div className="adm-login__err">{err}</div>}
        <button className="btn btn-red adm-login__btn" onClick={try_}>Enter Panel</button>
      </div>
    </div>
  );
}

// ── Item Edit Modal ────────────────────────────────────────────
function ItemEditModal({ item, onClose, getPrice, getImage, setPrice, resetPrice, setImage, resetImage }) {
  const origPrice = item.price;
  const origImage = item.image;
  const [price, setP] = useState(getPrice(item).toString());
  const [img,   setI] = useState(getImage(item));
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (price && !isNaN(price)) setPrice(item.id, price);
    if (img.trim()) setImage(item.id, img.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e=>e.stopPropagation()}>
        <div className="adm-modal__head">
          <div>
            <div className="t-ui t-white" style={{fontWeight:700,fontSize:15}}>Edit: {item.name}</div>
            <div style={{fontSize:11,color:'var(--k-muted)',marginTop:2}}>{item.fullName || item.name}</div>
          </div>
          <button className="adm-modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="adm-modal__preview">
          <img src={img || origImage} alt={item.name}
            onError={e=>e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'}
            className="adm-modal__preview-img"/>
          <div className="adm-modal__preview-info">
            <div className="t-ui t-white" style={{fontWeight:700,marginBottom:4}}>{item.name}</div>
            <div className="t-red" style={{fontFamily:'var(--f-ui)',fontWeight:800,fontSize:22}}>
              ${parseFloat(price||0).toFixed(2)}
            </div>
            {getPrice(item) !== origPrice && (
              <div style={{fontSize:10,color:'var(--k-gold)',marginTop:3}}>
                Original: ${origPrice.toFixed(2)} · Override active
              </div>
            )}
          </div>
        </div>

        <div className="adm-modal__fields">
          <Field label="Price (CAD)">
            <div style={{display:'flex',gap:8}}>
              <input className="adm-input" type="number" step="0.01" value={price}
                onChange={e=>setP(e.target.value)} placeholder={origPrice.toString()}/>
              {getPrice(item) !== origPrice && (
                <button className="adm-reset-btn" onClick={()=>{resetPrice(item.id);setP(origPrice.toString());}}>Reset</button>
              )}
            </div>
          </Field>
          <Field label="Image URL" full>
            <div style={{display:'flex',gap:8}}>
              <input className="adm-input" value={img} onChange={e=>setI(e.target.value)}
                placeholder="https://kajunchicken.ca/wp-content/uploads/..."/>
              {getImage(item) !== origImage && (
                <button className="adm-reset-btn" onClick={()=>{resetImage(item.id);setI(origImage);}}>Reset</button>
              )}
            </div>
          </Field>
        </div>

        <div style={{display:'flex',gap:10,marginTop:16}}>
          <button className="btn btn-red" style={{flex:1,justifyContent:'center'}} onClick={save}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Item Form (Add New) ────────────────────────────────────────
function ItemForm({ initial={}, onSave, onCancel, title='Add Item' }) {
  const [f, setF] = useState({
    name: initial.name||'', price: initial.price||'',
    category: initial.category||'boneless',
    description: initial.description||'',
    includes: initial.includes||'', image: initial.image||'',
    badge: initial.badge||'', spicy: initial.spicy||0,
  });
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  const save = () => {
    if (!f.name.trim()||!f.price) return;
    onSave({...f, price:parseFloat(f.price), spicy:parseInt(f.spicy), includes:f.includes||null, badge:f.badge||null});
  };
  return (
    <div className="adm-form">
      <div className="adm-form__head">
        <span className="t-ui t-white" style={{fontWeight:700,fontSize:14}}>{title}</span>
        <button className="adm-form__close" onClick={onCancel}>✕</button>
      </div>
      <div className="adm-form__grid">
        <Field label="Name *" full><input className="adm-input" value={f.name} onChange={e=>s('name',e.target.value)} placeholder="e.g. Spicy Wrap"/></Field>
        <Field label="Price *"><input className="adm-input" type="number" step="0.01" value={f.price} onChange={e=>s('price',e.target.value)} placeholder="12.99"/></Field>
        <Field label="Category">
          <select className="adm-input adm-select" value={f.category} onChange={e=>s('category',e.target.value)}>
            {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </Field>
        <Field label="Description" full><input className="adm-input" value={f.description} onChange={e=>s('description',e.target.value)} placeholder="Description..."/></Field>
        <Field label="Includes"><input className="adm-input" value={f.includes} onChange={e=>s('includes',e.target.value)} placeholder="Side + Drink"/></Field>
        <Field label="Badge"><input className="adm-input" value={f.badge} onChange={e=>s('badge',e.target.value)} placeholder="NEW"/></Field>
        <Field label="Image URL" full><input className="adm-input" value={f.image} onChange={e=>s('image',e.target.value)} placeholder="https://..."/></Field>
        <Field label="Spice">
          <select className="adm-input adm-select" value={f.spicy} onChange={e=>s('spicy',e.target.value)}>
            <option value={0}>Not spicy</option><option value={1}>🌶 Mild</option><option value={2}>🌶🌶 Hot</option>
          </select>
        </Field>
        {f.name&&f.price&&(
          <div className="adm-field adm-field--full adm-preview-card">
            <div className="adm-preview-img">
              <img src={f.image||'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'} alt="preview"
                onError={e=>e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'}/>
            </div>
            <div style={{padding:'10px 14px',flex:1}}>
              <div className="t-ui t-white" style={{fontWeight:700,fontSize:13}}>{f.name}</div>
              {f.description&&<div style={{fontSize:11,color:'var(--k-muted)',margin:'3px 0'}}>{f.description}</div>}
              <div className="t-red" style={{fontFamily:'var(--f-ui)',fontWeight:800,fontSize:18}}>${parseFloat(f.price||0).toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>
      <div style={{display:'flex',gap:10,marginTop:14}}>
        <button className="btn btn-red" style={{flex:1,justifyContent:'center'}} onClick={save} disabled={!f.name.trim()||!f.price}>✓ Add Item</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ── Coupon Form ────────────────────────────────────────────────
function CouponForm({ initial={}, onSave, onCancel, title='Add Coupon' }) {
  const [f, setF] = useState({ tag:initial.tag||'2 CAN DINE', title_:initial.title||'', subtitle:initial.subtitle||'', includes:initial.includes||'', price:initial.price||'', savings:initial.savings||'', expires:initial.expires||'December 31, 2025', emoji:initial.emoji||'🍗', color:initial.color||'#c8102e', featured:initial.featured||false });
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const save=()=>{ if(!f.title_.trim()||!f.price) return; onSave({...f,title:f.title_,price:parseFloat(f.price)}); };
  return (
    <div className="adm-form">
      <div className="adm-form__head"><span className="t-ui t-white" style={{fontWeight:700,fontSize:14}}>{title}</span><button className="adm-form__close" onClick={onCancel}>✕</button></div>
      <div className="adm-form__grid">
        <Field label="Tag"><input className="adm-input" value={f.tag} onChange={e=>s('tag',e.target.value)} placeholder="2 CAN DINE"/></Field>
        <Field label="Emoji"><input className="adm-input" value={f.emoji} onChange={e=>s('emoji',e.target.value)} placeholder="🍗"/></Field>
        <Field label="Title *" full><input className="adm-input" value={f.title_} onChange={e=>s('title_',e.target.value)} placeholder="e.g. 6 Tenders"/></Field>
        <Field label="Subtitle" full><input className="adm-input" value={f.subtitle} onChange={e=>s('subtitle',e.target.value)} placeholder="6 tenders for 2 people"/></Field>
        <Field label="Includes" full><input className="adm-input" value={f.includes} onChange={e=>s('includes',e.target.value)} placeholder="2 Sides + 2 Drinks"/></Field>
        <Field label="Price *"><input className="adm-input" type="number" step="0.01" value={f.price} onChange={e=>s('price',e.target.value)} placeholder="17.99"/></Field>
        <Field label="Savings"><input className="adm-input" value={f.savings} onChange={e=>s('savings',e.target.value)} placeholder="Save ~$8"/></Field>
        <Field label="Expires"><input className="adm-input" value={f.expires} onChange={e=>s('expires',e.target.value)}/></Field>
        <Field label="Color"><input className="adm-input" type="color" value={f.color} onChange={e=>s('color',e.target.value)} style={{height:44,padding:'4px 8px',cursor:'pointer'}}/></Field>
      </div>
      <div style={{display:'flex',gap:10,marginTop:14}}>
        <button className="btn btn-red" style={{flex:1,justifyContent:'center'}} onClick={save} disabled={!f.title_.trim()||!f.price}>✓ Save Coupon</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ── Deal Form ──────────────────────────────────────────────────
function DealForm({ initial={}, onSave, onCancel, title='Add Deal' }) {
  const [f, setF] = useState({ day:initial.day||'MON', dayFull:initial.dayFull||'Monday', title_:initial.title||'', price:initial.price||'', description:initial.description||'', emoji:initial.emoji||'🍗', color:initial.color||'#c8102e' });
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const save=()=>{ if(!f.title_.trim()||!f.price) return; onSave({day:f.day,dayFull:f.dayFull,title:f.title_,price:parseFloat(f.price),description:f.description,emoji:f.emoji,color:f.color,addons:[{name:'Small Gravy',price:1.29},{name:'Drink',price:1.29},{name:'Coleslaw',price:1.29}]}); };
  return (
    <div className="adm-form">
      <div className="adm-form__head"><span className="t-ui t-white" style={{fontWeight:700,fontSize:14}}>{title}</span><button className="adm-form__close" onClick={onCancel}>✕</button></div>
      <div className="adm-form__grid">
        <Field label="Day Label"><input className="adm-input" value={f.day} onChange={e=>s('day',e.target.value)} placeholder="MON"/></Field>
        <Field label="Full Day Name"><input className="adm-input" value={f.dayFull} onChange={e=>s('dayFull',e.target.value)} placeholder="Monday"/></Field>
        <Field label="Title *" full><input className="adm-input" value={f.title_} onChange={e=>s('title_',e.target.value)} placeholder="e.g. Chicken Sandwich"/></Field>
        <Field label="Price *"><input className="adm-input" type="number" step="0.01" value={f.price} onChange={e=>s('price',e.target.value)} placeholder="5.99"/></Field>
        <Field label="Emoji"><input className="adm-input" value={f.emoji} onChange={e=>s('emoji',e.target.value)} placeholder="🥪"/></Field>
        <Field label="Color"><input className="adm-input" type="color" value={f.color} onChange={e=>s('color',e.target.value)} style={{height:44,padding:'4px 8px',cursor:'pointer'}}/></Field>
        <Field label="Description" full><input className="adm-input" value={f.description} onChange={e=>s('description',e.target.value)} placeholder="Deal description..."/></Field>
      </div>
      <div style={{display:'flex',gap:10,marginTop:14}}>
        <button className="btn btn-red" style={{flex:1,justifyContent:'center'}} onClick={save} disabled={!f.title_.trim()||!f.price}>✓ Save Deal</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────
function Dashboard() {
  const {
    store, fullMenu,
    isAvailable, toggleItem, setPrice, resetPrice, getPrice, setImage, resetImage, getImage,
    addCustomItem, editCustomItem, removeCustomItem,
    toggleBaseCoupon, isCouponActive, addCoupon, editCoupon, deleteCoupon, toggleCustomCoupon,
    toggleBaseDeal, isDealActive, addDeal, editDeal, deleteDeal,
    setAnnouncement, setBranding, logout, resetAll,
  } = useAdmin();

  const [tab, setTab] = useState('items');
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem]   = useState(null);
  const [editModal, setEditModal]       = useState(null); // for price/image edit
  const [showCpnForm, setShowCpnForm]   = useState(false);
  const [editCpn, setEditCpn]           = useState(null);
  const [showDealForm, setShowDealForm] = useState(false);
  const [editDl, setEditDl]             = useState(null);
  const [ann, setAnn]   = useState(store.announcement||'');
  const [annSaved, setAnnSaved] = useState(false);
  const [brand, setBrand] = useState({
    logoUrl:      store.logoUrl||'',
    siteName:     store.siteName||'',
    footerCredit: store.footerCredit||'',
    footerGithub: store.footerGithub||'',
    footerRights: store.footerRights||'',
    kaiGreeting:  store.kaiGreeting||'',
  });
  const [brandSaved, setBrandSaved] = useState(false);

  const availCount   = MENU.filter(m=>isAvailable(m.id)).length;
  const unavailCount = (store.unavailable||[]).length;
  const overrideCount = Object.keys({...store.priceOverrides,...store.imageOverrides}).length;

  const grouped = CATEGORIES.map(cat=>({ ...cat, items:fullMenu.filter(m=>m.category===cat.id) })).filter(g=>g.items.length>0);

  const saveAnn   = () => { setAnnouncement(ann); setAnnSaved(true); setTimeout(()=>setAnnSaved(false),1800); };
  const saveBrand = () => { setBranding(brand); setBrandSaved(true); setTimeout(()=>setBrandSaved(false),1800); };

  const TABS = [
    {id:'items',   icon:'🍗', label:'Menu'},
    {id:'coupons', icon:'🎟️', label:'Coupons'},
    {id:'deals',   icon:'⭐', label:'Deals'},
    {id:'announce',icon:'📢', label:'Announce'},
    {id:'branding',icon:'🎨', label:'Branding'},
  ];

  return (
    <div className="adm-dash">
      <div className="adm-dash__bg"/>

      {/* Topbar */}
      <div className="adm-topbar">
        <div className="adm-topbar__brand">
          <img src={store.logoUrl||'https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png'}
            alt="Logo" className="adm-topbar__logo" onError={e=>e.target.style.display='none'}/>
          <div>
            <div className="t-ui t-white adm-topbar__title">Admin Panel</div>
            <div className="adm-topbar__status">
              <span className="adm-status-dot adm-status-dot--on"/>{availCount} on
              <span className="adm-status-dot adm-status-dot--off" style={{marginLeft:8}}/>{unavailCount} off
              {overrideCount>0 && <span style={{marginLeft:8,fontSize:10,color:'var(--k-gold)'}}>· {overrideCount} overrides</span>}
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center',flexShrink:0}}>
          <a href="/kajun-chicken/" className="adm-topbar__link">← View Site</a>
          <button className="adm-topbar__logout" onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-stats">
        {[
          {val:availCount,              label:'Available',    color:'var(--k-white)'},
          {val:unavailCount,            label:'Off Today',    color:'var(--k-red)'},
          {val:(store.customItems||[]).length,label:'Custom Items',color:'var(--k-gold)'},
          {val:overrideCount,           label:'Overrides',    color:'var(--k-gold)'},
        ].map(s=>(
          <div key={s.label} className="adm-stat">
            <div className="adm-stat__val t-display" style={{color:s.color}}>{s.val}</div>
            <div className="adm-stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        {TABS.map(t=>(
          <button key={t.id} className={`adm-tab${tab===t.id?' adm-tab--active':''}`} onClick={()=>setTab(t.id)}>
            {t.icon} <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="adm-content">

        {/* ── ITEMS TAB ─────────────────────────────────── */}
        {tab==='items'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16,flexWrap:'wrap',gap:10}}>
              <p className="adm-tip">
                Toggle availability · Click <strong style={{color:'var(--k-white)'}}>✏️</strong> to edit price or image for any item.
                <span className="adm-tip--green"> Green = available.</span>
                <span className="adm-tip--red"> Red = sold out.</span>
              </p>
              <button className="btn btn-red" style={{fontSize:11,flexShrink:0}} onClick={()=>{setEditingItem(null);setShowItemForm(true);}}>+ Add Item</button>
            </div>
            {showItemForm&&!editingItem&&(<ItemForm onSave={item=>{addCustomItem(item);setShowItemForm(false);}} onCancel={()=>setShowItemForm(false)}/>)}
            {editingItem&&(<ItemForm initial={editingItem} title="Edit Item" onSave={u=>{editCustomItem(editingItem.id,u);setEditingItem(null);}} onCancel={()=>setEditingItem(null)}/>)}

            {grouped.map(cat=>(
              <div key={cat.id} className="adm-cat-group">
                <div className="adm-cat-label">
                  <span>{cat.icon}</span>
                  <span className="t-ui t-white" style={{fontWeight:700,fontSize:12,letterSpacing:1}}>{cat.label}</span>
                  <span className="adm-cat-count">{cat.items.filter(i=>isAvailable(i.id)).length}/{cat.items.length}</span>
                </div>
                <div className="adm-item-list">
                  {cat.items.map(item=>{
                    const priceChanged = (store.priceOverrides||{})[item.id] !== undefined;
                    const imgChanged   = (store.imageOverrides||{})[item.id] !== undefined;
                    return (
                      <div key={item.id} className={`adm-item${isAvailable(item.id)?' adm-item--on':' adm-item--off'}`}>
                        <div className="adm-item__img">
                          <img src={getImage(item)} alt={item.name}
                            onError={e=>e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'}/>
                          {!isAvailable(item.id)&&<div className="adm-item__sold">SOLD OUT</div>}
                        </div>
                        <div className="adm-item__info">
                          <div className="adm-item__name">{item.name}</div>
                          <div className="adm-item__price" style={{color:priceChanged?'var(--k-gold)':'var(--k-red)'}}>
                            ${getPrice(item).toFixed(2)}
                            {priceChanged&&<span style={{fontSize:9,marginLeft:4,color:'var(--k-gold)'}}>EDITED</span>}
                          </div>
                          {imgChanged&&<span style={{fontSize:9,color:'var(--k-gold)'}}>🖼 CUSTOM IMG</span>}
                          {item.custom&&<span className="badge badge-gold" style={{fontSize:8,display:'block',marginTop:3}}>Custom</span>}
                        </div>
                        <div className="adm-item__actions">
                          <Toggle on={isAvailable(item.id)} onChange={()=>toggleItem(item.id)}/>
                          <button className="adm-icon-btn" onClick={()=>setEditModal(item)} title="Edit price/image">✏️</button>
                          {item.custom&&(
                            <>
                              <button className="adm-icon-btn" onClick={()=>{setShowItemForm(false);setEditingItem(item);}}>🔧</button>
                              <button className="adm-icon-btn" onClick={()=>{if(confirm(`Remove ${item.name}?`))removeCustomItem(item.id);}}>🗑️</button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{fontSize:11,marginTop:16}} onClick={()=>{if(confirm('Reset all to defaults?'))resetAll();}}>Reset to Defaults</button>
          </div>
        )}

        {/* ── COUPONS TAB ───────────────────────────────── */}
        {tab==='coupons'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16,flexWrap:'wrap',gap:10}}>
              <p className="adm-tip">Toggle, add, edit or delete coupons.</p>
              <button className="btn btn-red" style={{fontSize:11}} onClick={()=>{setEditCpn(null);setShowCpnForm(true);}}>+ Add Coupon</button>
            </div>
            {showCpnForm&&!editCpn&&(<CouponForm onSave={c=>{addCoupon(c);setShowCpnForm(false);}} onCancel={()=>setShowCpnForm(false)}/>)}
            {editCpn&&(<CouponForm initial={editCpn} title="Edit Coupon" onSave={u=>{editCoupon(editCpn.id,u);setEditCpn(null);}} onCancel={()=>setEditCpn(null)}/>)}

            <div className="adm-section-label">Built-in Coupons</div>
            <div className="adm-coupon-list">
              {BASE_COUPONS.map(c=>(
                <div key={c.id} className={`adm-coupon${isCouponActive(c.id)?' adm-coupon--on':' adm-coupon--off'}`}>
                  <div className="adm-coupon__emoji">{c.emoji}</div>
                  <div className="adm-coupon__info">
                    <div className="adm-coupon__tag" style={{color:c.color}}>{c.tag}</div>
                    <div className="adm-coupon__title">{c.title} — ${c.price.toFixed(2)}</div>
                    <div className="adm-coupon__sub">{c.includes}</div>
                  </div>
                  <Toggle on={isCouponActive(c.id)} onChange={()=>toggleBaseCoupon(c.id)}/>
                </div>
              ))}
            </div>
            {(store.customCoupons||[]).length>0&&(
              <>
                <div className="adm-section-label" style={{marginTop:20}}>Custom Coupons</div>
                <div className="adm-coupon-list">
                  {(store.customCoupons||[]).map(c=>(
                    <div key={c.id} className={`adm-coupon${c.active!==false?' adm-coupon--on':' adm-coupon--off'}`}>
                      <div className="adm-coupon__emoji">{c.emoji}</div>
                      <div className="adm-coupon__info">
                        <div className="adm-coupon__tag" style={{color:c.color}}>{c.tag}</div>
                        <div className="adm-coupon__title">{c.title} — ${c.price.toFixed(2)}</div>
                        <div className="adm-coupon__sub">{c.includes}</div>
                      </div>
                      <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <Toggle on={c.active!==false} onChange={()=>toggleCustomCoupon(c.id)}/>
                        <button className="adm-icon-btn" onClick={()=>setEditCpn(c)}>✏️</button>
                        <button className="adm-icon-btn" onClick={()=>{if(confirm('Delete?'))deleteCoupon(c.id);}}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── DEALS TAB ─────────────────────────────────── */}
        {tab==='deals'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16,flexWrap:'wrap',gap:10}}>
              <p className="adm-tip">Toggle, add, edit or delete daily deals.</p>
              <button className="btn btn-red" style={{fontSize:11}} onClick={()=>{setEditDl(null);setShowDealForm(true);}}>+ Add Deal</button>
            </div>
            {showDealForm&&!editDl&&(<DealForm onSave={d=>{addDeal(d);setShowDealForm(false);}} onCancel={()=>setShowDealForm(false)}/>)}
            {editDl&&(<DealForm initial={{...editDl,title_:editDl.title}} title="Edit Deal" onSave={u=>{editDeal(editDl.id,u);setEditDl(null);}} onCancel={()=>setEditDl(null)}/>)}

            <div className="adm-section-label">Built-in Daily Deals</div>
            <div className="adm-deal-list">
              {BASE_SPECIALS.map(d=>(
                <div key={d.id} className={`adm-deal${isDealActive(d.id)?' adm-deal--on':' adm-deal--off'}`} style={{borderLeftColor:d.color}}>
                  <div className="adm-deal__emoji">{d.emoji}</div>
                  <div className="adm-deal__info">
                    <div className="adm-deal__day" style={{color:d.color}}>{d.day}</div>
                    <div className="adm-deal__title">{d.title} — ${d.price.toFixed(2)}</div>
                  </div>
                  <Toggle on={isDealActive(d.id)} onChange={()=>toggleBaseDeal(d.id)}/>
                </div>
              ))}
            </div>
            {(store.customDeals||[]).length>0&&(
              <>
                <div className="adm-section-label" style={{marginTop:20}}>Custom Deals</div>
                <div className="adm-deal-list">
                  {(store.customDeals||[]).map(d=>(
                    <div key={d.id} className={`adm-deal${d.active!==false?' adm-deal--on':' adm-deal--off'}`} style={{borderLeftColor:d.color}}>
                      <div className="adm-deal__emoji">{d.emoji}</div>
                      <div className="adm-deal__info">
                        <div className="adm-deal__day" style={{color:d.color}}>{d.day}</div>
                        <div className="adm-deal__title">{d.title} — ${d.price.toFixed(2)}</div>
                      </div>
                      <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <Toggle on={d.active!==false} onChange={()=>editDeal(d.id,{active:!d.active})}/>
                        <button className="adm-icon-btn" onClick={()=>setEditDl(d)}>✏️</button>
                        <button className="adm-icon-btn" onClick={()=>{if(confirm('Delete?'))deleteDeal(d.id);}}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── ANNOUNCEMENT ──────────────────────────────── */}
        {tab==='announce'&&(
          <div className="adm-announce">
            <p className="adm-tip" style={{marginBottom:20}}>Red banner at the top of every page. Leave blank to hide.</p>
            <Field label="Announcement Message" full>
              <textarea className="adm-input adm-textarea" value={ann} onChange={e=>setAnn(e.target.value)} placeholder="e.g. Fish unavailable today 🙏" rows={3}/>
            </Field>
            {ann&&<div className="adm-announce-preview"><span>📢</span><span style={{fontSize:13}}>{ann}</span></div>}
            <div style={{display:'flex',gap:10,marginTop:14}}>
              <button className="btn btn-red" onClick={saveAnn} style={{justifyContent:'center'}}>{annSaved?'✓ Saved!':'Save'}</button>
              {ann&&<button className="btn btn-ghost" onClick={()=>{setAnn('');setAnnouncement('');}}>Clear</button>}
            </div>
            <div style={{marginTop:20}}>
              <div className="adm-tip" style={{marginBottom:10}}>Quick examples:</div>
              {['🚫 Fish & Seafood unavailable today — sorry!','⏰ Closing early at 8PM today','🎉 Family Feast 10% off this weekend!','🤖 Talk to KAI for today\'s best deal!'].map(ex=>(
                <button key={ex} className="adm-example" onClick={()=>setAnn(ex)}>{ex}</button>
              ))}
            </div>
          </div>
        )}

        {/* ── BRANDING ──────────────────────────────────── */}
        {tab==='branding'&&(
          <div>
            <p className="adm-tip" style={{marginBottom:20}}>
              Control logo, site name, footer credits. All fields are fully editable — including developer credit.
            </p>
            <div className="adm-form__grid">
              <Field label="Logo URL" full>
                <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
                  <img src={brand.logoUrl||store.logoUrl} alt="Logo preview" style={{height:44,borderRadius:4,objectFit:'contain',background:'var(--k-raised)',padding:4}}
                    onError={e=>e.target.style.display='none'}/>
                  <span style={{fontSize:11,color:'var(--k-muted)'}}>Current logo preview</span>
                </div>
                <input className="adm-input" value={brand.logoUrl} onChange={e=>setBrand(p=>({...p,logoUrl:e.target.value}))} placeholder="https://kajunchicken.ca/wp-content/uploads/.../logo.png"/>
              </Field>
              <Field label="Site Name"><input className="adm-input" value={brand.siteName} onChange={e=>setBrand(p=>({...p,siteName:e.target.value}))} placeholder="KAJUN CHICKEN & SEAFOOD"/></Field>
              <Field label="Footer Credit Line">
                <input className="adm-input" value={brand.footerCredit} onChange={e=>setBrand(p=>({...p,footerCredit:e.target.value}))} placeholder="Designed & Built by ZAI"/>
              </Field>
              <Field label="GitHub / Portfolio Link">
                <input className="adm-input" value={brand.footerGithub} onChange={e=>setBrand(p=>({...p,footerGithub:e.target.value}))} placeholder="https://github.com/zawwarsami16"/>
              </Field>
              <Field label="Rights Text" full>
                <input className="adm-input" value={brand.footerRights} onChange={e=>setBrand(p=>({...p,footerRights:e.target.value}))} placeholder="All Rights Reserved © 2025 Zawwar Sami"/>
              </Field>
              <Field label="KAI Opening Message" full>
                <textarea className="adm-input adm-textarea" value={brand.kaiGreeting} onChange={e=>setBrand(p=>({...p,kaiGreeting:e.target.value}))} placeholder="Hey! I'm KAI..." rows={2}/>
              </Field>
            </div>
            <button className="btn btn-red" style={{marginTop:14,justifyContent:'center'}} onClick={saveBrand}>
              {brandSaved?'✓ Saved!':'Save All Branding'}
            </button>
          </div>
        )}

      </div>

      {/* Price/Image Edit Modal */}
      {editModal && (
        <ItemEditModal
          item={editModal}
          onClose={()=>setEditModal(null)}
          getPrice={getPrice} getImage={getImage}
          setPrice={setPrice} resetPrice={resetPrice}
          setImage={setImage} resetImage={resetImage}
        />
      )}
    </div>
  );
}

export default function Admin() {
  const { authed, login } = useAdmin();
  if (!authed) return <Login onLogin={login}/>;
  return <Dashboard/>;
}
