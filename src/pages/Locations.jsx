/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useEffect } from 'react';
import './Locations.css';

const LOCS = [
  { city:'Thornhill',   addr:'7700 Bathurst St',     hours:'Daily 11AM–10PM', phone:'(905) 882-0000' },
  { city:'Barrie',      addr:'400 Bayfield St',       hours:'Daily 11AM–10PM', phone:'(705) 726-0000' },
  { city:'Mississauga', addr:'3025 Hurontario St',    hours:'Daily 11AM–11PM', phone:'(905) 890-0000' },
  { city:'North York',  addr:'4789 Yonge St',         hours:'Daily 11AM–11PM', phone:'(416) 222-0000' },
  { city:'Scarborough', addr:'4351 Kingston Rd',      hours:'Daily 11AM–11PM', phone:'(416) 283-0000' },
  { city:'Waterloo',    addr:'550 King St N',         hours:'Daily 11AM–10PM', phone:'(519) 886-0000' },
  { city:'Oshawa',      addr:'1400 King St E',        hours:'Daily 11AM–10PM', phone:'(905) 576-0000' },
  { city:'Whitby',      addr:'1615 Dundas St E',      hours:'Daily 11AM–10PM', phone:'(905) 668-0000' },
  { city:'Oakville',    addr:'351 Dundas St E',       hours:'Daily 11AM–10PM', phone:'(905) 845-0000' },
  { city:'Hamilton',    addr:'1020 Upper James St',   hours:'Daily 11AM–10PM', phone:'(905) 525-0000' },
  { city:'Orillia',     addr:'175 Memorial Ave',      hours:'Daily 11AM–9PM',  phone:'(705) 325-0000' },
];

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold:.06 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Locations() {
  useReveal();
  return (
    <div className="lpage page-wrap">
      <div className="lpage__header">
        <div className="lpage__hbg" />
        <div className="container lpage__hinner">
          <div className="eyebrow reveal">Find Us</div>
          <h1 className="t-display lpage__title reveal d1">
            <span className="t-white">11</span> <span className="t-red">LOCATIONS</span><br/>
            <span className="t-gold">ACROSS ONTARIO</span>
          </h1>
          <p className="t-muted reveal d2" style={{ marginTop:14, fontSize:14, maxWidth:400 }}>
            Find your nearest Kajun and experience authentic Cajun cuisine in your city.
          </p>
        </div>
      </div>

      <div className="container lpage__content">
        <div className="locs-grid">
          {LOCS.map((loc, i) => (
            <div key={loc.city} className={`loc reveal d${(i%4)+1}`}>
              <div className="loc__top">
                <div className="t-label t-red loc__num" style={{ fontSize:9, opacity:.7 }}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <div className="t-display loc__city">{loc.city}</div>
                <div className="t-label t-muted" style={{ fontSize:8, letterSpacing:3 }}>ON · Canada</div>
              </div>
              <div className="loc__body">
                {[
                  { ico:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, val:loc.addr },
                  { ico:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, val:loc.hours },
                  { ico:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.92 3.33 2 2 0 0 1 3.9 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, val:loc.phone },
                ].map((r,j) => (
                  <div key={j} className="loc__row">
                    <span className="loc__ico">{r.ico}</span>
                    <span>{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="loc__foot">
                <a
                  href={`https://maps.google.com?q=Kajun+Chicken+${loc.city}+Ontario`}
                  target="_blank" rel="noopener"
                  className="btn btn-ghost loc__dir"
                >
                  Get Directions
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
