import * as THREE from "three"

const SUNRISE = 6
const SUNSET = 19

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

const WARM_SUN = new THREE.Color("#ffe9c4")
const HORIZON_SUN = new THREE.Color("#ff8a4a")
const NIGHT_HEMI_SKY = new THREE.Color("#26344a")
const DAY_HEMI_SKY = new THREE.Color("#dbe7f5")
const NIGHT_HEMI_GROUND = new THREE.Color("#111722")
const DAY_HEMI_GROUND = new THREE.Color("#a99a86")

export interface SceneLighting {
  sunIntensity: number
  sunColor: string
  moonIntensity: number
  ambientIntensity: number
  hemiIntensity: number
  hemiSky: string
  hemiGround: string
  /** 0 at night, 1 at full day. */
  dayFactor: number
  nightFactor: number
  exposure: number
}

/**
 * Turns a single 0–24 hour value into the character lighting parameters.
 * The scene has no visible sky or ground anymore, only the 3D person.
 */
export function getSceneLighting(hour: number): SceneLighting {
  const normalized = ((hour % 24) + 24) % 24
  const arc = ((normalized - SUNRISE) / (SUNSET - SUNRISE)) * Math.PI
  const elevation = Math.sin(arc)
  const dayFactor = smoothstep(-0.06, 0.28, elevation)
  const nightFactor = 1 - dayFactor
  const horizonGlow = clamp(1 - Math.abs(elevation) / 0.42, 0, 1) * dayFactor

  const sunColor = WARM_SUN.clone().lerp(HORIZON_SUN, horizonGlow)
  const hemiSky = NIGHT_HEMI_SKY.clone().lerp(DAY_HEMI_SKY, dayFactor)
  const hemiGround = NIGHT_HEMI_GROUND.clone().lerp(DAY_HEMI_GROUND, dayFactor)

  return {
    sunIntensity: 3.1 * dayFactor,
    sunColor: `#${sunColor.getHexString()}`,
    moonIntensity: 0.7 * nightFactor,
    ambientIntensity: 0.18 + 0.42 * dayFactor,
    hemiIntensity: 0.22 + 0.75 * dayFactor,
    hemiSky: `#${hemiSky.getHexString()}`,
    hemiGround: `#${hemiGround.getHexString()}`,
    dayFactor,
    nightFactor,
    exposure: 0.95 + 0.15 * dayFactor,
  }
}
