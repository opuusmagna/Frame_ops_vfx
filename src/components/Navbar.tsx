import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Layers, Cpu, ShieldCheck, Lock, Workflow, Network, HardDrive } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import type { Language } from '../context/LanguageContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { lang, t, switchLanguage, currentPath, navigatePath } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);

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

  const isEs = lang === 'es';

  const navLinks = [
    { key: 'home', label: t.nav.home, path: isEs ? '/es/' : '/en/' },
    { key: 'services', label: t.nav.services, path: isEs ? '/es/servicios/' : '/en/services/', hasDropdown: true, dropdownType: 'services' },
    { key: 'solutions', label: t.nav.solutions || (isEs ? 'SOLUCIONES' : 'SOLUTIONS'), path: isEs ? '/es/#solutions' : '/en/#solutions', hasDropdown: true, dropdownType: 'solutions' },
    { key: 'about', label: t.nav.about, path: isEs ? '/es/nosotros/' : '/en/about/' },
    { key: 'contact', label: t.nav.contact, path: isEs ? '/es/contacto/' : '/en/contact/' },
  ];

  const servicesSubItems = [
    {
      key: 'overview',
      title: t.nav.navDropdown?.allServicesTitle || (isEs ? 'Visión General de Servicios' : 'Services Overview'),
      path: isEs ? '/es/servicios/' : '/en/services/',
      icon: Layers,
    },
    {
      key: 'managed',
      title: t.nav.navDropdown?.managedServicesTitle || (isEs ? 'Servicios Gestionados B2B' : 'B2B Managed Services'),
      path: isEs ? '/es/servicios-gestionados/' : '/en/managed-services/',
      icon: Cpu,
    },
    {
      key: 'networking',
      title: isEs ? 'Redes de Alto Rendimiento' : 'High-Performance Networking',
      path: isEs ? '/es/redes-alto-rendimiento/' : '/en/high-performance-networking/',
      icon: Network,
    },
    {
      key: 'storage',
      title: isEs ? 'Almacenamiento y Datos' : 'Storage & Data Systems',
      path: isEs ? '/es/almacenamiento-datos/' : '/en/storage-data-systems/',
      icon: HardDrive,
    },
    {
      key: 'orchestration',
      title: t.nav.navDropdown?.orchestrationTitle || (isEs ? 'Orquestación VFX' : 'VFX Pipeline Orchestration'),
      path: isEs ? '/es/orquestacion-vfx/' : '/en/vfx-orchestration/',
      icon: Workflow,
    },
    {
      key: 'backup',
      title: t.nav.navDropdown?.backupDrTitle || (isEs ? 'Backup & Recuperación DR' : 'Backup & Disaster Recovery'),
      path: isEs ? '/es/backup-disaster-recovery/' : '/en/backup-disaster-recovery/',
      icon: ShieldCheck,
    },
    {
      key: 'zeroTrust',
      title: t.nav.navDropdown?.zeroTrustTitle || (isEs ? 'Seguridad Zero Trust' : 'Zero Trust Security'),
      path: isEs ? '/es/ciberseguridad-zero-trust/' : '/en/zero-trust-security/',
      icon: Lock,
    },
  ];

  const solutionsSubItems = [
    {
      key: 'overview',
      title: t.nav.solutionsDropdown?.overviewTitle || (isEs ? 'Modelos de Arquitectura' : 'Architecture Models'),
      subtitle: t.nav.solutionsDropdown?.overviewSubtitle || (isEs ? 'Visión Global de Soluciones Adaptativas' : 'Global Adaptive Solutions Overview'),
      path: isEs ? '/es/#solutions' : '/en/#solutions',
      target: 'solutions',
      icon: Layers,
    },
    {
      key: 'midTier',
      title: t.nav.solutionsDropdown?.midTierTitle || (isEs ? 'Infraestructura Mid-Tier' : 'Mid-Tier Infrastructure'),
      subtitle: t.nav.solutionsDropdown?.midTierSubtitle || (isEs ? 'Soluciones para 10 a 30 Nodos de Trabajo' : 'Solutions for 10 to 30 Workstation Nodes'),
      path: isEs ? '/es/#solutions' : '/en/#solutions',
      target: 'solutions-mid-tier',
      icon: Cpu,
    },
    {
      key: 'enterprise',
      title: t.nav.solutionsDropdown?.enterpriseTitle || (isEs ? 'Infraestructura Enterprise' : 'Enterprise Infrastructure'),
      subtitle: t.nav.solutionsDropdown?.enterpriseSubtitle || (isEs ? 'Arquitectura Multisede y Alta Disponibilidad (30+ Nodos)' : 'Multi-Site & High-Availability Architecture (30+ Nodes)'),
      path: isEs ? '/es/#solutions' : '/en/#solutions',
      target: 'solutions-enterprise',
      icon: ShieldCheck,
    },
  ];

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    setActiveDropdownKey(null);
    navigatePath(path);
  };

  const handleSolutionNavClick = (_target: string) => {
    setMobileOpen(false);
    setActiveDropdownKey(null);
    const routePath = currentPath.split('?')[0].split('#')[0];
    const cleanPath = routePath.endsWith('/') ? routePath : `${routePath}/`;
    const isHome = cleanPath === '/es/' || cleanPath === '/en/' || cleanPath === '/';

    if (isHome) {
      const el = document.getElementById('solutions');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const homePath = isEs ? '/es/#solutions' : '/en/#solutions';
      navigatePath(homePath);
      setTimeout(() => {
        const el = document.getElementById('solutions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
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
          href={isEs ? '/es/' : '/en/'}
          className="brand-logo-container" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(isEs ? '/es/' : '/en/');
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
                (item.key === 'services' && (currentPath.includes('/servicios') || currentPath.includes('/services') || currentPath.includes('/backup-disaster-recovery') || currentPath.includes('/zero-trust') || currentPath.includes('/orquestacion'))) ||
                (item.key === 'solutions' && currentPath.includes('#solutions'));
              
              if (item.hasDropdown) {
                const isServicesDropdown = item.dropdownType === 'services';
                const subItems = isServicesDropdown ? servicesSubItems : solutionsSubItems;
                const isOpen = activeDropdownKey === item.key;

                return (
                  <li 
                    key={item.key} 
                    className={`nav-item nav-item-has-dropdown ${isOpen ? 'dropdown-active' : ''}`}
                    onMouseEnter={() => setActiveDropdownKey(item.key)}
                    onMouseLeave={() => setActiveDropdownKey(null)}
                  >
                    <a
                      href={item.path}
                      className={`nav-link-text ${active ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isServicesDropdown) {
                          handleNavClick(item.path);
                        } else {
                          handleSolutionNavClick('solutions');
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} className="dropdown-caret" />
                      {active && <span className="nav-active-bar" />}
                    </a>

                    {/* Desktop Dropdown Card */}
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-grid">
                        {subItems.map((sub: any) => {
                          const IconComp = sub.icon;
                          const isSubActive = currentPath === sub.path;
                          return (
                            <a
                              key={sub.key}
                              href={sub.path}
                              className={`dropdown-sub-item ${isSubActive ? 'sub-active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                if (isServicesDropdown) {
                                  handleNavClick(sub.path);
                                } else {
                                  handleSolutionNavClick(sub.target);
                                }
                              }}
                            >
                              <div className="sub-icon-box">
                                <IconComp size={16} />
                              </div>
                              <div className="sub-text-col">
                                <span className="sub-title-text">{sub.title}</span>
                                {sub.subtitle && <span className="sub-desc-text">{sub.subtitle}</span>}
                              </div>
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
            title={isEs ? 'Switch to English' : 'Cambiar a Español'}
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
                  const isServices = item.dropdownType === 'services';
                  const isSubOpen = isServices ? mobileServicesOpen : mobileSolutionsOpen;
                  const toggleSubOpen = isServices ? setMobileServicesOpen : setMobileSolutionsOpen;
                  const subItems = isServices ? servicesSubItems : solutionsSubItems;

                  return (
                    <li key={item.key} className="mobile-menu-dropdown-item">
                      <button
                        type="button"
                        className={`mobile-link mobile-dropdown-toggle ${active ? 'active' : ''}`}
                        onClick={() => toggleSubOpen((prev) => !prev)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={18} className={`mobile-caret ${isSubOpen ? 'rotated' : ''}`} />
                      </button>

                      {isSubOpen && (
                        <div className="mobile-sub-list">
                          {subItems.map((sub: any) => (
                            <a
                              key={sub.key}
                              href={sub.path}
                              className={`mobile-sub-link ${currentPath === sub.path ? 'active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                if (isServices) {
                                  handleNavClick(sub.path);
                                } else {
                                  handleSolutionNavClick(sub.target);
                                }
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
                <span>{isEs ? 'English (EN)' : 'Español (ES)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
