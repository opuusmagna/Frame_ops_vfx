import React from 'react';
import { ShieldCheck, ArrowRight, Server, Cpu, Database, Network } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './Hero.css';

export const Hero: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const h = t.hero;

  const handlePrimaryClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/' : '/es/contacto/';
    navigatePath(contactPath);
  };

  const handleSecondaryClick = () => {
    const servicesPath = lang === 'en' ? '/en/services/' : '/es/servicios/';
    navigatePath(servicesPath);
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background-grid" />
      <div className="hero-overlay-gradient" />

      <div className="container hero-container">
        <div className="hero-content text-center">
          {/* Engineering Badge */}
          <div className="hero-kicker-badge">
            <ShieldCheck size={16} className="badge-icon" />
            <span>{h.kicker}</span>
          </div>

          {/* Main H1 */}
          <h1 className="hero-title">{h.title}</h1>

          {/* Subtitle */}
          <p className="hero-subtitle">{h.subtitle}</p>

          {/* Value Reinforcement */}
          <p className="hero-reinforcement">{h.reinforcement}</p>

          {/* CTAs */}
          <div className="hero-actions">
            <button
              type="button"
              className="btn-corporate-primary btn-hero-lg"
              onClick={handlePrimaryClick}
            >
              <span>{h.ctaPrimary}</span>
              <ArrowRight size={18} className="btn-icon" />
            </button>

            <button
              type="button"
              className="btn-corporate-secondary btn-hero-lg"
              onClick={handleSecondaryClick}
            >
              <span>{h.ctaSecondary}</span>
            </button>
          </div>

          {/* Technical Specs Ticker / Pillars Overview */}
          <div className="hero-tech-ticker">
            <div className="ticker-item">
              <Network size={16} />
              <span>10/25/40/100GbE Switching</span>
            </div>
            <div className="ticker-separator">•</div>
            <div className="ticker-item">
              <Database size={16} />
              <span>ZFS &amp; NVMe Storage</span>
            </div>
            <div className="ticker-separator">•</div>
            <div className="ticker-item">
              <Cpu size={16} />
              <span>Deadline Render Farms</span>
            </div>
            <div className="ticker-separator">•</div>
            <div className="ticker-item">
              <Server size={16} />
              <span>3-2-1-1 Immutable Backup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
