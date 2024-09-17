import type { Collider, ColliderDesc, RigidBody, RigidBodyDesc, World } from '@dimforge/rapier3d-compat'
import type { TresObject3D } from '@tresjs/core'

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

  /**
   * @description Set the `RigidBody` collider shape.
   *
   * Pass `false` to disable the auto colliders.
   */
  collider: ColliderShape | false
}

export interface ExposedRigidBody {
  /**  @description Context {@link RigidBodyDesc}. */
  instance: RigidBodyContext['rigidBody']
  /**  @description Context {@link RigidBody}. */
  rigidBodyDesc: RigidBodyContext['rigidBodyDesc']
  /** @description Context {@Link TresObject3D} group. */
  group: RigidBodyContext['group']
  /** @description Context {@Link RigidBodyContext}. */
  context: RigidBodyContext
}

export interface InstancedRigidBodyProps extends RigidBodyProps {
  /**  @description Set the `RigidBody` collider shape. */
  collider: ColliderShape
}

export interface RigidBodyColliderContext {
  /**  @description Context {@link ColliderDesc}. */
  colliderDesc: ColliderDesc

  /** @description Context {@link Collider}. */
  collider: Collider

  /** @description Context {@Link TresObject3D} group. */
  object: TresObject3D
}

export interface RigidBodyContext extends RigidBodyProps {
  /**  @description Context {@link RigidBodyDesc}. */
  rigidBodyDesc: RigidBodyDesc

  /**  @description Context {@link RigidBody}. */
  rigidBody: RigidBody

  /** @description Context {@Link TresObject3D} group. */
  group: TresObject3D

  /** @description Context {@Link RigidBodyColliderContext}. */
  colliders: RigidBodyColliderContext[]
}

export interface CreateRigidBodyDescProps {
  /** @description The rigid-body based object. (@link TresObject3D}. */
  object: TresObject3D
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
}
