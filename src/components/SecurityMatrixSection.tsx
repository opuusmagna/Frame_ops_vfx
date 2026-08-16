import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Key, 
  HardDrive, 
  Server
} from 'lucide-react';
import './SecurityMatrixSection.css';

export const SecurityMatrixSection: React.FC = () => {
  const securityPillars = [
    {
      title: 'Network Microsegmentation',
      tag: '802.1Q VLAN & ZTNA',
      desc: 'Strict 802.1Q VLAN isolation per project and client, preventing unauthorized workstation lateral movement.',
      icon: <Lock size={22} />,
    },
    {
      title: 'Zero-Trust Remote Access',
      tag: 'MFA & HARDWARE TUNNELS',
      desc: 'Encrypted ZTNA remote artist access with mandatory Hardware MFA and session watermarking controls.',
      icon: <Key size={22} />,
    },
    {
      title: 'Immutable Ransomware Vaults',
      tag: '3-2-1-1 WORM STRATEGY',
      desc: 'Immutable ZFS WORM backup snapshots and air-gapped tape targets resistant to malicious encryption.',
      icon: <HardDrive size={22} />,
    },
    {
      title: 'TPN & MPA Audit Alignment',
      tag: 'SHIELD COMPLIANCE READY',
      desc: 'Architecture pre-configured against Motion Picture Association guidelines to pass studio security audits.',
      icon: <ShieldCheck size={22} />,
    },
    {
      title: 'SIEM & Audit Logging',
      tag: 'REAL-TIME FORENSICS',
      desc: 'Centralized log aggregation and real-time security telemetry alerting on anomalous file transfer activities.',
      icon: <Eye size={22} />,
    },
    {
      title: 'Physical Rack Hardening',
      tag: 'BIOMETRIC & CABLING LOCKS',
      desc: 'Biometric rack locks, port protection covers, and physical environmental sensor integration.',
      icon: <Server size={22} />,
    },
  ];

  return (
    <section className="art-security-section section-with-bg">
      <div className="container relative-z">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">CONTENT PROTECTION</span>
          <h2 className="section-title">SECURITY & TPN COMPLIANCE MATRIX</h2>
          <p className="section-description">
            Enterprise security frameworks designed to satisfy motion picture studio audits without slowing down creative pipelines.
          </p>
        </div>

        {/* 6-Control Matrix Grid */}
        <div className="security-controls-grid">
          {securityPillars.map((item, idx) => (
            <div key={idx} className="corp-panel security-matrix-card">
              <div className="matrix-card-header">
                <div className="matrix-icon-box">{item.icon}</div>
                <span className="matrix-cat-tag">{item.tag}</span>
              </div>

              <h3 className="matrix-card-title">{item.title}</h3>
              <p className="matrix-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Security SLA Banner */}
        <div className="corp-panel security-sla-banner">
          <div className="sla-metric">
            <span className="sla-value">100% AIR-GAPPED</span>
            <span className="sla-label">Immutable LTO Tape Target Isolation</span>
          </div>

          <div className="sla-divider" />

          <div className="sla-metric">
            <span className="sla-value">SUB-0.1s ZTNA</span>
            <span className="sla-label">Hardware MFA Session Handshake</span>
          </div>

          <div className="sla-divider" />

          <div className="sla-metric">
            <span className="sla-value">MPA SHIELD READY</span>
            <span className="sla-label">Motion Picture Association Audit Compliance</span>
          </div>
        </div>
      </div>
    </section>
  );
};
