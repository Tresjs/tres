import type { TresVector3, VectorCoordinates } from '@tresjs/core'

export interface PhysicsProps {
  /** @description Set the physics world in `debug` mode. */
  debug?: boolean

  /** @description Set the physics world `timestep`. */
  timestep?: number

  /** @description Set the physics world `gravity`. */
  gravity: TresVector3 | VectorCoordinates
}
