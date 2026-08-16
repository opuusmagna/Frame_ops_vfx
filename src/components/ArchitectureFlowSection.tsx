import React from 'react';
import { useLanguage } from '../context/useLanguage';
import './ArchitectureFlowSection.css';

export const ArchitectureFlowSection: React.FC = () => {
  const { t } = useLanguage();
  const a = t.architecture;

  return (
    <section id="architecture" className="architecture-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{a.kicker}</span>
          <h2 className="section-title">{a.title}</h2>
          <p className="section-subtitle">{a.desc}</p>
        </div>

        <div className="architecture-diagram-container corp-panel text-center">
          <img
            src="/images/brand/Logo_Solo.png"
            alt="Frame Ops VFX Architecture Blueprint"
            style={{ maxHeight: '180px', margin: '1rem auto', filter: 'brightness(1.2)' }}
          />
          <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
            [WORKSTATIONS &amp; EDITORIAL] ── 10/25/100GbE SWITCHING ── [NVMe / ZFS STORAGE] ── [DEADLINE RENDER FARM] ── [LTO &amp; CLOUD BACKUP]
          </p>
        </div>
      </div>
    </section>
  );
};
