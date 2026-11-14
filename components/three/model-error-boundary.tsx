"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface ModelErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
  onError?: (message: string) => void
}

interface ModelErrorBoundaryState {
  hasError: boolean
}

/**
 * Catches loader failures (missing GLB, bad Draco data, network errors) so the
 * hero always renders something instead of crashing the page.
 */
export class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorBoundaryState
> {
  state: ModelErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ModelErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      "[character] Failed to load /models/character.glb, using placeholder.",
      error.message,
      info.componentStack
    )
    this.props.onError?.(error.message)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
