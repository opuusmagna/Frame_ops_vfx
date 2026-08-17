import React from 'react';
import { Globe, Mail, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import type { Language } from '../context/LanguageContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t, lang, switchLanguage, navigatePath } = useLanguage();
  const f = t.footer;

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'es' ? 'en' : 'es';
    switchLanguage(nextLang);
  };

  const isEs = lang === 'es';

  return (
    <footer className="master-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo-row">
              <img 
                src="/images/brand/Logo_Solo.png" 
                alt="Frame Ops VFX Logo" 
                className="footer-logo-img" 
              />
              <span className="footer-brand-title">FRAME OPS VFX</span>
            </div>
            <p className="footer-slogan">TECHNOLOGY BEHIND THE FRAME</p>
            <p className="footer-tagline">{f.tagline}</p>
            <div className="footer-tpn-badge">
              <ShieldCheck size={14} className="tpn-icon" />
              <span>TPN & MPA Alignment Support</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">{isEs ? 'Navegación' : 'Navigation'}</h4>
            <ul className="footer-links">
              <li><a href="#services">{isEs ? 'Servicios' : 'Services'}</a></li>
              <li><a href="#solutions">{isEs ? 'Soluciones' : 'Solutions'}</a></li>
              <li><a href="#analyzer">{isEs ? 'Analizador' : 'Analyzer'}</a></li>
              <li><a href="#estimator">{isEs ? 'Estimador' : 'Estimator'}</a></li>
              <li><a href="#contact">{isEs ? 'Contacto' : 'Contact'}</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">{isEs ? 'Especialidades' : 'Specialties'}</h4>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => navigatePath(isEs ? '/es/servicios-gestionados/' : '/en/managed-services/')}>
                  {isEs ? 'Servicios Gestionados' : 'Managed Services'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => navigatePath(isEs ? '/es/servicios/backup-disaster-recovery/' : '/en/services/backup-disaster-recovery/')}>
                  {isEs ? 'Backup & Recuperación' : 'Backup & Disaster Recovery'}
                </button>
              </li>
              <li><a href="#security">{isEs ? 'Seguridad Zero Trust' : 'Zero Trust Security'}</a></li>
              <li><a href="#workflow">{isEs ? 'Orquestación VFX' : 'VFX Pipeline'}</a></li>
            </ul>
          </div>

          {/* Legal & Language Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">{isEs ? 'Legal e Idioma' : 'Legal & Language'}</h4>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => navigatePath(isEs ? '/es/privacidad/' : '/en/privacy/')}>
                  {f.privacy}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => navigatePath(isEs ? '/es/terminos/' : '/en/terms/')}>
                  {f.terms}
                </button>
              </li>
              <li>
                <a href="mailto:info@frameops.vfx" className="footer-email-link">
                  <Mail size={14} /> info@frameops.vfx
                </a>
              </li>
            </ul>

            <div className="footer-lang-container">
              <button type="button" className="btn-footer-lang" onClick={handleToggleLang} aria-label="Cambiar idioma">
                <Globe size={14} />
                <span>{isEs ? 'English (EN)' : 'Español (ES)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Frame Ops VFX. {f.rights}</p>
          <div className="footer-legal-inline">
            <button type="button" className="legal-footer-link" onClick={() => navigatePath(isEs ? '/es/privacidad/' : '/en/privacy/')}>
              {f.privacy}
            </button>
            <span className="legal-sep">•</span>
            <button type="button" className="legal-footer-link" onClick={() => navigatePath(isEs ? '/es/terminos/' : '/en/terms/')}>
              {f.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
