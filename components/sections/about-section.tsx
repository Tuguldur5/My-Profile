"use client"

import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        {t.about.tag}
      </p>
      <h2 className="mb-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {t.about.title}
      </h2>
      <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
        {t.about.description}
      </p>

      <div className="w-full max-w-2xl">
        <h3 className="mb-8 text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          {t.about.experienceTitle}
        </h3>
        <div className="relative border-l border-border pl-8">
          {t.about.experiences.map((exp, index) => (
            <div key={index} className="group relative mb-10 last:mb-0">
              <div className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-background transition-colors group-hover:bg-foreground" />
              <span className="mb-1 block text-xs font-medium tracking-wider uppercase text-muted-foreground">
                {exp.year}
              </span>
              <h4 className="text-lg font-semibold text-foreground">
                {exp.role}
              </h4>
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                {exp.company}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
