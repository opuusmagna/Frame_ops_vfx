import React from 'react';
import { Cpu, Network, ShieldCheck, HardDrive } from 'lucide-react';
import './CyberFrame.css';

export const CyberFrame: React.FC = () => {
  return (
    <div className="cyber-frame-wrapper">
      {/* Glow Outer Background */}
      <div className="cyber-frame-glow" />

      {/* Main Angular Masked Container */}
      <div className="cyber-frame-container">
        {/* Background Image Composition */}
        <picture>
          <source
            media="(min-width: 2560px)"
            srcSet="/images/responsive/hero_background_ultrawide_5120x1440.webp"
          />
          <source
            media="(max-width: 768px)"
            srcSet="/images/responsive/hero_background_mobile_1440x2560.webp"
          />
          <img
            src="/images/hero/02_hero_datacenter_composition_2560x1440.webp"
            alt="Frame Ops VFX Data Center & High-Performance Infrastructure"
            className="cyber-frame-img"
            loading="eager"
          />
        </picture>

        {/* Overlay Cyber Line Accents */}
        <div className="cyber-frame-overlay">
          <div className="corner-accent top-left" />
          <div className="corner-accent top-right" />
          <div className="corner-accent bottom-left" />
          <div className="corner-accent bottom-right" />

          {/* Live Status LED Badge */}
          <div className="cyber-status-badge">
            <span className="pulse-led" />
            <span className="status-text">VFX ENGINE ACTIVE</span>
          </div>

          {/* Technical Specs Footer Grid */}
          <div className="cyber-frame-specs">
            <div className="spec-item">
              <Network size={16} className="spec-icon" />
              <span>100GbE Backbone</span>
            </div>
            <div className="spec-item">
              <HardDrive size={16} className="spec-icon" />
              <span>NVMe ZFS Arrays</span>
            </div>
            <div className="spec-item">
              <Cpu size={16} className="spec-icon" />
              <span>Deadline Render</span>
            </div>
            <div className="spec-item">
              <ShieldCheck size={16} className="spec-icon" />
              <span>TPN/MPA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
