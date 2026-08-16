import React from 'react';
import { ShieldCheck, Lock, Key, FileCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './SecurityMatrixSection.css';

export const SecurityMatrixSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const sec = t.security;

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=cybersecurity-compliance' : '/es/contacto/?service=cybersecurity-compliance';
    navigatePath(contactPath);
  };

  return (
    <section id="security" className="security-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{sec.kicker}</span>
          <h2 className="section-title">{sec.title}</h2>
        </div>

        <div className="security-statement-box corp-panel text-center">
          <div className="statement-icon-wrap"><ShieldCheck size={32} /></div>
          <h3 className="statement-text">{sec.statement}</h3>
          <p className="statement-desc">{sec.desc}</p>

          <div className="security-pillars-row">
            <div className="sec-pillar"><Lock size={18} /> <span>Zero-Trust Architecture (ZTNA)</span></div>
            <div className="sec-pillar"><Key size={18} /> <span>Network Microsegmentation</span></div>
            <div className="sec-pillar"><FileCheck size={18} /> <span>TPN Readiness &amp; Audits</span></div>
          </div>

          <button type="button" className="btn-corporate-primary margin-top" onClick={handleCtaClick}>
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
