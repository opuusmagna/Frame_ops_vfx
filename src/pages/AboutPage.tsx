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
            POWERING THE INFRASTRUCTURE BEHIND MAJOR FEATURE FILMS &amp; VFX PRODUCTIONS
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
                Frame Ops VFX was born from a fundamental industry need: visual effects and post-production studios require specialized infrastructure engineering built around high-throughput EXR playback, zero-frame-drop storage, and TPN security compliance — not generic enterprise IT templates.
              </p>
              
              <div className="about-highlights-list">
                <div className="highlight-item">
                  <CheckCircle2 size={20} className="highlight-icon" />
                  <span>10+ Years Dedicated VFX Infrastructure Architecture &amp; System Administration</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={20} className="highlight-icon" />
                  <span>Proven Track Record in High-IOPS ZFS &amp; NVMe Storage Cluster Deployments</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={20} className="highlight-icon" />
                  <span>TPN (Trusted Partner Network) &amp; MPA Content Security Audit Mastery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Metrics & Leadership Philosophy */}
            <div className="about-manifesto-card">
              <h3 className="manifesto-title">LEADERSHIP PHILOSOPHY</h3>
              <blockquote className="manifesto-quote">
                &ldquo;VFX infrastructure is not just hardware in a rack. It is the backbone of creative delivery. When an artist hits play or a farm node bursts, performance must be instant, reliable, and unyielding.&rdquo;
              </blockquote>
              
              <div className="manifesto-stats-grid">
                <div className="stat-box">
                  <span className="stat-value">99.99%</span>
                  <span className="stat-label">Pipeline Uptime</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">100GbE</span>
                  <span className="stat-label">Backbone Fabrics</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">Zero</span>
                  <span className="stat-label">Dropped Frames</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">100%</span>
                  <span className="stat-label">TPN Audit Pass</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise Pillars Section */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="art-section-header text-center">
            <span className="section-kicker">CORE COMPETENCIES</span>
            <h2 className="about-section-title">ENGINEERING EXCELLENCE FOR PRODUCTION</h2>
            <p className="section-description">
              Our technical domain spans high-throughput storage, high-density render compute, and perimeter security.
            </p>
          </div>

          <div className="about-pillars-grid">
            <div className="pillar-card">
              <Zap size={28} className="pillar-icon" />
              <h3>High-IOPS Storage Architecture</h3>
              <p>Designing scale-out ZFS and NVMe caching pools capable of sustaining multi-user 4K/8K uncompressed EXR sequence playback without I/O degradation.</p>
            </div>

            <div className="pillar-card">
              <Cpu size={28} className="pillar-icon" />
              <h3>Render Farm &amp; Queue Management</h3>
              <p>Architecting Deadline render pools, GPU bursting nodes, dynamic license management, and automated queue scheduling for peak production bursts.</p>
            </div>

            <div className="pillar-card">
              <ShieldCheck size={28} className="pillar-icon" />
              <h3>TPN Security &amp; Compliance</h3>
              <p>Implementing zero-trust network isolation, air-gapped immutable backups, multi-factor authentication, and strict MPA security audit readiness.</p>
            </div>

            <div className="pillar-card">
              <TrendingUp size={28} className="pillar-icon" />
              <h3>Infrastructure Lifecycle &amp; TCO</h3>
              <p>Strategic CAPEX/OPEX planning, hardware lifespan optimization, vendor-neutral procurement, and continuous 24/7 telemetry monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Milestones & Track Record Section */}
      <section className="about-milestones-section">
        <div className="container">
          <div className="art-section-header text-center">
            <span className="section-kicker">TRACK RECORD</span>
            <h2 className="about-section-title">ENGINEERING MILESTONES</h2>
          </div>

          <div className="about-milestones-grid">
            <div className="milestone-item">
              <Award size={22} className="milestone-icon" />
              <div>
                <h4>Multi-Petabyte NVMe/ZFS Deployments</h4>
                <p>Designed and deployed high-performance ZFS storage clusters handling heavy multi-user composite render workloads for feature films.</p>
              </div>
            </div>

            <div className="milestone-item">
              <GraduationCap size={22} className="milestone-icon" />
              <div>
                <h4>High-Density Render Farms</h4>
                <p>Architected scalable Deadline render farms with automated GPU/CPU allocation, achieving maximum node saturation and license efficiency.</p>
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
            Consult directly with our CTO for a comprehensive bottleneck audit, high-availability pipeline strategy, and custom server rack architecture.
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
