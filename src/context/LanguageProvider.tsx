import React, { useState, useEffect } from 'react';
import { es } from '../config/translations/es';
import { en } from '../config/translations/en';
import { LanguageContext } from './LanguageContext';
import type { Language } from './LanguageContext';

const routeMapES2EN: Record<string, string> = {
  '/es/': '/en/',
  '/es': '/en/',
  '/es/servicios/': '/en/services/',
  '/es/servicios/backup-disaster-recovery/': '/en/services/backup-disaster-recovery/',
  '/es/backup-disaster-recovery/': '/en/backup-disaster-recovery/',
  '/es/servicios-gestionados/': '/en/managed-services/',
  '/es/ciberseguridad-zero-trust/': '/en/zero-trust-security/',
  '/es/seguridad-zero-trust/': '/en/zero-trust-security/',
  '/es/orquestacion-vfx/': '/en/vfx-orchestration/',
  '/es/nosotros/': '/en/about/',
  '/es/contacto/': '/en/contact/',
  '/es/privacidad/': '/en/privacy/',
  '/es/terminos/': '/en/terms/',
};

const routeMapEN2ES: Record<string, string> = {
  '/en/': '/es/',
  '/en': '/es/',
  '/en/services/': '/es/servicios/',
  '/en/services/backup-disaster-recovery/': '/es/servicios/backup-disaster-recovery/',
  '/en/backup-disaster-recovery/': '/es/backup-disaster-recovery/',
  '/en/managed-services/': '/es/servicios-gestionados/',
  '/en/zero-trust-security/': '/es/ciberseguridad-zero-trust/',
  '/en/vfx-orchestration/': '/es/orquestacion-vfx/',
  '/en/about/': '/es/nosotros/',
  '/en/contact/': '/es/contacto/',
  '/en/privacy/': '/es/privacidad/',
  '/en/terms/': '/es/terminos/',
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/es/';
    }
    return '/es/';
  });

  const getLanguageFromPath = (path: string): Language => {
    if (path.startsWith('/en')) {
      return 'en';
    }
    return 'es';
  };

  const [lang, setLang] = useState<Language>(() => getLanguageFromPath(currentPath));

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/es/';
      setCurrentPath(path);
      setLang(getLanguageFromPath(path));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigatePath = (newPath: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', newPath);
      setCurrentPath(newPath);
      setLang(getLanguageFromPath(newPath));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const switchLanguage = (targetLang: Language) => {
    if (targetLang === lang) return;

    // Capture current vertical scroll position before changing language
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const routePath = currentPath.split('?')[0].split('#')[0];
    const cleanPath = routePath.endsWith('/') ? routePath : `${routePath}/`;

    let targetPath = targetLang === 'en' ? '/en/' : '/es/';
    if (targetLang === 'en') {
      targetPath = routeMapES2EN[cleanPath] || routeMapES2EN[currentPath] || '/en/';
    } else {
      targetPath = routeMapEN2ES[cleanPath] || routeMapEN2ES[currentPath] || '/es/';
    }

    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', targetPath);
      setCurrentPath(targetPath);
      setLang(targetLang);

      // Restore exact scroll position seamlessly
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
      });
    }
  };

  const t = lang === 'en' ? en : es;

  return (
    <LanguageContext.Provider value={{ lang, t, switchLanguage, currentPath, navigatePath }}>
      {children}
    </LanguageContext.Provider>
  );
};
