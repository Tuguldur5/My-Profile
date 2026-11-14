"use client"

import { Component, type ReactNode } from "react"

interface SceneErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface SceneErrorBoundaryState {
  hasError: boolean
}

/**
 * Last line of defence: any unexpected WebGL/three error unmounts the scene and
 * shows the static image instead of crashing the whole portfolio.
 */
export class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn(
      "[hero-scene] 3D scene failed; showing the static fallback.",
      error.message
    )
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
