"use client"

import { GraduationCap, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { profile } from "@/data/profile"

export function AboutSection() {
  const { locale, t } = useLanguage()

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
        {t.about.tag}
      </p>
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {t.about.title}
      </h2>

      <p className="mx-auto mb-8 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
        {profile.about[locale]}
      </p>

      <div className="mb-14 w-full max-w-2xl">
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {t.about.openToTitle}
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
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

      <div className="w-full max-w-2xl">
        <h3 className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t.about.experienceTitle}
        </h3>
        <div className="relative border-l border-border pl-8">
          {profile.experience.map((job) => (
            <div key={job.company.en} className="group relative mb-10 last:mb-0">
              <div className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-background transition-colors group-hover:bg-foreground" />
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {job.period[locale]}
              </span>
              <h4 className="text-lg font-semibold text-foreground">{job.role[locale]}</h4>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                {job.company[locale]}
              </p>
              <ul className="space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet.en}
                    className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-muted-foreground/60"
                  >
                    {bullet[locale]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            {t.about.educationTitle}
          </h3>
          {profile.education.map((item) => (
            <div key={item.school.en}>
              <p className="text-sm font-semibold leading-snug text-foreground">
                {item.school[locale]}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{item.degree[locale]}</p>
              <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                {item.period[locale]}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Users className="h-4 w-4" aria-hidden="true" />
            {t.about.communityTitle}
          </h3>
          {profile.community.map((item) => (
            <div key={item.organization.en}>
              <p className="text-sm font-semibold leading-snug text-foreground">
                {item.organization[locale]}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{item.role[locale]}</p>
              <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                {item.period[locale]}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
