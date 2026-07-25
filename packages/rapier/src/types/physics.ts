import type { TresVector3, VectorCoordinates } from '@tresjs/core'

export interface PhysicsProps {
  /** @description Set the physics world in `debug` mode. */
  debug?: boolean

  /**
   * @description Set the physics world `timestep`. A number sets a fixed step
   * (default). `'vary'` advances by real elapsed time (clamped), decoupling
   * simulation speed from frame rate — use it to keep physics consistent across
   * varying frame rates and high-refresh displays.
   */
  timestep?: number | 'vary'

  /**
   * @description Simulation speed multiplier applied to the resolved timestep.
   * `2` runs the simulation at twice real time (snappier arcade feel).
   * @default 1
   */
  speed?: number

  /** @description Set the physics world `gravity`. */
  gravity: TresVector3 | VectorCoordinates
}
