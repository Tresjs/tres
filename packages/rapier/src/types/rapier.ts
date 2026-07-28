import type Rapier from '@dimforge/rapier3d-compat'
import type { World } from '@dimforge/rapier3d-compat'
import type { Ref, ShallowRef } from 'vue'

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
   * @description Fixed timestep in seconds, or `'vary'` for variable stepping.
   */
  timeStep: Ref<number | 'vary'>
  /**
   * @description Simulation speed relative to real time.
    */
  timeScale: Ref<number>
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
  /**
   * @description Register a callback invoked right before every world step
   * (once per fixed substep) with the timestep about to be solved. Useful for
   * controllers that must apply forces in lockstep with the solver
   * (e.g. `DynamicRayCastVehicleController.updateVehicle`).
   * Auto-unregisters when the calling scope is disposed; also returns a
   * manual unregister function.
   */
  onBeforeStep: (callback: (timestep: number) => void) => () => void
  /**
   * @internal
   */
  beforeStepCallbacks: Set<(timestep: number) => void>
}

export interface InjectableRapierContext {}
