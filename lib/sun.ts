/**
 * Sunrise / sunset for a single location, computed locally with the standard
 * solar-position equations (no network request, no API key).
 *
 * The page uses this so the light/dark theme follows the real sun in
 * Ulaanbaatar instead of a hard-coded 07:00–19:00 window.
 */

const RAD = Math.PI / 180
const J1970 = 2440588
const J2000 = 2451545
const DAY_MS = 86_400_000
const OBLIQUITY = RAD * 23.4397

export interface SunTimes {
  sunrise: Date
  sunset: Date
  solarNoon: Date
}

function toJulian(date: Date): number {
  return date.valueOf() / DAY_MS - 0.5 + J1970
}

function fromJulian(value: number): Date {
  return new Date((value + 0.5 - J1970) * DAY_MS)
}

function toDays(date: Date): number {
  return toJulian(date) - J2000
}

function solarMeanAnomaly(days: number): number {
  return RAD * (357.5291 + 0.98560028 * days)
}

function eclipticLongitude(meanAnomaly: number): number {
  const center =
    RAD *
    (1.9148 * Math.sin(meanAnomaly) +
      0.02 * Math.sin(2 * meanAnomaly) +
      0.0003 * Math.sin(3 * meanAnomaly))
  const perihelion = RAD * 102.9372
  return meanAnomaly + center + perihelion + Math.PI
}

function declination(eclipticLongitudeValue: number): number {
  return Math.asin(Math.sin(OBLIQUITY) * Math.sin(eclipticLongitudeValue))
}

function julianCycle(days: number, longitudeWest: number): number {
  return Math.round(days - longitudeWest / (2 * Math.PI))
}

function approxTransit(hourAngle: number, longitudeWest: number, cycle: number): number {
  return (hourAngle + longitudeWest) / (2 * Math.PI) + cycle
}

function solarTransitJ(
  transit: number,
  meanAnomaly: number,
  eclipticLongitudeValue: number
): number {
  return (
    J2000 +
    transit +
    0.0053 * Math.sin(meanAnomaly) -
    0.0069 * Math.sin(2 * eclipticLongitudeValue)
  )
}

function hourAngle(altitude: number, latitude: number, declinationValue: number): number {
  return Math.acos(
    (Math.sin(altitude) - Math.sin(latitude) * Math.sin(declinationValue)) /
      (Math.cos(latitude) * Math.cos(declinationValue))
  )
}

/**
 * Returns the sunrise/sunset around `date` for the given coordinates, or
 * `null` during polar day/night where the sun never crosses the horizon.
 */
export function getSunTimes(
  date: Date,
  latitude: number,
  longitude: number
): SunTimes | null {
  const longitudeWest = RAD * -longitude
  const latitudeRad = RAD * latitude
  const days = toDays(date)
  const cycle = julianCycle(days, longitudeWest)
  const transit = approxTransit(0, longitudeWest, cycle)
  const meanAnomaly = solarMeanAnomaly(transit)
  const ecliptic = eclipticLongitude(meanAnomaly)
  const declinationValue = declination(ecliptic)
  const solarNoon = solarTransitJ(transit, meanAnomaly, ecliptic)

  // Standard refraction-adjusted horizon: -0.833°.
  const angle = hourAngle(-0.833 * RAD, latitudeRad, declinationValue)
  if (!Number.isFinite(angle)) return null

  const sunsetJ = solarTransitJ(
    approxTransit(angle, longitudeWest, cycle),
    meanAnomaly,
    ecliptic
  )
  const sunriseJ = solarNoon - (sunsetJ - solarNoon)

  return {
    sunrise: fromJulian(sunriseJ),
    sunset: fromJulian(sunsetJ),
    solarNoon: fromJulian(solarNoon),
  }
}

/** True between sunrise and sunset at that instant. */
export function isSunUp(now: Date, sun: SunTimes | null): boolean {
  if (!sun) return false
  const time = now.getTime()
  return time >= sun.sunrise.getTime() && time < sun.sunset.getTime()
}

/** HH:MM wall clock in the given IANA timezone (never the device offset). */
export function formatClock(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date)
}
