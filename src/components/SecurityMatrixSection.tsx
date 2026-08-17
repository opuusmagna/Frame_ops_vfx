import React from 'react';
import { ShieldCheck, Lock, Network, FileCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './SecurityMatrixSection.css';

export const SecurityMatrixSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const sec = t.security;
  const isEs = lang === 'es';

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=cybersecurity-compliance' : '/es/contacto/?service=cybersecurity-compliance';
    navigatePath(contactPath);
  };

  const pillars = [
    {
      icon: Lock,
      title: isEs ? 'Acceso basado en principios Zero Trust (ZTNA)' : 'Zero Trust Network Access (ZTNA)',
    },
    {
      icon: Network,
      title: isEs ? 'Microsegmentación de red' : 'Network Microsegmentation',
    },
    {
      icon: FileCheck,
      title: isEs ? 'Preparación técnica para evaluaciones TPN' : 'Technical Support for TPN Evaluations',
    },
  ];

  return (
    <section id="security" className="security-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{sec.kicker}</span>
          <h2 className="section-title">{sec.title}</h2>
        </div>

        <div className="security-statement-box corp-panel text-center">
          <div className="statement-icon-wrap">
            <ShieldCheck size={36} />
          </div>
          <blockquote className="statement-quote">{sec.statement}</blockquote>
          <p className="statement-desc">{sec.desc}</p>

          <div className="security-pillars-row">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div key={idx} className="sec-pillar">
                  <IconComp size={20} className="sec-pillar-icon" />
                  <span>{p.title}</span>
                </div>
              );
            })}
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
