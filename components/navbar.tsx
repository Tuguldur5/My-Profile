"use client"

import { Globe, RotateCcw } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useDayNight } from "@/lib/day-night-context"
import { location } from "@/data/profile"
import { ThemeToggle } from "@/components/theme-toggle"

type Section = "home" | "about" | "skills" | "projects" | "contact"

interface NavbarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const { locale, t, toggleLocale } = useLanguage()
  const { liveTime, isManual, resetToAuto } = useDayNight()

  const navItems: { label: string; section: Section }[] = [
    { label: t.nav.home, section: "home" },
    { label: t.nav.about, section: "about" },
    { label: t.nav.skills, section: "skills" },
    { label: t.nav.projects, section: "projects" },
    { label: t.nav.contact, section: "contact" },
  ]

  return (
    <>
      {/* Utility controls stay outside the nav so they never overlap the menu. */}
      <div className="fixed right-4 top-4 z-[60] flex items-center gap-2 sm:right-6">
        {isManual ? (
          <button
            type="button"
            onClick={resetToAuto}
            className="flex items-center gap-1 rounded-full border border-foreground/20 bg-background/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            aria-label={t.dayNight.autoLabel}
            title={t.dayNight.autoLabel}
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            {t.dayNight.auto}
          </button>
        ) : null}
        {/* Exact Ulaanbaatar wall clock, independent of the theme preview. */}
        <time
          className="text-[11px] font-medium tabular-nums tracking-wider text-muted-foreground"
          aria-live="off"
          dateTime={liveTime ?? undefined}
          title={`${t.dayNight.title} (${location.timeZone})`}
        >
          {liveTime ?? "--:--"}
        </time>
        <ThemeToggle />
        <button
          type="button"
          onClick={toggleLocale}
          className="flex items-center gap-1.5 rounded-full border border-foreground/20 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          aria-label={t.a11y.toggleLanguage}
          title={t.a11y.toggleLanguage}
        >
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          {locale === "en" ? "MN" : "EN"}
        </button>
      </div>

      <header className="fixed left-0 right-0 top-0 z-50">
        <nav
          aria-label={t.a11y.mainNav}
          className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5 sm:px-6"
        >
          <ul className="hidden items-center gap-7 md:flex lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.section
              return (
                <li key={item.section}>
                  <button
                    type="button"
                    data-nav-section={item.section}
                    onClick={() => onSectionChange(item.section)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative py-1 text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

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
  const { t } = useLanguage()

  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary
          className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground [&::-webkit-details-marker]:hidden"
          aria-label={t.a11y.openMenu}
        >
          <div className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-foreground transition-transform group-open:translate-y-[3.5px] group-open:rotate-45" />
            <span className="block h-px w-5 bg-foreground transition-opacity group-open:opacity-0" />
            <span className="block h-px w-5 bg-foreground transition-transform group-open:-translate-y-[3.5px] group-open:-rotate-45" />
          </div>
        </summary>
        <div className="absolute left-1/2 top-12 w-48 -translate-x-1/2 rounded-lg border border-border bg-background p-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.section}
              type="button"
              onClick={() => {
                onSectionChange(item.section)
                const details = document.querySelector("details")
                if (details) details.open = false
              }}
              aria-current={activeSection === item.section ? "page" : undefined}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
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
