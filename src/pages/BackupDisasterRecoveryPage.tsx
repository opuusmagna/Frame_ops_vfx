import React from 'react';
import { Database, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Server, Cloud, HardDrive, FileText } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './BackupDisasterRecoveryPage.css';

export const BackupDisasterRecoveryPage: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const b = t.backupDrPage;

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=backup-disaster-recovery' : '/es/contacto/?service=backup-disaster-recovery';
    navigatePath(contactPath);
  };

  return (
    <div className="backup-dr-page page-with-top-padding">
      <div className="container">
        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">{b.kicker}</span>
          <h1 className="page-title">{b.title}</h1>
          <p className="page-subtitle">{b.subtitle}</p>
        </header>

        {/* Process Section */}
        <section className="bdr-section corp-panel">
          <h2 className="bdr-section-title">{b.scopeTitle}</h2>
          <div className="process-grid">
            <div className="process-step">
              <span className="step-num">01</span>
              <p>{b.step1}</p>
            </div>
            <div className="process-step">
              <span className="step-num">02</span>
              <p>{b.step2}</p>
            </div>
            <div className="process-step">
              <span className="step-num">03</span>
              <p>{b.step3}</p>
            </div>
            <div className="process-step">
              <span className="step-num">04</span>
              <p>{b.step4}</p>
            </div>
          </div>
        </section>

        {/* 3-2-1-1 Strategy Breakdown */}
        <section className="bdr-section">
          <div className="text-center margin-bottom-lg">
            <h2 className="section-title">{b.strategyTitle}</h2>
          </div>
          <div className="strategy-grid">
            <div className="strategy-card corp-panel">
              <div className="card-icon"><Database size={28} /></div>
              <h3>3 COPIAS</h3>
              <p>{b.item3}</p>
            </div>
            <div className="strategy-card corp-panel">
              <div className="card-icon"><HardDrive size={28} /></div>
              <h3>2 SOPORTES</h3>
              <p>{b.item2}</p>
            </div>
            <div className="strategy-card corp-panel">
              <div className="card-icon"><Cloud size={28} /></div>
              <h3>1 OFF-SITE</h3>
              <p>{b.item1}</p>
            </div>
            <div className="strategy-card corp-panel highlight-card">
              <div className="card-icon"><ShieldCheck size={28} /></div>
              <h3>1 INMUTABLE</h3>
              <p>{b.item1Immutable}</p>
            </div>
          </div>
        </section>

        {/* Technical Caveats & Rigor */}
        <section className="bdr-section caveats-box corp-panel">
          <div className="caveats-header">
            <AlertTriangle size={24} className="caveat-icon" />
            <h2>{b.caveatsTitle}</h2>
          </div>
          <ul className="caveats-list">
            <li><CheckCircle2 size={18} /> <span>{b.c1}</span></li>
            <li><CheckCircle2 size={18} /> <span>{b.c2}</span></li>
            <li><CheckCircle2 size={18} /> <span>{b.c3}</span></li>
            <li><CheckCircle2 size={18} /> <span>{b.c4}</span></li>
            <li><CheckCircle2 size={18} /> <span>{b.c5}</span></li>
          </ul>
        </section>

        {/* Responsibility Matrix */}
        <section className="bdr-section corp-panel">
          <h2 className="bdr-section-title">{b.respTitle}</h2>
          <div className="resp-grid">
            <div className="resp-card">
              <div className="resp-header">
                <FileText size={20} />
                <h3>Cliente</h3>
              </div>
              <p>{b.respClient}</p>
            </div>
            <div className="resp-card highlight-resp">
              <div className="resp-header">
                <Server size={20} />
                <h3>Frame Ops VFX</h3>
              </div>
              <p>{b.respFrameOps}</p>
            </div>
          </div>
        </section>

        {/* Contextual CTA */}
        <div className="text-center margin-top-xl">
          <button type="button" className="btn-corporate-primary btn-hero-lg" onClick={handleCtaClick}>
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
