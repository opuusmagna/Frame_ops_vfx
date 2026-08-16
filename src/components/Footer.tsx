import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="art-footer">
      <div className="container">
        <div className="footer-slim-row">
          {/* Brand Logo & Description - Logo_Solo.png */}
          <div className="footer-brand-side">
            <a href="#home" className="footer-logo-link">
              <img
                src="/images/brand/Logo_Solo.png"
                alt="Frame Ops VFX Official Logo"
                className="footer-logo-img dark-mode-logo"
              />
            </a>
            <span className="footer-tagline">
              High-Performance Infrastructure Engineering for VFX Studios & Facilities
            </span>
          </div>

          {/* Contact Info & Compliance */}
          <div className="footer-contact-side">
            <a href="mailto:info@frameopsvfx.com" className="footer-contact-email">
              info@frameopsvfx.com
            </a>
            <div className="footer-meta-info">
              <span>Madrid, Spain</span>
              <span className="meta-dot">•</span>
              <span className="tpn-pill">TPN Aligned Architecture</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} FRAME OPS VFX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
