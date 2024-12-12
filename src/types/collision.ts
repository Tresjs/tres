import type { Collider, RigidBody } from '@dimforge/rapier3d-compat'
import type { TresVNodeObject } from './object'

export interface CollisionSource {
  collider: Collider
  rigidBody: RigidBody | undefined
};

export interface SourceTarget {
  object: TresVNodeObject
  context: CollisionSource
}

export type CollisionType = 'enter' | 'exit'
