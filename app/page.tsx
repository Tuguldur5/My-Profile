"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { DayNightProvider } from "@/lib/day-night-context"
import { Navbar } from "@/components/navbar"
import { SectionBackground } from "@/components/section-background"
import { HomeSection } from "@/components/sections/home-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"

type Section = "home" | "about" | "skills" | "projects" | "contact"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<Section>("home")

  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

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
    <LanguageProvider>
      <DayNightProvider>
        <MotionConfig reducedMotion="user">
          <div className="flex min-h-screen flex-col">
            <SkipLink />
            <SectionBackground activeSection={activeSection} />
            <Navbar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            <main id="main-content" className="flex-1 px-4 pb-16 pt-28 sm:px-6 md:pb-20">
              <div className="mx-auto max-w-6xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {renderSection()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>

            <Footer />
          </div>
        </MotionConfig>
      </DayNightProvider>
    </LanguageProvider>
  )
}

function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main-content"
      className="sr-only z-[70] rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t.a11y.skipToContent}
    </a>
  )
}
