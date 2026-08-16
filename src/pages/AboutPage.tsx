import React from 'react';
import { ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './AboutPage.css';

interface AboutPageProps {
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateContact }) => {
  const { t } = useLanguage();
  const a = t.why;

  return (
    <div className="about-page page-with-top-padding">
      <div className="container">
        <header className="page-header text-center">
          <span className="section-kicker">{t.nav.about}</span>
          <h1 className="page-title">{a.title}</h1>
          <p className="page-subtitle">
            {t.hero.subtitle}
          </p>
        </header>

        <div className="corp-panel about-panel">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon"><Cpu size={24} /></div>
              <h3>{a.reason1.title}</h3>
              <p>{a.reason1.desc}</p>
            </div>
            <div className="about-card">
              <div className="about-icon"><ShieldCheck size={24} /></div>
              <h3>{a.reason2.title}</h3>
              <p>{a.reason2.desc}</p>
            </div>
          </div>

          <div className="text-center margin-top-xl">
            <button type="button" className="btn-corporate-primary btn-hero-lg" onClick={onNavigateContact}>
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight size={18} className="btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
