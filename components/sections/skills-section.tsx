"use client"

import { useLanguage } from "@/lib/language-context"

export function SkillsSection() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        {t.skills.tag}
      </p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {t.skills.title}
      </h2>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        {t.skills.categories.map((category) => (
          <div
            key={category.title}
            className="rounded-xl border border-border bg-background/60 backdrop-blur-sm p-6 transition-colors hover:border-foreground/30"
          >
            <h3 className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
