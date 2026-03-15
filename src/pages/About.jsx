/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useEffect } from 'react';
import './About.css';

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold:.07 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function About() {
  useReveal();
  return (
    <div className="apage page-wrap">
      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-hero__bg" />
        <div className="container ab-hero__inner">
          <div className="eyebrow reveal">Our Story</div>
          <h1 className="t-display ab-hero__title reveal d1">
            <span className="t-white">BORN IN</span><br/>
            <span className="t-red glow-r">LOUISIANA.</span><br/>
            <span className="t-gold glow-g">RAISED IN</span><br/>
            <span className="t-white">ONTARIO.</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container ab-content">
        <div className="ab-grid">
          <div className="reveal">
            <div className="eyebrow">Our Mission</div>
            <h2 className="t-display ab-h2">
              <span className="t-white">AUTHENTIC</span><br/>
              <span className="t-red">CAJUN SOUL</span>
            </h2>
            <p className="ab-body">
              At Kajun Chicken & Seafood, we believe great food tells a story.
              Our journey began with a passion for the rich, vibrant flavors of Louisiana
              and a mission to bring that culinary heritage to communities across Ontario.
            </p>
            <p className="ab-body" style={{ marginTop:14, color:'var(--k-muted)' }}>
              Every recipe is crafted with fresh ingredients, traditional spice blends,
              and the same care that's been passed down through generations of Cajun cooking.
              100% Halal. Fresh daily. Zero compromise.
            </p>
          </div>

          <div className="ab-values">
            {[
              { icon:'🌶️', t:'Authentic Recipes',    d:'Rooted in Louisiana tradition, bold and uncompromised.' },
              { icon:'✅', t:'100% Halal',            d:'Certified halal at every location, every single day.' },
              { icon:'🔥', t:'Made Fresh Daily',      d:'Hand-crafted every morning. Never frozen. Always bold.' },
              { icon:'📍', t:'11 Ontario Locations',  d:'Proudly serving families from Thornhill to Orillia.' },
            ].map((v, i) => (
              <div key={v.t} className={`ab-val reveal d${i+1}`}>
                <span className="ab-val__icon">{v.icon}</span>
                <div>
                  <div className="t-ui t-white ab-val__title">{v.t}</div>
                  <div className="t-muted ab-val__body">{v.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div className="ab-banner reveal">
          <img
            src="https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp"
            alt="Kajun Family Feast"
            className="ab-banner__img"
            onError={e => { e.target.style.display='none'; }}
          />
          <div className="ab-banner__over">
            <div className="t-display ab-banner__text">
              QUALITY IN<br/><span className="t-red">EVERY BITE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
