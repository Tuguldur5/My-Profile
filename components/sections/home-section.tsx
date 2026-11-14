"use client"

import { ArrowRight, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useDayNight } from "@/lib/day-night-context"
import { location, profile } from "@/data/profile"
import { HeroScene } from "@/components/three/hero-scene"
import { useCharacterModel } from "@/hooks/use-character-model"

interface HomeSectionProps {
  onNavigate: (section: "projects" | "contact") => void
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const { locale, t } = useLanguage()
  const { liveTime } = useDayNight()
  // No model yet: keep the original centered hero and the flashlight background.
  const hasCharacter = useCharacterModel()

  return (
    <div
      className={
        hasCharacter
          ? "grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4"
          : "flex min-h-[60vh] flex-col items-center justify-center text-center"
      }
    >
      <div
        className={
          hasCharacter
            ? "flex flex-col items-center text-center lg:items-start lg:text-left"
            : "flex flex-col items-center text-center"
        }
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
          {t.home.greeting}
        </p>
        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {profile.name[locale]}
        </h1>
        <p className="mb-4 text-lg font-medium text-muted-foreground md:text-xl">
          {profile.tagline[locale]}
        </p>

        <p className="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:text-sm lg:justify-start">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{location.label[locale]}</span>
          <span aria-hidden="true">·</span>
          {/* Exact local time in Ulaanbaatar; never affected by the theme toggle. */}
          <time
            dateTime={liveTime ?? undefined}
            title={`${t.dayNight.title} (${location.timeZone})`}
            className="tabular-nums"
          >
            {liveTime ?? "--:--"} {t.dayNight.liveSuffix}
          </time>
        </p>

        <div className="mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t.home.openTo}
          </p>
          <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {profile.roles.map((role) => (
              <li
                key={role.en}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {role[locale]}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={() => onNavigate("projects")}
            className="group flex items-center justify-center gap-2 rounded-lg border border-foreground px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {t.home.viewProjects}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t.home.contactMe}
          </button>
        </div>
      </div>

      {hasCharacter && (
        <section
          aria-label={t.home.sceneAria}
          className="relative h-[380px] w-full sm:h-[460px] lg:h-[560px]"
        >
          <HeroScene />
        </section>
      )}
    </div>
  )
}
