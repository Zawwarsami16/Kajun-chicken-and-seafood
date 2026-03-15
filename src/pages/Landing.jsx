/**
 * ============================================================
 *  KAJUN CHICKEN & SEAFOOD — Cinematic Landing Page
 *
 *  Designed & Built by ZAI (Zawwar Sami)
 *  github.com/zawwarsami16
 *  All Rights Reserved © 2025 Zawwar Sami
 * ============================================================
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

/* ── Animated fire particles ─────────────────────────────── */
function FireCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cvs = ref.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let W, H, raf;
    const resize = () => { W = cvs.width = cvs.offsetWidth; H = cvs.height = cvs.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({length:80}, () => ({
      x: Math.random()*1000, y: Math.random()*600+200,
      vx: (Math.random()-.5)*.4, vy: -(Math.random()*1.5+.5),
      life: Math.random(), maxLife: Math.random()*.8+.4,
      size: Math.random()*4+1,
      hue: Math.random()*40, // 0–40 = fire colors
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(4,4,4,.12)';
      ctx.fillRect(0,0,W,H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += .008;
        if (p.life >= p.maxLife) {
          p.x = Math.random()*W; p.y = H + 20;
          p.life = 0; p.vy = -(Math.random()*1.5+.5);
          p.vx = (Math.random()-.5)*.4;
        }
        const alpha = Math.sin((p.life/p.maxLife)*Math.PI)*.8;
        const r = p.size * (1 - p.life/p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(r,0), 0, Math.PI*2);
        ctx.fillStyle = `hsla(${p.hue+10}, 100%, ${60+p.hue*1.2}%, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="land-fire-canvas" />;
}

/* ── Scroll reveal hook ──────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold:.07 }
    );
    document.querySelectorAll('.rev').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Floating food images ────────────────────────────────── */
const FOOD_IMGS = [
  { src:'https://kajunchicken.ca/wp-content/uploads/2024/07/5-Tenders-Combo_Photo-1.jpg',    label:'5 Pc Tenders', price:'$14.99', rot:-6, x:'8%',  y:'18%', delay:0 },
  { src:'https://kajunchicken.ca/wp-content/uploads/2024/07/KAJUN-CHICKEN-ONLY_Photo-3.jpg', label:'Kajun Sandwich', price:'$13.49', rot:4, x:'72%', y:'12%', delay:.3 },
  { src:'https://kajunchicken.ca/wp-content/uploads/2024/07/12-PCS-Family-1_Photo-2.jpg',   label:'Family Feast',  price:'$47.99', rot:-3, x:'55%', y:'55%', delay:.6 },
];

/* ── Stats counter ───────────────────────────────────────── */
function CountUp({ to, suffix='', duration=2000 }) {
  const [v,setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      const s = performance.now();
      const step = ts => {
        const p = Math.min((ts-s)/duration,1);
        setV(Math.round((1-Math.pow(1-p,3))*to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, {threshold:.5});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export default function Landing() {
  useReveal();
  const [hovered, setHovered] = useState(null);

  return (
    <div className="land">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="land-hero">
        <FireCanvas />
        <div className="land-hero__bg" />
        <div className="land-hero__grid" />

        {/* Floating food */}
        {FOOD_IMGS.map((img, i) => (
          <div key={i} className="land-float"
            style={{ left:img.x, top:img.y, '--rot':`${img.rot}deg`, '--delay':`${img.delay}s` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            <div className={`land-float__inner ${hovered===i?'land-float__inner--hovered':''}`}>
              <img src={img.src} alt={img.label}
                onError={e => e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'} />
              <div className={`land-float__tag ${hovered===i?'land-float__tag--show':''}`}>
                <span className="land-float__name">{img.label}</span>
                <span className="land-float__price">{img.price}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="land-hero__content">
          {/* KAI callout at top */}
          <div className="land-kai-callout rev">
            <div className="land-kai-callout__dot" />
            <span className="land-kai-callout__text">🤖 KAI is live — your smart order guide</span>
            <span className="land-kai-callout__arrow">↓</span>
          </div>

          {/* Main headline */}
          <h1 className="land-hero__h1 t-display rev ld1">
            <span className="land-hero__line1">REAL</span>
            <span className="land-hero__line2">CAJUN</span>
            <span className="land-hero__line3 t-red land-glow-r">FIRE.</span>
          </h1>

          <div className="land-hero__sub rev ld2">
            <span className="land-sub-badge">100% Halal</span>
            <span className="land-sub-badge">Fresh Daily</span>
            <span className="land-sub-badge">11 Ontario Locations</span>
          </div>

          <p className="land-hero__desc rev ld3">
            Hand-crafted Cajun chicken & seafood. Bold Louisiana spices.
            Ontario proud since day one.
          </p>

          <div className="land-hero__ctas rev ld4">
            <Link to="/menu" className="land-cta-primary">
              <span className="land-cta-primary__text">Order Now</span>
              <span className="land-cta-primary__icon">→</span>
            </Link>
            <Link to="/menu" className="land-cta-kai">
              <span>🤖</span>
              <span>Talk to KAI</span>
            </Link>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="land-scroll-cue">
          <div className="land-scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ── RED BAND ──────────────────────────────────────── */}
      <div className="land-red-band">
        <div className="land-band-track">
          {[...Array(3)].flatMap((_,k) =>
            ['AUTHENTIC CAJUN','100% HALAL','FRESH DAILY','BOLD FLAVORS','LOUISIANA SOUL','ORDER NOW 🔥','TALK TO KAI 🤖'].map((t,i) => (
              <span key={`${k}-${i}`} className="land-band-item">{t} <span className="land-band-sep">◆</span></span>
            ))
          )}
        </div>
      </div>

      {/* ── FOOD SHOWCASE ─────────────────────────────────── */}
      <section className="land-showcase">
        <div className="container">
          <div className="land-showcase__head rev">
            <div className="eyebrow">Fan Favourites</div>
            <h2 className="t-display land-section-title">
              <span className="t-white">THE</span> <span className="t-red">CLASSICS</span>
            </h2>
          </div>
          <div className="land-food-grid">
            {[
              { img:'https://kajunchicken.ca/wp-content/uploads/2024/07/5-Tenders-Combo_Photo-1.jpg', name:'5 Pc Tenders', price:'$14.99', tag:'BESTSELLER', desc:'Our most-ordered combo. Five bold Cajun tenders with side and drink.', color:'#c8102e' },
              { img:'https://kajunchicken.ca/wp-content/uploads/2024/07/KAJUN-CHICKEN-ONLY_Photo-3.jpg', name:'Kajun Sandwich', price:'$13.49', tag:'SIGNATURE', desc:'The sandwich that started it all. Cajun-spiced, crispy, unforgettable.', color:'#d4a017' },
              { img:'https://kajunchicken.ca/wp-content/uploads/2024/07/12-PCS-Family-1_Photo-2.jpg', name:'12 Pc Family Meal', price:'$47.99', tag:'BEST VALUE', desc:'Feeds 4–6 people. 12 pieces, 6 biscuits, 2 large sides.', color:'#c8102e' },
            ].map((item, i) => (
              <div key={i} className={`land-food-card rev ld${i+1}`}>
                <div className="land-food-card__img">
                  <img src={item.img} alt={item.name}
                    onError={e => e.target.src='https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp'} />
                  <div className="land-food-card__tag" style={{background:item.color}}>{item.tag}</div>
                </div>
                <div className="land-food-card__body">
                  <div className="t-ui t-white land-food-card__name">{item.name}</div>
                  <div className="land-food-card__desc">{item.desc}</div>
                  <div className="land-food-card__footer">
                    <span className="t-red t-ui land-food-card__price">{item.price}</span>
                    <Link to="/menu" className="land-food-card__btn">Add to Cart</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KAI SPOTLIGHT ─────────────────────────────────── */}
      <section className="land-kai-spot">
        <div className="land-kai-spot__bg" />
        <div className="container land-kai-spot__inner">
          <div className="land-kai-spot__left rev">
            <div className="eyebrow">Smart Ordering</div>
            <h2 className="t-display land-section-title">
              MEET <span className="t-red">KAI</span>
            </h2>
            <p className="land-kai-spot__desc">
              KAI is our AI-powered order assistant. Tell it how many people are eating,
              what you're craving, your budget — and KAI builds the perfect order.
              Add items directly to cart from the chat. No menus to scroll.
            </p>
            <div className="land-kai-features">
              {['Knows every item & price','Suggests based on your group size','Add to cart directly from chat','Always suggests the best deal'].map(f => (
                <div key={f} className="land-kai-feat">
                  <span className="t-red" style={{fontSize:14}}>◆</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Link to="/menu" className="land-cta-primary" style={{marginTop:28,display:'inline-flex'}}>
              <span className="land-cta-primary__text">🤖 Talk to KAI</span>
              <span className="land-cta-primary__icon">→</span>
            </Link>
          </div>
          <div className="land-kai-spot__right rev ld2">
            {/* Mock chat preview */}
            <div className="land-kai-mock">
              <div className="land-kai-mock__head">
                <div className="land-kai-mock__av">🤖</div>
                <div>
                  <div className="t-ui t-white" style={{fontWeight:700,fontSize:13}}>KAI — Order Guide</div>
                  <div style={{fontSize:10,color:'var(--k-muted)',display:'flex',gap:5,alignItems:'center'}}>
                    <span style={{width:6,height:6,borderRadius:'50%',background:'#00d26a',display:'inline-block'}}/>Online
                  </div>
                </div>
              </div>
              <div className="land-kai-mock__msgs">
                {[
                  { from:'kai', msg:"Hey! How many people are eating today? 🔥" },
                  { from:'user', msg:"Family of 4" },
                  { from:'kai', msg:"Perfect — the 12 Pc Family Meal at $47.99 is your best bet. Feeds 4–6, comes with 6 biscuits and 2 large sides. Want me to add it?" },
                  { from:'user', msg:"Yes!" },
                  { from:'kai', msg:"Done! 🛒 Added to cart. Want to add biscuits or poutine on the side?" },
                ].map((m,i) => (
                  <div key={i} className={`land-kai-mock__msg land-kai-mock__msg--${m.from}`}>
                    {m.from==='kai' && <span style={{fontSize:14}}>🤖</span>}
                    <div className={`land-kai-mock__bubble land-kai-mock__bubble--${m.from}`}>{m.msg}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="land-stats">
        <div className="container land-stats__grid">
          {[
            { val:11, suffix:'+', label:'Ontario Locations', icon:'📍' },
            { val:50, suffix:'+', label:'Menu Items',        icon:'🍗' },
            { val:100, suffix:'%', label:'Halal Certified',  icon:'✅' },
            { val:5,  suffix:'★', label:'Customer Rating',  icon:'⭐' },
          ].map((s,i) => (
            <div key={s.label} className={`land-stat rev ld${i+1}`}>
              <div className="land-stat__icon">{s.icon}</div>
              <div className="t-display land-stat__val t-red">
                <CountUp to={s.val} suffix={s.suffix} />
              </div>
              <div className="land-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="land-final">
        <div className="land-final__bg" />
        <div className="container land-final__inner rev">
          <img src="https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png"
            alt="Kajun" className="land-final__logo"
            onError={e => e.target.style.display='none'} />
          <h2 className="t-display land-final__title">
            READY TO <span className="t-red">ORDER?</span>
          </h2>
          <p className="land-final__sub">Let KAI guide you or browse the full menu yourself.</p>
          <div className="land-final__ctas">
            <Link to="/menu" className="land-cta-primary">
              <span className="land-cta-primary__text">View Full Menu</span>
              <span className="land-cta-primary__icon">→</span>
            </Link>
            <Link to="/locations" className="land-cta-ghost">Find a Location</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
