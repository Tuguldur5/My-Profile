"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { HomeSection } from "@/components/sections/home-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"

type Section = "home" | "about" | "skills" | "projects" | "contact"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSectionChange = useCallback(
    (section: Section) => {
      if (section === activeSection) return
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveSection(section)
        setIsTransitioning(false)
      }, 200)
    },
    [activeSection]
  )

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection onNavigate={handleSectionChange} />
      case "about":
        return <AboutSection />
      case "skills":
        return <SkillsSection />
      case "projects":
        return <ProjectsSection />
      case "contact":
        return <ContactSection />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <main className="flex-1 px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            {renderSection()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
