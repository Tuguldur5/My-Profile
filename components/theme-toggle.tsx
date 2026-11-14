"use client"

import { Moon, Sun } from "lucide-react"
import { useDayNight } from "@/lib/day-night-context"
import { useLanguage } from "@/lib/language-context"

/** Compact day/night toggle so the theme can be changed from any section. */
export function ThemeToggle() {
  const { isDay, toggleDayNight } = useDayNight()
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleDayNight}
      aria-pressed={isDay}
      aria-label={t.dayNight.toggleLabel}
      title={t.dayNight.toggleLabel}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {isDay ? (
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </button>
  )
}
