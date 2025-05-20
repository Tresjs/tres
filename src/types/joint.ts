import type { JointData, RigidBody } from '@dimforge/rapier3d-compat'
import type { Methods } from './object'

/** @description Supported [Joint](https://rapier.rs/javascript3d/classes/JointData.html#Methods) types. */
export type JointType = keyof Methods<typeof JointData>

export interface JointProps {
  /** @description Set the {@link JointType}. */
  type: JointType

  /** @description  Bodies to connect with the joint. */
  bodies?: [RigidBody | null | undefined, RigidBody | null | undefined]

  /** @description {@link JointData} parameters. */
  params?: (number | number[])[]

  /**
   * @description
   * If the joint should wake up the bodies when a lifecycle hook (mount, unmount, on update, ...) occurs.
   *
   * @default true
   */
  wakeUpOnChanges?: boolean
}
