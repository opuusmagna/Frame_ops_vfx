import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Cpu, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Lock, 
  ArrowRight
} from 'lucide-react';
import './AboutPage.css';

interface AboutPageProps {
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateContact }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="about-embedded-page">
      {/* Hero Header Section */}
      <section className="about-hero-section">
        <div className="container text-center">
          <span className="corp-badge">EXECUTIVE CTO &amp; SYSTEM ARCHITECTURE LEADERSHIP</span>
          <h1 className="about-hero-title">
            POWERING THE INFRASTRUCTURE BEHIND MAJOR FEATURE FILMS &amp; VFX PRODUCTIONS.
          </h1>
          <p className="about-hero-subtitle">
            From international blockbuster film studios to high-end VFX pipelines. We engineer the invisible technology ensuring your renders never stop and your security audits never fail.
          </p>
        </div>
      </section>

      {/* Main Narrative & Executive Bio */}
      <section className="about-bio-section">
        <div className="container">
          <div className="about-bio-grid">
            {/* Left Column: Authority Narrative */}
            <div className="about-bio-content">
              <span className="about-section-kicker">EXECUTIVE SUMMARY</span>
              <h2 className="about-bio-heading">CRITICAL PIPELINE CONTINUITY &amp; ENTERPRISE LEADERSHIP</h2>
              <p className="about-bio-text">
                In high-budget feature film and VFX production, render deadlines are non-negotiable and major studio content security is sacred. As CTO and Principal System Administrator, I have spent over a decade designing, deploying, and operating critical infrastructure powering environments where hundreds of Nuke, Houdini, Maya, and DaVinci Resolve artists work simultaneously.
              </p>
              <p className="about-bio-text">
                My track record spans from architecting complete university VFX production laboratories in Madrid to directing technical operations for demanding feature film pipelines. I possess deep, hands-on experience navigating the strict technical requirements and security audits required by major Hollywood studios and European production houses.
              </p>
            </div>

            {/* Right Column: CTO Manifesto Quote Box */}
            <div className="about-manifesto-card">
              <div className="manifesto-badge">FOUNDING PRINCIPLE</div>
              <blockquote className="manifesto-quote">
                "I firmly believe in one core principle: The best infrastructure is the one nobody notices because it simply never fails. My work is invisible so your render never stops."
              </blockquote>
              <div className="manifesto-author">
                <span className="author-name">CHIEF TECHNOLOGY OFFICER</span>
                <span className="author-role">Frame Ops VFX Infrastructure Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Strategic Value Pillars */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="art-section-header text-center">
            <span className="about-section-kicker">CORE COMPETENCIES</span>
            <h2 className="about-section-title">STRATEGIC VALUE FOR PRODUCTION HOUSES</h2>
          </div>

          <div className="about-pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon"><Zap size={24} /></div>
              <h3>Critical Pipeline Continuity</h3>
              <span className="pillar-tag">ZERO-DOWNTIME GUARANTEE</span>
              <p>
                When a pipeline stalls mid-delivery, studios lose thousands of dollars per hour. We architect redundant, fault-tolerant systems designed to eliminate single points of failure.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon"><ShieldCheck size={24} /></div>
              <h3>Bulletproof Cybersecurity &amp; TPN</h3>
              <span className="pillar-tag">MPA &amp; TPN AUDIT CERTIFIED</span>
              <p>
                Guaranteed compliance for Trusted Partner Network (TPN) and MPA security audits. Implementing Zero-Trust network isolation, server hardening, and immutable backup protection.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon"><Cpu size={24} /></div>
              <h3>Sustained Storage &amp; Render Throughput</h3>
              <span className="pillar-tag">HIGH-IOPS EXR PLAYBACK</span>
              <p>
                High-density optimization for 4K/8K OpenEXR playback (up to 2.4 GB/s per node), zero-bottleneck NVMe/ZFS caching pools, and 100% Deadline render farm queue saturation.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon"><TrendingUp size={24} /></div>
              <h3>Strategic Leadership &amp; TCO</h3>
              <span className="pillar-tag">ENTERPRISE ROI &amp; SCALING</span>
              <p>
                Direct vendor negotiations, RLM/FlexLM license optimization, and strategic technology investments focused on long-term stability, scaling, and business profitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Track Record Milestones */}
      <section className="about-milestones-section">
        <div className="container">
          <div className="art-section-header text-center">
            <span className="about-section-kicker">PROVEN TRACK RECORD</span>
            <h2 className="about-section-title">TRACK RECORD HIGHLIGHTS</h2>
          </div>

          <div className="about-milestones-grid">
            <div className="milestone-item">
              <GraduationCap size={22} className="milestone-icon" />
              <div>
                <h4>University VFX Lab Deployment</h4>
                <p>Complete architectural design and deployment of a full VFX production laboratory for a specialized university in Madrid.</p>
              </div>
            </div>

            <div className="milestone-item">
              <Award size={22} className="milestone-icon" />
              <div>
                <h4>Major Film Pipeline Leadership</h4>
                <p>End-to-end technical leadership managing critical IT infrastructure for major feature films and high-demand VFX studios.</p>
              </div>
            </div>

            <div className="milestone-item">
              <CheckCircle2 size={22} className="milestone-icon" />
              <div>
                <h4>Proactive Incident Reduction</h4>
                <p>Dramatic reduction in pipeline downtime through 24/7 proactive monitoring, automated alerting, and continuous process optimization.</p>
              </div>
            </div>

            <div className="milestone-item">
              <Lock size={22} className="milestone-icon" />
              <div>
                <h4>Endpoint &amp; TPN Standardization</h4>
                <p>Full standardization of production endpoints and storage arrays ensuring 100% successful TPN/MPA security audits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section - Clean Direct Layout */}
      <section className="about-cta-section">
        <div className="container text-center">
          <h2 className="cta-heading">READY TO ELEVATE YOUR STUDIO'S INFRASTRUCTURE?</h2>
          <p className="cta-desc">
            Consult directly with our CTO for a comprehensive bottleneck audit, infrastructure strategy, and custom CAD rack blueprint.
          </p>
          <button onClick={onNavigateContact} className="btn-cyber-primary cta-btn">
            <span>SCHEDULE AN INFRASTRUCTURE AUDIT WITH OUR CTO</span>
            <ArrowRight size={18} className="arrow-icon" />
          </button>
        </div>
      </section>
    </div>
  );
};
