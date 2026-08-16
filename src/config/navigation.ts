export interface NavItem {
  label: string;
  href: string;
}

export const navigationConfig = {
  items: [
    { label: 'HOME', href: '#home' },
    { label: 'SERVICES', href: '#services' },
    { label: 'SOLUTIONS', href: '#solutions' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ] as NavItem[],
  
  // Rule #8: Only show language selector if both languages are fully implemented.
  showLanguageSelector: false,
  availableLanguages: [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ],
  currentLanguage: 'en',
};
