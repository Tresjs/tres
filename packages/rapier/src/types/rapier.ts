import type Rapier from '@dimforge/rapier3d-compat'
import type { World } from '@dimforge/rapier3d-compat'

export interface RapierContext {
  /**
   * @description Rapier instance.
   *
   * @docs https://rapier.rs/docs/api/javascript/JavaScript3D/
   */
  rapier: typeof Rapier
  /**
   * @description Rapier physics world
   */
  world: World
  /**
   * @description If the physics simulation is paused.
   */
  isPaused: boolean
  /**
   * @description If the debugging mode enabled.
   */
  isDebug: boolean
  /**
   * @description Set the physics world.
   *
   * @param world New physics world.
   */
  setWorld: (world: World) => void
  /**
   * @description Step the physics world.
   *
   * @param timestep The timestep length, in seconds.
   *
   * @example
   * ```ts
   * step(1/60)
   * ```
   */
  step: (timestep?: number) => void
}

export interface InjectableRapierContext {}
