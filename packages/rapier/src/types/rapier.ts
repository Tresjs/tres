import type Rapier from '@dimforge/rapier3d-compat'
import type { World } from '@dimforge/rapier3d-compat'
import { Ref, ShallowRef } from 'vue'

export interface RapierContext {
  /**
   * @description Rapier instance.
   *
   * @docs https://rapier.rs/docs/api/javascript/JavaScript3D/
   */
  rapier: ShallowRef<typeof Rapier>
  /**
   * @description Rapier physics world
   */
  world: ShallowRef<World>
  /**
   * @description If the physics simulation is paused.
   */
  isPaused: Ref<boolean>
  /**
   * @description If the debugging mode enabled.
   */
  isDebug: Ref<boolean>
  /**
   * @description Initialize rapier WASM and create the physics world.
   */
  init: () => Promise<void>
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
