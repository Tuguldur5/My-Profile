"use client"

import { useEffect, useState } from "react"
import { CHARACTER_URL } from "@/lib/scene-config"

/**
 * Returns true only when a real character.glb is published. This keeps the
 * page on its original hero layout until a model is available.
 */
export function useCharacterModel(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(CHARACTER_URL, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!controller.signal.aborted) setAvailable(response.ok)
      })
      .catch(() => {
        if (!controller.signal.aborted) setAvailable(false)
      })

    return () => controller.abort()
  }, [])

  return available
}
