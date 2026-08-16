import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="master-hero">
      {/* Background Graphic Artwork with HTML5 Responsive Picture Switching */}
      <div className="hero-bg-wrapper">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="/images/responsive/hero_background_mobile_1440x2560.webp" 
          />
          <source 
            media="(max-width: 1024px)" 
            srcSet="/images/responsive/hero_background_tablet_2048x1536.webp" 
          />
          <img
            src="/images/hero/02_hero_datacenter_composition_2560x1440.webp"
            alt="Frame Ops VFX Enterprise Data Center &amp; Geometric Line Architecture"
            className="hero-master-bg"
          />
        </picture>
        <div className="hero-subtle-vignette" />
        <div className="hero-bottom-fade-mask" />
      </div>

      {/* Content Viewport Overlay Container */}
      <div className="hero-viewport-container">
        <div className="hero-text-block">
          <h1 className="hero-headline">
            <span className="headline-line1">TECHNOLOGY</span>
            <span className="headline-line2">BEHIND THE FRAME</span>
          </h1>

          <div className="hero-subclaim">INFRASTRUCTURE FOR VFX STUDIOS</div>

          <div className="hero-divider" />

          <p className="hero-paragraph">
            High-performance infrastructure solutions designed to power the most demanding VFX pipelines and creative workflows.
          </p>

          <div className="hero-cta-area">
            <a href="#solutions" className="btn-cyber-primary">
              <span>DISCOVER OUR SOLUTIONS</span>
              <ArrowRight size={18} className="arrow-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
