import React from 'react';
import { Network, Cpu, Database } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './WorkloadIntelligenceSection.css';

export const WorkloadIntelligenceSection: React.FC = () => {
  const { t } = useLanguage();
  const w = t.workload;

  return (
    <section id="workload" className="workload-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{w.kicker}</span>
          <h2 className="section-title">{w.title}</h2>
          <p className="section-subtitle">{w.subtitle}</p>
        </div>

        <div className="workload-cards-grid">
          <div className="workload-card corp-panel">
            <div className="card-icon"><Network size={26} /></div>
            <h3>{w.card1.title}</h3>
            <p>{w.card1.desc}</p>
          </div>
          <div className="workload-card corp-panel">
            <div className="card-icon"><Cpu size={26} /></div>
            <h3>{w.card2.title}</h3>
            <p>{w.card2.desc}</p>
          </div>
          <div className="workload-card corp-panel">
            <div className="card-icon"><Database size={26} /></div>
            <h3>{w.card3.title}</h3>
            <p>{w.card3.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
