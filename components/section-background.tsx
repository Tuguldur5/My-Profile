"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

type Section = "home" | "about" | "skills" | "projects" | "contact"

const sectionImages: Record<Section, string> = {
  home: "/images/bg-home.jpg",
  about: "/images/bg-about.jpg",
  skills: "/images/bg-skills.jpg",
  projects: "/images/bg-projects.jpg",
  contact: "/images/bg-contact.jpg",
}

interface SectionBackgroundProps {
  activeSection: Section
}

export function SectionBackground({ activeSection }: SectionBackgroundProps) {
  const [currentImage, setCurrentImage] = useState(sectionImages[activeSection])
  const [nextImage, setNextImage] = useState<string | null>(null)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const newImage = sectionImages[activeSection]
    if (newImage !== currentImage) {
      setNextImage(newImage)
      setIsFading(true)
      const timer = setTimeout(() => {
        setCurrentImage(newImage)
        setNextImage(null)
        setIsFading(false)
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [activeSection, currentImage])

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {/* Current image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={currentImage}
          alt=""
          fill
          className="object-cover"
          priority
          quality={80}
        />
      </div>

      {/* Next image (fading in) */}
      {nextImage && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isFading ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={nextImage}
            alt=""
            fill
            className="object-cover"
            priority
            quality={80}
          />
        </div>
      )}

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/85" />
    </div>
  )
}
