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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = 
        window.scrollY || 
        window.pageYOffset || 
        document.documentElement.scrollTop || 
        document.body.scrollTop || 
        0;
        
      if (scrollPos > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setMobileOpen(false);

    if (label === 'ABOUT') {
      onNavigateAbout();
      return;
    }

    if (label === 'HOME') {
      onNavigateHome();
      return;
    }

    // For SOLUTIONS, SERVICES, CONTACT
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
              const active = item.label === 'ABOUT' ? activeView === 'about' : (activeView === 'home' && item.label === 'HOME');
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
            <ul className="mobile-menu-list">
              {navigationConfig.items.map((item) => {
                const active = item.label === 'ABOUT' ? activeView === 'about' : (activeView === 'home' && item.label === 'HOME');
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
                      {item.label}
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
