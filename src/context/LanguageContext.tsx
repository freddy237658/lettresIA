import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@/data/languages'
import { readStore, writeStore } from '@/services/storage'

interface LanguageContextValue {
  language: Language
  setLanguage: (code: string) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<string>(() => readStore('language', DEFAULT_LANGUAGE.code))

  useEffect(() => {
    writeStore('language', code)
    document.documentElement.lang = code
  }, [code])

  const language = LANGUAGES.find((l) => l.code === code) ?? DEFAULT_LANGUAGE

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setCode }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
