"use client"

import { User } from "lucide-react"

type Section = "home" | "about" | "skills" | "projects" | "contact"

const navItems: { label: string; section: Section }[] = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Skills", section: "skills" },
  { label: "Projects", section: "projects" },
  { label: "Contact", section: "contact" },
]

interface NavbarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => onSectionChange("home")}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          aria-label="Go to home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground">
            <User className="h-4 w-4 text-foreground" />
          </div>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => onSectionChange(item.section)}
                className="group relative py-1 text-sm font-medium tracking-wide text-foreground transition-colors hover:text-muted-foreground"
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ${
                    activeSection === item.section ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <MobileMenu activeSection={activeSection} onSectionChange={onSectionChange} />
      </nav>
    </header>
  )
}

function MobileMenu({ activeSection, onSectionChange }: NavbarProps) {
  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center">
          <div className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-foreground transition-transform group-open:translate-y-[3.5px] group-open:rotate-45" />
            <span className="block h-px w-5 bg-foreground transition-opacity group-open:opacity-0" />
            <span className="block h-px w-5 bg-foreground transition-transform group-open:-translate-y-[3.5px] group-open:-rotate-45" />
          </div>
        </summary>
        <div className="absolute right-0 top-12 w-48 rounded-lg border border-border bg-background p-2 shadow-lg">
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
