import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import type { Language } from '../context/LanguageContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { lang, t, switchLanguage, currentPath, navigatePath } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(scrollPos > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { key: 'home', label: t.nav.home, path: lang === 'en' ? '/en/' : '/es/' },
    { key: 'services', label: t.nav.services, path: lang === 'en' ? '/en/services/' : '/es/servicios/', hasDropdown: true },
    { key: 'about', label: t.nav.about, path: lang === 'en' ? '/en/about/' : '/es/nosotros/' },
    { key: 'contact', label: t.nav.contact, path: lang === 'en' ? '/en/contact/' : '/es/contacto/' },
  ];

  const servicesSubItems = [
    {
      key: 'overview',
      title: t.nav.navDropdown?.allServicesTitle || (lang === 'en' ? 'Services Overview' : 'Visión General de Servicios'),
      path: lang === 'en' ? '/en/services/' : '/es/servicios/',
      icon: Layers,
    },
    {
      key: 'managed',
      title: t.nav.navDropdown?.managedServicesTitle || (lang === 'en' ? 'B2B Managed Services' : 'Servicios Gestionados B2B'),
      path: lang === 'en' ? '/en/managed-services/' : '/es/servicios-gestionados/',
      icon: Cpu,
    },
    {
      key: 'backup',
      title: t.nav.navDropdown?.backupDrTitle || (lang === 'en' ? 'Backup & Disaster Recovery' : 'Backup & Recuperación DR'),
      path: lang === 'en' ? '/en/backup-disaster-recovery/' : '/es/backup-disaster-recovery/',
      icon: ShieldCheck,
    },
  ];

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    navigatePath(path);
  };

  const handleToggleLanguage = () => {
    const nextLang: Language = lang === 'es' ? 'en' : 'es';
    switchLanguage(nextLang);
  };

  return (
    <header className={`master-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Official Brand Logo */}
        <a 
          href={lang === 'en' ? '/en/' : '/es/'}
          className="brand-logo-container" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(lang === 'en' ? '/en/' : '/es/');
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
            {navLinks.map((item) => {
              const active = currentPath === item.path || 
                (item.key === 'home' && (currentPath === '/es/' || currentPath === '/en/')) ||
                (item.key === 'services' && (currentPath.includes('/servicios') || currentPath.includes('/services') || currentPath.includes('/backup-disaster-recovery')));
              
              if (item.hasDropdown) {
                return (
                  <li key={item.key} className="nav-item nav-item-has-dropdown">
                    <a
                      href={item.path}
                      className={`nav-link-text ${active ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.path);
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} className="dropdown-caret" />
                      {active && <span className="nav-active-bar" />}
                    </a>

                    {/* Desktop Dropdown Card */}
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-grid">
                        {servicesSubItems.map((sub) => {
                          const IconComp = sub.icon;
                          const isSubActive = currentPath === sub.path;
                          return (
                            <a
                              key={sub.key}
                              href={sub.path}
                              className={`dropdown-sub-item ${isSubActive ? 'sub-active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(sub.path);
                              }}
                            >
                              <div className="sub-icon-box">
                                <IconComp size={16} />
                              </div>
                              <span className="sub-title-text">{sub.title}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.key} className="nav-item">
                  <a
                    href={item.path}
                    className={`nav-link-text ${active ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path);
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

        {/* Language Selector & Actions */}
        <div className="navbar-actions">
          <button 
            type="button"
            className="lang-switcher-btn"
            onClick={handleToggleLanguage}
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            aria-label="Switch Language"
          >
            <Globe size={16} />
            <span className="lang-code">{lang.toUpperCase()}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
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
              {navLinks.map((item) => {
                const active = currentPath === item.path;
                if (item.hasDropdown) {
                  return (
                    <li key={item.key} className="mobile-menu-dropdown-item">
                      <button
                        type="button"
                        className={`mobile-link mobile-dropdown-toggle ${active ? 'active' : ''}`}
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={18} className={`mobile-caret ${mobileServicesOpen ? 'rotated' : ''}`} />
                      </button>

                      {mobileServicesOpen && (
                        <div className="mobile-sub-list">
                          {servicesSubItems.map((sub) => (
                            <a
                              key={sub.key}
                              href={sub.path}
                              className={`mobile-sub-link ${currentPath === sub.path ? 'active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(sub.path);
                              }}
                            >
                              <span>{sub.title}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.key}>
                    <a
                      href={item.path}
                      className={`mobile-link ${active ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.path);
                      }}
                    >
                      <span>{item.label}</span>
                      {active && <span className="mobile-active-dot" />}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-lang-footer">
              <button type="button" className="btn-mobile-lang" onClick={handleToggleLanguage}>
                <Globe size={18} />
                <span>{lang === 'es' ? 'English (EN)' : 'Español (ES)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
