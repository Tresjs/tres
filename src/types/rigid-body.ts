import type { TresObject } from '@tresjs/core'
import type { RigidBody, RigidBodyDesc, World } from '@dimforge/rapier3d-compat'
import type { InstancedMesh } from 'three'

import type { ColliderShape } from './collider'

/** @description Tres Rapier supported `RigidBody` types. */
export type RigidBodyType =
  | 'dynamic'
  | 'kinematic'
  | 'kinematicVelocity'
  | 'fixed'

export interface RigidBodyProps {
  /** @description Set the `RigidBody` type. */
  type: RigidBodyType
  /**  @description Set the `RigidBody` collider shape. */
  collider: ColliderShape
  /** @description Make the **RigidBody** support `instancedMesh` */
  instanced: boolean
}

export interface CreateRigidBodyDescProps {
  /** @description The rigid-body based object. (@link TresObject}. */
  object: TresObject | InstancedMesh
  /** @description The `rigidBody` type. {@link RigidBodyType}. */
  rigidBodyType: RigidBodyType
}

export interface CreateRigidBodyProps extends CreateRigidBodyDescProps {
  /**
   * @description The Rapier {@link World} context.
   *
   * @see https://rapier.rs/javascript3d/classes/World.html
   */
  world: World
}

export interface CreateRigidBodyReturnType {
  /**
   * {@link RigidBody}
   *
   * @see https://rapier.rs/javascript3d/classes/RigidBody.html
   */
  rigidBody: RigidBody
  /**
   * {@link RigidBodyDesc}
   *
   * @see https://rapier.rs/javascript3d/classes/RigidBodyDesc.html
   */
  rigidBodyDesc: RigidBodyDesc
  /**
   * {@link CreateRigidBodyDescProps['object'] #Object}
   */
  object: CreateRigidBodyDescProps['object']
}
