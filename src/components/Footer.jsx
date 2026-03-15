/**
 * ============================================================
 *  KAJUN CHICKEN & SEAFOOD — Footer
 *
 *  Designed & Built by ZAI (Zawwar Sami)
 *  github.com/zawwarsami16
 *  All Rights Reserved © 2025 Zawwar Sami
 * ============================================================
 */
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import './Footer.css';

export default function Footer() {
  const { store } = useAdmin();
  const credit  = store.footerCredit  || 'Designed & Built by ZAI';
  const github  = store.footerGithub  || 'https://github.com/zawwarsami16';
  const rights  = store.footerRights  || 'All Rights Reserved © 2025 Zawwar Sami';

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="https://kajunchicken.ca/wp-content/uploads/2024/07/Kajun-Chicken_logo.png"
                alt="Kajun Chicken" className="footer__logo-img"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
              <div className="footer__logo-fallback" style={{display:'none'}}>
                <div className="footer__logo-k">K</div>
                <div>
                  <div className="t-display footer__logo-name">KAJUN</div>
                  <div className="t-label t-gold" style={{fontSize:7}}>Chicken & Seafood</div>
                </div>
              </div>
            </div>
            <p className="footer__tagline">
              Authentic Cajun cuisine — bold flavors,<br/>Louisiana soul, Ontario proud.
            </p>
            <div style={{display:'flex',gap:8,marginTop:16,flexWrap:'wrap'}}>
              <span className="badge badge-red">100% Halal</span>
              <span className="badge badge-outline">Fresh Daily</span>
              <span className="badge badge-outline">11 Locations</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="eyebrow footer__col-head">Navigate</div>
            <ul className="footer__list">
              {[['/', 'Home'],['/menu','Menu'],['/about','Our Story'],['/locations','Locations'],['/games','🎮 Arcade']].map(([to,l]) => (
                <li key={to}><Link to={to} className="footer__link">{l}</Link></li>
              ))}
              <li><a href="/Kajun-chicken-and-seafood/admin" className="footer__link footer__link--admin">⚙ Staff Panel</a></li>
            </ul>
          </div>

          {/* Menu quick */}
          <div>
            <div className="eyebrow footer__col-head">Menu</div>
            <ul className="footer__list">
              {['Boneless Chicken','Bone-In Chicken','Gourmet Sandwiches','Family Feast','From The Ocean','Sides & Biscuits','Desserts'].map(c => (
                <li key={c}><Link to="/menu" className="footer__link">{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact + social */}
          <div>
            <div className="eyebrow footer__col-head">Connect</div>
            <a href="https://kajunchicken.ca" target="_blank" rel="noopener" className="footer__link">kajunchicken.ca</a>
            <div className="footer__social">
              {[
                { label:'Instagram', href:'https://www.instagram.com/kajunchicken',
                  ico:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label:'Facebook', href:'https://www.facebook.com/kajunchickenseafood',
                  ico:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" className="footer__social-btn">{s.ico}</a>
              ))}
            </div>

            {/* KAI promo */}
            <div className="footer__kai-promo">
              <div className="footer__kai-icon">🤖</div>
              <div>
                <div className="t-ui t-white" style={{fontSize:12,fontWeight:700}}>Talk to KAI</div>
                <div style={{fontSize:11,color:'var(--k-muted)'}}>AI order assistant — ask anything</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="t-muted" style={{fontSize:12}}>
            © {new Date().getFullYear()} Kajun Chicken & Seafood · All Rights Reserved
          </span>
          {/* ── ZAI permanent credit ── */}
          <div className="footer__zai-credit">
            <span className="footer__zai-text">
              {credit} ·{' '}
              <a href={github} target="_blank" rel="noopener" className="footer__zai-link">
                zawwarsami16
              </a>
            </span>
            <span className="t-muted" style={{fontSize:11}}>{rights}</span>
          </div>
          {/* Staff admin access */}
          <a href="/Kajun-chicken-and-seafood/admin" className="footer__admin-link" title="Staff Access">⚙</a>
        </div>
      </div>
    </footer>
  );
}
