import { createContext } from 'react'

export type Language = 'ar' | 'en'
export type TranslationValues = Record<string, string | number>

export type LanguageContextValue = {
  language: Language
  direction: 'rtl' | 'ltr'
  setLanguage: (language: Language) => void
  t: (text: string, values?: TranslationValues) => string
}

export const LANGUAGE_KEY = 'koven.language'
export const LanguageContext = createContext<LanguageContextValue | null>(null)
