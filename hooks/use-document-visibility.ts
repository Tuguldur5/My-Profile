"use client"

import { useEffect, useState } from "react"

/** Tracks tab visibility so the 3D canvas can stop rendering in the background. */
export function useDocumentVisibility(): boolean {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const update = () => setHidden(document.visibilityState === "hidden")
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])

  return hidden
}
