"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

type Section = "home" | "about" | "skills" | "projects" | "contact"

interface NavbarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const { locale, t, toggleLocale } = useLanguage()

  const navItems: { label: string; section: Section }[] = [
    { label: t.nav.home, section: "home" },
    { label: t.nav.about, section: "about" },
    { label: t.nav.skills, section: "skills" },
    // { label: t.nav.projects, section: "projects" },
    { label: t.nav.contact, section: "contact" },
  ]

  return (
    <>
      {/* Language toggle - positioned outside background, top-right */}
      <div className="fixed top-4 right-6 z-[60]">
        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          aria-label="Toggle language"
        >
          <Globe className="h-3.5 w-3.5" />
          {locale === "en" ? "MN" : "EN"}
        </button>
      </div>

      {/* Navbar - only menu items, centered */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="mx-auto flex max-w-6xl items-center justify-center px-6 py-5">
          {/* Desktop menu - centered */}
          <ul className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <li key={item.section}>
                <button
                  data-nav-section={item.section}
                  onClick={() => onSectionChange(item.section)}
                  className={`group relative py-1 text-sm font-medium tracking-wide transition-colors ${
                    activeSection === item.section
                      ? "text-primary-foreground"
                      : "text-primary-foreground/60 hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-primary-foreground transition-all duration-300 ${
                      activeSection === item.section
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile menu */}
          <MobileMenu
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            navItems={navItems}
          />
        </nav>
      </header>
    </>
  )
}

function MobileMenu({
  activeSection,
  onSectionChange,
  navItems,
}: NavbarProps & { navItems: { label: string; section: Section }[] }) {
  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center">
          <div className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-primary-foreground transition-transform group-open:translate-y-[3.5px] group-open:rotate-45" />
            <span className="block h-px w-5 bg-primary-foreground transition-opacity group-open:opacity-0" />
            <span className="block h-px w-5 bg-primary-foreground transition-transform group-open:-translate-y-[3.5px] group-open:-rotate-45" />
          </div>
        </summary>
        <div className="absolute left-1/2 -translate-x-1/2 top-12 w-48 rounded-lg border border-border bg-background p-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                onSectionChange(item.section)
                const details = document.querySelector("details")
                if (details) details.open = false
              }}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeSection === item.section
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </details>
    </div>
  )
}
