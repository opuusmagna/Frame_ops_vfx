import React from 'react';
import { 
  ArrowRight,
  ShieldCheck,
  Lock
} from 'lucide-react';
import './ArchitectureFlowSection.css';

export const ArchitectureFlowSection: React.FC = () => {
  const flowSteps = [
    {
      step: '01',
      title: 'Camera Ingest',
      subtitle: '100GbE High-Velocity Staging & Checksum Verification',
    },
    {
      step: '02',
      title: 'Tier-0 NVMe Cache',
      subtitle: '2.4 GB/s Uncompressed 4K EXR Sequence Streaming',
    },
    {
      step: '03',
      title: 'ZFS Scale-Out Pool',
      subtitle: 'Multi-Petabyte Resilient Storage with RAID-Z2 Parity',
    },
    {
      step: '04',
      title: 'Deadline Render Farm',
      subtitle: '100% Compute Saturation & Dynamic Licensing',
    },
    {
      step: '05',
      title: 'LTO Tape Archive',
      subtitle: '3-2-1-1 Air-Gapped Immutable Storage',
    },
  ];

  return (
    <section className="art-flow-section section-with-bg">
      <div className="container relative-z">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">PIPELINE CIRCUIT</span>
          <h2 className="section-title">VFX DATA FLOW ARCHITECTURE</h2>
          <p className="section-description">
            How data travels seamlessly from camera ingest to NVMe cache, ZFS project pools, Deadline render nodes, and air-gapped tape backup.
          </p>
        </div>

        {/* Horizontal Circuit Nodes Grid */}
        <div className="circuit-flow-container">
          <div className="circuit-nodes-grid">
            {flowSteps.map((item, idx) => (
              <React.Fragment key={item.step}>
                <div className="circuit-node-item">
                  <div className="node-header">
                    <span className="node-number">STAGE {item.step}</span>
                    <h3 className="node-title">{item.title}</h3>
                  </div>
                  <span className="node-subtitle">{item.subtitle}</span>
                </div>

                {idx < flowSteps.length - 1 && (
                  <ArrowRight size={20} className="node-arrow-sep" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Security Umbrella Bar */}
        <div className="corp-panel flow-umbrella-bar">
          <div className="umbrella-col">
            <ShieldCheck size={26} className="umbrella-icon-cyan" />
            <div>
              <span className="umbrella-title">TPN & MOTION PICTURE SECURITY ALIGNMENT</span>
              <span className="umbrella-desc">Continuous perimeter protection, encrypted staging, and role-based ACLs across all 5 stages.</span>
            </div>
          </div>

          <div className="umbrella-divider" />

          <div className="umbrella-col">
            <Lock size={26} className="umbrella-icon-blue" />
            <div>
              <span className="umbrella-title">ZERO-TRUST AUDIT TRAIL</span>
              <span className="umbrella-desc">Immutable hardware logs tracking every camera ingest, render job payload, and tape archive write.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
