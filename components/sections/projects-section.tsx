"use client"

import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ProjectsSection() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        {t.projects.tag}
      </p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {t.projects.title}
      </h2>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {t.projects.items.map((project) => (
          <div
            key={project.title}
            className="group relative cursor-pointer rounded-xl border border-foreground bg-background/60 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-background/70">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((techItem) => (
                <span
                  key={techItem}
                  className="rounded-md border border-border px-2 py-1 text-xs font-medium transition-colors group-hover:border-background/30"
                >
                  {techItem}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
