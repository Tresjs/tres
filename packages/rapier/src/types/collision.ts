import type { Collider, RigidBody } from '@dimforge/rapier3d-compat'
import type { TresVNodeObject } from './object'

export interface CollisionSource {
  collider: Collider & {
    userData?: {
      uuid?: string
    }
  }
  rigidBody: RigidBody | undefined
}

export interface SourceTarget {
  objects: [rigidBodyObject: TresVNodeObject, colliderObject: TresVNodeObject]
  context: CollisionSource
}

export type CollisionType = 'enter' | 'exit'
