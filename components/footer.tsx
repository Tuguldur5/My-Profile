"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { profile } from "@/data/profile"

export function Footer() {
  const { locale, t } = useLanguage()
  // Computing the year in an effect avoids an SSR/client mismatch on New Year.
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="mt-auto border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <p className="py-6 text-center text-xs tracking-wider text-muted-foreground">
          {`\u00A9 ${year ?? ""} ${profile.displayName[locale]}. ${t.footer.rights}`}
        </p>
      </div>
    </footer>
  )
}
