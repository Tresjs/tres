import type { TresVector3, VectorCoordinates } from '@tresjs/core'

export interface PhysicsProps {
  /** @description Set the physics world in `debug` mode. */
  debug?: boolean

  /**
   * @description Pause the physics simulation. When `true`, the world does not step.
   *
   * @default false
   */
  pause?: boolean

  /**
   * @description Simulation timestep in seconds (e.g. `1/60`), or `'vary'`
   * to step once per frame using the render delta.
   *
   * @note A numeric value uses a fixed-timestep
   * accumulator so simulation speed is independent of display refresh rate.
   *
   * @default 1/60
   */
  timeStep?: number | 'vary'

  /**
   * @description Scales how fast simulation time advances relative to real time.
   *
   * @note Values `<= 0` skip stepping (prefer
   * {@link PhysicsProps.pause pause} to freeze the world).
   *
   * @note `1` is real-time, `2` is double speed, `0.5` is half speed.
   *
   * @default 1
   */
  timeScale?: number

  /**
   * @description Set the physics world {@link gravity gravity}.
   *
   * @default [0, -9.81, 0]
   */
  gravity: TresVector3 | VectorCoordinates
}
