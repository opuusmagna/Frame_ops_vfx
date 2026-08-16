import React from 'react';
import { Server, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './SolutionsSection.css';

export const SolutionsSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const s = t.solutions;

  const handleCtaClick = (tier: string) => {
    const contactPath = lang === 'en' ? `/en/contact/?service=${tier}` : `/es/contacto/?service=${tier}`;
    navigatePath(contactPath);
  };

  return (
    <section id="solutions" className="solutions-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{s.kicker}</span>
          <h2 className="section-title">{s.title}</h2>
        </div>

        <div className="solutions-grid">
          <div className="solution-card corp-panel">
            <div className="solution-icon-wrap"><Server size={28} /></div>
            <h3 className="solution-card-title">{s.small.title}</h3>
            <p className="solution-card-desc">{s.small.desc}</p>
            <button type="button" className="btn-corporate-secondary" onClick={() => handleCtaClick('vfx-infrastructure')}>
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="solution-card corp-panel highlight-solution">
            <div className="solution-icon-wrap"><Building2 size={28} /></div>
            <h3 className="solution-card-title">{s.enterprise.title}</h3>
            <p className="solution-card-desc">{s.enterprise.desc}</p>
            <button type="button" className="btn-corporate-primary" onClick={() => handleCtaClick('vfx-infrastructure')}>
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
