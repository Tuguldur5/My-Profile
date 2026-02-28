"use client"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-auto bg-black">
      <div className="mx-auto max-w-6xl px-6 ">
        <div className="border-t border-background/20" />
        <p className="py-6 text-center text-xs tracking-wider text-white">
          {`\u00A9 ${new Date().getFullYear()} Tuguldur. ${t.footer.rights}`}
        </p>
      </div>
    </footer>
  )
}
