import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './SolutionsSection.css';

export const SolutionsSection: React.FC = () => {
  const solutions = [
    {
      id: 'boutique-studio',
      badge: '5–20 ARTIST SEATS',
      title: 'Boutique Studio Architecture',
      desc: 'Turnkey high-throughput pipeline designed for mid-sized VFX & animation facilities requiring uncompressed 4K EXR playback without massive infrastructure complexity.',
      highlights: [
        '20 TB Tier-0 NVMe local cache',
        '25GbE direct artist access',
        'Deadline render queue harvesting',
      ],
    },
    {
      id: 'enterprise-facility',
      badge: '25–100+ ARTIST SEATS',
      title: 'Enterprise Studio Infrastructure',
      desc: 'High-density datacenter architecture built for heavy Houdini FX solves, hundreds of render farm nodes, and Motion Picture Association (MPA/TPN) audit readiness.',
      highlights: [
        'High-availability scale-out ZFS/NVMe',
        '100GbE Spine-Leaf network array',
        'Air-gapped immutable backup vaults',
      ],
    },
    {
      id: 'render-burst',
      badge: 'RENDER FARM & VIRTUAL PRODUCTION',
      title: 'Render Farm & ICVFX Volume Infrastructure',
      desc: 'Specialized infrastructure engineered for real-time nDisplay LED wall volumes and massive CPU/GPU render farms managed via AWS Thinkbox Deadline.',
      highlights: [
        'PTP IEEE 1588 hardware clock sync',
        'Dual NVIDIA RTX 6000 Ada GPU nodes',
        'Automated Deadline dynamic licensing',
      ],
    },
  ];

  return (
    <section id="solutions" className="art-solutions-section section-with-bg">
      <div className="container">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">TAILORED ARCHITECTURES</span>
          <h2 className="section-title">ENGINEERED FOR YOUR STUDIO SIZE</h2>
          <p className="section-description">
            Scalable infrastructure blueprints crafted specifically for the technical demands of visual effects, post-production, and virtual production environments.
          </p>
        </div>

        {/* 3-Column Glass Card Showcase */}
        <div className="solutions-glass-grid">
          {solutions.map((item) => (
            <div key={item.id} className="corp-panel solution-strip">
              <div className="strip-badge">{item.badge}</div>
              <h3 className="strip-title">{item.title}</h3>
              <p className="strip-desc">{item.desc}</p>

              <div className="strip-highlights">
                {item.highlights.map((h, i) => (
                  <div key={i} className="highlight-row">
                    <CheckCircle2 size={16} className="highlight-icon" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn-corporate-secondary strip-cta">
                <span>VIEW ARCHITECTURE BLUEPRINT</span>
                <ArrowRight size={16} className="btn-icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
