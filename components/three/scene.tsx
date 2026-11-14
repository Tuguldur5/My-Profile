"use client"

import { Suspense, useEffect, useMemo, useRef } from "react"
import dynamic from "next/dynamic"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Lightformer, useProgress } from "@react-three/drei"
import * as THREE from "three"
import { getSceneLighting } from "@/lib/lighting"
import type { SceneQuality } from "@/lib/scene-quality"
import { useLanguage } from "@/lib/language-context"
import { ModelErrorBoundary } from "./model-error-boundary"

// Loaded lazily so useGLTF.preload only fires when the file actually exists.
const Character = dynamic(
  () => import("./character").then((module) => module.Character),
  { ssr: false }
)

interface HeroSceneViewProps {
  hour: number
  quality: SceneQuality
  reducedMotion: boolean
  paused: boolean
}

export function HeroSceneView({
  hour,
  quality,
  reducedMotion,
  paused,
}: HeroSceneViewProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows={false}
        dpr={quality.dpr}
        frameloop={paused ? "never" : "always"}
        camera={{ position: [0, 0.05, 3.8], fov: 32, near: 0.1, far: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <SceneContent
            hour={hour}
            quality={quality}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
      <SceneProgress />
    </div>
  )
}

function SceneContent({
  hour,
  quality,
  reducedMotion,
}: Omit<HeroSceneViewProps, "paused">) {
  const lighting = useMemo(() => getSceneLighting(hour), [hour])
  const keyColor = lighting.dayFactor > 0.25 ? lighting.sunColor : "#a6bcff"

  return (
    <>
      <Exposure value={lighting.exposure} />

      <ambientLight intensity={0.3 + lighting.ambientIntensity} />
      <hemisphereLight
        intensity={lighting.hemiIntensity}
        color={lighting.hemiSky}
        groundColor={lighting.hemiGround}
      />

      {/* Key light follows the hour: warm low sun, white noon, cool moonlight. */}
      <directionalLight
        position={[3.5, 4, 3]}
        intensity={0.35 + lighting.sunIntensity * 0.8}
        color={keyColor}
      />
      {/* Rim light separates the silhouette from the page background. */}
      <directionalLight
        position={[-3, 2.5, -3.5]}
        intensity={0.35 + lighting.nightFactor * 0.85}
        color={lighting.nightFactor > 0.5 ? "#8fb5ff" : "#ffe2bf"}
      />
      <directionalLight
        position={[0, 1, 4]}
        intensity={0.18 + lighting.dayFactor * 0.2}
        color="#ffffff"
      />

      {/* Local lightformers only — no remote HDR, no visible skybox. */}
      <Environment
        resolution={quality.envResolution}
        frames={1}
        environmentIntensity={0.3 + lighting.dayFactor * 0.45}
      >
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#ffffff"
          position={[0, 4, -4]}
          scale={[6, 3, 1]}
        />
        <Lightformer
          form="circle"
          intensity={0.7}
          color="#ffd9b0"
          position={[3, 1.5, 2.5]}
          scale={2}
        />
      </Environment>

      {/* Shift the whole figure so it is centered without a ground plane. */}
      <group position-y={-0.88}>
        <Rig enabled={!reducedMotion}>
          <ModelErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <Character reducedMotion={reducedMotion} shadows={false} />
            </Suspense>
          </ModelErrorBoundary>
        </Rig>
      </group>
    </>
  )
}

/** Gentle pointer parallax on the character instead of a moving camera. */
function Rig({
  enabled,
  children,
}: {
  enabled: boolean
  children: React.ReactNode
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    const targetX = enabled ? state.pointer.x * 0.1 : 0
    const targetY = enabled ? state.pointer.y * 0.04 : 0

    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      targetX,
      4,
      delta
    )
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      targetY,
      4,
      delta
    )
  })

  return <group ref={ref}>{children}</group>
}

function Exposure({ value }: { value: number }) {
  const gl = useThree((state) => state.gl)
  useEffect(() => {
    gl.toneMappingExposure = value
  }, [gl, value])
  return null
}

function SceneProgress() {
  const active = useProgress((state) => state.active)
  const progress = useProgress((state) => state.progress)
  const errors = useProgress((state) => state.errors)
  const { t } = useLanguage()

  // A failed GLTF request never fires the loading manager's onLoad callback.
  if (!active || errors.length > 0) return null

  return (
    <div
      className="pointer-events-none absolute bottom-1 left-0 rounded-full bg-background/70 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      {t.dayNight.loading} {Math.round(progress)}%
    </div>
  )
}
