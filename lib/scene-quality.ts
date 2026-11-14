export interface SceneQuality {
  dpr: number | [number, number]
  envResolution: number
}

/** Phones and weak GPUs get a lower pixel ratio and cheaper environment bake. */
export function detectSceneQuality(): SceneQuality {
  if (typeof window === "undefined") {
    return { dpr: [1, 1], envResolution: 32 }
  }

  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches
  const cores = navigator.hardwareConcurrency ?? 4
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4

  const lowEnd = isSmallScreen || cores <= 4 || memory <= 4
  return lowEnd
    ? { dpr: [1, 1], envResolution: 32 }
    : { dpr: [1, 1.5], envResolution: 64 }
}
