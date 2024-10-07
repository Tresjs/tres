import type { Collider, RigidBody } from '@dimforge/rapier3d-compat'
import type { Object3D } from 'three'

export interface CollisionSource {
  collider: Collider
  rigidBody: RigidBody | undefined
};

export interface sourceTarget {
  object: Object3D
  context: CollisionSource
}

export type collisionType = 'enter' | 'exit'
