/**
 * KAJUN CHICKEN & SEAFOOD — Home Page
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useEffect, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { MENU, CATEGORIES } from '../data/menu';
import { DAILY_SPECIALS, COUPONS } from '../data/specials';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../components/Toast';
import './Home.css';

/* ── Reveal hook ─────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);} }),
      { threshold:.06, rootMargin:'0px 0px -30px 0px' }
    );
    document.querySelectorAll('.rev').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Particle canvas ─────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cvs = ref.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let W, H, raf;
    const resize = () => { W = cvs.width = cvs.offsetWidth; H = cvs.height = cvs.offsetHeight; };
    resize();
    window.addEventListener('resize', resize, { passive:true });
    const pts = Array.from({length:55}, () => ({
      x:Math.random()*1000, y:Math.random()*600,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r:Math.random()*1.4+.4,
      a:Math.random()*.35+.06,
      c:Math.random()>.55?'#c8102e':'#d4a017',
    }));
    let mx=500, my=300;
    cvs.addEventListener('mousemove', e => {
      const r=cvs.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top;
    }, { passive:true });
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        const dx=p.x-mx, dy=p.y-my, d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){p.vx+=dx/d*.015;p.vy+=dy/d*.015;}
        p.vx*=.996;p.vy*=.996;
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1;
        if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c;ctx.globalAlpha=p.a;ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle='#c8102e';ctx.globalAlpha=(1-d/90)*.07;ctx.lineWidth=.5;ctx.stroke();}
      }
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="hero__canvas"/>;
}

/* ── CountUp ─────────────────────────────────────────────── */
function CountUp({ to, suffix='', duration=1800 }) {
  const [v, setV] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if(!e.isIntersecting || started) return;
      setStarted(true);
      obs.disconnect();
      const start = performance.now();
      const step = ts => {
        const p = Math.min((ts-start)/duration,1);
        setV(Math.round((1-Math.pow(1-p,3))*to));
        if(p<1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, {threshold:.1, rootMargin:'0px 0px -10px 0px'});
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ── Featured card ───────────────────────────────────────── */
const FeatCard = memo(function FeatCard({ item }) {
  const { add } = useCart();
  const { getPrice, getImage } = useAdmin();
  const toast = useToast();
  const [popped, setPopped] = useState(false);

  const price = getPrice ? getPrice(item) : item.price;
  const image = getImage ? getImage(item) : item.image;

  const handleAdd = () => {
    add({ ...item, price });
    toast(`${item.name} added!`, '🍗');
    setPopped(true);
    setTimeout(() => setPopped(false), 1400);
  };

  return (
    <div className="fc rev">
      <div className="fc__img">
        <img src={image} alt={item.name} loading="lazy"
          onError={e => e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'}/>
        {item.badge && (
          <span className={`badge ${item.badge==='POPULAR'||item.badge==='BEST VALUE'||item.badge==='MEGA DEAL'?'badge-red':'badge-gold'} fc__badge`}>
            {item.badge}
          </span>
        )}
        <div className="fc__over">
          <button className={`fc__add ${popped?'fc__add--done':''}`} onClick={handleAdd}>
            {popped ? '✓ Added!' : '+ Add to Cart'}
          </button>
        </div>
      </div>
      <div className="fc__body">
        <div className="fc__name t-ui t-white">{item.name}</div>
        {item.includes && <div className="fc__inc">{item.includes}</div>}
        <div className="fc__price t-red">${price.toFixed(2)}</div>
      </div>
    </div>
  );
});

/* ── Deals section ───────────────────────────────────────── */
function DealsSection() {
  const { isCouponActive, isDealActive } = useAdmin();
  const activeCoupons = COUPONS.filter(c => isCouponActive(c.id));
  const activeDeals   = DAILY_SPECIALS.filter(d => isDealActive(d.id));
  if (!activeCoupons.length && !activeDeals.length) return null;

  return (
    <section className="section-deals">
      <div className="container">
        <div className="section-head rev">
          <div className="eyebrow">Today's Deals</div>
          <h2 className="t-display section-title"><span className="t-white">HOT</span> <span className="t-gold">DEALS</span></h2>
        </div>

        {activeDeals.length > 0 && (
          <div className="deals-specials-row">
            {activeDeals.map((s,i) => (
              <div key={s.id} className={`deal-special rev d${i+1}`} style={{borderColor:s.color}}>
                <div className="deal-special__day" style={{background:s.color}}>{s.day}</div>
                <div className="deal-special__emoji">{s.emoji}</div>
                <div className="deal-special__title t-ui t-white">{s.title}</div>
                <div className="deal-special__price t-display" style={{color:s.color}}>${s.price.toFixed(2)}</div>
                <div className="deal-special__desc">{s.description}</div>
                <div className="deal-special__addons">
                  {(s.addons||[]).map(a=>(
                    <span key={a.name} className="deal-special__addon">+{a.name} ${a.price.toFixed(2)}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCoupons.length > 0 && (
          <>
            <div className="eyebrow rev" style={{marginBottom:20,marginTop:activeCoupons.length?40:0}}>Coupons — Show at Counter</div>
            <div className="deals-coupons-grid">
              {activeCoupons.map((c,i) => (
                <div key={c.id} className={`coupon-card rev d${(i%4)+1}${c.featured?' coupon-card--featured':''}`} style={{'--cc':c.color}}>
                  <div className="coupon-card__scissors">✂ - - - - - - - - - - - - - - - -</div>
                  <div className="coupon-card__body">
                    <div className="coupon-card__tag" style={{color:c.color}}>{c.tag}</div>
                    <div className="coupon-card__emoji">{c.emoji}</div>
                    <div className="coupon-card__title t-display t-white">{c.title}</div>
                    <div className="coupon-card__subtitle">{c.subtitle}</div>
                    <div className="coupon-card__includes">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {c.includes}
                    </div>
                    <div className="coupon-card__price t-display" style={{color:c.color}}>${c.price.toFixed(2)}</div>
                    {c.savings&&<div className="coupon-card__savings">{c.savings}</div>}
                  </div>
                  <div className="coupon-card__footer">
                    <span className="coupon-card__exp">Exp: {c.expires}</span>
                    <span className="coupon-card__action">Show at Counter →</span>
                  </div>
                  <div className="coupon-card__scissors">✂ - - - - - - - - - - - - - - - -</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const FEATURED_IDS = ['tender-5','bonein-3','kajun-sandwich','family-12','surf-turf','poutine'];

/* ── Home Page ───────────────────────────────────────────── */
export default function Home() {
  useReveal();
  const { store } = useAdmin();
  const featured = MENU.filter(m => FEATURED_IDS.includes(m.id));
  const logo = store.logoUrl || 'https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png';

  return (
    <div className="home-page">

      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section className="hero">
        <ParticleCanvas/>
        <div className="hero__bg"/>
        <div className="hero__grid"/>
        <div className="hero__vignette"/>

        <div className="container hero__inner">
          {/* Left — main content */}
          <div className="hero__content">
            {/* KAI badge */}
            <div className="hero__kai-badge rev">
              <div className="hero__kai-badge-dot"/>
              <span>🤖 KAI is live — ask anything, build your order</span>
            </div>

            <h1 className="hero__h1 t-display rev d1">
              <span className="line1">BOLD</span>
              <span className="line2">CAJUN</span>
              <span className="line3">FLAVORS.</span>
            </h1>

            <div className="hero__badges rev d2">
              <span className="hero__badge">✅ 100% Halal</span>
              <span className="hero__badge">🔥 Fresh Daily</span>
              <span className="hero__badge">📍 11 Locations</span>
            </div>

            <p className="hero__desc rev d3">
              Hand-crafted Cajun chicken & seafood. Bold Louisiana spices.
              Ontario proud — from our kitchen to your hands.
            </p>

            <div className="hero__ctas rev d4">
              <Link to="/menu" className="btn btn-red hero__btn-main">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
                View Full Menu
              </Link>
              <Link to="/locations" className="btn btn-ghost">Find Location</Link>
            </div>

            {/* Stats */}
            <div className="hero__stats rev d5">
              {[{v:11,s:'+',l:'Locations'},{v:55,s:'+',l:'Items'},{v:100,s:'%',l:'Halal'},{v:5,s:'★',l:'Rating'}].map(st=>(
                <div key={st.l} className="hero__stat">
                  <div className="hero__stat-val t-display t-red"><CountUp to={st.v} suffix={st.s}/></div>
                  <div className="hero__stat-lbl">{st.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div className="hero__visual rev d2">
            <div className="hero__visual-ring hero__visual-ring--1"/>
            <div className="hero__visual-ring hero__visual-ring--2"/>
            <div className="hero__visual-card">
              <img src="https://kajunchicken.ca/wp-content/uploads/2024/07/5-Tenders-Combo_Photo-1.jpg"
                alt="5 Pc Tenders Combo"
                className="hero__visual-img"
                onError={e=>e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'}/>
              <div className="hero__visual-label">
                <div className="t-ui t-white" style={{fontWeight:700,fontSize:13}}>5 Pc Tenders</div>
                <div className="t-red" style={{fontFamily:'var(--f-ui)',fontWeight:800,fontSize:20}}>$14.99</div>
              </div>
            </div>
            {/* Logo badge */}
            <div className="hero__logo-badge">
              <img src={logo} alt="Kajun" onError={e=>e.target.style.display='none'}/>
            </div>
          </div>
        </div>

        <div className="hero__scroll">
          <div className="hero__scroll-line"/>
          <span className="t-label t-muted" style={{fontSize:7,letterSpacing:4}}>SCROLL</span>
        </div>
      </section>

      {/* ══ MARQUEE ════════════════════════════════════════ */}
      <div className="marquee-band">
        <div className="marquee-track">
          {[...Array(3)].flatMap((_,k)=>
            ['AUTHENTIC CAJUN','100% HALAL','FRESH DAILY','BOLD FLAVORS','ORDER NOW 🔥','TALK TO KAI 🤖','LOUISIANA SOUL'].map((t,i)=>(
              <span key={`${k}-${i}`} className="marquee-item">{t} <span className="marquee-sep">◆</span></span>
            ))
          )}
        </div>
      </div>

      {/* ══ CATEGORY STRIP ═════════════════════════════════ */}
      <section className="cat-strip">
        <div className="container">
          <div className="cat-strip__inner">
            {CATEGORIES.map((cat,i)=>(
              <Link to={`/menu?cat=${cat.id}`} key={cat.id} className="cat-chip rev" style={{transitionDelay:`${i*.04}s`}}>
                <span className="cat-chip__icon">{cat.icon}</span>
                <span className="cat-chip__lbl">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED ITEMS ══════════════════════════════════ */}
      <section className="section-feat">
        <div className="container">
          <div className="section-head rev">
            <div className="eyebrow">Fan Favourites</div>
            <h2 className="t-display section-title"><span className="t-white">MOST</span> <span className="t-red">LOVED</span></h2>
          </div>
          <div className="feat-grid">
            {featured.map(item=><FeatCard key={item.id} item={item}/>)}
          </div>
          <div className="rev" style={{textAlign:'center',marginTop:48}}>
            <Link to="/menu" className="btn btn-outline-red">
              Full Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PROMO SPLIT ════════════════════════════════════ */}
      <section className="promo-split">
        <div className="promo-split__left">
          <div className="promo-split__content rev">
            <div className="eyebrow">Family Deal</div>
            <h2 className="t-display promo-split__title">
              FEED THE<br/><span className="t-red">FAMILY</span><br/>
              <span className="t-gold">FROM $33.49</span>
            </h2>
            <p className="promo-split__sub">8, 12, or 16 pieces — biscuits and sides included. Perfect for family nights.</p>
            <Link to="/menu?cat=family" className="btn btn-gold" style={{marginTop:28}}>Order Family Feast</Link>
          </div>
        </div>
        <div className="promo-split__right">
          <img src="https://kajunchicken.ca/wp-content/uploads/2024/07/12-PCS-Family-1_Photo-2.jpg" alt="Family Feast"
            className="promo-split__img"
            onError={e=>e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'}/>
          <div className="promo-split__over"/>
          <div className="promo-split__tag">
            <div className="promo-split__tag-val">$33<sup style={{fontSize:22}}>.49</sup></div>
            <div className="promo-split__tag-lbl">STARTING FROM</div>
          </div>
        </div>
      </section>

      {/* ══ KAI BANNER ══════════════════════════════════════ */}
      <section className="kai-banner">
        <div className="kai-banner__bg"/>
        <div className="container kai-banner__inner rev">
          <div className="kai-banner__icon">🤖</div>
          <div className="kai-banner__text">
            <div className="eyebrow">Smart Ordering</div>
            <h2 className="t-display kai-banner__title">TALK TO <span className="t-red">KAI</span></h2>
            <p className="kai-banner__sub">KAI knows every item, price, and deal. Tell it how many people — it builds your perfect order and adds to cart.</p>
          </div>
          <Link to="/menu" className="btn btn-red kai-banner__cta">Start Chatting →</Link>
        </div>
      </section>

      {/* ══ WHY ═════════════════════════════════════════════ */}
      <section className="section-why">
        <div className="container">
          <div className="section-head rev" style={{textAlign:'center'}}>
            <div className="eyebrow" style={{justifyContent:'center'}}>Why Kajun</div>
            <h2 className="t-display section-title" style={{fontSize:'clamp(44px,7vw,90px)'}}>
              THE <span className="t-red">DIFFERENCE</span>
            </h2>
          </div>
          <div className="why-grid">
            {[
              {n:'01',icon:'🌶️',t:'AUTHENTIC CAJUN',b:'Every recipe rooted in Louisiana tradition. Bold spices, zero shortcuts.'},
              {n:'02',icon:'✅',t:'100% HALAL',     b:'Certified halal across every location, every single day.'},
              {n:'03',icon:'🔥',t:'MADE FRESH DAILY',b:'Hand-crafted every morning. Never frozen. Always bold.'},
              {n:'04',icon:'📍',t:'11 LOCATIONS',    b:'Serving families across Ontario from Thornhill to Orillia.'},
            ].map((w,i)=>(
              <div key={w.n} className={`why-card rev d${i+1}`}>
                <div className="why-card__n t-display t-red">{w.n}</div>
                <div className="why-card__icon">{w.icon}</div>
                <h3 className="why-card__t t-ui t-white">{w.t}</h3>
                <p className="why-card__b">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEALS ═══════════════════════════════════════════ */}
      <DealsSection/>

    </div>
  );
}
