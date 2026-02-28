"use client"

import { useRef, useEffect, useCallback } from "react"

type Section = "home" | "about" | "skills" | "projects" | "contact"

interface SectionBackgroundProps {
  activeSection: Section
}

// Map each section to an angle (radians) the figure looks toward
// Sections are ordered left-to-right in the navbar, so light sweeps across
const sectionAngles: Record<Section, number> = {
  home: -Math.PI / 2,       // straight up
  about: -Math.PI / 3,      // upper-left
  skills: -Math.PI / 6,     // slight upper-right
  projects: Math.PI / 8,    // right
  contact: Math.PI / 3.5,   // far right
}

// Floating particles for atmosphere
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function SectionBackground({ activeSection }: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const currentAngle = useRef(sectionAngles.home)
  const targetAngle = useRef(sectionAngles.home)
  const particles = useRef<Particle[]>([])
  const initialized = useRef(false)
  const dpr = useRef(1)

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.floor((w * h) / 18000)
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.05,
    }))
  }, [])

  useEffect(() => {
    targetAngle.current = sectionAngles[activeSection]
  }, [activeSection])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

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
      const diff = targetAngle.current - currentAngle.current
      currentAngle.current += diff * 0.04
      const angle = currentAngle.current

      // Clear
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, w, h)

      // Figure position — bottom-center
      const figX = w * 0.5
      const figY = h * 0.78

      // --- Draw spotlight / light beam ---
      const beamLength = Math.max(w, h) * 1.4
      const beamSpread = 0.32
      const beamEndX1 = figX + Math.cos(angle - beamSpread) * beamLength
      const beamEndY1 = figY + Math.sin(angle - beamSpread) * beamLength
      const beamEndX2 = figX + Math.cos(angle + beamSpread) * beamLength
      const beamEndY2 = figY + Math.sin(angle + beamSpread) * beamLength

      // Beam gradient
      const grad = ctx.createRadialGradient(figX, figY, 0, figX, figY, beamLength * 0.7)
      grad.addColorStop(0, "rgba(0, 0, 0, 0.07)")
      grad.addColorStop(0.3, "rgba(0, 0, 0, 0.04)")
      grad.addColorStop(0.7, "rgba(0, 0, 0, 0.01)")
      grad.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(figX, figY)
      ctx.lineTo(beamEndX1, beamEndY1)
      ctx.lineTo(beamEndX2, beamEndY2)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()

      // Inner bright cone
      const innerGrad = ctx.createRadialGradient(figX, figY, 0, figX, figY, beamLength * 0.5)
      innerGrad.addColorStop(0, "rgba(0, 0, 0, 0.09)")
      innerGrad.addColorStop(0.2, "rgba(0, 0, 0, 0.05)")
      innerGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.02)")
      innerGrad.addColorStop(1, "rgba(0, 0, 0, 0)")

      const innerSpread = 0.15
      const iEx1 = figX + Math.cos(angle - innerSpread) * beamLength
      const iEy1 = figY + Math.sin(angle - innerSpread) * beamLength
      const iEx2 = figX + Math.cos(angle + innerSpread) * beamLength
      const iEy2 = figY + Math.sin(angle + innerSpread) * beamLength

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(figX, figY)
      ctx.lineTo(iEx1, iEy1)
      ctx.lineTo(iEx2, iEy2)
      ctx.closePath()
      ctx.fillStyle = innerGrad
      ctx.fill()
      ctx.restore()

      // --- Draw floating particles ---
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Particles in the beam are slightly brighter
        const pAngle = Math.atan2(p.y - figY, p.x - figX)
        let angleDiff = Math.abs(pAngle - angle)
        if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff
        const inBeam = angleDiff < beamSpread
        const dist = Math.hypot(p.x - figX, p.y - figY)
        const proximity = 1 - Math.min(dist / (beamLength * 0.6), 1)
        const extra = inBeam ? proximity * 0.35 : 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity + extra})`
        ctx.fill()
      }

      // --- Draw silhouette figure ---
      drawFigure(ctx, figX, figY, angle, w)

      // --- Glow at figure's "head" origin ---
      const glowGrad = ctx.createRadialGradient(figX, figY - 48, 0, figX, figY - 48, 60)
      glowGrad.addColorStop(0, "rgba(0, 0, 0, 0.06)")
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.beginPath()
      ctx.arc(figX, figY - 48, 60, 0, Math.PI * 2)
      ctx.fillStyle = glowGrad
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}

function drawFigure(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  _canvasW: number
) {
  const scale = Math.min(_canvasW / 1200, 1) * 1.1
  ctx.save()
  ctx.translate(x, y)

  // Body direction: figure leans slightly toward the light direction
  const lean = Math.sin(angle) * 0.08

  // --- Legs ---
  ctx.strokeStyle = "rgba(0, 0, 0, 0.85)"
  ctx.lineWidth = 3 * scale
  ctx.lineCap = "round"
  // Left leg
  ctx.beginPath()
  ctx.moveTo(-6 * scale, 0)
  ctx.lineTo((-10 - lean * 20) * scale, 55 * scale)
  ctx.stroke()
  // Right leg
  ctx.beginPath()
  ctx.moveTo(6 * scale, 0)
  ctx.lineTo((10 - lean * 20) * scale, 55 * scale)
  ctx.stroke()

  // --- Torso ---
  ctx.lineWidth = 3.5 * scale
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(lean * 10 * scale, -38 * scale)
  ctx.stroke()

  // --- Arms ---
  ctx.lineWidth = 2.5 * scale
  const shoulderX = lean * 10 * scale
  const shoulderY = -30 * scale

  // Left arm — hangs down naturally
  ctx.beginPath()
  ctx.moveTo(shoulderX, shoulderY)
  ctx.quadraticCurveTo(
    (shoulderX - 18 * scale),
    (shoulderY + 15 * scale),
    (shoulderX - 14 * scale),
    (shoulderY + 32 * scale)
  )
  ctx.stroke()

  // Right arm — extended toward the light, holding a flashlight
  const armAngle = angle * 0.6
  const armLen = 28 * scale
  const elbowX = shoulderX + Math.cos(armAngle) * armLen * 0.6
  const elbowY = shoulderY + Math.sin(armAngle) * armLen * 0.6
  const handX = shoulderX + Math.cos(armAngle) * armLen
  const handY = shoulderY + Math.sin(armAngle) * armLen

  ctx.beginPath()
  ctx.moveTo(shoulderX, shoulderY)
  ctx.quadraticCurveTo(elbowX, elbowY, handX, handY)
  ctx.stroke()

  // Flashlight
  const flLen = 10 * scale
  const flX = handX + Math.cos(armAngle) * flLen
  const flY = handY + Math.sin(armAngle) * flLen
  ctx.lineWidth = 4 * scale
  ctx.beginPath()
  ctx.moveTo(handX, handY)
  ctx.lineTo(flX, flY)
  ctx.stroke()

  // Flashlight tip glow
  const tipGlow = ctx.createRadialGradient(flX, flY, 0, flX, flY, 12 * scale)
  tipGlow.addColorStop(0, "rgba(0, 0, 0, 0.15)")
  tipGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
  ctx.beginPath()
  ctx.arc(flX, flY, 12 * scale, 0, Math.PI * 2)
  ctx.fillStyle = tipGlow
  ctx.fill()

  // --- Head ---
  const headX = lean * 12 * scale
  const headY = -46 * scale
  // Head turns toward the light
  const headTilt = Math.sin(angle) * 2 * scale

  ctx.fillStyle = "rgba(0, 0, 0, 0.85)"
  ctx.beginPath()
  ctx.ellipse(headX + headTilt, headY, 8 * scale, 9.5 * scale, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}
