"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useDayNight } from "@/lib/day-night-context"
import { useLanguage } from "@/lib/language-context"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useDocumentVisibility } from "@/hooks/use-document-visibility"
import { detectSceneQuality, type SceneQuality } from "@/lib/scene-quality"
import { SceneErrorBoundary } from "./scene-error-boundary"

// The Canvas never renders on the server: no window/WebGL access during SSR.
const HeroSceneView = dynamic(
  () => import("./scene").then((module) => module.HeroSceneView),
  { ssr: false, loading: () => <SceneSkeleton /> }
)

type Capability = "checking" | "supported" | "unsupported"

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    )
  } catch {
    return false
  }
}

export function HeroScene() {
  const { hour } = useDayNight()
  const reducedMotion = useReducedMotion()
  const hidden = useDocumentVisibility()
  const [capability, setCapability] = useState<Capability>("checking")
  const [quality, setQuality] = useState<SceneQuality | null>(null)

  useEffect(() => {
    setCapability(supportsWebGL() ? "supported" : "unsupported")
    setQuality(detectSceneQuality())
  }, [])

  if (capability === "unsupported") return <StaticFallback />
  if (capability === "checking" || !quality) return <SceneSkeleton />

  return (
    <SceneErrorBoundary fallback={<StaticFallback />}>
      <HeroSceneView
        hour={hour}
        quality={quality}
        reducedMotion={reducedMotion}
        paused={hidden}
      />
    </SceneErrorBoundary>
  )
}

function SceneSkeleton() {
  const { t } = useLanguage()
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        {t.dayNight.loading}
      </p>
    </div>
  )
}

function StaticFallback() {
  const { t } = useLanguage()
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <Image
        src="/images/bg-home.jpg"
        alt={t.home.sceneAria}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <p className="absolute inset-x-4 bottom-4 rounded-lg bg-black/60 px-3 py-2 text-center text-xs text-white/90">
        {t.dayNight.webglFallback}
      </p>
    </div>
  )
}
