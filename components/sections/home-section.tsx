"use client"

import { ArrowRight, Mail } from "lucide-react"

interface HomeSectionProps {
  onNavigate: (section: "projects" | "contact") => void
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="mb-4 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        Welcome to my portfolio
      </p>
      <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground md:text-7xl text-balance">
        {"Hi, I'm Alex Chen"}
      </h1>
      <p className="mb-6 text-lg font-medium text-muted-foreground md:text-xl">
        IT Specialist | Software Developer
      </p>
      <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground">
        I build scalable, modern software solutions with a focus on clean
        architecture, performance, and exceptional user experiences. From
        full-stack applications to cloud infrastructure, I turn complex problems
        into elegant code.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => onNavigate("projects")}
          className="group flex items-center gap-2 rounded-lg border border-foreground px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-background"
        >
          View Projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          <Mail className="h-4 w-4" />
          Contact Me
        </button>
      </div>
    </div>
  )
}
