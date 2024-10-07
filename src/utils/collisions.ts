import type { ColliderHandle, World } from '@dimforge/rapier3d-compat'
import type { Scene } from 'three'
import type { Ref } from 'vue'
import type { CollisionSource, collisionType, sourceTarget } from '../types/collision'

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
  const currentRigidBodyNode = scene.value.getObjectByProperty('uuid', uuid)

  return currentRigidBodyNode
}

export const collisionEmisor = (
  source: sourceTarget,
  target: sourceTarget,
  started: boolean,
) => {
  const collisionType: collisionType = started ? 'enter' : 'exit';
  (source.object as any)?.__vnode?.ctx?.emit?.(`collision-${collisionType}`, { source, target })
}
