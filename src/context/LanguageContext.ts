import { createContext } from 'react';
import { es } from '../config/translations/es';

export type Language = 'es' | 'en';
export type TranslationKeys = typeof es;

export interface LanguageContextType {
  lang: Language;
  t: TranslationKeys;
  switchLanguage: (targetLang: Language) => void;
  currentPath: string;
  navigatePath: (path: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
