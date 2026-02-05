import type { ColliderHandle, World } from '@dimforge/rapier3d-compat'
import type { Scene } from 'three'
import type { Ref } from 'vue'
import type { CollisionSource, CollisionType, SourceTarget, TresVNodeObject } from '../types'

export const getSourceFromColliderHandle = (world: World, handle: ColliderHandle) => {
  const collider = world.getCollider(handle)
  const rigidBodyHandle = collider?.parent()?.handle
  const rigidBody
  = rigidBodyHandle !== undefined
    ? world.getRigidBody(rigidBodyHandle)
    : undefined
  const source: CollisionSource = {
    collider,
    rigidBody,
  }

  return source
}

export const get3DGroupFromSource = (source: CollisionSource, scene: Ref<Scene>) => {
  const uuid = (source.rigidBody?.userData as { uuid?: string })?.uuid
  const currentRigidBodyNode = scene.value.getObjectByProperty('uuid', uuid) as TresVNodeObject

  return currentRigidBodyNode
}

export const collisionEmisor = (
  source: SourceTarget,
  target: SourceTarget,
  started: boolean,
) => {
  const CollisionType: CollisionType = started ? 'enter' : 'exit'
  source.object?.__vnode?.ctx?.emit?.(`collision-${CollisionType}`, { source, target })
}
