"use client"

import { ExternalLink, FolderPlus, Github, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { profile } from "@/data/profile"

export function ProjectsSection() {
  const { locale, t } = useLanguage()

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
        {t.projects.tag}
      </p>
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {t.projects.title}
      </h2>
      <p className="mb-10 max-w-xl text-center text-sm text-muted-foreground sm:text-base">
        {t.projects.subtitle}
      </p>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profile.projects.map((project) => {
          const title = project.title[locale]
          const note = "note" in project ? project.note : null
          const isFeatured = project.status === "featured"
          const Icon = isFeatured ? ShieldCheck : FolderPlus

          return (
            <article
              key={project.id}
              className={`group flex h-full flex-col overflow-hidden rounded-xl border bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isFeatured
                  ? "border-foreground/30 hover:border-foreground/50"
                  : "border-dashed border-border hover:border-foreground/30"
              }`}
            >
              <div
                className={`relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden ${
                  isFeatured
                    ? "bg-gradient-to-br from-foreground/15 via-secondary to-secondary"
                    : "bg-secondary/50"
                }`}
              >
                <Icon
                  className={`h-12 w-12 transition-transform duration-500 group-hover:scale-110 ${
                    isFeatured ? "text-foreground/70" : "text-muted-foreground/50"
                  }`}
                  aria-hidden="true"
                />
                <span className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                  {isFeatured ? t.projects.featured : t.projects.todo}
                </span>
                {note ? (
                  <span className="absolute right-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                    {note[locale]}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description[locale]}
                </p>

                <ul className="mb-4 flex flex-wrap gap-1.5">
                  {project.tech.length > 0 ? (
                    project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))
                  ) : (
                    <li className="rounded-md border border-dashed border-border px-2 py-1 text-[11px] font-medium text-muted-foreground/70">
                      {t.projects.techPlaceholder}
                    </li>
                  )}
                </ul>

                <div className="flex items-center gap-4 border-t border-border pt-3">
                  {project.github || project.live ? (
                    <>
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.projects.viewCode}: ${title}`}
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                          {t.projects.viewCode}
                        </a>
                      ) : null}
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.projects.viewLive}: ${title}`}
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          {t.projects.viewLive}
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground/70">
                      {t.projects.linkPlaceholder}
                    </span>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
