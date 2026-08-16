import React from 'react';
import { 
  ArrowUpRight
} from 'lucide-react';
import './SolutionsSection.css';

export const SolutionsSection: React.FC = () => {
  const solutionsData = [
    {
      id: 'boutique-studio',
      badge: '5–25 ARTIST SEATS',
      title: 'Boutique Studio Architecture',
      desc: 'Engineered for small-to-mid facilities that require smooth 4K playback for comp and 3D animation without enterprise datacenter complexity.',
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
    <section className="art-solutions-section section-with-bg">
      <div className="container relative-z">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">ENGINEERED ARCHITECTURES</span>
          <h2 className="section-title">SOLUTIONS BY STUDIO STAGE</h2>
          <p className="section-description">
            Tailored infrastructure blueprints built for post-production facilities, boutique VFX shops, and enterprise render farms.
          </p>
        </div>

        {/* 3-Column Solutions Glass Grid */}
        <div className="solutions-glass-grid">
          {solutionsData.map((sol) => (
            <a key={sol.id} href="#contact" className="corp-panel solution-strip">
              <div>
                <div className="strip-top">
                  <span className="strip-tag">{sol.badge}</span>
                  <ArrowUpRight size={20} className="strip-action" />
                </div>

                <h3 className="strip-title">{sol.title}</h3>
                <p className="strip-summary">{sol.desc}</p>
              </div>

              <div className="strip-highlights">
                {sol.highlights.map((item, idx) => (
                  <span key={idx} className="strip-badge">{item}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
