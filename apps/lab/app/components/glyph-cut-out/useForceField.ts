import type { Ref } from 'vue'
import { uniform } from 'three/tsl'
import { Vector2 } from 'three/webgpu'

export interface FieldView {
  camX: number
  camY: number
  zoom: number
  width: number
  height: number
}

export interface FieldParams {
  /** Field radius as a fraction of the viewport height. */
  radius: Ref<number>
  stiffness: Ref<number>
  damping: Ref<number>
  /** Pointer travel in CSS px per frame → spring velocity in px/s. Travel already scales with frame time. */
  kick: Ref<number>
}

/** Maximum spring amplitude, in world px. The scatter pass scales its reach against this. */
export const MAX_PUSH = 90
const FOLLOW = 10

/**
 * One radial field around the pointer, in world space (text plane) and screen space (post pass). Moving the pointer
 * kicks an under-damped spring; its amplitude is what the effects read as intensity.
 */
export function useForceField(params: FieldParams) {
  const center = uniform(new Vector2())
  const radius = uniform(1)
  const amplitude = uniform(0)
  const fade = uniform(1)
  // Screen-space twins for the post pass. The pass samples with `uv()`, whose origin is top-left (v grows downward).
  const screenCenter = uniform(new Vector2(0.5, 0.5))
  const screenRadius = uniform(params.radius.value)

  const pointer = new Vector2()
  const smoothPointer = new Vector2()
  let hasPointer = false
  let travel = 0
  let amp = 0
  let vel = 0

  const onPointerMove = (event: PointerEvent) => {
    if (hasPointer) {
      travel += Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y)
    }
    else {
      smoothPointer.set(event.clientX, event.clientY)
    }
    pointer.set(event.clientX, event.clientY)
    hasPointer = true
  }

  const update = (dt: number, view: FieldView) => {
    if (!hasPointer) { return }
    smoothPointer.lerp(pointer, 1 - Math.exp(-dt * FOLLOW))

    vel += (-params.stiffness.value * amp - params.damping.value * vel) * dt + travel * params.kick.value
    travel = 0
    amp = Math.max(-MAX_PUSH, Math.min(MAX_PUSH, amp + vel * dt))
    amplitude.value = amp

    // Screen px → text plane: one world unit is one CSS px at zoom 1, and the camera looks straight at the plane.
    center.value.set(
      view.camX + (smoothPointer.x - view.width / 2) / view.zoom,
      view.camY - (smoothPointer.y - view.height / 2) / view.zoom,
    )
    radius.value = (view.height * params.radius.value) / view.zoom
    screenRadius.value = params.radius.value
    screenCenter.value.set(smoothPointer.x / view.width, smoothPointer.y / view.height)
  }

  return { center, radius, amplitude, fade, screenCenter, screenRadius, onPointerMove, update }
}
