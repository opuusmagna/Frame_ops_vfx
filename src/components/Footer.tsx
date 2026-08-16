import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import type { Language } from '../context/LanguageContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t, lang, switchLanguage } = useLanguage();
  const f = t.footer;

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'es' ? 'en' : 'es';
    switchLanguage(nextLang);
  };

  return (
    <footer className="master-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src="/images/brand/Logo_Solo.png" alt="Frame Ops VFX Logo" className="footer-logo-img" />
              <span className="footer-brand-title">FRAME OPS VFX</span>
            </div>
            <p className="footer-tagline">{f.tagline}</p>
          </div>

          <div className="footer-lang-box">
            <button type="button" className="btn-footer-lang" onClick={handleToggleLang}>
              <Globe size={16} />
              <span>{lang === 'es' ? 'English (EN)' : 'Español (ES)'}</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Frame Ops VFX. {f.rights}</p>
        </div>
      </div>
    </footer>
  );
};
