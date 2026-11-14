"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { translations, type Locale, type Translations } from "./translations"

const STORAGE_KEY = "tuguldur-locale"

interface LanguageContextType {
  locale: Locale
  t: Translations
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start in English so the SSR markup and the first client render match.
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "en" || stored === "mn") setLocale(stored)
    } catch {
      // Storage can be blocked (private mode); English remains the default.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === "mn" ? "mn" : "en"
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // Ignore storage failures.
    }
  }, [locale])

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "mn" : "en"))
  }, [])

  const t = translations[locale]

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
