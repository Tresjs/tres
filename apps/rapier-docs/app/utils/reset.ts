import type { RigidBody } from '@dimforge/rapier3d-compat'
import { unref } from 'vue'
import type { MaybeRef, Ref } from 'vue'

interface Vec3 { x: number, y: number, z: number }

const ZERO: Vec3 = { x: 0, y: 0, z: 0 }
const IDENTITY = { x: 0, y: 0, z: 0, w: 1 }

/**
 * Reset a Rapier rigid body to a translation with zero velocity and forces.
 */
export function resetRigidBody(
  instance: MaybeRef<RigidBody | null | undefined>,
  translation: Vec3 = ZERO,
) {
  const body = unref(instance)
  if (!body) { return }

  body.setRotation(IDENTITY, true)
  body.setTranslation(translation, true)
  body.setLinvel(ZERO, true)
  body.setAngvel(ZERO, true)
  body.resetForces(true)
  body.resetTorques(true)
}

/**
 * Restore Leches `useControls` refs to their default values (updates the GUI).
 */
export function resetControls(
  controls: Record<string, Ref<any>>,
  defaults: Record<string, unknown>,
) {
  for (const [key, value] of Object.entries(defaults)) {
    const control = controls[key]
    if (control) {
      control.value = value
    }
  }
}
