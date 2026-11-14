"use client"

import { useEffect, useState } from "react"
import {
  Braces,
  Cloud,
  Code2,
  Database,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { profile } from "@/data/profile"

type SkillIcon = "code" | "server" | "database" | "cloud" | "braces"

const ICONS: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  server: Server,
  database: Database,
  cloud: Cloud,
  braces: Braces,
}

export function SkillsSection() {
  const { locale, t } = useLanguage()
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const { skills } = profile

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
        {t.skills.tag}
      </p>
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {t.skills.title}
      </h2>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {skills.groups.map((group) => {
          const Icon = ICONS[group.icon as SkillIcon]
          return (
            <div
              key={group.id}
              className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm transition-colors hover:border-foreground/30 sm:p-6"
            >
              <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t.skills.groups[group.id]}
              </h3>

              <ul className="space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      {skill.level === null ? (
                        <span className="text-[11px] text-muted-foreground">—</span>
                      ) : (
                        <span
                          className="text-[11px] tabular-nums text-muted-foreground"
                          aria-hidden="true"
                        >
                          {skill.level}%
                        </span>
                      )}
                    </div>
                    {skill.level === null ? null : (
                      <div
                        role="progressbar"
                        aria-label={`${skill.name} — ${t.skills.levelLabel}`}
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="h-1.5 overflow-hidden rounded-full bg-secondary"
                      >
                        <div
                          className={`h-full rounded-full bg-foreground ${
                            reducedMotion
                              ? ""
                              : "transition-[width] duration-700 ease-out"
                          }`}
                          style={{
                            width:
                              mounted || reducedMotion ? `${skill.level}%` : "0%",
                          }}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm sm:p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t.skills.professionalTitle}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {skills.professional.map((item) => (
              <li
                key={item.en}
                className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {item[locale]}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm sm:p-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t.skills.softTitle}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {skills.soft.map((item) => (
              <li
                key={item.en}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {item[locale]}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm sm:p-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t.skills.languagesTitle}
          </h3>
          <ul className="space-y-2">
            {skills.spokenLanguages.map((language) => (
              <li
                key={language.name.en}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="font-medium text-foreground">
                  {language.name[locale]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {language.level[locale]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm sm:p-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t.skills.interestsTitle}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {skills.interests.map((interest) => (
              <li
                key={interest.en}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {interest[locale]}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
