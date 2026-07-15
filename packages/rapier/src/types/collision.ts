import type { Collider, RigidBody, Vector } from '@dimforge/rapier3d-compat'
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

export interface ContactForcePayload {
  source: SourceTarget
  target: SourceTarget
  totalForce: Vector
  totalForceMagnitude: number
  maxForceDirection: Vector
  maxForceMagnitude: number
}
