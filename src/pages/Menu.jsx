/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MENU, CATEGORIES, AI_SYSTEM_PROMPT } from '../data/menu';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import './Menu.css';

/* ── Spice ────────────────────────────────────────────────── */
const Spice = ({ level }) => (
  <div className="spice">
    {[0,1,2].map(i => <div key={i} className={`spice-dot${i < level ? ' on' : ''}`} />)}
  </div>
);

/* ── Menu Card ────────────────────────────────────────────── */
function MenuCard({ item }) {
  const { add, items } = useCart();
  const { isAvailable, getPrice, getImage } = useAdmin();
  const available = isAvailable(item.id);
  const displayPrice = getPrice ? getPrice(item) : item.price;
  const displayImage = getImage ? getImage(item) : item.image;
  const toast = useToast();
  const [popped, setPopped] = useState(false);
  const inCart = items.find(i => i.id === item.id);

  const handleAdd = () => {
    if (!available) return;
    add(item);
    toast(`${item.name} added to cart`, '🍗');
    setPopped(true);
    setTimeout(() => setPopped(false), 1200);
  };

  return (
    <div className="mc card-base">
      <div className="mc__img">
        <img src={displayImage} alt={item.name} loading="lazy"
          onError={e => { e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'; }} />
        {item.badge && (
          <span className={`badge ${item.badge==='POPULAR'||item.badge==='BEST VALUE'||item.badge==='MEGA DEAL'?'badge-red':'badge-gold'} mc__badge`}>
            {item.badge}
          </span>
        )}
        {item.spicy > 0 && (
          <div className="mc__spice"><Spice level={item.spicy} /></div>
        )}
        {!available && (
          <div className="mc__sold-out">
            <span>SOLD OUT TODAY</span>
          </div>
        )}
      </div>
      <div className="mc__body">
        <div className="mc__cat t-label t-muted" style={{ fontSize:8, marginBottom:5 }}>
          {CATEGORIES.find(c=>c.id===item.category)?.label}
        </div>
        <h3 className="mc__name t-ui t-white">{item.fullName || item.name}</h3>
        <p className="mc__desc">{item.description}</p>
        {item.includes && (
          <div className="mc__inc">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {item.includes}
          </div>
        )}
      </div>
      <div className="mc__foot">
        <div className="mc__price t-red">${displayPrice.toFixed(2)}</div>
        <button className={`mc__btn ${popped?'mc__btn--added':''} ${inCart&&!popped?'mc__btn--incart':''} ${!available?'mc__btn--soldout':''}`} onClick={handleAdd} disabled={!available}>
          {!available ? 'Sold Out' : popped ? '✓ Added!' : inCart ? `In Cart (${inCart.qty})` : '+ Add'}
        </button>
      </div>
    </div>
  );
}

/* ── Ultra Smart AI Chat ──────────────────────────────────── */
function AIChat() {
  const GROQ_KEY = import.meta.env?.VITE_GROQ_API_KEY || '';

  const [msgs, setMsgs] = useState([{
    role: 'assistant',
    content: "Hey! 👋 I'm **KAJUN AI** — your personal order guide.\n\nI know every item on our menu, every price, every combo deal, and exactly how much you'll pay after tax.\n\nTell me:\n- How many people are ordering?\n- What are you in the mood for?\n- Any budget in mind?\n\nLet's build your perfect order! 🔥",
    id: 'init',
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('kajun_key') || GROQ_KEY);
  const [keyMode, setKeyMode] = useState(!apiKey);
  const [keyDraft, setKeyDraft] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, loading]);

  const saveKey = () => {
    const k = keyDraft.trim();
    if (!k) return;
    setApiKey(k);
    localStorage.setItem('kajun_key', k);
    setKeyMode(false);
  };

  const send = useCallback(async (text) => {
    const t = (text || input).trim();
    if (!t || loading) return;
    if (!apiKey) { setKeyMode(true); return; }

    setMsgs(p => [...p, { role:'user', content:t, id: Date.now() }]);
    setInput('');
    setLoading(true);

    try {
      const history = msgs.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          max_tokens: 600,
          temperature: 0.7,
          messages: [
            { role:'system', content: AI_SYSTEM_PROMPT },
            ...history,
            { role:'user', content:t },
          ],
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error?.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) setMsgs(p => [...p, { role:'assistant', content:reply, id: Date.now() }]);
    } catch(err) {
      setMsgs(p => [...p, { role:'assistant', content:`❌ **Error:** ${err.message}\n\nPlease check your Groq API key in ⚙️ settings.`, id: Date.now() }]);
    } finally { setLoading(false); }
  }, [input, loading, apiKey, msgs]);

  // Render markdown-ish text
  const renderMsg = (text) => text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(/`(.*?)`/g, '<code>$1</code>');

  const QUICK = [
    'Best combo for 2 people?',
    "What's most popular?",
    'Family meal options?',
    'Show me spicy items',
    'Budget under $20',
    'Summarize my order',
  ];

  return (
    <div className="ai">
      {/* Header */}
      <div className="ai__head">
        <div className="ai__avatar">🤖</div>
        <div className="ai__hinfo">
          <div className="t-ui t-white ai__hname">KAJUN AI</div>
          <div className="t-label t-muted" style={{ fontSize:8 }}>Menu Expert · Powered by Groq</div>
        </div>
        <div className="ai__live" title="Online" />
        <button className="ai__settings" onClick={() => setKeyMode(v => !v)} title="API Settings">⚙️</button>
      </div>

      {/* API Key panel */}
      {keyMode && (
        <div className="ai__keypanel">
          <div className="t-label t-gold" style={{ marginBottom:8, fontSize:8 }}>◆ Connect Groq API Key</div>
          <p style={{ fontSize:12, color:'var(--k-text)', marginBottom:10, lineHeight:1.6 }}>
            Free key at <a href="https://console.groq.com" target="_blank" rel="noopener" style={{ color:'var(--k-red)' }}>console.groq.com</a>
            {' '}· Or add to <code style={{ fontSize:11, background:'var(--k-raised)', padding:'2px 5px', borderRadius:3 }}>.env</code> as <code style={{ fontSize:11, background:'var(--k-raised)', padding:'2px 5px', borderRadius:3 }}>VITE_GROQ_API_KEY</code>
          </p>
          <div className="ai__keyrow">
            <input
              type="password"
              value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              placeholder="gsk_..."
              className="ai__keyinput"
              autoFocus
            />
            <button className="btn btn-red" style={{ fontSize:10, padding:'10px 16px', whiteSpace:'nowrap' }} onClick={saveKey}>
              Connect
            </button>
          </div>
          {apiKey && (
            <button style={{ fontSize:11, color:'var(--k-muted)', marginTop:8, textDecoration:'underline' }}
              onClick={() => { localStorage.removeItem('kajun_key'); setApiKey(''); setKeyDraft(''); }}>
              Disconnect current key
            </button>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="ai__msgs">
        {msgs.map(m => (
          <div key={m.id} className={`ai__msg ai__msg--${m.role}`}>
            {m.role === 'assistant' && <span className="ai__msg-av">🤖</span>}
            <div
              className="ai__bubble"
              dangerouslySetInnerHTML={{ __html: renderMsg(m.content) }}
            />
          </div>
        ))}
        {loading && (
          <div className="ai__msg ai__msg--assistant">
            <span className="ai__msg-av">🤖</span>
            <div className="ai__bubble ai__dots">
              <span/><span/><span/>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick suggestions */}
      <div className="ai__quick">
        {QUICK.map(q => (
          <button key={q} className="ai__chip"
            onClick={() => { setInput(q); setTimeout(() => send(q), 0); }}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="ai__inputrow">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask about menu, prices, or build an order..."
          className="ai__input"
          disabled={loading}
        />
        <button
          className="ai__send"
          onClick={() => send()}
          disabled={loading || !input.trim()}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Menu Page ────────────────────────────────────────────── */
export default function MenuPage() {
  const [params, setParams] = useSearchParams();
  const [cat, setCat] = useState(params.get('cat') || 'all');
  const [q, setQ] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => { setCat(params.get('cat') || 'all'); }, [params]);

  const filtered = MENU.filter(item => {
    const okCat = cat === 'all' || item.category === cat;
    const okQ   = !q || item.name.toLowerCase().includes(q.toLowerCase()) || item.description.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  const groups = CATEGORIES
    .map(c => ({ ...c, items: filtered.filter(m => m.category === c.id) }))
    .filter(c => c.items.length > 0);

  const setCategory = id => { setCat(id); setParams(id !== 'all' ? { cat:id } : {}); };

  return (
    <div className="mpage page-wrap">
      {/* Page header */}
      <div className="mpage__header">
        <div className="mpage__hbg" />
        <div className="container mpage__hinner">
          <div className="eyebrow">Our Menu</div>
          <h1 className="t-display mpage__title">
            <span className="t-white">BOLD</span> <span className="t-red">FLAVORS</span>
          </h1>
          <p className="mpage__sub">All prices CAD · Ontario HST 13% applied at checkout</p>
        </div>
      </div>

      {/* Layout */}
      <div className="container mpage__layout">
        {/* Sidebar */}
        <aside className="mpage__aside">
          {/* Search */}
          <div className="msearch">
            <svg className="msearch__ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Search menu..." className="msearch__input" />
            {q && <button className="msearch__clr" onClick={()=>setQ('')}>✕</button>}
          </div>

          {/* Category filter */}
          <nav className="mcats">
            <div className="t-label t-muted mcats__label">Categories</div>
            <button className={`mcat-btn${cat==='all'?' mcat-btn--active':''}`} onClick={()=>setCategory('all')}>
              <span>🍽️</span> <span className="mcat-btn__lbl">All Items</span>
              <span className="mcat-btn__count">{MENU.length}</span>
            </button>
            {CATEGORIES.map(c => (
              <button key={c.id}
                className={`mcat-btn${cat===c.id?' mcat-btn--active':''}`}
                onClick={()=>setCategory(c.id)}>
                <span>{c.icon}</span>
                <span className="mcat-btn__lbl">{c.label}</span>
                <span className="mcat-btn__count">{MENU.filter(m=>m.category===c.id).length}</span>
              </button>
            ))}
          </nav>

          {/* AI Toggle */}
          <button className={`ai-toggle${chatOpen?' ai-toggle--on':''}`} onClick={()=>setChatOpen(v=>!v)}>
            <span className="ai-toggle__icon">🤖</span>
            <div className="ai-toggle__txt">
              <div className="t-ui t-white" style={{ fontWeight:700, fontSize:13 }}>KAJUN AI</div>
              <div style={{ fontSize:11, color:'var(--k-muted)' }}>Smart order assistant</div>
            </div>
            <svg className="ai-toggle__arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ transform:chatOpen?'rotate(180deg)':'none', transition:'transform .3s' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {chatOpen && <AIChat />}
        </aside>

        {/* Menu content */}
        <main className="mpage__main">
          <div className="mpage__bar">
            <span style={{ fontSize:13, color:'var(--k-muted)' }}>
              {filtered.length} item{filtered.length!==1?'s':''}
              {cat!=='all' && ` · ${CATEGORIES.find(c=>c.id===cat)?.label}`}
              {q && ` matching "${q}"`}
            </span>
          </div>

          {groups.length === 0 ? (
            <div className="mpage__empty">
              <p className="t-ui t-white" style={{ marginBottom:8 }}>No items found</p>
              <button className="btn btn-ghost" onClick={()=>{setQ('');setCategory('all');}}>Clear filters</button>
            </div>
          ) : (
            groups.map(g => (
              <div key={g.id} className="mgroup" id={`g-${g.id}`}>
                <div className="mgroup__head">
                  <span className="mgroup__icon">{g.icon}</span>
                  <div>
                    <div className="eyebrow" style={{ marginBottom:2 }}>{g.label}</div>
                  </div>
                </div>
                <div className="mgroup__grid">
                  {g.items.map(item => <MenuCard key={item.id} item={item} />)}
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
