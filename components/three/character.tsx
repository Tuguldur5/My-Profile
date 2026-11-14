"use client"

import { useEffect, useMemo, useRef } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { CHARACTER_URL } from "@/lib/scene-config"

/** Local Draco decoder copied from three's examples so no CDN request is needed. */
const DRACO_PATH = "/draco/gltf/"
const MODEL_HEIGHT = 1.72
/** Some GLBs face -Z. Set to Math.PI if your character has its back to the camera. */
const MODEL_YAW = 0

useGLTF.preload(CHARACTER_URL, DRACO_PATH)

const LOOK_EULER = new THREE.Euler()
const LOOK_QUAT = new THREE.Quaternion()
const HEAD_TARGET = new THREE.Quaternion()

interface CharacterProps {
  reducedMotion: boolean
  shadows: boolean
}

/**
 * Loads character.glb, plays a breathing/idle clip and a one-time wave. Clip
 * names vary between exports, so the selection is heuristic with safe fallbacks.
 */
export function Character({ reducedMotion, shadows }: CharacterProps) {
  const { scene, animations } = useGLTF(CHARACTER_URL, DRACO_PATH)
  const modelRef = useRef<THREE.Group>(null)
  const { actions, mixer } = useAnimations(animations, modelRef)

  const idleClip = useMemo(
    () =>
      animations.find((clip) => /idle|breath|stand|pose|loop/i.test(clip.name)) ??
      animations[0] ??
      null,
    [animations]
  )

  const waveClip = useMemo(
    () =>
      animations.find(
        (clip) =>
          clip !== idleClip && /wave|hello|greet|hi\b|hand/i.test(clip.name)
      ) ?? null,
    [animations, idleClip]
  )

  const headRef = useRef<THREE.Object3D | null>(null)
  const headRest = useRef(new THREE.Quaternion())
  const idleAction = useRef<THREE.AnimationAction | null>(null)
  const waveAction = useRef<THREE.AnimationAction | null>(null)
  const waveFinished = useRef(false)

  // Fit any export to the same height and keep the feet on the ground.
  const { scale, yOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const height = Math.max(size.y, 0.001)
    const nextScale = MODEL_HEIGHT / height
    return { scale: nextScale, yOffset: -box.min.y * nextScale }
  }, [scene])

  useEffect(() => {
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = shadows
        mesh.receiveShadow = shadows
      }
      if (!headRef.current && /head/i.test(object.name)) {
        headRef.current = object
        headRest.current.copy(object.quaternion)
      }
    })
  }, [scene, shadows])

  useEffect(() => {
    console.info(
      "[character] animation clips:",
      animations.length ? animations.map((clip) => clip.name).join(", ") : "(none)"
    )
  }, [animations])

  // Idle / breathing loop.
  useEffect(() => {
    if (!idleClip) return
    const action = actions[idleClip.name]
    if (!action) return
    idleAction.current = action
    action.reset().fadeIn(0.4).play()
    return () => {
      action.fadeOut(0.3)
    }
  }, [actions, idleClip])

  // One wave shortly after the scene appears.
  useEffect(() => {
    if (reducedMotion || !waveClip) return
    const action = actions[waveClip.name]
    if (!action) return

    const timer = window.setTimeout(() => {
      waveAction.current = action
      waveFinished.current = false
      action.reset()
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.fadeIn(0.25).play()
      idleAction.current?.fadeOut(0.25)
    }, 1400)

    return () => {
      window.clearTimeout(timer)
      action.fadeOut(0.2)
    }
  }, [actions, reducedMotion, waveClip])

  useFrame((state, delta) => {
    // Blend back to idle once the wave clip reaches its end.
    const wave = waveAction.current
    if (wave && !waveFinished.current) {
      if (wave.time >= wave.getClip().duration - 0.08) {
        waveFinished.current = true
        wave.fadeOut(0.4)
        idleAction.current?.reset().fadeIn(0.4).play()
      }
    }

    // Subtle head/eye tracking of the pointer, clamped to a natural angle.
    const head = headRef.current
    if (!head || reducedMotion) return
    LOOK_EULER.set(state.pointer.y * 0.12, state.pointer.x * 0.3, 0)
    LOOK_QUAT.setFromEuler(LOOK_EULER)
    HEAD_TARGET.copy(headRest.current).multiply(LOOK_QUAT)
    head.quaternion.slerp(HEAD_TARGET, 1 - Math.exp(-4 * delta))
  })

  // No idle clip? Fall back to a tiny procedural breath so the model feels alive.
  useFrame((state) => {
    if (idleClip || !modelRef.current) return
    const breath = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.006
    modelRef.current.scale.setScalar(scale * breath)
  })

  return (
    <group position-y={yOffset}>
      <group ref={modelRef} scale={scale} rotation-y={MODEL_YAW}>
        {/* dispose={null} keeps the cached GLTF intact after unmount */}
        <primitive object={scene} dispose={null} />
      </group>
    </group>
  )
}
