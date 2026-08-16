import React from 'react';
import './WhyFrameOpsSection.css';

export const WhyFrameOpsSection: React.FC = () => {
  const whyPillars = [
    {
      num: '01',
      progressWidth: '25%',
      title: 'VFX-Specific Engineering',
      desc: 'We speak Nuke, Deadline, ZFS, OpenEXR, and 100GbE. Our architecture comes from real production experience, not generic IT templates.',
    },
    {
      num: '02',
      progressWidth: '50%',
      title: 'Performance + Security',
      desc: 'Maximum IOPS and throughput for artists and render nodes without compromising network microsegmentation, MFA, or TPN/MPA compliance.',
    },
    {
      num: '03',
      progressWidth: '75%',
      title: 'Vendor-Neutral Architecture',
      desc: 'We select software, switching hardware, and storage engines based on performance, reliability, and TCO — avoiding vendor lock-in.',
    },
    {
      num: '04',
      progressWidth: '100%',
      title: 'End-to-End Implementation',
      desc: 'From initial bottleneck audit and custom server rack architecture to cabling, deployment, staff handoff, and ongoing support.',
    },
  ];

  return (
    <section id="why" className="art-why-section section-with-bg">
      <div className="container">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">OUR DIFFERENTIAL</span>
          <h2 className="section-title">WHY FRAME OPS VFX</h2>
          <p className="section-description">
            A specialized engineering partner dedicated exclusively to empowering post-production facilities and VFX studios with bulletproof tech.
          </p>
        </div>

        {/* 4-Pillar Grid with Progressive Charging Lines */}
        <div className="why-grid-layout">
          {whyPillars.map((pillar) => (
            <div key={pillar.num} className="corp-panel why-card-item">
              <span className="why-number">{pillar.num}</span>
              <h3 className="why-card-title">{pillar.title}</h3>

              {/* Progressive Charging Blue Line */}
              <div className="why-line-container">
                <div 
                  className="why-line-fill" 
                  style={{ width: pillar.progressWidth }} 
                />
              </div>

              <p className="why-card-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
