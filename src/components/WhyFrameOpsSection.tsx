import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './WhyFrameOpsSection.css';

export const WhyFrameOpsSection: React.FC = () => {
  const { t } = useLanguage();
  const y = t.why;

  return (
    <section id="why-frame-ops" className="why-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{y.kicker}</span>
          <h2 className="section-title">{y.title}</h2>
        </div>

        <div className="why-grid">
          <div className="why-card corp-panel">
            <div className="why-icon"><Cpu size={24} /></div>
            <h3>{y.reason1.title}</h3>
            <p>{y.reason1.desc}</p>
          </div>

          <div className="why-card corp-panel">
            <div className="why-icon"><ShieldCheck size={24} /></div>
            <h3>{y.reason2.title}</h3>
            <p>{y.reason2.desc}</p>
          </div>

          <div className="why-card corp-panel">
            <div className="why-icon"><CheckCircle2 size={24} /></div>
            <h3>{y.reason3.title}</h3>
            <p>{y.reason3.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
