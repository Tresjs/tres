import type { ColliderHandle, World } from '@dimforge/rapier3d-compat'
import type { Scene } from 'three'
import type { Ref } from 'vue'
import type { CollisionSource, CollisionType, ContactForcePayload, RigidBodyUserData, SourceTarget, TresVNodeObject } from '../types'

export const getCollisionSourceFromColliderHandle = (world: World, handle: ColliderHandle) => {
  const collider = world.getCollider(handle)
  const rigidBody = collider?.parent() ?? undefined
  const source: CollisionSource = {
    collider,
    rigidBody,
  }

  return source
}

export const getNodeObjectsFromCollisionSource = (source: CollisionSource, scene: Ref<Scene>) => {
  const rigidBody = source.rigidBody
  const collider = source.collider

  const groupUserData = rigidBody?.userData as RigidBodyUserData | undefined
  const groupUuid = groupUserData?.uuid
  const groupObject = scene.value.getObjectByProperty('uuid', groupUuid) as TresVNodeObject | undefined

  const currentUserData = collider.userData as RigidBodyUserData | undefined
  const currentUuid = currentUserData?.uuid
  const currentObject = scene.value.getObjectByProperty('uuid', currentUuid) as TresVNodeObject | undefined

  return [groupObject, currentObject]
}

export const collisionTrigger = (
  source: SourceTarget,
  target: SourceTarget,
  started: boolean,
) => {
  const CollisionType: CollisionType = started ? 'enter' : 'exit'
  const [rigidBodyObject, colliderObject] = source.objects

  rigidBodyObject?.__vnode?.ctx?.emit?.(`collision-${CollisionType}`, { source, target })
  colliderObject?.__vnode?.ctx?.emit?.(`collision-${CollisionType}`, { source, target })
}

export const contactForceTrigger = (
  source: SourceTarget,
  target: SourceTarget,
  payload: Omit<ContactForcePayload, 'source' | 'target'>,
) => {
  const [rigidBodyObject, colliderObject] = source.objects
  const eventPayload: ContactForcePayload = { source, target, ...payload }

  rigidBodyObject?.__vnode?.ctx?.emit?.('contact-force', eventPayload)
  colliderObject?.__vnode?.ctx?.emit?.('contact-force', eventPayload)
}
