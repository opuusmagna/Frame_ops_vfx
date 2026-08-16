import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationConfig } from '../config/navigation';
import './Navbar.css';

interface NavbarProps {
  activeView: 'home' | 'about';
  onNavigateAbout: () => void;
  onNavigateHome: () => void;
  onNavigateSection: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeView, 
  onNavigateAbout, 
  onNavigateHome,
  onNavigateSection 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'HOME' | 'SERVICES' | 'SOLUTIONS' | 'CONTACT'>('HOME');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = 
        window.scrollY || 
        window.pageYOffset || 
        document.documentElement.scrollTop || 
        document.body.scrollTop || 
        0;
      
      // Laser line & solid background activation on scroll (UNTOUCHED)
      setScrolled(scrollPos > 15);

      // High-Precision Viewport Intersection ScrollSpy
      if (activeView === 'home') {
        const viewportCenter = window.innerHeight * 0.45;

        const servicesEl = document.getElementById('services');
        const solutionsEl = document.getElementById('solutions');
        const contactEl = document.getElementById('contact');

        const isVisible = (el: HTMLElement | null) => {
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= viewportCenter && rect.bottom >= 120;
        };

        if (isVisible(contactEl)) {
          setActiveSection('CONTACT');
        } else if (isVisible(solutionsEl)) {
          setActiveSection('SOLUTIONS');
        } else if (isVisible(servicesEl)) {
          setActiveSection('SERVICES');
        } else {
          setActiveSection('HOME');
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeView]);

  const handleNavClick = (label: string, href: string) => {
    setMobileOpen(false);

    if (label === 'ABOUT') {
      onNavigateAbout();
      return;
    }

    if (label === 'HOME') {
      setActiveSection('HOME');
      onNavigateHome();
      return;
    }

    // For SERVICES, SOLUTIONS, CONTACT
    setActiveSection(label as any);
    onNavigateSection(href);
  };

  return (
    <header className={`master-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Official Brand Logo */}
        <a 
          href="#home" 
          className="brand-logo-container" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('HOME', '#home');
          }}
        >
          <img
            src="/images/brand/Logo_Solo.png"
            alt="Frame Ops VFX Official Logo"
            className="brand-logo-img dark-mode-logo"
          />
        </a>

        {/* Desktop Nav Items */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-items-list">
            {navigationConfig.items.map((item) => {
              let active = false;
              if (item.label === 'ABOUT') {
                active = activeView === 'about';
              } else if (activeView === 'home') {
                active = activeSection === item.label;
              }

              return (
                <li key={item.label} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link-text ${active ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.label, item.href);
                    }}
                  >
                    {item.label}
                    {active && <span className="nav-active-bar" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-hamburger"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-box" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">NAVIGATION</span>
              <button className="mobile-close-btn" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <ul className="mobile-menu-list">
              {navigationConfig.items.map((item) => {
                let active = false;
                if (item.label === 'ABOUT') {
                  active = activeView === 'about';
                } else if (activeView === 'home') {
                  active = activeSection === item.label;
                }

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`mobile-link ${active ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.label, item.href);
                      }}
                    >
                      <span>{item.label}</span>
                      {active && <span className="mobile-active-dot" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
