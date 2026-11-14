"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { location } from "@/data/profile"
import { formatClock, getSunTimes, isSunUp } from "@/lib/sun"

/** Fallback daylight window, only used if the solar calculation fails. */
const FALLBACK_DAY_START = 7
const FALLBACK_DAY_END = 19

interface ClockState {
  /** Fractional hour (0–24) in the profile timezone. */
  liveHour: number
  /** HH:MM in the profile timezone. Never affected by the theme toggle. */
  liveTime: string
  sunriseTime: string
  sunsetTime: string
  isSunUp: boolean
  /** Local calendar day, so sunrise/sunset refresh after midnight. */
  dateKey: string
}

interface DayNightContextValue {
  /** Hour used by the 3D scene lighting. */
  hour: number
  liveHour: number | null
  /** Exact local time at the profile location, null until hydration. */
  liveTime: string | null
  sunriseTime: string | null
  sunsetTime: string | null
  /** Auto (sun-based) daylight state. */
  sunIsUp: boolean | null
  /** True when the visitor has overridden the automatic theme. */
  isManual: boolean
  /** Effective theme. */
  isDay: boolean
  toggleDayNight: () => void
  resetToAuto: () => void
}

const DayNightContext = createContext<DayNightContextValue | null>(null)

function readClock(now: Date): ClockState {
  const time: string = formatClock(now, location.timeZone)
  const [hourPart, minutePart] = time.split(":")
  const liveHour = Number(hourPart) + Number(minutePart) / 60

  const sun = getSunTimes(now, location.latitude, location.longitude)
  const fallbackDay = liveHour >= FALLBACK_DAY_START && liveHour < FALLBACK_DAY_END

  return {
    liveHour,
    liveTime: time,
    sunriseTime: sun ? formatClock(sun.sunrise, location.timeZone) : "07:00",
    sunsetTime: sun ? formatClock(sun.sunset, location.timeZone) : "19:00",
    isSunUp: sun ? isSunUp(now, sun) : fallbackDay,
    dateKey: new Intl.DateTimeFormat("en-CA", {
      timeZone: location.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now),
  }
}

export function DayNightProvider({ children }: { children: ReactNode }) {
  const [clock, setClock] = useState<ClockState | null>(null)
  // null = follow the real sun; otherwise a manual preview.
  const [manualTheme, setManualTheme] = useState<"day" | "night" | null>(null)

  useEffect(() => {
    // The clock is only read on the client, so SSR markup stays deterministic.
    // Poll every second but only re-render when the displayed minute changes.
    const tick = () => {
      setClock((prev) => {
        const next = readClock(new Date())
        if (prev && prev.liveTime === next.liveTime && prev.dateKey === next.dateKey) {
          return prev
        }
        return next
      })
    }

    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const sunIsUp = clock?.isSunUp ?? null
  const isDay = manualTheme ? manualTheme === "day" : sunIsUp ?? false
  const hour = manualTheme ? (manualTheme === "day" ? 12 : 23) : clock?.liveHour ?? 23

  // Keep the CSS theme tokens and the native color-scheme in sync.
  useEffect(() => {
    const root = document.documentElement
    const theme = isDay ? "light" : "dark"
    root.dataset.theme = theme
    root.style.colorScheme = theme
  }, [isDay])

  const toggleDayNight = useCallback(() => {
    setManualTheme((current) => {
      const effective = current ? current === "day" : clock?.isSunUp ?? false
      return effective ? "night" : "day"
    })
  }, [clock?.isSunUp])

  const resetToAuto = useCallback(() => setManualTheme(null), [])

  const value = useMemo<DayNightContextValue>(
    () => ({
      hour,
      liveHour: clock?.liveHour ?? null,
      liveTime: clock?.liveTime ?? null,
      sunriseTime: clock?.sunriseTime ?? null,
      sunsetTime: clock?.sunsetTime ?? null,
      sunIsUp,
      isManual: manualTheme !== null,
      isDay,
      toggleDayNight,
      resetToAuto,
    }),
    [
      hour,
      clock,
      sunIsUp,
      manualTheme,
      isDay,
      toggleDayNight,
      resetToAuto,
    ]
  )

  return <DayNightContext.Provider value={value}>{children}</DayNightContext.Provider>
}

export function useDayNight() {
  const context = useContext(DayNightContext)
  if (!context) throw new Error("useDayNight must be used within DayNightProvider")
  return context
}
