"use client"

import { useRef, useEffect, useCallback, useMemo } from "react"
import { useDayNight } from "@/lib/day-night-context"

type Section = "home" | "about" | "skills" | "projects" | "contact"

interface SectionBackgroundProps {
  activeSection: Section
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface Palette {
  body: string
  bodyDark: string
  hair: string
  sideHair: string
  shadow: string
  ground: string
  /** RGB channels used for the beam and lit particles. */
  beam: string
  particles: string
}

/**
 * The original identity of the site: a person holding a flashlight whose beam
 * points at the active navbar item. It now renders in both themes, as a dark
 * silhouette in daylight and a light one at night.
 */
function getPalette(isDay: boolean): Palette {
  if (isDay) {
    return {
      body: "rgba(46, 42, 35, 0.9)",
      bodyDark: "rgba(78, 71, 59, 0.65)",
      hair: "rgba(30, 27, 22, 0.72)",
      sideHair: "rgba(48, 44, 36, 0.45)",
      shadow: "rgba(0, 0, 0, 0.07)",
      ground: "rgba(0, 0, 0, 0.06)",
      beam: "255, 176, 64",
      particles: "70, 58, 40",
    }
  }

  return {
    body: "rgba(220, 220, 220, 0.92)",
    bodyDark: "rgba(180, 180, 180, 0.7)",
    hair: "rgba(160, 160, 160, 0.6)",
    sideHair: "rgba(150, 150, 150, 0.4)",
    shadow: "rgba(255, 255, 255, 0.08)",
    ground: "rgba(255, 255, 255, 0.07)",
    beam: "255, 255, 255",
    particles: "255, 255, 255",
  }
}

export function SectionBackground({ activeSection }: SectionBackgroundProps) {
  const { isDay } = useDayNight()
  const palette = useMemo(() => getPalette(isDay), [isDay])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const currentAngle = useRef(-Math.PI / 2)
  const targetAngle = useRef(-Math.PI / 2)
  const particles = useRef<Particle[]>([])
  const initialized = useRef(false)
  const dpr = useRef(1)

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.floor((w * h) / 18000)
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.08 + 0.01,
    }))
  }, [])

  // Calculate angle from flashlight tip to the active navbar item's DOM position
  useEffect(() => {
    const calcAngle = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const w = canvas.width / dpr.current
      const h = canvas.height / dpr.current
      const scale = Math.min(w / 900, h / 600, 1.2)

      // Replicate exact flashlight tip position from draw logic
      const figX = w * 0.5
      const figY = h * 0.75
      const lean = Math.sin(currentAngle.current + Math.PI / 2) * 0.05
      const shLeanX = lean * 8 * scale
      const torsoTopY = -42 * scale
      const shoulderWidth = 18 * scale
      const rShX = figX + shLeanX + shoulderWidth
      const rShY = figY + torsoTopY
      const armLength = 35 * scale
      const approxAngle = currentAngle.current
      const rHandX = rShX + Math.cos(approxAngle) * armLength
      const rHandY = rShY + Math.sin(approxAngle) * armLength
      const flLen = 14 * scale
      const flTipX = rHandX + Math.cos(approxAngle) * flLen
      const flTipY = rHandY + Math.sin(approxAngle) * flLen

      const navBtn = document.querySelector(
        `[data-nav-section="${activeSection}"]`
      ) as HTMLElement | null

      if (navBtn) {
        const rect = navBtn.getBoundingClientRect()
        // NavBtn position is in viewport coordinates, canvas is fullscreen so they match
        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2
        targetAngle.current = Math.atan2(targetY - flTipY, targetX - flTipX)
      } else {
        // Fallback angles pointing upward toward nav area
        const navItems: Section[] = ["home", "about", "skills", "projects", "contact"]
        const idx = navItems.indexOf(activeSection)
        const count = navItems.length
        // Spread angles across the top of screen, from upper-left to upper-right
        const startAngle = -Math.PI * 0.85
        const endAngle = -Math.PI * 0.15
        const t = count > 1 ? idx / (count - 1) : 0.5
        targetAngle.current = startAngle + (endAngle - startAngle) * t
      }
    }

    calcAngle()
    // Recalculate on resize and after a short delay for layout
    window.addEventListener("resize", calcAngle)
    const timeout = setTimeout(calcAngle, 100)
    return () => {
      window.removeEventListener("resize", calcAngle)
      clearTimeout(timeout)
    }
  }, [activeSection])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduced = reducedQuery.matches

    dpr.current = window.devicePixelRatio || 1

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr.current
      canvas.height = h * dpr.current
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0)
      if (!initialized.current) {
        initParticles(w, h)
        initialized.current = true
      }
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const w = canvas.width / dpr.current
      const h = canvas.height / dpr.current

      // Smoothly interpolate angle
      let diff = targetAngle.current - currentAngle.current
      while (diff > Math.PI) diff -= 2 * Math.PI
      while (diff < -Math.PI) diff += 2 * Math.PI
      currentAngle.current += diff * 0.03
      const angle = currentAngle.current

      // Transparent canvas: the page background shows through, so switching
      // between day and night stays smooth.
      ctx.clearRect(0, 0, w, h)

      // Figure position
      const figX = w * 0.5
      const figY = h * 0.75
      const scale = Math.min(w / 900, h / 600, 1.2)

      // --- Compute flashlight tip for beam origin ---
      const lean = Math.sin(angle + Math.PI / 2) * 0.05
      const shLeanX = lean * 8 * scale
      const shY = -42 * scale
      const shoulderWidth = 16 * scale
      const rShX = shLeanX + shoulderWidth
      const rShY = shY
      const armLen = 35 * scale
      const handX = rShX + Math.cos(angle) * armLen
      const handY = rShY + Math.sin(angle) * armLen
      const flLen = 14 * scale
      const flTipX = figX + handX + Math.cos(angle) * flLen
      const flTipY = figY + handY + Math.sin(angle) * flLen

      const beam = palette.beam

      // === SPOTLIGHT BEAM ===
      const beamLength = Math.max(w, h) * 2
      const beamSpread = 0.3

      // Wide outer glow
      const outerEnd1X = flTipX + Math.cos(angle - beamSpread * 1.3) * beamLength
      const outerEnd1Y = flTipY + Math.sin(angle - beamSpread * 1.3) * beamLength
      const outerEnd2X = flTipX + Math.cos(angle + beamSpread * 1.3) * beamLength
      const outerEnd2Y = flTipY + Math.sin(angle + beamSpread * 1.3) * beamLength

      const outerGrad = ctx.createRadialGradient(
        flTipX, flTipY, 0,
        flTipX, flTipY, beamLength * 0.7
      )
      outerGrad.addColorStop(0, `rgba(${beam}, 0.18)`)
      outerGrad.addColorStop(0.05, `rgba(${beam}, 0.12)`)
      outerGrad.addColorStop(0.15, `rgba(${beam}, 0.06)`)
      outerGrad.addColorStop(0.4, `rgba(${beam}, 0.015)`)
      outerGrad.addColorStop(1, `rgba(${beam}, 0)`)

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(flTipX, flTipY)
      ctx.lineTo(outerEnd1X, outerEnd1Y)
      ctx.lineTo(outerEnd2X, outerEnd2Y)
      ctx.closePath()
      ctx.fillStyle = outerGrad
      ctx.fill()
      ctx.restore()

      // Main cone beam
      const mainEnd1X = flTipX + Math.cos(angle - beamSpread) * beamLength
      const mainEnd1Y = flTipY + Math.sin(angle - beamSpread) * beamLength
      const mainEnd2X = flTipX + Math.cos(angle + beamSpread) * beamLength
      const mainEnd2Y = flTipY + Math.sin(angle + beamSpread) * beamLength

      const mainGrad = ctx.createRadialGradient(
        flTipX, flTipY, 0,
        flTipX, flTipY, beamLength * 0.65
      )
      mainGrad.addColorStop(0, `rgba(${beam}, 0.28)`)
      mainGrad.addColorStop(0.04, `rgba(${beam}, 0.20)`)
      mainGrad.addColorStop(0.12, `rgba(${beam}, 0.10)`)
      mainGrad.addColorStop(0.3, `rgba(${beam}, 0.03)`)
      mainGrad.addColorStop(0.6, `rgba(${beam}, 0.005)`)
      mainGrad.addColorStop(1, `rgba(${beam}, 0)`)

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(flTipX, flTipY)
      ctx.lineTo(mainEnd1X, mainEnd1Y)
      ctx.lineTo(mainEnd2X, mainEnd2Y)
      ctx.closePath()
      ctx.fillStyle = mainGrad
      ctx.fill()
      ctx.restore()

      // Inner bright core beam
      const coreSpread = 0.1
      const coreEnd1X = flTipX + Math.cos(angle - coreSpread) * beamLength
      const coreEnd1Y = flTipY + Math.sin(angle - coreSpread) * beamLength
      const coreEnd2X = flTipX + Math.cos(angle + coreSpread) * beamLength
      const coreEnd2Y = flTipY + Math.sin(angle + coreSpread) * beamLength

      const coreGrad = ctx.createRadialGradient(
        flTipX, flTipY, 0,
        flTipX, flTipY, beamLength * 0.4
      )
      coreGrad.addColorStop(0, `rgba(${beam}, 0.35)`)
      coreGrad.addColorStop(0.06, `rgba(${beam}, 0.20)`)
      coreGrad.addColorStop(0.15, `rgba(${beam}, 0.08)`)
      coreGrad.addColorStop(0.4, `rgba(${beam}, 0.01)`)
      coreGrad.addColorStop(1, `rgba(${beam}, 0)`)

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(flTipX, flTipY)
      ctx.lineTo(coreEnd1X, coreEnd1Y)
      ctx.lineTo(coreEnd2X, coreEnd2Y)
      ctx.closePath()
      ctx.fillStyle = coreGrad
      ctx.fill()
      ctx.restore()

      // Hotspot glow at flashlight tip
      const tipGlow = ctx.createRadialGradient(
        flTipX, flTipY, 0,
        flTipX, flTipY, 40 * scale
      )
      tipGlow.addColorStop(0, `rgba(${beam}, 0.5)`)
      tipGlow.addColorStop(0.3, `rgba(${beam}, 0.15)`)
      tipGlow.addColorStop(1, `rgba(${beam}, 0)`)
      ctx.beginPath()
      ctx.arc(flTipX, flTipY, 40 * scale, 0, Math.PI * 2)
      ctx.fillStyle = tipGlow
      ctx.fill()

      // === PARTICLES with beam-aware illumination ===
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const pAngle = Math.atan2(p.y - flTipY, p.x - flTipX)
        let angleDiff = Math.abs(pAngle - angle)
        if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff
        const inBeam = angleDiff < beamSpread
        const dist = Math.hypot(p.x - flTipX, p.y - flTipY)
        const proximity = 1 - Math.min(dist / (beamLength * 0.35), 1)
        const beamFactor = inBeam ? proximity * 0.6 : 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = inBeam && beamFactor > 0
          ? `rgba(${beam}, ${p.opacity + beamFactor})`
          : `rgba(${palette.particles}, ${p.opacity})`
        ctx.fill()
      }

      // === DRAW THE FIGURE ===
      drawPerson(ctx, figX, figY, angle, scale, palette)

      // Stop the loop while the tab is hidden or reduced motion is requested.
      if (!reduced && document.visibilityState !== "hidden") {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    const onVisibilityChange = () => {
      cancelAnimationFrame(animRef.current)
      if (document.visibilityState === "visible") {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches
      cancelAnimationFrame(animRef.current)
      if (!reduced) animRef.current = requestAnimationFrame(draw)
      else draw()
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    reducedQuery.addEventListener("change", onReducedMotionChange)
    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      reducedQuery.removeEventListener("change", onReducedMotionChange)
    }
  }, [initParticles, palette])

  return (
    <canvas
      ref={canvasRef}
      className="portfolio-bg fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}

function drawPerson(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  scale: number,
  palette: Palette
) {
  ctx.save()
  ctx.translate(x, y)

  const lean = Math.sin(angle + Math.PI / 2) * 0.05
  const bodyColor = palette.body
  const darkColor = palette.bodyDark

  // ============ GROUND SHADOW ============
  const groundGlow = ctx.createRadialGradient(0, 68 * scale, 0, 0, 68 * scale, 50 * scale)
  groundGlow.addColorStop(0, palette.ground)
  groundGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
  ctx.beginPath()
  ctx.ellipse(0, 68 * scale, 38 * scale, 10 * scale, 0, 0, Math.PI * 2)
  ctx.fillStyle = groundGlow
  ctx.fill()

  // ============ LEGS ============
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  // Left leg - slightly bent
  const lHipX = -6 * scale
  const lHipY = 8 * scale
  const lKneeX = (-9 - lean * 12) * scale
  const lKneeY = 30 * scale
  const lAnkleX = (-8 - lean * 16) * scale
  const lAnkleY = 56 * scale

  // Thigh
  ctx.strokeStyle = bodyColor
  ctx.lineWidth = 7 * scale
  ctx.beginPath()
  ctx.moveTo(lHipX, lHipY)
  ctx.quadraticCurveTo(lKneeX - 2 * scale, lKneeY, lKneeX, lKneeY)
  ctx.stroke()

  // Shin
  ctx.lineWidth = 6 * scale
  ctx.beginPath()
  ctx.moveTo(lKneeX, lKneeY)
  ctx.lineTo(lAnkleX, lAnkleY)
  ctx.stroke()

  // Shoe
  ctx.lineWidth = 7 * scale
  ctx.beginPath()
  ctx.moveTo(lAnkleX, lAnkleY)
  ctx.lineTo(lAnkleX - 8 * scale, lAnkleY + 3 * scale)
  ctx.stroke()
  // Shoe sole
  ctx.lineWidth = 3 * scale
  ctx.strokeStyle = darkColor
  ctx.beginPath()
  ctx.moveTo(lAnkleX - 9 * scale, lAnkleY + 5 * scale)
  ctx.lineTo(lAnkleX + 3 * scale, lAnkleY + 5 * scale)
  ctx.stroke()

  // Right leg
  const rHipX = 6 * scale
  const rHipY = 8 * scale
  const rKneeX = (9 - lean * 12) * scale
  const rKneeY = 30 * scale
  const rAnkleX = (8 - lean * 16) * scale
  const rAnkleY = 56 * scale

  ctx.strokeStyle = bodyColor
  ctx.lineWidth = 7 * scale
  ctx.beginPath()
  ctx.moveTo(rHipX, rHipY)
  ctx.quadraticCurveTo(rKneeX + 2 * scale, rKneeY, rKneeX, rKneeY)
  ctx.stroke()

  ctx.lineWidth = 6 * scale
  ctx.beginPath()
  ctx.moveTo(rKneeX, rKneeY)
  ctx.lineTo(rAnkleX, rAnkleY)
  ctx.stroke()

  ctx.lineWidth = 7 * scale
  ctx.beginPath()
  ctx.moveTo(rAnkleX, rAnkleY)
  ctx.lineTo(rAnkleX + 8 * scale, rAnkleY + 3 * scale)
  ctx.stroke()
  ctx.lineWidth = 3 * scale
  ctx.strokeStyle = darkColor
  ctx.beginPath()
  ctx.moveTo(rAnkleX - 3 * scale, rAnkleY + 5 * scale)
  ctx.lineTo(rAnkleX + 9 * scale, rAnkleY + 5 * scale)
  ctx.stroke()

  // ============ TORSO ============
  const shLeanX = lean * 8 * scale
  const torsoTopY = -42 * scale

  // Torso - tapered shape (wider at shoulders, narrower at hips)
  ctx.fillStyle = bodyColor
  ctx.beginPath()
  ctx.moveTo(-8 * scale, 10 * scale) // left hip
  ctx.quadraticCurveTo(-10 * scale + shLeanX, -15 * scale, shLeanX - 18 * scale, torsoTopY)
  ctx.lineTo(shLeanX + 18 * scale, torsoTopY)
  ctx.quadraticCurveTo(10 * scale + shLeanX, -15 * scale, 8 * scale, 10 * scale)
  ctx.closePath()
  ctx.fill()

  // Torso center line (subtle detail)
  ctx.strokeStyle = darkColor
  ctx.lineWidth = 1 * scale
  ctx.beginPath()
  ctx.moveTo(0, 6 * scale)
  ctx.lineTo(shLeanX * 0.5, torsoTopY + 8 * scale)
  ctx.stroke()

  // ============ SHOULDERS ============
  const shoulderWidth = 18 * scale
  const shY = torsoTopY
  const lShX = shLeanX - shoulderWidth
  const lShY = shY
  const rShX = shLeanX + shoulderWidth
  const rShY = shY

  // Shoulder caps (rounded)
  ctx.fillStyle = bodyColor
  ctx.beginPath()
  ctx.arc(lShX, lShY, 6 * scale, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(rShX, rShY, 6 * scale, 0, Math.PI * 2)
  ctx.fill()

  // ============ LEFT ARM (relaxed, hanging) ============
  ctx.strokeStyle = bodyColor
  ctx.lineWidth = 5.5 * scale

  const lElbowX = lShX - 5 * scale
  const lElbowY = lShY + 22 * scale
  const lHandX = lShX - 2 * scale
  const lHandY = lShY + 40 * scale

  // Upper arm
  ctx.beginPath()
  ctx.moveTo(lShX, lShY)
  ctx.quadraticCurveTo(lShX - 7 * scale, lElbowY - 5 * scale, lElbowX, lElbowY)
  ctx.stroke()

  // Forearm
  ctx.lineWidth = 5 * scale
  ctx.beginPath()
  ctx.moveTo(lElbowX, lElbowY)
  ctx.quadraticCurveTo(lElbowX + 2 * scale, lHandY - 8 * scale, lHandX, lHandY)
  ctx.stroke()

  // Hand
  ctx.beginPath()
  ctx.arc(lHandX, lHandY, 3.5 * scale, 0, Math.PI * 2)
  ctx.fillStyle = bodyColor
  ctx.fill()

  // ============ RIGHT ARM (holding flashlight) ============
  const armAngle = angle
  const armLength = 35 * scale
  const elbowDist = armLength * 0.55
  const rElbowX = rShX + Math.cos(armAngle + 0.25) * elbowDist
  const rElbowY = rShY + Math.sin(armAngle + 0.25) * elbowDist
  const rHandX = rShX + Math.cos(armAngle) * armLength
  const rHandY = rShY + Math.sin(armAngle) * armLength

  // Upper arm
  ctx.strokeStyle = bodyColor
  ctx.lineWidth = 5.5 * scale
  ctx.beginPath()
  ctx.moveTo(rShX, rShY)
  ctx.quadraticCurveTo(rElbowX, rElbowY, rHandX, rHandY)
  ctx.stroke()

  // Hand gripping flashlight
  ctx.beginPath()
  ctx.arc(rHandX, rHandY, 3.5 * scale, 0, Math.PI * 2)
  ctx.fillStyle = bodyColor
  ctx.fill()

  // ============ FLASHLIGHT ============
  const flLen = 14 * scale
  const flTipX = rHandX + Math.cos(armAngle) * flLen
  const flTipY = rHandY + Math.sin(armAngle) * flLen

  // Flashlight body (cylindrical)
  const flPerpX = Math.cos(armAngle + Math.PI / 2) * 3 * scale
  const flPerpY = Math.sin(armAngle + Math.PI / 2) * 3 * scale

  ctx.fillStyle = darkColor
  ctx.beginPath()
  ctx.moveTo(rHandX + flPerpX, rHandY + flPerpY)
  ctx.lineTo(flTipX + flPerpX * 1.4, flTipY + flPerpY * 1.4)
  ctx.lineTo(flTipX - flPerpX * 1.4, flTipY - flPerpY * 1.4)
  ctx.lineTo(rHandX - flPerpX, rHandY - flPerpY)
  ctx.closePath()
  ctx.fill()

  // Flashlight lens
  ctx.strokeStyle = `rgba(${palette.beam}, 0.8)`
  ctx.lineWidth = 2 * scale
  ctx.beginPath()
  ctx.arc(flTipX, flTipY, 5 * scale, 0, Math.PI * 2)
  ctx.stroke()

  // Lens glow
  const lensGlow = ctx.createRadialGradient(flTipX, flTipY, 0, flTipX, flTipY, 8 * scale)
  lensGlow.addColorStop(0, `rgba(${palette.beam}, 0.6)`)
  lensGlow.addColorStop(0.5, `rgba(${palette.beam}, 0.2)`)
  lensGlow.addColorStop(1, `rgba(${palette.beam}, 0)`)
  ctx.beginPath()
  ctx.arc(flTipX, flTipY, 8 * scale, 0, Math.PI * 2)
  ctx.fillStyle = lensGlow
  ctx.fill()

  // ============ NECK ============
  ctx.fillStyle = bodyColor
  const neckW = 4.5 * scale
  const neckTopY = torsoTopY - 7 * scale
  ctx.beginPath()
  ctx.moveTo(shLeanX - neckW, torsoTopY)
  ctx.lineTo(shLeanX - neckW * 0.8, neckTopY)
  ctx.lineTo(shLeanX + neckW * 0.8, neckTopY)
  ctx.lineTo(shLeanX + neckW, torsoTopY)
  ctx.closePath()
  ctx.fill()

  // ============ HEAD ============
  const headTurn = Math.sin(angle + Math.PI / 2) * 4 * scale
  const headX = shLeanX + headTurn
  const headY = neckTopY - 13 * scale

  // Head shadow
  ctx.beginPath()
  ctx.ellipse(headX + 1.5 * scale, headY + 1 * scale, 10 * scale, 12.5 * scale, 0, 0, Math.PI * 2)
  ctx.fillStyle = palette.shadow
  ctx.fill()

  // Head shape
  ctx.beginPath()
  ctx.ellipse(headX, headY, 10 * scale, 12.5 * scale, 0, 0, Math.PI * 2)
  ctx.fillStyle = bodyColor
  ctx.fill()

  // Hair (short, styled)
  ctx.fillStyle = palette.hair
  ctx.beginPath()
  ctx.ellipse(headX + headTurn * 0.2, headY - 7 * scale, 10 * scale, 6.5 * scale, 0, Math.PI, Math.PI * 2)
  ctx.fill()

  // Side hair detail
  ctx.fillStyle = palette.sideHair
  ctx.beginPath()
  ctx.ellipse(headX - 9 * scale, headY - 2 * scale, 3 * scale, 8 * scale, 0.15, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(headX + 9 * scale, headY - 2 * scale, 3 * scale, 8 * scale, -0.15, 0, Math.PI * 2)
  ctx.fill()

  // Face direction indicator (subtle nose/profile hint based on head turn)
  const noseOffsetX = headTurn * 1.2
  ctx.strokeStyle = darkColor
  ctx.lineWidth = 1.5 * scale
  ctx.beginPath()
  ctx.moveTo(headX + noseOffsetX, headY - 1 * scale)
  ctx.lineTo(headX + noseOffsetX + headTurn * 0.3, headY + 2 * scale)
  ctx.stroke()

  // Eyes hint
  const eyeY = headY - 2 * scale
  const eyeSpacing = 4 * scale
  ctx.fillStyle = darkColor
  ctx.beginPath()
  ctx.ellipse(headX + noseOffsetX * 0.5 - eyeSpacing, eyeY, 1.5 * scale, 1 * scale, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(headX + noseOffsetX * 0.5 + eyeSpacing, eyeY, 1.5 * scale, 1 * scale, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}
