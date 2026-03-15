/**
 * KAJUN CHICKEN & SEAFOOD — Admin Store v4
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MENU } from '../data/menu';
import { COUPONS as BASE_COUPONS, DAILY_SPECIALS as BASE_SPECIALS } from '../data/specials';

const STORE_KEY = 'kajun_admin_v4';
const AUTH_KEY  = 'kajun_auth_v4';

const DEFAULT = {
  unavailable: [
    'fish-tender-1','fish-tender-3','fish-tender-5','fish-nuggets-8',
    'jalapeno-shrimp','fish-sandwich','shrimp-sandwich','surf-turf',
    'chipotle-bbq','onion-crunch','poutine','cauliflower-12',
    'mozz-sticks-4','mozz-sticks-6','jalapeno-fiesta','mac-cheese-6',
  ],
  priceOverrides: {},
  imageOverrides: {},
  customItems: [],
  customCoupons: [],
  activeCouponIds: ['coupon-2cd-sandwich','coupon-2cd-6tenders','coupon-2cd-6dark','coupon-10pc-dark'],
  customDeals: [],
  activeDealIds: ['mon-sandwich','tue-wed-chicken'],
  announcement: '',
  logoUrl: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png',
  siteName: 'KAJUN CHICKEN & SEAFOOD',
  footerCredit: 'Designed & Built by ZAI',
  footerGithub: 'https://github.com/zawwarsami16',
  footerRights: 'All Rights Reserved © 2025 Zawwar Sami',
  kaiGreeting: "Hey! I'm KAI — your Kajun order guide. How many people are eating today?",
};

function load() {
  try {
    const s = localStorage.getItem(STORE_KEY);
    if (s) {
      const p = JSON.parse(s);
      return {
        ...DEFAULT, ...p,
        unavailable:     Array.isArray(p.unavailable)     ? p.unavailable     : DEFAULT.unavailable,
        customItems:     Array.isArray(p.customItems)      ? p.customItems      : [],
        customCoupons:   Array.isArray(p.customCoupons)    ? p.customCoupons    : [],
        activeCouponIds: Array.isArray(p.activeCouponIds)  ? p.activeCouponIds  : DEFAULT.activeCouponIds,
        customDeals:     Array.isArray(p.customDeals)      ? p.customDeals      : [],
        activeDealIds:   Array.isArray(p.activeDealIds)    ? p.activeDealIds    : DEFAULT.activeDealIds,
        priceOverrides:  (p.priceOverrides && typeof p.priceOverrides==='object') ? p.priceOverrides : {},
        imageOverrides:  (p.imageOverrides && typeof p.imageOverrides==='object') ? p.imageOverrides : {},
      };
    }
  } catch {}
  return { ...DEFAULT };
}

const persist = (s) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch {} };

const Ctx = createContext(null);

export function AdminProvider({ children }) {
  const [store, setStore] = useState(load);
  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === '1'; } catch { return false; }
  });
  useEffect(() => { persist(store); }, [store]);

  const set = useCallback((patch) => setStore(p => ({ ...p, ...patch })), []);

  const login  = useCallback((pass) => {
    const ok = (typeof import.meta!=='undefined' && import.meta.env?.VITE_ADMIN_PASS) || 'kajun2025';
    if (pass === ok) { setAuthed(true); localStorage.setItem(AUTH_KEY,'1'); return true; }
    return false;
  }, []);
  const logout = useCallback(() => { setAuthed(false); localStorage.removeItem(AUTH_KEY); }, []);

  const isAvailable = useCallback((id) => !(store.unavailable||[]).includes(id), [store.unavailable]);
  const toggleItem  = useCallback((id) => setStore(p => {
    const l = (p.unavailable||[]).includes(id) ? (p.unavailable||[]).filter(x=>x!==id) : [...(p.unavailable||[]),id];
    return { ...p, unavailable: l };
  }), []);

  const setPrice   = useCallback((id, price) => setStore(p => ({ ...p, priceOverrides: { ...(p.priceOverrides||{}), [id]: parseFloat(price) } })), []);
  const resetPrice = useCallback((id) => setStore(p => { const o={...(p.priceOverrides||{})}; delete o[id]; return {...p,priceOverrides:o}; }), []);
  const getPrice   = useCallback((item) => { const o=store.priceOverrides||{}; return o[item.id]!==undefined ? o[item.id] : item.price; }, [store.priceOverrides]);

  const setImage   = useCallback((id, url) => setStore(p => ({ ...p, imageOverrides: { ...(p.imageOverrides||{}), [id]: url } })), []);
  const resetImage = useCallback((id) => setStore(p => { const o={...(p.imageOverrides||{})}; delete o[id]; return {...p,imageOverrides:o}; }), []);
  const getImage   = useCallback((item) => { const o=store.imageOverrides||{}; return o[item.id]||item.image; }, [store.imageOverrides]);

  const addCustomItem    = useCallback((item) => setStore(p => ({ ...p, customItems: [...(p.customItems||[]), {...item,id:'custom-'+Date.now(),custom:true}] })), []);
  const editCustomItem   = useCallback((id,u) => setStore(p => ({ ...p, customItems:(p.customItems||[]).map(i=>i.id===id?{...i,...u}:i) })), []);
  const removeCustomItem = useCallback((id) => setStore(p => ({ ...p, customItems:(p.customItems||[]).filter(i=>i.id!==id) })), []);

  const toggleBaseCoupon   = useCallback((id) => setStore(p => { const ids=(p.activeCouponIds||[]).includes(id)?(p.activeCouponIds||[]).filter(x=>x!==id):[...(p.activeCouponIds||[]),id]; return {...p,activeCouponIds:ids}; }), []);
  const isCouponActive     = useCallback((id) => { const c=(store.customCoupons||[]).find(x=>x.id===id); if(c) return c.active!==false; return (store.activeCouponIds||[]).includes(id); }, [store]);
  const addCoupon          = useCallback((c) => setStore(p => ({ ...p, customCoupons:[...(p.customCoupons||[]),{...c,id:'coupon-custom-'+Date.now(),active:true}] })), []);
  const editCoupon         = useCallback((id,u) => setStore(p => ({ ...p, customCoupons:(p.customCoupons||[]).map(c=>c.id===id?{...c,...u}:c) })), []);
  const deleteCoupon       = useCallback((id) => setStore(p => ({ ...p, customCoupons:(p.customCoupons||[]).filter(c=>c.id!==id) })), []);
  const toggleCustomCoupon = useCallback((id) => setStore(p => ({ ...p, customCoupons:(p.customCoupons||[]).map(c=>c.id===id?{...c,active:!c.active}:c) })), []);

  const toggleBaseDeal = useCallback((id) => setStore(p => { const ids=(p.activeDealIds||[]).includes(id)?(p.activeDealIds||[]).filter(x=>x!==id):[...(p.activeDealIds||[]),id]; return {...p,activeDealIds:ids}; }), []);
  const isDealActive   = useCallback((id) => { const d=(store.customDeals||[]).find(x=>x.id===id); if(d) return d.active!==false; return (store.activeDealIds||[]).includes(id); }, [store]);
  const addDeal        = useCallback((d) => setStore(p => ({ ...p, customDeals:[...(p.customDeals||[]),{...d,id:'deal-custom-'+Date.now(),active:true}] })), []);
  const editDeal       = useCallback((id,u) => setStore(p => ({ ...p, customDeals:(p.customDeals||[]).map(d=>d.id===id?{...d,...u}:d) })), []);
  const deleteDeal     = useCallback((id) => setStore(p => ({ ...p, customDeals:(p.customDeals||[]).filter(d=>d.id!==id) })), []);

  const setAnnouncement = useCallback((msg) => set({ announcement: msg }), [set]);
  const setBranding     = useCallback((patch) => set(patch), [set]);

  const allCoupons     = [...BASE_COUPONS, ...(store.customCoupons||[])];
  const visibleCoupons = allCoupons.filter(c => isCouponActive(c.id));
  const allDeals       = [...BASE_SPECIALS, ...(store.customDeals||[])];
  const visibleDeals   = allDeals.filter(d => isDealActive(d.id));
  const fullMenu       = [...MENU, ...(store.customItems||[])];
  const resetAll       = useCallback(() => setStore({...DEFAULT}), []);

  return (
    <Ctx.Provider value={{
      store, authed, fullMenu, allCoupons, visibleCoupons, allDeals, visibleDeals,
      login, logout,
      isAvailable, toggleItem,
      setPrice, resetPrice, getPrice,
      setImage, resetImage, getImage,
      addCustomItem, editCustomItem, removeCustomItem,
      toggleBaseCoupon, isCouponActive,
      addCoupon, editCoupon, deleteCoupon, toggleCustomCoupon,
      toggleBaseDeal, isDealActive,
      addDeal, editDeal, deleteDeal,
      setAnnouncement, setBranding, set,
      resetAll,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAdmin = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAdmin must be inside AdminProvider');
  return c;
};
