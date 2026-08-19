import React from 'react';
import {
  Cpu,
  Server,
  ShieldCheck,
  CheckCircle2,
  Network,
  HardDrive,
  Layers,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './AboutPage.css';

interface AboutPageProps {
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateContact }) => {
  const { t } = useLanguage();
  const ab = (t as any).aboutPage || {};

  return (
    <div className="about-embedded-page">
      <div className="container">
        {/* 1. HERO SECTION */}
        <section className="about-hero-section text-center">
          <span className="about-section-kicker">{ab.kicker || 'SOBRE FRAME OPS VFX'}</span>
          <h1 className="about-hero-title">{ab.title}</h1>
          <p className="about-hero-subtitle">{ab.subtitle}</p>
        </section>

        {/* 2. BIO + MANIFESTO SECTION */}
        <section className="about-bio-section">
          <div className="about-bio-grid">
            <div className="about-bio-content">
              <span className="about-section-kicker">INGENIERÍA ESPECIALIZADA</span>
              <h2 className="about-bio-heading">{ab.bioHeading}</h2>
              <p className="about-bio-text">{ab.bioText1}</p>
              <p className="about-bio-text">{ab.bioText2}</p>
            </div>

            <div className="about-manifesto-card">
              <span className="manifesto-badge">{ab.manifestoBadge}</span>
              <blockquote className="manifesto-quote">{ab.manifestoQuote}</blockquote>
              <div className="manifesto-author">
                <span className="author-name">{ab.manifestoAuthor}</span>
                <span className="author-role">{ab.manifestoRole}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE PILLARS SECTION */}
        <section className="about-pillars-section">
          <div className="text-center margin-bottom-xl">
            <span className="about-section-kicker">FUNDAMENTOS DE INGENIERÍA</span>
            <h2 className="about-section-title">{ab.pillarsTitle}</h2>
            <p className="section-subtitle max-width-md margin-auto">{ab.pillarsSubtitle}</p>
          </div>

          <div className="about-pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon">
                <Cpu size={26} />
              </div>
              <h3>{ab.pillar1Title}</h3>
              <span className="pillar-tag">{ab.pillar1Tag}</span>
              <p>{ab.pillar1Desc}</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Server size={26} />
              </div>
              <h3>{ab.pillar2Title}</h3>
              <span className="pillar-tag">{ab.pillar2Tag}</span>
              <p>{ab.pillar2Desc}</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <ShieldCheck size={26} />
              </div>
              <h3>{ab.pillar3Title}</h3>
              <span className="pillar-tag">{ab.pillar3Tag}</span>
              <p>{ab.pillar3Desc}</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <CheckCircle2 size={26} />
              </div>
              <h3>{ab.pillar4Title}</h3>
              <span className="pillar-tag">{ab.pillar4Tag}</span>
              <p>{ab.pillar4Desc}</p>
            </div>
          </div>
        </section>

        {/* 4. KEY CAPABILITIES SECTION */}
        <section className="about-milestones-section">
          <div className="text-center margin-bottom-xl">
            <span className="about-section-kicker">INFRAESTRUCTURA PROBADA</span>
            <h2 className="about-section-title">{ab.milestonesTitle}</h2>
          </div>

          <div className="about-milestones-grid">
            <div className="milestone-item">
              <div className="milestone-icon">
                <Network size={24} />
              </div>
              <div>
                <h4>{ab.milestone1Title}</h4>
                <p>{ab.milestone1Desc}</p>
              </div>
            </div>

            <div className="milestone-item">
              <div className="milestone-icon">
                <HardDrive size={24} />
              </div>
              <div>
                <h4>{ab.milestone2Title}</h4>
                <p>{ab.milestone2Desc}</p>
              </div>
            </div>

            <div className="milestone-item">
              <div className="milestone-icon">
                <Layers size={24} />
              </div>
              <div>
                <h4>{ab.milestone3Title}</h4>
                <p>{ab.milestone3Desc}</p>
              </div>
            </div>

            <div className="milestone-item">
              <div className="milestone-icon">
                <Lock size={24} />
              </div>
              <div>
                <h4>{ab.milestone4Title}</h4>
                <p>{ab.milestone4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION SECTION */}
        <section className="about-cta-section text-center">
          <h2 className="cta-heading">{ab.ctaTitle}</h2>
          <p className="cta-desc">{ab.ctaSubtitle}</p>
          <button
            type="button"
            className="btn-corporate-primary btn-hero-lg cta-btn"
            onClick={onNavigateContact}
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </section>
      </div>
    </div>
  );
};
