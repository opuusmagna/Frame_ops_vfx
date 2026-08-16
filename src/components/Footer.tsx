import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="art-footer">
      <div className="container">
        <div className="footer-main-content">
          {/* Brand Column */}
          <div className="footer-brand-box">
            <a href="#home" className="footer-logo-link">
              <img
                src="/images/brand/Logo_Fo.png"
                alt="Frame Ops VFX Official Logo"
                className="footer-brand-logo"
              />
            </a>
            <p className="footer-brand-desc">
              High-performance infrastructure engineering for visual effects, post-production facilities, and virtual production studios.
            </p>
          </div>

          {/* Direct Contact & Meta Box */}
          <div className="footer-info-box">
            <a href="mailto:info@frameopsvfx.com" className="footer-email-link">
              info@frameopsvfx.com
            </a>
            <div className="footer-meta-pills">
              <span className="footer-location-tag">Madrid, Spain</span>
              <span className="footer-meta-sep">•</span>
              <span className="footer-tpn-tag">TPN Aligned Architecture</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-horizontal-divider" />

        {/* Copyright Bar */}
        <div className="footer-copyright-bar">
          <p>© {new Date().getFullYear()} FRAME OPS VFX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
