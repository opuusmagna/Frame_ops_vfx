import React from 'react';
import { Globe, Mail, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import type { Language } from '../context/LanguageContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t, lang, switchLanguage, navigatePath, currentPath } = useLanguage();
  const f = t.footer;

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'es' ? 'en' : 'es';
    switchLanguage(nextLang);
  };

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isEs = lang === 'es';

  const handleNavTarget = (targetSection: string) => {
    if (targetSection === 'services') {
      navigatePath(isEs ? '/es/servicios/' : '/en/services/');
      return;
    }

    if (targetSection === 'contact') {
      navigatePath(isEs ? '/es/contacto/' : '/en/contact/');
      return;
    }

    const routePath = currentPath.split('?')[0].split('#')[0];
    const cleanPath = routePath.endsWith('/') ? routePath : `${routePath}/`;
    const isHome = cleanPath === '/es/' || cleanPath === '/en/' || cleanPath === '/';

    if (isHome) {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = targetSection;
      }
    } else {
      const homePath = isEs ? `/es/#${targetSection}` : `/en/#${targetSection}`;
      navigatePath(homePath);
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    }
  };

  return (
    <footer className="master-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo-row">
              <img 
                src="/images/brand/Logo_Footer.png" 
                alt="Frame Ops VFX Logo" 
                className="footer-logo-img" 
              />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-col footer-col-nav">
            <h4 className="footer-col-title">{isEs ? 'Navegación' : 'Navigation'}</h4>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => handleNavTarget('services')}>
                  {isEs ? 'Servicios' : 'Services'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => handleNavTarget('solutions')}>
                  {isEs ? 'Soluciones' : 'Solutions'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => handleNavTarget('analyzer')}>
                  {isEs ? 'Analizador' : 'Analyzer'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => handleNavTarget('estimator')}>
                  {isEs ? 'Estimador' : 'Estimator'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => handleNavTarget('contact')}>
                  {isEs ? 'Contacto' : 'Contact'}
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-col footer-col-specialties">
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
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => navigatePath(isEs ? '/es/ciberseguridad-zero-trust/' : '/en/zero-trust-security/')}>
                  {isEs ? 'Seguridad Zero Trust' : 'Zero Trust Security'}
                </button>
              </li>
              <li>
                <button type="button" className="footer-nav-btn" onClick={() => navigatePath(isEs ? '/es/orquestacion-vfx/' : '/en/vfx-orchestration/')}>
                  {isEs ? 'Orquestación VFX' : 'VFX Pipeline'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Language Column */}
          <div className="footer-col footer-col-legal">
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
                <a href="mailto:info@frameopsvfx.com" className="footer-email-link">
                  <Mail size={14} /> info@frameopsvfx.com
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
          <button type="button" className="btn-back-to-top" onClick={handleScrollToTop} aria-label="Volver arriba">
            <span>{isEs ? 'Volver arriba' : 'Back to top'}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
