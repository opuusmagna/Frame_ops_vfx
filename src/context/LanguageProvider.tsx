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
  '/es/servicios-gestionados/': '/en/managed-services/',
  '/es/nosotros/': '/en/about/',
  '/es/contacto/': '/en/contact/',
};

const routeMapEN2ES: Record<string, string> = {
  '/en/': '/es/',
  '/en': '/es/',
  '/en/services/': '/es/servicios/',
  '/en/services/backup-disaster-recovery/': '/es/servicios/backup-disaster-recovery/',
  '/en/managed-services/': '/es/servicios-gestionados/',
  '/en/about/': '/es/nosotros/',
  '/en/contact/': '/es/contacto/',
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

    let targetPath = '/es/';
    if (targetLang === 'en') {
      targetPath = routeMapES2EN[currentPath] || '/en/';
    } else {
      targetPath = routeMapEN2ES[currentPath] || '/es/';
    }

    navigatePath(targetPath);
  };

  const t = lang === 'en' ? en : es;

  return (
    <LanguageContext.Provider value={{ lang, t, switchLanguage, currentPath, navigatePath }}>
      {children}
    </LanguageContext.Provider>
  );
};
