import type { ColliderHandle, World } from '@dimforge/rapier3d-compat'
import type { Scene } from 'three'
import type { Ref } from 'vue'
import type { CollisionSource, CollisionType, RigidBodyUserData, SourceTarget, TresVNodeObject } from '../types'

export const getCollisionSourceFromColliderHandle = (world: World, handle: ColliderHandle) => {
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

export const getCollisionObjectFromSource = (source: CollisionSource, scene: Ref<Scene>): SourceTarget['objects'] => {
  const rigidBody = source.rigidBody
  const collider = source.collider

  const groupUserData = rigidBody?.userData as RigidBodyUserData | undefined
  const groupUuid = groupUserData?.uuid
  const groupObject = scene.value.getObjectByProperty('uuid', groupUuid) as TresVNodeObject

  const currentUserData = collider.userData as RigidBodyUserData | undefined
  const currentUuid = currentUserData?.uuid
  const currentObject = scene.value.getObjectByProperty('uuid', currentUuid) as TresVNodeObject

  return [groupObject, currentObject]
}

export const collisionTrigger = (
  source: SourceTarget,
  target: SourceTarget,
  started: boolean,
) => {
  const CollisionType: CollisionType = started ? 'enter' : 'exit'
  source.objects[0]?.__vnode?.ctx?.emit?.(`collision-${CollisionType}`, { source, target })
  source.objects[1]?.__vnode?.ctx?.emit?.(`collision-${CollisionType}`, { source, target })
}
