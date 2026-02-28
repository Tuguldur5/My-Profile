"use client"

import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "CloudSync Dashboard",
    description:
      "A real-time monitoring dashboard for cloud infrastructure with automated alerting and resource management.",
    tech: ["React", "TypeScript", "AWS", "WebSocket"],
  },
  {
    title: "DevFlow CI/CD",
    description:
      "An automated deployment pipeline tool that streamlines the development workflow from commit to production.",
    tech: ["Go", "Docker", "Kubernetes", "PostgreSQL"],
  },
  {
    title: "CodeVault",
    description:
      "A secure code snippet manager with syntax highlighting, team sharing, and version history tracking.",
    tech: ["Next.js", "Prisma", "Tailwind CSS", "Redis"],
  },
  {
    title: "NetPulse Analytics",
    description:
      "A network monitoring application providing real-time traffic analysis and performance metrics visualization.",
    tech: ["Python", "React", "MongoDB", "D3.js"],
  },
]

export function ProjectsSection() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        My work
      </p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Featured Projects
      </h2>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative cursor-pointer rounded-xl border border-foreground p-6 transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-background/70">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border px-2 py-1 text-xs font-medium transition-colors group-hover:border-background/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
